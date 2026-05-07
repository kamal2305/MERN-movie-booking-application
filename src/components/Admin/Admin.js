import React from 'react'
import { useDispatch } from 'react-redux';
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { adminActions } from '../../Store';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../Auth/AuthForm';


const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then((res) => {
        dispatch(adminActions.login());
        localStorage.setItem("adminId", res.id);
        localStorage.setItem("token", res.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error: " + (err.response?.data?.message || err.message));
      });
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin ={true} />
    </div>
  )
}

export default Admin