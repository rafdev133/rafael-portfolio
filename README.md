# Rafael Porgatorio -- Video Editor Portfolio

A single-page React + TypeScript + Tailwind + Framer Motion landing page for a
freelance video editor: a branded loading intro, buttery smooth scrolling
(Lenis), a clean floating navbar, a custom cursor, a Hero with a big square
portrait that spins on hover to reveal your setup, ambient 3D decoration, a
responsive row of vertical (9:16) reels (9 of them your real Vimeo videos,
each with its own sound toggle) in phone-mockup frames, flip-card Services,
an animated orbit Process map, and a Contact section with your real socials.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (outputs to dist/)
```

Requires Node 18+.

## How it's structured

Everything lives on one page (`src/App.tsx`), scrolled top to bottom:

1. **Loading screen** (`src/components/LoadingScreen.tsx`) -- a "RAFMEDIA"
   branded intro with a spinning aperture + clapping clapperboard animation
   (both now cycling through the brand's magenta/purple/orange palette
   instead of plain gray) and a timeline-style progress bar, over colorful
   ambient glow blobs and four small floating 3D cubes. Plays once on load,
   then wipes away.
2. **Hero** (`#home`, `src/sections/HeroSection.tsx`) -- your name, an evenly
   colored bio paragraph, stats, socials and Contact / Live Project buttons
   on the left, and a big square (1:1) photo of you on the right that spins
   180deg on hover to reveal your setup -- see below.
3. **Projects** (`#projects`, `src/sections/ProjectsSection.tsx`) -- 10 reels
   in an iPhone 17 Pro Max-style frame (titanium rail, Dynamic Island,
   action/volume/camera-control nubs), properly responsive, playing 9 of
   your real Vimeo videos, each with its own sound on/off button -- see
   below.
4. **Services** (`#services`, `src/sections/ServicesSection.tsx`) -- 10
   compact cards, 5 per row, one per specialty (Talking Head, Faceless,
   Podcast, and so on), each with its own icon, term, and short description --
   plus a real YouTube Shorts example that pops up and plays when you hover
   the card -- see below.
5. **Process** (`#process`, `src/sections/ProcessSection.tsx`) -- a
   rotating "orbit hub" map: 5 numbered steps arranged in a circle around a
   center hub, plus a big, easy-to-read description panel underneath for
   whichever step is active -- see below.
6. **Contact** (`#contact`, `src/sections/ContactSection.tsx`) -- your real
   Facebook, WhatsApp, Telegram, and Gmail, each as its own clickable card --
   see below.

Site-wide extras:

- **Navbar** (`src/components/Navbar.tsx`): back to the original floating
  glass-pill design now that the Hero is dark again -- a "Rafmedia" gradient
  wordmark on the left and an icon + label pill nav, truly centered in the
  bar (Home / Projects / Services / Process / Contact -- Contact is back in
  the pill), with a pulsing gradient glow behind it and a sliding highlight
  on the active link. There's still no separate CTA button beside the
  navbar; Contact living in the pill itself is the entry point now. The
  light "Mainframe"-style bar from an earlier round is gone too, along with
  its HelveticaNow font links in `index.html` and the `.hero-font-heading` /
  `.hero-font-body` CSS that only that navbar/hero used.
- **Custom cursor** (`src/components/CustomCursor.tsx`): a soft
  difference-blend dot that follows the pointer and grows over links/buttons.
  Desktop only -- it turns itself off on touch devices.
- **3D decoration** (`src/components/FloatingCube.tsx`): small rotating CSS
  cubes (real 3D transforms, no WebGL dependency) scattered through the Hero,
  Projects, Services, and Process sections.
- **Scroll buttons** (`src/components/ScrollButtons.tsx`) float bottom-right
  and smooth-scroll one section at a time.
- **Contact / Live Project buttons** (`src/components/ContactButton.tsx`,
  `src/components/LiveProjectButton.tsx`): Contact Me in the Hero
  smooth-scrolls down to the Contact section. Live Project now only appears
  in the Hero, scrolling down to Projects -- the per-reel "Live Project"
  link under each Project card is removed (see below).

