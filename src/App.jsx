import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

const cookies = new Cookies();

function ChatApp() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [isInChat, setIsInChat] = useState(null);
    const [room, setRoom] = useState("");

    if (!isAuth) {
        return (
            <AppWrapper
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setIsInChat={setIsInChat}
            >
                <Auth setIsAuth={setIsAuth} />
            </AppWrapper>
        );
    }

    return (
        <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
            {!isInChat ? (
                <div className="room">
                    <h3> Type room name: </h3>
                    <br></br>
                    <TextField sx={{ input: { color: 'white' } }} onChange={(e) => setRoom(e.target.value)} />
                    <br></br>
                    <Button
                        required
                        variant={"contained"}
                        onClick={() => {
                            setIsInChat(true);
                        }}
                    >
                        Enter Chat
                    </Button>
                </div>
            ) : (
                <Chat room={room} />
            )}
        </AppWrapper>
    );
}

export default ChatApp;