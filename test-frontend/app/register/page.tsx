"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import Swal from "sweetalert2";

export default function Register(){
    const router = useRouter();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const register = async ()=>{

        if(!name || !email || !password){
        Swal.fire({
            icon:"warning",
            title:"Missing fields",
            text:"All fields are required"
        })
        return
        }

        try{

        setLoading(true)

        await api.post("/users",{
            name,
            email,
            password
        })

        Swal.fire({
            icon:"success",
            title:"Register successful",
            timer:1200,
            showConfirmButton:false
        })

        router.push("/login")

        }catch(error:any){

        Swal.fire({
            icon:"error",
            title:"Register Failed",
            text:error.response?.data?.message || "Something went wrong"
        })

        }finally{
            setLoading(false)
        }
    }

    return(

        <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Register
            </h1>

            <input
                placeholder="Name"
                className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <input
                placeholder="Email"
                className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button
                onClick={register}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
            >
            {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
                Already have an account?{" "}
            <a
                href="/login"
                className="text-green-500 hover:underline"
            >
                Login
            </a>
            </p>

        </div>

        </div>
    )
}