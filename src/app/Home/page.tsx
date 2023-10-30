"use client"
import { useAuth } from "@/app/context/userContext";
import React, { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

type Linhas = {
    id: number,
    email: string,
    caminho: string
}
interface Data {
    _id?: number;
    email: string;
    caminho: string;
}

const Home = () =>{
    const { user } = useAuth();
    const [row, setRows] = useState<Linhas[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const result = api.get('/verify',{headers:{
            'Authorization': `Bearer ${user?.token}`
        }}).catch((error)=>{
            router.back();
        })
        setLoading(true)
    },[])
    
    useEffect(()=>{
        const data = api.get('/all', {headers:{
            'Authorization': `Bearer ${user?.token}`}}).then((response)=>{
                const rows = response.data.map((item: Data) => {
                    return {id: item._id, email: item.email, caminho: item.caminho} as Linhas;
                });
                setRows(rows);
            }).finally(() => 
                setTimeout(()=>{
                    setLoading(false)
                },800))
    },[])
    

    const router = useRouter();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50, resizable: false },
        { field: 'caminho', headerName: '#', width: 60, resizable: false,
            renderCell: (params) => {
                console.log(params);
                return (
                <>
                    <Avatar src={`https://face-door-back.onrender.com/images/${params.value}`} />
                </>
                );
            }
        },
        { field: 'email', headerName: 'Email', width: 450 },
    ];
    

    return(
        <main className="flex-1 flex justify-center items-center">
            <div className="h-screen flex items-center justify-center p-10">
                {loading ? <Skeleton variant="rectangular" animation="pulse" sx={{ bgcolor: '#112131', borderRadius: 2 }}  width={600} height={'80%'}  />
                    :
                    <main className="flex-1 flex justify-center items-center">
                        <div className="h-screen flex items-center justify-center p-10">
                            <Box sx={{ height: '100%', width: '100%' }}>
                                <DataGrid className="bg-[#112131]"
                                    sx={{
                                        color: '#AFC2D4',
                                        border: 2,
                                        borderColor: '#040F1A'
                                    }}
                                    rows={row}
                                    columns={columns}
                                    pageSizeOptions={[5]}
                                />
                            </Box>
                        </div>
                    </main>
                
                }
            </div>
        </main>
    );
}

export default Home;