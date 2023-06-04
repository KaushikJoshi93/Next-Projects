import path from 'path';
import fs from 'fs'
import { getJWTtoken } from '@/lib/jwt';

export async function POST(req){
    const {email , password} = await req.json();
    const filepath = path.join(process.cwd() , 'src/json' , 'users.json');
    const userData = JSON.parse(fs.readFileSync(filepath , "utf-8"));
    // find the username credentials in the json
    const user = userData.find((item , index)=>{
        if(item.email == email && item.password == password) return true;
    });
    
    if(user){
        // get token here
        const token = getJWTtoken(user);
        return new Response(JSON.stringify({...user , token}))
    }else{
        return new Response(JSON.stringify(null))
    }
}