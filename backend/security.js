const Jwt = require('jsonwebtoken');

let _permissionsByUser = null;

const getAccessToken = function (headers) {
  if (headers && headers.authorization) {
    const authParts = headers.authorization.split(' ');
    if (authParts.length === 2) {
      return authParts[1];
    }
  }
  return null;
}

module.exports = {
  authenticate: function () {
    return (req, res, next) => {
      const accessToken = getAccessToken(req.headers);
      if (accessToken) {
        const payload = Jwt.verify(accessToken, 'NO-SECRET');
        if (payload) {
          req.session = payload;
          next();
        }
        else {
          res
            .status(401)
            .send({
              code: 401,
              message: 'Unauthorized',
              description: 'You do not have access to the requested resource.'
            });
        }
      }
      else {
        res
          .status(401)
          .send({
            code: 401,
            message: 'Unauthorized',
            description: 'You do not have access to the requested resource.'
          });
      }
    };
  },
  setPermissionsByUser: function (permissionsByUser) {
    _permissionsByUser = permissionsByUser;
  },
  getPermissions: async function (req) {
    return _permissionsByUser[req.session.username];
  }
}
