require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

/*
// Middleware untuk memverifikasi token JWT
function authenticateToken(req, res, next) {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Jika token tidak tersedia
  if (!token) {
    return res.status(401).json({ error: 'Token tidak tersedia' });
  }

  // Memverifikasi token
  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token tidak valid' });
    }
    // Menyimpan informasi pengguna pada objek req
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken
};
*/
