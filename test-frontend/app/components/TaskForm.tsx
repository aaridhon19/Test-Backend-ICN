"use client"

import { useState } from "react";
import api from "../lib/api";
import Swal from "sweetalert2";

export default function TaskForm({reload}:any){
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [completed,setCompleted] = useState(false);

    const submit = async()=>{
        if(!title){
            Swal.fire({
                icon:"warning",
                title:"Title required"
            })
            return
        }

        try{
            await api.post("/tasks",{
                title,
                description:desc,
                status: completed ? "COMPLETED" : "PENDING"
            })

            Swal.fire({
                icon:"success",
                title:"Task created"
            })

            setTitle("")
            setDesc("")
            setCompleted(false)

            reload()
        }catch(err){
            Swal.fire({
                icon:"error",
                title:"Failed to create task"
            })
        }
    }

    return(
        <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Create Task
            </h2>

            <input
                placeholder="Title"
                className="w-full border rounded-lg p-3 mb-3 text-gray-800"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description (optional)"
                className="w-full border rounded-lg p-3 mb-3 text-gray-800"
                value={desc}
                onChange={(e)=>setDesc(e.target.value)}
            />

            <label className="flex items-center gap-2 mb-4 text-gray-800">
                <input
                type="checkbox"
                checked={completed}
                onChange={(e)=>setCompleted(e.target.checked)}
                />
                Completed
            </label>

            <button
                onClick={submit}
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
            >
                Create Task
            </button>
        </div>
    )
}