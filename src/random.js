var crypto = require('crypto');

module.exports = function(len){
    return crypto.randomBytes((len+1) >> 1).toString('hex').substr(0, len);
};
