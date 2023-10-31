'use client'
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useAuth } from "@/app/context/userContext";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { api } from "@/utils/api";

const Cadastro = () =>{
    const router = useRouter();
    const  { user, login, userFind,FinderLogout, Finder } = useAuth();
    const { logout } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnSalvar, setBtnSalvar] = useState<string>('Salvar');
    const [loading, setLoading] = useState<boolean>(true)

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

    

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
          setFile(e.target.files[0]);
        }
      };

      const handleSalvar = async () => {
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
          formData.append('password', password);
      
            const result = await api.put("/atualizar", formData, {
              headers: { 'Content-Type': 'multipart/form-data' }}).then((response)=>{
                toast.success('Usuário Atualizado')
                console.log(response.data)
                console.log('teste')
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
            const response = await api.post('/register',{
                dsnome: name,
                senha: password,
                nome: email
              }).then((response) =>{
                const formData = new FormData();
                if (file) {
                    formData.append('avatar', file);
                  }
                  if (name) {
                    formData.append('nome', name);
                  }
                  formData.append('id', String(response.data._id));
                api.put("/atualizar", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }}).then((response)=>{
                }).catch((err)=> {toast.error('Erro!. Contate o administrador')})
                toast.success('Usuário Cadastrado')
              }).catch((err)=> {toast.error('Erro!. Contate o administrador')})
        }
      };

    return(
        <main>
            <ToastContainer
                position="top-right"
                autoClose={1000}
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
                            <h1 className=' absolute top-10 left-30 text-xl hd:top-20 hd:left-[350px] text-[#E7EDF4] hd:text-4xl font-semibold font-Poppins'>{btnSalvar === 'Salvar' ? "Atualizar Usuário" : "Cadastre um usúario"}</h1>
                            <div className=' bg-[#0B1B2B] p-5 rounded-sm grid gap-5 hd:w-[600px] mt-20  w-[290px]'>
                                <h2 className=' text-[#E7EDF4] text-xl font-semibold font-Poppins'>{btnSalvar === 'Salvar' ? 'Atualizar' : 'Cadastrar'}</h2>
                                <input className=' p-3 rounded focus:outline-none placeholder-slate-200 bg-[#112131] text-slate-200' 
                                    placeholder='Nome:'
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setName(e.target.value)}
                                    
                                />
                                <input className=' p-3 rounded focus:outline-none placeholder-slate-200 bg-[#112131] text-slate-200' 
                                    placeholder='Email:' 
                                    type="email"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                                <input className=' p-3 rounded focus:outline-none placeholder-slate-200 bg-[#112131] text-slate-200' 
                                    placeholder='Senha:'
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
                                    type='password'
                                />

                                <div className='flex flex-row gap-4'>
                                    <div className="p-5  w-full rounded-md border-2 border-[#3A536B] bg-[#112131] text-slate-200 ">
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer"
                                        >
                                            {file ? file.name : 'Escolher imagem'}
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <button
                                        className=' p-2 w-full rounded-md border-2 border-[#3A536B] bg-[#112131] text-slate-200'
                                        type="button"
                                        onClick={()=>{ setFile(null) }}
                                    >
                                        Tirar Foto
                                    </button>
                                </div>
                                    <button
                                        className=' p-2 w-full rounded-md  bg-[#3294F8] text-slate-200'
                                        type="button"
                                        onClick={handleSalvar}
                                    >
                                        {btnSalvar}
                                    </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </main>
    );
}

export default Cadastro;