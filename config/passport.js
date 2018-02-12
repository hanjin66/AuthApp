const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
	let options = {};
	// options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	options.secretOrKey = config.secret;
	passport.use(new JwtStrategy(options, (jwt_payload, done)=>{
		console.log(jwt_payload);
		User.getUserById(jwt_payload.data._id, (error, user)=>{
			// if there is an error
			if(error){
				// return error, false for user
				return done(error, false);
			}
			// if user is found
			if(user){
				// return null for error and user object for user
				return done(null, user);
			}
			// Else (no error and no user found)
			else{
				// return null for error and false for user
				return done(null, false);
			}
		});
	}));
}