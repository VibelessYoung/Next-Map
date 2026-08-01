import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Map App",
  description: "Modern Map Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>{children}</body>
    </html>
  );
}
