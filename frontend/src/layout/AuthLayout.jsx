import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
      <main className='container flex flex-col md:w-4/5 gap-10 mt-12  p-5 justify-center items-center m-auto'>
        <Outlet />
      </main>
  )
}

export default AuthLayout
