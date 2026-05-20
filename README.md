# Burger of the Day — TRMNL Plugin

A [TRMNL](https://usetrmnl.com) private plugin that displays a Bob's Burgers
"Burger of the Day" on your e-ink device. The burger rotates deterministically
by date — same date, same burger — across all 416 burgers featured in the show.

Data comes from the community [bobsburgers-api](https://bobsburgers-api.herokuapp.com/).

## Setup

1. In TRMNL, go to **Plugins → Add → Private Plugin**.
2. Set **Strategy** to `Polling`.
3. Set **Polling URL** to:
   ```
   https://bobsburgers-api.herokuapp.com/burgerOfTheDay
   ```
4. Set **Polling verb** to `GET`.
5. Set **Refresh rate** to whatever you like (e.g. every 15 minutes is fine —
   the burger only changes at midnight UTC anyway).
6. Paste the contents of each `views/*.liquid` file into the matching layout
   slot in TRMNL's plugin editor:
   - `views/full.liquid` → Full screen (800×480)
   - `views/half_horizontal.liquid` → Half horizontal (800×240)
   - `views/half_vertical.liquid` → Half vertical (400×480)
   - `views/quadrant.liquid` → Quadrant (400×240)

That's it.

## How the date-based selection works

The API returns an array of 416 burgers. TRMNL's Liquid templating computes
`(days_since_epoch) modulo 416` to pick today's index. The same date always
maps to the same burger.

## Files

```
views/
  full.liquid              # 800×480
  half_horizontal.liquid   # 800×240
  half_vertical.liquid     # 400×480
  quadrant.liquid          # 400×240
plugin.json                # plugin metadata (for reference; TRMNL doesn't read this)
```
