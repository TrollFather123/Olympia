import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ChatBody({ username, roomID, socket }) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [totalMessages, setTotalMessages] = useState([])
    const ChatSent = async () => {
        if (currentMessage !== "") {
            const messageContent = {
                username: username,
                roomId: roomID,
                message: currentMessage
            }
            await socket.emit("send_message", messageContent)
            setTotalMessages((data) => [...data, messageContent])
            setCurrentMessage("")
          
        }
    }
    
    useEffect(() => {
        // console.log(totalMessages,"totalMessages")
        socket.on("receive_message", (data) => {
         
            setTotalMessages((list) => [...list, data]);
        });
        return () => socket.off("receive_message"); 
    }, [socket,setTotalMessages])


    return (
        <Box>
            <Box>
                {
                    totalMessages.map((data,index)=>(
                        <Typography variant='body1' key={index}>
                            {data?.message}
                        </Typography>
                    ))
                }
            </Box>
            <TextField id="outlined-basic" label="" variant="outlined" placeholder='Hey'  value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
            <Button variant='contained' onClick={ChatSent}>
                &#9658;
            </Button>
        </Box>
    )
}
