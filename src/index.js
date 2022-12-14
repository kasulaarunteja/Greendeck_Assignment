const express = require('express')
const cors = require("cors");


const connect = require('./configs/db')

const userController = require('./controllers/user.controller')
const { register, login, newToken } = require('./controllers/auth.controller')

const passport = require('./configs/google-oauth')

const app = express()

app.use(express.json())
app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	})
);

app.get('/', (req,res) => {
  return res.send('hello good')
})
// /register
app.post('/register', register)
// .login
app.post('/login', login)

app.use('/users', userController)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
  }),
  (req, res) => {
    const { user } = req
    const token = newToken(user)

    return res.send({ user, token })
  },
)

app.listen(process.env.PORT || 8080 , async () => {
  try {
    await connect()
  } catch (err) {
    console.error(err.message)
  }
  console.log('listening on port 8080')
})
