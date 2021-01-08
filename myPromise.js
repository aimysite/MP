class MP {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(executor) {
        this.value = '';
        this.status = MP.PENDING;
        this.callback = [];
        try {
            executor( this.resolve.bind( this ), this.reject.bind( this ) )
        }catch ( e ) {
            this.reject(e)
        }
        // return new MP((onResolve, onReject)=>{
        //     this.callback.push({
        //         onResolve,
        //         onReject
        //     })
        // })
    }

    resolve(value) {
        if ( this.status === MP.PENDING ) {
            this.value = value;
            this.status = MP.FULFILLED;
        }
    }

    reject(reason) {
        if ( this.status === MP.PENDING ) {
            this.value = reason;
            this.status = MP.REJECTED;
        }
    }
    then(resolved, rejected){
        // 如果resolve 和 rejected不存在
        if (typeof resolved !== 'function') {
            resolved = () => {}
        }
        if (typeof rejected !== 'function') {
            rejected = () => {}
        }
        // 当前promise为成功则执行 resolved
        if (this.status === MP.FULFILLED) {
            resolved(this.value);
        }
        // 当前promise为rejected则执行 rejected
        if(this.status === MP.REJECTED){
            rejected(this.value)
        }
    }
}

