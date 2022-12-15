import { useState, useEffect, useRef } from "react";
import { Button, Input, Tag, message, Tabs, Avatar} from 'antd'
import {useChat} from './hooks/useChat.js'
import styled from "styled-components";
import AppTitle from "../components/Title.js";
import Message from "../components/Message.js";
import ChatModal from "../components/ChatModal.js";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;   
`;

const ChatBoxWrapper = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: auto;   
`;

const FootRef = styled.div`
height: 20px;
`;

const ChatRoom = () => {
    const bodyRef = useRef(null)
    const msgFooter = useRef(null)
    const { status, signedIn, messages, me, sendMessage, displayStatus, clearMessages, startChat } = useChat()
    // const [username, setUsername] = useState('')
    const [body, setBody] = useState('')

    const [chatBoxes, setChatBoxes] = useState([  
        // { label: me, children: renderChat(messages), key: me }
    ])
    const [activeKey, setActiveKey] = useState(me)
    const [modalOpen, setModalOpen] = useState(false);

    const [msgSent, setMsgSent] = useState(false)
    

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView
        ({ behavior: 'smooth', block: "start" });
    };

    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    const renderChat = (chat) => (
        <ChatBoxWrapper>
            {chat.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
            ) : (
                chat.map(({ name, body }, i) => (
                    <Message isMe={name===me ? true : false} message={body} key={i} myKey={i}/>
                ))
            )}
            <FootRef ref={msgFooter} />
        </ChatBoxWrapper>
    ); // 產生 chat 的 DOM nodes
    useEffect(() => {
        let updatedList = chatBoxes.map(item => 
            {
              if (item.label === activeKey){
                return {...item, children: renderChat(messages)}; //gets everything that was already in item, and updates "done"
              }
              return item; // else return unmodified item 
            });
        setChatBoxes(updatedList)
    }, [messages])
    const extractChat = (friend) => {
        return renderChat(messages)
        //     .filter
        // (({name, body}) => ((name === friend) || (name === me)))
        // );
    }
    const createChatBox = (friend) => {
        if (chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes,{ label: friend, children: chat, key: friend }]);
        setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);
        return(
            activeKey?
                activeKey === targetKey?
                    index === 0?
                    '' : chatBoxes[index - 1].key
                : activeKey
            : ''
        )
    };
    
    return(
        <div>
            <AppTitle name={me}/>
            <ChatBoxesWrapper 
                tabBarStyle={{ height: '36px'}}
                type="editable-card"
                onChange={(key) => {
                    setActiveKey(key);
                    startChat(me, key);
                    extractChat(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') {
                        console.log('press plus')
                        setModalOpen(true);
                    } else if (action === 'remove') {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
                activeKey={activeKey}
                items={chatBoxes}
            />
            <ChatModal
                open={modalOpen}
                onCreate={({ name }) => {
                    startChat(me, name)
                    setActiveKey(createChatBox(name));
                    extractChat(name);
                    setModalOpen(false);
                }}
                onCancel={() => { setModalOpen(false);}}
            />
            {/* <Input
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    bodyRef.current.focus()
                }}}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: 10 }}
            ></Input> */}
            <Input.Search
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                if (!msg || !me) {
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter a username and a message body.'
                    })
                    return
                }
                sendMessage(me, activeKey, msg)
                setBody('')
                }}
            ></Input.Search>
        </div>
    )
}

export default ChatRoom