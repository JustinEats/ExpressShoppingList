class expressError extends Error {
    constructor(message, status){
        super();
        this.message = message || 500
        this.status = status
        // console.error(this.stack)
    }
}

module.exports = expressError