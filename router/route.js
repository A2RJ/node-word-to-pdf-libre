const express = require('express');
const fs = require('fs').promises;
const { convertToPDF } = require('../helper/wordToPdf');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await convertToPDF('example')
        res.download(result, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Success convert");
                fs.unlink(result, (err) => {
                    err
                        ? console.error('Gagal menghapus file:', err)
                        : console.log('File berhasil dihapus:', result)
                })
                console.log("Done");
            }
        });
    } catch (error) {
        next(error)
    }
});

router.get('/export', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name || 'Stranger'}!` });
});

module.exports = router;
