import Link from 'next/link';
import React from 'react';

const Homepage = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-500 to-purple-500 min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">Welcome to NextNotes</h1>
        <p className="text-xl md:text-2xl text-white text-center mb-12">A simple and intuitive note-taking app</p>
        <div className="flex flex-wrap justify-center ">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 ">
            <div className="bg-white rounded-lg shadow-2xl p-6 ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Organize your notes</h2>
              <p className="text-gray-600">Easily create and manage your notes with our intuitive interface. Keep track of your thoughts, ideas, and tasks all in one place.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 ">
            <div className="bg-white rounded-lg shadow-2xl p-6 ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sync across devices</h2>
              <p className="text-gray-600">Access your notes from anywhere, whether you're using your computer, tablet, or mobile phone. Stay productive on the go.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 ">
            <div className="bg-white rounded-lg shadow-2xl p-6 ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stay organized</h2>
              <p className="text-gray-600">Categorize your notes, add labels, and use powerful search functionalities to quickly find what you need. Never lose important information again.</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link href="/getnotes">
            <button class="bg-green-200 hover:bg-green-600 text-black font-semibold py-3 px-9 rounded-lg shadow-lg text-center ">
              Access Notes
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Homepage;
