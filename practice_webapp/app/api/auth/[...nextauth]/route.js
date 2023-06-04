import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Karanthecoder',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "email", placeholder: "someone@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const res = await fetch("http://localhost:3000/api/login", {
              method: 'POST',
              body: JSON.stringify({
                email:credentials.email,
                password:credentials.password
              }),
            })
            const user = await res.json()
            // console.log(user)
            // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      
            // If no error and we have user data, return it
            if ( user) {
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
        }),
      ],
      callbacks:{
        async jwt({token , user}){
          // console.log("inside jwt: "+JSON.stringify(token));
          // console.log("inside jwt: "+JSON.stringify(user));
          return {...user , ...token}
        },
        async session({session ,token}){
          // console.log('inside session '+JSON.stringify(token));
          // console.log('inside session '+JSON.stringify(session));
          session.user = token;
          return session
        }
      }
})

export { handler as GET, handler as POST }