export const media = {
  logo: "/media/logo/logo-cycling-minimalist.jpg",
  doctor: "/media/founder/dr-ebrahim-IMG_9551.jpeg",
  clinic: "/media/founder/about-GOPR128111111.jpg",
  academy: "/media/academy/DSCF8626.jpg",
  blood: "/media/services/blood-test.jpg",
  hair: "/media/services/hair-transplant.jpg",
  weight: "/media/services/weight-loss.jpg",
  laser1: "/media/services/laser-1.jpg",
  laser2: "/media/services/laser-2.jpg",
  cosmetic: "/media/services/cosmetic-surgery.jpg",
  skin: "/media/services/skin-care-3.jpg",
  elixir: "/media/partners/products-collagen-elixir.png",
  hiw: "/media/partners/hiw-healthcare-inspection-wales.png",
  cqc: "/media/partners/cqc-regulated.jpg",
} as const;

export const bookingUrl = "https://www.cityskindoctor.co.uk/booking";
export const storeUrl = "https://www.cityskindoctor.co.uk/products";
export const academyUrl = "https://www.cityskindoctor.co.uk/academy";
export const clinicUrl = "https://www.cityskindoctor.co.uk/clinic";
export const instagramUrl = "https://www.instagram.com/city.skin.doctor/";
export const facebookUrl = "https://www.facebook.com/cityskindoctor";
export const email = "info@cityskindoctor.co.uk";

export const partners = [
  { src: "/media/partners/partner-meso.png", name: "mesoestetic" },
  { src: "/media/partners/partner-altru.png", name: "Altruist" },
  { src: "/media/partners/partner-neos.png", name: "Neostrata" },
  { src: "/media/partners/partner-viviscal.png", name: "Viviscal" },
  { src: "/media/partners/partner-candela.jpg", name: "Candela" },
  { src: "/media/partners/partner-exuv.png", name: "Exuviance" },
  { src: "/media/partners/partner-galderma.png", name: "Galderma" },
  { src: "/media/partners/partner-eufo.png", name: "Eufo" },
] as const;

export const branches = {
  cardiff: {
    id: "cardiff",
    phone: "0292 048 68 68",
    tel: "tel:+442920486868",
    lines: ["225 City Road", "Cardiff CF24 3JD"],
  },
  london: {
    id: "london",
    phone: "0207 289 89 89",
    tel: "tel:+442072898989",
    lines: ["396 Harrow Road", "London W9 2HU"],
  },
} as const;
