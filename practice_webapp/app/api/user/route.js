import { NextResponse } from "next/server"

export async function GET(req , res){
     return new Response(JSON.stringify({
        user:"karan"
     }) , {
        status:200,
        headers:{'Set-Cookie':'token=ljsdlf'}
     })
}