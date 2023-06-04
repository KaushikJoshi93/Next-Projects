'use client'
import Notes from "@/components/Notes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState([]);
  const colors = ['blue', 'yellow', 'green', 'pink'];
  const [fetching, setFetching] = useState(false);

  const getNotes = async () => {
    setFetching(true)
    const res = await fetch(`/api/notes/getnotes`, {
      headers: {
        "Authorization": `Bearer ${session?.user.token}`
      },
      next: {
        tags: ['getNotes']
      }
    });
    const notesData = await res.json();
    setFetching(false);
    setNotes(notesData.data);
  }

  useEffect(() => {
    if (session?.user) {
      getNotes();
    }

  }, [session?.user]);

  if (status === "loading") {
    return (
      <p className="text-2xl font-bold flex justify-center w-full mt-64">
        Loading..
      </p>
    );
  }

  return (
    <div className="flex w-screen min-h-full bg-slate-200 flex-grow">
      {/* notes container */}
      {session?.user ? (
        <div className="w-full h-full p-12 flex gap-9 flex-wrap justify-center">


          {notes.length ? (
            notes.map((item, index) => (
              <Notes
                key={index}
                title={item.title}
                content={item.description}
                id={item.id}
                getNotes={getNotes}
                date={item.date}
                color={colors[Math.floor(Math.random() * colors.length)]}
              />
            ))
          ) : (
            fetching ?
              <div class="rounded-lg shadow-2xl p-4 w-64" >
                <div class="animate-pulse">
                  <div class="flex items-center justify-between mb-2 p-4">
                    <h2 class="text-lg font-semibold bg-gray-300 h-6 w-20"></h2>
                    <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                  </div>
                  <p class="text-gray-700 mb-4 text-[16px] pl-4 bg-gray-200 h-4"></p>
                  <div class="flex justify-between items-center p-4">
                    <span class="text-gray-500 text-xs bg-gray-300 h-4 w-12"></span>
                    <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div> :
              <p>No Notes!!</p>

          )}

          <Link href="/createnote" className="self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-24 h-24 self-center cursor-pointer text-gray-500 hover:text-gray-400"
              aria-details="Add Note"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </Link>
        </div>
      ) : (
        <p className="text-base md:text-2xl flex justify-center w-full mt-64 text-red-500 font-bold">
          To Access NextNotes, Please Login First
        </p>
      )}
    </div>
  );
}
