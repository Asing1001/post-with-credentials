const path = require('path')
const cors = require('cors')
const express = require('express')
const geb = express()
const session = require('express-session')


geb.use(session({ secret: 'gebsecret', saveUninitialized: true, resave: true, cookie: {sameSite: 'lax'} }))
geb.listen(3000, () => console.log('geb start on 3000'))
geb.set('views', path.join(__dirname, 'views'))
geb.set('view engine', 'ejs')
geb.use(express.urlencoded())

geb.post('/callback', cors({ credentials: true, origin:true }), (req, res) => {
  req.session.metaData = req.body.metaData
  console.log(req.body);
  res.send('ok')
})
geb.get('/', (req, res) => {
  res.render('poll', { metaData: req.session.metaData })
})

const travel = express()
travel.set('views', path.join(__dirname, 'views'))
travel.set('view engine', 'ejs')
travel.listen(3333, () => console.log('travel start on 3333'))
travel.get('/', (req, res) => {
  res.render('meta')
})