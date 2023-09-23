"use client"
import { useAuth } from "@/app/context/userContext";
import React from "react";


const Home = () =>{

    const  { user } = useAuth();
    console.log(user)
    return(
        <main>
            <h1>sadas</h1>
            <div>
                {user?.email}
            </div>
        </main>
    );
}

export default Home;