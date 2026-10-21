/* ─────────────────────────────────────────────
   CCTV cost calculator
   ---------------------------------------------
   Turns a few questions about a property into a recommended IP CCTV setup
   (cameras, NVR, storage, PoE, cabling, installation) with an indicative
   price range. The prices below are typical Delhi NCR market ranges in INR
   (Oct 2026) — replace them with your own rates. Every figure shown to
   customers comes from PRICES, so this table is the only place to edit.
   ───────────────────────────────────────────── */

export type PropertyType = "flat" | "house" | "shop" | "office" | "school" | "society" | "factory";
export type Resolution = "2MP" | "4MP" | "8MP";
export type NightVision = "ir" | "colour";
export type Perimeter = "none" | "partial" | "full";

export type CalculatorInput = {
  propertyType: PropertyType;
  /** Built-up area per floor, sq ft. */
  areaPerFloor: number;
  floors: number;
  /** Pedestrian + vehicle entry/exit points. */
  gates: number;
  parking: boolean;
  perimeter: Perimeter;
  resolution: Resolution;
  nightVision: NightVision;
  recordingDays: number;
  faceRecognition: boolean;
  anpr: boolean;
  /** Gates vehicles use (ANPR cameras go here). */
  vehicleGates: number;
  powerBackup: boolean;
};

type Range = [low: number, high: number];

export const PRICES = {
  indoorCamera: { "2MP": [1800, 2800], "4MP": [2800, 4500], "8MP": [6000, 9500] } as Record<Resolution, Range>,
  outdoorCamera: { "2MP": [2200, 3200], "4MP": [3200, 5000], "8MP": [7000, 11000] } as Record<Resolution, Range>,
  colourNightVisionExtra: [800, 1800] as Range,
  faceRecognitionCamera: [12000, 25000] as Range,
  anprCamera: [35000, 70000] as Range,
  // channels → price range and hard-disk bays
  nvr: [
    { channels: 4, bays: 1, price: [3500, 5500] as Range },
    { channels: 8, bays: 1, price: [4500, 7500] as Range },
    { channels: 16, bays: 2, price: [9000, 15000] as Range },
    { channels: 32, bays: 4, price: [22000, 38000] as Range },
    { channels: 64, bays: 8, price: [55000, 90000] as Range },
  ],
  // surveillance-grade hard disk, TB → price range
  hdd: [
    { tb: 1, price: [3500, 4500] as Range },
    { tb: 2, price: [5000, 6500] as Range },
    { tb: 4, price: [8500, 11000] as Range },
    { tb: 6, price: [12500, 16000] as Range },
    { tb: 8, price: [17000, 22000] as Range },
    { tb: 10, price: [22000, 28000] as Range },
    { tb: 12, price: [26000, 33000] as Range },
  ],
  poeSwitch: [
    { ports: 4, price: [2500, 4000] as Range },
    { ports: 8, price: [4500, 7000] as Range },
    { ports: 16, price: [11000, 17000] as Range },
    { ports: 24, price: [16000, 26000] as Range },
  ],
  cablePerMetre: [30, 45] as Range,
  accessoriesPerCamera: [250, 500] as Range, // connectors, conduit, junction boxes
  installationPerCamera: [500, 1000] as Range,
  installationMinimum: [2000, 3000] as Range,
  upsSmall: [3500, 6000] as Range, // up to 16 cameras
  upsLarge: [12000, 25000] as Range, // online UPS for bigger systems
};

export const PROPERTY_TYPES: { id: PropertyType; label: string }[] = [
  { id: "flat", label: "Flat / Apartment" },
  { id: "house", label: "Independent House" },
  { id: "shop", label: "Shop / Showroom" },
  { id: "office", label: "Office" },
  { id: "school", label: "School / Hospital" },
  { id: "society", label: "Residential Society" },
  { id: "factory", label: "Factory / Warehouse" },
];

export const PROPERTY_DEFAULTS: Record<PropertyType, Partial<CalculatorInput>> = {
  flat: { areaPerFloor: 1200, floors: 1, gates: 1, parking: false, perimeter: "none" },
  house: { areaPerFloor: 1500, floors: 3, gates: 1, parking: true, perimeter: "partial" },
  shop: { areaPerFloor: 800, floors: 1, gates: 1, parking: false, perimeter: "none" },
  office: { areaPerFloor: 3000, floors: 1, gates: 1, parking: false, perimeter: "none" },
  school: { areaPerFloor: 8000, floors: 3, gates: 2, parking: true, perimeter: "full" },
  society: { areaPerFloor: 2000, floors: 10, gates: 2, parking: true, perimeter: "full" },
  factory: { areaPerFloor: 20000, floors: 1, gates: 2, parking: true, perimeter: "full" },
};

