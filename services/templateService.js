'use strict';

var templateService = {};

templateService.enhance = function (template, keys, data) {
    var response = JSON.stringify(template);
    for(var i in keys) {
        if (keys.hasOwnProperty(i)) {
            response = response.replaceAll(':'+ i, getPropByString(data, keys[i]));
        }
    }
    return JSON.parse(response);
};

templateService.addMetaData = function (data, metaData) {
    data.meta = metaData;
    return data;
};

function getPropByString(obj, propString) {
    if (!propString)
        return obj;
    var prop, props = propString.split('.');
    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];
        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

module.exports = templateService;