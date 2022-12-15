import './App.css'
import { useState, useEffect, useRef } from "react";
import { Button, Input, Tag, message} from 'antd'
import {useChat} from './containers/hooks/useChat'
import styled from "styled-components";
import ChatRoom from './containers/ChatRoom.js'
import SignIn from './containers/SignIn.js'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const { status, signedIn, displayStatus } = useChat()
  
  useEffect(() => {
  displayStatus(status)}, [status, displayStatus])

  return (
    <Wrapper> {signedIn? <ChatRoom />: <SignIn />} </Wrapper>
    
  )
}

export default App
