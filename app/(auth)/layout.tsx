'use client'

import React from 'react'
import Image from "next/image"
import AntaraIcon from '@/public/icon.png'
import Link from 'next/link'

function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        {children}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <Link href="/">
            <div className="relative z-20 flex items-center text-lg font-medium gap-2">
              <Image src={AntaraIcon} width={24} height={24} alt='Antara Logo'/>
              Antara
            </div>
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;I stumbled upon antarakita.com while searching for wedding ideas, and I am absolutely blown away! The range of creative inspiration and practical advice is unparalleled. This website is a treasure trove for brides-to-be like me who want to make their wedding day truly magical. Thank you for curating such an enchanting space for us dreamers!&rdquo;
              </p>
              <footer className="text-sm">Rina Ibrahim</footer>
            </blockquote>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default AuthLayout