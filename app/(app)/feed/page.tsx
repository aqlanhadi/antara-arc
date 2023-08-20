import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/route'


async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <>
      <h1>Home</h1>
      <p>{JSON.stringify(session)}</p>
      {/* <Logout /> */}
    </>
  )
}

export default Home