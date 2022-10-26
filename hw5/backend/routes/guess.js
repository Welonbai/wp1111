import express from 'express'
import {genNumber, getNumber}  from '../core/getNumber.js'

const router = express.Router()
router.post('/start', (_, res) => {
    genNumber(0, 100) // 用亂數產生一個猜數字的 number，存在 memory DB
    let num = getNumber()
    res.json({ msg: 'The game has started.'+ num})
})

router.get('/guess', (req, res) => {
    let num = getNumber()
    let inputNum = req.query.number
    if(isNaN(inputNum) || inputNum>100 || inputNum<1){
        res.status(406).send({ msg: 'Not a legal number.' })
    } else if(inputNum == num){
        res.json({ msg: 'Equal'})
    } else if(inputNum < num){
        res.json({ msg: 'Bigger'})
    } else if(inputNum > num){
        res.json({ msg: 'Smaller'})
    } 
})
// res.json({ msg: inputNum})
// || inputNum>100 || input<1
// 去 (memory) DB 拿答案的數字
// 用 req.query.number 拿到前端輸入的數字
// check if NOT a num or not in range [1,100]
// 如果有問題 =>
// res.status(406).send({ msg: 'Not a legal number.' })
// 如果沒有問題，回傳 status
router.post('/restart', (_, res) => {  })
export default router