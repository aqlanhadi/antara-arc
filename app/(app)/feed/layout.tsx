import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(app)/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Antara',
  description: 'Antara',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  if (!session?.user.username) redirect('/auth/onboarding')

  return  ( 
    <>
      <p>{JSON.stringify(session)}</p>
      {children}
    </>)
}