/** Starting answers for a property type (4MP, IR night vision, 30 days, no extras). */
export function defaultInputFor(propertyType: PropertyType): CalculatorInput {
  return {
    propertyType,
    areaPerFloor: 1500,
    floors: 1,
    gates: 1,
    parking: false,
    perimeter: "none",
    resolution: "4MP",
    nightVision: "ir",
    recordingDays: 30,
    faceRecognition: false,
    anpr: false,
    vehicleGates: 1,
    powerBackup: false,
    ...PROPERTY_DEFAULTS[propertyType],
  };
}

// Floor area one indoor camera covers, and average cable run per camera.
const COVERAGE_SQFT: Record<PropertyType, number> = {
  flat: 450, house: 500, shop: 350, office: 600, school: 700, society: 900, factory: 1500,
};
const CABLE_RUN_M: Record<PropertyType, number> = {
  flat: 15, house: 25, shop: 15, office: 25, school: 40, society: 40, factory: 50,
};

// Average continuous-recording bitrate with H.265+ smart codec, Mbps per camera.
const BITRATE_MBPS: Record<Resolution, number> = { "2MP": 1, "4MP": 1.5, "8MP": 3 };
const AI_CAMERA_MBPS = 3;

export type LineItem = { label: string; detail: string; qty: number; unit: Range; total: Range };

export type CalculatorResult = {
  indoorCameras: number;
  outdoorCameras: number;
  faceCameras: number;
  anprCameras: number;
  totalCameras: number;
  storageTb: number;
  items: LineItem[];
  total: Range;
};

const mul = ([lo, hi]: Range, n: number): Range => [lo * n, hi * n];
const add = (a: Range, b: Range): Range => [a[0] + b[0], a[1] + b[1]];
const roundTo = (n: number, step: number) => Math.round(n / step) * step;

