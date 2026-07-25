// TRMNL Sandbox Runtime ("Serverless") transform for Burger of the Day.
//
// Paste the body of this file into the Markup Editor > Serverless tab.
// Runtime: Node.js v22 in an isolated-vm sandbox. No network access, 1s timeout.
//
// The polling URL (https://bobsburgers-api.herokuapp.com/burgerOfTheDay) returns
// a raw array of ~416 burgers. `transform(input)` receives that payload and
// returns an object whose keys become template variables in the Markup Editor.
//
// The views index into `data[today_index]`, so we expose the array as `data`.
// We also precompute `burger` (today's pick) so views can use it directly and
// so the deterministic date logic lives in one place.

function transform(input) {
  // The API responds with a bare array; if a runtime ever wraps it in an
  // object, fall back to a `.data`/`.burgers` field.
  const burgers = Array.isArray(input)
    ? input
    : input.data || input.burgers || [];

  const count = burgers.length || 416;

  // Same date -> same burger. Days since the Unix epoch, modulo the catalog size.
  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  const todayIndex = ((daysSinceEpoch % count) + count) % count;

  const burger = burgers[todayIndex] || null;

  return {
    // Full array, kept for backwards compatibility with views that compute
    // the index themselves via Liquid (`data[today_index]`).
    data: burgers,
    // Precomputed convenience fields.
    today_index: todayIndex,
    burger: burger,
  };
}
