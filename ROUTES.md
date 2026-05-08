# Kugo Website Routes

Base URL: `https://www.kugo.chat`

## Pages

| Page | Path | Component |
|------|------|-----------|
| Home | `/home` | Home |
| Privacy Policy | `/privacy-policy` | PrivacyPolicy |
| Terms | `/terms` | UserAgreement |
| Child Protection | `/child-protection` | ChildSafety |
| Contact | `/contact` | Support |
| Account Deletion | `/account-deletion` | DeleteAccount |

## Redirects

| Old Path | Redirects To |
|----------|-------------|
| `/about` | `/home` |
| `/privacy` | `/privacy-policy` |
| `/user-agreement` | `/terms` |
| `/child-safety` | `/child-protection` |
| `/support` | `/contact` |
| `/delete-account` | `/account-deletion` |
| `/deleteAccount` | `/account-deletion` |
| `/banned-accounts` | `/child-protection` |

## 404

All unmatched paths render the `NotFound` page.
