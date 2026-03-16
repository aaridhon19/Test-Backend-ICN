"use client"

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
    const [logged,setLogged] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("access_token")
        setLogged(!!token)
    },[])

    const logout = ()=>{
        Swal.fire({
            title:"Logout?",
            text:"You will be logged out",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Logout"
        }).then((result)=>{
            if(result.isConfirmed){
                localStorage.removeItem("access_token")
                Swal.fire({
                    icon:"success",
                    title:"Logged out",
                    timer:1200,
                    showConfirmButton:false
                })
                window.location.href="/"
            }
        })
    }

    return(
        <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
            <h1 className="text-xl font-bold text-blue-600">
                Task Manager
            </h1>

            <div className="space-x-4">

                {!logged && (
                <>
                    <a
                        href="/login"
                        className="text-gray-600 hover:text-blue-500"
                    >
                    Login
                    </a>

                    <a
                        href="/register"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                    Register
                    </a>
                </>
                )}

                {logged && (
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
                )}
            </div>
        </div>
    )
}