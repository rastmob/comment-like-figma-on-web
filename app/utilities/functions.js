const url = require('url')

function getUrlParams(fullUrl) {
    if(!fullUrl || !isValidHttpUrl(fullUrl)) {
        return false;
    }
    return url.parse(fullUrl, true);
}

function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

module.exports = {
    getUrlParams,
}