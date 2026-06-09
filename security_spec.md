# Security Specification: User Socials Database

## 1. Data Invariants
- Each user profile document must inhabit `/users/{userId}` where `userId` strictly matches the client's verified user ID (`request.auth.uid`).
- Only authenticated users can write (create/update) profiles, and only to their own document ID matching their UID (no writing into other users' nodes).
- To prevent spoofing: `incoming().id` and `incoming().email` must match the authenticated user's credentials.
- `createdAt` is immutable after creation.
- `createdAt` and `updatedAt` are server-determined timestamps (`request.time`).
- Anyone (authenticated or guest) can read a profile document to view social media links since it's a public portfolio website.

## 2. The "Dirty Dozen" Adversarial Payloads (The Shadow & Spoof Audit)

1. **Anonymous Write**: Write payload as an anonymous/unsigned-in guest.
   - Result: `PERMISSION_DENIED`
2. **Identity Theft (Foreign Write)**: Logged in user `Alice` trying to create a document under `/users/Bob`.
   - Result: `PERMISSION_DENIED`
3. **Ghost Field Injection (Shadow Update)**: Logged in user trying to inject `isAdmin: true` or `role: 'editor'` into `/users/Alice`.
   - Result: `PERMISSION_DENIED`
4. **Email Spoofing (Fake Field email)**: Authenticated user `Alice` trying to set her email structure to `admin@univ.edu` when her real auth.email is `alice@domain.com`.
   - Result: `PERMISSION_DENIED`
5. **ID Spoofing**: Authenticated user trying to set document `id` field to `Bob` in his `/users/Alice` document.
   - Result: `PERMISSION_DENIED`
6. **Immutable Hijacking (createdAt Alteration)**: Alice attempting to rewrite her old `createdAt` timestamp during an update.
   - Result: `PERMISSION_DENIED`
7. **Client Timestamp Forgery**: Alice sending a raw client-side string `"2026-01-01"` for `updatedAt` instead of `request.time`.
   - Result: `PERMISSION_DENIED`
8. **Malicious ID Character Poisoning**: Alice attempting to target a document with an ID of special characters `/users/alice??%2Fadmin`.
   - Result: `PERMISSION_DENIED`
9. **Denial-of-Wallet (10MB String Payload)**: Injecting extremely long characters (e.g. 50,000 chars) into social links fields to swell database bill.
   - Result: `PERMISSION_DENIED` (due to size limit, max 500 chars per link string in validation).
10. **Malicious List Injection**: Alice attempting to inject a Map list in place of a link string.
    - Result: `PERMISSION_DENIED`
11. **Query Scraping (Blanket Read)**: Unauthorized client trying to perform a blanket `list` operation without querying a specific userId.
    - Result: `PERMISSION_DENIED`
12. **Unverified Email write**: User write profile with unverified email.
    - Result: `PERMISSION_DENIED` (unless email verification is optional, which can be configured. But to ensure safety, email must be verified, or we can check simple authenticated state. Since standard email verification can be optional during self-registration, we will verify simple `request.auth.uid != null`).

## 3. The Rules Testing Pattern
We enforce these boundaries statically inside `firestore.rules` where our validation helpers verify keys, types, sizes, and credentials validity. Our final production rules are deployed following zero-trust.
