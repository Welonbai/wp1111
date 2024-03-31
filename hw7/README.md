# 以網頁前後端實作簡易聊天室

## 使用相關技術:
語言:   Javascript, HTML, CSS  
套件:   React, Node.js(Express), MongoDB, Websocket  
Javascript相關技術:   Hook(如useEffect, UseState), styled-components  


(並未使用graphql)  
(並未deploy在如heroku等平台, 只有localhost)  

## Prerequisite
Run yarn or npm install to install all the dependencies.
cd to frontend, and run yarn start or npm start to start the app.
cd to backend, and run npm run server to start the app.

## 專案內容:
起始會顯示登入網頁，能夠以名字做登入，登入後會進入聊天室介面，能夠開啟多個聊天室，並點擊不同聊天室與不同人聊天。
而當兩個人分別登入時，兩個人便可即時聊天。

## 專案演示:
=======
以SendGuy之名登入, 傳訊息給ReceiveGuy, 再以ReceiveGuy之名登入, 即可看到收到的訊息.

起始畫面
![螢幕擷取畫面 2024-03-31 155016](https://github.com/Welonbai/wp1111/assets/62245152/391a8e40-cecc-43cb-850a-60d8dd5c7e2f)
以SendGuy之名登入
![螢幕擷取畫面 2024-03-31 155124](https://github.com/Welonbai/wp1111/assets/62245152/6d08516b-4d74-4732-ba84-045e1ac34598)
打開和ReceiveGuy的聊天室並傳訊息
![螢幕擷取畫面 2024-03-31 155844](https://github.com/Welonbai/wp1111/assets/62245152/a6e491dd-e2f1-4e44-ae04-182dce7954fa)
再以ReceiveGuy之名登入即可看到收到的訊息
![螢幕擷取畫面 2024-03-31 155928](https://github.com/Welonbai/wp1111/assets/62245152/27045652-6bf6-4ec9-9c40-127bd2c92d0b)

