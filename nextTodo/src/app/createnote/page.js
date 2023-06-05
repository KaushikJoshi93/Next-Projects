'use client'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const Page = () => {
    const [data, setData] = useState({ title: "", description: "" });
    const session = useSession();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(data.title == "" || data.description == "")) {
            let currentDate = new Date(Date.now()).toDateString();
            setData({...data , "date":currentDate})
            const res = await fetch(`/api/notes/createnote`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${session.data.user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.status == 200) {
                alert("Notes created Successfully!!")
                setData({ title: "", description: "" })
            } else {
                alert("Some Error Occured . Try again later!!")
            }
        }
    }
    return (
        <div className="max-w-md mx-auto ">
            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-9" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        name='title'
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="content">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="content"
                        rows="4"
                        placeholder="Enter content"
                        name='description'
                        value={data.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create Note
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Page