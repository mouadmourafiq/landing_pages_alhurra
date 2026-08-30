from pathlib import Path

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = PROJECT_ROOT.parent / "assets"
OUTPUT_DIR = PROJECT_ROOT / "public" / "media"

SPECS = {
    "product_open_section_antiage.png": ("product-open.webp", 1200, 84),
    "logo_alhurra.png": ("logo-alhurra.webp", 480, 88),
    "1produit.png": ("offer-1.webp", 650, 84),
    "2produit.png": ("offer-2.webp", 650, 84),
    "3prouduit.png": ("offer-3.webp", 650, 84),
    "al_hurra_probleme_visage_1.png": ("problem-dryness.webp", 520, 80),
    "al_hurra_probleme_visage_2.png": ("problem-wrinkles.webp", 520, 80),
    "al_hurra_probleme_visage_3.png": ("problem-elasticity.webp", 520, 80),
    "al_hurra_probleme_visage_4.png": ("problem-tone.webp", 520, 80),
    "testimonial_woman_01.png": ("testimonial-1.webp", 320, 80),
    "testimonial_woman_02.png": ("testimonial-2.webp", 320, 80),
    "testimonial_woman_03.png": ("testimonial-3.webp", 320, 80),
}


def optimize(source_name: str, output_name: str, max_width: int, quality: int) -> None:
    source_path = SOURCE_DIR / source_name
    output_path = OUTPUT_DIR / output_name

    with Image.open(source_path) as source:
        image = ImageOps.exif_transpose(source)
        if image.width > max_width:
            target_height = round(image.height * max_width / image.width)
            image = image.resize((max_width, target_height), Image.Resampling.LANCZOS)

        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        image.save(
            output_path,
            format="WEBP",
            quality=quality,
            method=6,
            exact=True,
        )


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, (output_name, max_width, quality) in SPECS.items():
        optimize(source_name, output_name, max_width, quality)
        output_path = OUTPUT_DIR / output_name
        print(f"{output_name}: {output_path.stat().st_size} bytes")


if __name__ == "__main__":
    main()
