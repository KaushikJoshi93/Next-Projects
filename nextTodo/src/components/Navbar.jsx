'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    function handleResize() {
      setIsMobile(window.innerWidth <= 600); // Adjust the threshold as needed
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    if(isMenuOpen){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "auto"
    }

    handleResize()

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[isMenuOpen])

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-semibold">NextNotes</Link>
          </div>
          <div className="flex items-center ">
            <button
              className="text-gray-300 hover:text-white px-3 py-2 focus:outline-none sm:hidden"
              onClick={toggleMenu}
            >
              ☰
            </button>
            <div className={`flex items-center space-x-4 transition-all duration-700 ease-in-out ${isMenuOpen ? 'visible ' : isMobile ? 'invisible':''} ${isMobile&&isMenuOpen ? 'flex-col gap-8 p-48 absolute top-14 left-[50%] translate-x-[-50%] bg-blue-700': isMobile ? 'flex-col gap-8 absolute top-14 left-[100%] p-48' :''}`}>
              <Link href="/" className="text-gray-300 hover:text-white px-0 md:px-3 py-2 m-0" onClick={()=>isMobile && setIsMenuOpen(false)}>Home</Link>
              <Link href="/about" className="text-gray-300 hover:text-white px-0 md:px-3 py-2 m-0" onClick={()=>isMobile && setIsMenuOpen(false)}>About</Link>
              <a href="#" className="text-gray-300 hover:text-white px-0 md:px-3 py-2 m-0" onClick={()=>isMobile && setIsMenuOpen(false)}>Contact</a>
              {session?.user ? (
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 relative group">
                  <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="Avatar" className="object-cover w-full h-full" width={5} height={5} />
                  </div>
                  {/* dropdown menu */}
                  <div className="hidden w-32 bg-white absolute top-12 right-2 rounded-sm shadow-2xl text-black p-2 group-hover:flex justify-center">
                    <ul className="flex flex-col gap-2">
                      <li className="hover:text-gray-400">{session.user.name}</li>
                      <li className="hover:text-gray-400">Settings</li>
                      <li className="hover:text-gray-400" onClick={() => signOut({ redirect: false })}>Log Out</li>
                    </ul>
                  </div>
                </a>
              ) : (
                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none" onClick={()=>isMobile && setIsMenuOpen(false)}>
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
