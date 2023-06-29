import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import io from "socket.io-client";
import ChatBody from './ChatBody';

const socket = io.connect("http://localhost:3001");



export default function ChatLayout() {

    const [username, setUsername] = useState("")
    const [roomID, setRoomId] = useState("")
    const [showChat, setShowChat] = useState(false)
    const chatRoom = () => {
        if (username !== "" && roomID !== "") {
            socket.emit("join_room", roomID)
            setShowChat(true)
        }

    }
    return (
        <Box className="chat_layout">
            {
                !showChat ?
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="" variant="outlined" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="" variant="outlined" placeholder='Room ID' onChange={(e) => setRoomId(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={chatRoom}>
                        Join Room
                    </Button>
                </Grid>
            </Grid>
                 :
                 <ChatBody userName={username} roomID={roomID} socket={socket}/>
            }
          
        </Box>
    )
}
