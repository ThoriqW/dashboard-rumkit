const connection = require("../config/db");

const getAllPatients = async (_, res) => {
  try {
    const sql = "SELECT * FROM pasien";
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ massage: massage.err });
  }
};

module.exports = { getAllPatients };
