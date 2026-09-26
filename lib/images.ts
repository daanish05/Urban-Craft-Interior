// Centralised imagery for UCI.
// These are premium stock placeholders. Replace each entry with real UCI
// project photography by swapping the URL for an uploaded asset in /public.
//
// Helper builds an optimised Unsplash URL at a given width.
const u = (id: string, w: number = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  hero: u("photo-1618221195710-dd6b41faaea6", 2200),

  living1: u("photo-1600210492486-724fe5c67fb0"),
  living2: u("photo-1586023492125-27b2c045efd7"),
  living3: u("photo-1522708323590-d24dbb6b0267"),

  kitchen1: u("photo-1556911220-bff31c812dba"),
  kitchen2: u("photo-1594026112284-02bb6f3352fe"),

  bedroom1: u("photo-1616594039964-ae9021a400a0"),
  bedroom2: u("photo-1616486338812-3dadae4b4ace"),
  bedroom3: u("photo-1567016432779-094069958ea5"),
  bedroom4: u("photo-1615874959474-d609969a20ed"),

  wardrobe: u("photo-1595526114035-0d45ed16cfbf"),
  tvunit: u("photo-1600607688969-a5bfcd646154"),
  complete: u("photo-1600566753086-00f18fb6b3ea"),
  commercial: u("photo-1497366754035-f200968a6e72"),
  detail: u("photo-1583847268964-b28dc8f51f92"),

  // Materials
  wood: u("photo-1615971677499-5467cbab01c0"),
  wood2: u("photo-1607344645866-009c320b63e0"),
  stone: u("photo-1618220179428-22790b461013"),
  fabric: u("photo-1616627561839-074385245ff6"),
  glass: u("photo-1550537687-c91072c4792d"),
  metal: u("photo-1567016376408-0226e4d0c1ea"),
  laminates: u("photo-1556228453-efd6c1ff04f6"),
  hardware: u("photo-1504148455328-c376907d081c"),

  // Manufacturing / craft
  workshop1: u("photo-1416879595882-3373a0480b5b"),
  workshop2: u("photo-1581094794329-c8112a89af12"),
  workshop3: u("photo-1567767292278-a4f21aa2d36e"),
};

export const LOGO = {
  /** Light artwork for dark surfaces (transparent background). */
  onDark: "/logo-on-dark.png",
  /** Dark artwork for light surfaces (transparent background). */
  onLight: "/logo-on-light.png",
  /** Single-colour mark for subtle textures (white background). */
  watermark: "/watermark.jpg",
} as const;

export const SERVICE_IMAGES: Record<string, string> = {
  "01": IMG.living2,
  "02": IMG.living3,
  "03": IMG.kitchen1,
  "04": IMG.bedroom1,
  "05": IMG.living1,
  "06": IMG.bedroom4,
  "07": IMG.wardrobe,
  "08": IMG.tvunit,
  "09": IMG.detail,
  "10": IMG.wood2,
  "11": IMG.commercial,
};

export const PROJECT_IMAGES = [
  IMG.living3,
  IMG.kitchen1,
  IMG.bedroom1,
  IMG.wardrobe,
  IMG.complete,
  IMG.commercial,
];

export const MATERIAL_IMAGES = [
  IMG.wood,
  IMG.stone,
  IMG.fabric,
  IMG.glass,
  IMG.metal,
  IMG.laminates,
  IMG.wood2,
  IMG.hardware,
];
