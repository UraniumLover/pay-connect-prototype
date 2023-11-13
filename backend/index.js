import express from "express"
import fs from "fs"
import cors from "cors"
import {z} from "zod"

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/pay', (req, res) => {
    const body = z.object({
        payer: z.string(),
        recipient: z.string(),
        paymentMethod: z.enum(['fps', 'payme']),
        receiveMethod: z.enum(['alipay', 'fps', 'payme', 'paypal']),
        amount: z.number().gt(0)
    }).parse(req.body)

    // read files
    let userPayment = JSON.parse(fs.readFileSync('data/user/' + body.paymentMethod + '.json'))
    let payConnectUser = JSON.parse(fs.readFileSync('data/payconnect/' + body.paymentMethod + '.json'))
    let payConnectShop = JSON.parse(fs.readFileSync('data/payconnect/' + body.receiveMethod + '.json'))
    let shopPayment = JSON.parse(fs.readFileSync('data/' + body.recipient + '/' + body.receiveMethod + '.json'))

    // do stuff

    userPayment.balance -= body.amount
    payConnectUser.balance += body.amount
    payConnectShop.balance -= body.amount
    shopPayment.balance += body.amount

    // write files
    fs.writeFileSync('data/user/payme.json', JSON.stringify(userPayment))
    fs.writeFileSync('data/payconnect/' + body.paymentMethod + '.json', JSON.stringify(payConnectUser))
    fs.writeFileSync('data/payconnect/' + body.receiveMethod + '.json', JSON.stringify(payConnectShop))
    fs.writeFileSync('data/' + body.recipient + '/' + body.receiveMethod + '.json', JSON.stringify(shopPayment))

    res.json()

})

app.get('/api/user/payme', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/user/payme.json')))
})
app.post('/api/user/payme',(req, res) => {
    fs.writeFileSync('data/user/payme.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.get('/api/user/fps', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/user/fps.json')))
})
app.post('/api/user/fps',(req, res) => {
    fs.writeFileSync('data/user/fps.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.get('/api/FTEC3002-shop/alipay', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/FTEC3002-shop/alipay.json')))
})
app.post('/api/FTEC3002-shop/alipay',(req, res) => {
    fs.writeFileSync('data/FTEC3002-shop/alipay.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.get('/api/FTEC3002-shop/paypal', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/FTEC3002-shop/paypal.json')))
})
app.post('/api/FTEC3002-shop/paypal',(req, res) => {
    fs.writeFileSync('data/FTEC3002-shop/paypal.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.get('/api/payconnect/alipay', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/payconnect/alipay.json')))
})
app.post('/api/payconnect/alipay',(req, res) => {
    fs.writeFileSync('data/payconnect/alipay.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.get('/api/payconnect/fps', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/payconnect/fps.json')))
})
app.post('/api/payconnect/fps',(req, res) => {
    fs.writeFileSync('data/payconnect/fps.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.get('/api/payconnect/payme', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/payconnect/payme.json')))
})
app.post('/api/payconnect/payme',(req, res) => {
    fs.writeFileSync('data/payconnect/payme.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.get('/api/payconnect/paypal', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('data/payconnect/paypal.json')))
})
app.post('/api/payconnect/paypal',(req, res) => {
    fs.writeFileSync('data/payconnect/paypal.json', JSON.stringify(req.body))
    res.send({ success: true })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})