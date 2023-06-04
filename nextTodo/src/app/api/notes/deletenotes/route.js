import { verifyToken } from "@/lib/jwt";
import path from 'path';
import fs from 'fs';
import { revalidateTag } from 'next/cache';
import {NextResponse } from 'next/server';

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const login_token = new Headers(req.headers).get("Authorization").split(" ")[1];
        if (!login_token) return new Response(JSON.stringify({
            message: "Please Login first!!"
        }), { status: 401 });

        const isTokenVerified = verifyToken(login_token, req);

        if (!isTokenVerified) return new Response(JSON.stringify({
            message: "Token Expired or Invalid!!"
        }), { status: 401 });

        // get the data
        const filepath = path.join(process.cwd(), 'src/json', 'users.json');

        let allData = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }));

        // filter the data 
        allData.forEach(element => {
            if (element.id.toString() == req.user.id.toString()) {
                element.notes = element.notes.filter((item) => {
                    if (item.id.toString() !== searchParams.get("noteId").toString()) return true;
                })
            }
        });

        // write the data to json
        fs.writeFileSync(filepath, JSON.stringify(allData));



        // revalidate the tag
        const tag = req.nextUrl.searchParams.get('getNotes');
        revalidateTag(tag);

        // return new Response(JSON.stringify({
        //     message: "Deleted Successfully!!",
        // }) , {status:200})
        return NextResponse.json({
            revalidated: true, now: Date.now(),
            message:"Deleted Successfully!!",
        })
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({
            message: "Some Error Occured!!"
        }), { status: 500 })
    }
}