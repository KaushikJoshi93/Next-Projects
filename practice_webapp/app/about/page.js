"use client";
import {usePathname} from 'next/navigation'

export const metadata = {
    title:"About Page | Shopiny.in",
}

const About = ()=>{
    const pathname = usePathname();
    console.log(pathname);
    
    return (
        <div className="flex flex-col font-bold text-3xl items-center h-screen justify-center">
            About page
        </div>
    )
}

export default About;