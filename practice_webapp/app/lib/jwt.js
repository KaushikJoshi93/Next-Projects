import jwt from 'jsonwebtoken'

export  function signJWTtoken(payload){
    const token = jwt.sign(payload , process.env.SECRET_KEY , {
        expiresIn:"1d"
    })
    return token
}

export function verifyJWTtoken(token){
    try {
        const decoded = jwt.decode(token , process.env.SECRET_KEY);
        return decoded
    } catch (err) {
        console.log(err);
        return null;
    }
}