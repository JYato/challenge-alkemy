import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AuthLayout from "./layout/AuthLayout"
import ProtectedRoute from "./layout/ProtectedRouteLayout"

import Confirmation from "./pages/Confirmation"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import EditTransaction from "./pages/EditTransaction"


import { AuthProvider } from "./context/AuthContext"
import { TransactionProvider } from "./context/TransactionContext"



function App() {

  return (
    <Router>
      <AuthProvider>
        <TransactionProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login/>}/>
              <Route path="register" element={<Register/>} />
              <Route path="confirm/:id" element={<Confirmation/>} />
            </Route>

            <Route path="/home" element={<ProtectedRoute/>}>
              <Route index element={<Home/>}/>
              <Route path="transaction" element={<EditTransaction/>}/>
            </Route>
            
          </Routes>
        </TransactionProvider>
      </AuthProvider>
    </Router>
    
  )
}

export default App
