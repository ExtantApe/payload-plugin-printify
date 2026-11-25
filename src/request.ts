import { isolateObjectProperty, type PayloadRequest } from 'payload'

/**
 * A request for a nested call that shares the caller's user, transaction and locale but has its own
 * `context`. Payload merges a nested call's `context` into the request it is given and leaves it
 * there, and runs a bulk update's docs in parallel on one request, so `printify: true` set for one
 * nested write would make every later or sibling write on that request skip the plugin's hooks:
 * paid orders not sent, price and visibility edits saved without reaching Printify.
 */
export function childReq(req: PayloadRequest): PayloadRequest {
  const child = isolateObjectProperty(req, ['context'])
  child.context = { ...req.context }
  return child
}
