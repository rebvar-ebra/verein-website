# Sanity gallery keys

Sanity requires each object in an array to have a unique, persistent `_key`.
The DALIA flyer import now provides `dalia-flyer-2025` explicitly.

To audit project galleries (including drafts), run from `apps/studio`:

```sh
pnpm exec sanity exec scripts/repair-gallery-keys.js --with-user-token
```

To repair missing or duplicate keys:

```sh
SANITY_REPAIR_APPLY=1 pnpm exec sanity exec scripts/repair-gallery-keys.js --with-user-token
```

The repair saves affected documents to a private backup in `/tmp`, changes only
invalid gallery keys, and uses revision guards in an atomic transaction. If an
editor changes a document concurrently, the transaction fails; rerun the audit.
It does not publish drafts or replace images, captions, or other content.
A second audit should report an empty repair list.

Reference: https://www.sanity.io/docs/studio/array-type
