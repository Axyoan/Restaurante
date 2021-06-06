class ReqError extends Error {
    constructor(msg, status) {
        super(msg);
        this.status = status;
        this.name = this.constructor.name;
    }
}

module.exports = ReqError;