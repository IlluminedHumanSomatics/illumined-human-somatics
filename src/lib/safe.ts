// Await a promise, returning a fallback if it rejects. Used to keep pages
// rendering even when a single CMS fetch fails.
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch {
    return fallback
  }
}
