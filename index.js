"use strict";

module.exports = function (method, url, async, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.responseType = 'blob';

    xhr.onload = function () {
        if (this.status == 200 && this.response.size > 0) {

            var objectURL = URL.createObjectURL(this.response, {
                type: 'application/pdf'
            });
            
            var iframe = $('<iframe />', {
                width: 0,
                height: 0,
                src: objectURL
            });

            iframe.load(function () {
                URL.revokeObjectURL(objectURL);
            });

            iframe.appendTo('body');
        } else {
            onError(this);
        }
    };

    xhr.send();
}