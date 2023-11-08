"use client"
import { useAuth } from "@/app/context/userContext";
import React, { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef , GridToolbar  } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Skeleton from '@mui/material/Skeleton';
import {FaSearch} from 'react-icons/fa'
import { url } from "@/utils/api";


type Linhas = {
    id: number,
    nome: string,
    email: string,
    caminho: string
}
interface Data {
    _id?: number;
    nome: string;
    email: string;
    caminho: string;
}

const Home = () =>{
    const { user, userFind, Finder, FinderLogout } = useAuth();
    const [row, setRows] = useState<Linhas[]>([]);
    const [rowFilter, setRowsFilter] = useState<Linhas[]>([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('')
    const router = useRouter();
    useEffect(()=>{
        FinderLogout();
        if(user?.caminho)
        {
            const result = api.get('/verify',{headers:{
                'Authorization': `Bearer ${user?.token}`
            }}).catch((error)=>{
                router.push('/');
            })
        }
        else{
            router.push('/Home/Cadastro');
        }   
        setLoading(true)
    },[])
    useEffect(()=>{
        router.refresh()
        if(!user?.token){
            router.push('/');
        }
        else{
        const data = api.get('/all', {headers:{
            'Authorization': `Bearer ${user?.token}`}}).then((response)=>{
                const rows = response.data.map((item: Data) => {
                    return {id: item._id, nome: item.nome, email: item.email, caminho: item.caminho} as Linhas;
                });
                setRows(rows);
                setRowsFilter(rows)
            }).finally(() => 
                setLoading(false)
            )
        }
    },[])
        

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50, resizable: false },
        { field: 'caminho', headerName: '#', width: 62, resizable: false,
            renderCell: (params) => {
                return (
                <>
                    {!loading &&
                    <Avatar src={`${url}/images/${params.value}`} />}
                </>
                );
            }
        },
        { field: 'nome', headerName: 'Nome', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
    ];

    function CustomToolbar() {  
        return (
            <div className="relative  w-full">
                <input
                    className=" placeholder-[#3A536B] text-xl font-semibold text-slate-300 bg-[#040F1A] p-3 rounded focus:outline-none w-full pr-10"
                    type="text"
                    value={value}
                    placeholder="Busque pelo email"
                    autoFocus
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        const filteredRows = row.filter((item) => {
                        return item.email.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
                        });
                        setValue(e.target.value)
                        setRowsFilter(filteredRows);

                        if(!value)
                        {
                            setRowsFilter(row)
                        }
                    }}
                />
                <FaSearch size={24} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500" />
            </div>
        );
    }


    return(
        <main className="flex-1 flex justify-center items-center">
            <div className="items-center justify-center p-3 md:p-10">
                {loading && <Skeleton variant="rectangular" animation="pulse" sx={{ bgcolor: '#112131', borderRadius: 2, marginTop: 18 }}  width={'100vh'} height={50} />}
                {loading && <Skeleton variant="rectangular" animation="pulse" sx={{ bgcolor: '#112131', borderRadius: 2, marginTop: 2, marginBottom: 18 }}  width={'100vh'} height={'40vh'}/>}
                {!loading &&
                    <div className="container">
                        <Avatar className="absolute left-4 hd:left-[740px]" sx={{ width: 62, height: 62 }} src={`${url}/images/${user?.caminho}`}></Avatar>
                        <h1 className=" mb-5 mt-4 font-medium text-4xl text-[#E7EDF4]">Informações de usuário</h1>
                        <div className=" w-[290px] hd:w-[800px]">
                            <Box sx={{ height: '80%', width: '100%' }}>
                            <DataGrid 
                                className="bg-[#112131]"
                                sx={{
                                    color: '#AFC2D4',
                                    border: 2,
                                    borderColor: '#040F1A',
                                }}
                                rows={rowFilter}
                                columns={columns}
                                slots={{ toolbar: CustomToolbar }}
                                initialState={{
                                    pagination: {
                                    paginationModel: {
                                        pageSize: 4,
                                    },
                                    },
                                }}
                                pageSizeOptions={[4]}
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
                                checkboxSelection
                                onRowSelectionModelChange={(newSelection) => {
                                    if (newSelection.length === 0) {
                                        FinderLogout()
                                    } else {
                                        const userId = Number(newSelection[newSelection.length - 1]);
                                        if (!isNaN(userId)) {
                                            const user = {
                                                id: userId
                                            }
                                            Finder(user)
                                        }
                                    }
                                    if (newSelection.length > 0) {
                                        newSelection.shift();
                                    }
                                }}
                            />

                            </Box>
                        </div>
                    </div>
                }
            </div>
        </main>

    );
}

export default Home;