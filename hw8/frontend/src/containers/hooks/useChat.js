import { useState, useEffect, useRef } from "react";
import { Button, Input, Tag, message} from 'antd'
import React from "react";
import SignIn from "../SignIn.js";

const client = new WebSocket ('ws://localhost:4000')

const sendData = async (data) => {
    await client.send(
    JSON.stringify(data));
};

const ChatContext = React.createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    clearMessages: () => {},
});

const ChatProvider = (props) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

    const [signedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(savedMe || "");
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (signedIn) {
        localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    const startChat = (name, to) => {
        if(!name || !to) {
            throw new Error('there are no name or to');
        }
        sendData(['CHAT',  {name, to}])
    }
    const SignInNewUser = (name) => {
        if(!name){
            throw new Error('there are no name');
        }
        sendData(["User", name])
    }

    const sendMessage = (name, to, body) => {
        console.log('inside useChat sendM')
        if(!name || !to || !body){
            throw new Error('there are no name or to or body');
        }
        sendData(['Message',{name, to, body}])
    }

    // const sendMessage = (payload) => {
    //     sendData(["input", payload]);
    //     console.log(payload);
    // }
    const clearMessages = () => {
        sendData(["clear"]);
    };
    const displayStatus = (s) => {
        if (s.msg) {
          const { type, msg } = s;
          const content = {content: msg, duration: 0.5 }
          switch (type) {
            case 'Message sent success':
            message.success(content)
            break
            case 'open chatbox success':
            message.success(content)
            break
            case 'Signed in success':
            message.success(content)
            break
            case 'success':
            message.success(content)
            break
            case 'error':
            default:
            message.error(content)
            break;
    }}}

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "chat": {
                console.log(payload)
                setMessages(payload); break;
            }
            case "output": {
                setMessages(() =>
                [...messages, ...payload]); 
                break; 
            }
            case "status": {
                setStatus(payload); break; 
            }
            case "init": {
                // setMessages(payload; )
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            case "signInUser": {
                
                break;
            }
            default: break;
        }
    }
    
    return (
    <ChatContext.Provider
        value={{
        status, me, signedIn, messages, setMe, setSignedIn,
        sendMessage, clearMessages, displayStatus, startChat ,SignInNewUser
        }}
        {...props}
    />
    );
};

const useChat = () => React.useContext(ChatContext);
export { ChatProvider, useChat };

// const useChat = () => {
//     const LOCALSTORAGE_KEY = "save-me";
//     const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

//     const [signedIn, setSignedIn] = useState(true);
//     const [me, setMe] = useState(savedMe || "");
//     const [messages, setMessages] = useState([]);
//     const [status, setStatus] = useState({});

//     useEffect(() => {
//         if (signedIn) {
//         localStorage.setItem(LOCALSTORAGE_KEY, me);
//         }
//     }, [me, signedIn]);

//     const sendMessage = (payload) => {
//         sendData(["input", payload]);
//         // setMessages('');
//         // setStatus({
//         //     type: "success",
//         //     msg: "Message sent." 
//         // });
//         // console.log(msg);
//         console.log(payload);
//     }
//     const clearMessages = () => {
//         sendData(["clear"]);
//     };
//     const displayStatus = (s) => {
//         if (s.msg) {
//           const { type, msg } = s;
//           const content = {content: msg, duration: 0.5 }
//           switch (type) {
//             case 'success':
//             message.success(content)
//             break
//             case 'error':
//             default:
//             message.error(content)
//             break
//     }}}

//     client.onmessage = (byteString) => {
//         const { data } = byteString;
//         const [task, payload] = JSON.parse(data);
//         switch (task) {
//             case "output": {
//                 setMessages(() =>
//                 [...messages, ...payload]); break; 
//             }
//             case "status": {
//                 setStatus(payload); break; 
//             }
//             case "init": {
//                 console.log('init to useChat')
//                 setMessages(payload); break;
//             }
//             case "cleared": {
//                 setMessages([]);
//                 break;
//             }
//             default: break;
//         }
//     }

//     return {
//         status, signedIn, messages, me, setMe, setSignedIn, sendMessage, clearMessages, displayStatus
//     };
// };
// export default useChat;
