import jwt from 'jsonwebtoken'

export const getJWTtoken = (user)=>{
    const token = jwt.sign(user , process.env.SECRET_KEY);
    return token;
}

export const verifyToken = (token , req)=>{
    try {
        const decodeToken = jwt.verify(token , process.env.SECRET_KEY);
        req.user = decodeToken;
        return decodeToken ? true : false;
    } catch (err) {
        console.log('inside err');
        
        console.log(err);
        
    }
}