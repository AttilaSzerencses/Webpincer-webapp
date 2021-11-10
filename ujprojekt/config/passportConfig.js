const LocalStrategy = require("passport-local").Strategy;
const  pool  = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const DAOuser = require('../dao/user-dao');

function initialize(passport) {
    console.log("Initialized");

    const authenticateUser = async (email, password, done) => {
		let user=await new DAOuser().getUserByEmail(email);
		if(user.rows[0].length!==0){
			user=user.rows[0];
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) {
                    console.log(err);
				}
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Helytelen jelszó!" });
                }
            });
					
		}
		else {
            return done(null, false, {
                message: "Nem létezik felhasználó ezzel az email-el."
             });
		}
    };

    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            authenticateUser
        )
    );
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
		let user= await new DAOuser().getOneUser(id);
		console.log(`ID is ${user.id}`);
		return done(null, user);
    });

}

module.exports = initialize;