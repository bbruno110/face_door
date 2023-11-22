'use client'
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useAuth } from "@/app/context/userContext";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { api } from "@/utils/api";

const Cadastro = () =>{
    const router = useRouter();
    const  { user, login, userFind,FinderLogout } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [displayFileName, setDisplayFileName] = useState('Escolher imagem');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnSalvar, setBtnSalvar] = useState<string>('Salvar');
    const [loading, setLoading] = useState<boolean>(true)
    const divRef = useRef<HTMLDivElement>(null);
    const [registroInpt, setRegistroInpt] = useState<boolean>(false);
    const [deleteInpt, setDeleteInpt] = useState<boolean>(false);
    const [fonte, setFonte] = useState<number>(24)
    useEffect(() => {
        if(divRef.current){
            const divWidth = getComputedStyle(divRef.current).width;
        if (file) {
            const fileName = file.name;
            const divWidth = getComputedStyle(divRef.current).width;
            let maxLength;
            if (parseInt(divWidth) === 140) {
                maxLength = 8;
            } else {
                maxLength = 23;
            }
            if (fileName.length > maxLength) {
                setDisplayFileName(`${fileName.substring(0, maxLength)}...`);
            } else {
                setDisplayFileName(fileName);
            }
        } else {
            if (parseInt(divWidth) === 140) {
                setFonte(10)
                setDisplayFileName('Escolher imagem');
            }
            else{
                setFonte(24)
                setDisplayFileName('Escolher imagem');
            }
        }
    }
    }, [file, divRef.current, btnSalvar]);

    useEffect(()=>{
        setLoading(true);
        if(!user?.token){
            router.push('/');
        }
        if(user?.token)
        {
            const result = api.get('/verify',{headers:{
                'Authorization': `Bearer ${user?.token}`
            }}).catch((error)=>{
                router.push('/');
            })
        }
        if(userFind?.id)
        {
            api.get(`/find/${userFind?.id}`).then((response)=>{
                setEmail(response.data.email)
                if(!response.data.nome)
                {
                    setName('')
                }else
                {
                    setName(response.data.nome)
                }
                setBtnSalvar('Salvar')
            }).finally(()=>{setLoading(false)})
            
        }
        if(!user?.nome && !user?.caminho && !userFind?.id)
        {
            if(user?.email){
            setEmail(user?.email)
            }
            if(user?.nome){
                setName(user.nome)
            }
            setLoading(false)
            setBtnSalvar('Salvar')
        }
        else
        {
            FinderLogout();
            setLoading(false)
            setBtnSalvar('Cadastrar')
        }
    },[])

    

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setFile(files[0]);
        }
    };
    const handleDelete = async () =>{
        setDeleteInpt(true)
        const result = await api.delete("/del", {data: { email: email}, headers:{'Authorization': `Bearer ${user?.token}`}}
        ).then(()=>{toast.success("usuário excluido com sucesso!")
            setDeleteInpt(false)
        }).catch(()=>{toast.error('Erro!. Contate o administrador')
            setDeleteInpt(false)
        })
    }
    
    const handleSalvar = async () => {
    setRegistroInpt(true)
    if (btnSalvar === "Salvar") {
        const formData = new FormData();
        if (file) {
        formData.append('avatar', file);
        }
    
        if (userFind?.id) {
        console.log(userFind)
        formData.append('id', String(userFind?.id));
        }
        else
        {
        console.log(user)
        formData.append('id', String(user?.id));
        }
        if (name) {
        formData.append('nome', name);
        }
        if (email) {
        formData.append('email', email);
        }
        formData.append('password', password);
    
        const result = await api.put("/atualizar", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }}).then((response)=>{
            toast.success('Usuário Atualizado')
            setRegistroInpt(false)
            if(user?.id == response.data._id)
            {
                const user = {
                    id: response.data._id,
                    nome: response.data.nome,
                    email: response.data.email,
                    token: response.data.token,
                    caminho: response.data.caminho
                    }
                    login(user);
            }
            FinderLogout();

            }).catch((err)=> {toast.error('Erro!. Contate o administrador')})

    } else {
        setRegistroInpt(true)
        if(!email || !password || !name || displayFileName == 'Escolher imagem')
        {
            toast.warn('Preencha os campos')
            setRegistroInpt(false)
        }
        else {
            try {
                // Criando um novo FormData
                const formData = new FormData();
            
                // Adicionando a imagem ao formData, se disponível
                if (file) {
                    formData.append('avatar', file);
                }
            
                // Adicionando o nome e email ao formData
                formData.append('nome', email);
                formData.append('dsnome', name);
            
                // Adicionando a senha ao formData
                formData.append('senha', password);
            
                // Fazendo a solicitação POST para registrar o usuário
                const response = await api.post('/register', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            
                toast.success('Usuário Cadastrado');
            } catch (err) {
                toast.error('Erro!. Contate o administrador');
            } finally {
                setRegistroInpt(false);
            }
        }
    }
    };

    return(
        <main>
            <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className=' h-auto flex items-center content-center justify-center'>
                <div className=' mt-20'>
                    {loading && <Skeleton variant="rectangular" animation="pulse" sx={{ bgcolor: '#112131', borderRadius: 2, marginTop: 2, marginBottom: 18 }}  width={'100vh'} height={'40vh'}/>}
                    {!loading &&
                        <div className='flex-col'>
                            <h1 className=' absolute top-8 left-30 text-xl hd:top-8 hd:left-[350px] text-[#E7EDF4] hd:text-4xl font-semibold font-Poppins'>{btnSalvar === 'Salvar' ? "Atualizar Usuário" : "Cadastre um usúario"}</h1>
                            <div 
                                className=' bg-[#0B1B2B] p-5 rounded-sm grid gap-5 hd:w-[600px] mt-[15px]  w-[290px]'>
                                <h2 className=' text-[#E7EDF4] text-xl font-semibold font-Poppins'>{btnSalvar === 'Salvar' ? 'Atualizar' : 'Cadastrar'}</h2>
                                <input className=' p-3 rounded focus:outline-none placeholder-slate-200 bg-[#112131] text-slate-200' 
                                    placeholder='Nome:'
                                    value={name}
                                    disabled={registroInpt}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setName(e.target.value)}
                                    
                                />
                                <input className=' p-3 rounded focus:outline-none placeholder-slate-200 bg-[#112131] text-slate-200' 
                                    placeholder='Email:' 
                                    type="email"
                                    disabled={registroInpt}
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                                <input className=' p-3 rounded focus:outline-none placeholder-slate-200 bg-[#112131] text-slate-200' 
                                    placeholder='Senha:'
                                    value={password}
                                    disabled={registroInpt}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
                                    type='password'
                                />

                            <div className='flex flex-row gap-4'>
                                <div
                                    ref={divRef} 
                                    className="p-5 w-[140px]  hd:w-full rounded-md border-2 border-[#3A536B] bg-[#112131] text-slate-200 "
                                >
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap"
                                        style={{maxWidth: '140', fontSize: `${fonte}px`}}
                                    >
                                        {displayFileName}
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        disabled={registroInpt}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {displayFileName != 'Escolher imagem' && <button
                                    className=' p-2 w-full rounded-md border-2 border-[#3A536B] bg-[#112131] text-slate-200'
                                    type="button"
                                    style={{fontSize: `${fonte}px`}}
                                    disabled={registroInpt}
                                    onClick={()=>{ setFile(null) }}
                                >
                                    Remover Foto
                                </button>}
                            </div>
                                    <button
                                        className=' p-2 w-full rounded-md  bg-[#3294F8] text-slate-200'
                                        type="button"
                                        disabled={registroInpt}
                                        onClick={handleSalvar}
                                    >
                                        {btnSalvar}
                                    </button>
                                    {btnSalvar != 'Cadastrar'&&
                                    <button
                                        className=' p-2 w-full rounded-md  bg-red-500 text-slate-200'
                                        type="button"
                                        disabled={deleteInpt}
                                        onClick={handleDelete}
                                    >
                                        Excluir
                                    </button>
                                    }
                            </div>
                        </div>
                    }
                </div>
            </div>
            
            
        </main>
    );
}

export default Cadastro;