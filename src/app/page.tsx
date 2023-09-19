"use client"
import * as SVG from "./assets/SVG"
import { useState } from "react";

export default function Home() {
  const [isPasswordVisibleConfirm, setPasswordVisibilityConfirm] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const togglePasswordVisibilityConfirm = () => {
    setPasswordVisibilityConfirm(!isPasswordVisibleConfirm);
  };


  return (
    <>
      {!register && 
        <main className="flex min-h-screen gap-0 content-center items-center sm:flex-col iphone:flex-col  fhd:flex-row fhd:gap-[300px] 
          hd:flex-row hd:gap-[200px]
          "> 
          <SVG.Home_svg
            className='iphone:ml-8 iphone:w-[400px] iphone:h-[412px]  hd:ml-[100px]  hd:w-[600px] hd:h-[612px] fhd:w-[900px] fhd:h-[912px] fhd:ml-[200px]'
          />
          <form className="flex flex-col iphone:w-[374px] iphone:mt-5 fhd:w-[420px]">
            <label className="text-[#E7EDF4] font-Poppins font-semibold iphone:text-3xl hd:text-5xl fhd:text-6xl">
              Boas Vindas!
            </label>
            <label className="text-[#AFC2D4] font-Poppins font-medium iphone: ">
              Faça seu login ou cadastre-se.
            </label>
            <input
              className="bg-[#C7C7C7] p-5 mt-8 mb-4 text-black outline-0 placeholder-[#717171] w-full"
              placeholder="Nome"
              type="text"
            />
            <div className="relative">
              <input
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
            <button className="bg-blue-600 h-[62px] gap-10 mb-2 p-[21px] text-[#FFFF] font-medium iphone:font-bold">
              Login
            </button>
            <label className="text-[#FFF] font-Poppins iphone:text-[15px]">
              Não possui uma conta? <label className="text-[#1E57F1]" onClick={()=>setRegister(true)} >Cadastre-se</label> 
            </label>
          </form>
        </main>
      }
      {register &&
        <main className="flex min-h-screen gap-0 content-center items-center sm:flex-col iphone:flex-col  fhd:flex-row fhd:gap-[300px] 
          hd:flex-row hd:gap-[200px]
          "> 
          <SVG.Home_svg
            className='iphone:ml-8 iphone:w-[400px] iphone:h-[412px]  sm:w-[360px] sm:h-[372px] hd:ml-[100px]  hd:w-[600px] hd:h-[612px] fhd:w-[900px] fhd:h-[912px] fhd:ml-[200px]'
          />
          <form className="flex flex-col iphone:w-[374px] fhd:w-[420px]">
            <label className="text-[#E7EDF4] font-Poppins font-semibold iphone:text-3xl hd:text-5xl fhd:text-6xl">
              Boas Vindas!
            </label>
            <label className="text-[#AFC2D4] font-Poppins font-medium iphone: ">
              Faça seu login ou cadastre-se.
            </label>
            <input
              className="bg-[#C7C7C7] p-5 mt-8 mb-4 text-black outline-0 placeholder-[#717171] w-full"
              placeholder="Nome"
              type="text"
            />
            <div className="relative">
              <input
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
            <button className="bg-blue-600 h-[62px] gap-10 mb-2 p-[21px] text-[#FFFF] font-medium iphone:font-bold">
              Login
            </button>
            
            <label className="text-[#1E57F1] font-Poppins flex items-center justify-center" onClick={() => setRegister(false)}>Voltar</label> 

          </form>
        </main>
      }
    </>
  )
}