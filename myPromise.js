class MP {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(executor) {
        this.value = '';
        this.reason = '';
        this.status = MP.PENDING;
        executor(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(value){
        this.value = value;
        this.status = MP.FULFILLED;
    }
    reject(reason){
        this.reason = reason;
        this.status = MP.REJECTED;
    }
}

