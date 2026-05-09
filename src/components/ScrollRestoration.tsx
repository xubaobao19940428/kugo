import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const visitedPageKeys = new Set<string>();
const scrollPositions = new Map<string, number>();
const pendingScrollTargets = new Map<string, number>();

const getPageKey = (pathname: string, search: string) => `${pathname}${search}`;

const getCurrentScrollY = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

const setScrollY = (scrollY: number) => {
  window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = scrollY;
  document.body.scrollTop = scrollY;
};

const restoreScrollY = (scrollY: number) => {
  let attempts = 0;
  let timeoutId = 0;
  let isCanceled = false;

  const restore = () => {
    if (isCanceled) return;

    setScrollY(scrollY);
    attempts += 1;

    if (attempts < 20 && Math.abs(getCurrentScrollY() - scrollY) > 2) {
      timeoutId = window.setTimeout(restore, 50);
    }
  };

  restore();

  return () => {
    isCanceled = true;
    window.clearTimeout(timeoutId);
  };
};

const getTargetPageKey = (event: MouseEvent) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return null;
  }

  const link = (event.target as Element | null)?.closest('a[href]');
  if (!link) return null;

  const target = link.getAttribute('target');
  if (target && target !== '_self') return null;

  const href = link.getAttribute('href');
  if (!href) return null;

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return null;

  return getPageKey(url.pathname, url.search);
};

const ScrollRestoration = () => {
  const location = useLocation();
  const pageKey = useMemo(() => getPageKey(location.pathname, location.search), [location.pathname, location.search]);
  const activePageKeyRef = useRef(pageKey);
  const savedPageBeforeNavigationRef = useRef(false);
  const cancelRestoreRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const prepareTargetPageScroll = (event: MouseEvent) => {
      const targetPageKey = getTargetPageKey(event);
      if (!targetPageKey || targetPageKey === activePageKeyRef.current) return;

      scrollPositions.set(activePageKeyRef.current, getCurrentScrollY());
      savedPageBeforeNavigationRef.current = true;

      const targetScrollY = visitedPageKeys.has(targetPageKey) ? scrollPositions.get(targetPageKey) ?? 0 : 0;
      pendingScrollTargets.set(targetPageKey, targetScrollY);

      if (targetScrollY === 0) {
        setScrollY(0);
      }
    };

    document.addEventListener('click', prepareTargetPageScroll, true);

    return () => {
      document.removeEventListener('click', prepareTargetPageScroll, true);
    };
  }, []);

  useLayoutEffect(() => {
    cancelRestoreRef.current?.();
    cancelRestoreRef.current = null;

    const previousPageKey = activePageKeyRef.current;

    if (previousPageKey !== pageKey) {
      if (!savedPageBeforeNavigationRef.current) {
        scrollPositions.set(previousPageKey, getCurrentScrollY());
      }
      savedPageBeforeNavigationRef.current = false;
      activePageKeyRef.current = pageKey;
    }

    const pendingScrollY = pendingScrollTargets.get(pageKey);
    if (pendingScrollY !== undefined) {
      pendingScrollTargets.delete(pageKey);
      visitedPageKeys.add(pageKey);
      cancelRestoreRef.current = pendingScrollY === 0 ? null : restoreScrollY(pendingScrollY);
      if (pendingScrollY === 0) {
        setScrollY(0);
      }
      return;
    }

    if (!visitedPageKeys.has(pageKey)) {
      visitedPageKeys.add(pageKey);
      setScrollY(0);
      return;
    }

    cancelRestoreRef.current = restoreScrollY(scrollPositions.get(pageKey) ?? 0);

    return () => {
      cancelRestoreRef.current?.();
    };
  }, [pageKey]);

  return null;
};

export default ScrollRestoration;
