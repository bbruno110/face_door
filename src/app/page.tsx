"use client"
import * as SVG from "./assets/SVG";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import isEmailValid from "@/helpers/emailValid";
import { useAuth } from "./context/userContext";
import { useRouter } from 'next/navigation';


export default function Home() {
  const  { user } = useAuth();
  const { login } = useAuth();
  const { logout } = useAuth();
  const router = useRouter();
  useEffect(()=>{
    if(user?.token){
      const result = api.get('/verify',{headers:{
        'Authorization': `Bearer ${user?.token}`
      }}).catch((error)=>{
        logout();
        console.log('err')
      }).then(()=>{
        router.push('/Home')
      })
    }

    //router.push('/Home');
  },[])
  const [isPasswordVisibleConfirm, setPasswordVisibilityConfirm] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [disabledReg, setDisabledReg] = useState<boolean>(false)
  const [emailReg, setEmailReg] = useState<string>("");
  const [passwordReg, setPasswordReg] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  //login
  const [emailLog, setemailLog] = useState<string>("");
  const [disabledLog, setDisabledLog] = useState<boolean>(false)
  const [passwordLog, setpasswordLog] = useState<string>("");

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const togglePasswordVisibilityConfirm = () => {
    setPasswordVisibilityConfirm(!isPasswordVisibleConfirm);
  };

  const clean = () =>{
    setRegister(false);
    setEmailReg("");
    setPasswordReg("");
    setPasswordConf("");
  }

  const loginUser = async () => {
    if(emailLog && passwordLog){
      setDisabledLog(true)
      let statusCode: number = 0;
      toast.promise(
        api.post('/login', {
          email: emailLog,
          senha: passwordLog,
        }).then((response) => {
          statusCode = response.status;
          if (statusCode === 200) {
            const user = {
              id: response.data._id,
              nome: response.data.nome,
              email: response.data.email,
              token: response.data.token,
              caminho: response.data.caminho
            }

            login(user);
            setTimeout(() => {
              router.push('/Home');
          }, 200);
          } else if (statusCode === 204) {
            console.error('Email não encontrado! ', response.status);
          } else if (statusCode === 401) {
            console.error('Senha inválida! ', response.status);
          } else {
            // Outro erro
            // Aqui você pode tratar a resposta de erro
            console.error('Erro: Contate o administrador! ', response.status);
          }
        }),
        {
          pending: 'Aguardando...',
          success: 'Entrada aceita!',
          error: 'Senha inválida!' ,
        }
      ).finally(
        ()=>{
          setTimeout(() => {
            setDisabledLog(false);
        }, 1100)
          }
      );

    }
    else{
      toast.warn('Preencha os campos', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const registerUser = async () =>{
    setDisabledReg(true)
    if(emailReg != '' && passwordReg != '' && passwordReg == passwordConf && emailValid == true)
    {
      try{
        const response = await api.post('/register',{
          nome: emailReg,
          senha: passwordReg
        })
        if(response.status == 200)
        {
          clean();
          toast.success("Usuario Criado com sucesso!")
          setTimeout(() => {
            setDisabledReg(false);
            setRegister(false)
          }, 1500);
        }
        else if(response.status == 204)
        {
          toast.warn("Usuário já existente!")
          setTimeout(() => {
            setDisabledReg(false)
          }, 1000);
        }
      }catch(error){
        toast.error('Erro: Contate o administrador!')
        console.log('error: ', error)
        setTimeout(() => {
          setDisabledReg(false)
        }, 1000);
      }
    }
    else{
      setTimeout(() => {
        setDisabledReg(false)
      }, 1200);
      toast.info("Por favor preencha os campos!") 
    }
  }
  const emailCadastro = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmailReg(e.target.value)
    if(e.target.value == '')
    {
      setEmailValid(true)
    }
    else
    {
      setEmailValid(isEmailValid(e.target.value))
    }
  }
  
  return (
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
      {!register && 
      
        <main className="flex min-h-screen gap-0 content-center items-center flex-col iphone:flex-col fhd:flex-row fhd:gap-[300px] 
          hd:flex-row hd:gap-[200px]
          "> 
          
          <SVG.Home_svg
            className='iphone:ml-8 iphone:w-[400px] iphone:h-[412px]  hd:ml-[50px]  hd:w-[600px] hd:h-[605px] fhd:w-[900px] fhd:h-[912px] fhd:ml-[100px]'
          />
          <form className="flex flex-col hd:mr-8 iphone:mr-0 iphone:w-[374px] iphone:mt-5 fhd:w-[620px] hd:w-[520px]">
            <label className="text-[#E7EDF4] font-Poppins font-semibold iphone:text-3xl hd:text-5xl fhd:text-6xl">
              Boas Vindas!
            </label>
            <label 
              className="text-[#AFC2D4] font-Poppins font-medium iphone: ">
              Faça seu login ou cadastre-se.
            </label>
            <input
              className="bg-[#C7C7C7] p-5 mt-8 mb-4 text-black outline-0 placeholder-[#717171] w-full"
              placeholder="Email"
              value={emailLog}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setemailLog(e.target.value)}
              type="text"
            />
            <div className="relative">
              <input
                className="bg-[#C7C7C7] p-5 mb-5 placeholder-[#717171] outline-0 text-black w-full xl:pr-[80px] 2xl:pr-[100px]"
                placeholder="Senha"
                value={passwordLog}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setpasswordLog(e.target.value)}
                type={isPasswordVisible ? 'text' : 'password'}
              />
              <button
                onClick={(e) => {
                  e.preventDefault(); // Evita o comportamento padrão de envio do formulário
                  togglePasswordVisibility(); // Chama a função togglePasswordVisibility
                }}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              >
                <SVG.eye className="w-[30px] h-[30px] absolute top-5 right-3" />
              </button>
            </div>
            <button 
              type="button"
              disabled={disabledLog}
              onClick={(e) => {e.preventDefault(); loginUser();}}
              className="bg-blue-600 h-[62px] gap-10 mb-2 p-[21px] 
              text-[#FFFF] font-medium iphone:font-bold">
              Login
            </button>
            <label className="text-[#FFF] font-Poppins iphone:text-[15px] ">
              Não possui uma conta? <label className="text-[#1E57F1] cursor-pointer" onClick={()=>{if(!disabledLog){setRegister(true)}}} >Cadastre-se</label> 
            </label>
          </form>
        </main>
      }
      {register &&
        <main className="flex min-h-screen gap-0 content-center items-center flex-col iphone:flex-col fhd:flex-row fhd:gap-[300px] 
        hd:flex-row hd:gap-[200px]
        "> 
          <SVG.Home_svg
            className='iphone:ml-8 iphone:w-[400px] iphone:h-[412px]  sm:w-[360px] sm:h-[372px] hd:ml-[100px]  hd:w-[600px] hd:h-[605px] fhd:w-[900px] fhd:h-[912px] fhd:ml-[200px]'
          />
          <form className="flex flex-col iphone:w-[374px] fhd:w-[420px]">
            <label className="text-[#E7EDF4] font-Poppins font-semibold iphone:text-3xl hd:text-5xl fhd:text-6xl">
              Boas Vindas!
            </label>
            <label className="text-[#AFC2D4] font-Poppins font-medium iphone: ">
              Faça seu login ou cadastre-se.
            </label>
            <input value={emailReg}
              onChange={emailCadastro}
              className="bg-[#C7C7C7] p-5 mt-8 mb-4 text-black outline-0 placeholder-[#717171] w-full"
              placeholder="Email"
              type="text"
            />
            {!emailValid && emailReg &&
              <label className="font-Poppins text-red-600 mt-[-15px] text-sm" >Email inválido</label>
            }
            <div className="relative">
              <input value={passwordReg}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPasswordReg(e.target.value)}
                className="bg-[#C7C7C7] p-5 mb-5 placeholder-[#717171] outline-0 text-black w-full xl:pr-[80px] 2xl:pr-[100px]"
                placeholder="Senha"
                type={isPasswordVisible ? 'text' : 'password'}
              />
              <button
                onClick={(e) => {
                  e.preventDefault(); // Evita o comportamento padrão de envio do formulário
                  togglePasswordVisibility(); // Chama a função togglePasswordVisibility
                }}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              >
                <SVG.eye className="w-[30px] h-[30px] absolute top-5 right-3" />
              </button>
            </div>
            <div className="relative">
              <input
                className="bg-[#C7C7C7] p-5 mb-5 placeholder-[#717171] outline-0 text-black w-full xl:pr-[80px] 2xl:pr-[100px]"
                placeholder="Confirme a senha"
                value={passwordConf}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPasswordConf(e.target.value)}
                type={isPasswordVisibleConfirm ? 'text' : 'password'}
              />
              <button
                onClick={(e) => {
                  e.preventDefault(); // Evita o comportamento padrão de envio do formulário
                  togglePasswordVisibilityConfirm(); // Chama a função togglePasswordVisibility
                }}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              >
                <SVG.eye className="w-[30px] h-[30px] absolute top-5 right-3" />
              </button>
            </div>
            <button 
              onClick={registerUser}
              disabled={disabledReg}
              type="button"
              className="bg-blue-600 h-[62px] gap-10 mb-2 p-[21px] text-[#FFFF] 
              font-medium iphone:font-bold">
              Cadastrar
            </button>
            
            <label className="text-[#1E57F1] cursor-pointer font-Poppins flex items-center justify-center" 
              onClick={() => {
                if(!disabledReg){
                setRegister(false)}}}
              >Voltar</label> 

          </form>
        </main>
      }
    </main>
  )
}