const passport = require('passport');
const hasAuth0Headers = require('~/lib/auth0/auth0HeadersHelper');

/**
 * Custom Middleware to handle JWT authentication, with support for OpenID token reuse
 * Switches between JWT and OpenID authentication based on cookies and environment settings
 */
const requireAuth0OrJwtAuth = (req, res, next) => {
  if (hasAuth0Headers(req)) {
    return passport.authenticate('auth0Strategy', { session: false })(req, res, next);
  } else {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }
};

module.exports = requireAuth0OrJwtAuth;
