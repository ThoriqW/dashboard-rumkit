const connection = require("../config/db");

const getRalan = async (_, res) => {
  try {
    const sql = `SELECT reg_periksa.*, poliklinik.nm_poli, pasien.pekerjaan FROM reg_periksa JOIN poliklinik ON reg_periksa.kd_poli = poliklinik.kd_poli JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis WHERE reg_periksa.status_lanjut = 'Ralan'`;
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

module.exports = {
  getRalan,
};
