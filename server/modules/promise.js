
const promise  = (context, func, ...params) => {
    return new Promise(resolve => {
        func.call(context, ...params, (...callbackParams) => {
            let returnObject = promiseToAssoc([...callbackParams]);
            resolve(returnObject);
        });
    });
}

const promiseToAssoc = results => {
    let res = {};
    let assoc = ['err', 'res', 'body'];

    for (let i = 0; i < results.length; i++) {
        let field = assoc[i] || `field-${i}`;
        res[field] = results[i];
    }

    return res;
}

module.exports = promise;