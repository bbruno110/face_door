"use client"
import { useAuth } from "@/app/context/userContext";
import React, { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef , GridToolbar  } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Skeleton from '@mui/material/Skeleton';
import {FaSearch} from 'react-icons/fa'
import Typography, { TypographyProps } from '@mui/material/Typography';

type Linhas = {
    id: number,
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
    

    const router = useRouter();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50, resizable: false },
        { field: 'caminho', headerName: '#', width: 62, resizable: false,
            renderCell: (params) => {
                console.log(params);
                return (
                <>
                    <Avatar src={`http://192.168.1.22:8081/images/${params.value}`} />
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
                    placeholder="Busque pelo usuário"
                    autoFocus
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        const filteredRows = row.filter((item) => {
                        return item.email.indexOf(e.target.value) !== -1;
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
                    <div className="container ">
                        <Avatar className="absolute left-4 hd:left-[740px]" sx={{ width: 62, height: 62 }} src={`http://192.168.1.22:8081/images/${user?.caminho}`}></Avatar>
                        <h1 className=" mb-10 mt-10 font-medium text-4xl text-[#E7EDF4]">Informações de usuário</h1>
                        <div className=" w-[290px] hd:w-[600px]">
                            <Box sx={{ height: '80%', width: '100%' }}>
                                <DataGrid className="bg-[#112131]"
                                    sx={{
                                        color: '#AFC2D4',
                                        border: 2,
                                        borderColor: '#040F1A',
                                    }}
                                    rows={rowFilter}
                                    columns={columns}
                                    slots={{ toolbar: CustomToolbar }}
                                    pageSizeOptions={[5]}
                                    disableColumnFilter
                                    disableColumnSelector
                                    disableDensitySelector
                                    onRowSelectionModelChange={(newSelection) => {
                                        if (newSelection.length === 0) {
                                            FinderLogout()
                                        } else {
                                            newSelection.forEach((id) => {
                                                const userId = Number(id);
                                                if (!isNaN(userId)) {
                                                    const user = {
                                                        id: userId
                                                    }
                                                    Finder(user)
                                            }
                                        });
                                      }}}
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