import "./globals.css";
// import { AuthProvider } from "@/components/shared/providers";

export const metadata = {
  title: 'Antara',
  description: 'Antara',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <div id="fb-root"></div>
        {/* <AuthProvider> */}
          {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
