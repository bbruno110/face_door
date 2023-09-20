const isEmailValid = (email:string) =>{
    return /\S+@\S+\.\S+/.test(email);
}

export default isEmailValid;