import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const japaneseFont = Noto_Sans_JP({
  variable: "--font-japanese",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gojocoffee.local"),
  title: {
    default: "Gojo Coffee | Cafe Premium Pontianak",
    template: "%s | Gojo Coffee",
  },
  description:
    "Gojo Coffee adalah cafe premium di Pontianak dengan suasana Jepang modern, kopi berkualitas, WiFi cepat, menu pilihan, dan jam operasional 07.00 - 00.00 WIB.",
  keywords: [
    "Gojo Coffee",
    "cafe Pontianak",
    "coffee shop Pontianak",
    "specialty coffee",
    "cafe Jepang modern",
  ],
  openGraph: {
    title: "Gojo Coffee | Cafe Premium Pontianak",
    description:
      "Menikmati kopi dengan pengalaman yang berbeda di Pontianak, Kalimantan Barat.",
    type: "website",
    locale: "id_ID",
    siteName: "Gojo Coffee",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Gojo Coffee Pontianak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gojo Coffee | Cafe Premium Pontianak",
    description:
      "Cafe Jepang modern dengan kopi berkualitas dan pengalaman premium.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#533afd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${japaneseFont.variable} scroll-smooth antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
