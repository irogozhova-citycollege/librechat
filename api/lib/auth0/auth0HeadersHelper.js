function hasAuth0Headers(req, res, next) {
  const authHeader = req.headers.authorization;
  return typeof authHeader === 'string' && authHeader.startsWith('Auth0');
}

module.exports = hasAuth0Headers;