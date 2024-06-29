class CustomError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.explanation = message;
        this.errorCode = errorCode;
    }
}

module.exports = CustomError;
