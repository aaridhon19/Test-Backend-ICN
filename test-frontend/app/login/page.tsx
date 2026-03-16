"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import Swal from "sweetalert2";

export default function Login() {
    const router = useRouter();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const login = async () => {
        if(!email || !password){
            Swal.fire({
                icon:"warning",
                title:"Missing fields",
                text:"Email and password are required"
            })
            return
        }

        try{
            setLoading(true)
            const res = await api.post("/users/login",{
                email,
                password
            })

            localStorage.setItem(
                "access_token",
                res.data.payload.access_token
            )

            Swal.fire({
                icon:"success",
                title:"Login successful",
                timer:1200,
                showConfirmButton:false
            })

            router.push("/dashboard")
        } catch(error:any) {
            Swal.fire({
                icon:"error",
                title:"Login Failed",
                text:error.response?.data?.message || "Invalid credentials"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
                >
                {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    )
}