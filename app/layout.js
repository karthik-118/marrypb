import "./globals.css";
import { config, coupleNames } from "@/lib/config";

const names = coupleNames();

export const metadata = {
  title: `${names} · Wedding`,
  description: `Join us in celebrating the wedding of ${names} on ${config.wedding.dateDisplay} in ${config.wedding.cityDisplay}.`,
  openGraph: {
    title: `${names} · Wedding`,
    description: `Celebrate the union of ${names} — ${config.wedding.dateDisplay}.`,
    type: "website",
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
      <body>{children}</body>
    </html>
  );
}
