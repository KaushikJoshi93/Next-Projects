'use client'

import Heading from '@/components/Heading'
import Link from 'next/link';
import {signIn , useSession} from 'next-auth/react'

export default function Home() {
  const {data:session} = useSession();
  if(session){
    console.log(session.user);
    
  }
  return (
    <main className='w-full h-full flex gap-20 flex-col justify-center items-center'> 
      This is a server component and it will render on server.
      <div>
          <Heading data="lkjslfd"/>
          Let's go to about page <Link href={"/about"}>Let's Go</Link><br/>
          Let's go to signin page&nbsp; <Link href={"/api/auth/signin"}>Signin</Link>
      </div>
    </main>
  )
}
