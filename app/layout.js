import "./globals.css";
import { config, coupleNames } from "@/lib/config";
import MusicPlayer from "@/components/MusicPlayer";

const names = coupleNames();
const siteUrl = config.siteUrl || "https://marrypb.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: `${names} · Wedding`,
  description: `Join us in celebrating the wedding of ${names} on ${config.wedding.dateDisplay} at ${config.location.venueName}, ${config.wedding.cityDisplay}.`,
  openGraph: {
    title: `${names} · Wedding Invitation`,
    description: `With joy, we invite you to celebrate the wedding of ${names} — ${config.wedding.dateDisplay}, ${config.wedding.cityDisplay}.`,
    url: siteUrl,
    siteName: `${names} · Wedding`,
    type: "website",
    locale: "en_IN",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: `${names} — Wedding Invitation` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${names} · Wedding Invitation`,
    description: `Join us to celebrate the wedding of ${names} — ${config.wedding.dateDisplay}.`,
    images: ["/og.jpg"],
  },
};

export const viewport = {
  themeColor: "#0b453d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via link tags (no build-time network needed) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&family=Marcellus&family=Tiro+Devanagari+Sanskrit&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
