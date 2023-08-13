import { getServerSession } from "next-auth";

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
    // <AuthProvider>
        <>{children}</>
    // </AuthProvider>
  )
}
