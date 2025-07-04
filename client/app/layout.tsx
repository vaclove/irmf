import type { Metadata } from "next";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Filmový Festival - Systém správy hostů",
  description: "Prestižní filmový festival. Elegantní systém pro správu hostů a pozvánek.",
  keywords: ["filmový festival", "správa hostů", "pozvánky", "kino", "film"],
  authors: [{ name: "Filmový Festival" }],
  creator: "Filmový Festival",
  publisher: "Filmový Festival",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#dc143c",
  colorScheme: "dark",
  openGraph: {
    title: "Filmový Festival",
    description: "Prestižní filmový festival",
    type: "website",
    locale: "cs_CZ",
    siteName: "Filmový Festival",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmový Festival",
    description: "Prestižní filmový festival",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`dark ${inter.variable} ${playfair.variable} ${bebas.variable}`}>
      <body className="min-h-screen bg-cinema-gradient font-classic antialiased">
        <div className="relative">
          {/* Background Film Strip Pattern */}
          <div className="fixed inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 10px,
                  rgba(255, 215, 0, 0.1) 10px,
                  rgba(255, 215, 0, 0.1) 12px
                )
              `,
              backgroundSize: '100% 40px'
            }} />
          </div>
          
          {/* Vintage Cinema Ambiance */}
          <div className="fixed inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-vintage-amber/20 via-transparent to-cinema-red/20" />
          </div>
          
          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Toast Notifications */}
          <Toaster 
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: '#2d1b1b',
                border: '1px solid #dc143c',
                color: '#f5f5dc',
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}