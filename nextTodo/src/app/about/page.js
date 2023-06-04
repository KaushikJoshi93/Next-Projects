import React from 'react'

const About = () => {
  return (
    <div class="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-500">
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold text-center mb-4 text-white ">About</h1>
    <p class="text-lg text-center mb-8 text-white ">Welcome to our notes saving web app!</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 p-9 md:m-0">
      <div class="sm:m-9 rounded-lg shadow-2xl bg-white p-4">
        <h2 class="text-2xl font-bold text-purple-600 mb-4">Easy Note Taking</h2>
        <p class="text-gray-700">Our app allows you to easily create and organize your notes. Take quick notes, jot down ideas, and keep track of important information all in one place.</p>
      </div>
      <div class="sm:m-9 rounded-lg shadow-2xl bg-white p-4">
        <h2 class="text-2xl font-bold text-blue-600 mb-4">Secure and Private</h2>
        <p class="text-gray-700">We prioritize the security and privacy of your notes. Rest assured that your data is encrypted and only accessible by you. Your notes are safe with us.</p>
      </div>
      <div class="sm:m-9 rounded-lg shadow-2xl bg-white p-4">
        <h2 class="text-2xl font-bold text-green-600 mb-4">Sync Across Devices</h2>
        <p class="text-gray-700">Access your notes anytime, anywhere. Our app seamlessly syncs your notes across multiple devices, ensuring you have your important information at your fingertips.</p>
      </div>
      <div class="sm:m-9 rounded-lg shadow-2xl bg-white p-4">
        <h2 class="text-2xl font-bold text-yellow-600 mb-4">Customize and Organize</h2>
        <p class="text-gray-700">Customize the look and feel of your notes. Organize them into categories, add tags, and easily search for specific notes. Stay organized and find what you need quickly.</p>
      </div>
    </div>
  </div>
</div>






  )
}

export default About