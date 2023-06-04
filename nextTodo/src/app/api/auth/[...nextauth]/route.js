import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        })
        const user = await res.json();
        console.log(user)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  session:{
    strategy:"jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login"

  },
  callbacks:{
    async jwt({token , user}){
      return {...user , ...token}
    },
    async session({session ,token}){
      session.user = token;
      return session
    }
  },
  
})


export { handler as GET, handler as POST }