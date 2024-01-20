const ErrorDetail = {
    UNAUTHORIZE: {
        message: "You're not authorize",
        statusCode: 401
    },
    FILE_IS_REQUIRED: {
        message: "File is required",
        statusCode: 422
    },
    FILENAME_IS_REQUIRED: {
        message: "Filename is required",
        statusCode: 404
    },
};

class CustomError extends Error {
    constructor(errorDetail) {
        const { message = 'Unknown error', statusCode = 500 } = errorDetail || {};

        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (!err) next()
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: err.message,
    });
};

module.exports = {
    ErrorDetail,
    CustomError,
    errorHandler,
};