export function calculateCctv(input: CalculatorInput): CalculatorResult {
  const floors = Math.max(1, Math.round(input.floors));
  const area = Math.max(100, input.areaPerFloor);
  const gates = Math.max(0, Math.round(input.gates));
  const vehicleGates = input.anpr ? Math.min(Math.max(1, Math.round(input.vehicleGates)), Math.max(gates, 1)) : 0;

  // Indoor: enough domes to cover each floor (societies: lobbies, corridors, lifts).
  const indoorCameras = Math.max(1, Math.ceil(area / COVERAGE_SQFT[input.propertyType])) * floors;

  // Outdoor: one per gate (face recognition replaces it), parking and perimeter.
  const faceCameras = input.faceRecognition ? Math.max(gates, 1) : 0;
  const gateCameras = input.faceRecognition ? 0 : gates;
  const parkingCameras = input.parking ? (["society", "factory", "school"].includes(input.propertyType) ? 4 : 1) : 0;
  const perimeterLength = 4 * Math.sqrt(area) * 0.3048; // metres, footprint of one floor
  const perimeterCameras =
    input.perimeter === "full" ? Math.max(2, Math.ceil(perimeterLength / 25)) : input.perimeter === "partial" ? 2 : 0;
  const outdoorCameras = gateCameras + parkingCameras + perimeterCameras;
  const anprCameras = vehicleGates;
  const totalCameras = indoorCameras + outdoorCameras + faceCameras + anprCameras;

  const items: LineItem[] = [];
  const push = (label: string, detail: string, qty: number, unit: Range) => {
    if (qty > 0) items.push({ label, detail, qty, unit, total: mul(unit, qty) });
  };

  const colour = input.nightVision === "colour";
  const res = input.resolution === "8MP" ? "8MP (4K)" : input.resolution;
  push(`${res} IP dome camera`, "Indoor", indoorCameras, PRICES.indoorCamera[input.resolution]);
  push(
    `${res} IP bullet camera`,
    colour ? "Outdoor, full-colour night vision" : "Outdoor, IR night vision",
    outdoorCameras,
    colour ? add(PRICES.outdoorCamera[input.resolution], PRICES.colourNightVisionExtra) : PRICES.outdoorCamera[input.resolution],
  );
  push("Face recognition camera", "At entrances", faceCameras, PRICES.faceRecognitionCamera);
  push("ANPR camera", "Number-plate recognition at vehicle gates", anprCameras, PRICES.anprCamera);

  // Storage: bitrate × days (1 Mbps ≈ 10.8 GB/day), +10% headroom.
  const dailyGb =
    (indoorCameras + outdoorCameras) * BITRATE_MBPS[input.resolution] * 10.8 + (faceCameras + anprCameras) * AI_CAMERA_MBPS * 10.8;
  const storageTb = (dailyGb * input.recordingDays * 1.1) / 1000;

  // NVR: smallest that fits the cameras and, with full bays, the storage.
  const largestDiskTb = PRICES.hdd[PRICES.hdd.length - 1].tb;
  const nvr =
    PRICES.nvr.find((n) => n.channels >= totalCameras && n.bays * largestDiskTb >= storageTb) ?? PRICES.nvr[PRICES.nvr.length - 1];
  const nvrCount = Math.max(Math.ceil(totalCameras / nvr.channels), Math.ceil(storageTb / (nvr.bays * largestDiskTb)));
  push(`${nvr.channels}-channel NVR`, `${nvr.bays} hard-disk bay${nvr.bays > 1 ? "s" : ""}, mobile app viewing`, nvrCount, nvr.price);

  // Spread the storage over each NVR's bays at the lowest disk cost.
  const perNvrTb = storageTb / nvrCount;
  const bays = nvr.bays;
  let best: { tb: number; count: number; price: Range } | null = null;
  for (const disk of PRICES.hdd) {
    const count = Math.ceil(perNvrTb / disk.tb);
    if (count < 1 || count > bays) continue;
    const cost = disk.price[0] * count;
    if (!best || cost < best.price[0] * best.count) best = { tb: disk.tb, count, price: disk.price };
  }
  // Needs more than the bays allow even with the largest disk: fill every bay.
  if (!best) {
    const largest = PRICES.hdd[PRICES.hdd.length - 1];
    best = { tb: largest.tb, count: bays, price: largest.price };
  }
  push(`${best.tb}TB surveillance hard disk`, `${input.recordingDays} days of recording`, best.count * nvrCount, best.price);

  // PoE switches for all IP cameras: 24-port units, then the smallest fit for the rest.
  let ports = totalCameras;
  const switches = new Map<number, number>();
  while (ports > 0) {
    const sw = ports > 16 ? PRICES.poeSwitch[3] : PRICES.poeSwitch.find((s) => s.ports >= ports)!;
    switches.set(sw.ports, (switches.get(sw.ports) ?? 0) + 1);
    ports -= sw.ports;
  }
  for (const [p, count] of switches) {
    push(`${p}-port PoE switch`, "Powers cameras over the network cable", count, PRICES.poeSwitch.find((s) => s.ports === p)!.price);
  }

  const cableMetres = roundTo(
    indoorCameras * CABLE_RUN_M[input.propertyType] + (outdoorCameras + faceCameras + anprCameras) * (CABLE_RUN_M[input.propertyType] + 15),
    10,
  );
  push("Cat6 cabling", "Estimated length, metres", cableMetres, PRICES.cablePerMetre);
  push("Connectors, conduit & junction boxes", "Per camera", totalCameras, PRICES.accessoriesPerCamera);

  if (input.powerBackup) {
    push(totalCameras > 16 ? "Online UPS" : "UPS", "Keeps recording during power cuts", 1, totalCameras > 16 ? PRICES.upsLarge : PRICES.upsSmall);
  }

  const install = mul(PRICES.installationPerCamera, totalCameras);
  const installation: Range = [Math.max(install[0], PRICES.installationMinimum[0]), Math.max(install[1], PRICES.installationMinimum[1])];
  items.push({
    label: "Installation & configuration",
    detail: "Mounting, wiring, NVR and mobile app setup",
    qty: 1,
    unit: installation,
    total: installation,
  });

  const total = items.reduce<Range>((sum, item) => add(sum, item.total), [0, 0]);
  return {
    indoorCameras,
    outdoorCameras,
    faceCameras,
    anprCameras,
    totalCameras,
    storageTb: Math.round(storageTb * 10) / 10,
    items,
    total: [roundTo(total[0], 500), roundTo(total[1], 500)],
  };
}

export const formatInr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/** Plain-text summary used for the enquiry, WhatsApp and the AI assistant. */
export function summariseSetup(input: CalculatorInput, result: CalculatorResult) {
  const property = PROPERTY_TYPES.find((p) => p.id === input.propertyType)?.label ?? input.propertyType;
  return [
    `CCTV calculator: ${property}, ${input.floors} floor(s) × ${input.areaPerFloor} sq ft, ${input.gates} gate(s).`,
    `Suggested: ${result.totalCameras} cameras (${result.indoorCameras} indoor, ${result.outdoorCameras} outdoor` +
      `${result.faceCameras ? `, ${result.faceCameras} face recognition` : ""}${result.anprCameras ? `, ${result.anprCameras} ANPR` : ""}), ` +
      `${input.resolution}, ${input.nightVision === "colour" ? "full-colour" : "IR"} night vision, ${input.recordingDays} days recording (~${result.storageTb} TB).`,
    `Indicative estimate: ${formatInr(result.total[0])} – ${formatInr(result.total[1])}.`,
  ].join(" ");
}
