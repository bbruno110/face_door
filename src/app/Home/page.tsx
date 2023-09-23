"use client"
import { useAuth } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


const Home = () =>{
    const rota = useRouter();
    const  { user } = useAuth();
    useEffect(()=>{
        if(!user?.token){
            rota.push('/');
        }
    },[])
    const email = user?.email;
    return(
        <main>
            <h1>sadas</h1>
            <p>{email}</p>
            <p>{user?.token}</p>
        </main>
    );
}

export default Home;