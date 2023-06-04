import { verifyToken } from '@/lib/jwt';
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid'

export async function POST(req){
    try {
        const {title , description , date} = await req.json();
        const login_token = new Headers(req.headers).get("Authorization").split(" ")[1];
        if(!title || !description || !date) return new Response(JSON.stringify({
            status:403,
            message:"Please provide all fields!!"
        }) , {status:403});
    
        if(!login_token) return new Response(JSON.stringify({
            message:"Please Login first!!"
        }),{status:401});
    
        const isTokenVerified = verifyToken(login_token , req);
    
        if(!isTokenVerified) return new Response(JSON.stringify({
            message:"Token Expired or Invalid!!"
        }),{status:401})
    
        const filepath = path.join(process.cwd() , 'src/json' , 'users.json');
    
        let data = fs.readFileSync(filepath , {encoding:"utf-8"});
        data = JSON.parse(data);
        data.forEach(element =>{
            if(element.id.toString() == req.user.id.toString()){
                element.notes.push({
                    id:uuidv4(),
                    title,
                    description,
                    date
                })
            }
        });
    
        fs.writeFileSync(filepath , JSON.stringify(data))
        
        
        return new Response(JSON.stringify({
            status:200,
            message:"Notes Created Successfully!!"
        }),{
            status:200
        })
    } catch (err) {
        return new Response(JSON.stringify({
            status:500,
            message:"Some Error Occured!!"
        }),{status:500})
    }
}