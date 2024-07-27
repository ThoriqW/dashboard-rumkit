const connection = require("../config/db");

const getRanap = async (_, res) => {
    try {
        const sql = `SELECT 
            kamar_inap.no_rawat,
            kamar_inap.tgl_masuk,
            kamar_inap.tgl_keluar,
            kamar_inap.stts_pulang,
            reg_periksa.no_rkm_medis,
            pasien.nm_pasien,
            bangsal.nm_bangsal
        FROM 
            kamar_inap
        INNER JOIN 
            reg_periksa ON kamar_inap.no_rawat = reg_periksa.no_rawat
        INNER JOIN 
            pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
        INNER JOIN 
            kamar ON kamar_inap.kd_kamar = kamar.kd_kamar
        INNER JOIN 
            bangsal ON kamar.kd_bangsal = bangsal.kd_bangsal`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    } catch (err) {
        res.status(500).json({
            massage: massage.err
        });
    }
}


module.exports = {
    getRanap
};