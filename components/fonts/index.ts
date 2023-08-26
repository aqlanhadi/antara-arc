import localFont from "next/font/local";
import { Inter, Crimson_Text } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  weight: "400",
  subsets: ["latin"],
});
