const ErrorDetail = {
    UNAUTHORIZE: {
        message: "You're not authorize",
        statusCode: 401
    },
    UNAUTHORIZE1: {
        message: "You're not authorize 1",
        statusCode: 401
    },
    UNAUTHORIZE2: {
        message: "You're not authorize 2",
        statusCode: 401
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