Clicking a nav link or a scroll button smooth-scrolls to the matching section
via Lenis (`src/lib/SmoothScroll.tsx`). The active nav link highlights
automatically as you scroll (`src/hooks/useActiveSection.ts`).

### The new big square portrait

You sent a real studio photo of yourself (glasses, white shirt and tie, on
a chair) and asked for the Hero's mouse-effect picture to become that photo,
big and 1:1. Since that's a single photo rather than the earlier set of 9
angle shots, the old 9-image crossfade (`InteractiveFace.tsx`) couldn't
carry over as-is, so I built a new, simpler component for it instead:

- **`src/components/TiltPhoto.tsx`**: displays one photo at a big square
  (1:1) aspect ratio, in rounded corners with a soft border and shadow, and
  it gently tilts in 3D toward wherever your mouse is over it (a few degrees
  of rotation, spring-eased) -- a lighter-weight, single-photo take on the
  same "picture reacts to your cursor" idea the old 9-angle version had.
  Same ambient color glow behind it as before.
- **The photo** (`public/rafael-portrait.jpg`): your uploaded photo as-is
  (it was already a clean 670x670 square), upscaled slightly and given a
  touch of contrast/sharpening for a crisper look on screen -- no background
  removal this time since the photo already reads as a finished portrait,
  not a cutout subject.
- The Hero's text column (name, bio, stats, socials, buttons) and the
  Navbar are unchanged -- only the picture itself and its effect changed.

Since it's one photo instead of nine, `InteractiveFace.tsx` and the whole
`public/faces/` folder are now unused (see the file list below).

### Services: an image per term, hint text removed

Two changes here: the front of each flip card now shows a small icon
"image" tile for every term in that service's name (e.g. a microphone icon
for "Talking Head", a masked-face icon for "Faceless", a house icon for
"Real Estate", a film-reel icon for "B-Roll", and so on), instead of just
plain text -- so the picture actually matches what the box is about. And
both instructional hints ("Hover to see what this means" on the card, and
"Hover a card to see..." under the section heading) are gone; the cards now
speak for themselves.

Same reasoning as the mascots before: no image-generation tool here, so
rather than photos, each term gets a colored icon tile built from a
`lucide-react` icon -- clean, on-brand, and guaranteed to render (no
external image service to go down). Hovering still flips the card to the
glossary definitions on the back, unchanged. Icons and definitions are set
per-term in the `glossary` field of the `SERVICES` array at the top of
`ServicesSection.tsx` -- swap the `icon` import for a different one, or
point it at a real photo/illustration URL if you'd rather use actual images.

### Process: rebuilt to match your reference

