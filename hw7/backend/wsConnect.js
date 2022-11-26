import Message from './models/message.js';
import {UserModel, MessageModel, ChatBoxModel} from './models/chatbox.js';


const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)); 
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws); 
}
const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
    });
};

const makeName = (name, to) => { return [name, to].sort().join('_'); };

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name: name});
    if (!box) { 
        box = await new ChatBoxModel({ name, users: participants }).save();
    }
    return box.populate(["users", {path: 'messages', populate: 'sender' }]);
};
    
export default {
    initData: (ws) => {
        // Message.find().sort({ created_at: -1 }).limit(100)
        // .exec((err, res) => {
        //     if (err) throw err;
        //     // initialize app with existing messages
        //     sendData(["init", res], ws);
        // });
    },
    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            // console.log('before ws switch', payload)
            switch (task) {
                case 'CHAT': {
                    sendStatus({
                        type: 'open chatbox success',
                        msg: 'open chatbox.'
                    }, ws);
                    //開新聊天室 或來到某個聊天室 沒聊天對象的user schema就創一個
                    const { name, to } = payload
                    let User = await UserModel.findOne({ name: to });
                    if (!User) { 
                        User = await new UserModel({ name: to, chatBoxes:[]})
                        // console.log('Chat', User)
                        try { 
                            await User.save();
                        } catch (e) { 
                            throw new Error("User DB save error: " + e); 
                        }
                    }
                    //若無聊天室scema則建立一個 並更新使用者scema裡放著的聊天室內容 
                    let user1 = await UserModel.findOne({ name: name });
                    let user2 = await UserModel.findOne({ name: to });
                    let participants = [user1, user2];
                    let box = await ChatBoxModel.findOne({ name: makeName(name, to)});
                    if (!box) { 
                        box = await new ChatBoxModel({ name: makeName(name, to), users: participants }).save();
                    }
                    
                    let ifChatBoxExist1 = await UserModel.findOne({ name: name, chatBoxes: {"$in":box} });
                    if(!ifChatBoxExist1){
                        await user1.updateOne({ $push: { chatBoxes: box } }).then(function(res, err){
                            if(err) {
                              console.log(err);
                            } else {
                              console.log('user1 success update', res)
                            }
                        });
                    }
                    let ifChatBoxExist2 = await UserModel.findOne({ name: to, chatBoxes: {"$in":box} });
                    if(!ifChatBoxExist2){
                        await user2.updateOne({ $push: { chatBoxes: box } }).then(function(res, err){
                            if(err) {
                              console.log(err);
                            } else {
                              console.log('user2 success update', res)
                            }
                        });
                    }
                    await ChatBoxModel.findOne({ name: makeName(name, to)}).populate({path: 'messages', model: 'Message', populate: {path: 'sender', model:'User'}}).exec((err,found)=>{
                        if(err)
                        // ,'messages' [{path: 'messages', populate: 'sender' }]
                            throw err;
                        else{
                            let res = []
                            let name = '';
                            let body = '';
                            let element = '';
                            let initForEachCounter = 0;
                            found.messages.forEach((mes) => {
                                name = mes.sender.name;
                                body = mes.body;
                                element = {name, body};
                                res.push(element);
                                console.log(initForEachCounter)
                                initForEachCounter++;
                            })
                            // console.log('test',found.messages[0].sender.name, found.messages[0].body);
                            sendData(["chat", res], ws);
                        }
                    })

                    break;
                }
                case 'Message': {
                    const { name, to, body } = payload;
                    // console.log(name)
                    // console.log(to)
                    // console.log(body)
                    // console.log('inside ws switch message ')
                    let chatBoxName = makeName(name, to);
                    let chatbox = await ChatBoxModel.findOne({ name: chatBoxName });
                    // console.log(chatbox)
                    let sender = await UserModel.findOne({ name: name });
                    //
                    let Message = await new MessageModel({ chatBox: chatbox, sender: sender, body: body });
                    Message.save();
                    await chatbox.updateOne({ $push: { messages: Message } }).then(function(res, err){
                        if(err) {
                          console.log(err);
                        } else {
                        console.log(res)
                        }
                    })
                    let tempPayload = {name, body}
                    console.log(tempPayload)
                    broadcastMessage(wss, ['output', [payload]], {
                        type: 'Message sent success',
                        msg: 'Message sent.'
                    })
                    // sendData(['output', [tempPayload]])
                    // sendStatus({
                    //     type: 'Message sent success',
                    //     msg: 'Message sent.'
                    // })
                    break;
                }
                case 'User': {
                    const name  = payload;
                    let User = await UserModel.findOne({ name: name });
                    if (!User) { 
                        const User = await new UserModel({ name: name, chatBoxes:[]})
                        // console.log('User', User)
                        try { 
                            await User.save();
                        } catch (e) { 
                            throw new Error("User DB save error: " + e); 
                        }
                    }
                    sendStatus({
                        type: 'Signed in success',
                        msg: 'User successfully signed In.'
                    }, ws);
                    // broadcastMessage(wss, ['signInUser'], {
                    //     type: 'Signed in success',
                    //     msg: 'User successfully signed In.'
                    // })

                    break;
                }
                // case 'input': {
                //     const { name, body } = payload
                //     // Save payload to DB
                //     let message = new Message({ name, body })
                //     try { 
                //         await message.save();
                //     } catch (e) { 
                //         throw new Error("Message DB save error: " + e); 
                //     }
                //     // Respond to client
                //     broadcastMessage(wss, ['output', [payload]], {
                //         type: 'Message sent success',
                //         msg: 'Message sent.'
                //     })
                //     break
                // }
                case 'clear': {
                    MessageModel.deleteMany({}, () => {
                    broadcastMessage(wss, ['cleared'], { 
                        type: 'info', msg: 'Message cache cleared.'
                    })   
                    })
                    break
                }
                default: break
            }
        })
}