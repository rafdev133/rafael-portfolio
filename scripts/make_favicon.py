#!/usr/bin/env python3
"""Generates the site's favicon: a bold "R" on the brand gradient.

Brand colors (from tailwind.config.js / index.css): #B600A8 -> #7621B0 -> #BE4C00,
the same three stops used in the hero heading text and the navbar pill glow.
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SIZE = 1024
CORNER_RADIUS_PCT = 0.22  # rounded-square app-icon look
STOPS = [
    (0.00, (0xB6, 0x00, 0xA8)),  # magenta
    (0.50, (0x76, 0x21, 0xB0)),  # violet
    (1.00, (0xBE, 0x4C, 0x00)),  # burnt orange
]
FONT_PATH = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
LETTER = "R"
LETTER_COLOR = (255, 255, 255, 255)

OUT_DIR = "/home/claude/rafael-portfolio/public"


def make_gradient(size: int) -> Image.Image:
    """Diagonal (top-left -> bottom-right) 3-stop linear gradient."""
    ys, xs = np.mgrid[0:size, 0:size]
    # projection of each pixel onto the diagonal, normalized 0..1
    t = (xs.astype(np.float64) + ys.astype(np.float64)) / (2 * (size - 1))

    r = np.zeros_like(t)
    g = np.zeros_like(t)
    b = np.zeros_like(t)

    for (t0, c0), (t1, c1) in zip(STOPS[:-1], STOPS[1:]):
        mask = (t >= t0) & (t <= t1)
        span = (t1 - t0) if (t1 - t0) != 0 else 1
        local = np.clip((t[mask] - t0) / span, 0, 1)
        r[mask] = c0[0] + (c1[0] - c0[0]) * local
        g[mask] = c0[1] + (c1[1] - c0[1]) * local
        b[mask] = c0[2] + (c1[2] - c0[2]) * local

    rgb = np.stack([r, g, b], axis=-1).astype(np.uint8)
    return Image.fromarray(rgb, mode="RGB").convert("RGBA")


def rounded_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return mask


def main():
    bg = make_gradient(SIZE)
    mask = rounded_mask(SIZE, int(SIZE * CORNER_RADIUS_PCT))
    bg.putalpha(mask)

    draw = ImageDraw.Draw(bg)
    font_size = int(SIZE * 0.62)
    font = ImageFont.truetype(FONT_PATH, font_size)
    bbox = draw.textbbox((0, 0), LETTER, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (SIZE - w) / 2 - bbox[0]
    y = (SIZE - h) / 2 - bbox[1]
    draw.text((x, y), LETTER, font=font, fill=LETTER_COLOR)

    bg.save(f"{OUT_DIR}/favicon-1024.png")

    sizes = {
        "favicon-512.png": 512,
        "apple-touch-icon.png": 180,
        "favicon-192.png": 192,
        "favicon-32x32.png": 32,
        "favicon-16x16.png": 16,
    }
    for name, s in sizes.items():
        resized = bg.resize((s, s), Image.LANCZOS)
        resized.save(f"{OUT_DIR}/{name}")

    # Classic multi-size .ico for old-school compatibility
    icon_sizes = [(16, 16), (32, 32), (48, 48)]
    imgs = [bg.resize(s, Image.LANCZOS) for s in icon_sizes]
    imgs[0].save(f"{OUT_DIR}/favicon.ico", format="ICO", sizes=icon_sizes, append_images=imgs[1:])

    print("done")


if __name__ == "__main__":
    main()
