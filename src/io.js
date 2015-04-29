/**
 * hlio - I/O Helpers
 * 2015, HoomanLogic, Geoff Manning
 */
// CommonJS, AMD, and Global shim
(function (root, factory) {
    'use strict';
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require('crypto-js/aes'));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(['./node_modules/crypto-js/aes.js'], factory);
	}
	else {
		// Global (browser)
		root.hlio = factory(root.CryptoJS.AES);
	}
}(this, function (AES) {
    'use strict';

    return {
        getImage: function (msg) {

            if (typeof msg.dataUrl === 'undefined' || msg.dataUrl === null || msg.dataUrl === '' ||
                typeof msg.fileName === 'undefined' || msg.fileName === null || msg.fileName === '') {
                return '';
            }

            var indexOfExtStart = msg.fileName.lastIndexOf('.');
            var extension = msg.fileName.substring(indexOfExtStart + 1, msg.fileName.length).toLowerCase();

            if (!['jpg', 'png', 'gif', 'jpeg', 'tif', 'tiff'].contains(extension)) {
                return '';
            }

            return '<img src="' + msg.dataUrl + '" alt="Sent Image">';
        },

        convertFileToDataUrl: function (file, ondone) {
            var reader = new FileReader();
            reader.onloadend = function () {
                ondone(file.name, reader.result);
            };
            reader.readAsDataURL(file);
        },

        saveToDisk: function (fileURL, fileName) {

            if (typeof fileURL === 'undefined' || fileURL === null) {
                return;
            }

            // for non-IE
            if (!window.ActiveXObject) {
                var save = document.createElement('a');
                save.href = fileURL;
                save.target = '_blank';
                save.download = fileName || 'unknown';

                var event = document.createEvent('Event');
                event.initEvent('click', true, true);
                save.dispatchEvent(event);
                (window.URL || window.webkitURL).revokeObjectURL(save.href);

                // for IE
            } else if (!!window.ActiveXObject && document.execCommand) {
                var _window = window.open(fileURL, '_blank');
                _window.document.close();
                _window.document.execCommand('SaveAs', true, fileName || fileURL);
                _window.close();
            }
        },

        saveBlobToDisk: function (blobURL, fileName) {
            var reader = new FileReader();
            reader.readAsDataURL(blobURL);
            reader.onload = function (data) {
                var save = document.createElement('a');
                save.href = data.target.result;
                save.target = '_blank';
                save.download = fileName || 'unknown file';

                var event = document.createEvent('Event');
                event.initEvent('click', true, true);
                save.dispatchEvent(event);
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            };
        },

        store: function (namespace, data) { 
            if (data) { 
                return localStorage.setItem(namespace, JSON.stringify(data));
            } 

            var localStore = localStorage.getItem(namespace); 
            return (localStore && JSON.parse(localStore)) || []; 
        },

        saveLocal: function (location, result, secret) {
            var value = JSON.stringify(result);
            var encrypted = AES.encrypt(value, secret);
            $.jStorage.set(location, encrypted.toString() );
        },

        loadLocal: function (location, secret) {
            var encrypted = $.jStorage.get(location);
            try {
                var decrypted = AES.decrypt(encrypted, secret);
                return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
            } catch (ex) {
                return encrypted;
            }
        }
    };
}));