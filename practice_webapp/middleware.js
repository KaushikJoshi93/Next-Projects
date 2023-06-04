import {NextRequest,NextResponse} from 'next/server'

export function middleware(req){
    console.log("url is: " , req.nextUrl.pathname)
    return NextResponse.next();
}