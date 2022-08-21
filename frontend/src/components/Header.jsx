import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const {auth, signOut} = useAuth();
  return (
    <header className="bg-primary p-10 mx-auto flex md:w[48rem] lg:w-[64rem] xl:w-[80rem] 2xl:w-[96rem] justify-between items-center">
      <h1 className="font-bold text-2xl text-secondary text-center">
        Alkemy Challenge
      </h1>
      <nav className="flex flex-col items-center lg:flex-row gap-6 mt-5 lg:mt-0">
        <h3>Hi, {auth.name}</h3>
        <button 
          className="btn btn-outline btn-secondary"
          onClick={signOut}
        >Sign Out</button>
      </nav>
    </header>
  )
}

export default Header