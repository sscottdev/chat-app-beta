import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="auth">
            <p> Sign In With Google To Continue </p>
            <Button varient={"contained"} onClick={signInWithGoogle}> Sign In With Google </Button>
        </div>
    );
};