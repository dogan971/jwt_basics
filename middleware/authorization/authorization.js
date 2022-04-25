const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/tokenHelpers");
const jwt = require("jsonwebtoken");

const getAccessToRoute = (req, res, next) => {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!isTokenIncluded(req))
    return console.error("You are not authorized to access this route");
  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, PRIVATE_KEY, (err, decoded) => {
    console.log(decoded);
    if (err) console.error("You are not authorized to access this route");
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

module.exports = getAccessToRoute;
