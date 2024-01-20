const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
// libre.convertAsync = require('util').promisify(libre.convert);

function promisify(callbackBasedFunction) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            callbackBasedFunction(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

libre.convertAsync = promisify(libre.convert);

async function convertToPDF(fileName) {
    const ext = '.pdf'
    const inputPath = path.join(__dirname, `../assets/file/${fileName}`);
    const outputPath = path.join(__dirname, `../assets/file/${fileName}${ext}`);

    const docxBuf = await fs.readFile(inputPath);

    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

    await fs.writeFile(outputPath, pdfBuf);
    return outputPath;
}

async function convertToPDFString(fileName) {
    const ext = '.pdf'
    const inputPath = path.join(__dirname, `../assets/file/${fileName}`);
    const outputPath = path.join(__dirname, `../assets/file/${fileName}${ext}`);

    const docxBuf = await fs.readFile(inputPath);

    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

    await fs.writeFile(outputPath, pdfBuf);
    return fileName + ext;
}

module.exports = {
    convertToPDF,
    convertToPDFString
};
