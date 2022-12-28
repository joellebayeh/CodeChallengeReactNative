import axios from "axios";
import { loginActions } from "../slices/login-slice"
import config from "../../../config";

export const PostLoginAction = (userlogin) => {
    return async (dispatch) => {
        dispatch(loginActions.logInReq());
        await axios.post(config.LOGIN_URL,{
            username: userlogin.username,
            password: userlogin.password,
            headers: {
                "Content-Type":"application/json",
            } 
        })
        .then((res)=>{
            const token = res.data.accessToken;
            dispatch(loginActions.logInSuccess(token));
        })
        .catch((err)=>{
            dispatch(loginActions.logInFailed("Please check your login credentials"));
        })
    }
}