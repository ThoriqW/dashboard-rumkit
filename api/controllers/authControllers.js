const connection = require("../config/db");
const jwt = require("jsonwebtoken");

const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const userKey = process.env.ENCRYPTION_KEY_USER;
  const passwordKey = process.env.ENCRYPTION_KEY_PASSWORD;
  const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

  const sql = `
    SELECT AES_DECRYPT(u.id_user, ?) AS decryptedUser, AES_DECRYPT(u.password, ?) AS decryptedPassword, p.nama FROM user u JOIN pegawai p ON AES_DECRYPT(u.id_user, ?) = p.nik
    WHERE AES_DECRYPT(u.id_user, ?) = ?
  `;

  connection.query(
    sql,
    [userKey, passwordKey, userKey, userKey, username],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .json({ message: "Database query error", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      if (user.decryptedPassword === null) {
        return res.status(500).json({ message: "Error decrypting password" });
      }

      if (password === user.decryptedPassword.toString()) {
        const token = jwt.sign(
          { id: user.decryptedUser, name: user.nama },
          jwtSecretKey,
          { expiresIn: "1h" }
        );

        return res
          .status(200)
          .json({ message: "Login successful", user, token });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }
  );
};

module.exports = {
  adminLogin,
};
