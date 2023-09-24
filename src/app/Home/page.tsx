"use client"
import { useAuth } from "@/app/context/userContext";
import React, { useState, useEffect } from "react";


const Home = () =>{
    const  { user } = useAuth();

    return(
        <main>
            <h1>{user?.email}</h1>
        </main>
    );
}

export default Home;