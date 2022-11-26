const url = require('url')

function getUrlParams(fullUrl) {
    if(!fullUrl) {
        return false;
    }
    return url.parse(fullUrl, true);
}
module.exports = {
    getUrlParams,
}