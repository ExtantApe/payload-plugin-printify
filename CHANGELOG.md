# Changelog

## Unreleased

- **Security: the order-recording write no longer leaves `printify: true` on the caller's request.** Payload merges a nested call's `context` into the request it is given and leaves it there. After the plugin recorded a paid order's Printify result, every later write on the same request skipped the plugin's hooks: another paid order on that request was never sent, and a variant price or visibility edit was saved without reaching Printify or the host's `beforePrintifyWrite`. The write now runs on a child request with its own `context`. Reported by Captive Origins (bottle 186, K766).
- Tested: two new real-database tests that fail on the old code (two orders paid one after another on one request, and a price edit after a paid order on the same request), plus a bulk update paying two orders, which passed before the fix too because the two docs happen to overlap. Full suite (81 tests) twice, typecheck, build and leak check.
- Not tested: against a live Printify account.

## 0.2.3 (2026-11-20)

- Syncing no longer overwrites product image alt text written in Payload. An image's alt is set to the product title only when it is empty, on first import and on later syncs. Images are matched by URL, so an image whose URL changes in Printify gets the title again. Titles are imported as before.
- Tested: unit tests for a new image getting the title, a curator's alt surviving a resync (also when the title changes), and an emptied alt being refilled. The same flow on a real in-memory MongoDB. Full suite (78 tests), typecheck and leak check pass.
- Not tested: against a live Printify account, or a store whose `images` rows are shaped differently from the plugin's own.
