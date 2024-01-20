const express = require('express');
const fs = require('fs').promises;
const path = require('path')
const { convertToPDF, convertToPDFString } = require('../helper/wordToPdf');

const multer = require('multer');
const { CustomError, ErrorDetail } = require('../helper/errorHandler');
// const upload = multer({ dest: 'assets/file' })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/file')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})


var upload = multer({ storage: storage });

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        return res.send({ message: "UTS API for utility" })
    } catch (error) {
        next(error)
    }
});

router.post('/export', upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file) throw new CustomError(ErrorDetail.FILE_IS_REQUIRED)
        const result = await convertToPDFString(req.file.originalname)
        return res.send(result);
    } catch (error) {
        next(error)
    }
});

router.get('/result', async (req, res, next) => {
    try {
        const { file } = req.query | {}
        if (!file) throw new CustomError(ErrorDetail.FILENAME_IS_REQUIRED)

        const filePath = path.join(__dirname, `../assets/file/${file}`)
        res.download(filePath, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Success convert");
                fs.unlink(filePath, (err) => {
                    err
                        ? console.error('Gagal menghapus file:', err)
                        : console.log('File berhasil dihapus:', file)
                })
                console.log("Done");
            }
        });
    } catch (error) {
        next(error)
    }
})

module.exports = router;