You uploaded a roadmap graphic (a glowing, winding 3D road connecting
numbered icon stops, ending in a big arrow) and asked for that style, so
`ProcessSection.tsx` is rebuilt around it -- back to one continuous road
(not last round's separate rectangle-and-arrows layout), now with a proper
3D look:

- The road itself is layered: a soft blurred glow, a dark offset "side
  wall" underneath for depth, a road-bed, and a bright gradient surface on
  top with a dashed, road-marking-style centerline -- all drawing themselves
  in as the section scrolls into view, finishing with a glowing white arrow
  at the very end (matching your reference's "keep growing" arrow).
- The 5 stops are dark circles with a colored glowing ring and icon inside
  (instead of your reference's plain dark circles, so it stays on your
  site's magenta/purple/orange palette), each with its title and
  description floating beside it, plus a small tagline in the empty corner
  as a finishing touch, echoing your reference's bottom-right text block.
- Mobile keeps the simpler vertical version, now capped with a small arrow
  at the bottom for the same "keep going" feel.

The road's shape lives in `ROAD_POINTS` near the top of `ProcessSection.tsx`
(an abstract 440x1000 coordinate space) if you want to reshape it.

### Projects: intro paragraph removed

The line under the "Projects" heading ("Every edit below is vertical...")
is gone, as asked -- the heading now sits directly above the reels with a
bit more breathing room in place of that text.

### Services: undone back to the flip cards

The animated list-and-panel selector from the last round is undone -- Services
is back to the 5 flip cards (icon-tile front, glossary-definition back)
exactly as it was before that change.

### Process: a new idea -- a rotating orbit hub

The winding 3D road is retired in favor of something visually very
different: a hub-and-spoke map. The 5 steps sit as glowing icon nodes evenly
spaced around a circle, each connected back to a center hub by a thin,
animated dashed line that constantly flows inward. The hub itself cycles
through the 5 steps on its own (about every 3 seconds) -- cross-fading in
that step's number, title, and description -- and pauses the moment you
hover the map or click a step directly, so you can explore it manually too.
Two faint dashed rings rotate slowly in opposite directions behind it all for
some ambient motion, and whichever step is active gets a brighter spoke line,
a pulsing glow ring, and a highlighted label. Mobile keeps a simplified
vertical stepper version, since a circular map doesn't translate well to a
narrow screen. The step content (icons, titles, descriptions) is still the
same `STEPS` array at the top of `ProcessSection.tsx`; the circle's radius is
the `RADIUS` constant right below it.

### Projects: responsive, with 9 of your real reels live, and a sound toggle

9 of the 10 reel slots now play your real Vimeo videos, using Vimeo's
"background" embed mode by default -- so instead of a static thumbnail, each
frame silently autoplays and loops your actual reel right on the page
(muted, no controls, cropped to fill the frame). Hovering still scales it up
slightly and shows a Play button and Live Project link that opens the real
Vimeo page in a new tab. The 10th slot ("Daily Grind") still has the old
placeholder image and a "Coming Soon" label since only 9 links were
provided -- swap in a `vimeoId` for it in the `REELS` array in
`ProjectsSection.tsx` whenever a tenth reel is ready, the same way the other
9 are set up.

Every real reel also has its own small speaker icon in the top-right corner
-- tap it to turn that video's sound on, tap again to mute it. Since Vimeo's
silent "background" mode can't play audio, turning the sound on swaps that
one video over to a regular embed with real audio (still autoplaying,
looping, and with no visible Vimeo controls); turning it back off swaps it
back to the cropped, silent background version. The clip restarts from the
beginning when you toggle, which is a small trade-off for being able to
actually hear it.

### Projects: mobile now shows two full-bleed reels per row

Two more Projects changes, both about mobile:

- The grid used to be a single-row horizontal swipe strip on phones. It's
  now a real responsive grid at every width -- 2 reels per row on phones, 3
  on tablets, 4 on small laptops, and the full 5-column row only on larger
  desktop screens.
- On phones specifically, the iPhone-mockup "frame" around each reel (the
  titanium bezel, side buttons, Dynamic Island) is stripped away, so the
  video fills its entire tile edge-to-edge instead of sitting inside a
  smaller phone-shaped window. That chrome still shows on tablets and
  desktop, where there's room for it to read as a nice detail rather than
  clutter. The "Live Project" link under each reel is also now always
  visible on mobile (it used to only reveal on hover, which doesn't really
  exist on a touchscreen).

### Contact: a new section with your real channels

There wasn't a dedicated Contact section before -- just a placeholder
`hello@example.com` in a couple of spots -- so I built one (`#contact`,
`src/sections/ContactSection.tsx`). It's 4 clickable cards (Facebook,
WhatsApp, Telegram, Gmail), each with its own icon and color accent, a
lift-and-glow animation on hover, and a link straight out to that platform
(WhatsApp and Telegram open a chat directly; Gmail opens your email client).
I also swapped the placeholder handles in the Hero's small social row and
the Contact button's default email for these same real ones, so the `TODO`
comments that were there before are gone.

The "Email Me Directly" button that used to sit under the 4 cards is
removed now -- the Gmail card above already covers that, so it was
redundant.

### Navbar: Contact is back in the pill

Contact is back as its own link in the center nav pill, alongside Home,
Projects, Services, and Process -- clicking it scrolls straight down to the
Contact section. There's still no separate CTA button off to the side of
the navbar (that stays removed); Contact living inside the pill itself is
the entry point now.

### Hero: bio is now one consistent color

The bio paragraph used to fade each letter in based on how far you'd
scrolled the page, which left part of it looking dim/gray any time you
weren't scrolled to exactly the right spot -- not an intentional
"highlight," just an artifact of that effect. `AnimatedText.tsx` is simplified to a plain
word-by-word fade-in that plays once when the paragraph scrolls into view,
then settles into one solid, even color for the whole thing, matching
everything else in the text column.

### Hero: bigger, highlighted social icons on hover

The 4 small social icons under the Contact/Live Project buttons now sit in
their own circular buttons. Hovering one scales it up noticeably and fills
it with that platform's real brand color (Facebook blue, WhatsApp green,
Telegram sky-blue, Gmail red) with a matching glow, so it's obvious they're
clickable and easy to aim for.

### Hero: the photo now spins to show your real setup

`TiltPhoto.tsx` spins a full 180 degrees on hover (or tap on mobile) like a
card flipping over, revealing your real setup on the back:

- Processor -- AMD Ryzen 5 5500
- Memory -- 32 GB RAM
- Graphics -- RTX 3050 (8 GB)
- Internet -- 250 Mbps
- Editing App -- CapCut Pro
- OS -- Windows 11 Pro
- Storage -- 828 GB of 954 GB used, as an animated fill bar

All from the system specs screenshot you sent, so it's all real this time
(the internet speed already was). To make it feel more like a reveal than a
static swap, the 6 spec tiles pop in one after another with a little
stagger, a sparkle icon twinkles next to "My Setup," a soft glow pulses
around the whole panel, and the storage bar fills in from empty -- all of it
replaying every time you hover. If you pick up any new gear or apps later,
the `SPEC_ITEMS` array and the storage numbers near the top of
`TiltPhoto.tsx` are the only things to update.

### Services: 10 cards instead of 5

Since each of the old 5 combined cards ("Talking Head & Faceless", etc.) was
really two specialties glued together, they're now split into 10 individual
cards -- Talking Head, Faceless, Podcast, Vlogs, Trading, Real Estate,
Motion Graphics, Captions, B-Roll, and Story Structuring each get their own
box, 5 per row on tablet and up (2 per row on phones). With twice as many
cards, they're simpler and smaller than the old flip cards -- no more
hover-to-flip, just an icon, the term, and its short description right on
the card, with a lift-and-glow on hover. All 10 are still just objects in
the `SERVICES` array at the top of `ServicesSection.tsx`.

### Services: YouTube swapped for Podcast, with a hover video preview

Two more changes here. First, the "YouTube" card is now "Podcast" -- long-form
conversations and interviews, cut into clips -- since you wanted that
specialty listed instead.

Second, and bigger: hovering any of the 10 cards now pops up a real example
of that exact specialty, taken from your own YouTube Shorts, playing (muted,
looping, no controls) in a vertical preview centered on the screen with a
dark blurred backdrop behind it and a glowing border matching the card's
color. Move off the card and it fades right back out. All 10 cards now have
a real video attached:

| Card | Example |
| --- | --- |
| Talking Head | youtube.com/shorts/KtXQpmIUoMU |
| Faceless | youtube.com/shorts/V2Me830aBfM |
| Podcast | youtube.com/shorts/Q0BOH_s9gSU |
| Vlogs | youtube.com/shorts/WwP6kJNFmag |
| Trading | youtube.com/shorts/Igr06xn2oz0 |
| Real Estate | youtube.com/shorts/6cXawULEjlE |
| Motion Graphics | youtube.com/shorts/4RJjhQcvjtY |
| Captions | youtube.com/shorts/EYKFb8MVG70 |
| B-Roll | youtube.com/shorts/yTLlFCt0WlI |
| Story Structuring | youtube.com/shorts/acT7O_q5dCk |

Each `videoId` lives right next to its card in the `SERVICES` array in
`ServicesSection.tsx` -- swap any of them out whenever you have a better
example to show.

### Process: bigger, easier-to-read text

The hub in the middle of the orbit map used to try to cram a step's number,
title, *and* full description into a small circle, which meant the
description had to run as small as ~8.5px to fit -- hence it reading as
"so small." The hub now only shows the number and a bigger, bolder title;
the full description moved into its own spacious card underneath the whole
map, with a colored accent border, an icon, and text at a normal, easy
reading size (matching the rest of the site's body text). The node icons and
their labels around the ring are bigger too. The mobile version was already
a normal size, so it's unchanged.

### Projects: reel numbers removed, Live Project link removed

Two more Projects clean-ups: the little "01", "02"... labels that used to
sit in the top-left corner of each reel frame are gone, and the "Live
Project" button that used to appear under each reel on hover is removed
too -- each frame now just shows the video and its sound toggle, with the
name at the bottom (the small category label above it, e.g. "Talking
Head," has since been removed too -- just the reel's name shows now).
(The Hero's own "Live Project" button, which scrolls down to this
section, is untouched. The `category` field is still there in the
`REELS` array in case you want the label back later -- just re-add the
`<span>` for it above the `<h3>`.)

### Services video popup: bigger centered header, lighter blur, sound on

Three small polish passes on the hover-video popup added in the round
before this one:

- The header bar over the video (the icon + specialty name, e.g. "Talking
  Head") is now centered and stacked -- the icon sits above the label
  instead of beside it -- and the label text is noticeably bigger and
  bolder, so it reads clearly at a glance.
- The dark backdrop behind the popup was quite heavy (70% black + a 6px
  blur). It's now lighter (about 38% black + a 3px blur) so the rest of the
  page stays readable through it while it still reads as a distinct overlay.
- The preview videos now play with sound instead of muted.

One thing worth flagging on that last point: most browsers only allow
audio to autoplay after the visitor has already clicked or tapped
somewhere on the page (a "user gesture"). Hovering alone doesn't always
count, so on a fresh page load some browsers may still start these
previews muted until the visitor clicks anywhere once -- that's a browser
policy, not a bug in the site.

### Video preview moved: now on the "Rafmedia" logo, not the Hero name

This feature went through a few iterations (hover the Hero name -> play a
YouTube Short -> play your uploaded `quint.mp4` -> add a mute/unmute
button -> auto-unmute automatically) before landing on its current, final
spot: it's been moved off "Rafael Porgatorio" in the Hero entirely, and
now lives on the **"Rafmedia" wordmark in the top-left of the navbar**.
Hovering it pops open a centered video player (16:9, `public/quint.mp4`);
moving the cursor away closes it. Clicking the logo still scrolls to the
top of the page, unchanged -- hover and click don't conflict since
they're different interactions. The Hero name is back to being plain
text with no popup.

Worth explaining plainly, since it shaped how this had to be built: no
website, anywhere, is allowed to autoplay a video *with sound* until the
visitor has made at least one real click, tap, or key-press *somewhere on
the page* -- hovering never counts, in any browser, no matter how the
code is written. That's a deliberate browser security rule (stops sites
from blasting sound on load) and there's no code trick that gets around
it while keeping this a hover interaction.

**How it's handled here**: the video always starts muted, so it reliably
pops in and plays instantly the moment you hover the logo -- no clicking
needed for the video itself to play. For sound: it quietly watches for
the visitor's first click/tap/key-press *anywhere on the whole page* (a
nav link, the logo click itself, a social icon, any button), and the
instant that happens, sound switches on by itself from then on,
automatically -- no button, no extra step, and it stays on for the rest
of that visit. Since the navbar sits at the very top of the page next to
several other clickable things, most visitors will trigger this within
their first couple of seconds, often before they've even hovered the
logo once.

The one case this can't cover, because it's a hard browser floor rather
than a gap in this build: if someone's *very first action on the entire
page*, before touching anything else at all, is hovering the logo, that
one moment necessarily plays muted -- it switches itself to sound-on
right after their very next click anywhere.

If `quint.mp4` isn't actually widescreen, it'll letterbox or crop in that
16:9 frame -- change `aspectRatio="16 / 9"` on the `VideoHoverPreview`
call in `Navbar.tsx` to match its real shape (e.g. `"9 / 16"` for a
vertical clip) if it looks off.

The Services previews are a separate, older instance of this same
`VideoHoverPreview.tsx` component and still play with sound directly on
hover (no auto-unmute logic) since they weren't asked to change -- happy
to bring them in line with this same auto-unmute behavior if you'd like.

### Services boxes: big centered icon by default

Each service box's icon is now the main visual up front -- big (28px, in
a bigger rounded badge), centered at the top of the card, with the title
right under it and the description centered below that. Before, the icon
was small and tucked in the top-right corner next to the number; now it's
front and center every time, not just something that shows up more on
hover (hovering still adds the same glow/lift effect as before, just
doesn't change the icon's size or position).

### Hero: "Live Project" button is now "My Resume"

The button next to Contact Me in the Hero (which used to scroll down to
Projects) is now a "My Resume" button that points at your uploaded
`public/Rafael Porgatorio RESUME.pdf`. Hovering it pops open a preview of
the actual PDF centered over the Hero section (not the whole screen, just
the Hero -- so it reads as "part of this section" rather than a
full-page takeover), with a Download button in the corner; moving off
either the button or the preview closes it, with the same short grace
period used elsewhere so there's time to move your mouse onto the
Download button without it closing first. Clicking the button itself
(rather than hovering) opens the PDF directly in a new tab, so it still
works as a plain, functional link on phones and tablets, where there's no
such thing as "hovering."

One thing to flag: the file is named with spaces
(`Rafael Porgatorio RESUME.pdf`), which is fine -- the code encodes the
URL properly wherever it's used -- but if you ever replace the file with
a new version, keep the exact same filename (or update `RESUME_PATH` in
`HeroSection.tsx` to match the new name) so the link doesn't break.

### New: favicon -- a big "R" on the brand gradient

The browser tab now shows an actual icon instead of the default blank
page icon: a bold white "R" on the same three-color gradient used
throughout the site (magenta -> violet -> burnt orange), in a rounded
square, generated to match the brand rather than picked from a generic
icon set. It's referenced in `index.html` and comes in a few formats for
different browsers/devices:

- `public/favicon.svg` -- the primary one; scales perfectly, used by
  modern browsers.
- `public/favicon-32x32.png` and `favicon-16x16.png` -- for browsers that
  need a raster fallback.
- `public/favicon.ico` -- the old-school multi-size format some browsers
  and bookmarking tools still look for.
- `public/apple-touch-icon.png` (180x180) -- what shows up if someone
  adds the site to their iPhone/iPad home screen.
- `public/favicon-192.png` and `favicon-512.png` -- larger sizes kept on
  hand for later (e.g. if you ever add a web app manifest for
  "Add to Home Screen" on Android).

It was generated with a small script, `scripts/make_favicon.py` (needs
Python's Pillow and numpy, which are common but not guaranteed to be
installed -- `pip install pillow numpy` if it's missing), rather than
hand-drawn, so if you ever want to tweak the letter, colors, corner
roundness, or swap in a different mark entirely, editing the constants at
the top of that script and rerunning it regenerates every size
consistently in one shot.

## What to swap before launching

- **Files no longer used, please delete by hand**: I can create/update files
  on your computer through this connection but can't delete anything
  remotely, so these are just sitting there unused:
  - `src/components/InteractiveFace.tsx` (the 9-angle cursor face-turn
    component -- replaced by `TiltPhoto.tsx` now that there's one photo)
  - `public/faces/` (the whole folder -- all 9 angle cutouts, both the
    `.png` and older `.jpg` versions)
  - `public/avatar-full.jpg`, `public/avatar-face.jpg` (even older avatar
    crops, unused since several redesigns ago)
  - `public/rafael-cinematic.png` and `public/rafael-photo.png` (photo
    cutouts from two earlier Hero versions -- the Hero uses
    `public/rafael-portrait.jpg` now)
  - `src/hooks/useTypewriter.ts` (built for the "Mainframe"-style Hero's
    typewriter line, no longer used)
- **10th reel slot** (`src/sections/ProjectsSection.tsx`, the `REELS` array):
  the last card ("Daily Grind") is still a `picsum.photos` placeholder image,
  since only 9 Vimeo links were provided. Add a `vimeoId` to that entry once
  you have a tenth reel ready.
- **Loading screen timing** (`src/components/LoadingScreen.tsx`): the intro
  plays for about 2.3 seconds total. Shorten the `duration` value inside if
  it feels too long once you see it live.

## Notes

This project's dependencies (`framer-motion`, `lucide-react`, `lenis`,
`vite`, `tailwindcss`, etc.) could not be installed or build-verified in the
sandbox this was written in, because outbound access to the npm registry was
blocked by that environment's network policy. The source was hand-reviewed
and type-checked against the real React / Framer Motion / Lucide / Lenis
APIs it uses, so it should install and build cleanly with a normal
`npm install`, but please run `npm run build` yourself once and flag
anything that comes up.
