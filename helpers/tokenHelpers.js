const sendJwtToClient = (user, res) => {
  const JWT_COOKIE = process.env.JWT_COOKIE;
  const token = user.generateJWTFromUser();
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};

const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};

const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(" ")[1];
  return accessToken;
};

module.exports = {
  isTokenIncluded,
  getAccessTokenFromHeader,
  sendJwtToClient,
};
