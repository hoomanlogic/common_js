/**
 * HoomanLogic I/O Library
 * 2014, HoomanLogic, Geoff Manning
 * Namespace: hl.io
 */
var hl = hl || {};

hl.io = (function (ns) {
    'use strict';

    ns.getImage = function (msg) {

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
    };

    ns.convertFileToDataUrl = function (file, ondone) {
        var reader = new FileReader();
        reader.onloadend = function () {
            ondone(file.name, reader.result);
        };
        reader.readAsDataURL(file);
    };

    ns.saveToDisk = function (fileURL, fileName) {

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
    };

    ns.saveBlobToDisk = function (blobURL, fileName) {
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
    }

    return ns;
}(hl.io || {}));