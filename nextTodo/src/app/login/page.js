'use client';
import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LoginPage = ({ searchParams }) => {
    const [csrfToken, setCsrfToken] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { status } = useSession();

    const LoadingBar = () => (
        <div class="w-7 h-7 border-4 border-transparent rounded-full border-t-white animate-spin"></div>
    )

    const convertErrorCodeToMessage = (code) => {
        switch (code) {
            case "CredentialsSignin":
                return "Wrong Email or Password!!"
            default:
                return "Some Error"
        }
    }

    useEffect(() => {
        const getcsrftoken = async () => {
            let token = await getCsrfToken();
            setCsrfToken(token)
        };

        if (status == "authenticated") {
            router.replace("/")
        }

        !csrfToken && getcsrftoken();
    }, [status])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);
        const result = await signIn("credentials", {
            email: loginDetails.email,
            password: loginDetails.password,
            redirect: false,
            callbackUrl: "/"
        })
        if (!result.error) {
            router.push("/")
        } else {
            let message = convertErrorCodeToMessage(result.error)
            setLoginError(message)
            setLoading(false);
        }

    }

    const handleChange = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-auto bg-gray-100 flex flex-col justify-center py-9  sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
                <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
                    Login to Your Account
                </h2>
            </div>
            {
                loginError && <div className="w-full flex justify-center" role="alert">
                    <div className='sm:mx-auto w-72 md:w-full sm:max-w-md mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex'>
                        <b className="font-bold">Error:&nbsp;</b>
                        <span className="block sm:inline">{loginError}</span>
                    </div>
                </div>
            }

            <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-md p-9">
                <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={loginDetails.email} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={loginDetails.password} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {loading ? <LoadingBar /> : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage