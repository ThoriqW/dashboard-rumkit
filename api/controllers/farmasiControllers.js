const connection = require("../config/db");

const getAllFarmasi = async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log(startDate, endDate);
  try {
    const sql = `
      SELECT detail_pemberian_obat.kode_brng, databarang.nama_brng, SUM(detail_pemberian_obat.jml) AS jml,
             (SUM(detail_pemberian_obat.total) - SUM(detail_pemberian_obat.embalase + detail_pemberian_obat.tuslah)) AS biaya,
             SUM(detail_pemberian_obat.embalase) AS embalase, SUM(detail_pemberian_obat.tuslah) AS tuslah,
             SUM(detail_pemberian_obat.total) AS total, reg_periksa.tgl_registrasi
      FROM detail_pemberian_obat
      INNER JOIN reg_periksa ON detail_pemberian_obat.no_rawat = reg_periksa.no_rawat
      INNER JOIN databarang ON detail_pemberian_obat.kode_brng = databarang.kode_brng
      WHERE detail_pemberian_obat.status = 'Ralan'
      AND reg_periksa.tgl_registrasi BETWEEN ? AND ?
      GROUP BY detail_pemberian_obat.kode_brng, reg_periksa.tgl_registrasi
      ORDER BY reg_periksa.tgl_registrasi, databarang.nama_brng;
    `;

    connection.query(sql, [startDate, endDate], (err, result) => {
      if (err) {
        console.error(err); // Mencetak kesalahan ke konsol untuk debugging
        return res.status(500).json(err);
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllFarmasi,
};
