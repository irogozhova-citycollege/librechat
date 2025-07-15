function hasAuth0Headers(req, res, next) {
  return req.headers['auth-type'] === 'auth0';
}

module.exports = hasAuth0Headers;