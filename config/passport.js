const passport = require('passport')
const User = require('../models/users')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=> {
        done(err, user)
    })
})

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
   User.findOne({'email': email})
    .then((err, user)=> {
        if(err) {
            return done(err)
        }

        if(user) {
            return done(null, false, {message : 'Email is already in use'})
        }

        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
        newUser.save()
            .then(user => {
                if(user) {
                    return done(null, newUser)
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
}))