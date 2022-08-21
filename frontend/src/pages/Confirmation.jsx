import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";


const Confirmation = () => {
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const {handleSetAlert} = useAuth();
  const params = useParams();
  const {id} = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const {data} = await axiosClient(url);
        setConfirmedAccount(true);
        handleSetAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        handleSetAlert({
          msg:error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount();
  }, [])

  return (
    <>
      <Alert/>
      <h1 className="bg-secondary text-white p-6">
        Confirmation of your account
      </h1>
      <div>
        {!loading && <div>
          </div>}
        {confirmedAccount && (
          <Link
            className="text-2xl border-b-8 border-slate-400"
            to="/"
          >Sign In</Link>
        )}
      </div>
    </>
  )
}

export default Confirmation