const JwtStrategy  = require('passport-jwt').Strategy;
const ExtractJwt   = require('passport-jwt').ExtractJwt;
const jwksRsa      = require('jwks-rsa');

// JWT strategy
const jwtLogin = () =>
    new JwtStrategy(
        {
          // Pull the right public key for the incoming token
          secretOrKeyProvider: jwksRsa.passportJwtSecret({
            jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 10
          }),
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          audience: process.env.AUTH0_AUDIENCE,
          algorithms: ['RS256']
        },
        (payload, done) => done(null, { id: payload.sub, role: 'USER' }) // payload is now verified
    )

module.exports = jwtLogin;
