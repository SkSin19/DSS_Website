/* ─────────────────────────────────────────────
   Blog posts
   ---------------------------------------------
   To add a post, append an object to BLOG_POSTS. Everything else (listing
   page, post page, sitemap, JSON-LD, related posts) picks it up automatically.

   Inline formatting inside `text` / list items:
     **bold**            → <strong>
     [label](/path)      → internal or external link
   ───────────────────────────────────────────── */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** <title> tag; falls back to `title`. Keep under ~60 chars. */
  metaTitle?: string;
  /** Meta description, ~150–160 chars. */
  description: string;
  category: BlogCategory;
  keywords: string[];
  coverImage: string;
  coverAlt: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  author: string;
  content: BlogBlock[];
  faqs?: BlogFaq[];
};

export const BLOG_CATEGORIES = [
  "CCTV & Surveillance",
  "Access Control",
  "Buying Guides",
  "Maintenance",
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const AUTHOR = "Digital Security Solutions Team";

export const BLOG_POSTS: BlogPost[] = [
  /* ──────────────────────────────────────── */
  {
    slug: "cctv-camera-installation-cost-delhi",
    title: "CCTV Camera Installation Cost in Delhi: What Really Decides the Price",
    metaTitle: "CCTV Installation Cost in Delhi – Price Factors Explained",
    description:
      "What affects CCTV camera installation cost in Delhi NCR? Camera type, resolution, recorder, storage, cabling and labour explained so you can budget correctly.",
    category: "Buying Guides",
    keywords: [
      "CCTV installation cost Delhi",
      "CCTV camera price Delhi",
      "CCTV installation charges",
      "4 camera CCTV setup cost",
      "CCTV quotation Delhi NCR",
    ],
    coverImage: "/images/general/technicians_installing_camera.png",
    coverAlt: "Technicians installing a CCTV camera on a wall in Delhi",
    publishedAt: "2026-09-08",
    updatedAt: "2026-10-01",
    author: AUTHOR,
    content: [
      { type: "p", text: "\"How much will a CCTV system cost?\" is the first question almost every customer asks us. The honest answer is that two quotes for \"4 cameras\" can differ a lot, because the final price depends on **what** is being installed and **how** it is installed. This guide breaks down every cost component so you can compare quotations line by line instead of just looking at the total." },
      { type: "h2", text: "1. Camera type: HD (analog) vs IP" },
      { type: "p", text: "**HD analog cameras** connect to a DVR over coaxial cable and are the most budget-friendly option for homes and small shops. **IP cameras** connect to an NVR over network (LAN) cable, usually deliver sharper images and smarter features, and cost more per camera. If you are unsure which one suits you, read our [IP vs HD CCTV comparison](/blogs/ip-vs-analog-hd-cctv-cameras)." },
      { type: "h2", text: "2. Resolution and night vision" },
      { type: "p", text: "Moving from 2MP to 4MP or 5MP improves detail (faces, number plates) but increases the price of the camera, the recorder and the storage you need. Colour night-vision cameras (with white-light or full-colour sensors) also cost more than standard infrared models. Choose higher resolution only where detail matters — entrances, cash counters and gates." },
      { type: "h2", text: "3. Recorder (DVR / NVR) and channels" },
      { type: "p", text: "Recorders are sold by channel count — 4, 8, 16 or 32. A common mistake is buying a 4-channel recorder for exactly 4 cameras; adding a fifth camera later then means replacing the recorder. If you think you may expand, an 8-channel unit is usually the smarter buy." },
      { type: "h2", text: "4. Hard disk (storage)" },
      { type: "p", text: "Storage capacity decides how many days of footage you keep. More cameras, higher resolution and 24×7 recording all need bigger disks. Always insist on a **surveillance-grade hard disk** (built for continuous writing) rather than a desktop drive. Our [CCTV storage guide](/blogs/cctv-storage-calculation-dvr-nvr-hard-disk) shows how to estimate the size you need." },
      { type: "h2", text: "5. Cabling, power and accessories" },
      { type: "p", text: "This is where quotes differ the most. Check the cable quality (pure copper vs copper-clad), whether conduit/casing pipe is included, the type of power supply (SMPS or PoE switch), connectors, and whether a monitor or UPS is part of the package. Longer cable runs in bungalows, factories and multi-floor buildings add both material and labour cost." },
      { type: "h2", text: "6. Installation labour and site conditions" },
      { type: "p", text: "Labour depends on mounting height, wall type, concealed vs surface wiring, and how many floors the cable has to travel. A proper installer will also configure mobile viewing, set recording schedules, adjust camera angles and explain the app to you — make sure these are included." },
      { type: "h2", text: "Sample quote checklist" },
      { type: "table", head: ["Item", "What to confirm in the quote"], rows: [
        ["Cameras", "Brand, model, resolution, dome/bullet, night vision type"],
        ["Recorder", "DVR or NVR, channel count, brand"],
        ["Hard disk", "Capacity and surveillance-grade model"],
        ["Cable", "Type, length and copper quality"],
        ["Power", "SMPS or PoE switch, UPS if any"],
        ["Labour", "Concealed or surface wiring, conduit included?"],
        ["Setup", "Mobile app configuration and demo"],
        ["Warranty", "Product warranty and installation support period"],
      ] },
      { type: "tip", text: "Ask for a **free site survey** before finalising. A survey lets the installer measure cable lengths and pick the right cameras, which avoids surprise charges later. You can [book one here](/enquiry)." },
      { type: "h2", text: "How to keep the cost under control" },
      { type: "ul", items: [
        "Use higher-resolution cameras only at critical points; standard 2MP is fine for corridors and common areas.",
        "Buy a recorder with a few spare channels so you don't have to replace it later.",
        "Choose genuine, warranty-backed brands such as [Hikvision, CP Plus and Dahua](/products?category=Surveillance) — cheap unbranded cameras often fail within a year.",
        "Plan cable routes with your installer to avoid unnecessary wall breaking.",
      ] },
    ],
    faqs: [
      { q: "Does the CCTV installation price include the hard disk?", a: "Not always. Some quotes show the hard disk as a separate line item. Always check the storage capacity and whether it is a surveillance-grade drive." },
      { q: "Can I add more cameras later?", a: "Yes, as long as your DVR/NVR has free channels and the power supply can handle the extra load. That is why we usually recommend an 8-channel recorder even for a 4-camera setup." },
      { q: "Is a site visit necessary before getting a CCTV quotation?", a: "For anything beyond a very small setup, yes. A site visit lets the technician measure cable runs and choose the right camera for each spot, so the quote you get is accurate." },
    ],
  },

  /* ──────────────────────────────────────── */
  {
    slug: "ip-vs-analog-hd-cctv-cameras",
    title: "IP vs HD (Analog) CCTV Cameras: Which One Should You Choose?",
    metaTitle: "IP vs Analog HD CCTV Cameras – Which Is Better?",
    description:
      "IP cameras or HD analog cameras? Compare image quality, cabling, cost, remote viewing and scalability to pick the right CCTV system for your home or business.",
    category: "CCTV & Surveillance",
    keywords: [
      "IP vs analog CCTV",
      "IP camera vs HD camera",
      "DVR vs NVR",
      "which CCTV camera is best",
      "PoE camera",
    ],
    coverImage: "/images/categories/video-security-cctv-systems.png",
    coverAlt: "IP and HD analog CCTV cameras compared",
    publishedAt: "2026-09-12",
    author: AUTHOR,
    content: [
      { type: "p", text: "Every CCTV system is built on one of two technologies: **HD analog** (cameras + DVR) or **IP** (network cameras + NVR). Both can record clear footage and both support mobile viewing, so the right choice depends on your site, budget and plans for the future." },
      { type: "h2", text: "How HD analog (DVR) systems work" },
      { type: "p", text: "HD analog cameras send video over coaxial cable to a **DVR (Digital Video Recorder)**, which processes and stores the footage. Modern HD formats deliver good 2MP–5MP images and are a big step up from the old CCTV of a decade ago." },
      { type: "ul", items: [
        "**Lower cost** per camera and recorder.",
        "**Simple to install** and easy to upgrade from an older coaxial setup — existing cables can often be reused.",
        "Camera power usually needs a separate power supply (SMPS) and cable.",
      ] },
      { type: "h2", text: "How IP (NVR) systems work" },
      { type: "p", text: "IP cameras are small network devices. They process video themselves and send it over LAN cable to an **NVR (Network Video Recorder)**. With **PoE (Power over Ethernet)**, a single network cable carries both power and data." },
      { type: "ul", items: [
        "**Sharper images** and higher resolutions (4MP, 5MP, 8MP/4K).",
        "**Smart features** such as human/vehicle detection, line-crossing alerts and better compression.",
        "**Easier scaling** — cameras can be added anywhere on the network.",
        "Higher upfront cost than analog.",
      ] },
      { type: "h2", text: "Side-by-side comparison" },
      { type: "table", head: ["Factor", "HD Analog (DVR)", "IP (NVR)"], rows: [
        ["Typical resolution", "2MP – 5MP", "2MP – 8MP (4K)"],
        ["Cable", "Coaxial + power cable", "Single LAN cable with PoE"],
        ["Upfront cost", "Lower", "Higher"],
        ["Smart analytics", "Basic", "Advanced"],
        ["Best for", "Homes, small shops, upgrades", "Offices, schools, factories, large sites"],
      ] },
      { type: "h2", text: "Our recommendation" },
      { type: "p", text: "For a **home or small shop** with 2–8 cameras and a tight budget, a good HD analog system is perfectly adequate. For **offices, warehouses, schools, hospitals and societies** — or anywhere you need to read faces or number plates — IP cameras are worth the extra investment. Hybrid recorders can also run both types together while you upgrade gradually." },
      { type: "tip", text: "Not sure what suits your site? [Talk to our team](/enquiry) — we'll suggest the right system after a quick survey. You can also browse our [surveillance products](/products?category=Surveillance)." },
    ],
    faqs: [
      { q: "Can I use IP cameras with my existing DVR?", a: "Many hybrid DVRs (often labelled XVR or HVR) support a few IP cameras alongside analog ones. Check your recorder model or ask us to check it for you." },
      { q: "Do IP cameras need internet to work?", a: "No. IP cameras record to the NVR over your local network without internet. Internet is only required if you want to view the cameras remotely on your phone." },
      { q: "Is PoE necessary for IP cameras?", a: "It isn't mandatory, but PoE is strongly recommended because one cable supplies both power and data, which makes installation cleaner and more reliable." },
    ],
  },

  /* ──────────────────────────────────────── */
  {
    slug: "how-to-choose-cctv-camera-for-home",
    title: "How to Choose the Right CCTV Camera for Your Home",
    metaTitle: "How to Choose a CCTV Camera for Home – Buyer's Guide",
    description:
      "Planning home CCTV in Delhi? Learn where to place cameras, which resolution and night vision to choose, Wi-Fi vs wired, and how to view footage on your phone.",
    category: "Buying Guides",
    keywords: [
      "best CCTV camera for home",
      "home CCTV installation Delhi",
      "CCTV for house",
      "Wi-Fi camera vs wired CCTV",
      "home security camera",
    ],
    coverImage: "/images/hero/hero-residential.webp",
    coverAlt: "Home CCTV camera protecting a residential entrance",
    publishedAt: "2026-09-16",
    author: AUTHOR,
    content: [
      { type: "p", text: "A well-planned home CCTV system lets you see who is at the door, keep an eye on elderly parents or children, and gives you evidence if something goes wrong. Here is a simple, practical way to plan one." },
      { type: "h2", text: "Step 1: Decide where cameras are needed" },
      { type: "ul", items: [
        "**Main entrance / door** — the most important camera; it should clearly capture faces.",
        "**Gate and parking** — to monitor vehicles and visitors.",
        "**Staircase or lobby** — common in independent floors and builder flats.",
        "**Back door, balcony or terrace access** — common entry points for intruders.",
        "**Inside the home (optional)** — living room or near elderly family members, with privacy in mind.",
      ] },
      { type: "h2", text: "Step 2: Pick the right camera style" },
      { type: "p", text: "**Dome cameras** are discreet and suit indoor ceilings and covered porches. **Bullet cameras** are more visible (a deterrent in itself) and are better for outdoor walls and long views such as gates and driveways." },
      { type: "h2", text: "Step 3: Resolution and night vision" },
      { type: "p", text: "2MP (1080p) is enough for most indoor spaces. For the main entrance and gate, 4MP or above gives better facial and number-plate detail. Consider **colour night vision** cameras for outdoor spots so that night footage shows clothing and vehicle colours, not just black-and-white shapes." },
      { type: "h2", text: "Step 4: Wi-Fi camera or wired CCTV?" },
      { type: "table", head: ["", "Wi-Fi camera", "Wired CCTV system"], rows: [
        ["Setup", "Quick, minimal wiring", "Needs cabling to a recorder"],
        ["Reliability", "Depends on Wi-Fi strength", "Very stable"],
        ["Storage", "SD card or cloud", "Hard disk in DVR/NVR"],
        ["Best for", "1–2 cameras, rented homes", "Whole-house coverage"],
      ] },
      { type: "p", text: "For more than two or three cameras we recommend a wired system — it records continuously, doesn't drop out when Wi-Fi is weak, and keeps all footage in one place." },
      { type: "h2", text: "Step 5: Mobile viewing and alerts" },
      { type: "p", text: "All major brands such as [Hikvision, CP Plus and Dahua](/products?category=Surveillance) offer free mobile apps for live view and playback. Ask your installer to set up the app on every family member's phone and to configure motion alerts only for the zones that matter, so you don't get flooded with notifications." },
      { type: "h2", text: "Add-ons worth considering" },
      { type: "ul", items: [
        "A [video door phone](/solutions) so you can see and talk to visitors before opening the door.",
        "An [intrusion alarm](/blogs/intrusion-alarm-system-guide) for when the house is locked and empty.",
        "A small UPS so cameras keep recording during power cuts.",
      ] },
      { type: "tip", text: "Living in Delhi NCR? We install home CCTV systems across Delhi, Noida, Greater Noida and Ghaziabad. [Request a free home security consultation](/enquiry)." },
    ],
    faqs: [
      { q: "How many CCTV cameras do I need for my house?", a: "A typical independent floor needs 3–4 cameras (entrance, staircase/lobby, parking and one indoor). Larger houses and kothis usually need 6–8 or more for full coverage." },
      { q: "Can I watch my home CCTV on my mobile?", a: "Yes. Once the recorder is connected to the internet, you can watch live and recorded footage on the brand's free mobile app from anywhere." },
      { q: "Will CCTV work during a power cut?", a: "Only if the cameras and recorder are on a UPS or inverter. We recommend connecting the CCTV system to backup power so that recording doesn't stop." },
    ],
  },

  /* ──────────────────────────────────────── */
  {
    slug: "biometric-attendance-system-for-office",
    title: "Biometric Attendance Systems for Offices: A Practical Buyer's Guide",
    metaTitle: "Biometric Attendance Machine for Office – Buyer's Guide",
    description:
      "Fingerprint, face or card? Learn how to choose a biometric attendance machine for your office or factory, plus software, payroll integration and installation tips.",
    category: "Access Control",
    keywords: [
      "biometric attendance machine",
      "face attendance system",
      "fingerprint attendance machine Delhi",
      "attendance system for office",
      "eSSL biometric",
    ],
    coverImage: "/images/services/biometric-attendance.png",
    coverAlt: "Biometric fingerprint and face attendance machine",
    publishedAt: "2026-09-20",
    author: AUTHOR,
    content: [
      { type: "p", text: "Manual registers and punch cards are easy to manipulate and slow to process. A **biometric attendance system** records who came in and when, accurately, and feeds that data straight into your attendance or payroll software." },
      { type: "h2", text: "Types of biometric attendance machines" },
      { type: "h3", text: "Fingerprint" },
      { type: "p", text: "The most common and affordable option. Works well for most offices, but can struggle with users whose fingerprints are worn — common in construction, manufacturing and kitchens." },
      { type: "h3", text: "Face recognition" },
      { type: "p", text: "Touch-free and fast, which makes it more hygienic and better for high-traffic entrances. Modern face terminals work reliably with masks and varying light, and are now the most popular choice for new installations." },
      { type: "h3", text: "RFID card / PIN" },
      { type: "p", text: "Often included as a backup method on biometric devices. On their own, cards can be shared between employees (\"buddy punching\"), so they work best combined with fingerprint or face." },
      { type: "h2", text: "What to check before buying" },
      { type: "ul", items: [
        "**User and log capacity** — make sure the device supports your current headcount with room to grow.",
        "**Connectivity** — LAN, Wi-Fi or cloud, so data reaches HR without someone downloading it manually.",
        "**Software** — shift rules, overtime, leave and reports that match how your company actually works.",
        "**Payroll export** — compatibility with your payroll or HRMS system.",
        "**Access control** — whether the same device can also unlock the door.",
        "**Battery backup** — so punches aren't lost during power cuts.",
      ] },
      { type: "h2", text: "Attendance only, or attendance + access control?" },
      { type: "p", text: "Many biometric devices can also drive an electromagnetic lock, so only registered employees can open the office door. This combines two needs in one device. Read more in our [access control systems guide](/blogs/access-control-system-types-explained)." },
      { type: "tip", text: "We supply and install biometric attendance and access control devices from trusted brands like eSSL and Hikvision, including software setup and staff enrolment. [Browse biometric products](/products?category=Biometric%20%26%20Identity) or [get a quote](/enquiry)." },
    ],
    faqs: [
      { q: "Which is better for attendance: fingerprint or face recognition?", a: "Face recognition is faster, touch-free and works for staff with worn fingerprints, so it's usually the better choice for new installations. Fingerprint devices remain a good low-cost option for small offices." },
      { q: "Can I check attendance remotely?", a: "Yes. Cloud-enabled devices and software let HR and managers view attendance from anywhere, including across multiple branches." },
      { q: "Can one device be used for both attendance and door access?", a: "Yes. Most modern biometric terminals support access control and can operate a door lock in addition to recording attendance." },
    ],
  },

  /* ──────────────────────────────────────── */
  {
    slug: "access-control-system-types-explained",
    title: "Access Control Systems Explained: Card, PIN, Biometric and Face",
    metaTitle: "Access Control System Types Explained – Card, PIN & Face",
    description:
      "Understand how access control systems work — card, PIN, fingerprint and face readers, locks, controllers and software — and choose the right one for your premises.",
    category: "Access Control",
    keywords: [
      "access control system",
      "door access control Delhi",
      "RFID access control",
      "face recognition door lock",
      "access control installation",
    ],
    coverImage: "/images/categories/access-control-smart-entry.png",
    coverAlt: "Door access control reader with card and biometric entry",
    publishedAt: "2026-09-24",
    author: AUTHOR,
    content: [
      { type: "p", text: "An **access control system** decides who can open which door, and when. Unlike a key, access can be granted or revoked instantly, and every entry is logged. It's the standard for offices, server rooms, labs, societies and factories." },
      { type: "h2", text: "The building blocks" },
      { type: "ul", items: [
        "**Reader / credential** — the card reader, keypad, fingerprint scanner or face terminal a person uses.",
        "**Controller** — the \"brain\" that checks permissions and decides whether to unlock.",
        "**Lock** — electromagnetic (EM) lock, drop bolt or electric strike, matched to the door type.",
        "**Exit button and emergency release** — so people can always get out, including in a fire.",
        "**Software** — to add/remove users, set time schedules and view entry logs.",
      ] },
      { type: "h2", text: "Choosing the credential type" },
      { type: "table", head: ["Credential", "Security", "Convenience", "Good for"], rows: [
        ["PIN keypad", "Low – codes get shared", "High", "Store rooms, low-risk doors"],
        ["RFID card / tag", "Medium – cards can be lent", "High", "Offices, societies, hotels"],
        ["Fingerprint", "High", "Medium", "Offices, server rooms"],
        ["Face recognition", "High", "Very high, touch-free", "Main entrances, high footfall"],
        ["Multi-factor (card + face)", "Very high", "Medium", "Data centres, cash rooms"],
      ] },
      { type: "h2", text: "Standalone vs networked systems" },
      { type: "p", text: "A **standalone** reader controls a single door and is managed on the device itself — simple and economical for one or two doors. A **networked** system connects multiple doors to central software so you can manage users across floors or branches, set schedules and pull reports from one screen." },
      { type: "h2", text: "Don't forget safety and integration" },
      { type: "ul", items: [
        "Locks should release automatically on power failure or fire alarm (fail-safe) on escape routes.",
        "Integrate with [CCTV](/blogs/ip-vs-analog-hd-cctv-cameras) so every door event can be matched with video.",
        "Use the same device for [biometric attendance](/blogs/biometric-attendance-system-for-office) to avoid double hardware.",
        "For gates and parking, consider boom barriers and [gate automation](/solutions).",
      ] },
      { type: "tip", text: "We design and install access control systems for offices, societies and industrial sites across Delhi NCR. [Explore access control products](/products?category=Access%20Control) or [ask for a site survey](/enquiry)." },
    ],
    faqs: [
      { q: "What happens to an access-controlled door during a power cut?", a: "Fail-safe locks (such as EM locks) unlock when power is lost so people can exit safely. A battery backup keeps the system working normally during short outages." },
      { q: "Can I add or remove employees myself?", a: "Yes. Users can be added or removed from the device or the software in a few seconds, and lost cards can be blocked immediately." },
      { q: "Can access control work with my existing door?", a: "In most cases, yes. The installer selects the right lock type — EM lock, drop bolt or strike — for wooden, glass or metal doors." },
    ],
  },

  /* ──────────────────────────────────────── */
  {
    slug: "cctv-storage-calculation-dvr-nvr-hard-disk",
    title: "How Much Hard Disk Storage Does Your CCTV System Need?",
    metaTitle: "CCTV Storage Calculator Guide – DVR/NVR Hard Disk Size",
    description:
      "How many days will your CCTV record? Learn how cameras, resolution, compression (H.265) and recording mode affect DVR/NVR hard disk size, with a simple formula.",
    category: "CCTV & Surveillance",
    keywords: [
      "CCTV storage calculation",
      "DVR hard disk size",
      "NVR storage",
      "how many days CCTV recording",
      "surveillance hard disk",
    ],
    coverImage: "/images/hero/advanced-digital-security-cameras-slide-2.png",
    coverAlt: "CCTV cameras and NVR recorder with surveillance hard disk",
    publishedAt: "2026-09-29",
    author: AUTHOR,
    content: [
      { type: "p", text: "One of the most common complaints we hear is: \"The incident happened last week, but the footage is already gone.\" That happens when the hard disk is too small for the number of cameras. Here's how to size storage properly." },
      { type: "h2", text: "What decides how much storage you need" },
      { type: "ul", items: [
        "**Number of cameras** — storage scales directly with camera count.",
        "**Resolution** — 4MP and 8MP cameras produce much more data than 2MP.",
        "**Compression** — **H.265 / H.265+** uses significantly less space than the older H.264 for similar quality.",
        "**Bitrate and frame rate** — set on the recorder; higher means smoother but larger footage.",
        "**Recording mode** — continuous 24×7 recording vs motion-only recording.",
        "**Scene activity** — busy roads and shops generate more data than a quiet corridor.",
      ] },
      { type: "h2", text: "A simple formula" },
      { type: "p", text: "Storage per day (GB) ≈ **bitrate (Mbps) × 10.8**, per camera. Multiply by the number of cameras and the number of days you want to keep." },
      { type: "p", text: "For example, 8 cameras each recording at 2 Mbps for 30 days: 2 × 10.8 × 8 × 30 ≈ **5,184 GB**, so a 6TB disk would be the right choice." },
      { type: "tip", text: "Your installer can check the actual bitrate of each camera on the recorder. Planning with real numbers is far more accurate than guessing." },
      { type: "h2", text: "Ways to keep footage longer without a bigger disk" },
      { type: "ol", items: [
        "Enable **H.265+** (or the brand's equivalent smart codec) on all cameras.",
        "Use **motion-based recording** on low-activity cameras such as stores and back areas.",
        "Lower the frame rate slightly on cameras where smooth motion isn't critical.",
        "Add a second hard disk — most 8 and 16-channel recorders have two or more bays.",
      ] },
      { type: "h2", text: "Always use a surveillance-grade hard disk" },
      { type: "p", text: "CCTV recorders write data 24 hours a day. Desktop hard disks aren't designed for this and fail much sooner. Surveillance drives such as **Seagate SkyHawk** and **WD Purple** are built for continuous recording and multiple camera streams." },
      { type: "p", text: "Planning a new system? Our [CCTV installation cost guide](/blogs/cctv-camera-installation-cost-delhi) explains how storage fits into the overall budget." },
    ],
    faqs: [
      { q: "How many days of recording does a 1TB hard disk give?", a: "It depends on cameras and settings. As a rough guide, four 2MP cameras on H.265 recording 24×7 at 1–2 Mbps each fit roughly 10–25 days on 1TB. Your installer can calculate the exact figure from the recorder's bitrate." },
      { q: "What happens when the CCTV hard disk is full?", a: "By default, recorders overwrite the oldest footage automatically, so recording never stops — you simply keep a fixed number of days." },
      { q: "Can I back up important CCTV footage?", a: "Yes. You can export clips to a USB drive from the recorder, or download them from the mobile app or PC software." },
    ],
  },

  /* ──────────────────────────────────────── */
  {
    slug: "cctv-maintenance-checklist",
    title: "CCTV Maintenance Checklist: Keep Your Cameras Recording When It Matters",
    metaTitle: "CCTV Maintenance Checklist – Monthly & Yearly AMC Tasks",
    description:
      "A simple monthly and yearly CCTV maintenance checklist covering cameras, cables, DVR/NVR, hard disk health and remote viewing, plus when to opt for an AMC.",
    category: "Maintenance",
    keywords: [
      "CCTV maintenance",
      "CCTV AMC Delhi",
      "CCTV repair Delhi",
      "CCTV not recording",
      "DVR no video fix",
    ],
    coverImage: "/images/categories/PUBLIC_NEXT_SUERVEILLANCE_SYSTEM_CARD_BG.jpg",
    coverAlt: "Technician performing CCTV system maintenance",
    publishedAt: "2026-10-03",
    author: AUTHOR,
    content: [
      { type: "p", text: "Most CCTV failures are only discovered **after** an incident, when someone tries to pull footage and finds a blank screen. A few minutes of regular checks can prevent that." },
      { type: "h2", text: "Weekly (2 minutes)" },
      { type: "ul", items: [
        "Open the mobile app and confirm every camera shows a live picture.",
        "Play back a few minutes from the previous night to confirm recording is working.",
      ] },
      { type: "h2", text: "Monthly" },
      { type: "ul", items: [
        "Wipe camera lenses and domes — dust, cobwebs and Delhi's pollution quickly blur images.",
        "Check night-vision footage; spiders and webs near IR lights cause false motion alerts and glare.",
        "Make sure the recorder's date and time are correct (important if footage is used as evidence).",
        "Check the hard disk status in the recorder menu for errors.",
      ] },
      { type: "h2", text: "Every 6–12 months" },
      { type: "ul", items: [
        "Inspect outdoor cables, connectors and junction boxes for water damage, especially before and after the monsoon.",
        "Test the UPS/inverter backup for cameras and recorder.",
        "Update recorder and camera firmware, and change default passwords.",
        "Re-check camera angles — trees grow, signboards change and cameras get knocked.",
        "Review whether you need more cameras or storage as your premises change.",
      ] },
      { type: "h2", text: "Common problems and likely causes" },
      { type: "table", head: ["Problem", "Likely cause"], rows: [
        ["\"No video\" on one camera", "Loose connector, faulty power supply or cable damage"],
        ["Blurry or hazy picture", "Dirty lens, moisture inside housing or focus drift"],
        ["Not recording", "Hard disk failure or full disk with overwrite disabled"],
        ["App not connecting", "Router change, internet issue or changed password"],
        ["Lines or flicker in image", "Poor-quality cable or electrical interference"],
      ] },
      { type: "h2", text: "When an AMC makes sense" },
      { type: "p", text: "For offices, shops, societies and factories with 8 or more cameras, an **Annual Maintenance Contract (AMC)** is usually cheaper than ad-hoc repairs. It includes scheduled preventive visits and priority support when something stops working." },
      { type: "tip", text: "Cameras down or not recording? We repair and maintain CCTV systems of all major brands across Delhi NCR. [Book a service visit](/enquiry)." },
    ],
    faqs: [
      { q: "How often should CCTV cameras be serviced?", a: "A quick weekly check by the owner plus a professional preventive maintenance visit every 6 months is a good routine for most homes and businesses." },
      { q: "Do you repair CCTV systems installed by someone else?", a: "Yes. We service and repair CCTV systems from all major brands, regardless of who originally installed them." },
      { q: "Why does my CCTV camera show 'No Video'?", a: "The most common reasons are a loose connector, a failed power supply or a damaged cable. If the problem persists after checking these, the camera itself may need replacement." },
    ],
  },

  /* ──────────────────────────────────────── */
  {
    slug: "intrusion-alarm-system-guide",
    title: "Intrusion Alarm Systems: How They Protect Homes and Shops",
    metaTitle: "Intrusion Alarm System Guide for Homes & Shops",
    description:
      "How burglar and intrusion alarm systems work — sensors, sirens, wired vs wireless, mobile alerts — and why pairing an alarm with CCTV gives the best protection.",
    category: "Buying Guides",
    keywords: [
      "intrusion alarm system",
      "burglar alarm Delhi",
      "wireless alarm system for home",
      "security alarm for shop",
      "anti-theft alarm",
    ],
    coverImage: "/images/services/intrusion-alarm.png",
    coverAlt: "Wireless intrusion alarm control panel and sensors",
    publishedAt: "2026-10-06",
    author: AUTHOR,
    content: [
      { type: "p", text: "CCTV **records** what happened. An intrusion alarm **reacts** the moment something happens — sounding a siren and alerting you on your phone so you can act immediately. For homes that are often locked and for shops after hours, the two work best together." },
      { type: "h2", text: "Components of an intrusion alarm" },
      { type: "ul", items: [
        "**Control panel** — the hub that arms/disarms the system and triggers alerts.",
        "**Door/window (magnetic) contacts** — detect when an opening is breached.",
        "**PIR motion sensors** — detect movement inside a room.",
        "**Glass-break, vibration and shutter sensors** — common for shops and showrooms.",
        "**Siren** — indoor and outdoor sirens to scare intruders and alert neighbours.",
        "**Keypad, remote or app** — to arm and disarm the system.",
      ] },
      { type: "h2", text: "Wired vs wireless alarms" },
      { type: "table", head: ["", "Wired", "Wireless"], rows: [
        ["Installation", "Cabling to every sensor", "Quick, minimal wiring"],
        ["Best for", "New construction, large sites", "Existing homes, shops, rented spaces"],
        ["Maintenance", "Very low", "Periodic sensor battery changes"],
        ["Expansion", "Needs new cabling", "Add sensors easily"],
      ] },
      { type: "h2", text: "How you get alerted" },
      { type: "p", text: "Modern panels connect over Wi-Fi, Ethernet or a GSM/4G SIM and send **app notifications, SMS or calls** when an alarm is triggered. A SIM-based panel keeps working even if the intruder cuts the internet line." },
      { type: "h2", text: "Pair your alarm with CCTV" },
      { type: "p", text: "When an alarm triggers, the first thing you want to do is check what's happening. With [CCTV on your phone](/blogs/how-to-choose-cctv-camera-for-home), you can verify the event in seconds and decide whether to call the police — avoiding panic over false alarms." },
      { type: "tip", text: "We install wired and wireless intrusion alarm systems for homes, shops, showrooms and warehouses. [Get an alarm system quote](/enquiry) or explore our [security solutions](/solutions)." },
    ],
    faqs: [
      { q: "Do pets set off motion sensors?", a: "Pet-immune PIR sensors are available that ignore small animals below a set weight, so pets can move freely while the system is armed." },
      { q: "Will the alarm work during a power cut?", a: "Yes. Alarm panels have a built-in backup battery, and wireless sensors run on their own batteries." },
      { q: "Can I arm and disarm the alarm from my phone?", a: "Most modern alarm systems include a mobile app to arm, disarm and receive alerts from anywhere." },
    ],
  },
];

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

const byNewest = (a: BlogPost, b: BlogPost) => b.publishedAt.localeCompare(a.publishedAt);

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(byNewest);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Same-category posts first, then the newest of the rest. */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, count);
}

const stripInline = (text: string) =>
  text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");

function blockText(block: BlogBlock): string {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "table":
      return [...block.head, ...block.rows.flat()].join(" ");
    default:
      return block.text;
  }
}

export function getWordCount(post: BlogPost): number {
  const text = [...post.content.map(blockText), ...(post.faqs ?? []).flatMap((f) => [f.q, f.a])]
    .map(stripInline)
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function getReadingTime(post: BlogPost): number {
  return Math.max(1, Math.round(getWordCount(post) / 200));
}

export function slugifyHeading(text: string): string {
  return stripInline(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getHeadings(post: BlogPost) {
  return post.content
    .filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: slugifyHeading(b.text), text: stripInline(b.text) }));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
