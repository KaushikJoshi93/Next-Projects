'use client'
import { useSession } from 'next-auth/react';
import colors from 'tailwindcss/colors'
import { revalidatePath, revalidateTag } from 'next/cache';

const Notes = (props) => {
    const colorValue = colors[props.color][200];
    const backgroundColorValue = `${colorValue}`;
    const { data: session, status } = useSession();

    const handleClick = async()=>{
        try {
            const res = await fetch(`/api/notes/deletenotes?noteId=${props.id}` , {
                method:"DELETE",
                headers:{
                    "Authorization": `Bearer ${session?.user.token}`
                }
            })
            const result = res.status;
            if (result.toString() === "200" ) {
                alert("Note Deleted Successfully!!");
                props.getNotes();
                
            }
            else alert("Try Again later!!")

        } catch (err) {
            console.log(err);
            
        }
    }
    return (
        <div className= {`rounded-lg shadow-lg p-4 w-64`} style={{backgroundColor:backgroundColorValue}}>
            <div className="flex items-center justify-between mb-2 p-4">
                <h2 className="text-lg font-semibold">{props.title}</h2>
                {/* Delte button */}
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='w-6 h-6 cursor-pointer text-red-500 hover:text-red-500' onClick={handleClick}>
                    <path d="M3 6h18l-1.58 16.149A2 2 0 0 1 17.436 24H6.564a2 2 0 0 1-1.996-1.851L3 6zm6 0v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1m-6 0h12" />
                    <path d="M10 11v9" />
                    <path d="M14 11v9" />
                </svg>
            </div>
            <p className="text-gray-700 mb-4 text-[16px] pl-4">{props.content}</p>
            <div className="flex justify-between items-center p-4">
                <span className="text-gray-500 text-xs">{props.date}</span>
                {/* <button className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none"> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1.414 1.414L7 14.586V17h2.414l10-10.001L17.586 4.414z" />
                    </svg>

                {/* </button> */}
            </div>
        </div>

    )
}

export default Notes