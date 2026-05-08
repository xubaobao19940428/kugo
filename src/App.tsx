import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import UserAgreement from './pages/UserAgreement'
import ChildSafety from './pages/ChildSafety'
import DeleteAccount from './pages/DeleteAccount'
import BannedAccount from './pages/BannedAccount'

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<UserAgreement />} />
                    <Route path="/child-protection" element={<ChildSafety />} />
                    <Route path="/banned-account" element={<BannedAccount />} />
                </Route>

                <Route path="/account-deletion" element={<DeleteAccount />} />
                {/* Legacy redirects */}
                <Route path="/about" element={<Navigate to="/home" replace />} />
                <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
                <Route path="/user-agreement" element={<Navigate to="/terms" replace />} />
                <Route path="/child-safety" element={<Navigate to="/child-protection" replace />} />
                <Route path="/support" element={<Navigate to="/banned-account" replace />} />
                <Route path="/contact" element={<Navigate to="/banned-account" replace />} />
                <Route path="/delete-account" element={<Navigate to="/account-deletion" replace />} />
                <Route path="/deleteAccount" element={<Navigate to="/account-deletion" replace />} />
                <Route path="/banned-accounts" element={<Navigate to="/banned-account" replace />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
