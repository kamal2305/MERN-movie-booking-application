import React from 'react'
import { useDispatch } from 'react-redux';
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { userActions } from '../../Store';
import AuthForm from '../Auth/AuthForm'

import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onResReceived = (data) => {
        console.log(data);
        dispatch(userActions.login());
        localStorage.setItem("userId", data.id);
        navigate("/");
    }
        const getData = (data) => {
            console.log(data);
            sendUserAuthRequest(data.inputs, data.signup).then(onResReceived)
                .catch((err) => {
                    console.log(err);
                    alert("Error: " + (err.response?.data?.message || err.message));
                });
            
            
        }
    return (
    <div>
            <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
    )
};
export default Auth