const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")

let app = express()

app.set("views", path.join(__dirname, 'views') )
app.set("view engine", "jade")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join( __dirname, "public")))


app.get('/', (req, res) => {
    res.render("index", {title: 'Home'})
})

app.get('/30May2017', (req, res) => {
    res.render("30May2017")
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.get('/contact', (req, res) => {
    res.render("contact")
})

app.post('/contact/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "mawdum66@gmail.com",
            pass: "Komkiat90"
        }
    })

    let mailOptions = {
        from: "แมวดำ <mawdum66@gmail.com>",
        to: "parnaigon@gmail.com",
        subject: "Website Sumission",
        text: "You have a submission with following details... Name: " + req.body.name + "Email: " + req.body.email + "Message :" + req.body.message,
        html: "<p>You have a submission with following details... </p><ul><li> Name: " + req.body.name + "</li><li>Email: " + req.body.email + "</li><li>Message :" + req.body.message +"</li></ul>"
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
            res.redirect('/')
        } else {
            console.log('Message Sent: ' + info.response)
            res.redirect('/')
        }
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})