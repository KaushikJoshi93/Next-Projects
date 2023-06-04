import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
        Auth page &nbsp;
        <Link href={"/login"}>Go to login page</Link>
    </div>
  )
}

export default Page