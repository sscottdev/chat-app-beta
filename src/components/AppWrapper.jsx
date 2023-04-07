import { auth } from "../../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
const cookies = new Cookies();
export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
        setIsInChat(false);
    };

    return (
        <div className="App">
            <div className="app-header">
                <h1> Chat App - Project </h1>
            </div>

            <div className="app-container">{children}</div>
            {isAuth && (
                <div className="sign-out">
                    <Button variant={"contained"} onClick={signUserOut}> Sign Out</Button>
                </div>

            )}
        </div>
    );
};