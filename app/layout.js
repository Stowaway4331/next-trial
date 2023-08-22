import "./globals.css";
// import { Inter } from "next/font/google";

import AuthProvider from "./context/AuthProvider";
import { lato } from "./utils/fonts";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard - OpenInApp",
  description: "Dashboard for OpenInApp users",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
