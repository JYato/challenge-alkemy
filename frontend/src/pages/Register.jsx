import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Alert from "../components/Alert";
import axiosClient from "../config/axios"
import useAuth from "../hooks/useAuth";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const {handleSetAlert, setClean} = useAuth();

    useEffect(()=> {
      const cleanStates = () => {
        setClean(true);
        setTimeout(()=>{setClean(false)},500);
      }
      cleanStates();
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      if([name, email, password, repeatPassword].includes('')) {
        handleSetAlert({ msg: "There are empty fields", error: true})
        return;
      }

      if(password !== repeatPassword) {
        handleSetAlert({ msg: "Passwords are not the same", error: true})
        return;
      }

      if(password.length < 8) {
        handleSetAlert({ msg: 'The password is short, the minimum length is 8', error:true});
        return;
      }

      try {
        await axiosClient.post('/users', {name, email, password});
        handleSetAlert({
          msg: "User has been created, check your email",
          error: false
        })
      } catch (error) {
        handleSetAlert({
          msg: error.response.data.msg,
          error: true
        })
      }

    }

  return (
    <>
        <Alert/>
        <div>
            <h1 className="font-black text-6xl">
                Sign Up
            </h1>  
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-64 md:w-96 max-w-lg">
              <label className="label">
                <span className="label-text">What is your name?</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs md:max-w-lg mb-5"
                value={name}
                onChange={(e) => setName(e.target.value)}/>

              <label className="label">
                <span className="label-text">What is your email?</span>
              </label>
              <input type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs md:max-w-lg mb-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs md:max-w-lg mb-5" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/> 

              <label className="label">
                <span className="label-text">Repeat Password</span>
              </label>
              <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs md:max-w-lg" 
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}/>                 

              <label className="label">
                <Link to="/" className='label-text-alt'>Do you have an account? Sign In</Link>
              </label>
              <input type="submit" value="Sign Up" className="bg-primary w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-secondary md:w-auto"/>         

          </div>
        </form>
    </>
  )
}

export default Register