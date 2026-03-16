"use client"

import { useEffect,useState } from "react";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import TaskForm from "../components/TaskForm";
import Swal from "sweetalert2";

export default function Dashboard(){
    const router = useRouter()

    const [user,setUser] = useState<any>(null)
    const [tasks,setTasks] = useState<any[]>([])

    const loadData = async()=>{

        const userRes = await api.get("/users/me")
        const taskRes = await api.get("/tasks/my-tasks")

        setUser(userRes.data.payload)
        setTasks(taskRes.data.payload)
    }

    useEffect(()=>{
        const token = localStorage.getItem("access_token")

        if(!token){
            router.push("/login")
            return
        }

        loadData()

    },[])

    const updateTask = async(task:any)=>{
        const { value: formValues } = await Swal.fire({
            title: "Update Task",
            html: `
                <input id="swal-title" class="swal2-input" placeholder="Title" value="${task.title}">
                <input id="swal-desc" class="swal2-input" placeholder="Description" value="${task.description || ""}">
                <label style="display:flex;align-items:center;gap:8px;margin-top:10px">
                <input type="checkbox" id="swal-completed" ${task.status==="COMPLETED" ? "checked":""}>
                    Completed
                </label>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const title = (document.getElementById("swal-title") as HTMLInputElement).value
                const description = (document.getElementById("swal-desc") as HTMLInputElement).value
                const completed = (document.getElementById("swal-completed") as HTMLInputElement).checked
                return {
                    title,
                    description,
                    status: completed ? "COMPLETED" : "PENDING"
                }
            }
        })

        if(!formValues) return

        try{
            await api.put(`/tasks/${task.id}`,formValues)

            Swal.fire({
                icon:"success",
                title:"Updated!"
            })
            loadData()

        }catch(err){
            Swal.fire({
                icon:"error",
                title:"Update Failed"
            })
        }
    }

    const deleteTask = async(id:string)=>{
        const result = await Swal.fire({
            title: "Delete Task?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it"
        })

        if(!result.isConfirmed) return

        try{
            await api.delete(`/tasks/${id}`)

            Swal.fire({
                icon:"success",
                title:"Deleted!",
                text:"Task deleted successfully"
            })

            loadData()
        }catch(err){
            Swal.fire({
                icon:"error",
                title:"Error",
                text:"Failed to delete task"
            })
        }
    }

    return(
        <div className="bg-gray-100 min-h-screen">
            <Navbar/>
            <div className="max-w-6xl mx-auto p-8">
                <h1 className="text-xl mb-3 text-gray-800">My Profile</h1>

                {user && (
                    <div className="bg-white rounded-xl shadow p-5 mb-6">
                        <h2 className="text-lg font-semibold mb-2 text-gray-800">
                            My Profile
                        </h2>
                        <p className="text-gray-700">
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Email:</strong> {user.email}
                        </p>
                    </div>
                )}

                <TaskForm reload={loadData}/>

                <h2 className="text-lg mt-6">My Tasks</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tasks.map((task:any)=>(
                        <div
                            key={task.id}
                            className="bg-white rounded-xl shadow p-5"
                        >
                            <h3 className="font-semibold text-lg mb-2 text-gray-800">
                                {task.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                {task.description}
                            </p>
                            <span className=
                                {`text-xs px-2 py-1 rounded 
                                    ${task.status === "COMPLETED"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                    }`
                                }>
                                {task.status}
                            </span>
                            <div className="mt-4 space-x-3">

                            <button
                                onClick={()=>updateTask(task)}
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </button>

                            <button
                                onClick={()=>deleteTask(task.id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}