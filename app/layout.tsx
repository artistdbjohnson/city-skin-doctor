import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { PrefsProvider } from "@/components/prefs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Medical, Surgical & Cosmetic Clinic in Cardiff | City Skin Doctor",
  description:
    "City Skin Doctor: Premier Medical, Aesthetic, Surgery, Laser & Plastic Surgery Clinic in London & Cardiff. Expert skincare & cosmetic treatments.",
  icons: { icon: "/media/logo/logo-cycling-minimalist.jpg" },
  openGraph: {
    title: "Medical, Surgical & Cosmetic Clinic in Cardiff | City Skin Doctor",
    description:
      "Design study of City Skin Doctor, a doctor-led medical, surgical and cosmetic clinic in Cardiff and London.",
    images: ["/media/founder/dr-ebrahim-IMG_9551.jpeg"],
  },
};

const boot = `(function(){try{var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var hash=location.hash&&location.hash.length>1;var seen=false;try{seen=sessionStorage.getItem("csd-pathway-open")==="1";}catch(e){}var skip=reduce||hash||seen;document.documentElement.dataset.open=skip?"skip":"play";document.documentElement.dataset.rule=skip?"draw":"wait";document.documentElement.classList.add("js");var theme="light",locale="en";try{var t=localStorage.getItem("csd-theme");var l=localStorage.getItem("csd-locale");if(t==="dark"||t==="light")theme=t;if(l==="pt"||l==="en")locale=l;}catch(e){}document.documentElement.dataset.theme=theme;document.documentElement.lang=locale==="pt"?"pt":"en";}catch(e){document.documentElement.dataset.open="skip";document.documentElement.dataset.rule="draw";document.documentElement.dataset.theme="light";document.documentElement.classList.add("js");}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="csd-boot" strategy="beforeInteractive">
          {boot}
        </Script>
        <PrefsProvider>{children}</PrefsProvider>
      </body>
    </html>
  );
}
