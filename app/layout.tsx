import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter, crimsonText } from "@/components/fonts";

export const metadata = {
  title: "Antara - Relive Memories",
  description:
    "Antara",
  twitter: {
    card: "summary_large_image",
    title: "Antara",
    description:
      "Antara",
    creator: "@aqlan",
  },
  themeColor: "#FFF",
};

// Hi

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={
        cx(
          sfPro.variable, 
          inter.variable,
          crimsonText.variable,
          "absolute w-screen h-screen"
        )}>
        {/* <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />/ */}
        {/* <main className="flex min-h-screen w-full flex-col items-center justify-center py-32"> */}
          {children}
        {/* </main> */}
        {/* <Footer /> */}
        <Analytics />
      </body>
    </html>
  )
}
