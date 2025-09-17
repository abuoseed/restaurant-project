import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Delicious Restaurant - Fresh Food, Great Experience",
  description: "Experience the finest culinary delights with fresh ingredients and traditional recipes. Book your table today!",
  keywords: "restaurant, food, dining, fresh ingredients, traditional recipes",
  openGraph: {
    title: "Delicious Restaurant - Fresh Food, Great Experience",
    description: "Experience the finest culinary delights with fresh ingredients and traditional recipes.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
        {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
