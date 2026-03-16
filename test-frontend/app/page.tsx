"use client"

import { useEffect, useState } from "react";
import api from "./lib/api";
import Navbar from "./components/Navbar";

export default function Home(){

  const [tasks,setTasks] = useState<any[]>([])

  const loadData = async()=>{
    const res = await api.get("/tasks")
    setTasks(res.data.payload || [])
  }

  useEffect(()=>{
    loadData()
  },[])

  const statusColor = (status:string)=>{
    if(status==="PENDING") return "bg-yellow-100 text-yellow-700"
    if(status==="IN_PROGRESS") return "bg-blue-100 text-blue-700"
    if(status==="DONE") return "bg-green-100 text-green-700"
    return "bg-gray-100 text-gray-700"
  }

  return(
    <div className="bg-gray-100 min-h-screen">
      <Navbar/>
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Public Tasks
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((t:any)=>(
            <div
              key={t.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                {t.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {t.description}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded ${statusColor(t.status)}`}
              >
                {t.status}
              </span>
              <p className="text-xs text-gray-500 mt-3">
                Created by {t.user?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}