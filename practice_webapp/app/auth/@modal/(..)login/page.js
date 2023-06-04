"use client"

import { useEffect , use } from "react";
import {Poppins} from 'next/font/google'


const poppins = Poppins({
  subsets:['latin'],
  weight:"500",
  display:"swap"
})
const Page = () => {
  const fetchData = async()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    return data;
    
  }
  const posts = use(fetchData());
 
  return (
    <div className={" h-96 w-96 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center bg-amber-500 opacity-50 absolute top-[50%] left-[50%] rounded-lg " + poppins.className}>preview login page<br/>
      {
        posts && posts.title
      }
    </div>
  )
}

export default Page