"use client"
import { useAuth } from "@/app/context/userContext";
import React, { useState, useEffect } from "react";


const Home = () =>{
    const  { user } = useAuth();

    const teste = user?.email;

    console.log(user)
    return(
        <main>
            <h1>{teste}</h1>
        </main>
    );
}

export default Home;