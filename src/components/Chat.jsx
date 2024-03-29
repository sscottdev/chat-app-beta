import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config.js";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";
import ChatApp from "../App.jsx";

export const Chat = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            console.log(messages);
            setMessages(messages);
        });

        return () => unsuscribe();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    };

    function reload() {
        window.location.reload()
        console.log("reloaded page")
    }

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <span className="user">{message.user}:</span> {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <TextField sx={{ input: { color: 'white' } }}
                    varient="outlined"
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    className="new-message-input"
                    placeholder="Type your message here..."
                />
                <Button variant="contained" type="submit" className="send-button">
                    Send
                </Button>

            </form>
            <Button variant="contained" onClick={reload}>
                Home
            </Button>
        </div>
    );
};