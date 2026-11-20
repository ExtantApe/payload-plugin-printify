# Changelog

## 0.2.3 (2026-11-20)

- Syncing no longer overwrites product image alt text written in Payload. An image's alt is set to the product title only when it is empty, on first import and on later syncs. Images are matched by URL, so an image whose URL changes in Printify gets the title again. Titles are imported as before.
- Tested: unit tests for a new image getting the title, a curator's alt surviving a resync (also when the title changes), and an emptied alt being refilled. The same flow on a real in-memory MongoDB. Full suite (78 tests), typecheck and leak check pass.
- Not tested: against a live Printify account, or a store whose `images` rows are shaped differently from the plugin's own.
