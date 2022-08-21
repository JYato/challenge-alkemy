import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTransaction from "../hooks/useTransaction";
import Header from "../components/Header"
import Footer from "../components/Footer"


const ProtectedRoute = () => {
    const {auth, loading} = useAuth();
    const {loadingTr} = useTransaction();
    if(loading) return 'loading...';
    
    
    if(loadingTr) return (
        <div className="h-screen flex items-center justify-center">
            <progress className="progress w-56 h-5"></progress>
        </div>
    )

    
  return (
    <>
        <Header/>
            {auth?.id ? (
                <main className='nothing'>
                    <Outlet /> 
                </main>
            ): <Navigate to="/" /> }
        <Footer/>
    </>
  )
}

export default ProtectedRoute