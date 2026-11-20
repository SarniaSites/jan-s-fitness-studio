/** Jan's Fitness — Tailwind config.
 *  Every colour is sampled from the business: the two-figure logo on the
 *  newest flyer, and the gym itself (yellow walls, blue carpet, cover photo). */
module.exports = {
  content: ['./index.html', './thanks.html', './404.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // ACTION — the yellow figure in the logo (#fcc400). Reserved for Call / Join / Send and links' hover.
        // Always with ink text on it, never white.
        action: { DEFAULT: '#FCC400', hover: '#F0B400', press: '#DDA500' },
        // BRAND — the navy-blue figure and swoosh in the logo (#193483). Owns the page: bands, footer, headings.
        brand: { DEFAULT: '#1A3584', 600: '#22409A', 700: '#1A3584', 800: '#142966', 900: '#0E1E4C' },
        // HIGHLIGHT — the carpet blue in every room (flyer band #0067b4). Cable motif, markers, line-art.
        highlight: { DEFAULT: '#1F6BC4', soft: '#DCE8F7' },
        // INK — a very dark version of the logo navy, for text. Never pure black.
        ink: { DEFAULT: '#101B3D', soft: '#3B4766' },
        // SURFACE — blue-tinted off-whites for grounds. Never pure white.
        surface: { DEFAULT: '#F3F5FA', raised: '#FBFCFE', line: '#D5DBEA' },
        // WALL — the pale yellow of the gym walls, used as one section ground only.
        wall: { DEFAULT: '#FAF0C6', deep: '#F1DE8C' },
      },
      fontFamily: {
        // Mona Sans, wide (wdth 125) heavy italic: the logo's "Jan's Fitness" is a fat, slanted, sporty lettering.
        display: ['"Mona Sans Variable"', '"Arial Black"', 'sans-serif'],
        // Atkinson Hyperlegible Next: built for readability; the gym is for beginners and seniors as much as lifters.
        sans: ['"Atkinson Hyperlegible Next Variable"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: { page: '78rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
};
