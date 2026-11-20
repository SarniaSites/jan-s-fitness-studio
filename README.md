# Jan's Fitness Studio & Private Gym — website

A single-page site for the 24/7 private gym at Mont Arrive, St Peter Port. Plain HTML, Tailwind CSS v3 (compiled and committed) and a small vanilla-JS file. No framework, no runtime CDNs.

```
index.html              the whole home page; sections separated by big comment banners
thanks.html, 404.html   form thank-you page and not-found page, same design
assets/css/styles.css   compiled Tailwind (do not edit by hand)
assets/js/main.js       header, menu, cable rail, rooms, kit counter, steps, lightbox, FAQ, form
assets/fonts/           self-hosted Mona Sans + Atkinson Hyperlegible Next (woff2 + OFL licences)
images/brand/mark.svg   the two-figure logo mark, redrawn as SVG
images/work/            photos, each as name.webp (large) + name-sm.webp (small)
images/                 favicons, og-image.jpg (share card), site.webmanifest
src/input.css           Tailwind source: @font-face, components, keyframes
tailwind.config.js      brand colours (by role, with where each came from) + fonts
sitemap.xml, robots.txt
_fb-pack/               the Facebook research pack (not published by GitHub Pages)
_shots/                 screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| action | `#FCC400` | Yellow figure in the logo. Call, trial and send buttons only (ink text on it) |
| brand | `#1A3584` | Navy figure and swoosh in the logo. Headings, joining band, tags |
| highlight | `#1F6BC4` | The carpet blue in every room. Icons, kit pictograms, focus rings |
| ink | `#101B3D` | Body text |
| surface | `#F3F5FA` / `#FBFCFE` | Blue-tinted page grounds |
| wall | `#FAF0C6` | The pale yellow of the gym walls. Personal training section ground |

Fonts: **Mona Sans** (display, wide heavy italic, echoing the logo lettering) and **Atkinson Hyperlegible Next** (body, chosen for readability). Both OFL, self-hosted.

Logo: the two-figure mark was redrawn as `images/brand/mark.svg` from the flyer, because the pack had no clean logo file (the Facebook profile picture is a photo collage). The "Jan's Fitness" wordmark is set in Mona Sans. **Ask the client for their original logo artwork** and swap it in.

## Editing

- **Text:** edit `index.html` directly.
- **Colours / fonts:** edit `tailwind.config.js` or `src/input.css`, then run `npm install` (once) and `npm run build`.
- **Adding a gallery photo:** save `images/work/name.webp` (~1600px wide) and `name-sm.webp` (~800px), then copy one `<li class="g…">` in the "PHOTOS" section of `index.html`, updating `data-full`, `data-caption`, `src`, `width`, `height` and `alt`. The `g1`–`g9` classes set the bento sizes (see `.bento` in `src/input.css`).
- **Kit counter:** the counts, notes and photos for each body part live in the `KIT` object near the top of the "Kit counter" block in `assets/js/main.js`. Each item is `[tag text, name, number of pictograms, optional detail]`.
- **Rooms:** the four panoramas in the "THE GYM" section are crops of the Facebook profile collage and are low resolution. New wide photos of each room would be a quick upgrade.

## Going live — checklist

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg)
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap the GitHub Pages URL for the real domain everywhere: canonical, og tags, JSON-LD, sitemap.xml, robots.txt, the form's `_next`
- [ ] Switch the form from the team's email to the client's (`jansfitness@cwgsy.net`?) and activate FormSubmit
- [ ] Confirm phone/email; get the client to sign off the kit counts and the personal training / weight loss wording
- [ ] Assumptions to check with the client:
  - Postcode: the Facebook details say GY5 7DF but a post says GY1 2AA, so the site shows "Mont Arrive, St Peter Port" with no postcode
  - Price: an older post says £68 a month; left off the site as it may be out of date. Add current prices if they want them shown
  - Kit counts use the "minimum" figures from their own equipment list (later posts give slightly higher numbers)
  - Personal training and weight loss support come from the newest flyer; confirm who delivers it and whether to name them
  - Logo mark is a redraw (see above)
- [ ] Left out on purpose: the anti-GST petition and posters, the car park noise notice (kept only as a polite line in the FAQ), room closures for flooring and carpet cleaning, Chris's knee replacement post, the single written review (one review isn't enough for a testimonials section) and all follower/recommendation counts
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).
