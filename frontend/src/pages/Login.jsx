import { useEffect, useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axiosClient from "../config/axios"
import Alert from "../components/Alert"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {setAuth, handleSetAlert, setClean} = useAuth();

    const navigate = useNavigate();

    useEffect(()=> {
      const cleanStates = () => {
        setClean(true);
        setTimeout(()=>{setClean(false)},500);
      }
      cleanStates();
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      if([email, password].includes('')) {
        handleSetAlert({
            msg: 'All fields are required',
            error: true
        });
        return 
      }

      try {
        const { data } = await axiosClient.post('/users/login', {email, password})
        localStorage.setItem('token', data.token)
        setAuth(data)
        navigate('/home')
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
                Sign In
            </h1>  
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-64 md:w-96 max-w-lg">
            
              <label className="label">
                <span className="label-text">What is your email?</span>
              </label>
              <input type="email" placeholder="jeisson.yato@gmail.com" className="input input-bordered w-full max-w-xs md:max-w-lg mb-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered w-full max-w-xs md:max-w-lg" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/> 
              <label className="label">
                <Link to="/register" className='label-text-alt'>Do you not have an account? Sign Up</Link>
              </label>
              <input type="submit" value="Sign in" className="bg-primary w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-secondary md:w-auto"/>
          </div>
        </form>
    </>
  )
}

export default Login