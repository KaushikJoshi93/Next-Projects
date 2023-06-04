import { verifyToken } from "@/lib/jwt";
import path from 'path';
import fs from 'fs'


export async function GET(req){
    try {
        const login_token = new Headers(req.headers).get("Authorization").split(" ")[1];
        if(!login_token) return new Response(JSON.stringify({
            message:"Please Login first!!"
        }),{status:401});

        const isTokenVerified = verifyToken(login_token , req);

        if(!isTokenVerified) return new Response(JSON.stringify({
            message:"Token Expired or Invalid!!"
        }),{status:401});

        const filepath = path.join(process.cwd() , 'src/json' , 'users.json');

        let data = JSON.parse(fs.readFileSync(filepath , {encoding:'utf-8'}));
        data = data.find((item)=>{
            if(item.id.toString() == req.user.id.toString()) return true;
        }).notes;
        

        return new Response(JSON.stringify({
            message:"Success!!",
            data
        }))

    } catch (err) {
        
        return new Response(JSON.stringify({
            message:"Some Error Occured!!"
        }) , {status:500})
    }
}