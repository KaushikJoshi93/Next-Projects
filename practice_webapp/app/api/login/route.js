import { signJWTtoken } from "@/app/lib/jwt";


export async function POST(req ){
    const credentials = await req.json();
    const user = {
        id:1,
        email:"karan@gmail.com",
        name:"karan"
    }
    console.log(credentials)
    if(credentials.email == "karan@gmail.com" && credentials.password == "123456"){
        const accessToken = signJWTtoken(user)
        return new Response(JSON.stringify({
            ...user , accessToken
        }))
    }
    else{
        return new Response(JSON.stringify(null))
    };
}