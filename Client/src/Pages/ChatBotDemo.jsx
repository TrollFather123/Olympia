import React from 'react'
import Wrapper from '../Layout/Wrapper'
import ChatBot from 'react-simple-chatbot';
import ChatLayout from '../Component/LiveChat/ChatLayout';


export default function ChatBotDemo() {
  const config = {
    floating: true
  }
  const steps = [
    {
      id: '0',
      message: 'Welcome to react chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Please Tell us your name',
      trigger: '2',
    },
    {
      id:'2',
      user:true,
      trigger:"3"
    },{
      id:"3",
      message:"Hi {previousValue}",
      trigger:'4'
    },
    {
      id:"4",
      message:"want to chat!!",
      trigger:"5"
    }
    ,{
      id:"5",
      options:[
        {
          value:"yes",
          label:"yes",
          trigger:"yes"
        },
        {
          value:"No",
          label:"No",
          trigger:"No"
        }
      ]
    },
    {
      id:"yes",
      component:(
        <div>
          <ChatLayout/>
        </div>
      ),
      end:true
    },
    {
      id:"No",
      message:"Ok Have Nice Day!! Bye",
      end:true
    }
  ];


  return (
    <Wrapper>
      <ChatBot headerTitle="HelpBot"
        recognitionEnable={true}
        steps={steps}
        {...config} />
    </Wrapper>
  )
}
