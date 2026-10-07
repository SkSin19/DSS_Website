/* ─────────────────────────────────────────────
   Clients (source: DSS company brochure)
   ---------------------------------------------
   Logos live in /public/images/clients. To add a client, drop a logo there
   (WebP/PNG on a white or transparent background) and append an entry.
   ───────────────────────────────────────────── */

export const CLIENT_SECTORS = [
  "Government & PSU",
  "Corporate & Industry",
  "Media & Broadcasting",
  "Education",
  "Real Estate & Societies",
  "Hospitality & Community",
] as const;
export type ClientSector = (typeof CLIENT_SECTORS)[number];

export type Client = {
  name: string;
  logo: string;
  sector: ClientSector;
};

const logo = (file: string) => `/images/clients/${file}.webp`;

export const CLIENTS: Client[] = [
  // Government & PSU
  { name: "Central Reserve Police Force (CRPF)", logo: logo("crpf"), sector: "Government & PSU" },
  { name: "BHEL", logo: logo("bhel"), sector: "Government & PSU" },
  { name: "United Bank of India", logo: logo("united-bank-of-india"), sector: "Government & PSU" },
  { name: "Nagar Panchayat Chakiya", logo: logo("nagar-panchayat-chakiya"), sector: "Government & PSU" },

  // Corporate & Industry
  { name: "HCL", logo: logo("hcl"), sector: "Corporate & Industry" },
  { name: "Tata Power", logo: logo("tata-power"), sector: "Corporate & Industry" },
  { name: "Dabur", logo: logo("dabur"), sector: "Corporate & Industry" },
  { name: "UFLEX", logo: logo("uflex"), sector: "Corporate & Industry" },
  { name: "Orient Electric", logo: logo("orient-electric"), sector: "Corporate & Industry" },
  { name: "Tikona Digital Networks", logo: logo("tikona"), sector: "Corporate & Industry" },
  { name: "Globus Infocom", logo: logo("globus-infocom"), sector: "Corporate & Industry" },
  { name: "SOWiL Limited", logo: logo("sowil"), sector: "Corporate & Industry" },
  { name: "Advant", logo: logo("advant"), sector: "Corporate & Industry" },
  { name: "Trinity Touch", logo: logo("trinity-touch"), sector: "Corporate & Industry" },

  // Media & Broadcasting
  { name: "92.7 BIG FM", logo: logo("big-fm"), sector: "Media & Broadcasting" },
  { name: "News Nation", logo: logo("news-nation"), sector: "Media & Broadcasting" },
  { name: "Sahara India Mass Communication", logo: logo("sahara"), sector: "Media & Broadcasting" },
  { name: "Mahuaa TV", logo: logo("mahuaa"), sector: "Media & Broadcasting" },

  // Education
  { name: "Vidyamandir Classes", logo: logo("vidyamandir-classes"), sector: "Education" },
  { name: "IMT", logo: logo("imt"), sector: "Education" },
  { name: "Success Mantra", logo: logo("success-mantra"), sector: "Education" },

  // Real Estate & Societies
  { name: "ACE Group", logo: logo("ace-group"), sector: "Real Estate & Societies" },
  { name: "ACE City", logo: logo("ace-city"), sector: "Real Estate & Societies" },
  { name: "ACE Parkway", logo: logo("ace-parkway"), sector: "Real Estate & Societies" },
  { name: "ACE Capitol", logo: logo("ace-capitol"), sector: "Real Estate & Societies" },
  { name: "ACE Divino", logo: logo("ace-divino"), sector: "Real Estate & Societies" },
  { name: "Godrej Palm Retreat", logo: logo("godrej-palm-retreat"), sector: "Real Estate & Societies" },
  { name: "NRI City", logo: logo("nri-city"), sector: "Real Estate & Societies" },
  { name: "Greenarch", logo: logo("greenarch"), sector: "Real Estate & Societies" },
  { name: "Spectrum @Metro", logo: logo("spectrum-metro"), sector: "Real Estate & Societies" },

  // Hospitality & Community
  { name: "Café Coffee Day", logo: logo("cafe-coffee-day"), sector: "Hospitality & Community" },
  { name: "New Delhi YMCA", logo: logo("new-delhi-ymca"), sector: "Hospitality & Community" },
];
