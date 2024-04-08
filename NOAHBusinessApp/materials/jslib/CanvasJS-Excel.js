
/* # Canvas JS Library 1.1.2.15
# Company Owner: Forecasting and Planning Technologies Inc. / Promptus8 Inc.
# Developers : Angelo Carlo Gonzales
Omar B. Credito
# Date Created : November 2020
# Date Modified : February 27 2024 / 03:28 AM - before: 02-15-2024

For  NoahWeb Application and Promptus8 Modules used only. 

Illeggal used are Prohibited
Modification of this Library is Prohibited.
*/



$(function () {
    window.NOAH_SpreadCanvasExcel = { "version": "1.1.2.15" }
    console.log("NOAH_SpreadCanvasExcel: " + window.NOAH_SpreadCanvasExcel);
});

/*CanvasNote jszip.js*/
/*!

JSZip v3.1.3 - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.JSZip = f() } })(function () {
    var define, module, exports; return (function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s })({
        1: [function (require, module, exports) {
            'use strict';
            var utils = require('./utils');
            var support = require('./support');
            // private property
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


            // public method for encoding
            exports.encode = function (input) {
                var output = [];
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0, len = input.length, remainingBytes = len;

                var isArray = utils.getTypeOf(input) !== "string";
                while (i < input.length) {
                    remainingBytes = len - i;

                    if (!isArray) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = i < len ? input.charCodeAt(i++) : 0;
                        chr3 = i < len ? input.charCodeAt(i++) : 0;
                    } else {
                        chr1 = input[i++];
                        chr2 = i < len ? input[i++] : 0;
                        chr3 = i < len ? input[i++] : 0;
                    }

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
                    enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

                    output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

                }

                return output.join("");
            };

            // public method for decoding
            exports.decode = function (input) {
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0, resultIndex = 0;

                var dataUrlPrefix = "data:";

                if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
                    // This is a common error: people give a data url
                    // (data:image/png;base64,iVBOR...) with a {base64: true} and
                    // wonders why things don't work.
                    // We can detect that the string input looks like a data url but we
                    // *can't* be sure it is one: removing everything up to the comma would
                    // be too dangerous.
                    throw new Error("Invalid base64 input, it looks like a data url.");
                }

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                var totalLength = input.length * 3 / 4;
                if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
                    totalLength--;
                }
                if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
                    totalLength--;
                }
                if (totalLength % 1 !== 0) {
                    // totalLength is not an integer, the length does not match a valid
                    // base64 content. That can happen if:
                    // - the input is not a base64 content
                    // - the input is *almost* a base64 content, with a extra chars at the
                    //   beginning or at the end
                    // - the input uses a base64 variant (base64url for example)
                    throw new Error("Invalid base64 input, bad content length.");
                }
                var output;
                if (support.uint8array) {
                    output = new Uint8Array(totalLength | 0);
                } else {
                    output = new Array(totalLength | 0);
                }

                while (i < input.length) {

                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output[resultIndex++] = chr1;

                    if (enc3 !== 64) {
                        output[resultIndex++] = chr2;
                    }
                    if (enc4 !== 64) {
                        output[resultIndex++] = chr3;
                    }

                }

                return output;
            };

        }, { "./support": 30, "./utils": 32 }], 2: [function (require, module, exports) {
            'use strict';

            var external = require("./external");
            var DataWorker = require('./stream/DataWorker');
            var DataLengthProbe = require('./stream/DataLengthProbe');
            var Crc32Probe = require('./stream/Crc32Probe');
            var DataLengthProbe = require('./stream/DataLengthProbe');

            /**
             * Represent a compressed object, with everything needed to decompress it.
             * @constructor
             * @param {number} compressedSize the size of the data compressed.
             * @param {number} uncompressedSize the size of the data after decompression.
             * @param {number} crc32 the crc32 of the decompressed file.
             * @param {object} compression the type of compression, see lib/compressions.js.
             * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
             */
            function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
                this.compressedSize = compressedSize;
                this.uncompressedSize = uncompressedSize;
                this.crc32 = crc32;
                this.compression = compression;
                this.compressedContent = data;
            }

            CompressedObject.prototype = {
                /**
                 * Create a worker to get the uncompressed content.
                 * @return {GenericWorker} the worker.
                 */
                getContentWorker: function () {
                    var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
                    .pipe(this.compression.uncompressWorker())
                    .pipe(new DataLengthProbe("data_length"));

                    var that = this;
                    worker.on("end", function () {
                        if (this.streamInfo['data_length'] !== that.uncompressedSize) {
                            throw new Error("Bug : uncompressed data size mismatch");
                        }
                    });
                    return worker;
                },
                /**
                 * Create a worker to get the compressed content.
                 * @return {GenericWorker} the worker.
                 */
                getCompressedWorker: function () {
                    return new DataWorker(external.Promise.resolve(this.compressedContent))
                    .withStreamInfo("compressedSize", this.compressedSize)
                    .withStreamInfo("uncompressedSize", this.uncompressedSize)
                    .withStreamInfo("crc32", this.crc32)
                    .withStreamInfo("compression", this.compression)
                    ;
                }
            };

            /**
             * Chain the given worker with other workers to compress the content with the
             * given compresion.
             * @param {GenericWorker} uncompressedWorker the worker to pipe.
             * @param {Object} compression the compression object.
             * @param {Object} compressionOptions the options to use when compressing.
             * @return {GenericWorker} the new worker compressing the content.
             */
            CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
                return uncompressedWorker
                .pipe(new Crc32Probe())
                .pipe(new DataLengthProbe("uncompressedSize"))
                .pipe(compression.compressWorker(compressionOptions))
                .pipe(new DataLengthProbe("compressedSize"))
                .withStreamInfo("compression", compression);
            };

            module.exports = CompressedObject;

        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function (require, module, exports) {
            'use strict';

            var GenericWorker = require("./stream/GenericWorker");

            exports.STORE = {
                magic: "\x00\x00",
                compressWorker: function (compressionOptions) {
                    return new GenericWorker("STORE compression");
                },
                uncompressWorker: function () {
                    return new GenericWorker("STORE decompression");
                }
            };
            exports.DEFLATE = require('./flate');

        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function (require, module, exports) {
            'use strict';

            var utils = require('./utils');

            /**
             * The following functions come from pako, from pako/lib/zlib/crc32.js
             * released under the MIT license, see pako https://github.com/nodeca/pako/
             */

            // Use ordinary array, since untyped makes no boost here
            function makeTable() {
                var c, table = [];

                for (var n = 0; n < 256; n++) {
                    c = n;
                    for (var k = 0; k < 8; k++) {
                        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
                    }
                    table[n] = c;
                }

                return table;
            }

            // Create table on load. Just 255 signed longs. Not a problem.
            var crcTable = makeTable();


            function crc32(crc, buf, len, pos) {
                var t = crcTable, end = pos + len;

                crc = crc ^ (-1);

                for (var i = pos; i < end; i++) {
                    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
                }

                return (crc ^ (-1)); // >>> 0;
            }

            // That's all for the pako functions.

            /**
             * Compute the crc32 of a string.
             * This is almost the same as the function crc32, but for strings. Using the
             * same function for the two use cases leads to horrible performances.
             * @param {Number} crc the starting value of the crc.
             * @param {String} str the string to use.
             * @param {Number} len the length of the string.
             * @param {Number} pos the starting position for the crc32 computation.
             * @return {Number} the computed crc32.
             */
            function crc32str(crc, str, len, pos) {
                var t = crcTable, end = pos + len;

                crc = crc ^ (-1);

                for (var i = pos; i < end; i++) {
                    crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
                }

                return (crc ^ (-1)); // >>> 0;
            }

            module.exports = function crc32wrapper(input, crc) {
                if (typeof input === "undefined" || !input.length) {
                    return 0;
                }

                var isArray = utils.getTypeOf(input) !== "string";

                if (isArray) {
                    return crc32(crc | 0, input, input.length, 0);
                } else {
                    return crc32str(crc | 0, input, input.length, 0);
                }
            };
            // vim: set shiftwidth=4 softtabstop=4:

        }, { "./utils": 32 }], 5: [function (require, module, exports) {
            'use strict';
            exports.base64 = false;
            exports.binary = false;
            exports.dir = false;
            exports.createFolders = true;
            exports.date = null;
            exports.compression = null;
            exports.compressionOptions = null;
            exports.comment = null;
            exports.unixPermissions = null;
            exports.dosPermissions = null;

        }, {}], 6: [function (require, module, exports) {
            /* global Promise */
            'use strict';

            // load the global object first:
            // - it should be better integrated in the system (unhandledRejection in node)
            // - the environment may have a custom Promise implementation (see zone.js)
            var ES6Promise = null;
            if (typeof Promise !== "undefined") {
                ES6Promise = Promise;
            } else {
                ES6Promise = require("lie");
            }

            /**
             * Let the user use/change some implementations.
             */
            module.exports = {
                Promise: ES6Promise
            };

        }, { "lie": 58 }], 7: [function (require, module, exports) {
            'use strict';
            var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

            var pako = require("pako");
            var utils = require("./utils");
            var GenericWorker = require("./stream/GenericWorker");

            var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

            exports.magic = "\x08\x00";

            /**
             * Create a worker that uses pako to inflate/deflate.
             * @constructor
             * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
             * @param {Object} options the options to use when (de)compressing.
             */
            function FlateWorker(action, options) {
                GenericWorker.call(this, "FlateWorker/" + action);

                this._pako = new pako[action]({
                    raw: true,
                    level: options.level || -1 // default compression
                });
                // the `meta` object from the last chunk received
                // this allow this worker to pass around metadata
                this.meta = {};

                var self = this;
                this._pako.onData = function (data) {
                    self.push({
                        data: data,
                        meta: self.meta
                    });
                };
            }

            utils.inherits(FlateWorker, GenericWorker);

            /**
             * @see GenericWorker.processChunk
             */
            FlateWorker.prototype.processChunk = function (chunk) {
                this.meta = chunk.meta;
                this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
            };

            /**
             * @see GenericWorker.flush
             */
            FlateWorker.prototype.flush = function () {
                GenericWorker.prototype.flush.call(this);
                this._pako.push([], true);
            };
            /**
             * @see GenericWorker.cleanUp
             */
            FlateWorker.prototype.cleanUp = function () {
                GenericWorker.prototype.cleanUp.call(this);
                this._pako = null;
            };

            exports.compressWorker = function (compressionOptions) {
                return new FlateWorker("Deflate", compressionOptions);
            };
            exports.uncompressWorker = function () {
                return new FlateWorker("Inflate", {});
            };

        }, { "./stream/GenericWorker": 28, "./utils": 32, "pako": 59 }], 8: [function (require, module, exports) {
            'use strict';

            var utils = require('../utils');
            var GenericWorker = require('../stream/GenericWorker');
            var utf8 = require('../utf8');
            var crc32 = require('../crc32');
            var signature = require('../signature');

            /**
             * Transform an integer into a string in hexadecimal.
             * @private
             * @param {number} dec the number to convert.
             * @param {number} bytes the number of bytes to generate.
             * @returns {string} the result.
             */
            var decToHex = function (dec, bytes) {
                var hex = "", i;
                for (i = 0; i < bytes; i++) {
                    hex += String.fromCharCode(dec & 0xff);
                    dec = dec >>> 8;
                }
                return hex;
            };

            /**
             * Generate the UNIX part of the external file attributes.
             * @param {Object} unixPermissions the unix permissions or null.
             * @param {Boolean} isDir true if the entry is a directory, false otherwise.
             * @return {Number} a 32 bit integer.
             *
             * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
             *
             * TTTTsstrwxrwxrwx0000000000ADVSHR
             * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
             *     ^^^_________________________ setuid, setgid, sticky
             *        ^^^^^^^^^________________ permissions
             *                 ^^^^^^^^^^______ not used ?
             *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
             */
            var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

                var result = unixPermissions;
                if (!unixPermissions) {
                    // I can't use octal values in strict mode, hence the hexa.
                    //  040775 => 0x41fd
                    // 0100664 => 0x81b4
                    result = isDir ? 0x41fd : 0x81b4;
                }
                return (result & 0xFFFF) << 16;
            };

            /**
             * Generate the DOS part of the external file attributes.
             * @param {Object} dosPermissions the dos permissions or null.
             * @param {Boolean} isDir true if the entry is a directory, false otherwise.
             * @return {Number} a 32 bit integer.
             *
             * Bit 0     Read-Only
             * Bit 1     Hidden
             * Bit 2     System
             * Bit 3     Volume Label
             * Bit 4     Directory
             * Bit 5     Archive
             */
            var generateDosExternalFileAttr = function (dosPermissions, isDir) {

                // the dir flag is already set for compatibility
                return (dosPermissions || 0) & 0x3F;
            };

            /**
             * Generate the various parts used in the construction of the final zip file.
             * @param {Object} streamInfo the hash with informations about the compressed file.
             * @param {Boolean} streamedContent is the content streamed ?
             * @param {Boolean} streamingEnded is the stream finished ?
             * @param {number} offset the current offset from the start of the zip file.
             * @param {String} platform let's pretend we are this platform (change platform dependents fields)
             * @param {Function} encodeFileName the function to encode the file name / comment.
             * @return {Object} the zip parts.
             */
            var generateZipParts = function (streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
                var file = streamInfo['file'],
                compression = streamInfo['compression'],
                useCustomEncoding = encodeFileName !== utf8.utf8encode,
                encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
                utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
                comment = file.comment,
                encodedComment = utils.transformTo("string", encodeFileName(comment)),
                utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
                useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
                useUTF8ForComment = utfEncodedComment.length !== comment.length,
                dosTime,
                dosDate,
                extraFields = "",
                unicodePathExtraField = "",
                unicodeCommentExtraField = "",
                dir = file.dir,
                date = file.date;


                var dataInfo = {
                    crc32: 0,
                    compressedSize: 0,
                    uncompressedSize: 0
                };

                // if the content is streamed, the sizes/crc32 are only available AFTER
                // the end of the stream.
                if (!streamedContent || streamingEnded) {
                    dataInfo.crc32 = streamInfo['crc32'];
                    dataInfo.compressedSize = streamInfo['compressedSize'];
                    dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
                }

                var bitflag = 0;
                if (streamedContent) {
                    // Bit 3: the sizes/crc32 are set to zero in the local header.
                    // The correct values are put in the data descriptor immediately
                    // following the compressed data.
                    bitflag |= 0x0008;
                }
                if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
                    // Bit 11: Language encoding flag (EFS).
                    bitflag |= 0x0800;
                }


                var extFileAttr = 0;
                var versionMadeBy = 0;
                if (dir) {
                    // dos or unix, we set the dos dir flag
                    extFileAttr |= 0x00010;
                }
                if (platform === "UNIX") {
                    versionMadeBy = 0x031E; // UNIX, version 3.0
                    extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
                } else { // DOS or other, fallback to DOS
                    versionMadeBy = 0x0014; // DOS, version 2.0
                    extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
                }

                // date
                // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
                // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
                // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

                dosTime = date.getUTCHours();
                dosTime = dosTime << 6;
                dosTime = dosTime | date.getUTCMinutes();
                dosTime = dosTime << 5;
                dosTime = dosTime | date.getUTCSeconds() / 2;

                dosDate = date.getUTCFullYear() - 1980;
                dosDate = dosDate << 4;
                dosDate = dosDate | (date.getUTCMonth() + 1);
                dosDate = dosDate << 5;
                dosDate = dosDate | date.getUTCDate();

                if (useUTF8ForFileName) {
                    // set the unicode path extra field. unzip needs at least one extra
                    // field to correctly handle unicode path, so using the path is as good
                    // as any other information. This could improve the situation with
                    // other archive managers too.
                    // This field is usually used without the utf8 flag, with a non
                    // unicode path in the header (winrar, winzip). This helps (a bit)
                    // with the messy Windows' default compressed folders feature but
                    // breaks on p7zip which doesn't seek the unicode path extra field.
                    // So for now, UTF-8 everywhere !
                    unicodePathExtraField =
                        // Version
                        decToHex(1, 1) +
                        // NameCRC32
                        decToHex(crc32(encodedFileName), 4) +
                        // UnicodeName
                        utfEncodedFileName;

                    extraFields +=
                        // Info-ZIP Unicode Path Extra Field
                        "\x75\x70" +
                        // size
                        decToHex(unicodePathExtraField.length, 2) +
                        // content
                        unicodePathExtraField;
                }

                if (useUTF8ForComment) {

                    unicodeCommentExtraField =
                        // Version
                        decToHex(1, 1) +
                        // CommentCRC32
                        decToHex(crc32(encodedComment), 4) +
                        // UnicodeName
                        utfEncodedComment;

                    extraFields +=
                        // Info-ZIP Unicode Path Extra Field
                        "\x75\x63" +
                        // size
                        decToHex(unicodeCommentExtraField.length, 2) +
                        // content
                        unicodeCommentExtraField;
                }

                var header = "";

                // version needed to extract
                header += "\x0A\x00";
                // general purpose bit flag
                header += decToHex(bitflag, 2);
                // compression method
                header += compression.magic;
                // last mod file time
                header += decToHex(dosTime, 2);
                // last mod file date
                header += decToHex(dosDate, 2);
                // crc-32
                header += decToHex(dataInfo.crc32, 4);
                // compressed size
                header += decToHex(dataInfo.compressedSize, 4);
                // uncompressed size
                header += decToHex(dataInfo.uncompressedSize, 4);
                // file name length
                header += decToHex(encodedFileName.length, 2);
                // extra field length
                header += decToHex(extraFields.length, 2);


                var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

                var dirRecord = signature.CENTRAL_FILE_HEADER +
                    // version made by (00: DOS)
                    decToHex(versionMadeBy, 2) +
                    // file header (common to file and central directory)
                    header +
                    // file comment length
                    decToHex(encodedComment.length, 2) +
                    // disk number start
                    "\x00\x00" +
                    // internal file attributes TODO
                    "\x00\x00" +
                    // external file attributes
                    decToHex(extFileAttr, 4) +
                    // relative offset of local header
                    decToHex(offset, 4) +
                    // file name
                    encodedFileName +
                    // extra field
                    extraFields +
                    // file comment
                    encodedComment;

                return {
                    fileRecord: fileRecord,
                    dirRecord: dirRecord
                };
            };

            /**
             * Generate the EOCD record.
             * @param {Number} entriesCount the number of entries in the zip file.
             * @param {Number} centralDirLength the length (in bytes) of the central dir.
             * @param {Number} localDirLength the length (in bytes) of the local dir.
             * @param {String} comment the zip file comment as a binary string.
             * @param {Function} encodeFileName the function to encode the comment.
             * @return {String} the EOCD record.
             */
            var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
                var dirEnd = "";
                var encodedComment = utils.transformTo("string", encodeFileName(comment));

                // end of central dir signature
                dirEnd = signature.CENTRAL_DIRECTORY_END +
                    // number of this disk
                    "\x00\x00" +
                    // number of the disk with the start of the central directory
                    "\x00\x00" +
                    // total number of entries in the central directory on this disk
                    decToHex(entriesCount, 2) +
                    // total number of entries in the central directory
                    decToHex(entriesCount, 2) +
                    // size of the central directory   4 bytes
                    decToHex(centralDirLength, 4) +
                    // offset of start of central directory with respect to the starting disk number
                    decToHex(localDirLength, 4) +
                    // .ZIP file comment length
                    decToHex(encodedComment.length, 2) +
                    // .ZIP file comment
                    encodedComment;

                return dirEnd;
            };

            /**
             * Generate data descriptors for a file entry.
             * @param {Object} streamInfo the hash generated by a worker, containing informations
             * on the file entry.
             * @return {String} the data descriptors.
             */
            var generateDataDescriptors = function (streamInfo) {
                var descriptor = "";
                descriptor = signature.DATA_DESCRIPTOR +
                    // crc-32                          4 bytes
                    decToHex(streamInfo['crc32'], 4) +
                    // compressed size                 4 bytes
                    decToHex(streamInfo['compressedSize'], 4) +
                    // uncompressed size               4 bytes
                    decToHex(streamInfo['uncompressedSize'], 4);

                return descriptor;
            };


            /**
             * A worker to concatenate other workers to create a zip file.
             * @param {Boolean} streamFiles `true` to stream the content of the files,
             * `false` to accumulate it.
             * @param {String} comment the comment to use.
             * @param {String} platform the platform to use, "UNIX" or "DOS".
             * @param {Function} encodeFileName the function to encode file names and comments.
             */
            function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
                GenericWorker.call(this, "ZipFileWorker");
                // The number of bytes written so far. This doesn't count accumulated chunks.
                this.bytesWritten = 0;
                // The comment of the zip file
                this.zipComment = comment;
                // The platform "generating" the zip file.
                this.zipPlatform = platform;
                // the function to encode file names and comments.
                this.encodeFileName = encodeFileName;
                // Should we stream the content of the files ?
                this.streamFiles = streamFiles;
                // If `streamFiles` is false, we will need to accumulate the content of the
                // files to calculate sizes / crc32 (and write them *before* the content).
                // This boolean indicates if we are accumulating chunks (it will change a lot
                // during the lifetime of this worker).
                this.accumulate = false;
                // The buffer receiving chunks when accumulating content.
                this.contentBuffer = [];
                // The list of generated directory records.
                this.dirRecords = [];
                // The offset (in bytes) from the beginning of the zip file for the current source.
                this.currentSourceOffset = 0;
                // The total number of entries in this zip file.
                this.entriesCount = 0;
                // the name of the file currently being added, null when handling the end of the zip file.
                // Used for the emited metadata.
                this.currentFile = null;



                this._sources = [];
            }
            utils.inherits(ZipFileWorker, GenericWorker);

            /**
             * @see GenericWorker.push
             */
            ZipFileWorker.prototype.push = function (chunk) {

                var currentFilePercent = chunk.meta.percent || 0;
                var entriesCount = this.entriesCount;
                var remainingFiles = this._sources.length;

                if (this.accumulate) {
                    this.contentBuffer.push(chunk);
                } else {
                    this.bytesWritten += chunk.data.length;

                    GenericWorker.prototype.push.call(this, {
                        data: chunk.data,
                        meta: {
                            currentFile: this.currentFile,
                            percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
                        }
                    });
                }
            };

            /**
             * The worker started a new source (an other worker).
             * @param {Object} streamInfo the streamInfo object from the new source.
             */
            ZipFileWorker.prototype.openedSource = function (streamInfo) {
                this.currentSourceOffset = this.bytesWritten;
                this.currentFile = streamInfo['file'].name;

                var streamedContent = this.streamFiles && !streamInfo['file'].dir;

                // don't stream folders (because they don't have any content)
                if (streamedContent) {
                    var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                    this.push({
                        data: record.fileRecord,
                        meta: { percent: 0 }
                    });
                } else {
                    // we need to wait for the whole file before pushing anything
                    this.accumulate = true;
                }
            };

            /**
             * The worker finished a source (an other worker).
             * @param {Object} streamInfo the streamInfo object from the finished source.
             */
            ZipFileWorker.prototype.closedSource = function (streamInfo) {
                this.accumulate = false;
                var streamedContent = this.streamFiles && !streamInfo['file'].dir;
                var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

                this.dirRecords.push(record.dirRecord);
                if (streamedContent) {
                    // after the streamed file, we put data descriptors
                    this.push({
                        data: generateDataDescriptors(streamInfo),
                        meta: { percent: 100 }
                    });
                } else {
                    // the content wasn't streamed, we need to push everything now
                    // first the file record, then the content
                    this.push({
                        data: record.fileRecord,
                        meta: { percent: 0 }
                    });
                    while (this.contentBuffer.length) {
                        this.push(this.contentBuffer.shift());
                    }
                }
                this.currentFile = null;
            };

            /**
             * @see GenericWorker.flush
             */
            ZipFileWorker.prototype.flush = function () {

                var localDirLength = this.bytesWritten;
                for (var i = 0; i < this.dirRecords.length; i++) {
                    this.push({
                        data: this.dirRecords[i],
                        meta: { percent: 100 }
                    });
                }
                var centralDirLength = this.bytesWritten - localDirLength;

                var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

                this.push({
                    data: dirEnd,
                    meta: { percent: 100 }
                });
            };

            /**
             * Prepare the next source to be read.
             */
            ZipFileWorker.prototype.prepareNextSource = function () {
                this.previous = this._sources.shift();
                this.openedSource(this.previous.streamInfo);
                if (this.isPaused) {
                    this.previous.pause();
                } else {
                    this.previous.resume();
                }
            };

            /**
             * @see GenericWorker.registerPrevious
             */
            ZipFileWorker.prototype.registerPrevious = function (previous) {
                this._sources.push(previous);
                var self = this;

                previous.on('data', function (chunk) {
                    self.processChunk(chunk);
                });
                previous.on('end', function () {
                    self.closedSource(self.previous.streamInfo);
                    if (self._sources.length) {
                        self.prepareNextSource();
                    } else {
                        self.end();
                    }
                });
                previous.on('error', function (e) {
                    self.error(e);
                });
                return this;
            };

            /**
             * @see GenericWorker.resume
             */
            ZipFileWorker.prototype.resume = function () {
                if (!GenericWorker.prototype.resume.call(this)) {
                    return false;
                }

                if (!this.previous && this._sources.length) {
                    this.prepareNextSource();
                    return true;
                }
                if (!this.previous && !this._sources.length && !this.generatedError) {
                    this.end();
                    return true;
                }
            };

            /**
             * @see GenericWorker.error
             */
            ZipFileWorker.prototype.error = function (e) {
                var sources = this._sources;
                if (!GenericWorker.prototype.error.call(this, e)) {
                    return false;
                }
                for (var i = 0; i < sources.length; i++) {
                    try {
                        sources[i].error(e);
                    } catch (e) {
                        // the `error` exploded, nothing to do
                    }
                }
                return true;
            };

            /**
             * @see GenericWorker.lock
             */
            ZipFileWorker.prototype.lock = function () {
                GenericWorker.prototype.lock.call(this);
                var sources = this._sources;
                for (var i = 0; i < sources.length; i++) {
                    sources[i].lock();
                }
            };

            module.exports = ZipFileWorker;

        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function (require, module, exports) {
            'use strict';

            var compressions = require('../compressions');
            var ZipFileWorker = require('./ZipFileWorker');

            /**
             * Find the compression to use.
             * @param {String} fileCompression the compression defined at the file level, if any.
             * @param {String} zipCompression the compression defined at the load() level.
             * @return {Object} the compression object to use.
             */
            var getCompression = function (fileCompression, zipCompression) {

                var compressionName = fileCompression || zipCompression;
                var compression = compressions[compressionName];
                if (!compression) {
                    throw new Error(compressionName + " is not a valid compression method !");
                }
                return compression;
            };

            /**
             * Create a worker to generate a zip file.
             * @param {JSZip} zip the JSZip instance at the right root level.
             * @param {Object} options to generate the zip file.
             * @param {String} comment the comment to use.
             */
            exports.generateWorker = function (zip, options, comment) {

                var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
                var entriesCount = 0;
                try {

                    zip.forEach(function (relativePath, file) {
                        entriesCount++;
                        var compression = getCompression(file.options.compression, options.compression);
                        var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
                        var dir = file.dir, date = file.date;

                        file._compressWorker(compression, compressionOptions)
                        .withStreamInfo("file", {
                            name: relativePath,
                            dir: dir,
                            date: date,
                            comment: file.comment || "",
                            unixPermissions: file.unixPermissions,
                            dosPermissions: file.dosPermissions
                        })
                        .pipe(zipFileWorker);
                    });
                    zipFileWorker.entriesCount = entriesCount;
                } catch (e) {
                    zipFileWorker.error(e);
                }

                return zipFileWorker;
            };

        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function (require, module, exports) {
            'use strict';

            /**
             * Representation a of zip file in js
             * @constructor
             */
            function JSZip() {
                // if this constructor is used without `new`, it adds `new` before itself:
                if (!(this instanceof JSZip)) {
                    return new JSZip();
                }

                if (arguments.length) {
                    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                }

                // object containing the files :
                // {
                //   "folder/" : {...},
                //   "folder/data.txt" : {...}
                // }
                this.files = {};

                this.comment = null;

                // Where we are in the hierarchy
                this.root = "";
                this.clone = function () {
                    var newObj = new JSZip();
                    for (var i in this) {
                        if (typeof this[i] !== "function") {
                            newObj[i] = this[i];
                        }
                    }
                    return newObj;
                };
            }
            JSZip.prototype = require('./object');
            JSZip.prototype.loadAsync = require('./load');
            JSZip.support = require('./support');
            JSZip.defaults = require('./defaults');

            // TODO find a better way to handle this version,
            // a require('package.json').version doesn't work with webpack, see #327
            JSZip.version = "3.1.3";

            JSZip.loadAsync = function (content, options) {
                return new JSZip().loadAsync(content, options);
            };

            JSZip.external = require("./external");
            module.exports = JSZip;

        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function (require, module, exports) {
            'use strict';
            var utils = require('./utils');
            var external = require("./external");
            var utf8 = require('./utf8');
            var utils = require('./utils');
            var ZipEntries = require('./zipEntries');
            var Crc32Probe = require('./stream/Crc32Probe');
            var nodejsUtils = require("./nodejsUtils");

            /**
             * Check the CRC32 of an entry.
             * @param {ZipEntry} zipEntry the zip entry to check.
             * @return {Promise} the result.
             */
            function checkEntryCRC32(zipEntry) {
                return new external.Promise(function (resolve, reject) {
                    var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
                    worker.on("error", function (e) {
                        reject(e);
                    })
                    .on("end", function () {
                        if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
                            reject(new Error("Corrupted zip : CRC32 mismatch"));
                        } else {
                            resolve();
                        }
                    })
                    .resume();
                });
            }

            module.exports = function (data, options) {
                var zip = this;
                options = utils.extend(options || {}, {
                    base64: false,
                    checkCRC32: false,
                    optimizedBinaryString: false,
                    createFolders: false,
                    decodeFileName: utf8.utf8decode
                });

                if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
                    return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
                }

                return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
                .then(function (data) {
                    var zipEntries = new ZipEntries(options);
                    zipEntries.load(data);
                    return zipEntries;
                }).then(function checkCRC32(zipEntries) {
                    var promises = [external.Promise.resolve(zipEntries)];
                    var files = zipEntries.files;
                    if (options.checkCRC32) {
                        for (var i = 0; i < files.length; i++) {
                            promises.push(checkEntryCRC32(files[i]));
                        }
                    }
                    return external.Promise.all(promises);
                }).then(function addFiles(results) {
                    var zipEntries = results.shift();
                    var files = zipEntries.files;
                    for (var i = 0; i < files.length; i++) {
                        var input = files[i];
                        zip.file(input.fileNameStr, input.decompressed, {
                            binary: true,
                            optimizedBinaryString: true,
                            date: input.date,
                            dir: input.dir,
                            comment: input.fileCommentStr.length ? input.fileCommentStr : null,
                            unixPermissions: input.unixPermissions,
                            dosPermissions: input.dosPermissions,
                            createFolders: options.createFolders
                        });
                    }
                    if (zipEntries.zipComment.length) {
                        zip.comment = zipEntries.zipComment;
                    }

                    return zip;
                });
            };

        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function (require, module, exports) {
            "use strict";

            var utils = require('../utils');
            var GenericWorker = require('../stream/GenericWorker');

            /**
             * A worker that use a nodejs stream as source.
             * @constructor
             * @param {String} filename the name of the file entry for this stream.
             * @param {Readable} stream the nodejs stream.
             */
            function NodejsStreamInputAdapter(filename, stream) {
                GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
                this._upstreamEnded = false;
                this._bindStream(stream);
            }

            utils.inherits(NodejsStreamInputAdapter, GenericWorker);

            /**
             * Prepare the stream and bind the callbacks on it.
             * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
             * @param {Stream} stream the nodejs stream to use.
             */
            NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
                var self = this;
                this._stream = stream;
                stream.pause();
                stream
                .on("data", function (chunk) {
                    self.push({
                        data: chunk,
                        meta: {
                            percent: 0
                        }
                    });
                })
                .on("error", function (e) {
                    if (self.isPaused) {
                        this.generatedError = e;
                    } else {
                        self.error(e);
                    }
                })
                .on("end", function () {
                    if (self.isPaused) {
                        self._upstreamEnded = true;
                    } else {
                        self.end();
                    }
                });
            };
            NodejsStreamInputAdapter.prototype.pause = function () {
                if (!GenericWorker.prototype.pause.call(this)) {
                    return false;
                }
                this._stream.pause();
                return true;
            };
            NodejsStreamInputAdapter.prototype.resume = function () {
                if (!GenericWorker.prototype.resume.call(this)) {
                    return false;
                }

                if (this._upstreamEnded) {
                    this.end();
                } else {
                    this._stream.resume();
                }

                return true;
            };

            module.exports = NodejsStreamInputAdapter;

        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function (require, module, exports) {
            'use strict';

            var Readable = require('readable-stream').Readable;

            var util = require('util');
            util.inherits(NodejsStreamOutputAdapter, Readable);

            /**
            * A nodejs stream using a worker as source.
            * @see the SourceWrapper in http://nodejs.org/api/stream.html
            * @constructor
            * @param {StreamHelper} helper the helper wrapping the worker
            * @param {Object} options the nodejs stream options
            * @param {Function} updateCb the update callback.
            */
            function NodejsStreamOutputAdapter(helper, options, updateCb) {
                Readable.call(this, options);
                this._helper = helper;

                var self = this;
                helper.on("data", function (data, meta) {
                    if (!self.push(data)) {
                        self._helper.pause();
                    }
                    if (updateCb) {
                        updateCb(meta);
                    }
                })
                .on("error", function (e) {
                    self.emit('error', e);
                })
                .on("end", function () {
                    self.push(null);
                });
            }


            NodejsStreamOutputAdapter.prototype._read = function () {
                this._helper.resume();
            };

            module.exports = NodejsStreamOutputAdapter;

        }, { "readable-stream": 16, "util": undefined }], 14: [function (require, module, exports) {
            'use strict';

            module.exports = {
                /**
                 * True if this is running in Nodejs, will be undefined in a browser.
                 * In a browser, browserify won't include this file and the whole module
                 * will be resolved an empty object.
                 */
                isNode: typeof Buffer !== "undefined",
                /**
                 * Create a new nodejs Buffer.
                 * @param {Object} data the data to pass to the constructor.
                 * @param {String} encoding the encoding to use.
                 * @return {Buffer} a new Buffer.
                 */
                newBuffer: function (data, encoding) {
                    return new Buffer(data, encoding);
                },
                /**
                 * Find out if an object is a Buffer.
                 * @param {Object} b the object to test.
                 * @return {Boolean} true if the object is a Buffer, false otherwise.
                 */
                isBuffer: function (b) {
                    return Buffer.isBuffer(b);
                },

                isStream: function (obj) {
                    return obj &&
                        typeof obj.on === "function" &&
                        typeof obj.pause === "function" &&
                        typeof obj.resume === "function";
                }
            };

        }, {}], 15: [function (require, module, exports) {
            'use strict';
            var utf8 = require('./utf8');
            var utils = require('./utils');
            var GenericWorker = require('./stream/GenericWorker');
            var StreamHelper = require('./stream/StreamHelper');
            var defaults = require('./defaults');
            var CompressedObject = require('./compressedObject');
            var ZipObject = require('./zipObject');
            var generate = require("./generate");
            var nodejsUtils = require("./nodejsUtils");
            var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");


            /**
             * Add a file in the current folder.
             * @private
             * @param {string} name the name of the file
             * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
             * @param {Object} originalOptions the options of the file
             * @return {Object} the new file.
             */
            var fileAdd = function (name, data, originalOptions) {
                // be sure sub folders exist
                var dataType = utils.getTypeOf(data),
                    parent;


                /*
                 * Correct options.
                 */

                var o = utils.extend(originalOptions || {}, defaults);
                o.date = o.date || new Date();
                if (o.compression !== null) {
                    o.compression = o.compression.toUpperCase();
                }

                if (typeof o.unixPermissions === "string") {
                    o.unixPermissions = parseInt(o.unixPermissions, 8);
                }

                // UNX_IFDIR  0040000 see zipinfo.c
                if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
                    o.dir = true;
                }
                // Bit 4    Directory
                if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
                    o.dir = true;
                }

                if (o.dir) {
                    name = forceTrailingSlash(name);
                }
                if (o.createFolders && (parent = parentFolder(name))) {
                    folderAdd.call(this, parent, true);
                }

                var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
                if (!originalOptions || typeof originalOptions.binary === "undefined") {
                    o.binary = !isUnicodeString;
                }


                var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

                if (isCompressedEmpty || o.dir || !data || data.length === 0) {
                    o.base64 = false;
                    o.binary = true;
                    data = "";
                    o.compression = "STORE";
                    dataType = "string";
                }

                /*
                 * Convert content to fit.
                 */

                var zipObjectContent = null;
                if (data instanceof CompressedObject || data instanceof GenericWorker) {
                    zipObjectContent = data;
                } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
                    zipObjectContent = new NodejsStreamInputAdapter(name, data);
                } else {
                    zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
                }

                var object = new ZipObject(name, zipObjectContent, o);
                this.files[name] = object;
                /*
                TODO: we can't throw an exception because we have async promises
                (we can have a promise of a Date() for example) but returning a
                promise is useless because file(name, data) returns the JSZip
                object for chaining. Should we break that to allow the user
                to catch the error ?
            
                return external.Promise.resolve(zipObjectContent)
                .then(function () {
                    return object;
                });
                */
            };

            /**
             * Find the parent folder of the path.
             * @private
             * @param {string} path the path to use
             * @return {string} the parent folder, or ""
             */
            var parentFolder = function (path) {
                if (path.slice(-1) === '/') {
                    path = path.substring(0, path.length - 1);
                }
                var lastSlash = path.lastIndexOf('/');
                return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
            };

            /**
             * Returns the path with a slash at the end.
             * @private
             * @param {String} path the path to check.
             * @return {String} the path with a trailing slash.
             */
            var forceTrailingSlash = function (path) {
                // Check the name ends with a /
                if (path.slice(-1) !== "/") {
                    path += "/"; // IE doesn't like substr(-1)
                }
                return path;
            };

            /**
             * Add a (sub) folder in the current folder.
             * @private
             * @param {string} name the folder's name
             * @param {boolean=} [createFolders] If true, automatically create sub
             *  folders. Defaults to false.
             * @return {Object} the new folder.
             */
            var folderAdd = function (name, createFolders) {
                createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

                name = forceTrailingSlash(name);

                // Does this folder already exist?
                if (!this.files[name]) {
                    fileAdd.call(this, name, null, {
                        dir: true,
                        createFolders: createFolders
                    });
                }
                return this.files[name];
            };

            /**
            * Cross-window, cross-Node-context regular expression detection
            * @param  {Object}  object Anything
            * @return {Boolean}        true if the object is a regular expression,
            * false otherwise
            */
            function isRegExp(object) {
                return Object.prototype.toString.call(object) === "[object RegExp]";
            }

            // return the actual prototype of JSZip
            var out = {
                /**
                 * @see loadAsync
                 */
                load: function () {
                    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                },


                /**
                 * Call a callback function for each entry at this folder level.
                 * @param {Function} cb the callback function:
                 * function (relativePath, file) {...}
                 * It takes 2 arguments : the relative path and the file.
                 */
                forEach: function (cb) {
                    var filename, relativePath, file;
                    for (filename in this.files) {
                        if (!this.files.hasOwnProperty(filename)) {
                            continue;
                        }
                        file = this.files[filename];
                        relativePath = filename.slice(this.root.length, filename.length);
                        if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
                            cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
                        }
                    }
                },

                /**
                 * Filter nested files/folders with the specified function.
                 * @param {Function} search the predicate to use :
                 * function (relativePath, file) {...}
                 * It takes 2 arguments : the relative path and the file.
                 * @return {Array} An array of matching elements.
                 */
                filter: function (search) {
                    var result = [];
                    this.forEach(function (relativePath, entry) {
                        if (search(relativePath, entry)) { // the file matches the function
                            result.push(entry);
                        }

                    });
                    return result;
                },

                /**
                 * Add a file to the zip file, or search a file.
                 * @param   {string|RegExp} name The name of the file to add (if data is defined),
                 * the name of the file to find (if no data) or a regex to match files.
                 * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
                 * @param   {Object} o     File options
                 * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
                 * a file (when searching by string) or an array of files (when searching by regex).
                 */
                file: function (name, data, o) {
                    if (arguments.length === 1) {
                        if (isRegExp(name)) {
                            var regexp = name;
                            return this.filter(function (relativePath, file) {
                                return !file.dir && regexp.test(relativePath);
                            });
                        }
                        else { // text
                            var obj = this.files[this.root + name];
                            if (obj && !obj.dir) {
                                return obj;
                            } else {
                                return null;
                            }
                        }
                    }
                    else { // more than one argument : we have data !
                        name = this.root + name;
                        fileAdd.call(this, name, data, o);
                    }
                    return this;
                },

                /**
                 * Add a directory to the zip file, or search.
                 * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
                 * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
                 */
                folder: function (arg) {
                    if (!arg) {
                        return this;
                    }

                    if (isRegExp(arg)) {
                        return this.filter(function (relativePath, file) {
                            return file.dir && arg.test(relativePath);
                        });
                    }

                    // else, name is a new folder
                    var name = this.root + arg;
                    var newFolder = folderAdd.call(this, name);

                    // Allow chaining by returning a new object with this folder as the root
                    var ret = this.clone();
                    ret.root = newFolder.name;
                    return ret;
                },

                /**
                 * Delete a file, or a directory and all sub-files, from the zip
                 * @param {string} name the name of the file to delete
                 * @return {JSZip} this JSZip object
                 */
                remove: function (name) {
                    name = this.root + name;
                    var file = this.files[name];
                    if (!file) {
                        // Look for any folders
                        if (name.slice(-1) !== "/") {
                            name += "/";
                        }
                        file = this.files[name];
                    }

                    if (file && !file.dir) {
                        // file
                        delete this.files[name];
                    } else {
                        // maybe a folder, delete recursively
                        var kids = this.filter(function (relativePath, file) {
                            return file.name.slice(0, name.length) === name;
                        });
                        for (var i = 0; i < kids.length; i++) {
                            delete this.files[kids[i].name];
                        }
                    }

                    return this;
                },

                /**
                 * Generate the complete zip file
                 * @param {Object} options the options to generate the zip file :
                 * - compression, "STORE" by default.
                 * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
                 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
                 */
                generate: function (options) {
                    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                },

                /**
                 * Generate the complete zip file as an internal stream.
                 * @param {Object} options the options to generate the zip file :
                 * - compression, "STORE" by default.
                 * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
                 * @return {StreamHelper} the streamed zip file.
                 */
                generateInternalStream: function (options) {
                    var worker, opts = {};
                    try {
                        opts = utils.extend(options || {}, {
                            streamFiles: false,
                            compression: "STORE",
                            compressionOptions: null,
                            type: "",
                            platform: "DOS",
                            comment: null,
                            mimeType: 'application/zip',
                            encodeFileName: utf8.utf8encode
                        });

                        opts.type = opts.type.toLowerCase();
                        opts.compression = opts.compression.toUpperCase();

                        // "binarystring" is prefered but the internals use "string".
                        if (opts.type === "binarystring") {
                            opts.type = "string";
                        }

                        if (!opts.type) {
                            throw new Error("No output type specified.");
                        }

                        utils.checkSupport(opts.type);

                        // accept nodejs `process.platform`
                        if (
                            opts.platform === 'darwin' ||
                            opts.platform === 'freebsd' ||
                            opts.platform === 'linux' ||
                            opts.platform === 'sunos'
                        ) {
                            opts.platform = "UNIX";
                        }
                        if (opts.platform === 'win32') {
                            opts.platform = "DOS";
                        }

                        var comment = opts.comment || this.comment || "";
                        worker = generate.generateWorker(this, opts, comment);
                    } catch (e) {
                        worker = new GenericWorker("error");
                        worker.error(e);
                    }
                    return new StreamHelper(worker, opts.type || "string", opts.mimeType);
                },
                /**
                 * Generate the complete zip file asynchronously.
                 * @see generateInternalStream
                 */
                generateAsync: function (options, onUpdate) {
                    return this.generateInternalStream(options).accumulate(onUpdate);
                },
                /**
                 * Generate the complete zip file asynchronously.
                 * @see generateInternalStream
                 */
                generateNodeStream: function (options, onUpdate) {
                    options = options || {};
                    if (!options.type) {
                        options.type = "nodebuffer";
                    }
                    return this.generateInternalStream(options).toNodejsStream(onUpdate);
                }
            };
            module.exports = out;

        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function (require, module, exports) {
            /*
             * This file is used by module bundlers (browserify/webpack/etc) when
             * including a stream implementation. We use "readable-stream" to get a
             * consistent behavior between nodejs versions but bundlers often have a shim
             * for "stream". Using this shim greatly improve the compatibility and greatly
             * reduce the final size of the bundle (only one stream implementation, not
             * two).
             */
            module.exports = require("stream");

        }, { "stream": undefined }], 17: [function (require, module, exports) {
            'use strict';
            var DataReader = require('./DataReader');
            var utils = require('../utils');

            function ArrayReader(data) {
                DataReader.call(this, data);
                for (var i = 0; i < this.data.length; i++) {
                    data[i] = data[i] & 0xFF;
                }
            }
            utils.inherits(ArrayReader, DataReader);
            /**
             * @see DataReader.byteAt
             */
            ArrayReader.prototype.byteAt = function (i) {
                return this.data[this.zero + i];
            };
            /**
             * @see DataReader.lastIndexOfSignature
             */
            ArrayReader.prototype.lastIndexOfSignature = function (sig) {
                var sig0 = sig.charCodeAt(0),
                    sig1 = sig.charCodeAt(1),
                    sig2 = sig.charCodeAt(2),
                    sig3 = sig.charCodeAt(3);
                for (var i = this.length - 4; i >= 0; --i) {
                    if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
                        return i - this.zero;
                    }
                }

                return -1;
            };
            /**
             * @see DataReader.readAndCheckSignature
             */
            ArrayReader.prototype.readAndCheckSignature = function (sig) {
                var sig0 = sig.charCodeAt(0),
                    sig1 = sig.charCodeAt(1),
                    sig2 = sig.charCodeAt(2),
                    sig3 = sig.charCodeAt(3),
                    data = this.readData(4);
                return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
            };
            /**
             * @see DataReader.readData
             */
            ArrayReader.prototype.readData = function (size) {
                this.checkOffset(size);
                if (size === 0) {
                    return [];
                }
                var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
                this.index += size;
                return result;
            };
            module.exports = ArrayReader;

        }, { "../utils": 32, "./DataReader": 18 }], 18: [function (require, module, exports) {
            'use strict';
            var utils = require('../utils');

            function DataReader(data) {
                this.data = data; // type : see implementation
                this.length = data.length;
                this.index = 0;
                this.zero = 0;
            }
            DataReader.prototype = {
                /**
                 * Check that the offset will not go too far.
                 * @param {string} offset the additional offset to check.
                 * @throws {Error} an Error if the offset is out of bounds.
                 */
                checkOffset: function (offset) {
                    this.checkIndex(this.index + offset);
                },
                /**
                 * Check that the specifed index will not be too far.
                 * @param {string} newIndex the index to check.
                 * @throws {Error} an Error if the index is out of bounds.
                 */
                checkIndex: function (newIndex) {
                    if (this.length < this.zero + newIndex || newIndex < 0) {
                        throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
                    }
                },
                /**
                 * Change the index.
                 * @param {number} newIndex The new index.
                 * @throws {Error} if the new index is out of the data.
                 */
                setIndex: function (newIndex) {
                    this.checkIndex(newIndex);
                    this.index = newIndex;
                },
                /**
                 * Skip the next n bytes.
                 * @param {number} n the number of bytes to skip.
                 * @throws {Error} if the new index is out of the data.
                 */
                skip: function (n) {
                    this.setIndex(this.index + n);
                },
                /**
                 * Get the byte at the specified index.
                 * @param {number} i the index to use.
                 * @return {number} a byte.
                 */
                byteAt: function (i) {
                    // see implementations
                },
                /**
                 * Get the next number with a given byte size.
                 * @param {number} size the number of bytes to read.
                 * @return {number} the corresponding number.
                 */
                readInt: function (size) {
                    var result = 0,
                        i;
                    this.checkOffset(size);
                    for (i = this.index + size - 1; i >= this.index; i--) {
                        result = (result << 8) + this.byteAt(i);
                    }
                    this.index += size;
                    return result;
                },
                /**
                 * Get the next string with a given byte size.
                 * @param {number} size the number of bytes to read.
                 * @return {string} the corresponding string.
                 */
                readString: function (size) {
                    return utils.transformTo("string", this.readData(size));
                },
                /**
                 * Get raw data without conversion, <size> bytes.
                 * @param {number} size the number of bytes to read.
                 * @return {Object} the raw data, implementation specific.
                 */
                readData: function (size) {
                    // see implementations
                },
                /**
                 * Find the last occurence of a zip signature (4 bytes).
                 * @param {string} sig the signature to find.
                 * @return {number} the index of the last occurence, -1 if not found.
                 */
                lastIndexOfSignature: function (sig) {
                    // see implementations
                },
                /**
                 * Read the signature (4 bytes) at the current position and compare it with sig.
                 * @param {string} sig the expected signature
                 * @return {boolean} true if the signature matches, false otherwise.
                 */
                readAndCheckSignature: function (sig) {
                    // see implementations
                },
                /**
                 * Get the next date.
                 * @return {Date} the date.
                 */
                readDate: function () {
                    var dostime = this.readInt(4);
                    return new Date(Date.UTC(
                    ((dostime >> 25) & 0x7f) + 1980, // year
                    ((dostime >> 21) & 0x0f) - 1, // month
                    (dostime >> 16) & 0x1f, // day
                    (dostime >> 11) & 0x1f, // hour
                    (dostime >> 5) & 0x3f, // minute
                    (dostime & 0x1f) << 1)); // second
                }
            };
            module.exports = DataReader;

        }, { "../utils": 32 }], 19: [function (require, module, exports) {
            'use strict';
            var Uint8ArrayReader = require('./Uint8ArrayReader');
            var utils = require('../utils');

            function NodeBufferReader(data) {
                Uint8ArrayReader.call(this, data);
            }
            utils.inherits(NodeBufferReader, Uint8ArrayReader);

            /**
             * @see DataReader.readData
             */
            NodeBufferReader.prototype.readData = function (size) {
                this.checkOffset(size);
                var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
                this.index += size;
                return result;
            };
            module.exports = NodeBufferReader;

        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function (require, module, exports) {
            'use strict';
            var DataReader = require('./DataReader');
            var utils = require('../utils');

            function StringReader(data) {
                DataReader.call(this, data);
            }
            utils.inherits(StringReader, DataReader);
            /**
             * @see DataReader.byteAt
             */
            StringReader.prototype.byteAt = function (i) {
                return this.data.charCodeAt(this.zero + i);
            };
            /**
             * @see DataReader.lastIndexOfSignature
             */
            StringReader.prototype.lastIndexOfSignature = function (sig) {
                return this.data.lastIndexOf(sig) - this.zero;
            };
            /**
             * @see DataReader.readAndCheckSignature
             */
            StringReader.prototype.readAndCheckSignature = function (sig) {
                var data = this.readData(4);
                return sig === data;
            };
            /**
             * @see DataReader.readData
             */
            StringReader.prototype.readData = function (size) {
                this.checkOffset(size);
                // this will work because the constructor applied the "& 0xff" mask.
                var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
                this.index += size;
                return result;
            };
            module.exports = StringReader;

        }, { "../utils": 32, "./DataReader": 18 }], 21: [function (require, module, exports) {
            'use strict';
            var ArrayReader = require('./ArrayReader');
            var utils = require('../utils');

            function Uint8ArrayReader(data) {
                ArrayReader.call(this, data);
            }
            utils.inherits(Uint8ArrayReader, ArrayReader);
            /**
             * @see DataReader.readData
             */
            Uint8ArrayReader.prototype.readData = function (size) {
                this.checkOffset(size);
                if (size === 0) {
                    // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
                    return new Uint8Array(0);
                }
                var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
                this.index += size;
                return result;
            };
            module.exports = Uint8ArrayReader;

        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function (require, module, exports) {
            'use strict';

            var utils = require('../utils');
            var support = require('../support');
            var ArrayReader = require('./ArrayReader');
            var StringReader = require('./StringReader');
            var NodeBufferReader = require('./NodeBufferReader');
            var Uint8ArrayReader = require('./Uint8ArrayReader');

            /**
             * Create a reader adapted to the data.
             * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
             * @return {DataReader} the data reader.
             */
            module.exports = function (data) {
                var type = utils.getTypeOf(data);
                utils.checkSupport(type);
                if (type === "string" && !support.uint8array) {
                    return new StringReader(data);
                }
                if (type === "nodebuffer") {
                    return new NodeBufferReader(data);
                }
                if (support.uint8array) {
                    return new Uint8ArrayReader(utils.transformTo("uint8array", data));
                }
                return new ArrayReader(utils.transformTo("array", data));
            };

            // vim: set shiftwidth=4 softtabstop=4:

        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function (require, module, exports) {
            'use strict';
            exports.LOCAL_FILE_HEADER = "PK\x03\x04";
            exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
            exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
            exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
            exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
            exports.DATA_DESCRIPTOR = "PK\x07\x08";

        }, {}], 24: [function (require, module, exports) {
            'use strict';

            var GenericWorker = require('./GenericWorker');
            var utils = require('../utils');

            /**
             * A worker which convert chunks to a specified type.
             * @constructor
             * @param {String} destType the destination type.
             */
            function ConvertWorker(destType) {
                GenericWorker.call(this, "ConvertWorker to " + destType);
                this.destType = destType;
            }
            utils.inherits(ConvertWorker, GenericWorker);

            /**
             * @see GenericWorker.processChunk
             */
            ConvertWorker.prototype.processChunk = function (chunk) {
                this.push({
                    data: utils.transformTo(this.destType, chunk.data),
                    meta: chunk.meta
                });
            };
            module.exports = ConvertWorker;

        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function (require, module, exports) {
            'use strict';

            var GenericWorker = require('./GenericWorker');
            var crc32 = require('../crc32');
            var utils = require('../utils');

            /**
             * A worker which calculate the crc32 of the data flowing through.
             * @constructor
             */
            function Crc32Probe() {
                GenericWorker.call(this, "Crc32Probe");
                this.withStreamInfo("crc32", 0);
            }
            utils.inherits(Crc32Probe, GenericWorker);

            /**
             * @see GenericWorker.processChunk
             */
            Crc32Probe.prototype.processChunk = function (chunk) {
                this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
                this.push(chunk);
            };
            module.exports = Crc32Probe;

        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function (require, module, exports) {
            'use strict';

            var utils = require('../utils');
            var GenericWorker = require('./GenericWorker');

            /**
             * A worker which calculate the total length of the data flowing through.
             * @constructor
             * @param {String} propName the name used to expose the length
             */
            function DataLengthProbe(propName) {
                GenericWorker.call(this, "DataLengthProbe for " + propName);
                this.propName = propName;
                this.withStreamInfo(propName, 0);
            }
            utils.inherits(DataLengthProbe, GenericWorker);

            /**
             * @see GenericWorker.processChunk
             */
            DataLengthProbe.prototype.processChunk = function (chunk) {
                if (chunk) {
                    var length = this.streamInfo[this.propName] || 0;
                    this.streamInfo[this.propName] = length + chunk.data.length;
                }
                GenericWorker.prototype.processChunk.call(this, chunk);
            };
            module.exports = DataLengthProbe;


        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function (require, module, exports) {
            'use strict';

            var utils = require('../utils');
            var GenericWorker = require('./GenericWorker');

            // the size of the generated chunks
            // TODO expose this as a public variable
            var DEFAULT_BLOCK_SIZE = 16 * 1024;

            /**
             * A worker that reads a content and emits chunks.
             * @constructor
             * @param {Promise} dataP the promise of the data to split
             */
            function DataWorker(dataP) {
                GenericWorker.call(this, "DataWorker");
                var self = this;
                this.dataIsReady = false;
                this.index = 0;
                this.max = 0;
                this.data = null;
                this.type = "";

                this._tickScheduled = false;

                dataP.then(function (data) {
                    self.dataIsReady = true;
                    self.data = data;
                    self.max = data && data.length || 0;
                    self.type = utils.getTypeOf(data);
                    if (!self.isPaused) {
                        self._tickAndRepeat();
                    }
                }, function (e) {
                    self.error(e);
                });
            }

            utils.inherits(DataWorker, GenericWorker);

            /**
             * @see GenericWorker.cleanUp
             */
            DataWorker.prototype.cleanUp = function () {
                GenericWorker.prototype.cleanUp.call(this);
                this.data = null;
            };

            /**
             * @see GenericWorker.resume
             */
            DataWorker.prototype.resume = function () {
                if (!GenericWorker.prototype.resume.call(this)) {
                    return false;
                }

                if (!this._tickScheduled && this.dataIsReady) {
                    this._tickScheduled = true;
                    utils.delay(this._tickAndRepeat, [], this);
                }
                return true;
            };

            /**
             * Trigger a tick a schedule an other call to this function.
             */
            DataWorker.prototype._tickAndRepeat = function () {
                this._tickScheduled = false;
                if (this.isPaused || this.isFinished) {
                    return;
                }
                this._tick();
                if (!this.isFinished) {
                    utils.delay(this._tickAndRepeat, [], this);
                    this._tickScheduled = true;
                }
            };

            /**
             * Read and push a chunk.
             */
            DataWorker.prototype._tick = function () {

                if (this.isPaused || this.isFinished) {
                    return false;
                }

                var size = DEFAULT_BLOCK_SIZE;
                var data = null, nextIndex = Math.min(this.max, this.index + size);
                if (this.index >= this.max) {
                    // EOF
                    return this.end();
                } else {
                    switch (this.type) {
                        case "string":
                            data = this.data.substring(this.index, nextIndex);
                            break;
                        case "uint8array":
                            data = this.data.subarray(this.index, nextIndex);
                            break;
                        case "array":
                        case "nodebuffer":
                            data = this.data.slice(this.index, nextIndex);
                            break;
                    }
                    this.index = nextIndex;
                    return this.push({
                        data: data,
                        meta: {
                            percent: this.max ? this.index / this.max * 100 : 0
                        }
                    });
                }
            };

            module.exports = DataWorker;

        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function (require, module, exports) {
            'use strict';

            /**
             * A worker that does nothing but passing chunks to the next one. This is like
             * a nodejs stream but with some differences. On the good side :
             * - it works on IE 6-9 without any issue / polyfill
             * - it weights less than the full dependencies bundled with browserify
             * - it forwards errors (no need to declare an error handler EVERYWHERE)
             *
             * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
             * object containing anything (`percent` for example), see each worker for more
             * details. The latter is the real data (String, Uint8Array, etc).
             *
             * @constructor
             * @param {String} name the name of the stream (mainly used for debugging purposes)
             */
            function GenericWorker(name) {
                // the name of the worker
                this.name = name || "default";
                // an object containing metadata about the workers chain
                this.streamInfo = {};
                // an error which happened when the worker was paused
                this.generatedError = null;
                // an object containing metadata to be merged by this worker into the general metadata
                this.extraStreamInfo = {};
                // true if the stream is paused (and should not do anything), false otherwise
                this.isPaused = true;
                // true if the stream is finished (and should not do anything), false otherwise
                this.isFinished = false;
                // true if the stream is locked to prevent further structure updates (pipe), false otherwise
                this.isLocked = false;
                // the event listeners
                this._listeners = {
                    'data': [],
                    'end': [],
                    'error': []
                };
                // the previous worker, if any
                this.previous = null;
            }

            GenericWorker.prototype = {
                /**
                 * Push a chunk to the next workers.
                 * @param {Object} chunk the chunk to push
                 */
                push: function (chunk) {
                    this.emit("data", chunk);
                },
                /**
                 * End the stream.
                 * @return {Boolean} true if this call ended the worker, false otherwise.
                 */
                end: function () {
                    if (this.isFinished) {
                        return false;
                    }

                    this.flush();
                    try {
                        this.emit("end");
                        this.cleanUp();
                        this.isFinished = true;
                    } catch (e) {
                        this.emit("error", e);
                    }
                    return true;
                },
                /**
                 * End the stream with an error.
                 * @param {Error} e the error which caused the premature end.
                 * @return {Boolean} true if this call ended the worker with an error, false otherwise.
                 */
                error: function (e) {
                    if (this.isFinished) {
                        return false;
                    }

                    if (this.isPaused) {
                        this.generatedError = e;
                    } else {
                        this.isFinished = true;

                        this.emit("error", e);

                        // in the workers chain exploded in the middle of the chain,
                        // the error event will go downward but we also need to notify
                        // workers upward that there has been an error.
                        if (this.previous) {
                            this.previous.error(e);
                        }

                        this.cleanUp();
                    }
                    return true;
                },
                /**
                 * Add a callback on an event.
                 * @param {String} name the name of the event (data, end, error)
                 * @param {Function} listener the function to call when the event is triggered
                 * @return {GenericWorker} the current object for chainability
                 */
                on: function (name, listener) {
                    this._listeners[name].push(listener);
                    return this;
                },
                /**
                 * Clean any references when a worker is ending.
                 */
                cleanUp: function () {
                    this.streamInfo = this.generatedError = this.extraStreamInfo = null;
                    this._listeners = [];
                },
                /**
                 * Trigger an event. This will call registered callback with the provided arg.
                 * @param {String} name the name of the event (data, end, error)
                 * @param {Object} arg the argument to call the callback with.
                 */
                emit: function (name, arg) {
                    if (this._listeners[name]) {
                        for (var i = 0; i < this._listeners[name].length; i++) {
                            this._listeners[name][i].call(this, arg);
                        }
                    }
                },
                /**
                 * Chain a worker with an other.
                 * @param {Worker} next the worker receiving events from the current one.
                 * @return {worker} the next worker for chainability
                 */
                pipe: function (next) {
                    return next.registerPrevious(this);
                },
                /**
                 * Same as `pipe` in the other direction.
                 * Using an API with `pipe(next)` is very easy.
                 * Implementing the API with the point of view of the next one registering
                 * a source is easier, see the ZipFileWorker.
                 * @param {Worker} previous the previous worker, sending events to this one
                 * @return {Worker} the current worker for chainability
                 */
                registerPrevious: function (previous) {
                    if (this.isLocked) {
                        throw new Error("The stream '" + this + "' has already been used.");
                    }

                    // sharing the streamInfo...
                    this.streamInfo = previous.streamInfo;
                    // ... and adding our own bits
                    this.mergeStreamInfo();
                    this.previous = previous;
                    var self = this;
                    previous.on('data', function (chunk) {
                        self.processChunk(chunk);
                    });
                    previous.on('end', function () {
                        self.end();
                    });
                    previous.on('error', function (e) {
                        self.error(e);
                    });
                    return this;
                },
                /**
                 * Pause the stream so it doesn't send events anymore.
                 * @return {Boolean} true if this call paused the worker, false otherwise.
                 */
                pause: function () {
                    if (this.isPaused || this.isFinished) {
                        return false;
                    }
                    this.isPaused = true;

                    if (this.previous) {
                        this.previous.pause();
                    }
                    return true;
                },
                /**
                 * Resume a paused stream.
                 * @return {Boolean} true if this call resumed the worker, false otherwise.
                 */
                resume: function () {
                    if (!this.isPaused || this.isFinished) {
                        return false;
                    }
                    this.isPaused = false;

                    // if true, the worker tried to resume but failed
                    var withError = false;
                    if (this.generatedError) {
                        this.error(this.generatedError);
                        withError = true;
                    }
                    if (this.previous) {
                        this.previous.resume();
                    }

                    return !withError;
                },
                /**
                 * Flush any remaining bytes as the stream is ending.
                 */
                flush: function () { },
                /**
                 * Process a chunk. This is usually the method overridden.
                 * @param {Object} chunk the chunk to process.
                 */
                processChunk: function (chunk) {
                    this.push(chunk);
                },
                /**
                 * Add a key/value to be added in the workers chain streamInfo once activated.
                 * @param {String} key the key to use
                 * @param {Object} value the associated value
                 * @return {Worker} the current worker for chainability
                 */
                withStreamInfo: function (key, value) {
                    this.extraStreamInfo[key] = value;
                    this.mergeStreamInfo();
                    return this;
                },
                /**
                 * Merge this worker's streamInfo into the chain's streamInfo.
                 */
                mergeStreamInfo: function () {
                    for (var key in this.extraStreamInfo) {
                        if (!this.extraStreamInfo.hasOwnProperty(key)) {
                            continue;
                        }
                        this.streamInfo[key] = this.extraStreamInfo[key];
                    }
                },

                /**
                 * Lock the stream to prevent further updates on the workers chain.
                 * After calling this method, all calls to pipe will fail.
                 */
                lock: function () {
                    if (this.isLocked) {
                        throw new Error("The stream '" + this + "' has already been used.");
                    }
                    this.isLocked = true;
                    if (this.previous) {
                        this.previous.lock();
                    }
                },

                /**
                 *
                 * Pretty print the workers chain.
                 */
                toString: function () {
                    var me = "Worker " + this.name;
                    if (this.previous) {
                        return this.previous + " -> " + me;
                    } else {
                        return me;
                    }
                }
            };

            module.exports = GenericWorker;

        }, {}], 29: [function (require, module, exports) {
            'use strict';

            var utils = require('../utils');
            var ConvertWorker = require('./ConvertWorker');
            var GenericWorker = require('./GenericWorker');
            var base64 = require('../base64');
            var support = require("../support");
            var external = require("../external");

            var NodejsStreamOutputAdapter = null;
            if (support.nodestream) {
                try {
                    NodejsStreamOutputAdapter = require('../nodejs/NodejsStreamOutputAdapter');
                } catch (e) { }
            }

            /**
             * Apply the final transformation of the data. If the user wants a Blob for
             * example, it's easier to work with an U8intArray and finally do the
             * ArrayBuffer/Blob conversion.
             * @param {String} resultType the name of the final type
             * @param {String} chunkType the type of the data in the given array.
             * @param {Array} dataArray the array containing the data chunks to concatenate
             * @param {String|Uint8Array|Buffer} content the content to transform
             * @param {String} mimeType the mime type of the content, if applicable.
             * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
             */
            function transformZipOutput(resultType, chunkType, dataArray, mimeType) {
                var content = null;
                switch (resultType) {
                    case "blob":
                        return utils.newBlob(dataArray, mimeType);
                    case "base64":
                        content = concat(chunkType, dataArray);
                        return base64.encode(content);
                    default:
                        content = concat(chunkType, dataArray);
                        return utils.transformTo(resultType, content);
                }
            }

            /**
             * Concatenate an array of data of the given type.
             * @param {String} type the type of the data in the given array.
             * @param {Array} dataArray the array containing the data chunks to concatenate
             * @return {String|Uint8Array|Buffer} the concatenated data
             * @throws Error if the asked type is unsupported
             */
            function concat(type, dataArray) {
                var i, index = 0, res = null, totalLength = 0;
                for (i = 0; i < dataArray.length; i++) {
                    totalLength += dataArray[i].length;
                }
                switch (type) {
                    case "string":
                        return dataArray.join("");
                    case "array":
                        return Array.prototype.concat.apply([], dataArray);
                    case "uint8array":
                        res = new Uint8Array(totalLength);
                        for (i = 0; i < dataArray.length; i++) {
                            res.set(dataArray[i], index);
                            index += dataArray[i].length;
                        }
                        return res;
                    case "nodebuffer":
                        return Buffer.concat(dataArray);
                    default:
                        throw new Error("concat : unsupported type '" + type + "'");
                }
            }

            /**
             * Listen a StreamHelper, accumulate its content and concatenate it into a
             * complete block.
             * @param {StreamHelper} helper the helper to use.
             * @param {Function} updateCallback a callback called on each update. Called
             * with one arg :
             * - the metadata linked to the update received.
             * @return Promise the promise for the accumulation.
             */
            function accumulate(helper, updateCallback) {
                return new external.Promise(function (resolve, reject) {
                    var dataArray = [];
                    var chunkType = helper._internalType,
                        resultType = helper._outputType,
                        mimeType = helper._mimeType;
                    helper
                    .on('data', function (data, meta) {
                        dataArray.push(data);
                        if (updateCallback) {
                            updateCallback(meta);
                        }
                    })
                    .on('error', function (err) {
                        dataArray = [];
                        reject(err);
                    })
                    .on('end', function () {
                        try {
                            var result = transformZipOutput(resultType, chunkType, dataArray, mimeType);
                            resolve(result);
                        } catch (e) {
                            reject(e);
                        }
                        dataArray = [];
                    })
                    .resume();
                });
            }

            /**
             * An helper to easily use workers outside of JSZip.
             * @constructor
             * @param {Worker} worker the worker to wrap
             * @param {String} outputType the type of data expected by the use
             * @param {String} mimeType the mime type of the content, if applicable.
             */
            function StreamHelper(worker, outputType, mimeType) {
                var internalType = outputType;
                switch (outputType) {
                    case "blob":
                        internalType = "arraybuffer";
                        break;
                    case "arraybuffer":
                        internalType = "uint8array";
                        break;
                    case "base64":
                        internalType = "string";
                        break;
                }

                try {
                    // the type used internally
                    this._internalType = internalType;
                    // the type used to output results
                    this._outputType = outputType;
                    // the mime type
                    this._mimeType = mimeType;
                    utils.checkSupport(internalType);
                    this._worker = worker.pipe(new ConvertWorker(internalType));
                    // the last workers can be rewired without issues but we need to
                    // prevent any updates on previous workers.
                    worker.lock();
                } catch (e) {
                    this._worker = new GenericWorker("error");
                    this._worker.error(e);
                }
            }

            StreamHelper.prototype = {
                /**
                 * Listen a StreamHelper, accumulate its content and concatenate it into a
                 * complete block.
                 * @param {Function} updateCb the update callback.
                 * @return Promise the promise for the accumulation.
                 */
                accumulate: function (updateCb) {
                    return accumulate(this, updateCb);
                },
                /**
                 * Add a listener on an event triggered on a stream.
                 * @param {String} evt the name of the event
                 * @param {Function} fn the listener
                 * @return {StreamHelper} the current helper.
                 */
                on: function (evt, fn) {
                    var self = this;

                    if (evt === "data") {
                        this._worker.on(evt, function (chunk) {
                            fn.call(self, chunk.data, chunk.meta);
                        });
                    } else {
                        this._worker.on(evt, function () {
                            utils.delay(fn, arguments, self);
                        });
                    }
                    return this;
                },
                /**
                 * Resume the flow of chunks.
                 * @return {StreamHelper} the current helper.
                 */
                resume: function () {
                    utils.delay(this._worker.resume, [], this._worker);
                    return this;
                },
                /**
                 * Pause the flow of chunks.
                 * @return {StreamHelper} the current helper.
                 */
                pause: function () {
                    this._worker.pause();
                    return this;
                },
                /**
                 * Return a nodejs stream for this helper.
                 * @param {Function} updateCb the update callback.
                 * @return {NodejsStreamOutputAdapter} the nodejs stream.
                 */
                toNodejsStream: function (updateCb) {
                    utils.checkSupport("nodestream");
                    if (this._outputType !== "nodebuffer") {
                        // an object stream containing blob/arraybuffer/uint8array/string
                        // is strange and I don't know if it would be useful.
                        // I you find this comment and have a good usecase, please open a
                        // bug report !
                        throw new Error(this._outputType + " is not supported by this method");
                    }

                    return new NodejsStreamOutputAdapter(this, {
                        objectMode: this._outputType !== "nodebuffer"
                    }, updateCb);
                }
            };


            module.exports = StreamHelper;

        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function (require, module, exports) {
            'use strict';

            exports.base64 = true;
            exports.array = true;
            exports.string = true;
            exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
            exports.nodebuffer = typeof Buffer !== "undefined";
            // contains true if JSZip can read/generate Uint8Array, false otherwise.
            exports.uint8array = typeof Uint8Array !== "undefined";

            if (typeof ArrayBuffer === "undefined") {
                exports.blob = false;
            }
            else {
                var buffer = new ArrayBuffer(0);
                try {
                    exports.blob = new Blob([buffer], {
                        type: "application/zip"
                    }).size === 0;
                }
                catch (e) {
                    try {
                        var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                        var builder = new Builder();
                        builder.append(buffer);
                        exports.blob = builder.getBlob('application/zip').size === 0;
                    }
                    catch (e) {
                        exports.blob = false;
                    }
                }
            }

            try {
                exports.nodestream = !!require('readable-stream').Readable;
            } catch (e) {
                exports.nodestream = false;
            }

        }, { "readable-stream": 16 }], 31: [function (require, module, exports) {
            'use strict';

            var utils = require('./utils');
            var support = require('./support');
            var nodejsUtils = require('./nodejsUtils');
            var GenericWorker = require('./stream/GenericWorker');

            /**
             * The following functions come from pako, from pako/lib/utils/strings
             * released under the MIT license, see pako https://github.com/nodeca/pako/
             */

            // Table with utf8 lengths (calculated by first byte of sequence)
            // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
            // because max possible codepoint is 0x10ffff
            var _utf8len = new Array(256);
            for (var i = 0; i < 256; i++) {
                _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
            }
            _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start

            // convert string to array (typed, when possible)
            var string2buf = function (str) {
                var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

                // count binary size
                for (m_pos = 0; m_pos < str_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 0xfc00) === 0xdc00) {
                            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                            m_pos++;
                        }
                    }
                    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
                }

                // allocate buffer
                if (support.uint8array) {
                    buf = new Uint8Array(buf_len);
                } else {
                    buf = new Array(buf_len);
                }

                // convert
                for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 0xfc00) === 0xdc00) {
                            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                            m_pos++;
                        }
                    }
                    if (c < 0x80) {
                        /* one byte */
                        buf[i++] = c;
                    } else if (c < 0x800) {
                        /* two bytes */
                        buf[i++] = 0xC0 | (c >>> 6);
                        buf[i++] = 0x80 | (c & 0x3f);
                    } else if (c < 0x10000) {
                        /* three bytes */
                        buf[i++] = 0xE0 | (c >>> 12);
                        buf[i++] = 0x80 | (c >>> 6 & 0x3f);
                        buf[i++] = 0x80 | (c & 0x3f);
                    } else {
                        /* four bytes */
                        buf[i++] = 0xf0 | (c >>> 18);
                        buf[i++] = 0x80 | (c >>> 12 & 0x3f);
                        buf[i++] = 0x80 | (c >>> 6 & 0x3f);
                        buf[i++] = 0x80 | (c & 0x3f);
                    }
                }

                return buf;
            };

            // Calculate max possible position in utf8 buffer,
            // that will not break sequence. If that's not possible
            // - (very small limits) return max size as is.
            //
            // buf[] - utf8 bytes array
            // max   - length limit (mandatory);
            var utf8border = function (buf, max) {
                var pos;

                max = max || buf.length;
                if (max > buf.length) { max = buf.length; }

                // go back from last position, until start of sequence found
                pos = max - 1;
                while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

                // Fuckup - very small and broken sequence,
                // return max, because we should return something anyway.
                if (pos < 0) { return max; }

                // If we came to start of buffer - that means vuffer is too small,
                // return max too.
                if (pos === 0) { return max; }

                return (pos + _utf8len[buf[pos]] > max) ? pos : max;
            };

            // convert array to string
            var buf2string = function (buf) {
                var str, i, out, c, c_len;
                var len = buf.length;

                // Reserve max possible length (2 words per char)
                // NB: by unknown reasons, Array is significantly faster for
                //     String.fromCharCode.apply than Uint16Array.
                var utf16buf = new Array(len * 2);

                for (out = 0, i = 0; i < len;) {
                    c = buf[i++];
                    // quick process ascii
                    if (c < 0x80) { utf16buf[out++] = c; continue; }

                    c_len = _utf8len[c];
                    // skip 5 & 6 byte codes
                    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

                    // apply mask on first byte
                    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
                    // join the rest
                    while (c_len > 1 && i < len) {
                        c = (c << 6) | (buf[i++] & 0x3f);
                        c_len--;
                    }

                    // terminated by end of string?
                    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

                    if (c < 0x10000) {
                        utf16buf[out++] = c;
                    } else {
                        c -= 0x10000;
                        utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
                        utf16buf[out++] = 0xdc00 | (c & 0x3ff);
                    }
                }

                // shrinkBuf(utf16buf, out)
                if (utf16buf.length !== out) {
                    if (utf16buf.subarray) {
                        utf16buf = utf16buf.subarray(0, out);
                    } else {
                        utf16buf.length = out;
                    }
                }

                // return String.fromCharCode.apply(null, utf16buf);
                return utils.applyFromCharCode(utf16buf);
            };


            // That's all for the pako functions.


            /**
             * Transform a javascript string into an array (typed if possible) of bytes,
             * UTF-8 encoded.
             * @param {String} str the string to encode
             * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
             */
            exports.utf8encode = function utf8encode(str) {
                if (support.nodebuffer) {
                    return nodejsUtils.newBuffer(str, "utf-8");
                }

                return string2buf(str);
            };


            /**
             * Transform a bytes array (or a representation) representing an UTF-8 encoded
             * string into a javascript string.
             * @param {Array|Uint8Array|Buffer} buf the data de decode
             * @return {String} the decoded string.
             */
            exports.utf8decode = function utf8decode(buf) {
                if (support.nodebuffer) {
                    return utils.transformTo("nodebuffer", buf).toString("utf-8");
                }

                buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

                return buf2string(buf);
            };

            /**
             * A worker to decode utf8 encoded binary chunks into string chunks.
             * @constructor
             */
            function Utf8DecodeWorker() {
                GenericWorker.call(this, "utf-8 decode");
                // the last bytes if a chunk didn't end with a complete codepoint.
                this.leftOver = null;
            }
            utils.inherits(Utf8DecodeWorker, GenericWorker);

            /**
             * @see GenericWorker.processChunk
             */
            Utf8DecodeWorker.prototype.processChunk = function (chunk) {

                var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

                // 1st step, re-use what's left of the previous chunk
                if (this.leftOver && this.leftOver.length) {
                    if (support.uint8array) {
                        var previousData = data;
                        data = new Uint8Array(previousData.length + this.leftOver.length);
                        data.set(this.leftOver, 0);
                        data.set(previousData, this.leftOver.length);
                    } else {
                        data = this.leftOver.concat(data);
                    }
                    this.leftOver = null;
                }

                var nextBoundary = utf8border(data);
                var usableData = data;
                if (nextBoundary !== data.length) {
                    if (support.uint8array) {
                        usableData = data.subarray(0, nextBoundary);
                        this.leftOver = data.subarray(nextBoundary, data.length);
                    } else {
                        usableData = data.slice(0, nextBoundary);
                        this.leftOver = data.slice(nextBoundary, data.length);
                    }
                }

                this.push({
                    data: exports.utf8decode(usableData),
                    meta: chunk.meta
                });
            };

            /**
             * @see GenericWorker.flush
             */
            Utf8DecodeWorker.prototype.flush = function () {
                if (this.leftOver && this.leftOver.length) {
                    this.push({
                        data: exports.utf8decode(this.leftOver),
                        meta: {}
                    });
                    this.leftOver = null;
                }
            };
            exports.Utf8DecodeWorker = Utf8DecodeWorker;

            /**
             * A worker to endcode string chunks into utf8 encoded binary chunks.
             * @constructor
             */
            function Utf8EncodeWorker() {
                GenericWorker.call(this, "utf-8 encode");
            }
            utils.inherits(Utf8EncodeWorker, GenericWorker);

            /**
             * @see GenericWorker.processChunk
             */
            Utf8EncodeWorker.prototype.processChunk = function (chunk) {
                this.push({
                    data: exports.utf8encode(chunk.data),
                    meta: chunk.meta
                });
            };
            exports.Utf8EncodeWorker = Utf8EncodeWorker;

        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function (require, module, exports) {
            'use strict';

            var support = require('./support');
            var base64 = require('./base64');
            var nodejsUtils = require('./nodejsUtils');
            var setImmediate = require('core-js/library/fn/set-immediate');
            var external = require("./external");


            /**
             * Convert a string that pass as a "binary string": it should represent a byte
             * array but may have > 255 char codes. Be sure to take only the first byte
             * and returns the byte array.
             * @param {String} str the string to transform.
             * @return {Array|Uint8Array} the string in a binary format.
             */
            function string2binary(str) {
                var result = null;
                if (support.uint8array) {
                    result = new Uint8Array(str.length);
                } else {
                    result = new Array(str.length);
                }
                return stringToArrayLike(str, result);
            }

            /**
             * Create a new blob with the given content and the given type.
             * @param {Array[String|ArrayBuffer]} parts the content to put in the blob. DO NOT use
             * an Uint8Array because the stock browser of android 4 won't accept it (it
             * will be silently converted to a string, "[object Uint8Array]").
             * @param {String} type the mime type of the blob.
             * @return {Blob} the created blob.
             */
            exports.newBlob = function (parts, type) {
                exports.checkSupport("blob");

                try {
                    // Blob constructor
                    return new Blob(parts, {
                        type: type
                    });
                }
                catch (e) {

                    try {
                        // deprecated, browser only, old way
                        var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                        var builder = new Builder();
                        for (var i = 0; i < parts.length; i++) {
                            builder.append(parts[i]);
                        }
                        return builder.getBlob(type);
                    }
                    catch (e) {

                        // well, fuck ?!
                        throw new Error("Bug : can't construct the Blob.");
                    }
                }


            };
            /**
             * The identity function.
             * @param {Object} input the input.
             * @return {Object} the same input.
             */
            function identity(input) {
                return input;
            }

            /**
             * Fill in an array with a string.
             * @param {String} str the string to use.
             * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
             * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
             */
            function stringToArrayLike(str, array) {
                for (var i = 0; i < str.length; ++i) {
                    array[i] = str.charCodeAt(i) & 0xFF;
                }
                return array;
            }

            /**
             * An helper for the function arrayLikeToString.
             * This contains static informations and functions that
             * can be optimized by the browser JIT compiler.
             */
            var arrayToStringHelper = {
                /**
                 * Transform an array of int into a string, chunk by chunk.
                 * See the performances notes on arrayLikeToString.
                 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
                 * @param {String} type the type of the array.
                 * @param {Integer} chunk the chunk size.
                 * @return {String} the resulting string.
                 * @throws Error if the chunk is too big for the stack.
                 */
                stringifyByChunk: function (array, type, chunk) {
                    var result = [], k = 0, len = array.length;
                    // shortcut
                    if (len <= chunk) {
                        return String.fromCharCode.apply(null, array);
                    }
                    while (k < len) {
                        if (type === "array" || type === "nodebuffer") {
                            result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
                        }
                        else {
                            result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
                        }
                        k += chunk;
                    }
                    return result.join("");
                },
                /**
                 * Call String.fromCharCode on every item in the array.
                 * This is the naive implementation, which generate A LOT of intermediate string.
                 * This should be used when everything else fail.
                 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
                 * @return {String} the result.
                 */
                stringifyByChar: function (array) {
                    var resultStr = "";
                    for (var i = 0; i < array.length; i++) {
                        resultStr += String.fromCharCode(array[i]);
                    }
                    return resultStr;
                },
                applyCanBeUsed: {
                    /**
                     * true if the browser accepts to use String.fromCharCode on Uint8Array
                     */
                    uint8array: (function () {
                        try {
                            return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
                        } catch (e) {
                            return false;
                        }
                    })(),
                    /**
                     * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
                     */
                    nodebuffer: (function () {
                        try {
                            return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.newBuffer(1)).length === 1;
                        } catch (e) {
                            return false;
                        }
                    })()
                }
            };

            /**
             * Transform an array-like object to a string.
             * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
             * @return {String} the result.
             */
            function arrayLikeToString(array) {
                // Performances notes :
                // --------------------
                // String.fromCharCode.apply(null, array) is the fastest, see
                // see http://jsperf.com/converting-a-uint8array-to-a-string/2
                // but the stack is limited (and we can get huge arrays !).
                //
                // result += String.fromCharCode(array[i]); generate too many strings !
                //
                // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
                // TODO : we now have workers that split the work. Do we still need that ?
                var chunk = 65536,
                    type = exports.getTypeOf(array),
                    canUseApply = true;
                if (type === "uint8array") {
                    canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
                } else if (type === "nodebuffer") {
                    canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
                }

                if (canUseApply) {
                    while (chunk > 1) {
                        try {
                            return arrayToStringHelper.stringifyByChunk(array, type, chunk);
                        } catch (e) {
                            chunk = Math.floor(chunk / 2);
                        }
                    }
                }

                // no apply or chunk error : slow and painful algorithm
                // default browser on android 4.*
                return arrayToStringHelper.stringifyByChar(array);
            }

            exports.applyFromCharCode = arrayLikeToString;


            /**
             * Copy the data from an array-like to an other array-like.
             * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
             * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
             * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
             */
            function arrayLikeToArrayLike(arrayFrom, arrayTo) {
                for (var i = 0; i < arrayFrom.length; i++) {
                    arrayTo[i] = arrayFrom[i];
                }
                return arrayTo;
            }

            // a matrix containing functions to transform everything into everything.
            var transform = {};

            // string to ?
            transform["string"] = {
                "string": identity,
                "array": function (input) {
                    return stringToArrayLike(input, new Array(input.length));
                },
                "arraybuffer": function (input) {
                    return transform["string"]["uint8array"](input).buffer;
                },
                "uint8array": function (input) {
                    return stringToArrayLike(input, new Uint8Array(input.length));
                },
                "nodebuffer": function (input) {
                    return stringToArrayLike(input, nodejsUtils.newBuffer(input.length));
                }
            };

            // array to ?
            transform["array"] = {
                "string": arrayLikeToString,
                "array": identity,
                "arraybuffer": function (input) {
                    return (new Uint8Array(input)).buffer;
                },
                "uint8array": function (input) {
                    return new Uint8Array(input);
                },
                "nodebuffer": function (input) {
                    return nodejsUtils.newBuffer(input);
                }
            };

            // arraybuffer to ?
            transform["arraybuffer"] = {
                "string": function (input) {
                    return arrayLikeToString(new Uint8Array(input));
                },
                "array": function (input) {
                    return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
                },
                "arraybuffer": identity,
                "uint8array": function (input) {
                    return new Uint8Array(input);
                },
                "nodebuffer": function (input) {
                    return nodejsUtils.newBuffer(new Uint8Array(input));
                }
            };

            // uint8array to ?
            transform["uint8array"] = {
                "string": arrayLikeToString,
                "array": function (input) {
                    return arrayLikeToArrayLike(input, new Array(input.length));
                },
                "arraybuffer": function (input) {
                    // copy the uint8array: DO NOT propagate the original ArrayBuffer, it
                    // can be way larger (the whole zip file for example).
                    var copy = new Uint8Array(input.length);
                    if (input.length) {
                        copy.set(input, 0);
                    }
                    return copy.buffer;
                },
                "uint8array": identity,
                "nodebuffer": function (input) {
                    return nodejsUtils.newBuffer(input);
                }
            };

            // nodebuffer to ?
            transform["nodebuffer"] = {
                "string": arrayLikeToString,
                "array": function (input) {
                    return arrayLikeToArrayLike(input, new Array(input.length));
                },
                "arraybuffer": function (input) {
                    return transform["nodebuffer"]["uint8array"](input).buffer;
                },
                "uint8array": function (input) {
                    return arrayLikeToArrayLike(input, new Uint8Array(input.length));
                },
                "nodebuffer": identity
            };

            /**
             * Transform an input into any type.
             * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
             * If no output type is specified, the unmodified input will be returned.
             * @param {String} outputType the output type.
             * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
             * @throws {Error} an Error if the browser doesn't support the requested output type.
             */
            exports.transformTo = function (outputType, input) {
                if (!input) {
                    // undefined, null, etc
                    // an empty string won't harm.
                    input = "";
                }
                if (!outputType) {
                    return input;
                }
                exports.checkSupport(outputType);
                var inputType = exports.getTypeOf(input);
                var result = transform[inputType][outputType](input);
                return result;
            };

            /**
             * Return the type of the input.
             * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
             * @param {Object} input the input to identify.
             * @return {String} the (lowercase) type of the input.
             */
            exports.getTypeOf = function (input) {
                if (typeof input === "string") {
                    return "string";
                }
                if (Object.prototype.toString.call(input) === "[object Array]") {
                    return "array";
                }
                if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
                    return "nodebuffer";
                }
                if (support.uint8array && input instanceof Uint8Array) {
                    return "uint8array";
                }
                if (support.arraybuffer && input instanceof ArrayBuffer) {
                    return "arraybuffer";
                }
            };

            /**
             * Throw an exception if the type is not supported.
             * @param {String} type the type to check.
             * @throws {Error} an Error if the browser doesn't support the requested type.
             */
            exports.checkSupport = function (type) {
                var supported = support[type.toLowerCase()];
                if (!supported) {
                    throw new Error(type + " is not supported by this platform");
                }
            };

            exports.MAX_VALUE_16BITS = 65535;
            exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

            /**
             * Prettify a string read as binary.
             * @param {string} str the string to prettify.
             * @return {string} a pretty string.
             */
            exports.pretty = function (str) {
                var res = '',
                    code, i;
                for (i = 0; i < (str || "").length; i++) {
                    code = str.charCodeAt(i);
                    res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
                }
                return res;
            };

            /**
             * Defer the call of a function.
             * @param {Function} callback the function to call asynchronously.
             * @param {Array} args the arguments to give to the callback.
             */
            exports.delay = function (callback, args, self) {
                setImmediate(function () {
                    callback.apply(self || null, args || []);
                });
            };

            /**
             * Extends a prototype with an other, without calling a constructor with
             * side effects. Inspired by nodejs' `utils.inherits`
             * @param {Function} ctor the constructor to augment
             * @param {Function} superCtor the parent constructor to use
             */
            exports.inherits = function (ctor, superCtor) {
                var Obj = function () { };
                Obj.prototype = superCtor.prototype;
                ctor.prototype = new Obj();
            };

            /**
             * Merge the objects passed as parameters into a new one.
             * @private
             * @param {...Object} var_args All objects to merge.
             * @return {Object} a new object with the data of the others.
             */
            exports.extend = function () {
                var result = {}, i, attr;
                for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
                    for (attr in arguments[i]) {
                        if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                            result[attr] = arguments[i][attr];
                        }
                    }
                }
                return result;
            };

            /**
             * Transform arbitrary content into a Promise.
             * @param {String} name a name for the content being processed.
             * @param {Object} inputData the content to process.
             * @param {Boolean} isBinary true if the content is not an unicode string
             * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
             * @param {Boolean} isBase64 true if the string content is encoded with base64.
             * @return {Promise} a promise in a format usable by JSZip.
             */
            exports.prepareContent = function (name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

                // if inputData is already a promise, this flatten it.
                var promise = external.Promise.resolve(inputData).then(function (data) {


                    var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

                    if (isBlob && typeof FileReader !== "undefined") {
                        return new external.Promise(function (resolve, reject) {
                            var reader = new FileReader();

                            reader.onload = function (e) {
                                resolve(e.target.result);
                            };
                            reader.onerror = function (e) {
                                reject(e.target.error);
                            };
                            reader.readAsArrayBuffer(data);
                        });
                    } else {
                        return data;
                    }
                });

                return promise.then(function (data) {
                    var dataType = exports.getTypeOf(data);

                    if (!dataType) {
                        return external.Promise.reject(
                            new Error("The data of '" + name + "' is in an unsupported format !")
                        );
                    }
                    // special case : it's way easier to work with Uint8Array than with ArrayBuffer
                    if (dataType === "arraybuffer") {
                        data = exports.transformTo("uint8array", data);
                    } else if (dataType === "string") {
                        if (isBase64) {
                            data = base64.decode(data);
                        }
                        else if (isBinary) {
                            // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
                            if (isOptimizedBinaryString !== true) {
                                // this is a string, not in a base64 format.
                                // Be sure that this is a correct "binary string"
                                data = string2binary(data);
                            }
                        }
                    }
                    return data;
                });
            };

        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, "core-js/library/fn/set-immediate": 36 }], 33: [function (require, module, exports) {
            'use strict';
            var readerFor = require('./reader/readerFor');
            var utils = require('./utils');
            var sig = require('./signature');
            var ZipEntry = require('./zipEntry');
            var utf8 = require('./utf8');
            var support = require('./support');
            //  class ZipEntries {{{
            /**
             * All the entries in the zip file.
             * @constructor
             * @param {Object} loadOptions Options for loading the stream.
             */
            function ZipEntries(loadOptions) {
                this.files = [];
                this.loadOptions = loadOptions;
            }
            ZipEntries.prototype = {
                /**
                 * Check that the reader is on the speficied signature.
                 * @param {string} expectedSignature the expected signature.
                 * @throws {Error} if it is an other signature.
                 */
                checkSignature: function (expectedSignature) {
                    if (!this.reader.readAndCheckSignature(expectedSignature)) {
                        this.reader.index -= 4;
                        var signature = this.reader.readString(4);
                        throw new Error("Corrupted zip or bug : unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
                    }
                },
                /**
                 * Check if the given signature is at the given index.
                 * @param {number} askedIndex the index to check.
                 * @param {string} expectedSignature the signature to expect.
                 * @return {boolean} true if the signature is here, false otherwise.
                 */
                isSignature: function (askedIndex, expectedSignature) {
                    var currentIndex = this.reader.index;
                    this.reader.setIndex(askedIndex);
                    var signature = this.reader.readString(4);
                    var result = signature === expectedSignature;
                    this.reader.setIndex(currentIndex);
                    return result;
                },
                /**
                 * Read the end of the central directory.
                 */
                readBlockEndOfCentral: function () {
                    this.diskNumber = this.reader.readInt(2);
                    this.diskWithCentralDirStart = this.reader.readInt(2);
                    this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
                    this.centralDirRecords = this.reader.readInt(2);
                    this.centralDirSize = this.reader.readInt(4);
                    this.centralDirOffset = this.reader.readInt(4);

                    this.zipCommentLength = this.reader.readInt(2);
                    // warning : the encoding depends of the system locale
                    // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
                    // On a windows machine, this field is encoded with the localized windows code page.
                    var zipComment = this.reader.readData(this.zipCommentLength);
                    var decodeParamType = support.uint8array ? "uint8array" : "array";
                    // To get consistent behavior with the generation part, we will assume that
                    // this is utf8 encoded unless specified otherwise.
                    var decodeContent = utils.transformTo(decodeParamType, zipComment);
                    this.zipComment = this.loadOptions.decodeFileName(decodeContent);
                },
                /**
                 * Read the end of the Zip 64 central directory.
                 * Not merged with the method readEndOfCentral :
                 * The end of central can coexist with its Zip64 brother,
                 * I don't want to read the wrong number of bytes !
                 */
                readBlockZip64EndOfCentral: function () {
                    this.zip64EndOfCentralSize = this.reader.readInt(8);
                    this.reader.skip(4);
                    // this.versionMadeBy = this.reader.readString(2);
                    // this.versionNeeded = this.reader.readInt(2);
                    this.diskNumber = this.reader.readInt(4);
                    this.diskWithCentralDirStart = this.reader.readInt(4);
                    this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
                    this.centralDirRecords = this.reader.readInt(8);
                    this.centralDirSize = this.reader.readInt(8);
                    this.centralDirOffset = this.reader.readInt(8);

                    this.zip64ExtensibleData = {};
                    var extraDataSize = this.zip64EndOfCentralSize - 44,
                        index = 0,
                        extraFieldId,
                        extraFieldLength,
                        extraFieldValue;
                    while (index < extraDataSize) {
                        extraFieldId = this.reader.readInt(2);
                        extraFieldLength = this.reader.readInt(4);
                        extraFieldValue = this.reader.readData(extraFieldLength);
                        this.zip64ExtensibleData[extraFieldId] = {
                            id: extraFieldId,
                            length: extraFieldLength,
                            value: extraFieldValue
                        };
                    }
                },
                /**
                 * Read the end of the Zip 64 central directory locator.
                 */
                readBlockZip64EndOfCentralLocator: function () {
                    this.diskWithZip64CentralDirStart = this.reader.readInt(4);
                    this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
                    this.disksCount = this.reader.readInt(4);
                    if (this.disksCount > 1) {
                        throw new Error("Multi-volumes zip are not supported");
                    }
                },
                /**
                 * Read the local files, based on the offset read in the central part.
                 */
                readLocalFiles: function () {
                    var i, file;
                    for (i = 0; i < this.files.length; i++) {
                        file = this.files[i];
                        this.reader.setIndex(file.localHeaderOffset);
                        this.checkSignature(sig.LOCAL_FILE_HEADER);
                        file.readLocalPart(this.reader);
                        file.handleUTF8();
                        file.processAttributes();
                    }
                },
                /**
                 * Read the central directory.
                 */
                readCentralDir: function () {
                    var file;

                    this.reader.setIndex(this.centralDirOffset);
                    while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
                        file = new ZipEntry({
                            zip64: this.zip64
                        }, this.loadOptions);
                        file.readCentralPart(this.reader);
                        this.files.push(file);
                    }

                    if (this.centralDirRecords !== this.files.length) {
                        if (this.centralDirRecords !== 0 && this.files.length === 0) {
                            // We expected some records but couldn't find ANY.
                            // This is really suspicious, as if something went wrong.
                            throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
                        } else {
                            // We found some records but not all.
                            // Something is wrong but we got something for the user: no error here.
                            // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
                        }
                    }
                },
                /**
                 * Read the end of central directory.
                 */
                readEndOfCentral: function () {
                    var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
                    if (offset < 0) {
                        // Check if the content is a truncated zip or complete garbage.
                        // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
                        // extractible zip for example) but it can give a good hint.
                        // If an ajax request was used without responseType, we will also
                        // get unreadable data.
                        var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

                        if (isGarbage) {
                            throw new Error("Can't find end of central directory : is this a zip file ? " +
                                            "If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html");
                        } else {
                            throw new Error("Corrupted zip : can't find end of central directory");
                        }

                    }
                    this.reader.setIndex(offset);
                    var endOfCentralDirOffset = offset;
                    this.checkSignature(sig.CENTRAL_DIRECTORY_END);
                    this.readBlockEndOfCentral();


                    /* extract from the zip spec :
                        4)  If one of the fields in the end of central directory
                            record is too small to hold required data, the field
                            should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                            ZIP64 format record should be created.
                        5)  The end of central directory record and the
                            Zip64 end of central directory locator record must
                            reside on the same disk when splitting or spanning
                            an archive.
                     */
                    if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
                        this.zip64 = true;

                        /*
                        Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
                        the zip file can fit into a 32bits integer. This cannot be solved : Javascript represents
                        all numbers as 64-bit double precision IEEE 754 floating point numbers.
                        So, we have 53bits for integers and bitwise operations treat everything as 32bits.
                        see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
                        and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
                        */

                        // should look for a zip64 EOCD locator
                        offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
                        if (offset < 0) {
                            throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
                        }
                        this.reader.setIndex(offset);
                        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
                        this.readBlockZip64EndOfCentralLocator();

                        // now the zip64 EOCD record
                        if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                            // console.warn("ZIP64 end of central directory not where expected.");
                            this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                            if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                                throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");
                            }
                        }
                        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
                        this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                        this.readBlockZip64EndOfCentral();
                    }

                    var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
                    if (this.zip64) {
                        expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
                        expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
                    }

                    var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

                    if (extraBytes > 0) {
                        // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
                        if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
                            // The offsets seem wrong, but we have something at the specified offset.
                            // So… we keep it.
                        } else {
                            // the offset is wrong, update the "zero" of the reader
                            // this happens if data has been prepended (crx files for example)
                            this.reader.zero = extraBytes;
                        }
                    } else if (extraBytes < 0) {
                        throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
                    }
                },
                prepareReader: function (data) {
                    this.reader = readerFor(data);
                },
                /**
                 * Read a zip file and create ZipEntries.
                 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
                 */
                load: function (data) {
                    this.prepareReader(data);
                    this.readEndOfCentral();
                    this.readCentralDir();
                    this.readLocalFiles();
                }
            };
            // }}} end of ZipEntries
            module.exports = ZipEntries;

        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utf8": 31, "./utils": 32, "./zipEntry": 34 }], 34: [function (require, module, exports) {
            'use strict';
            var readerFor = require('./reader/readerFor');
            var utils = require('./utils');
            var CompressedObject = require('./compressedObject');
            var crc32fn = require('./crc32');
            var utf8 = require('./utf8');
            var compressions = require('./compressions');
            var support = require('./support');

            var MADE_BY_DOS = 0x00;
            var MADE_BY_UNIX = 0x03;

            /**
             * Find a compression registered in JSZip.
             * @param {string} compressionMethod the method magic to find.
             * @return {Object|null} the JSZip compression object, null if none found.
             */
            var findCompression = function (compressionMethod) {
                for (var method in compressions) {
                    if (!compressions.hasOwnProperty(method)) {
                        continue;
                    }
                    if (compressions[method].magic === compressionMethod) {
                        return compressions[method];
                    }
                }
                return null;
            };

            // class ZipEntry {{{
            /**
             * An entry in the zip file.
             * @constructor
             * @param {Object} options Options of the current file.
             * @param {Object} loadOptions Options for loading the stream.
             */
            function ZipEntry(options, loadOptions) {
                this.options = options;
                this.loadOptions = loadOptions;
            }
            ZipEntry.prototype = {
                /**
                 * say if the file is encrypted.
                 * @return {boolean} true if the file is encrypted, false otherwise.
                 */
                isEncrypted: function () {
                    // bit 1 is set
                    return (this.bitFlag & 0x0001) === 0x0001;
                },
                /**
                 * say if the file has utf-8 filename/comment.
                 * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
                 */
                useUTF8: function () {
                    // bit 11 is set
                    return (this.bitFlag & 0x0800) === 0x0800;
                },
                /**
                 * Read the local part of a zip file and add the info in this object.
                 * @param {DataReader} reader the reader to use.
                 */
                readLocalPart: function (reader) {
                    var compression, localExtraFieldsLength;

                    // we already know everything from the central dir !
                    // If the central dir data are false, we are doomed.
                    // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
                    // The less data we get here, the more reliable this should be.
                    // Let's skip the whole header and dash to the data !
                    reader.skip(22);
                    // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
                    // Strangely, the filename here is OK.
                    // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
                    // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
                    // Search "unzip mismatching "local" filename continuing with "central" filename version" on
                    // the internet.
                    //
                    // I think I see the logic here : the central directory is used to display
                    // content and the local directory is used to extract the files. Mixing / and \
                    // may be used to display \ to windows users and use / when extracting the files.
                    // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
                    this.fileNameLength = reader.readInt(2);
                    localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
                    // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
                    this.fileName = reader.readData(this.fileNameLength);
                    reader.skip(localExtraFieldsLength);

                    if (this.compressedSize === -1 || this.uncompressedSize === -1) {
                        throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
                    }

                    compression = findCompression(this.compressionMethod);
                    if (compression === null) { // no compression found
                        throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
                    }
                    this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
                },

                /**
                 * Read the central part of a zip file and add the info in this object.
                 * @param {DataReader} reader the reader to use.
                 */
                readCentralPart: function (reader) {
                    this.versionMadeBy = reader.readInt(2);
                    reader.skip(2);
                    // this.versionNeeded = reader.readInt(2);
                    this.bitFlag = reader.readInt(2);
                    this.compressionMethod = reader.readString(2);
                    this.date = reader.readDate();
                    this.crc32 = reader.readInt(4);
                    this.compressedSize = reader.readInt(4);
                    this.uncompressedSize = reader.readInt(4);
                    var fileNameLength = reader.readInt(2);
                    this.extraFieldsLength = reader.readInt(2);
                    this.fileCommentLength = reader.readInt(2);
                    this.diskNumberStart = reader.readInt(2);
                    this.internalFileAttributes = reader.readInt(2);
                    this.externalFileAttributes = reader.readInt(4);
                    this.localHeaderOffset = reader.readInt(4);

                    if (this.isEncrypted()) {
                        throw new Error("Encrypted zip are not supported");
                    }

                    // will be read in the local part, see the comments there
                    reader.skip(fileNameLength);
                    this.readExtraFields(reader);
                    this.parseZIP64ExtraField(reader);
                    this.fileComment = reader.readData(this.fileCommentLength);
                },

                /**
                 * Parse the external file attributes and get the unix/dos permissions.
                 */
                processAttributes: function () {
                    this.unixPermissions = null;
                    this.dosPermissions = null;
                    var madeBy = this.versionMadeBy >> 8;

                    // Check if we have the DOS directory flag set.
                    // We look for it in the DOS and UNIX permissions
                    // but some unknown platform could set it as a compatibility flag.
                    this.dir = this.externalFileAttributes & 0x0010 ? true : false;

                    if (madeBy === MADE_BY_DOS) {
                        // first 6 bits (0 to 5)
                        this.dosPermissions = this.externalFileAttributes & 0x3F;
                    }

                    if (madeBy === MADE_BY_UNIX) {
                        this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
                        // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
                    }

                    // fail safe : if the name ends with a / it probably means a folder
                    if (!this.dir && this.fileNameStr.slice(-1) === '/') {
                        this.dir = true;
                    }
                },

                /**
                 * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
                 * @param {DataReader} reader the reader to use.
                 */
                parseZIP64ExtraField: function (reader) {

                    if (!this.extraFields[0x0001]) {
                        return;
                    }

                    // should be something, preparing the extra reader
                    var extraReader = readerFor(this.extraFields[0x0001].value);

                    // I really hope that these 64bits integer can fit in 32 bits integer, because js
                    // won't let us have more.
                    if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
                        this.uncompressedSize = extraReader.readInt(8);
                    }
                    if (this.compressedSize === utils.MAX_VALUE_32BITS) {
                        this.compressedSize = extraReader.readInt(8);
                    }
                    if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
                        this.localHeaderOffset = extraReader.readInt(8);
                    }
                    if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
                        this.diskNumberStart = extraReader.readInt(4);
                    }
                },
                /**
                 * Read the central part of a zip file and add the info in this object.
                 * @param {DataReader} reader the reader to use.
                 */
                readExtraFields: function (reader) {
                    var end = reader.index + this.extraFieldsLength,
                        extraFieldId,
                        extraFieldLength,
                        extraFieldValue;

                    if (!this.extraFields) {
                        this.extraFields = {};
                    }

                    while (reader.index < end) {
                        extraFieldId = reader.readInt(2);
                        extraFieldLength = reader.readInt(2);
                        extraFieldValue = reader.readData(extraFieldLength);

                        this.extraFields[extraFieldId] = {
                            id: extraFieldId,
                            length: extraFieldLength,
                            value: extraFieldValue
                        };
                    }
                },
                /**
                 * Apply an UTF8 transformation if needed.
                 */
                handleUTF8: function () {
                    var decodeParamType = support.uint8array ? "uint8array" : "array";
                    if (this.useUTF8()) {
                        this.fileNameStr = utf8.utf8decode(this.fileName);
                        this.fileCommentStr = utf8.utf8decode(this.fileComment);
                    } else {
                        var upath = this.findExtraFieldUnicodePath();
                        if (upath !== null) {
                            this.fileNameStr = upath;
                        } else {
                            // ASCII text or unsupported code page
                            var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
                            this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
                        }

                        var ucomment = this.findExtraFieldUnicodeComment();
                        if (ucomment !== null) {
                            this.fileCommentStr = ucomment;
                        } else {
                            // ASCII text or unsupported code page
                            var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
                            this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
                        }
                    }
                },

                /**
                 * Find the unicode path declared in the extra field, if any.
                 * @return {String} the unicode path, null otherwise.
                 */
                findExtraFieldUnicodePath: function () {
                    var upathField = this.extraFields[0x7075];
                    if (upathField) {
                        var extraReader = readerFor(upathField.value);

                        // wrong version
                        if (extraReader.readInt(1) !== 1) {
                            return null;
                        }

                        // the crc of the filename changed, this field is out of date.
                        if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
                            return null;
                        }

                        return utf8.utf8decode(extraReader.readData(upathField.length - 5));
                    }
                    return null;
                },

                /**
                 * Find the unicode comment declared in the extra field, if any.
                 * @return {String} the unicode comment, null otherwise.
                 */
                findExtraFieldUnicodeComment: function () {
                    var ucommentField = this.extraFields[0x6375];
                    if (ucommentField) {
                        var extraReader = readerFor(ucommentField.value);

                        // wrong version
                        if (extraReader.readInt(1) !== 1) {
                            return null;
                        }

                        // the crc of the comment changed, this field is out of date.
                        if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
                            return null;
                        }

                        return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
                    }
                    return null;
                }
            };
            module.exports = ZipEntry;

        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function (require, module, exports) {
            'use strict';

            var StreamHelper = require('./stream/StreamHelper');
            var DataWorker = require('./stream/DataWorker');
            var utf8 = require('./utf8');
            var CompressedObject = require('./compressedObject');
            var GenericWorker = require('./stream/GenericWorker');

            /**
             * A simple object representing a file in the zip file.
             * @constructor
             * @param {string} name the name of the file
             * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
             * @param {Object} options the options of the file
             */
            var ZipObject = function (name, data, options) {
                this.name = name;
                this.dir = options.dir;
                this.date = options.date;
                this.comment = options.comment;
                this.unixPermissions = options.unixPermissions;
                this.dosPermissions = options.dosPermissions;

                this._data = data;
                this._dataBinary = options.binary;
                // keep only the compression
                this.options = {
                    compression: options.compression,
                    compressionOptions: options.compressionOptions
                };
            };

            ZipObject.prototype = {
                /**
                 * Create an internal stream for the content of this object.
                 * @param {String} type the type of each chunk.
                 * @return StreamHelper the stream.
                 */
                internalStream: function (type) {
                    var outputType = type.toLowerCase();
                    var askUnicodeString = outputType === "string" || outputType === "text";
                    if (outputType === "binarystring" || outputType === "text") {
                        outputType = "string";
                    }
                    var result = this._decompressWorker();

                    var isUnicodeString = !this._dataBinary;

                    if (isUnicodeString && !askUnicodeString) {
                        result = result.pipe(new utf8.Utf8EncodeWorker());
                    }
                    if (!isUnicodeString && askUnicodeString) {
                        result = result.pipe(new utf8.Utf8DecodeWorker());
                    }

                    return new StreamHelper(result, outputType, "");
                },

                /**
                 * Prepare the content in the asked type.
                 * @param {String} type the type of the result.
                 * @param {Function} onUpdate a function to call on each internal update.
                 * @return Promise the promise of the result.
                 */
                async: function (type, onUpdate) {
                    return this.internalStream(type).accumulate(onUpdate);
                },

                /**
                 * Prepare the content as a nodejs stream.
                 * @param {String} type the type of each chunk.
                 * @param {Function} onUpdate a function to call on each internal update.
                 * @return Stream the stream.
                 */
                nodeStream: function (type, onUpdate) {
                    return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
                },

                /**
                 * Return a worker for the compressed content.
                 * @private
                 * @param {Object} compression the compression object to use.
                 * @param {Object} compressionOptions the options to use when compressing.
                 * @return Worker the worker.
                 */
                _compressWorker: function (compression, compressionOptions) {
                    if (
                        this._data instanceof CompressedObject &&
                        this._data.compression.magic === compression.magic
                    ) {
                        return this._data.getCompressedWorker();
                    } else {
                        var result = this._decompressWorker();
                        if (!this._dataBinary) {
                            result = result.pipe(new utf8.Utf8EncodeWorker());
                        }
                        return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
                    }
                },
                /**
                 * Return a worker for the decompressed content.
                 * @private
                 * @return Worker the worker.
                 */
                _decompressWorker: function () {
                    if (this._data instanceof CompressedObject) {
                        return this._data.getContentWorker();
                    } else if (this._data instanceof GenericWorker) {
                        return this._data;
                    } else {
                        return new DataWorker(this._data);
                    }
                }
            };

            var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
            var removedFn = function () {
                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
            };

            for (var i = 0; i < removedMethods.length; i++) {
                ZipObject.prototype[removedMethods[i]] = removedFn;
            }
            module.exports = ZipObject;

        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function (require, module, exports) {
            require('../modules/web.immediate');
            module.exports = require('../modules/_core').setImmediate;
        }, { "../modules/_core": 40, "../modules/web.immediate": 56 }], 37: [function (require, module, exports) {
            module.exports = function (it) {
                if (typeof it != 'function') throw TypeError(it + ' is not a function!');
                return it;
            };
        }, {}], 38: [function (require, module, exports) {
            var isObject = require('./_is-object');
            module.exports = function (it) {
                if (!isObject(it)) throw TypeError(it + ' is not an object!');
                return it;
            };
        }, { "./_is-object": 51 }], 39: [function (require, module, exports) {
            var toString = {}.toString;

            module.exports = function (it) {
                return toString.call(it).slice(8, -1);
            };
        }, {}], 40: [function (require, module, exports) {
            var core = module.exports = { version: '2.3.0' };
            if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
        }, {}], 41: [function (require, module, exports) {
            // optional / simple context binding
            var aFunction = require('./_a-function');
            module.exports = function (fn, that, length) {
                aFunction(fn);
                if (that === undefined) return fn;
                switch (length) {
                    case 1: return function (a) {
                        return fn.call(that, a);
                    };
                    case 2: return function (a, b) {
                        return fn.call(that, a, b);
                    };
                    case 3: return function (a, b, c) {
                        return fn.call(that, a, b, c);
                    };
                }
                return function (/* ...args */) {
                    return fn.apply(that, arguments);
                };
            };
        }, { "./_a-function": 37 }], 42: [function (require, module, exports) {
            // Thank's IE8 for his funny defineProperty
            module.exports = !require('./_fails')(function () {
                return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
            });
        }, { "./_fails": 45 }], 43: [function (require, module, exports) {
            var isObject = require('./_is-object')
              , document = require('./_global').document
              // in old IE typeof document.createElement is 'object'
              , is = isObject(document) && isObject(document.createElement);
            module.exports = function (it) {
                return is ? document.createElement(it) : {};
            };
        }, { "./_global": 46, "./_is-object": 51 }], 44: [function (require, module, exports) {
            var global = require('./_global')
              , core = require('./_core')
              , ctx = require('./_ctx')
              , hide = require('./_hide')
              , PROTOTYPE = 'prototype';

            var $export = function (type, name, source) {
                var IS_FORCED = type & $export.F
                  , IS_GLOBAL = type & $export.G
                  , IS_STATIC = type & $export.S
                  , IS_PROTO = type & $export.P
                  , IS_BIND = type & $export.B
                  , IS_WRAP = type & $export.W
                  , exports = IS_GLOBAL ? core : core[name] || (core[name] = {})
                  , expProto = exports[PROTOTYPE]
                  , target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
                  , key, own, out;
                if (IS_GLOBAL) source = name;
                for (key in source) {
                    // contains in native
                    own = !IS_FORCED && target && target[key] !== undefined;
                    if (own && key in exports) continue;
                    // export native or passed
                    out = own ? target[key] : source[key];
                    // prevent global pollution for namespaces
                    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
                    // bind timers to global for call from export context
                    : IS_BIND && own ? ctx(out, global)
                    // wrap global constructors for prevent change them in library
                    : IS_WRAP && target[key] == out ? (function (C) {
                        var F = function (a, b, c) {
                            if (this instanceof C) {
                                switch (arguments.length) {
                                    case 0: return new C;
                                    case 1: return new C(a);
                                    case 2: return new C(a, b);
                                } return new C(a, b, c);
                            } return C.apply(this, arguments);
                        };
                        F[PROTOTYPE] = C[PROTOTYPE];
                        return F;
                        // make static versions for prototype methods
                    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
                    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
                    if (IS_PROTO) {
                        (exports.virtual || (exports.virtual = {}))[key] = out;
                        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
                        if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
                    }
                }
            };
            // type bitmap
            $export.F = 1;   // forced
            $export.G = 2;   // global
            $export.S = 4;   // static
            $export.P = 8;   // proto
            $export.B = 16;  // bind
            $export.W = 32;  // wrap
            $export.U = 64;  // safe
            $export.R = 128; // real proto method for `library` 
            module.exports = $export;
        }, { "./_core": 40, "./_ctx": 41, "./_global": 46, "./_hide": 47 }], 45: [function (require, module, exports) {
            module.exports = function (exec) {
                try {
                    return !!exec();
                } catch (e) {
                    return true;
                }
            };
        }, {}], 46: [function (require, module, exports) {
            // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
            var global = module.exports = typeof window != 'undefined' && window.Math == Math
              ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
            if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
        }, {}], 47: [function (require, module, exports) {
            var dP = require('./_object-dp')
              , createDesc = require('./_property-desc');
            module.exports = require('./_descriptors') ? function (object, key, value) {
                return dP.f(object, key, createDesc(1, value));
            } : function (object, key, value) {
                object[key] = value;
                return object;
            };
        }, { "./_descriptors": 42, "./_object-dp": 52, "./_property-desc": 53 }], 48: [function (require, module, exports) {
            module.exports = require('./_global').document && document.documentElement;
        }, { "./_global": 46 }], 49: [function (require, module, exports) {
            module.exports = !require('./_descriptors') && !require('./_fails')(function () {
                return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
            });
        }, { "./_descriptors": 42, "./_dom-create": 43, "./_fails": 45 }], 50: [function (require, module, exports) {
            // fast apply, http://jsperf.lnkit.com/fast-apply/5
            module.exports = function (fn, args, that) {
                var un = that === undefined;
                switch (args.length) {
                    case 0: return un ? fn()
                                      : fn.call(that);
                    case 1: return un ? fn(args[0])
                                      : fn.call(that, args[0]);
                    case 2: return un ? fn(args[0], args[1])
                                      : fn.call(that, args[0], args[1]);
                    case 3: return un ? fn(args[0], args[1], args[2])
                                      : fn.call(that, args[0], args[1], args[2]);
                    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                                      : fn.call(that, args[0], args[1], args[2], args[3]);
                } return fn.apply(that, args);
            };
        }, {}], 51: [function (require, module, exports) {
            module.exports = function (it) {
                return typeof it === 'object' ? it !== null : typeof it === 'function';
            };
        }, {}], 52: [function (require, module, exports) {
            var anObject = require('./_an-object')
              , IE8_DOM_DEFINE = require('./_ie8-dom-define')
              , toPrimitive = require('./_to-primitive')
              , dP = Object.defineProperty;

            exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
                anObject(O);
                P = toPrimitive(P, true);
                anObject(Attributes);
                if (IE8_DOM_DEFINE) try {
                    return dP(O, P, Attributes);
                } catch (e) { /* empty */ }
                if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
                if ('value' in Attributes) O[P] = Attributes.value;
                return O;
            };
        }, { "./_an-object": 38, "./_descriptors": 42, "./_ie8-dom-define": 49, "./_to-primitive": 55 }], 53: [function (require, module, exports) {
            module.exports = function (bitmap, value) {
                return {
                    enumerable: !(bitmap & 1),
                    configurable: !(bitmap & 2),
                    writable: !(bitmap & 4),
                    value: value
                };
            };
        }, {}], 54: [function (require, module, exports) {
            var ctx = require('./_ctx')
              , invoke = require('./_invoke')
              , html = require('./_html')
              , cel = require('./_dom-create')
              , global = require('./_global')
              , process = global.process
              , setTask = global.setImmediate
              , clearTask = global.clearImmediate
              , MessageChannel = global.MessageChannel
              , counter = 0
              , queue = {}
              , ONREADYSTATECHANGE = 'onreadystatechange'
              , defer, channel, port;
            var run = function () {
                var id = +this;
                if (queue.hasOwnProperty(id)) {
                    var fn = queue[id];
                    delete queue[id];
                    fn();
                }
            };
            var listener = function (event) {
                run.call(event.data);
            };
            // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
            if (!setTask || !clearTask) {
                setTask = function setImmediate(fn) {
                    var args = [], i = 1;
                    while (arguments.length > i) args.push(arguments[i++]);
                    queue[++counter] = function () {
                        invoke(typeof fn == 'function' ? fn : Function(fn), args);
                    };
                    defer(counter);
                    return counter;
                };
                clearTask = function clearImmediate(id) {
                    delete queue[id];
                };
                // Node.js 0.8-
                if (require('./_cof')(process) == 'process') {
                    defer = function (id) {
                        process.nextTick(ctx(run, id, 1));
                    };
                    // Browsers with MessageChannel, includes WebWorkers
                } else if (MessageChannel) {
                    channel = new MessageChannel;
                    port = channel.port2;
                    channel.port1.onmessage = listener;
                    defer = ctx(port.postMessage, port, 1);
                    // Browsers with postMessage, skip WebWorkers
                    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
                } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
                    defer = function (id) {
                        global.postMessage(id + '', '*');
                    };
                    global.addEventListener('message', listener, false);
                    // IE8-
                } else if (ONREADYSTATECHANGE in cel('script')) {
                    defer = function (id) {
                        html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
                            html.removeChild(this);
                            run.call(id);
                        };
                    };
                    // Rest old browsers
                } else {
                    defer = function (id) {
                        setTimeout(ctx(run, id, 1), 0);
                    };
                }
            }
            module.exports = {
                set: setTask,
                clear: clearTask
            };
        }, { "./_cof": 39, "./_ctx": 41, "./_dom-create": 43, "./_global": 46, "./_html": 48, "./_invoke": 50 }], 55: [function (require, module, exports) {
            // 7.1.1 ToPrimitive(input [, PreferredType])
            var isObject = require('./_is-object');
            // instead of the ES6 spec version, we didn't implement @@toPrimitive case
            // and the second argument - flag - preferred type is a string
            module.exports = function (it, S) {
                if (!isObject(it)) return it;
                var fn, val;
                if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
                if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
                if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
                throw TypeError("Can't convert object to primitive value");
            };
        }, { "./_is-object": 51 }], 56: [function (require, module, exports) {
            var $export = require('./_export')
              , $task = require('./_task');
            $export($export.G + $export.B, {
                setImmediate: $task.set,
                clearImmediate: $task.clear
            });
        }, { "./_export": 44, "./_task": 54 }], 57: [function (require, module, exports) {
            (function (global) {
                'use strict';
                var Mutation = global.MutationObserver || global.WebKitMutationObserver;

                var scheduleDrain;

                {
                    if (Mutation) {
                        var called = 0;
                        var observer = new Mutation(nextTick);
                        var element = global.document.createTextNode('');
                        observer.observe(element, {
                            characterData: true
                        });
                        scheduleDrain = function () {
                            element.data = (called = ++called % 2);
                        };
                    } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
                        var channel = new global.MessageChannel();
                        channel.port1.onmessage = nextTick;
                        scheduleDrain = function () {
                            channel.port2.postMessage(0);
                        };
                    } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
                        scheduleDrain = function () {

                            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                            var scriptEl = global.document.createElement('script');
                            scriptEl.onreadystatechange = function () {
                                nextTick();

                                scriptEl.onreadystatechange = null;
                                scriptEl.parentNode.removeChild(scriptEl);
                                scriptEl = null;
                            };
                            global.document.documentElement.appendChild(scriptEl);
                        };
                    } else {
                        scheduleDrain = function () {
                            setTimeout(nextTick, 0);
                        };
                    }
                }

                var draining;
                var queue = [];
                //named nextTick for less confusing stack traces
                function nextTick() {
                    draining = true;
                    var i, oldQueue;
                    var len = queue.length;
                    while (len) {
                        oldQueue = queue;
                        queue = [];
                        i = -1;
                        while (++i < len) {
                            oldQueue[i]();
                        }
                        len = queue.length;
                    }
                    draining = false;
                }

                module.exports = immediate;
                function immediate(task) {
                    if (queue.push(task) === 1 && !draining) {
                        scheduleDrain();
                    }
                }

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}], 58: [function (require, module, exports) {
            'use strict';
            var immediate = require('immediate');

            /* istanbul ignore next */
            function INTERNAL() { }

            var handlers = {};

            var REJECTED = ['REJECTED'];
            var FULFILLED = ['FULFILLED'];
            var PENDING = ['PENDING'];

            module.exports = Promise;

            function Promise(resolver) {
                if (typeof resolver !== 'function') {
                    throw new TypeError('resolver must be a function');
                }
                this.state = PENDING;
                this.queue = [];
                this.outcome = void 0;
                if (resolver !== INTERNAL) {
                    safelyResolveThenable(this, resolver);
                }
            }

            Promise.prototype["catch"] = function (onRejected) {
                return this.then(null, onRejected);
            };
            Promise.prototype.then = function (onFulfilled, onRejected) {
                if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
                  typeof onRejected !== 'function' && this.state === REJECTED) {
                    return this;
                }
                var promise = new this.constructor(INTERNAL);
                if (this.state !== PENDING) {
                    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                    unwrap(promise, resolver, this.outcome);
                } else {
                    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
                }

                return promise;
            };
            function QueueItem(promise, onFulfilled, onRejected) {
                this.promise = promise;
                if (typeof onFulfilled === 'function') {
                    this.onFulfilled = onFulfilled;
                    this.callFulfilled = this.otherCallFulfilled;
                }
                if (typeof onRejected === 'function') {
                    this.onRejected = onRejected;
                    this.callRejected = this.otherCallRejected;
                }
            }
            QueueItem.prototype.callFulfilled = function (value) {
                handlers.resolve(this.promise, value);
            };
            QueueItem.prototype.otherCallFulfilled = function (value) {
                unwrap(this.promise, this.onFulfilled, value);
            };
            QueueItem.prototype.callRejected = function (value) {
                handlers.reject(this.promise, value);
            };
            QueueItem.prototype.otherCallRejected = function (value) {
                unwrap(this.promise, this.onRejected, value);
            };

            function unwrap(promise, func, value) {
                immediate(function () {
                    var returnValue;
                    try {
                        returnValue = func(value);
                    } catch (e) {
                        return handlers.reject(promise, e);
                    }
                    if (returnValue === promise) {
                        handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
                    } else {
                        handlers.resolve(promise, returnValue);
                    }
                });
            }

            handlers.resolve = function (self, value) {
                var result = tryCatch(getThen, value);
                if (result.status === 'error') {
                    return handlers.reject(self, result.value);
                }
                var thenable = result.value;

                if (thenable) {
                    safelyResolveThenable(self, thenable);
                } else {
                    self.state = FULFILLED;
                    self.outcome = value;
                    var i = -1;
                    var len = self.queue.length;
                    while (++i < len) {
                        self.queue[i].callFulfilled(value);
                    }
                }
                return self;
            };
            handlers.reject = function (self, error) {
                self.state = REJECTED;
                self.outcome = error;
                var i = -1;
                var len = self.queue.length;
                while (++i < len) {
                    self.queue[i].callRejected(error);
                }
                return self;
            };

            function getThen(obj) {
                // Make sure we only access the accessor once as required by the spec
                var then = obj && obj.then;
                if (obj && typeof obj === 'object' && typeof then === 'function') {
                    return function appyThen() {
                        then.apply(obj, arguments);
                    };
                }
            }

            function safelyResolveThenable(self, thenable) {
                // Either fulfill, reject or reject with error
                var called = false;
                function onError(value) {
                    if (called) {
                        return;
                    }
                    called = true;
                    handlers.reject(self, value);
                }

                function onSuccess(value) {
                    if (called) {
                        return;
                    }
                    called = true;
                    handlers.resolve(self, value);
                }

                function tryToUnwrap() {
                    thenable(onSuccess, onError);
                }

                var result = tryCatch(tryToUnwrap);
                if (result.status === 'error') {
                    onError(result.value);
                }
            }

            function tryCatch(func, value) {
                var out = {};
                try {
                    out.value = func(value);
                    out.status = 'success';
                } catch (e) {
                    out.status = 'error';
                    out.value = e;
                }
                return out;
            }

            Promise.resolve = resolve;
            function resolve(value) {
                if (value instanceof this) {
                    return value;
                }
                return handlers.resolve(new this(INTERNAL), value);
            }

            Promise.reject = reject;
            function reject(reason) {
                var promise = new this(INTERNAL);
                return handlers.reject(promise, reason);
            }

            Promise.all = all;
            function all(iterable) {
                var self = this;
                if (Object.prototype.toString.call(iterable) !== '[object Array]') {
                    return this.reject(new TypeError('must be an array'));
                }

                var len = iterable.length;
                var called = false;
                if (!len) {
                    return this.resolve([]);
                }

                var values = new Array(len);
                var resolved = 0;
                var i = -1;
                var promise = new this(INTERNAL);

                while (++i < len) {
                    allResolver(iterable[i], i);
                }
                return promise;
                function allResolver(value, i) {
                    self.resolve(value).then(resolveFromAll, function (error) {
                        if (!called) {
                            called = true;
                            handlers.reject(promise, error);
                        }
                    });
                    function resolveFromAll(outValue) {
                        values[i] = outValue;
                        if (++resolved === len && !called) {
                            called = true;
                            handlers.resolve(promise, values);
                        }
                    }
                }
            }

            Promise.race = race;
            function race(iterable) {
                var self = this;
                if (Object.prototype.toString.call(iterable) !== '[object Array]') {
                    return this.reject(new TypeError('must be an array'));
                }

                var len = iterable.length;
                var called = false;
                if (!len) {
                    return this.resolve([]);
                }

                var i = -1;
                var promise = new this(INTERNAL);

                while (++i < len) {
                    resolver(iterable[i]);
                }
                return promise;
                function resolver(value) {
                    self.resolve(value).then(function (response) {
                        if (!called) {
                            called = true;
                            handlers.resolve(promise, response);
                        }
                    }, function (error) {
                        if (!called) {
                            called = true;
                            handlers.reject(promise, error);
                        }
                    });
                }
            }

        }, { "immediate": 57 }], 59: [function (require, module, exports) {
            // Top level file is just a mixin of submodules & constants
            'use strict';

            var assign = require('./lib/utils/common').assign;

            var deflate = require('./lib/deflate');
            var inflate = require('./lib/inflate');
            var constants = require('./lib/zlib/constants');

            var pako = {};

            assign(pako, deflate, inflate, constants);

            module.exports = pako;

        }, { "./lib/deflate": 60, "./lib/inflate": 61, "./lib/utils/common": 62, "./lib/zlib/constants": 65 }], 60: [function (require, module, exports) {
            'use strict';


            var zlib_deflate = require('./zlib/deflate');
            var utils = require('./utils/common');
            var strings = require('./utils/strings');
            var msg = require('./zlib/messages');
            var ZStream = require('./zlib/zstream');

            var toString = Object.prototype.toString;

            /* Public constants ==========================================================*/
            /* ===========================================================================*/

            var Z_NO_FLUSH = 0;
            var Z_FINISH = 4;

            var Z_OK = 0;
            var Z_STREAM_END = 1;
            var Z_SYNC_FLUSH = 2;

            var Z_DEFAULT_COMPRESSION = -1;

            var Z_DEFAULT_STRATEGY = 0;

            var Z_DEFLATED = 8;

            /* ===========================================================================*/


            /**
             * class Deflate
             *
             * Generic JS-style wrapper for zlib calls. If you don't need
             * streaming behaviour - use more simple functions: [[deflate]],
             * [[deflateRaw]] and [[gzip]].
             **/

            /* internal
             * Deflate.chunks -> Array
             *
             * Chunks of output data, if [[Deflate#onData]] not overriden.
             **/

            /**
             * Deflate.result -> Uint8Array|Array
             *
             * Compressed result, generated by default [[Deflate#onData]]
             * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
             * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
             * push a chunk with explicit flush (call [[Deflate#push]] with
             * `Z_SYNC_FLUSH` param).
             **/

            /**
             * Deflate.err -> Number
             *
             * Error code after deflate finished. 0 (Z_OK) on success.
             * You will not need it in real life, because deflate errors
             * are possible only on wrong options or bad `onData` / `onEnd`
             * custom handlers.
             **/

            /**
             * Deflate.msg -> String
             *
             * Error message, if [[Deflate.err]] != 0
             **/


            /**
             * new Deflate(options)
             * - options (Object): zlib deflate options.
             *
             * Creates new deflator instance with specified params. Throws exception
             * on bad params. Supported options:
             *
             * - `level`
             * - `windowBits`
             * - `memLevel`
             * - `strategy`
             * - `dictionary`
             *
             * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
             * for more information on these.
             *
             * Additional options, for internal needs:
             *
             * - `chunkSize` - size of generated data chunks (16K by default)
             * - `raw` (Boolean) - do raw deflate
             * - `gzip` (Boolean) - create gzip wrapper
             * - `to` (String) - if equal to 'string', then result will be "binary string"
             *    (each char code [0..255])
             * - `header` (Object) - custom header for gzip
             *   - `text` (Boolean) - true if compressed data believed to be text
             *   - `time` (Number) - modification time, unix timestamp
             *   - `os` (Number) - operation system code
             *   - `extra` (Array) - array of bytes with extra data (max 65536)
             *   - `name` (String) - file name (binary string)
             *   - `comment` (String) - comment (binary string)
             *   - `hcrc` (Boolean) - true if header crc should be added
             *
             * ##### Example:
             *
             * ```javascript
             * var pako = require('pako')
             *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
             *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
             *
             * var deflate = new pako.Deflate({ level: 3});
             *
             * deflate.push(chunk1, false);
             * deflate.push(chunk2, true);  // true -> last chunk
             *
             * if (deflate.err) { throw new Error(deflate.err); }
             *
             * console.log(deflate.result);
             * ```
             **/
            function Deflate(options) {
                if (!(this instanceof Deflate)) return new Deflate(options);

                this.options = utils.assign({
                    level: Z_DEFAULT_COMPRESSION,
                    method: Z_DEFLATED,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: Z_DEFAULT_STRATEGY,
                    to: ''
                }, options || {});

                var opt = this.options;

                if (opt.raw && (opt.windowBits > 0)) {
                    opt.windowBits = -opt.windowBits;
                }

                else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
                    opt.windowBits += 16;
                }

                this.err = 0;      // error code, if happens (0 = Z_OK)
                this.msg = '';     // error message
                this.ended = false;  // used to avoid multiple onEnd() calls
                this.chunks = [];     // chunks of compressed data

                this.strm = new ZStream();
                this.strm.avail_out = 0;

                var status = zlib_deflate.deflateInit2(
                  this.strm,
                  opt.level,
                  opt.method,
                  opt.windowBits,
                  opt.memLevel,
                  opt.strategy
                );

                if (status !== Z_OK) {
                    throw new Error(msg[status]);
                }

                if (opt.header) {
                    zlib_deflate.deflateSetHeader(this.strm, opt.header);
                }

                if (opt.dictionary) {
                    var dict;
                    // Convert data if needed
                    if (typeof opt.dictionary === 'string') {
                        // If we need to compress text, change encoding to utf8.
                        dict = strings.string2buf(opt.dictionary);
                    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
                        dict = new Uint8Array(opt.dictionary);
                    } else {
                        dict = opt.dictionary;
                    }

                    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

                    if (status !== Z_OK) {
                        throw new Error(msg[status]);
                    }

                    this._dict_set = true;
                }
            }

            /**
             * Deflate#push(data[, mode]) -> Boolean
             * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
             *   converted to utf8 byte sequence.
             * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
             *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
             *
             * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
             * new compressed chunks. Returns `true` on success. The last data block must have
             * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
             * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
             * can use mode Z_SYNC_FLUSH, keeping the compression context.
             *
             * On fail call [[Deflate#onEnd]] with error code and return false.
             *
             * We strongly recommend to use `Uint8Array` on input for best speed (output
             * array format is detected automatically). Also, don't skip last param and always
             * use the same type in your code (boolean or number). That will improve JS speed.
             *
             * For regular `Array`-s make sure all elements are [0..255].
             *
             * ##### Example
             *
             * ```javascript
             * push(chunk, false); // push one of data chunks
             * ...
             * push(chunk, true);  // push last chunk
             * ```
             **/
            Deflate.prototype.push = function (data, mode) {
                var strm = this.strm;
                var chunkSize = this.options.chunkSize;
                var status, _mode;

                if (this.ended) { return false; }

                _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

                // Convert data if needed
                if (typeof data === 'string') {
                    // If we need to compress text, change encoding to utf8.
                    strm.input = strings.string2buf(data);
                } else if (toString.call(data) === '[object ArrayBuffer]') {
                    strm.input = new Uint8Array(data);
                } else {
                    strm.input = data;
                }

                strm.next_in = 0;
                strm.avail_in = strm.input.length;

                do {
                    if (strm.avail_out === 0) {
                        strm.output = new utils.Buf8(chunkSize);
                        strm.next_out = 0;
                        strm.avail_out = chunkSize;
                    }
                    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

                    if (status !== Z_STREAM_END && status !== Z_OK) {
                        this.onEnd(status);
                        this.ended = true;
                        return false;
                    }
                    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
                        if (this.options.to === 'string') {
                            this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
                        } else {
                            this.onData(utils.shrinkBuf(strm.output, strm.next_out));
                        }
                    }
                } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

                // Finalize on the last chunk.
                if (_mode === Z_FINISH) {
                    status = zlib_deflate.deflateEnd(this.strm);
                    this.onEnd(status);
                    this.ended = true;
                    return status === Z_OK;
                }

                // callback interim results if Z_SYNC_FLUSH.
                if (_mode === Z_SYNC_FLUSH) {
                    this.onEnd(Z_OK);
                    strm.avail_out = 0;
                    return true;
                }

                return true;
            };


            /**
             * Deflate#onData(chunk) -> Void
             * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
             *   on js engine support. When string output requested, each chunk
             *   will be string.
             *
             * By default, stores data blocks in `chunks[]` property and glue
             * those in `onEnd`. Override this handler, if you need another behaviour.
             **/
            Deflate.prototype.onData = function (chunk) {
                this.chunks.push(chunk);
            };


            /**
             * Deflate#onEnd(status) -> Void
             * - status (Number): deflate status. 0 (Z_OK) on success,
             *   other if not.
             *
             * Called once after you tell deflate that the input stream is
             * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
             * or if an error happened. By default - join collected chunks,
             * free memory and fill `results` / `err` properties.
             **/
            Deflate.prototype.onEnd = function (status) {
                // On success - join
                if (status === Z_OK) {
                    if (this.options.to === 'string') {
                        this.result = this.chunks.join('');
                    } else {
                        this.result = utils.flattenChunks(this.chunks);
                    }
                }
                this.chunks = [];
                this.err = status;
                this.msg = this.strm.msg;
            };


            /**
             * deflate(data[, options]) -> Uint8Array|Array|String
             * - data (Uint8Array|Array|String): input data to compress.
             * - options (Object): zlib deflate options.
             *
             * Compress `data` with deflate algorithm and `options`.
             *
             * Supported options are:
             *
             * - level
             * - windowBits
             * - memLevel
             * - strategy
             * - dictionary
             *
             * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
             * for more information on these.
             *
             * Sugar (options):
             *
             * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
             *   negative windowBits implicitly.
             * - `to` (String) - if equal to 'string', then result will be "binary string"
             *    (each char code [0..255])
             *
             * ##### Example:
             *
             * ```javascript
             * var pako = require('pako')
             *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
             *
             * console.log(pako.deflate(data));
             * ```
             **/
            function deflate(input, options) {
                var deflator = new Deflate(options);

                deflator.push(input, true);

                // That will never happens, if you don't cheat with options :)
                if (deflator.err) { throw deflator.msg; }

                return deflator.result;
            }


            /**
             * deflateRaw(data[, options]) -> Uint8Array|Array|String
             * - data (Uint8Array|Array|String): input data to compress.
             * - options (Object): zlib deflate options.
             *
             * The same as [[deflate]], but creates raw data, without wrapper
             * (header and adler32 crc).
             **/
            function deflateRaw(input, options) {
                options = options || {};
                options.raw = true;
                return deflate(input, options);
            }


            /**
             * gzip(data[, options]) -> Uint8Array|Array|String
             * - data (Uint8Array|Array|String): input data to compress.
             * - options (Object): zlib deflate options.
             *
             * The same as [[deflate]], but create gzip wrapper instead of
             * deflate one.
             **/
            function gzip(input, options) {
                options = options || {};
                options.gzip = true;
                return deflate(input, options);
            }


            exports.Deflate = Deflate;
            exports.deflate = deflate;
            exports.deflateRaw = deflateRaw;
            exports.gzip = gzip;

        }, { "./utils/common": 62, "./utils/strings": 63, "./zlib/deflate": 67, "./zlib/messages": 72, "./zlib/zstream": 74 }], 61: [function (require, module, exports) {
            'use strict';


            var zlib_inflate = require('./zlib/inflate');
            var utils = require('./utils/common');
            var strings = require('./utils/strings');
            var c = require('./zlib/constants');
            var msg = require('./zlib/messages');
            var ZStream = require('./zlib/zstream');
            var GZheader = require('./zlib/gzheader');

            var toString = Object.prototype.toString;

            /**
             * class Inflate
             *
             * Generic JS-style wrapper for zlib calls. If you don't need
             * streaming behaviour - use more simple functions: [[inflate]]
             * and [[inflateRaw]].
             **/

            /* internal
             * inflate.chunks -> Array
             *
             * Chunks of output data, if [[Inflate#onData]] not overriden.
             **/

            /**
             * Inflate.result -> Uint8Array|Array|String
             *
             * Uncompressed result, generated by default [[Inflate#onData]]
             * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
             * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
             * push a chunk with explicit flush (call [[Inflate#push]] with
             * `Z_SYNC_FLUSH` param).
             **/

            /**
             * Inflate.err -> Number
             *
             * Error code after inflate finished. 0 (Z_OK) on success.
             * Should be checked if broken data possible.
             **/

            /**
             * Inflate.msg -> String
             *
             * Error message, if [[Inflate.err]] != 0
             **/


            /**
             * new Inflate(options)
             * - options (Object): zlib inflate options.
             *
             * Creates new inflator instance with specified params. Throws exception
             * on bad params. Supported options:
             *
             * - `windowBits`
             * - `dictionary`
             *
             * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
             * for more information on these.
             *
             * Additional options, for internal needs:
             *
             * - `chunkSize` - size of generated data chunks (16K by default)
             * - `raw` (Boolean) - do raw inflate
             * - `to` (String) - if equal to 'string', then result will be converted
             *   from utf8 to utf16 (javascript) string. When string output requested,
             *   chunk length can differ from `chunkSize`, depending on content.
             *
             * By default, when no options set, autodetect deflate/gzip data format via
             * wrapper header.
             *
             * ##### Example:
             *
             * ```javascript
             * var pako = require('pako')
             *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
             *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
             *
             * var inflate = new pako.Inflate({ level: 3});
             *
             * inflate.push(chunk1, false);
             * inflate.push(chunk2, true);  // true -> last chunk
             *
             * if (inflate.err) { throw new Error(inflate.err); }
             *
             * console.log(inflate.result);
             * ```
             **/
            function Inflate(options) {
                if (!(this instanceof Inflate)) return new Inflate(options);

                this.options = utils.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ''
                }, options || {});

                var opt = this.options;

                // Force window size for `raw` data, if not set directly,
                // because we have no header for autodetect.
                if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
                    opt.windowBits = -opt.windowBits;
                    if (opt.windowBits === 0) { opt.windowBits = -15; }
                }

                // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
                if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
                    !(options && options.windowBits)) {
                    opt.windowBits += 32;
                }

                // Gzip header has no info about windows size, we can do autodetect only
                // for deflate. So, if window size not set, force it to max when gzip possible
                if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
                    // bit 3 (16) -> gzipped data
                    // bit 4 (32) -> autodetect gzip/deflate
                    if ((opt.windowBits & 15) === 0) {
                        opt.windowBits |= 15;
                    }
                }

                this.err = 0;      // error code, if happens (0 = Z_OK)
                this.msg = '';     // error message
                this.ended = false;  // used to avoid multiple onEnd() calls
                this.chunks = [];     // chunks of compressed data

                this.strm = new ZStream();
                this.strm.avail_out = 0;

                var status = zlib_inflate.inflateInit2(
                  this.strm,
                  opt.windowBits
                );

                if (status !== c.Z_OK) {
                    throw new Error(msg[status]);
                }

                this.header = new GZheader();

                zlib_inflate.inflateGetHeader(this.strm, this.header);
            }

            /**
             * Inflate#push(data[, mode]) -> Boolean
             * - data (Uint8Array|Array|ArrayBuffer|String): input data
             * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
             *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
             *
             * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
             * new output chunks. Returns `true` on success. The last data block must have
             * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
             * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
             * can use mode Z_SYNC_FLUSH, keeping the decompression context.
             *
             * On fail call [[Inflate#onEnd]] with error code and return false.
             *
             * We strongly recommend to use `Uint8Array` on input for best speed (output
             * format is detected automatically). Also, don't skip last param and always
             * use the same type in your code (boolean or number). That will improve JS speed.
             *
             * For regular `Array`-s make sure all elements are [0..255].
             *
             * ##### Example
             *
             * ```javascript
             * push(chunk, false); // push one of data chunks
             * ...
             * push(chunk, true);  // push last chunk
             * ```
             **/
            Inflate.prototype.push = function (data, mode) {
                var strm = this.strm;
                var chunkSize = this.options.chunkSize;
                var dictionary = this.options.dictionary;
                var status, _mode;
                var next_out_utf8, tail, utf8str;
                var dict;

                // Flag to properly process Z_BUF_ERROR on testing inflate call
                // when we check that all output data was flushed.
                var allowBufError = false;

                if (this.ended) { return false; }
                _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

                // Convert data if needed
                if (typeof data === 'string') {
                    // Only binary strings can be decompressed on practice
                    strm.input = strings.binstring2buf(data);
                } else if (toString.call(data) === '[object ArrayBuffer]') {
                    strm.input = new Uint8Array(data);
                } else {
                    strm.input = data;
                }

                strm.next_in = 0;
                strm.avail_in = strm.input.length;

                do {
                    if (strm.avail_out === 0) {
                        strm.output = new utils.Buf8(chunkSize);
                        strm.next_out = 0;
                        strm.avail_out = chunkSize;
                    }

                    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

                    if (status === c.Z_NEED_DICT && dictionary) {
                        // Convert data if needed
                        if (typeof dictionary === 'string') {
                            dict = strings.string2buf(dictionary);
                        } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
                            dict = new Uint8Array(dictionary);
                        } else {
                            dict = dictionary;
                        }

                        status = zlib_inflate.inflateSetDictionary(this.strm, dict);

                    }

                    if (status === c.Z_BUF_ERROR && allowBufError === true) {
                        status = c.Z_OK;
                        allowBufError = false;
                    }

                    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
                        this.onEnd(status);
                        this.ended = true;
                        return false;
                    }

                    if (strm.next_out) {
                        if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

                            if (this.options.to === 'string') {

                                next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

                                tail = strm.next_out - next_out_utf8;
                                utf8str = strings.buf2string(strm.output, next_out_utf8);

                                // move tail
                                strm.next_out = tail;
                                strm.avail_out = chunkSize - tail;
                                if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

                                this.onData(utf8str);

                            } else {
                                this.onData(utils.shrinkBuf(strm.output, strm.next_out));
                            }
                        }
                    }

                    // When no more input data, we should check that internal inflate buffers
                    // are flushed. The only way to do it when avail_out = 0 - run one more
                    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
                    // Here we set flag to process this error properly.
                    //
                    // NOTE. Deflate does not return error in this case and does not needs such
                    // logic.
                    if (strm.avail_in === 0 && strm.avail_out === 0) {
                        allowBufError = true;
                    }

                } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

                if (status === c.Z_STREAM_END) {
                    _mode = c.Z_FINISH;
                }

                // Finalize on the last chunk.
                if (_mode === c.Z_FINISH) {
                    status = zlib_inflate.inflateEnd(this.strm);
                    this.onEnd(status);
                    this.ended = true;
                    return status === c.Z_OK;
                }

                // callback interim results if Z_SYNC_FLUSH.
                if (_mode === c.Z_SYNC_FLUSH) {
                    this.onEnd(c.Z_OK);
                    strm.avail_out = 0;
                    return true;
                }

                return true;
            };


            /**
             * Inflate#onData(chunk) -> Void
             * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
             *   on js engine support. When string output requested, each chunk
             *   will be string.
             *
             * By default, stores data blocks in `chunks[]` property and glue
             * those in `onEnd`. Override this handler, if you need another behaviour.
             **/
            Inflate.prototype.onData = function (chunk) {
                this.chunks.push(chunk);
            };


            /**
             * Inflate#onEnd(status) -> Void
             * - status (Number): inflate status. 0 (Z_OK) on success,
             *   other if not.
             *
             * Called either after you tell inflate that the input stream is
             * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
             * or if an error happened. By default - join collected chunks,
             * free memory and fill `results` / `err` properties.
             **/
            Inflate.prototype.onEnd = function (status) {
                // On success - join
                if (status === c.Z_OK) {
                    if (this.options.to === 'string') {
                        // Glue & convert here, until we teach pako to send
                        // utf8 alligned strings to onData
                        this.result = this.chunks.join('');
                    } else {
                        this.result = utils.flattenChunks(this.chunks);
                    }
                }
                this.chunks = [];
                this.err = status;
                this.msg = this.strm.msg;
            };


            /**
             * inflate(data[, options]) -> Uint8Array|Array|String
             * - data (Uint8Array|Array|String): input data to decompress.
             * - options (Object): zlib inflate options.
             *
             * Decompress `data` with inflate/ungzip and `options`. Autodetect
             * format via wrapper header by default. That's why we don't provide
             * separate `ungzip` method.
             *
             * Supported options are:
             *
             * - windowBits
             *
             * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
             * for more information.
             *
             * Sugar (options):
             *
             * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
             *   negative windowBits implicitly.
             * - `to` (String) - if equal to 'string', then result will be converted
             *   from utf8 to utf16 (javascript) string. When string output requested,
             *   chunk length can differ from `chunkSize`, depending on content.
             *
             *
             * ##### Example:
             *
             * ```javascript
             * var pako = require('pako')
             *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
             *   , output;
             *
             * try {
             *   output = pako.inflate(input);
             * } catch (err)
             *   console.log(err);
             * }
             * ```
             **/
            function inflate(input, options) {
                var inflator = new Inflate(options);

                inflator.push(input, true);

                // That will never happens, if you don't cheat with options :)
                if (inflator.err) { throw inflator.msg; }

                return inflator.result;
            }


            /**
             * inflateRaw(data[, options]) -> Uint8Array|Array|String
             * - data (Uint8Array|Array|String): input data to decompress.
             * - options (Object): zlib inflate options.
             *
             * The same as [[inflate]], but creates raw data, without wrapper
             * (header and adler32 crc).
             **/
            function inflateRaw(input, options) {
                options = options || {};
                options.raw = true;
                return inflate(input, options);
            }


            /**
             * ungzip(data[, options]) -> Uint8Array|Array|String
             * - data (Uint8Array|Array|String): input data to decompress.
             * - options (Object): zlib inflate options.
             *
             * Just shortcut to [[inflate]], because it autodetects format
             * by header.content. Done for convenience.
             **/


            exports.Inflate = Inflate;
            exports.inflate = inflate;
            exports.inflateRaw = inflateRaw;
            exports.ungzip = inflate;

        }, { "./utils/common": 62, "./utils/strings": 63, "./zlib/constants": 65, "./zlib/gzheader": 68, "./zlib/inflate": 70, "./zlib/messages": 72, "./zlib/zstream": 74 }], 62: [function (require, module, exports) {
            'use strict';


            var TYPED_OK = (typeof Uint8Array !== 'undefined') &&
                            (typeof Uint16Array !== 'undefined') &&
                            (typeof Int32Array !== 'undefined');


            exports.assign = function (obj /*from1, from2, from3, ...*/) {
                var sources = Array.prototype.slice.call(arguments, 1);
                while (sources.length) {
                    var source = sources.shift();
                    if (!source) { continue; }

                    if (typeof source !== 'object') {
                        throw new TypeError(source + 'must be non-object');
                    }

                    for (var p in source) {
                        if (source.hasOwnProperty(p)) {
                            obj[p] = source[p];
                        }
                    }
                }

                return obj;
            };


            // reduce buffer size, avoiding mem copy
            exports.shrinkBuf = function (buf, size) {
                if (buf.length === size) { return buf; }
                if (buf.subarray) { return buf.subarray(0, size); }
                buf.length = size;
                return buf;
            };


            var fnTyped = {
                arraySet: function (dest, src, src_offs, len, dest_offs) {
                    if (src.subarray && dest.subarray) {
                        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
                        return;
                    }
                    // Fallback to ordinary array
                    for (var i = 0; i < len; i++) {
                        dest[dest_offs + i] = src[src_offs + i];
                    }
                },
                // Join array of chunks to single array.
                flattenChunks: function (chunks) {
                    var i, l, len, pos, chunk, result;

                    // calculate data length
                    len = 0;
                    for (i = 0, l = chunks.length; i < l; i++) {
                        len += chunks[i].length;
                    }

                    // join chunks
                    result = new Uint8Array(len);
                    pos = 0;
                    for (i = 0, l = chunks.length; i < l; i++) {
                        chunk = chunks[i];
                        result.set(chunk, pos);
                        pos += chunk.length;
                    }

                    return result;
                }
            };

            var fnUntyped = {
                arraySet: function (dest, src, src_offs, len, dest_offs) {
                    for (var i = 0; i < len; i++) {
                        dest[dest_offs + i] = src[src_offs + i];
                    }
                },
                // Join array of chunks to single array.
                flattenChunks: function (chunks) {
                    return [].concat.apply([], chunks);
                }
            };


            // Enable/Disable typed arrays use, for testing
            //
            exports.setTyped = function (on) {
                if (on) {
                    exports.Buf8 = Uint8Array;
                    exports.Buf16 = Uint16Array;
                    exports.Buf32 = Int32Array;
                    exports.assign(exports, fnTyped);
                } else {
                    exports.Buf8 = Array;
                    exports.Buf16 = Array;
                    exports.Buf32 = Array;
                    exports.assign(exports, fnUntyped);
                }
            };

            exports.setTyped(TYPED_OK);

        }, {}], 63: [function (require, module, exports) {
            // String encode/decode helpers
            'use strict';


            var utils = require('./common');


            // Quick check if we can use fast array to bin string conversion
            //
            // - apply(Array) can fail on Android 2.2
            // - apply(Uint8Array) can fail on iOS 5.1 Safary
            //
            var STR_APPLY_OK = true;
            var STR_APPLY_UIA_OK = true;

            try { String.fromCharCode.apply(null, [0]); } catch (__) { STR_APPLY_OK = false; }
            try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


            // Table with utf8 lengths (calculated by first byte of sequence)
            // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
            // because max possible codepoint is 0x10ffff
            var _utf8len = new utils.Buf8(256);
            for (var q = 0; q < 256; q++) {
                _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
            }
            _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


            // convert string to array (typed, when possible)
            exports.string2buf = function (str) {
                var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

                // count binary size
                for (m_pos = 0; m_pos < str_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 0xfc00) === 0xdc00) {
                            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                            m_pos++;
                        }
                    }
                    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
                }

                // allocate buffer
                buf = new utils.Buf8(buf_len);

                // convert
                for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 0xfc00) === 0xdc00) {
                            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                            m_pos++;
                        }
                    }
                    if (c < 0x80) {
                        /* one byte */
                        buf[i++] = c;
                    } else if (c < 0x800) {
                        /* two bytes */
                        buf[i++] = 0xC0 | (c >>> 6);
                        buf[i++] = 0x80 | (c & 0x3f);
                    } else if (c < 0x10000) {
                        /* three bytes */
                        buf[i++] = 0xE0 | (c >>> 12);
                        buf[i++] = 0x80 | (c >>> 6 & 0x3f);
                        buf[i++] = 0x80 | (c & 0x3f);
                    } else {
                        /* four bytes */
                        buf[i++] = 0xf0 | (c >>> 18);
                        buf[i++] = 0x80 | (c >>> 12 & 0x3f);
                        buf[i++] = 0x80 | (c >>> 6 & 0x3f);
                        buf[i++] = 0x80 | (c & 0x3f);
                    }
                }

                return buf;
            };

            // Helper (used in 2 places)
            function buf2binstring(buf, len) {
                // use fallback for big arrays to avoid stack overflow
                if (len < 65537) {
                    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
                        return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
                    }
                }

                var result = '';
                for (var i = 0; i < len; i++) {
                    result += String.fromCharCode(buf[i]);
                }
                return result;
            }


            // Convert byte array to binary string
            exports.buf2binstring = function (buf) {
                return buf2binstring(buf, buf.length);
            };


            // Convert binary string (typed, when possible)
            exports.binstring2buf = function (str) {
                var buf = new utils.Buf8(str.length);
                for (var i = 0, len = buf.length; i < len; i++) {
                    buf[i] = str.charCodeAt(i);
                }
                return buf;
            };


            // convert array to string
            exports.buf2string = function (buf, max) {
                var i, out, c, c_len;
                var len = max || buf.length;

                // Reserve max possible length (2 words per char)
                // NB: by unknown reasons, Array is significantly faster for
                //     String.fromCharCode.apply than Uint16Array.
                var utf16buf = new Array(len * 2);

                for (out = 0, i = 0; i < len;) {
                    c = buf[i++];
                    // quick process ascii
                    if (c < 0x80) { utf16buf[out++] = c; continue; }

                    c_len = _utf8len[c];
                    // skip 5 & 6 byte codes
                    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

                    // apply mask on first byte
                    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
                    // join the rest
                    while (c_len > 1 && i < len) {
                        c = (c << 6) | (buf[i++] & 0x3f);
                        c_len--;
                    }

                    // terminated by end of string?
                    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

                    if (c < 0x10000) {
                        utf16buf[out++] = c;
                    } else {
                        c -= 0x10000;
                        utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
                        utf16buf[out++] = 0xdc00 | (c & 0x3ff);
                    }
                }

                return buf2binstring(utf16buf, out);
            };


            // Calculate max possible position in utf8 buffer,
            // that will not break sequence. If that's not possible
            // - (very small limits) return max size as is.
            //
            // buf[] - utf8 bytes array
            // max   - length limit (mandatory);
            exports.utf8border = function (buf, max) {
                var pos;

                max = max || buf.length;
                if (max > buf.length) { max = buf.length; }

                // go back from last position, until start of sequence found
                pos = max - 1;
                while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

                // Fuckup - very small and broken sequence,
                // return max, because we should return something anyway.
                if (pos < 0) { return max; }

                // If we came to start of buffer - that means vuffer is too small,
                // return max too.
                if (pos === 0) { return max; }

                return (pos + _utf8len[buf[pos]] > max) ? pos : max;
            };

        }, { "./common": 62 }], 64: [function (require, module, exports) {
            'use strict';

            // Note: adler32 takes 12% for level 0 and 2% for level 6.
            // It doesn't worth to make additional optimizationa as in original.
            // Small size is preferable.

            function adler32(adler, buf, len, pos) {
                var s1 = (adler & 0xffff) | 0,
                    s2 = ((adler >>> 16) & 0xffff) | 0,
                    n = 0;

                while (len !== 0) {
                    // Set limit ~ twice less than 5552, to keep
                    // s2 in 31-bits, because we force signed ints.
                    // in other case %= will fail.
                    n = len > 2000 ? 2000 : len;
                    len -= n;

                    do {
                        s1 = (s1 + buf[pos++]) | 0;
                        s2 = (s2 + s1) | 0;
                    } while (--n);

                    s1 %= 65521;
                    s2 %= 65521;
                }

                return (s1 | (s2 << 16)) | 0;
            }


            module.exports = adler32;

        }, {}], 65: [function (require, module, exports) {
            'use strict';


            module.exports = {

                /* Allowed flush values; see deflate() and inflate() below for details */
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,

                /* Return codes for the compression/decompression functions. Negative values
                * are errors, positive values are used for special but normal events.
                */
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                //Z_MEM_ERROR:     -4,
                Z_BUF_ERROR: -5,
                //Z_VERSION_ERROR: -6,

                /* compression levels */
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,


                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,

                /* Possible values of the data_type field (though see inflate()) */
                Z_BINARY: 0,
                Z_TEXT: 1,
                //Z_ASCII:                1, // = Z_TEXT (deprecated)
                Z_UNKNOWN: 2,

                /* The deflate compression method */
                Z_DEFLATED: 8
                //Z_NULL:                 null // Use -1 or null inline, depending on var type
            };

        }, {}], 66: [function (require, module, exports) {
            'use strict';

            // Note: we can't get significant speed boost here.
            // So write code to minimize size - no pregenerated tables
            // and array tools dependencies.


            // Use ordinary array, since untyped makes no boost here
            function makeTable() {
                var c, table = [];

                for (var n = 0; n < 256; n++) {
                    c = n;
                    for (var k = 0; k < 8; k++) {
                        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
                    }
                    table[n] = c;
                }

                return table;
            }

            // Create table on load. Just 255 signed longs. Not a problem.
            var crcTable = makeTable();


            function crc32(crc, buf, len, pos) {
                var t = crcTable,
                    end = pos + len;

                crc ^= -1;

                for (var i = pos; i < end; i++) {
                    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
                }

                return (crc ^ (-1)); // >>> 0;
            }


            module.exports = crc32;

        }, {}], 67: [function (require, module, exports) {
            'use strict';

            var utils = require('../utils/common');
            var trees = require('./trees');
            var adler32 = require('./adler32');
            var crc32 = require('./crc32');
            var msg = require('./messages');

            /* Public constants ==========================================================*/
            /* ===========================================================================*/


            /* Allowed flush values; see deflate() and inflate() below for details */
            var Z_NO_FLUSH = 0;
            var Z_PARTIAL_FLUSH = 1;
            //var Z_SYNC_FLUSH    = 2;
            var Z_FULL_FLUSH = 3;
            var Z_FINISH = 4;
            var Z_BLOCK = 5;
            //var Z_TREES         = 6;


            /* Return codes for the compression/decompression functions. Negative values
             * are errors, positive values are used for special but normal events.
             */
            var Z_OK = 0;
            var Z_STREAM_END = 1;
            //var Z_NEED_DICT     = 2;
            //var Z_ERRNO         = -1;
            var Z_STREAM_ERROR = -2;
            var Z_DATA_ERROR = -3;
            //var Z_MEM_ERROR     = -4;
            var Z_BUF_ERROR = -5;
            //var Z_VERSION_ERROR = -6;


            /* compression levels */
            //var Z_NO_COMPRESSION      = 0;
            //var Z_BEST_SPEED          = 1;
            //var Z_BEST_COMPRESSION    = 9;
            var Z_DEFAULT_COMPRESSION = -1;


            var Z_FILTERED = 1;
            var Z_HUFFMAN_ONLY = 2;
            var Z_RLE = 3;
            var Z_FIXED = 4;
            var Z_DEFAULT_STRATEGY = 0;

            /* Possible values of the data_type field (though see inflate()) */
            //var Z_BINARY              = 0;
            //var Z_TEXT                = 1;
            //var Z_ASCII               = 1; // = Z_TEXT
            var Z_UNKNOWN = 2;


            /* The deflate compression method */
            var Z_DEFLATED = 8;

            /*============================================================================*/


            var MAX_MEM_LEVEL = 9;
            /* Maximum value for memLevel in deflateInit2 */
            var MAX_WBITS = 15;
            /* 32K LZ77 window */
            var DEF_MEM_LEVEL = 8;


            var LENGTH_CODES = 29;
            /* number of length codes, not counting the special END_BLOCK code */
            var LITERALS = 256;
            /* number of literal bytes 0..255 */
            var L_CODES = LITERALS + 1 + LENGTH_CODES;
            /* number of Literal or Length codes, including the END_BLOCK code */
            var D_CODES = 30;
            /* number of distance codes */
            var BL_CODES = 19;
            /* number of codes used to transfer the bit lengths */
            var HEAP_SIZE = 2 * L_CODES + 1;
            /* maximum heap size */
            var MAX_BITS = 15;
            /* All codes must not exceed MAX_BITS bits */

            var MIN_MATCH = 3;
            var MAX_MATCH = 258;
            var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

            var PRESET_DICT = 0x20;

            var INIT_STATE = 42;
            var EXTRA_STATE = 69;
            var NAME_STATE = 73;
            var COMMENT_STATE = 91;
            var HCRC_STATE = 103;
            var BUSY_STATE = 113;
            var FINISH_STATE = 666;

            var BS_NEED_MORE = 1; /* block not completed, need more input or more output */
            var BS_BLOCK_DONE = 2; /* block flush performed */
            var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
            var BS_FINISH_DONE = 4; /* finish done, accept no more input or output */

            var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

            function err(strm, errorCode) {
                strm.msg = msg[errorCode];
                return errorCode;
            }

            function rank(f) {
                return ((f) << 1) - ((f) > 4 ? 9 : 0);
            }

            function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


            /* =========================================================================
             * Flush as much pending output as possible. All deflate() output goes
             * through this function so some applications may wish to modify it
             * to avoid allocating a large strm->output buffer and copying into it.
             * (See also read_buf()).
             */
            function flush_pending(strm) {
                var s = strm.state;

                //_tr_flush_bits(s);
                var len = s.pending;
                if (len > strm.avail_out) {
                    len = strm.avail_out;
                }
                if (len === 0) { return; }

                utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
                strm.next_out += len;
                s.pending_out += len;
                strm.total_out += len;
                strm.avail_out -= len;
                s.pending -= len;
                if (s.pending === 0) {
                    s.pending_out = 0;
                }
            }


            function flush_block_only(s, last) {
                trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
                s.block_start = s.strstart;
                flush_pending(s.strm);
            }


            function put_byte(s, b) {
                s.pending_buf[s.pending++] = b;
            }


            /* =========================================================================
             * Put a short in the pending buffer. The 16-bit value is put in MSB order.
             * IN assertion: the stream state is correct and there is enough room in
             * pending_buf.
             */
            function putShortMSB(s, b) {
                //  put_byte(s, (Byte)(b >> 8));
                //  put_byte(s, (Byte)(b & 0xff));
                s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
                s.pending_buf[s.pending++] = b & 0xff;
            }


            /* ===========================================================================
             * Read a new buffer from the current input stream, update the adler32
             * and total number of bytes read.  All deflate() input goes through
             * this function so some applications may wish to modify it to avoid
             * allocating a large strm->input buffer and copying from it.
             * (See also flush_pending()).
             */
            function read_buf(strm, buf, start, size) {
                var len = strm.avail_in;

                if (len > size) { len = size; }
                if (len === 0) { return 0; }

                strm.avail_in -= len;

                // zmemcpy(buf, strm->next_in, len);
                utils.arraySet(buf, strm.input, strm.next_in, len, start);
                if (strm.state.wrap === 1) {
                    strm.adler = adler32(strm.adler, buf, len, start);
                }

                else if (strm.state.wrap === 2) {
                    strm.adler = crc32(strm.adler, buf, len, start);
                }

                strm.next_in += len;
                strm.total_in += len;

                return len;
            }


            /* ===========================================================================
             * Set match_start to the longest match starting at the given string and
             * return its length. Matches shorter or equal to prev_length are discarded,
             * in which case the result is equal to prev_length and match_start is
             * garbage.
             * IN assertions: cur_match is the head of the hash chain for the current
             *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
             * OUT assertion: the match length is not greater than s->lookahead.
             */
            function longest_match(s, cur_match) {
                var chain_length = s.max_chain_length;      /* max hash chain length */
                var scan = s.strstart; /* current string */
                var match;                       /* matched string */
                var len;                           /* length of current match */
                var best_len = s.prev_length;              /* best match length so far */
                var nice_match = s.nice_match;             /* stop if match long enough */
                var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
                    s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

                var _win = s.window; // shortcut

                var wmask = s.w_mask;
                var prev = s.prev;

                /* Stop when cur_match becomes <= limit. To simplify the code,
                 * we prevent matches with the string of window index 0.
                 */

                var strend = s.strstart + MAX_MATCH;
                var scan_end1 = _win[scan + best_len - 1];
                var scan_end = _win[scan + best_len];

                /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
                 * It is easy to get rid of this optimization if necessary.
                 */
                // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

                /* Do not waste too much time if we already have a good match: */
                if (s.prev_length >= s.good_match) {
                    chain_length >>= 2;
                }
                /* Do not look for matches beyond the end of the input. This is necessary
                 * to make deflate deterministic.
                 */
                if (nice_match > s.lookahead) { nice_match = s.lookahead; }

                // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

                do {
                    // Assert(cur_match < s->strstart, "no future");
                    match = cur_match;

                    /* Skip to next match if the match length cannot increase
                     * or if the match length is less than 2.  Note that the checks below
                     * for insufficient lookahead only occur occasionally for performance
                     * reasons.  Therefore uninitialized memory will be accessed, and
                     * conditional jumps will be made that depend on those values.
                     * However the length of the match is limited to the lookahead, so
                     * the output of deflate is not affected by the uninitialized values.
                     */

                    if (_win[match + best_len] !== scan_end ||
                        _win[match + best_len - 1] !== scan_end1 ||
                        _win[match] !== _win[scan] ||
                        _win[++match] !== _win[scan + 1]) {
                        continue;
                    }

                    /* The check at best_len-1 can be removed because it will be made
                     * again later. (This heuristic is not always a win.)
                     * It is not necessary to compare scan[2] and match[2] since they
                     * are always equal when the other bytes match, given that
                     * the hash keys are equal and that HASH_BITS >= 8.
                     */
                    scan += 2;
                    match++;
                    // Assert(*scan == *match, "match[2]?");

                    /* We check for insufficient lookahead only every 8th comparison;
                     * the 256th check will be made at strstart+258.
                     */
                    do {
                        /*jshint noempty:false*/
                    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                             scan < strend);

                    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

                    len = MAX_MATCH - (strend - scan);
                    scan = strend - MAX_MATCH;

                    if (len > best_len) {
                        s.match_start = cur_match;
                        best_len = len;
                        if (len >= nice_match) {
                            break;
                        }
                        scan_end1 = _win[scan + best_len - 1];
                        scan_end = _win[scan + best_len];
                    }
                } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

                if (best_len <= s.lookahead) {
                    return best_len;
                }
                return s.lookahead;
            }


            /* ===========================================================================
             * Fill the window when the lookahead becomes insufficient.
             * Updates strstart and lookahead.
             *
             * IN assertion: lookahead < MIN_LOOKAHEAD
             * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
             *    At least one byte has been read, or avail_in == 0; reads are
             *    performed for at least two bytes (required for the zip translate_eol
             *    option -- not supported here).
             */
            function fill_window(s) {
                var _w_size = s.w_size;
                var p, n, m, more, str;

                //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

                do {
                    more = s.window_size - s.lookahead - s.strstart;

                    // JS ints have 32 bit, block below not needed
                    /* Deal with !@#$% 64K limit: */
                    //if (sizeof(int) <= 2) {
                    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
                    //        more = wsize;
                    //
                    //  } else if (more == (unsigned)(-1)) {
                    //        /* Very unlikely, but possible on 16 bit machine if
                    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
                    //         */
                    //        more--;
                    //    }
                    //}


                    /* If the window is almost full and there is insufficient lookahead,
                     * move the upper half to the lower one to make room in the upper half.
                     */
                    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

                        utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
                        s.match_start -= _w_size;
                        s.strstart -= _w_size;
                        /* we now have strstart >= MAX_DIST */
                        s.block_start -= _w_size;

                        /* Slide the hash table (could be avoided with 32 bit values
                         at the expense of memory usage). We slide even when level == 0
                         to keep the hash table consistent if we switch back to level > 0
                         later. (Using level 0 permanently is not an optimal usage of
                         zlib, so we don't care about this pathological case.)
                         */

                        n = s.hash_size;
                        p = n;
                        do {
                            m = s.head[--p];
                            s.head[p] = (m >= _w_size ? m - _w_size : 0);
                        } while (--n);

                        n = _w_size;
                        p = n;
                        do {
                            m = s.prev[--p];
                            s.prev[p] = (m >= _w_size ? m - _w_size : 0);
                            /* If n is not on any hash chain, prev[n] is garbage but
                             * its value will never be used.
                             */
                        } while (--n);

                        more += _w_size;
                    }
                    if (s.strm.avail_in === 0) {
                        break;
                    }

                    /* If there was no sliding:
                     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
                     *    more == window_size - lookahead - strstart
                     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
                     * => more >= window_size - 2*WSIZE + 2
                     * In the BIG_MEM or MMAP case (not yet supported),
                     *   window_size == input_size + MIN_LOOKAHEAD  &&
                     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
                     * Otherwise, window_size == 2*WSIZE so more >= 2.
                     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
                     */
                    //Assert(more >= 2, "more < 2");
                    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
                    s.lookahead += n;

                    /* Initialize the hash value now that we have some input: */
                    if (s.lookahead + s.insert >= MIN_MATCH) {
                        str = s.strstart - s.insert;
                        s.ins_h = s.window[str];

                        /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
                        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
                        //#if MIN_MATCH != 3
                        //        Call update_hash() MIN_MATCH-3 more times
                        //#endif
                        while (s.insert) {
                            /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
                            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

                            s.prev[str & s.w_mask] = s.head[s.ins_h];
                            s.head[s.ins_h] = str;
                            str++;
                            s.insert--;
                            if (s.lookahead + s.insert < MIN_MATCH) {
                                break;
                            }
                        }
                    }
                    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
                     * but this is not important since only literal bytes will be emitted.
                     */

                } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

                /* If the WIN_INIT bytes after the end of the current data have never been
                 * written, then zero those bytes in order to avoid memory check reports of
                 * the use of uninitialized (or uninitialised as Julian writes) bytes by
                 * the longest match routines.  Update the high water mark for the next
                 * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
                 * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
                 */
                //  if (s.high_water < s.window_size) {
                //    var curr = s.strstart + s.lookahead;
                //    var init = 0;
                //
                //    if (s.high_water < curr) {
                //      /* Previous high water mark below current data -- zero WIN_INIT
                //       * bytes or up to end of window, whichever is less.
                //       */
                //      init = s.window_size - curr;
                //      if (init > WIN_INIT)
                //        init = WIN_INIT;
                //      zmemzero(s->window + curr, (unsigned)init);
                //      s->high_water = curr + init;
                //    }
                //    else if (s->high_water < (ulg)curr + WIN_INIT) {
                //      /* High water mark at or above current data, but below current data
                //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
                //       * to end of window, whichever is less.
                //       */
                //      init = (ulg)curr + WIN_INIT - s->high_water;
                //      if (init > s->window_size - s->high_water)
                //        init = s->window_size - s->high_water;
                //      zmemzero(s->window + s->high_water, (unsigned)init);
                //      s->high_water += init;
                //    }
                //  }
                //
                //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
                //    "not enough room for search");
            }

            /* ===========================================================================
             * Copy without compression as much as possible from the input stream, return
             * the current block state.
             * This function does not insert new strings in the dictionary since
             * uncompressible data is probably not useful. This function is used
             * only for the level=0 compression option.
             * NOTE: this function should be optimized to avoid extra copying from
             * window to pending_buf.
             */
            function deflate_stored(s, flush) {
                /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
                 * to pending_buf_size, and each stored block has a 5 byte header:
                 */
                var max_block_size = 0xffff;

                if (max_block_size > s.pending_buf_size - 5) {
                    max_block_size = s.pending_buf_size - 5;
                }

                /* Copy as much as possible from input to output: */
                for (; ;) {
                    /* Fill the window as much as possible: */
                    if (s.lookahead <= 1) {

                        //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
                        //  s->block_start >= (long)s->w_size, "slide too late");
                        //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
                        //        s.block_start >= s.w_size)) {
                        //        throw  new Error("slide too late");
                        //      }

                        fill_window(s);
                        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }

                        if (s.lookahead === 0) {
                            break;
                        }
                        /* flush the current block */
                    }
                    //Assert(s->block_start >= 0L, "block gone");
                    //    if (s.block_start < 0) throw new Error("block gone");

                    s.strstart += s.lookahead;
                    s.lookahead = 0;

                    /* Emit a stored block if pending_buf will be full: */
                    var max_start = s.block_start + max_block_size;

                    if (s.strstart === 0 || s.strstart >= max_start) {
                        /* strstart == 0 is possible when wraparound on 16-bit machine */
                        s.lookahead = s.strstart - max_start;
                        s.strstart = max_start;
                        /*** FLUSH_BLOCK(s, 0); ***/
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/


                    }
                    /* Flush if we may have to slide, otherwise block_start may become
                     * negative and the data will be gone:
                     */
                    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
                        /*** FLUSH_BLOCK(s, 0); ***/
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }

                s.insert = 0;

                if (flush === Z_FINISH) {
                    /*** FLUSH_BLOCK(s, 1); ***/
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }

                if (s.strstart > s.block_start) {
                    /*** FLUSH_BLOCK(s, 0); ***/
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }

                return BS_NEED_MORE;
            }

            /* ===========================================================================
             * Compress as much as possible from the input stream, return the current
             * block state.
             * This function does not perform lazy evaluation of matches and inserts
             * new strings in the dictionary only for unmatched strings or for short
             * matches. It is used only for the fast compression options.
             */
            function deflate_fast(s, flush) {
                var hash_head;        /* head of the hash chain */
                var bflush;           /* set if current block must be flushed */

                for (; ;) {
                    /* Make sure that we always have enough lookahead, except
                     * at the end of the input file. We need MAX_MATCH bytes
                     * for the next match, plus MIN_MATCH bytes to insert the
                     * string following the next match.
                     */
                    if (s.lookahead < MIN_LOOKAHEAD) {
                        fill_window(s);
                        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }
                        if (s.lookahead === 0) {
                            break; /* flush the current block */
                        }
                    }

                    /* Insert the string window[strstart .. strstart+2] in the
                     * dictionary, and set hash_head to the head of the hash chain:
                     */
                    hash_head = 0/*NIL*/;
                    if (s.lookahead >= MIN_MATCH) {
                        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                        s.head[s.ins_h] = s.strstart;
                        /***/
                    }

                    /* Find the longest match, discarding those <= prev_length.
                     * At this point we have always match_length < MIN_MATCH
                     */
                    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
                        /* To simplify the code, we prevent matches with the string
                         * of window index 0 (in particular we have to avoid a match
                         * of the string with itself at the start of the input file).
                         */
                        s.match_length = longest_match(s, hash_head);
                        /* longest_match() sets match_start */
                    }
                    if (s.match_length >= MIN_MATCH) {
                        // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

                        /*** _tr_tally_dist(s, s.strstart - s.match_start,
                                       s.match_length - MIN_MATCH, bflush); ***/
                        bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

                        s.lookahead -= s.match_length;

                        /* Insert new strings in the hash table only if the match length
                         * is not too large. This saves time but degrades compression.
                         */
                        if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
                            s.match_length--; /* string at strstart already in table */
                            do {
                                s.strstart++;
                                /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                                s.head[s.ins_h] = s.strstart;
                                /***/
                                /* strstart never exceeds WSIZE-MAX_MATCH, so there are
                                 * always MIN_MATCH bytes ahead.
                                 */
                            } while (--s.match_length !== 0);
                            s.strstart++;
                        } else {
                            s.strstart += s.match_length;
                            s.match_length = 0;
                            s.ins_h = s.window[s.strstart];
                            /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
                            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

                            //#if MIN_MATCH != 3
                            //                Call UPDATE_HASH() MIN_MATCH-3 more times
                            //#endif
                            /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
                             * matter since it will be recomputed at next deflate call.
                             */
                        }
                    } else {
                        /* No match, output a literal byte */
                        //Tracevv((stderr,"%c", s.window[s.strstart]));
                        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
                        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

                        s.lookahead--;
                        s.strstart++;
                    }
                    if (bflush) {
                        /*** FLUSH_BLOCK(s, 0); ***/
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }
                s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
                if (flush === Z_FINISH) {
                    /*** FLUSH_BLOCK(s, 1); ***/
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /*** FLUSH_BLOCK(s, 0); ***/
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_BLOCK_DONE;
            }

            /* ===========================================================================
             * Same as above, but achieves better compression. We use a lazy
             * evaluation for matches: a match is finally adopted only if there is
             * no better match at the next window position.
             */
            function deflate_slow(s, flush) {
                var hash_head;          /* head of hash chain */
                var bflush;              /* set if current block must be flushed */

                var max_insert;

                /* Process the input block. */
                for (; ;) {
                    /* Make sure that we always have enough lookahead, except
                     * at the end of the input file. We need MAX_MATCH bytes
                     * for the next match, plus MIN_MATCH bytes to insert the
                     * string following the next match.
                     */
                    if (s.lookahead < MIN_LOOKAHEAD) {
                        fill_window(s);
                        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }
                        if (s.lookahead === 0) { break; } /* flush the current block */
                    }

                    /* Insert the string window[strstart .. strstart+2] in the
                     * dictionary, and set hash_head to the head of the hash chain:
                     */
                    hash_head = 0/*NIL*/;
                    if (s.lookahead >= MIN_MATCH) {
                        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                        s.head[s.ins_h] = s.strstart;
                        /***/
                    }

                    /* Find the longest match, discarding those <= prev_length.
                     */
                    s.prev_length = s.match_length;
                    s.prev_match = s.match_start;
                    s.match_length = MIN_MATCH - 1;

                    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
                        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
                        /* To simplify the code, we prevent matches with the string
                         * of window index 0 (in particular we have to avoid a match
                         * of the string with itself at the start of the input file).
                         */
                        s.match_length = longest_match(s, hash_head);
                        /* longest_match() sets match_start */

                        if (s.match_length <= 5 &&
                           (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

                            /* If prev_match is also MIN_MATCH, match_start is garbage
                             * but we will ignore the current match anyway.
                             */
                            s.match_length = MIN_MATCH - 1;
                        }
                    }
                    /* If there was a match at the previous step and the current
                     * match is not better, output the previous match:
                     */
                    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
                        max_insert = s.strstart + s.lookahead - MIN_MATCH;
                        /* Do not insert strings in hash table beyond this. */

                        //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

                        /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                                       s.prev_length - MIN_MATCH, bflush);***/
                        bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
                        /* Insert in hash table all strings up to the end of the match.
                         * strstart-1 and strstart are already inserted. If there is not
                         * enough lookahead, the last two strings are not inserted in
                         * the hash table.
                         */
                        s.lookahead -= s.prev_length - 1;
                        s.prev_length -= 2;
                        do {
                            if (++s.strstart <= max_insert) {
                                /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                                s.head[s.ins_h] = s.strstart;
                                /***/
                            }
                        } while (--s.prev_length !== 0);
                        s.match_available = 0;
                        s.match_length = MIN_MATCH - 1;
                        s.strstart++;

                        if (bflush) {
                            /*** FLUSH_BLOCK(s, 0); ***/
                            flush_block_only(s, false);
                            if (s.strm.avail_out === 0) {
                                return BS_NEED_MORE;
                            }
                            /***/
                        }

                    } else if (s.match_available) {
                        /* If there was no match at the previous position, output a
                         * single literal. If there was a match but the current match
                         * is longer, truncate the previous match to a single literal.
                         */
                        //Tracevv((stderr,"%c", s->window[s->strstart-1]));
                        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
                        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

                        if (bflush) {
                            /*** FLUSH_BLOCK_ONLY(s, 0) ***/
                            flush_block_only(s, false);
                            /***/
                        }
                        s.strstart++;
                        s.lookahead--;
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                    } else {
                        /* There is no previous match to compare with, wait for
                         * the next step to decide.
                         */
                        s.match_available = 1;
                        s.strstart++;
                        s.lookahead--;
                    }
                }
                //Assert (flush != Z_NO_FLUSH, "no flush?");
                if (s.match_available) {
                    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
                    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
                    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

                    s.match_available = 0;
                }
                s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
                if (flush === Z_FINISH) {
                    /*** FLUSH_BLOCK(s, 1); ***/
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /*** FLUSH_BLOCK(s, 0); ***/
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }

                return BS_BLOCK_DONE;
            }


            /* ===========================================================================
             * For Z_RLE, simply look for runs of bytes, generate matches only of distance
             * one.  Do not maintain a hash table.  (It will be regenerated if this run of
             * deflate switches away from Z_RLE.)
             */
            function deflate_rle(s, flush) {
                var bflush;            /* set if current block must be flushed */
                var prev;              /* byte at distance one to match */
                var scan, strend;      /* scan goes up to strend for length of run */

                var _win = s.window;

                for (; ;) {
                    /* Make sure that we always have enough lookahead, except
                     * at the end of the input file. We need MAX_MATCH bytes
                     * for the longest run, plus one for the unrolled loop.
                     */
                    if (s.lookahead <= MAX_MATCH) {
                        fill_window(s);
                        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }
                        if (s.lookahead === 0) { break; } /* flush the current block */
                    }

                    /* See how many times the previous byte repeats */
                    s.match_length = 0;
                    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
                        scan = s.strstart - 1;
                        prev = _win[scan];
                        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
                            strend = s.strstart + MAX_MATCH;
                            do {
                                /*jshint noempty:false*/
                            } while (prev === _win[++scan] && prev === _win[++scan] &&
                                     prev === _win[++scan] && prev === _win[++scan] &&
                                     prev === _win[++scan] && prev === _win[++scan] &&
                                     prev === _win[++scan] && prev === _win[++scan] &&
                                     scan < strend);
                            s.match_length = MAX_MATCH - (strend - scan);
                            if (s.match_length > s.lookahead) {
                                s.match_length = s.lookahead;
                            }
                        }
                        //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
                    }

                    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
                    if (s.match_length >= MIN_MATCH) {
                        //check_match(s, s.strstart, s.strstart - 1, s.match_length);

                        /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
                        bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

                        s.lookahead -= s.match_length;
                        s.strstart += s.match_length;
                        s.match_length = 0;
                    } else {
                        /* No match, output a literal byte */
                        //Tracevv((stderr,"%c", s->window[s->strstart]));
                        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
                        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

                        s.lookahead--;
                        s.strstart++;
                    }
                    if (bflush) {
                        /*** FLUSH_BLOCK(s, 0); ***/
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }
                s.insert = 0;
                if (flush === Z_FINISH) {
                    /*** FLUSH_BLOCK(s, 1); ***/
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /*** FLUSH_BLOCK(s, 0); ***/
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_BLOCK_DONE;
            }

            /* ===========================================================================
             * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
             * (It will be regenerated if this run of deflate switches away from Huffman.)
             */
            function deflate_huff(s, flush) {
                var bflush;             /* set if current block must be flushed */

                for (; ;) {
                    /* Make sure that we have a literal to write. */
                    if (s.lookahead === 0) {
                        fill_window(s);
                        if (s.lookahead === 0) {
                            if (flush === Z_NO_FLUSH) {
                                return BS_NEED_MORE;
                            }
                            break;      /* flush the current block */
                        }
                    }

                    /* Output a literal byte */
                    s.match_length = 0;
                    //Tracevv((stderr,"%c", s->window[s->strstart]));
                    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
                    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                    s.lookahead--;
                    s.strstart++;
                    if (bflush) {
                        /*** FLUSH_BLOCK(s, 0); ***/
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }
                s.insert = 0;
                if (flush === Z_FINISH) {
                    /*** FLUSH_BLOCK(s, 1); ***/
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /*** FLUSH_BLOCK(s, 0); ***/
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_BLOCK_DONE;
            }

            /* Values for max_lazy_match, good_match and max_chain_length, depending on
             * the desired pack level (0..9). The values given below have been tuned to
             * exclude worst case performance for pathological files. Better values may be
             * found for specific files.
             */
            function Config(good_length, max_lazy, nice_length, max_chain, func) {
                this.good_length = good_length;
                this.max_lazy = max_lazy;
                this.nice_length = nice_length;
                this.max_chain = max_chain;
                this.func = func;
            }

            var configuration_table;

            configuration_table = [
              /*      good lazy nice chain */
              new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
              new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
              new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
              new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

              new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
              new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
              new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
              new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
              new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
              new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
            ];


            /* ===========================================================================
             * Initialize the "longest match" routines for a new zlib stream
             */
            function lm_init(s) {
                s.window_size = 2 * s.w_size;

                /*** CLEAR_HASH(s); ***/
                zero(s.head); // Fill with NIL (= 0);

                /* Set the default configuration parameters:
                 */
                s.max_lazy_match = configuration_table[s.level].max_lazy;
                s.good_match = configuration_table[s.level].good_length;
                s.nice_match = configuration_table[s.level].nice_length;
                s.max_chain_length = configuration_table[s.level].max_chain;

                s.strstart = 0;
                s.block_start = 0;
                s.lookahead = 0;
                s.insert = 0;
                s.match_length = s.prev_length = MIN_MATCH - 1;
                s.match_available = 0;
                s.ins_h = 0;
            }


            function DeflateState() {
                this.strm = null;            /* pointer back to this zlib stream */
                this.status = 0;            /* as the name implies */
                this.pending_buf = null;      /* output still pending */
                this.pending_buf_size = 0;  /* size of pending_buf */
                this.pending_out = 0;       /* next pending byte to output to the stream */
                this.pending = 0;           /* nb of bytes in the pending buffer */
                this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
                this.gzhead = null;         /* gzip header information to write */
                this.gzindex = 0;           /* where in extra, name, or comment */
                this.method = Z_DEFLATED; /* can only be DEFLATED */
                this.last_flush = -1;   /* value of flush param for previous deflate call */

                this.w_size = 0;  /* LZ77 window size (32K by default) */
                this.w_bits = 0;  /* log2(w_size)  (8..16) */
                this.w_mask = 0;  /* w_size - 1 */

                this.window = null;
                /* Sliding window. Input bytes are read into the second half of the window,
                 * and move to the first half later to keep a dictionary of at least wSize
                 * bytes. With this organization, matches are limited to a distance of
                 * wSize-MAX_MATCH bytes, but this ensures that IO is always
                 * performed with a length multiple of the block size.
                 */

                this.window_size = 0;
                /* Actual size of window: 2*wSize, except when the user input buffer
                 * is directly used as sliding window.
                 */

                this.prev = null;
                /* Link to older string with same hash index. To limit the size of this
                 * array to 64K, this link is maintained only for the last 32K strings.
                 * An index in this array is thus a window index modulo 32K.
                 */

                this.head = null;   /* Heads of the hash chains or NIL. */

                this.ins_h = 0;       /* hash index of string to be inserted */
                this.hash_size = 0;   /* number of elements in hash table */
                this.hash_bits = 0;   /* log2(hash_size) */
                this.hash_mask = 0;   /* hash_size-1 */

                this.hash_shift = 0;
                /* Number of bits by which ins_h must be shifted at each input
                 * step. It must be such that after MIN_MATCH steps, the oldest
                 * byte no longer takes part in the hash key, that is:
                 *   hash_shift * MIN_MATCH >= hash_bits
                 */

                this.block_start = 0;
                /* Window position at the beginning of the current output block. Gets
                 * negative when the window is moved backwards.
                 */

                this.match_length = 0;      /* length of best match */
                this.prev_match = 0;        /* previous match */
                this.match_available = 0;   /* set if previous match exists */
                this.strstart = 0;          /* start of string to insert */
                this.match_start = 0;       /* start of matching string */
                this.lookahead = 0;         /* number of valid bytes ahead in window */

                this.prev_length = 0;
                /* Length of the best match at previous step. Matches not greater than this
                 * are discarded. This is used in the lazy match evaluation.
                 */

                this.max_chain_length = 0;
                /* To speed up deflation, hash chains are never searched beyond this
                 * length.  A higher limit improves compression ratio but degrades the
                 * speed.
                 */

                this.max_lazy_match = 0;
                /* Attempt to find a better match only when the current match is strictly
                 * smaller than this value. This mechanism is used only for compression
                 * levels >= 4.
                 */
                // That's alias to max_lazy_match, don't use directly
                //this.max_insert_length = 0;
                /* Insert new strings in the hash table only if the match length is not
                 * greater than this length. This saves time but degrades compression.
                 * max_insert_length is used only for compression levels <= 3.
                 */

                this.level = 0;     /* compression level (1..9) */
                this.strategy = 0;  /* favor or force Huffman coding*/

                this.good_match = 0;
                /* Use a faster search when the previous match is longer than this */

                this.nice_match = 0; /* Stop searching when current match exceeds this */

                /* used by trees.c: */

                /* Didn't use ct_data typedef below to suppress compiler warning */

                // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
                // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
                // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

                // Use flat array of DOUBLE size, with interleaved fata,
                // because JS does not support effective
                this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
                this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
                this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
                zero(this.dyn_ltree);
                zero(this.dyn_dtree);
                zero(this.bl_tree);

                this.l_desc = null;         /* desc. for literal tree */
                this.d_desc = null;         /* desc. for distance tree */
                this.bl_desc = null;         /* desc. for bit length tree */

                //ush bl_count[MAX_BITS+1];
                this.bl_count = new utils.Buf16(MAX_BITS + 1);
                /* number of codes at each bit length for an optimal tree */

                //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
                this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
                zero(this.heap);

                this.heap_len = 0;               /* number of elements in the heap */
                this.heap_max = 0;               /* element of largest frequency */
                /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
                 * The same heap array is used to build all trees.
                 */

                this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
                zero(this.depth);
                /* Depth of each subtree used as tie breaker for trees of equal frequency
                 */

                this.l_buf = 0;          /* buffer index for literals or lengths */

                this.lit_bufsize = 0;
                /* Size of match buffer for literals/lengths.  There are 4 reasons for
                 * limiting lit_bufsize to 64K:
                 *   - frequencies can be kept in 16 bit counters
                 *   - if compression is not successful for the first block, all input
                 *     data is still in the window so we can still emit a stored block even
                 *     when input comes from standard input.  (This can also be done for
                 *     all blocks if lit_bufsize is not greater than 32K.)
                 *   - if compression is not successful for a file smaller than 64K, we can
                 *     even emit a stored file instead of a stored block (saving 5 bytes).
                 *     This is applicable only for zip (not gzip or zlib).
                 *   - creating new Huffman trees less frequently may not provide fast
                 *     adaptation to changes in the input data statistics. (Take for
                 *     example a binary file with poorly compressible code followed by
                 *     a highly compressible string table.) Smaller buffer sizes give
                 *     fast adaptation but have of course the overhead of transmitting
                 *     trees more frequently.
                 *   - I can't count above 4
                 */

                this.last_lit = 0;      /* running index in l_buf */

                this.d_buf = 0;
                /* Buffer index for distances. To simplify the code, d_buf and l_buf have
                 * the same number of elements. To use different lengths, an extra flag
                 * array would be necessary.
                 */

                this.opt_len = 0;       /* bit length of current block with optimal trees */
                this.static_len = 0;    /* bit length of current block with static trees */
                this.matches = 0;       /* number of string matches in current block */
                this.insert = 0;        /* bytes at end of window left to insert */


                this.bi_buf = 0;
                /* Output buffer. bits are inserted starting at the bottom (least
                 * significant bits).
                 */
                this.bi_valid = 0;
                /* Number of valid bits in bi_buf.  All bits above the last valid bit
                 * are always zero.
                 */

                // Used for window memory init. We safely ignore it for JS. That makes
                // sense only for pointers and memory check tools.
                //this.high_water = 0;
                /* High water mark offset in window for initialized bytes -- bytes above
                 * this are set to zero in order to avoid memory check warnings when
                 * longest match routines access bytes past the input.  This is then
                 * updated to the new high water mark.
                 */
            }


            function deflateResetKeep(strm) {
                var s;

                if (!strm || !strm.state) {
                    return err(strm, Z_STREAM_ERROR);
                }

                strm.total_in = strm.total_out = 0;
                strm.data_type = Z_UNKNOWN;

                s = strm.state;
                s.pending = 0;
                s.pending_out = 0;

                if (s.wrap < 0) {
                    s.wrap = -s.wrap;
                    /* was made negative by deflate(..., Z_FINISH); */
                }
                s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
                strm.adler = (s.wrap === 2) ?
                  0  // crc32(0, Z_NULL, 0)
                :
                  1; // adler32(0, Z_NULL, 0)
                s.last_flush = Z_NO_FLUSH;
                trees._tr_init(s);
                return Z_OK;
            }


            function deflateReset(strm) {
                var ret = deflateResetKeep(strm);
                if (ret === Z_OK) {
                    lm_init(strm.state);
                }
                return ret;
            }


            function deflateSetHeader(strm, head) {
                if (!strm || !strm.state) { return Z_STREAM_ERROR; }
                if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
                strm.state.gzhead = head;
                return Z_OK;
            }


            function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
                if (!strm) { // === Z_NULL
                    return Z_STREAM_ERROR;
                }
                var wrap = 1;

                if (level === Z_DEFAULT_COMPRESSION) {
                    level = 6;
                }

                if (windowBits < 0) { /* suppress zlib wrapper */
                    wrap = 0;
                    windowBits = -windowBits;
                }

                else if (windowBits > 15) {
                    wrap = 2;           /* write gzip wrapper instead */
                    windowBits -= 16;
                }


                if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
                  windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
                  strategy < 0 || strategy > Z_FIXED) {
                    return err(strm, Z_STREAM_ERROR);
                }


                if (windowBits === 8) {
                    windowBits = 9;
                }
                /* until 256-byte window bug fixed */

                var s = new DeflateState();

                strm.state = s;
                s.strm = strm;

                s.wrap = wrap;
                s.gzhead = null;
                s.w_bits = windowBits;
                s.w_size = 1 << s.w_bits;
                s.w_mask = s.w_size - 1;

                s.hash_bits = memLevel + 7;
                s.hash_size = 1 << s.hash_bits;
                s.hash_mask = s.hash_size - 1;
                s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

                s.window = new utils.Buf8(s.w_size * 2);
                s.head = new utils.Buf16(s.hash_size);
                s.prev = new utils.Buf16(s.w_size);

                // Don't need mem init magic for JS.
                //s.high_water = 0;  /* nothing written to s->window yet */

                s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

                s.pending_buf_size = s.lit_bufsize * 4;

                //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
                //s->pending_buf = (uchf *) overlay;
                s.pending_buf = new utils.Buf8(s.pending_buf_size);

                // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
                //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
                s.d_buf = 1 * s.lit_bufsize;

                //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
                s.l_buf = (1 + 2) * s.lit_bufsize;

                s.level = level;
                s.strategy = strategy;
                s.method = method;

                return deflateReset(strm);
            }

            function deflateInit(strm, level) {
                return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
            }


            function deflate(strm, flush) {
                var old_flush, s;
                var beg, val; // for gzip header write only

                if (!strm || !strm.state ||
                  flush > Z_BLOCK || flush < 0) {
                    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
                }

                s = strm.state;

                if (!strm.output ||
                    (!strm.input && strm.avail_in !== 0) ||
                    (s.status === FINISH_STATE && flush !== Z_FINISH)) {
                    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
                }

                s.strm = strm; /* just in case */
                old_flush = s.last_flush;
                s.last_flush = flush;

                /* Write the header */
                if (s.status === INIT_STATE) {

                    if (s.wrap === 2) { // GZIP header
                        strm.adler = 0;  //crc32(0L, Z_NULL, 0);
                        put_byte(s, 31);
                        put_byte(s, 139);
                        put_byte(s, 8);
                        if (!s.gzhead) { // s->gzhead == Z_NULL
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, s.level === 9 ? 2 :
                                        (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                                         4 : 0));
                            put_byte(s, OS_CODE);
                            s.status = BUSY_STATE;
                        }
                        else {
                            put_byte(s, (s.gzhead.text ? 1 : 0) +
                                        (s.gzhead.hcrc ? 2 : 0) +
                                        (!s.gzhead.extra ? 0 : 4) +
                                        (!s.gzhead.name ? 0 : 8) +
                                        (!s.gzhead.comment ? 0 : 16)
                                    );
                            put_byte(s, s.gzhead.time & 0xff);
                            put_byte(s, (s.gzhead.time >> 8) & 0xff);
                            put_byte(s, (s.gzhead.time >> 16) & 0xff);
                            put_byte(s, (s.gzhead.time >> 24) & 0xff);
                            put_byte(s, s.level === 9 ? 2 :
                                        (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                                         4 : 0));
                            put_byte(s, s.gzhead.os & 0xff);
                            if (s.gzhead.extra && s.gzhead.extra.length) {
                                put_byte(s, s.gzhead.extra.length & 0xff);
                                put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
                            }
                            if (s.gzhead.hcrc) {
                                strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
                            }
                            s.gzindex = 0;
                            s.status = EXTRA_STATE;
                        }
                    }
                    else // DEFLATE header
                    {
                        var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
                        var level_flags = -1;

                        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
                            level_flags = 0;
                        } else if (s.level < 6) {
                            level_flags = 1;
                        } else if (s.level === 6) {
                            level_flags = 2;
                        } else {
                            level_flags = 3;
                        }
                        header |= (level_flags << 6);
                        if (s.strstart !== 0) { header |= PRESET_DICT; }
                        header += 31 - (header % 31);

                        s.status = BUSY_STATE;
                        putShortMSB(s, header);

                        /* Save the adler32 of the preset dictionary: */
                        if (s.strstart !== 0) {
                            putShortMSB(s, strm.adler >>> 16);
                            putShortMSB(s, strm.adler & 0xffff);
                        }
                        strm.adler = 1; // adler32(0L, Z_NULL, 0);
                    }
                }

                //#ifdef GZIP
                if (s.status === EXTRA_STATE) {
                    if (s.gzhead.extra/* != Z_NULL*/) {
                        beg = s.pending;  /* start of bytes to update crc */

                        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
                            if (s.pending === s.pending_buf_size) {
                                if (s.gzhead.hcrc && s.pending > beg) {
                                    strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                                }
                                flush_pending(strm);
                                beg = s.pending;
                                if (s.pending === s.pending_buf_size) {
                                    break;
                                }
                            }
                            put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
                            s.gzindex++;
                        }
                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        if (s.gzindex === s.gzhead.extra.length) {
                            s.gzindex = 0;
                            s.status = NAME_STATE;
                        }
                    }
                    else {
                        s.status = NAME_STATE;
                    }
                }
                if (s.status === NAME_STATE) {
                    if (s.gzhead.name/* != Z_NULL*/) {
                        beg = s.pending;  /* start of bytes to update crc */
                        //int val;

                        do {
                            if (s.pending === s.pending_buf_size) {
                                if (s.gzhead.hcrc && s.pending > beg) {
                                    strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                                }
                                flush_pending(strm);
                                beg = s.pending;
                                if (s.pending === s.pending_buf_size) {
                                    val = 1;
                                    break;
                                }
                            }
                            // JS specific: little magic to add zero terminator to end of string
                            if (s.gzindex < s.gzhead.name.length) {
                                val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
                            } else {
                                val = 0;
                            }
                            put_byte(s, val);
                        } while (val !== 0);

                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        if (val === 0) {
                            s.gzindex = 0;
                            s.status = COMMENT_STATE;
                        }
                    }
                    else {
                        s.status = COMMENT_STATE;
                    }
                }
                if (s.status === COMMENT_STATE) {
                    if (s.gzhead.comment/* != Z_NULL*/) {
                        beg = s.pending;  /* start of bytes to update crc */
                        //int val;

                        do {
                            if (s.pending === s.pending_buf_size) {
                                if (s.gzhead.hcrc && s.pending > beg) {
                                    strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                                }
                                flush_pending(strm);
                                beg = s.pending;
                                if (s.pending === s.pending_buf_size) {
                                    val = 1;
                                    break;
                                }
                            }
                            // JS specific: little magic to add zero terminator to end of string
                            if (s.gzindex < s.gzhead.comment.length) {
                                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
                            } else {
                                val = 0;
                            }
                            put_byte(s, val);
                        } while (val !== 0);

                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        if (val === 0) {
                            s.status = HCRC_STATE;
                        }
                    }
                    else {
                        s.status = HCRC_STATE;
                    }
                }
                if (s.status === HCRC_STATE) {
                    if (s.gzhead.hcrc) {
                        if (s.pending + 2 > s.pending_buf_size) {
                            flush_pending(strm);
                        }
                        if (s.pending + 2 <= s.pending_buf_size) {
                            put_byte(s, strm.adler & 0xff);
                            put_byte(s, (strm.adler >> 8) & 0xff);
                            strm.adler = 0; //crc32(0L, Z_NULL, 0);
                            s.status = BUSY_STATE;
                        }
                    }
                    else {
                        s.status = BUSY_STATE;
                    }
                }
                //#endif

                /* Flush as much pending output as possible */
                if (s.pending !== 0) {
                    flush_pending(strm);
                    if (strm.avail_out === 0) {
                        /* Since avail_out is 0, deflate will be called again with
                         * more output space, but possibly with both pending and
                         * avail_in equal to zero. There won't be anything to do,
                         * but this is not an error situation so make sure we
                         * return OK instead of BUF_ERROR at next call of deflate:
                         */
                        s.last_flush = -1;
                        return Z_OK;
                    }

                    /* Make sure there is something to do and avoid duplicate consecutive
                     * flushes. For repeated and useless calls with Z_FINISH, we keep
                     * returning Z_STREAM_END instead of Z_BUF_ERROR.
                     */
                } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
                  flush !== Z_FINISH) {
                    return err(strm, Z_BUF_ERROR);
                }

                /* User must not provide more input after the first FINISH: */
                if (s.status === FINISH_STATE && strm.avail_in !== 0) {
                    return err(strm, Z_BUF_ERROR);
                }

                /* Start a new block or continue the current one.
                 */
                if (strm.avail_in !== 0 || s.lookahead !== 0 ||
                  (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
                    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
                      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
                        configuration_table[s.level].func(s, flush));

                    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
                        s.status = FINISH_STATE;
                    }
                    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
                        if (strm.avail_out === 0) {
                            s.last_flush = -1;
                            /* avoid BUF_ERROR next call, see above */
                        }
                        return Z_OK;
                        /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
                         * of deflate should use the same flush parameter to make sure
                         * that the flush is complete. So we don't have to output an
                         * empty block here, this will be done at next call. This also
                         * ensures that for a very small output buffer, we emit at most
                         * one empty block.
                         */
                    }
                    if (bstate === BS_BLOCK_DONE) {
                        if (flush === Z_PARTIAL_FLUSH) {
                            trees._tr_align(s);
                        }
                        else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

                            trees._tr_stored_block(s, 0, 0, false);
                            /* For a full flush, this empty block will be recognized
                             * as a special marker by inflate_sync().
                             */
                            if (flush === Z_FULL_FLUSH) {
                                /*** CLEAR_HASH(s); ***/             /* forget history */
                                zero(s.head); // Fill with NIL (= 0);

                                if (s.lookahead === 0) {
                                    s.strstart = 0;
                                    s.block_start = 0;
                                    s.insert = 0;
                                }
                            }
                        }
                        flush_pending(strm);
                        if (strm.avail_out === 0) {
                            s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
                            return Z_OK;
                        }
                    }
                }
                //Assert(strm->avail_out > 0, "bug2");
                //if (strm.avail_out <= 0) { throw new Error("bug2");}

                if (flush !== Z_FINISH) { return Z_OK; }
                if (s.wrap <= 0) { return Z_STREAM_END; }

                /* Write the trailer */
                if (s.wrap === 2) {
                    put_byte(s, strm.adler & 0xff);
                    put_byte(s, (strm.adler >> 8) & 0xff);
                    put_byte(s, (strm.adler >> 16) & 0xff);
                    put_byte(s, (strm.adler >> 24) & 0xff);
                    put_byte(s, strm.total_in & 0xff);
                    put_byte(s, (strm.total_in >> 8) & 0xff);
                    put_byte(s, (strm.total_in >> 16) & 0xff);
                    put_byte(s, (strm.total_in >> 24) & 0xff);
                }
                else {
                    putShortMSB(s, strm.adler >>> 16);
                    putShortMSB(s, strm.adler & 0xffff);
                }

                flush_pending(strm);
                /* If avail_out is zero, the application will call deflate again
                 * to flush the rest.
                 */
                if (s.wrap > 0) { s.wrap = -s.wrap; }
                /* write the trailer only once! */
                return s.pending !== 0 ? Z_OK : Z_STREAM_END;
            }

            function deflateEnd(strm) {
                var status;

                if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
                    return Z_STREAM_ERROR;
                }

                status = strm.state.status;
                if (status !== INIT_STATE &&
                  status !== EXTRA_STATE &&
                  status !== NAME_STATE &&
                  status !== COMMENT_STATE &&
                  status !== HCRC_STATE &&
                  status !== BUSY_STATE &&
                  status !== FINISH_STATE
                ) {
                    return err(strm, Z_STREAM_ERROR);
                }

                strm.state = null;

                return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
            }


            /* =========================================================================
             * Initializes the compression dictionary from the given byte
             * sequence without producing any compressed output.
             */
            function deflateSetDictionary(strm, dictionary) {
                var dictLength = dictionary.length;

                var s;
                var str, n;
                var wrap;
                var avail;
                var next;
                var input;
                var tmpDict;

                if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
                    return Z_STREAM_ERROR;
                }

                s = strm.state;
                wrap = s.wrap;

                if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
                    return Z_STREAM_ERROR;
                }

                /* when using zlib wrappers, compute Adler-32 for provided dictionary */
                if (wrap === 1) {
                    /* adler32(strm->adler, dictionary, dictLength); */
                    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
                }

                s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

                /* if dictionary would fill window, just replace the history */
                if (dictLength >= s.w_size) {
                    if (wrap === 0) {            /* already empty otherwise */
                        /*** CLEAR_HASH(s); ***/
                        zero(s.head); // Fill with NIL (= 0);
                        s.strstart = 0;
                        s.block_start = 0;
                        s.insert = 0;
                    }
                    /* use the tail */
                    // dictionary = dictionary.slice(dictLength - s.w_size);
                    tmpDict = new utils.Buf8(s.w_size);
                    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
                    dictionary = tmpDict;
                    dictLength = s.w_size;
                }
                /* insert dictionary into window and hash */
                avail = strm.avail_in;
                next = strm.next_in;
                input = strm.input;
                strm.avail_in = dictLength;
                strm.next_in = 0;
                strm.input = dictionary;
                fill_window(s);
                while (s.lookahead >= MIN_MATCH) {
                    str = s.strstart;
                    n = s.lookahead - (MIN_MATCH - 1);
                    do {
                        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
                        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

                        s.prev[str & s.w_mask] = s.head[s.ins_h];

                        s.head[s.ins_h] = str;
                        str++;
                    } while (--n);
                    s.strstart = str;
                    s.lookahead = MIN_MATCH - 1;
                    fill_window(s);
                }
                s.strstart += s.lookahead;
                s.block_start = s.strstart;
                s.insert = s.lookahead;
                s.lookahead = 0;
                s.match_length = s.prev_length = MIN_MATCH - 1;
                s.match_available = 0;
                strm.next_in = next;
                strm.input = input;
                strm.avail_in = avail;
                s.wrap = wrap;
                return Z_OK;
            }


            exports.deflateInit = deflateInit;
            exports.deflateInit2 = deflateInit2;
            exports.deflateReset = deflateReset;
            exports.deflateResetKeep = deflateResetKeep;
            exports.deflateSetHeader = deflateSetHeader;
            exports.deflate = deflate;
            exports.deflateEnd = deflateEnd;
            exports.deflateSetDictionary = deflateSetDictionary;
            exports.deflateInfo = 'pako deflate (from Nodeca project)';

            /* Not implemented
            exports.deflateBound = deflateBound;
            exports.deflateCopy = deflateCopy;
            exports.deflateParams = deflateParams;
            exports.deflatePending = deflatePending;
            exports.deflatePrime = deflatePrime;
            exports.deflateTune = deflateTune;
            */

        }, { "../utils/common": 62, "./adler32": 64, "./crc32": 66, "./messages": 72, "./trees": 73 }], 68: [function (require, module, exports) {
            'use strict';


            function GZheader() {
                /* true if compressed data believed to be text */
                this.text = 0;
                /* modification time */
                this.time = 0;
                /* extra flags (not used when writing a gzip file) */
                this.xflags = 0;
                /* operating system */
                this.os = 0;
                /* pointer to extra field or Z_NULL if none */
                this.extra = null;
                /* extra field length (valid if extra != Z_NULL) */
                this.extra_len = 0; // Actually, we don't need it in JS,
                // but leave for few code modifications

                //
                // Setup limits is not necessary because in js we should not preallocate memory
                // for inflate use constant limit in 65536 bytes
                //

                /* space at extra (only when reading header) */
                // this.extra_max  = 0;
                /* pointer to zero-terminated file name or Z_NULL */
                this.name = '';
                /* space at name (only when reading header) */
                // this.name_max   = 0;
                /* pointer to zero-terminated comment or Z_NULL */
                this.comment = '';
                /* space at comment (only when reading header) */
                // this.comm_max   = 0;
                /* true if there was or will be a header crc */
                this.hcrc = 0;
                /* true when done reading gzip header (not used when writing a gzip file) */
                this.done = false;
            }

            module.exports = GZheader;

        }, {}], 69: [function (require, module, exports) {
            'use strict';

            // See state defs from inflate.js
            var BAD = 30;       /* got a data error -- remain here until reset */
            var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

            /*
               Decode literal, length, and distance codes and write out the resulting
               literal and match bytes until either not enough input or output is
               available, an end-of-block is encountered, or a data error is encountered.
               When large enough input and output buffers are supplied to inflate(), for
               example, a 16K input buffer and a 64K output buffer, more than 95% of the
               inflate execution time is spent in this routine.
            
               Entry assumptions:
            
                    state.mode === LEN
                    strm.avail_in >= 6
                    strm.avail_out >= 258
                    start >= strm.avail_out
                    state.bits < 8
            
               On return, state.mode is one of:
            
                    LEN -- ran out of enough output space or enough available input
                    TYPE -- reached end of block code, inflate() to interpret next block
                    BAD -- error in block data
            
               Notes:
            
                - The maximum input bits used by a length/distance pair is 15 bits for the
                  length code, 5 bits for the length extra, 15 bits for the distance code,
                  and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
                  Therefore if strm.avail_in >= 6, then there is enough input to avoid
                  checking for available input while decoding.
            
                - The maximum bytes that a single length/distance pair can output is 258
                  bytes, which is the maximum length that can be coded.  inflate_fast()
                  requires strm.avail_out >= 258 for each loop to avoid checking for
                  output space.
             */
            module.exports = function inflate_fast(strm, start) {
                var state;
                var _in;                    /* local strm.input */
                var last;                   /* have enough input while in < last */
                var _out;                   /* local strm.output */
                var beg;                    /* inflate()'s initial strm.output */
                var end;                    /* while out < end, enough space available */
                //#ifdef INFLATE_STRICT
                var dmax;                   /* maximum distance from zlib header */
                //#endif
                var wsize;                  /* window size or zero if not using window */
                var whave;                  /* valid bytes in the window */
                var wnext;                  /* window write index */
                // Use `s_window` instead `window`, avoid conflict with instrumentation tools
                var s_window;               /* allocated sliding window, if wsize != 0 */
                var hold;                   /* local strm.hold */
                var bits;                   /* local strm.bits */
                var lcode;                  /* local strm.lencode */
                var dcode;                  /* local strm.distcode */
                var lmask;                  /* mask for first level of length codes */
                var dmask;                  /* mask for first level of distance codes */
                var here;                   /* retrieved table entry */
                var op;                     /* code bits, operation, extra bits, or */
                /*  window position, window bytes to copy */
                var len;                    /* match length, unused bytes */
                var dist;                   /* match distance */
                var from;                   /* where to copy match from */
                var from_source;


                var input, output; // JS specific, because we have no pointers

                /* copy state to local variables */
                state = strm.state;
                //here = state.here;
                _in = strm.next_in;
                input = strm.input;
                last = _in + (strm.avail_in - 5);
                _out = strm.next_out;
                output = strm.output;
                beg = _out - (start - strm.avail_out);
                end = _out + (strm.avail_out - 257);
                //#ifdef INFLATE_STRICT
                dmax = state.dmax;
                //#endif
                wsize = state.wsize;
                whave = state.whave;
                wnext = state.wnext;
                s_window = state.window;
                hold = state.hold;
                bits = state.bits;
                lcode = state.lencode;
                dcode = state.distcode;
                lmask = (1 << state.lenbits) - 1;
                dmask = (1 << state.distbits) - 1;


                /* decode literals and length/distances until end-of-block or not enough
                   input data or output space */

                top:
                    do {
                        if (bits < 15) {
                            hold += input[_in++] << bits;
                            bits += 8;
                            hold += input[_in++] << bits;
                            bits += 8;
                        }

                        here = lcode[hold & lmask];

                        dolen:
                            for (; ;) { // Goto emulation
                                op = here >>> 24/*here.bits*/;
                                hold >>>= op;
                                bits -= op;
                                op = (here >>> 16) & 0xff/*here.op*/;
                                if (op === 0) {                          /* literal */
                                    //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
                                    //        "inflate:         literal '%c'\n" :
                                    //        "inflate:         literal 0x%02x\n", here.val));
                                    output[_out++] = here & 0xffff/*here.val*/;
                                }
                                else if (op & 16) {                     /* length base */
                                    len = here & 0xffff/*here.val*/;
                                    op &= 15;                           /* number of extra bits */
                                    if (op) {
                                        if (bits < op) {
                                            hold += input[_in++] << bits;
                                            bits += 8;
                                        }
                                        len += hold & ((1 << op) - 1);
                                        hold >>>= op;
                                        bits -= op;
                                    }
                                    //Tracevv((stderr, "inflate:         length %u\n", len));
                                    if (bits < 15) {
                                        hold += input[_in++] << bits;
                                        bits += 8;
                                        hold += input[_in++] << bits;
                                        bits += 8;
                                    }
                                    here = dcode[hold & dmask];

                                    dodist:
                                        for (; ;) { // goto emulation
                                            op = here >>> 24/*here.bits*/;
                                            hold >>>= op;
                                            bits -= op;
                                            op = (here >>> 16) & 0xff/*here.op*/;

                                            if (op & 16) {                      /* distance base */
                                                dist = here & 0xffff/*here.val*/;
                                                op &= 15;                       /* number of extra bits */
                                                if (bits < op) {
                                                    hold += input[_in++] << bits;
                                                    bits += 8;
                                                    if (bits < op) {
                                                        hold += input[_in++] << bits;
                                                        bits += 8;
                                                    }
                                                }
                                                dist += hold & ((1 << op) - 1);
                                                //#ifdef INFLATE_STRICT
                                                if (dist > dmax) {
                                                    strm.msg = 'invalid distance too far back';
                                                    state.mode = BAD;
                                                    break top;
                                                }
                                                //#endif
                                                hold >>>= op;
                                                bits -= op;
                                                //Tracevv((stderr, "inflate:         distance %u\n", dist));
                                                op = _out - beg;                /* max distance in output */
                                                if (dist > op) {                /* see if copy from window */
                                                    op = dist - op;               /* distance back in window */
                                                    if (op > whave) {
                                                        if (state.sane) {
                                                            strm.msg = 'invalid distance too far back';
                                                            state.mode = BAD;
                                                            break top;
                                                        }

                                                        // (!) This block is disabled in zlib defailts,
                                                        // don't enable it for binary compatibility
                                                        //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                                                        //                if (len <= op - whave) {
                                                        //                  do {
                                                        //                    output[_out++] = 0;
                                                        //                  } while (--len);
                                                        //                  continue top;
                                                        //                }
                                                        //                len -= op - whave;
                                                        //                do {
                                                        //                  output[_out++] = 0;
                                                        //                } while (--op > whave);
                                                        //                if (op === 0) {
                                                        //                  from = _out - dist;
                                                        //                  do {
                                                        //                    output[_out++] = output[from++];
                                                        //                  } while (--len);
                                                        //                  continue top;
                                                        //                }
                                                        //#endif
                                                    }
                                                    from = 0; // window index
                                                    from_source = s_window;
                                                    if (wnext === 0) {           /* very common case */
                                                        from += wsize - op;
                                                        if (op < len) {         /* some from window */
                                                            len -= op;
                                                            do {
                                                                output[_out++] = s_window[from++];
                                                            } while (--op);
                                                            from = _out - dist;  /* rest from output */
                                                            from_source = output;
                                                        }
                                                    }
                                                    else if (wnext < op) {      /* wrap around window */
                                                        from += wsize + wnext - op;
                                                        op -= wnext;
                                                        if (op < len) {         /* some from end of window */
                                                            len -= op;
                                                            do {
                                                                output[_out++] = s_window[from++];
                                                            } while (--op);
                                                            from = 0;
                                                            if (wnext < len) {  /* some from start of window */
                                                                op = wnext;
                                                                len -= op;
                                                                do {
                                                                    output[_out++] = s_window[from++];
                                                                } while (--op);
                                                                from = _out - dist;      /* rest from output */
                                                                from_source = output;
                                                            }
                                                        }
                                                    }
                                                    else {                      /* contiguous in window */
                                                        from += wnext - op;
                                                        if (op < len) {         /* some from window */
                                                            len -= op;
                                                            do {
                                                                output[_out++] = s_window[from++];
                                                            } while (--op);
                                                            from = _out - dist;  /* rest from output */
                                                            from_source = output;
                                                        }
                                                    }
                                                    while (len > 2) {
                                                        output[_out++] = from_source[from++];
                                                        output[_out++] = from_source[from++];
                                                        output[_out++] = from_source[from++];
                                                        len -= 3;
                                                    }
                                                    if (len) {
                                                        output[_out++] = from_source[from++];
                                                        if (len > 1) {
                                                            output[_out++] = from_source[from++];
                                                        }
                                                    }
                                                }
                                                else {
                                                    from = _out - dist;          /* copy direct from output */
                                                    do {                        /* minimum length is three */
                                                        output[_out++] = output[from++];
                                                        output[_out++] = output[from++];
                                                        output[_out++] = output[from++];
                                                        len -= 3;
                                                    } while (len > 2);
                                                    if (len) {
                                                        output[_out++] = output[from++];
                                                        if (len > 1) {
                                                            output[_out++] = output[from++];
                                                        }
                                                    }
                                                }
                                            }
                                            else if ((op & 64) === 0) {          /* 2nd level distance code */
                                                here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
                                                continue dodist;
                                            }
                                            else {
                                                strm.msg = 'invalid distance code';
                                                state.mode = BAD;
                                                break top;
                                            }

                                            break; // need to emulate goto via "continue"
                                        }
                                }
                                else if ((op & 64) === 0) {              /* 2nd level length code */
                                    here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
                                    continue dolen;
                                }
                                else if (op & 32) {                     /* end-of-block */
                                    //Tracevv((stderr, "inflate:         end of block\n"));
                                    state.mode = TYPE;
                                    break top;
                                }
                                else {
                                    strm.msg = 'invalid literal/length code';
                                    state.mode = BAD;
                                    break top;
                                }

                                break; // need to emulate goto via "continue"
                            }
                    } while (_in < last && _out < end);

                /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
                len = bits >> 3;
                _in -= len;
                bits -= len << 3;
                hold &= (1 << bits) - 1;

                /* update state and return */
                strm.next_in = _in;
                strm.next_out = _out;
                strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
                strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
                state.hold = hold;
                state.bits = bits;
                return;
            };

        }, {}], 70: [function (require, module, exports) {
            'use strict';


            var utils = require('../utils/common');
            var adler32 = require('./adler32');
            var crc32 = require('./crc32');
            var inflate_fast = require('./inffast');
            var inflate_table = require('./inftrees');

            var CODES = 0;
            var LENS = 1;
            var DISTS = 2;

            /* Public constants ==========================================================*/
            /* ===========================================================================*/


            /* Allowed flush values; see deflate() and inflate() below for details */
            //var Z_NO_FLUSH      = 0;
            //var Z_PARTIAL_FLUSH = 1;
            //var Z_SYNC_FLUSH    = 2;
            //var Z_FULL_FLUSH    = 3;
            var Z_FINISH = 4;
            var Z_BLOCK = 5;
            var Z_TREES = 6;


            /* Return codes for the compression/decompression functions. Negative values
             * are errors, positive values are used for special but normal events.
             */
            var Z_OK = 0;
            var Z_STREAM_END = 1;
            var Z_NEED_DICT = 2;
            //var Z_ERRNO         = -1;
            var Z_STREAM_ERROR = -2;
            var Z_DATA_ERROR = -3;
            var Z_MEM_ERROR = -4;
            var Z_BUF_ERROR = -5;
            //var Z_VERSION_ERROR = -6;

            /* The deflate compression method */
            var Z_DEFLATED = 8;


            /* STATES ====================================================================*/
            /* ===========================================================================*/


            var HEAD = 1;       /* i: waiting for magic header */
            var FLAGS = 2;      /* i: waiting for method and flags (gzip) */
            var TIME = 3;       /* i: waiting for modification time (gzip) */
            var OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
            var EXLEN = 5;      /* i: waiting for extra length (gzip) */
            var EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
            var NAME = 7;       /* i: waiting for end of file name (gzip) */
            var COMMENT = 8;    /* i: waiting for end of comment (gzip) */
            var HCRC = 9;       /* i: waiting for header crc (gzip) */
            var DICTID = 10;    /* i: waiting for dictionary check value */
            var DICT = 11;      /* waiting for inflateSetDictionary() call */
            var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
            var TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
            var STORED = 14;    /* i: waiting for stored size (length and complement) */
            var COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
            var COPY = 16;      /* i/o: waiting for input or output to copy stored block */
            var TABLE = 17;     /* i: waiting for dynamic block table lengths */
            var LENLENS = 18;   /* i: waiting for code length code lengths */
            var CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
            var LEN_ = 20;      /* i: same as LEN below, but only first time in */
            var LEN = 21;       /* i: waiting for length/lit/eob code */
            var LENEXT = 22;    /* i: waiting for length extra bits */
            var DIST = 23;      /* i: waiting for distance code */
            var DISTEXT = 24;   /* i: waiting for distance extra bits */
            var MATCH = 25;     /* o: waiting for output space to copy string */
            var LIT = 26;       /* o: waiting for output space to write literal */
            var CHECK = 27;     /* i: waiting for 32-bit check value */
            var LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
            var DONE = 29;      /* finished check, done -- remain here until reset */
            var BAD = 30;       /* got a data error -- remain here until reset */
            var MEM = 31;       /* got an inflate() memory error -- remain here until reset */
            var SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

            /* ===========================================================================*/



            var ENOUGH_LENS = 852;
            var ENOUGH_DISTS = 592;
            //var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

            var MAX_WBITS = 15;
            /* 32K LZ77 window */
            var DEF_WBITS = MAX_WBITS;


            function zswap32(q) {
                return (((q >>> 24) & 0xff) +
                        ((q >>> 8) & 0xff00) +
                        ((q & 0xff00) << 8) +
                        ((q & 0xff) << 24));
            }


            function InflateState() {
                this.mode = 0;             /* current inflate mode */
                this.last = false;          /* true if processing last block */
                this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
                this.havedict = false;      /* true if dictionary provided */
                this.flags = 0;             /* gzip header method and flags (0 if zlib) */
                this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
                this.check = 0;             /* protected copy of check value */
                this.total = 0;             /* protected copy of output count */
                // TODO: may be {}
                this.head = null;           /* where to save gzip header information */

                /* sliding window */
                this.wbits = 0;             /* log base 2 of requested window size */
                this.wsize = 0;             /* window size or zero if not using window */
                this.whave = 0;             /* valid bytes in the window */
                this.wnext = 0;             /* window write index */
                this.window = null;         /* allocated sliding window, if needed */

                /* bit accumulator */
                this.hold = 0;              /* input bit accumulator */
                this.bits = 0;              /* number of bits in "in" */

                /* for string and stored block copying */
                this.length = 0;            /* literal or length of data to copy */
                this.offset = 0;            /* distance back to copy string from */

                /* for table and code decoding */
                this.extra = 0;             /* extra bits needed */

                /* fixed and dynamic code tables */
                this.lencode = null;          /* starting table for length/literal codes */
                this.distcode = null;         /* starting table for distance codes */
                this.lenbits = 0;           /* index bits for lencode */
                this.distbits = 0;          /* index bits for distcode */

                /* dynamic table building */
                this.ncode = 0;             /* number of code length code lengths */
                this.nlen = 0;              /* number of length code lengths */
                this.ndist = 0;             /* number of distance code lengths */
                this.have = 0;              /* number of code lengths in lens[] */
                this.next = null;              /* next available space in codes[] */

                this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
                this.work = new utils.Buf16(288); /* work area for code table building */

                /*
                 because we don't have pointers in js, we use lencode and distcode directly
                 as buffers so we don't need codes
                */
                //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
                this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
                this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
                this.sane = 0;                   /* if false, allow invalid distance too far */
                this.back = 0;                   /* bits back of last unprocessed length/lit */
                this.was = 0;                    /* initial length of match */
            }

            function inflateResetKeep(strm) {
                var state;

                if (!strm || !strm.state) { return Z_STREAM_ERROR; }
                state = strm.state;
                strm.total_in = strm.total_out = state.total = 0;
                strm.msg = ''; /*Z_NULL*/
                if (state.wrap) {       /* to support ill-conceived Java test suite */
                    strm.adler = state.wrap & 1;
                }
                state.mode = HEAD;
                state.last = 0;
                state.havedict = 0;
                state.dmax = 32768;
                state.head = null/*Z_NULL*/;
                state.hold = 0;
                state.bits = 0;
                //state.lencode = state.distcode = state.next = state.codes;
                state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
                state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

                state.sane = 1;
                state.back = -1;
                //Tracev((stderr, "inflate: reset\n"));
                return Z_OK;
            }

            function inflateReset(strm) {
                var state;

                if (!strm || !strm.state) { return Z_STREAM_ERROR; }
                state = strm.state;
                state.wsize = 0;
                state.whave = 0;
                state.wnext = 0;
                return inflateResetKeep(strm);

            }

            function inflateReset2(strm, windowBits) {
                var wrap;
                var state;

                /* get the state */
                if (!strm || !strm.state) { return Z_STREAM_ERROR; }
                state = strm.state;

                /* extract wrap request from windowBits parameter */
                if (windowBits < 0) {
                    wrap = 0;
                    windowBits = -windowBits;
                }
                else {
                    wrap = (windowBits >> 4) + 1;
                    if (windowBits < 48) {
                        windowBits &= 15;
                    }
                }

                /* set number of window bits, free window if different */
                if (windowBits && (windowBits < 8 || windowBits > 15)) {
                    return Z_STREAM_ERROR;
                }
                if (state.window !== null && state.wbits !== windowBits) {
                    state.window = null;
                }

                /* update state and reset the rest of it */
                state.wrap = wrap;
                state.wbits = windowBits;
                return inflateReset(strm);
            }

            function inflateInit2(strm, windowBits) {
                var ret;
                var state;

                if (!strm) { return Z_STREAM_ERROR; }
                //strm.msg = Z_NULL;                 /* in case we return an error */

                state = new InflateState();

                //if (state === Z_NULL) return Z_MEM_ERROR;
                //Tracev((stderr, "inflate: allocated\n"));
                strm.state = state;
                state.window = null/*Z_NULL*/;
                ret = inflateReset2(strm, windowBits);
                if (ret !== Z_OK) {
                    strm.state = null/*Z_NULL*/;
                }
                return ret;
            }

            function inflateInit(strm) {
                return inflateInit2(strm, DEF_WBITS);
            }


            /*
             Return state with length and distance decoding tables and index sizes set to
             fixed code decoding.  Normally this returns fixed tables from inffixed.h.
             If BUILDFIXED is defined, then instead this routine builds the tables the
             first time it's called, and returns those tables the first time and
             thereafter.  This reduces the size of the code by about 2K bytes, in
             exchange for a little execution time.  However, BUILDFIXED should not be
             used for threaded applications, since the rewriting of the tables and virgin
             may not be thread-safe.
             */
            var virgin = true;

            var lenfix, distfix; // We have no pointers in JS, so keep tables separate

            function fixedtables(state) {
                /* build fixed huffman tables if first call (may not be thread safe) */
                if (virgin) {
                    var sym;

                    lenfix = new utils.Buf32(512);
                    distfix = new utils.Buf32(32);

                    /* literal/length table */
                    sym = 0;
                    while (sym < 144) { state.lens[sym++] = 8; }
                    while (sym < 256) { state.lens[sym++] = 9; }
                    while (sym < 280) { state.lens[sym++] = 7; }
                    while (sym < 288) { state.lens[sym++] = 8; }

                    inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });

                    /* distance table */
                    sym = 0;
                    while (sym < 32) { state.lens[sym++] = 5; }

                    inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });

                    /* do this just once */
                    virgin = false;
                }

                state.lencode = lenfix;
                state.lenbits = 9;
                state.distcode = distfix;
                state.distbits = 5;
            }


            /*
             Update the window with the last wsize (normally 32K) bytes written before
             returning.  If window does not exist yet, create it.  This is only called
             when a window is already in use, or when output has been written during this
             inflate call, but the end of the deflate stream has not been reached yet.
             It is also called to create a window for dictionary data when a dictionary
             is loaded.
            
             Providing output buffers larger than 32K to inflate() should provide a speed
             advantage, since only the last 32K of output is copied to the sliding window
             upon return from inflate(), and since all distances after the first 32K of
             output will fall in the output data, making match copies simpler and faster.
             The advantage may be dependent on the size of the processor's data caches.
             */
            function updatewindow(strm, src, end, copy) {
                var dist;
                var state = strm.state;

                /* if it hasn't been done already, allocate space for the window */
                if (state.window === null) {
                    state.wsize = 1 << state.wbits;
                    state.wnext = 0;
                    state.whave = 0;

                    state.window = new utils.Buf8(state.wsize);
                }

                /* copy state->wsize or less output bytes into the circular window */
                if (copy >= state.wsize) {
                    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
                    state.wnext = 0;
                    state.whave = state.wsize;
                }
                else {
                    dist = state.wsize - state.wnext;
                    if (dist > copy) {
                        dist = copy;
                    }
                    //zmemcpy(state->window + state->wnext, end - copy, dist);
                    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
                    copy -= dist;
                    if (copy) {
                        //zmemcpy(state->window, end - copy, copy);
                        utils.arraySet(state.window, src, end - copy, copy, 0);
                        state.wnext = copy;
                        state.whave = state.wsize;
                    }
                    else {
                        state.wnext += dist;
                        if (state.wnext === state.wsize) { state.wnext = 0; }
                        if (state.whave < state.wsize) { state.whave += dist; }
                    }
                }
                return 0;
            }

            function inflate(strm, flush) {
                var state;
                var input, output;          // input/output buffers
                var next;                   /* next input INDEX */
                var put;                    /* next output INDEX */
                var have, left;             /* available input and output */
                var hold;                   /* bit buffer */
                var bits;                   /* bits in bit buffer */
                var _in, _out;              /* save starting available input and output */
                var copy;                   /* number of stored or match bytes to copy */
                var from;                   /* where to copy match bytes from */
                var from_source;
                var here = 0;               /* current decoding table entry */
                var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
                //var last;                   /* parent table entry */
                var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
                var len;                    /* length to copy for repeats, bits to drop */
                var ret;                    /* return code */
                var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
                var opts;

                var n; // temporary var for NEED_BITS

                var order = /* permutation of code lengths */
                  [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


                if (!strm || !strm.state || !strm.output ||
                    (!strm.input && strm.avail_in !== 0)) {
                    return Z_STREAM_ERROR;
                }

                state = strm.state;
                if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


                //--- LOAD() ---
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                //---

                _in = have;
                _out = left;
                ret = Z_OK;

                inf_leave: // goto emulation
                    for (; ;) {
                        switch (state.mode) {
                            case HEAD:
                                if (state.wrap === 0) {
                                    state.mode = TYPEDO;
                                    break;
                                }
                                //=== NEEDBITS(16);
                                while (bits < 16) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
                                    state.check = 0/*crc32(0L, Z_NULL, 0)*/;
                                    //=== CRC2(state.check, hold);
                                    hbuf[0] = hold & 0xff;
                                    hbuf[1] = (hold >>> 8) & 0xff;
                                    state.check = crc32(state.check, hbuf, 2, 0);
                                    //===//

                                    //=== INITBITS();
                                    hold = 0;
                                    bits = 0;
                                    //===//
                                    state.mode = FLAGS;
                                    break;
                                }
                                state.flags = 0;           /* expect zlib header */
                                if (state.head) {
                                    state.head.done = false;
                                }
                                if (!(state.wrap & 1) ||   /* check if zlib header allowed */
                                  (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
                                    strm.msg = 'incorrect header check';
                                    state.mode = BAD;
                                    break;
                                }
                                if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
                                    strm.msg = 'unknown compression method';
                                    state.mode = BAD;
                                    break;
                                }
                                //--- DROPBITS(4) ---//
                                hold >>>= 4;
                                bits -= 4;
                                //---//
                                len = (hold & 0x0f)/*BITS(4)*/ + 8;
                                if (state.wbits === 0) {
                                    state.wbits = len;
                                }
                                else if (len > state.wbits) {
                                    strm.msg = 'invalid window size';
                                    state.mode = BAD;
                                    break;
                                }
                                state.dmax = 1 << len;
                                //Tracev((stderr, "inflate:   zlib header ok\n"));
                                strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
                                state.mode = hold & 0x200 ? DICTID : TYPE;
                                //=== INITBITS();
                                hold = 0;
                                bits = 0;
                                //===//
                                break;
                            case FLAGS:
                                //=== NEEDBITS(16); */
                                while (bits < 16) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                state.flags = hold;
                                if ((state.flags & 0xff) !== Z_DEFLATED) {
                                    strm.msg = 'unknown compression method';
                                    state.mode = BAD;
                                    break;
                                }
                                if (state.flags & 0xe000) {
                                    strm.msg = 'unknown header flags set';
                                    state.mode = BAD;
                                    break;
                                }
                                if (state.head) {
                                    state.head.text = ((hold >> 8) & 1);
                                }
                                if (state.flags & 0x0200) {
                                    //=== CRC2(state.check, hold);
                                    hbuf[0] = hold & 0xff;
                                    hbuf[1] = (hold >>> 8) & 0xff;
                                    state.check = crc32(state.check, hbuf, 2, 0);
                                    //===//
                                }
                                //=== INITBITS();
                                hold = 0;
                                bits = 0;
                                //===//
                                state.mode = TIME;
                                /* falls through */
                            case TIME:
                                //=== NEEDBITS(32); */
                                while (bits < 32) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                if (state.head) {
                                    state.head.time = hold;
                                }
                                if (state.flags & 0x0200) {
                                    //=== CRC4(state.check, hold)
                                    hbuf[0] = hold & 0xff;
                                    hbuf[1] = (hold >>> 8) & 0xff;
                                    hbuf[2] = (hold >>> 16) & 0xff;
                                    hbuf[3] = (hold >>> 24) & 0xff;
                                    state.check = crc32(state.check, hbuf, 4, 0);
                                    //===
                                }
                                //=== INITBITS();
                                hold = 0;
                                bits = 0;
                                //===//
                                state.mode = OS;
                                /* falls through */
                            case OS:
                                //=== NEEDBITS(16); */
                                while (bits < 16) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                if (state.head) {
                                    state.head.xflags = (hold & 0xff);
                                    state.head.os = (hold >> 8);
                                }
                                if (state.flags & 0x0200) {
                                    //=== CRC2(state.check, hold);
                                    hbuf[0] = hold & 0xff;
                                    hbuf[1] = (hold >>> 8) & 0xff;
                                    state.check = crc32(state.check, hbuf, 2, 0);
                                    //===//
                                }
                                //=== INITBITS();
                                hold = 0;
                                bits = 0;
                                //===//
                                state.mode = EXLEN;
                                /* falls through */
                            case EXLEN:
                                if (state.flags & 0x0400) {
                                    //=== NEEDBITS(16); */
                                    while (bits < 16) {
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    //===//
                                    state.length = hold;
                                    if (state.head) {
                                        state.head.extra_len = hold;
                                    }
                                    if (state.flags & 0x0200) {
                                        //=== CRC2(state.check, hold);
                                        hbuf[0] = hold & 0xff;
                                        hbuf[1] = (hold >>> 8) & 0xff;
                                        state.check = crc32(state.check, hbuf, 2, 0);
                                        //===//
                                    }
                                    //=== INITBITS();
                                    hold = 0;
                                    bits = 0;
                                    //===//
                                }
                                else if (state.head) {
                                    state.head.extra = null/*Z_NULL*/;
                                }
                                state.mode = EXTRA;
                                /* falls through */
                            case EXTRA:
                                if (state.flags & 0x0400) {
                                    copy = state.length;
                                    if (copy > have) { copy = have; }
                                    if (copy) {
                                        if (state.head) {
                                            len = state.head.extra_len - state.length;
                                            if (!state.head.extra) {
                                                // Use untyped array for more conveniend processing later
                                                state.head.extra = new Array(state.head.extra_len);
                                            }
                                            utils.arraySet(
                                              state.head.extra,
                                              input,
                                              next,
                                              // extra field is limited to 65536 bytes
                                              // - no need for additional size check
                                              copy,
                                              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                                              len
                                            );
                                            //zmemcpy(state.head.extra + len, next,
                                            //        len + copy > state.head.extra_max ?
                                            //        state.head.extra_max - len : copy);
                                        }
                                        if (state.flags & 0x0200) {
                                            state.check = crc32(state.check, input, copy, next);
                                        }
                                        have -= copy;
                                        next += copy;
                                        state.length -= copy;
                                    }
                                    if (state.length) { break inf_leave; }
                                }
                                state.length = 0;
                                state.mode = NAME;
                                /* falls through */
                            case NAME:
                                if (state.flags & 0x0800) {
                                    if (have === 0) { break inf_leave; }
                                    copy = 0;
                                    do {
                                        // TODO: 2 or 1 bytes?
                                        len = input[next + copy++];
                                        /* use constant limit because in js we should not preallocate memory */
                                        if (state.head && len &&
                                            (state.length < 65536 /*state.head.name_max*/)) {
                                            state.head.name += String.fromCharCode(len);
                                        }
                                    } while (len && copy < have);

                                    if (state.flags & 0x0200) {
                                        state.check = crc32(state.check, input, copy, next);
                                    }
                                    have -= copy;
                                    next += copy;
                                    if (len) { break inf_leave; }
                                }
                                else if (state.head) {
                                    state.head.name = null;
                                }
                                state.length = 0;
                                state.mode = COMMENT;
                                /* falls through */
                            case COMMENT:
                                if (state.flags & 0x1000) {
                                    if (have === 0) { break inf_leave; }
                                    copy = 0;
                                    do {
                                        len = input[next + copy++];
                                        /* use constant limit because in js we should not preallocate memory */
                                        if (state.head && len &&
                                            (state.length < 65536 /*state.head.comm_max*/)) {
                                            state.head.comment += String.fromCharCode(len);
                                        }
                                    } while (len && copy < have);
                                    if (state.flags & 0x0200) {
                                        state.check = crc32(state.check, input, copy, next);
                                    }
                                    have -= copy;
                                    next += copy;
                                    if (len) { break inf_leave; }
                                }
                                else if (state.head) {
                                    state.head.comment = null;
                                }
                                state.mode = HCRC;
                                /* falls through */
                            case HCRC:
                                if (state.flags & 0x0200) {
                                    //=== NEEDBITS(16); */
                                    while (bits < 16) {
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    //===//
                                    if (hold !== (state.check & 0xffff)) {
                                        strm.msg = 'header crc mismatch';
                                        state.mode = BAD;
                                        break;
                                    }
                                    //=== INITBITS();
                                    hold = 0;
                                    bits = 0;
                                    //===//
                                }
                                if (state.head) {
                                    state.head.hcrc = ((state.flags >> 9) & 1);
                                    state.head.done = true;
                                }
                                strm.adler = state.check = 0;
                                state.mode = TYPE;
                                break;
                            case DICTID:
                                //=== NEEDBITS(32); */
                                while (bits < 32) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                strm.adler = state.check = zswap32(hold);
                                //=== INITBITS();
                                hold = 0;
                                bits = 0;
                                //===//
                                state.mode = DICT;
                                /* falls through */
                            case DICT:
                                if (state.havedict === 0) {
                                    //--- RESTORE() ---
                                    strm.next_out = put;
                                    strm.avail_out = left;
                                    strm.next_in = next;
                                    strm.avail_in = have;
                                    state.hold = hold;
                                    state.bits = bits;
                                    //---
                                    return Z_NEED_DICT;
                                }
                                strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
                                state.mode = TYPE;
                                /* falls through */
                            case TYPE:
                                if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
                                /* falls through */
                            case TYPEDO:
                                if (state.last) {
                                    //--- BYTEBITS() ---//
                                    hold >>>= bits & 7;
                                    bits -= bits & 7;
                                    //---//
                                    state.mode = CHECK;
                                    break;
                                }
                                //=== NEEDBITS(3); */
                                while (bits < 3) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                state.last = (hold & 0x01)/*BITS(1)*/;
                                //--- DROPBITS(1) ---//
                                hold >>>= 1;
                                bits -= 1;
                                //---//

                                switch ((hold & 0x03)/*BITS(2)*/) {
                                    case 0:                             /* stored block */
                                        //Tracev((stderr, "inflate:     stored block%s\n",
                                        //        state.last ? " (last)" : ""));
                                        state.mode = STORED;
                                        break;
                                    case 1:                             /* fixed block */
                                        fixedtables(state);
                                        //Tracev((stderr, "inflate:     fixed codes block%s\n",
                                        //        state.last ? " (last)" : ""));
                                        state.mode = LEN_;             /* decode codes */
                                        if (flush === Z_TREES) {
                                            //--- DROPBITS(2) ---//
                                            hold >>>= 2;
                                            bits -= 2;
                                            //---//
                                            break inf_leave;
                                        }
                                        break;
                                    case 2:                             /* dynamic block */
                                        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
                                        //        state.last ? " (last)" : ""));
                                        state.mode = TABLE;
                                        break;
                                    case 3:
                                        strm.msg = 'invalid block type';
                                        state.mode = BAD;
                                }
                                //--- DROPBITS(2) ---//
                                hold >>>= 2;
                                bits -= 2;
                                //---//
                                break;
                            case STORED:
                                //--- BYTEBITS() ---// /* go to byte boundary */
                                hold >>>= bits & 7;
                                bits -= bits & 7;
                                //---//
                                //=== NEEDBITS(32); */
                                while (bits < 32) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
                                    strm.msg = 'invalid stored block lengths';
                                    state.mode = BAD;
                                    break;
                                }
                                state.length = hold & 0xffff;
                                //Tracev((stderr, "inflate:       stored length %u\n",
                                //        state.length));
                                //=== INITBITS();
                                hold = 0;
                                bits = 0;
                                //===//
                                state.mode = COPY_;
                                if (flush === Z_TREES) { break inf_leave; }
                                /* falls through */
                            case COPY_:
                                state.mode = COPY;
                                /* falls through */
                            case COPY:
                                copy = state.length;
                                if (copy) {
                                    if (copy > have) { copy = have; }
                                    if (copy > left) { copy = left; }
                                    if (copy === 0) { break inf_leave; }
                                    //--- zmemcpy(put, next, copy); ---
                                    utils.arraySet(output, input, next, copy, put);
                                    //---//
                                    have -= copy;
                                    next += copy;
                                    left -= copy;
                                    put += copy;
                                    state.length -= copy;
                                    break;
                                }
                                //Tracev((stderr, "inflate:       stored end\n"));
                                state.mode = TYPE;
                                break;
                            case TABLE:
                                //=== NEEDBITS(14); */
                                while (bits < 14) {
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                }
                                //===//
                                state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
                                //--- DROPBITS(5) ---//
                                hold >>>= 5;
                                bits -= 5;
                                //---//
                                state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
                                //--- DROPBITS(5) ---//
                                hold >>>= 5;
                                bits -= 5;
                                //---//
                                state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
                                //--- DROPBITS(4) ---//
                                hold >>>= 4;
                                bits -= 4;
                                //---//
                                //#ifndef PKZIP_BUG_WORKAROUND
                                if (state.nlen > 286 || state.ndist > 30) {
                                    strm.msg = 'too many length or distance symbols';
                                    state.mode = BAD;
                                    break;
                                }
                                //#endif
                                //Tracev((stderr, "inflate:       table sizes ok\n"));
                                state.have = 0;
                                state.mode = LENLENS;
                                /* falls through */
                            case LENLENS:
                                while (state.have < state.ncode) {
                                    //=== NEEDBITS(3);
                                    while (bits < 3) {
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    //===//
                                    state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
                                    //--- DROPBITS(3) ---//
                                    hold >>>= 3;
                                    bits -= 3;
                                    //---//
                                }
                                while (state.have < 19) {
                                    state.lens[order[state.have++]] = 0;
                                }
                                // We have separate tables & no pointers. 2 commented lines below not needed.
                                //state.next = state.codes;
                                //state.lencode = state.next;
                                // Switch to use dynamic table
                                state.lencode = state.lendyn;
                                state.lenbits = 7;

                                opts = { bits: state.lenbits };
                                ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                                state.lenbits = opts.bits;

                                if (ret) {
                                    strm.msg = 'invalid code lengths set';
                                    state.mode = BAD;
                                    break;
                                }
                                //Tracev((stderr, "inflate:       code lengths ok\n"));
                                state.have = 0;
                                state.mode = CODELENS;
                                /* falls through */
                            case CODELENS:
                                while (state.have < state.nlen + state.ndist) {
                                    for (; ;) {
                                        here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
                                        here_bits = here >>> 24;
                                        here_op = (here >>> 16) & 0xff;
                                        here_val = here & 0xffff;

                                        if ((here_bits) <= bits) { break; }
                                        //--- PULLBYTE() ---//
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                        //---//
                                    }
                                    if (here_val < 16) {
                                        //--- DROPBITS(here.bits) ---//
                                        hold >>>= here_bits;
                                        bits -= here_bits;
                                        //---//
                                        state.lens[state.have++] = here_val;
                                    }
                                    else {
                                        if (here_val === 16) {
                                            //=== NEEDBITS(here.bits + 2);
                                            n = here_bits + 2;
                                            while (bits < n) {
                                                if (have === 0) { break inf_leave; }
                                                have--;
                                                hold += input[next++] << bits;
                                                bits += 8;
                                            }
                                            //===//
                                            //--- DROPBITS(here.bits) ---//
                                            hold >>>= here_bits;
                                            bits -= here_bits;
                                            //---//
                                            if (state.have === 0) {
                                                strm.msg = 'invalid bit length repeat';
                                                state.mode = BAD;
                                                break;
                                            }
                                            len = state.lens[state.have - 1];
                                            copy = 3 + (hold & 0x03);//BITS(2);
                                            //--- DROPBITS(2) ---//
                                            hold >>>= 2;
                                            bits -= 2;
                                            //---//
                                        }
                                        else if (here_val === 17) {
                                            //=== NEEDBITS(here.bits + 3);
                                            n = here_bits + 3;
                                            while (bits < n) {
                                                if (have === 0) { break inf_leave; }
                                                have--;
                                                hold += input[next++] << bits;
                                                bits += 8;
                                            }
                                            //===//
                                            //--- DROPBITS(here.bits) ---//
                                            hold >>>= here_bits;
                                            bits -= here_bits;
                                            //---//
                                            len = 0;
                                            copy = 3 + (hold & 0x07);//BITS(3);
                                            //--- DROPBITS(3) ---//
                                            hold >>>= 3;
                                            bits -= 3;
                                            //---//
                                        }
                                        else {
                                            //=== NEEDBITS(here.bits + 7);
                                            n = here_bits + 7;
                                            while (bits < n) {
                                                if (have === 0) { break inf_leave; }
                                                have--;
                                                hold += input[next++] << bits;
                                                bits += 8;
                                            }
                                            //===//
                                            //--- DROPBITS(here.bits) ---//
                                            hold >>>= here_bits;
                                            bits -= here_bits;
                                            //---//
                                            len = 0;
                                            copy = 11 + (hold & 0x7f);//BITS(7);
                                            //--- DROPBITS(7) ---//
                                            hold >>>= 7;
                                            bits -= 7;
                                            //---//
                                        }
                                        if (state.have + copy > state.nlen + state.ndist) {
                                            strm.msg = 'invalid bit length repeat';
                                            state.mode = BAD;
                                            break;
                                        }
                                        while (copy--) {
                                            state.lens[state.have++] = len;
                                        }
                                    }
                                }

                                /* handle error breaks in while */
                                if (state.mode === BAD) { break; }

                                /* check for end-of-block code (better have one) */
                                if (state.lens[256] === 0) {
                                    strm.msg = 'invalid code -- missing end-of-block';
                                    state.mode = BAD;
                                    break;
                                }

                                /* build code tables -- note: do not change the lenbits or distbits
                                   values here (9 and 6) without reading the comments in inftrees.h
                                   concerning the ENOUGH constants, which depend on those values */
                                state.lenbits = 9;

                                opts = { bits: state.lenbits };
                                ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                                // We have separate tables & no pointers. 2 commented lines below not needed.
                                // state.next_index = opts.table_index;
                                state.lenbits = opts.bits;
                                // state.lencode = state.next;

                                if (ret) {
                                    strm.msg = 'invalid literal/lengths set';
                                    state.mode = BAD;
                                    break;
                                }

                                state.distbits = 6;
                                //state.distcode.copy(state.codes);
                                // Switch to use dynamic table
                                state.distcode = state.distdyn;
                                opts = { bits: state.distbits };
                                ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                                // We have separate tables & no pointers. 2 commented lines below not needed.
                                // state.next_index = opts.table_index;
                                state.distbits = opts.bits;
                                // state.distcode = state.next;

                                if (ret) {
                                    strm.msg = 'invalid distances set';
                                    state.mode = BAD;
                                    break;
                                }
                                //Tracev((stderr, 'inflate:       codes ok\n'));
                                state.mode = LEN_;
                                if (flush === Z_TREES) { break inf_leave; }
                                /* falls through */
                            case LEN_:
                                state.mode = LEN;
                                /* falls through */
                            case LEN:
                                if (have >= 6 && left >= 258) {
                                    //--- RESTORE() ---
                                    strm.next_out = put;
                                    strm.avail_out = left;
                                    strm.next_in = next;
                                    strm.avail_in = have;
                                    state.hold = hold;
                                    state.bits = bits;
                                    //---
                                    inflate_fast(strm, _out);
                                    //--- LOAD() ---
                                    put = strm.next_out;
                                    output = strm.output;
                                    left = strm.avail_out;
                                    next = strm.next_in;
                                    input = strm.input;
                                    have = strm.avail_in;
                                    hold = state.hold;
                                    bits = state.bits;
                                    //---

                                    if (state.mode === TYPE) {
                                        state.back = -1;
                                    }
                                    break;
                                }
                                state.back = 0;
                                for (; ;) {
                                    here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
                                    here_bits = here >>> 24;
                                    here_op = (here >>> 16) & 0xff;
                                    here_val = here & 0xffff;

                                    if (here_bits <= bits) { break; }
                                    //--- PULLBYTE() ---//
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                    //---//
                                }
                                if (here_op && (here_op & 0xf0) === 0) {
                                    last_bits = here_bits;
                                    last_op = here_op;
                                    last_val = here_val;
                                    for (; ;) {
                                        here = state.lencode[last_val +
                                                ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                                        here_bits = here >>> 24;
                                        here_op = (here >>> 16) & 0xff;
                                        here_val = here & 0xffff;

                                        if ((last_bits + here_bits) <= bits) { break; }
                                        //--- PULLBYTE() ---//
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                        //---//
                                    }
                                    //--- DROPBITS(last.bits) ---//
                                    hold >>>= last_bits;
                                    bits -= last_bits;
                                    //---//
                                    state.back += last_bits;
                                }
                                //--- DROPBITS(here.bits) ---//
                                hold >>>= here_bits;
                                bits -= here_bits;
                                //---//
                                state.back += here_bits;
                                state.length = here_val;
                                if (here_op === 0) {
                                    //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
                                    //        "inflate:         literal '%c'\n" :
                                    //        "inflate:         literal 0x%02x\n", here.val));
                                    state.mode = LIT;
                                    break;
                                }
                                if (here_op & 32) {
                                    //Tracevv((stderr, "inflate:         end of block\n"));
                                    state.back = -1;
                                    state.mode = TYPE;
                                    break;
                                }
                                if (here_op & 64) {
                                    strm.msg = 'invalid literal/length code';
                                    state.mode = BAD;
                                    break;
                                }
                                state.extra = here_op & 15;
                                state.mode = LENEXT;
                                /* falls through */
                            case LENEXT:
                                if (state.extra) {
                                    //=== NEEDBITS(state.extra);
                                    n = state.extra;
                                    while (bits < n) {
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    //===//
                                    state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
                                    //--- DROPBITS(state.extra) ---//
                                    hold >>>= state.extra;
                                    bits -= state.extra;
                                    //---//
                                    state.back += state.extra;
                                }
                                //Tracevv((stderr, "inflate:         length %u\n", state.length));
                                state.was = state.length;
                                state.mode = DIST;
                                /* falls through */
                            case DIST:
                                for (; ;) {
                                    here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
                                    here_bits = here >>> 24;
                                    here_op = (here >>> 16) & 0xff;
                                    here_val = here & 0xffff;

                                    if ((here_bits) <= bits) { break; }
                                    //--- PULLBYTE() ---//
                                    if (have === 0) { break inf_leave; }
                                    have--;
                                    hold += input[next++] << bits;
                                    bits += 8;
                                    //---//
                                }
                                if ((here_op & 0xf0) === 0) {
                                    last_bits = here_bits;
                                    last_op = here_op;
                                    last_val = here_val;
                                    for (; ;) {
                                        here = state.distcode[last_val +
                                                ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                                        here_bits = here >>> 24;
                                        here_op = (here >>> 16) & 0xff;
                                        here_val = here & 0xffff;

                                        if ((last_bits + here_bits) <= bits) { break; }
                                        //--- PULLBYTE() ---//
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                        //---//
                                    }
                                    //--- DROPBITS(last.bits) ---//
                                    hold >>>= last_bits;
                                    bits -= last_bits;
                                    //---//
                                    state.back += last_bits;
                                }
                                //--- DROPBITS(here.bits) ---//
                                hold >>>= here_bits;
                                bits -= here_bits;
                                //---//
                                state.back += here_bits;
                                if (here_op & 64) {
                                    strm.msg = 'invalid distance code';
                                    state.mode = BAD;
                                    break;
                                }
                                state.offset = here_val;
                                state.extra = (here_op) & 15;
                                state.mode = DISTEXT;
                                /* falls through */
                            case DISTEXT:
                                if (state.extra) {
                                    //=== NEEDBITS(state.extra);
                                    n = state.extra;
                                    while (bits < n) {
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    //===//
                                    state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
                                    //--- DROPBITS(state.extra) ---//
                                    hold >>>= state.extra;
                                    bits -= state.extra;
                                    //---//
                                    state.back += state.extra;
                                }
                                //#ifdef INFLATE_STRICT
                                if (state.offset > state.dmax) {
                                    strm.msg = 'invalid distance too far back';
                                    state.mode = BAD;
                                    break;
                                }
                                //#endif
                                //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
                                state.mode = MATCH;
                                /* falls through */
                            case MATCH:
                                if (left === 0) { break inf_leave; }
                                copy = _out - left;
                                if (state.offset > copy) {         /* copy from window */
                                    copy = state.offset - copy;
                                    if (copy > state.whave) {
                                        if (state.sane) {
                                            strm.msg = 'invalid distance too far back';
                                            state.mode = BAD;
                                            break;
                                        }
                                        // (!) This block is disabled in zlib defailts,
                                        // don't enable it for binary compatibility
                                        //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                                        //          Trace((stderr, "inflate.c too far\n"));
                                        //          copy -= state.whave;
                                        //          if (copy > state.length) { copy = state.length; }
                                        //          if (copy > left) { copy = left; }
                                        //          left -= copy;
                                        //          state.length -= copy;
                                        //          do {
                                        //            output[put++] = 0;
                                        //          } while (--copy);
                                        //          if (state.length === 0) { state.mode = LEN; }
                                        //          break;
                                        //#endif
                                    }
                                    if (copy > state.wnext) {
                                        copy -= state.wnext;
                                        from = state.wsize - copy;
                                    }
                                    else {
                                        from = state.wnext - copy;
                                    }
                                    if (copy > state.length) { copy = state.length; }
                                    from_source = state.window;
                                }
                                else {                              /* copy from output */
                                    from_source = output;
                                    from = put - state.offset;
                                    copy = state.length;
                                }
                                if (copy > left) { copy = left; }
                                left -= copy;
                                state.length -= copy;
                                do {
                                    output[put++] = from_source[from++];
                                } while (--copy);
                                if (state.length === 0) { state.mode = LEN; }
                                break;
                            case LIT:
                                if (left === 0) { break inf_leave; }
                                output[put++] = state.length;
                                left--;
                                state.mode = LEN;
                                break;
                            case CHECK:
                                if (state.wrap) {
                                    //=== NEEDBITS(32);
                                    while (bits < 32) {
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        // Use '|' insdead of '+' to make sure that result is signed
                                        hold |= input[next++] << bits;
                                        bits += 8;
                                    }
                                    //===//
                                    _out -= left;
                                    strm.total_out += _out;
                                    state.total += _out;
                                    if (_out) {
                                        strm.adler = state.check =
                                            /*UPDATE(state.check, put - _out, _out);*/
                                            (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

                                    }
                                    _out = left;
                                    // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
                                    if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                                        strm.msg = 'incorrect data check';
                                        state.mode = BAD;
                                        break;
                                    }
                                    //=== INITBITS();
                                    hold = 0;
                                    bits = 0;
                                    //===//
                                    //Tracev((stderr, "inflate:   check matches trailer\n"));
                                }
                                state.mode = LENGTH;
                                /* falls through */
                            case LENGTH:
                                if (state.wrap && state.flags) {
                                    //=== NEEDBITS(32);
                                    while (bits < 32) {
                                        if (have === 0) { break inf_leave; }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    //===//
                                    if (hold !== (state.total & 0xffffffff)) {
                                        strm.msg = 'incorrect length check';
                                        state.mode = BAD;
                                        break;
                                    }
                                    //=== INITBITS();
                                    hold = 0;
                                    bits = 0;
                                    //===//
                                    //Tracev((stderr, "inflate:   length matches trailer\n"));
                                }
                                state.mode = DONE;
                                /* falls through */
                            case DONE:
                                ret = Z_STREAM_END;
                                break inf_leave;
                            case BAD:
                                ret = Z_DATA_ERROR;
                                break inf_leave;
                            case MEM:
                                return Z_MEM_ERROR;
                            case SYNC:
                                /* falls through */
                            default:
                                return Z_STREAM_ERROR;
                        }
                    }

                // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

                /*
                   Return from inflate(), updating the total counts and the check value.
                   If there was no progress during the inflate() call, return a buffer
                   error.  Call updatewindow() to create and/or update the window state.
                   Note: a memory error from inflate() is non-recoverable.
                 */

                //--- RESTORE() ---
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                //---

                if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                                    (state.mode < CHECK || flush !== Z_FINISH))) {
                    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
                        state.mode = MEM;
                        return Z_MEM_ERROR;
                    }
                }
                _in -= strm.avail_in;
                _out -= strm.avail_out;
                strm.total_in += _in;
                strm.total_out += _out;
                state.total += _out;
                if (state.wrap && _out) {
                    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
                      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
                }
                strm.data_type = state.bits + (state.last ? 64 : 0) +
                                  (state.mode === TYPE ? 128 : 0) +
                                  (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
                if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
                    ret = Z_BUF_ERROR;
                }
                return ret;
            }

            function inflateEnd(strm) {

                if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
                    return Z_STREAM_ERROR;
                }

                var state = strm.state;
                if (state.window) {
                    state.window = null;
                }
                strm.state = null;
                return Z_OK;
            }

            function inflateGetHeader(strm, head) {
                var state;

                /* check state */
                if (!strm || !strm.state) { return Z_STREAM_ERROR; }
                state = strm.state;
                if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

                /* save header structure */
                state.head = head;
                head.done = false;
                return Z_OK;
            }

            function inflateSetDictionary(strm, dictionary) {
                var dictLength = dictionary.length;

                var state;
                var dictid;
                var ret;

                /* check state */
                if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
                state = strm.state;

                if (state.wrap !== 0 && state.mode !== DICT) {
                    return Z_STREAM_ERROR;
                }

                /* check for correct dictionary identifier */
                if (state.mode === DICT) {
                    dictid = 1; /* adler32(0, null, 0)*/
                    /* dictid = adler32(dictid, dictionary, dictLength); */
                    dictid = adler32(dictid, dictionary, dictLength, 0);
                    if (dictid !== state.check) {
                        return Z_DATA_ERROR;
                    }
                }
                /* copy dictionary to window using updatewindow(), which will amend the
                 existing dictionary if appropriate */
                ret = updatewindow(strm, dictionary, dictLength, dictLength);
                if (ret) {
                    state.mode = MEM;
                    return Z_MEM_ERROR;
                }
                state.havedict = 1;
                // Tracev((stderr, "inflate:   dictionary set\n"));
                return Z_OK;
            }

            exports.inflateReset = inflateReset;
            exports.inflateReset2 = inflateReset2;
            exports.inflateResetKeep = inflateResetKeep;
            exports.inflateInit = inflateInit;
            exports.inflateInit2 = inflateInit2;
            exports.inflate = inflate;
            exports.inflateEnd = inflateEnd;
            exports.inflateGetHeader = inflateGetHeader;
            exports.inflateSetDictionary = inflateSetDictionary;
            exports.inflateInfo = 'pako inflate (from Nodeca project)';

            /* Not implemented
            exports.inflateCopy = inflateCopy;
            exports.inflateGetDictionary = inflateGetDictionary;
            exports.inflateMark = inflateMark;
            exports.inflatePrime = inflatePrime;
            exports.inflateSync = inflateSync;
            exports.inflateSyncPoint = inflateSyncPoint;
            exports.inflateUndermine = inflateUndermine;
            */

        }, { "../utils/common": 62, "./adler32": 64, "./crc32": 66, "./inffast": 69, "./inftrees": 71 }], 71: [function (require, module, exports) {
            'use strict';


            var utils = require('../utils/common');

            var MAXBITS = 15;
            var ENOUGH_LENS = 852;
            var ENOUGH_DISTS = 592;
            //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

            var CODES = 0;
            var LENS = 1;
            var DISTS = 2;

            var lbase = [ /* Length codes 257..285 base */
              3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
              35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
            ];

            var lext = [ /* Length codes 257..285 extra */
              16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
              19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
            ];

            var dbase = [ /* Distance codes 0..29 base */
              1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
              257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
              8193, 12289, 16385, 24577, 0, 0
            ];

            var dext = [ /* Distance codes 0..29 extra */
              16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
              23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
              28, 28, 29, 29, 64, 64
            ];

            module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
                var bits = opts.bits;
                //here = opts.here; /* table entry for duplication */

                var len = 0;               /* a code's length in bits */
                var sym = 0;               /* index of code symbols */
                var min = 0, max = 0;          /* minimum and maximum code lengths */
                var root = 0;              /* number of index bits for root table */
                var curr = 0;              /* number of index bits for current table */
                var drop = 0;              /* code bits to drop for sub-table */
                var left = 0;                   /* number of prefix codes available */
                var used = 0;              /* code entries in table used */
                var huff = 0;              /* Huffman code */
                var incr;              /* for incrementing code, index */
                var fill;              /* index for replicating entries */
                var low;               /* low bits for current root entry */
                var mask;              /* mask for low root bits */
                var next;             /* next available space in table */
                var base = null;     /* base value table to use */
                var base_index = 0;
                //  var shoextra;    /* extra bits table to use */
                var end;                    /* use base and extra for symbol > end */
                var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
                var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
                var extra = null;
                var extra_index = 0;

                var here_bits, here_op, here_val;

                /*
                 Process a set of code lengths to create a canonical Huffman code.  The
                 code lengths are lens[0..codes-1].  Each length corresponds to the
                 symbols 0..codes-1.  The Huffman code is generated by first sorting the
                 symbols by length from short to long, and retaining the symbol order
                 for codes with equal lengths.  Then the code starts with all zero bits
                 for the first code of the shortest length, and the codes are integer
                 increments for the same length, and zeros are appended as the length
                 increases.  For the deflate format, these bits are stored backwards
                 from their more natural integer increment ordering, and so when the
                 decoding tables are built in the large loop below, the integer codes
                 are incremented backwards.
              
                 This routine assumes, but does not check, that all of the entries in
                 lens[] are in the range 0..MAXBITS.  The caller must assure this.
                 1..MAXBITS is interpreted as that code length.  zero means that that
                 symbol does not occur in this code.
              
                 The codes are sorted by computing a count of codes for each length,
                 creating from that a table of starting indices for each length in the
                 sorted table, and then entering the symbols in order in the sorted
                 table.  The sorted table is work[], with that space being provided by
                 the caller.
              
                 The length counts are used for other purposes as well, i.e. finding
                 the minimum and maximum length codes, determining if there are any
                 codes at all, checking for a valid set of lengths, and looking ahead
                 at length counts to determine sub-table sizes when building the
                 decoding tables.
                 */

                /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
                for (len = 0; len <= MAXBITS; len++) {
                    count[len] = 0;
                }
                for (sym = 0; sym < codes; sym++) {
                    count[lens[lens_index + sym]]++;
                }

                /* bound code lengths, force root to be within code lengths */
                root = bits;
                for (max = MAXBITS; max >= 1; max--) {
                    if (count[max] !== 0) { break; }
                }
                if (root > max) {
                    root = max;
                }
                if (max === 0) {                     /* no symbols to code at all */
                    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
                    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
                    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
                    table[table_index++] = (1 << 24) | (64 << 16) | 0;


                    //table.op[opts.table_index] = 64;
                    //table.bits[opts.table_index] = 1;
                    //table.val[opts.table_index++] = 0;
                    table[table_index++] = (1 << 24) | (64 << 16) | 0;

                    opts.bits = 1;
                    return 0;     /* no symbols, but wait for decoding to report error */
                }
                for (min = 1; min < max; min++) {
                    if (count[min] !== 0) { break; }
                }
                if (root < min) {
                    root = min;
                }

                /* check for an over-subscribed or incomplete set of lengths */
                left = 1;
                for (len = 1; len <= MAXBITS; len++) {
                    left <<= 1;
                    left -= count[len];
                    if (left < 0) {
                        return -1;
                    }        /* over-subscribed */
                }
                if (left > 0 && (type === CODES || max !== 1)) {
                    return -1;                      /* incomplete set */
                }

                /* generate offsets into symbol table for each length for sorting */
                offs[1] = 0;
                for (len = 1; len < MAXBITS; len++) {
                    offs[len + 1] = offs[len] + count[len];
                }

                /* sort symbols by length, by symbol order within each length */
                for (sym = 0; sym < codes; sym++) {
                    if (lens[lens_index + sym] !== 0) {
                        work[offs[lens[lens_index + sym]]++] = sym;
                    }
                }

                /*
                 Create and fill in decoding tables.  In this loop, the table being
                 filled is at next and has curr index bits.  The code being used is huff
                 with length len.  That code is converted to an index by dropping drop
                 bits off of the bottom.  For codes where len is less than drop + curr,
                 those top drop + curr - len bits are incremented through all values to
                 fill the table with replicated entries.
              
                 root is the number of index bits for the root table.  When len exceeds
                 root, sub-tables are created pointed to by the root entry with an index
                 of the low root bits of huff.  This is saved in low to check for when a
                 new sub-table should be started.  drop is zero when the root table is
                 being filled, and drop is root when sub-tables are being filled.
              
                 When a new sub-table is needed, it is necessary to look ahead in the
                 code lengths to determine what size sub-table is needed.  The length
                 counts are used for this, and so count[] is decremented as codes are
                 entered in the tables.
              
                 used keeps track of how many table entries have been allocated from the
                 provided *table space.  It is checked for LENS and DIST tables against
                 the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
                 the initial root table size constants.  See the comments in inftrees.h
                 for more information.
              
                 sym increments through all symbols, and the loop terminates when
                 all codes of length max, i.e. all codes, have been processed.  This
                 routine permits incomplete codes, so another loop after this one fills
                 in the rest of the decoding tables with invalid code markers.
                 */

                /* set up for code type */
                // poor man optimization - use if-else instead of switch,
                // to avoid deopts in old v8
                if (type === CODES) {
                    base = extra = work;    /* dummy value--not used */
                    end = 19;

                } else if (type === LENS) {
                    base = lbase;
                    base_index -= 257;
                    extra = lext;
                    extra_index -= 257;
                    end = 256;

                } else {                    /* DISTS */
                    base = dbase;
                    extra = dext;
                    end = -1;
                }

                /* initialize opts for loop */
                huff = 0;                   /* starting code */
                sym = 0;                    /* starting code symbol */
                len = min;                  /* starting code length */
                next = table_index;              /* current table to fill in */
                curr = root;                /* current table index bits */
                drop = 0;                   /* current bits to drop from code for index */
                low = -1;                   /* trigger new sub-table when len > root */
                used = 1 << root;          /* use root table entries */
                mask = used - 1;            /* mask for comparing low */

                /* check available table space */
                if ((type === LENS && used > ENOUGH_LENS) ||
                  (type === DISTS && used > ENOUGH_DISTS)) {
                    return 1;
                }

                var i = 0;
                /* process all codes and make table entries */
                for (; ;) {
                    i++;
                    /* create table entry */
                    here_bits = len - drop;
                    if (work[sym] < end) {
                        here_op = 0;
                        here_val = work[sym];
                    }
                    else if (work[sym] > end) {
                        here_op = extra[extra_index + work[sym]];
                        here_val = base[base_index + work[sym]];
                    }
                    else {
                        here_op = 32 + 64;         /* end of block */
                        here_val = 0;
                    }

                    /* replicate for those indices with low len bits equal to huff */
                    incr = 1 << (len - drop);
                    fill = 1 << curr;
                    min = fill;                 /* save offset to next table */
                    do {
                        fill -= incr;
                        table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val | 0;
                    } while (fill !== 0);

                    /* backwards increment the len-bit code huff */
                    incr = 1 << (len - 1);
                    while (huff & incr) {
                        incr >>= 1;
                    }
                    if (incr !== 0) {
                        huff &= incr - 1;
                        huff += incr;
                    } else {
                        huff = 0;
                    }

                    /* go to next symbol, update count, len */
                    sym++;
                    if (--count[len] === 0) {
                        if (len === max) { break; }
                        len = lens[lens_index + work[sym]];
                    }

                    /* create new sub-table if needed */
                    if (len > root && (huff & mask) !== low) {
                        /* if first time, transition to sub-tables */
                        if (drop === 0) {
                            drop = root;
                        }

                        /* increment past last table */
                        next += min;            /* here min is 1 << curr */

                        /* determine length of next table */
                        curr = len - drop;
                        left = 1 << curr;
                        while (curr + drop < max) {
                            left -= count[curr + drop];
                            if (left <= 0) { break; }
                            curr++;
                            left <<= 1;
                        }

                        /* check for enough space */
                        used += 1 << curr;
                        if ((type === LENS && used > ENOUGH_LENS) ||
                          (type === DISTS && used > ENOUGH_DISTS)) {
                            return 1;
                        }

                        /* point entry in root table to sub-table */
                        low = huff & mask;
                        /*table.op[low] = curr;
                        table.bits[low] = root;
                        table.val[low] = next - opts.table_index;*/
                        table[low] = (root << 24) | (curr << 16) | (next - table_index) | 0;
                    }
                }

                /* fill in remaining table entry if code is incomplete (guaranteed to have
                 at most one remaining entry, since if the code is incomplete, the
                 maximum code length that was allowed to get this far is one bit) */
                if (huff !== 0) {
                    //table.op[next + huff] = 64;            /* invalid code marker */
                    //table.bits[next + huff] = len - drop;
                    //table.val[next + huff] = 0;
                    table[next + huff] = ((len - drop) << 24) | (64 << 16) | 0;
                }

                /* set return parameters */
                //opts.table_index += used;
                opts.bits = root;
                return 0;
            };

        }, { "../utils/common": 62 }], 72: [function (require, module, exports) {
            'use strict';

            module.exports = {
                2: 'need dictionary',     /* Z_NEED_DICT       2  */
                1: 'stream end',          /* Z_STREAM_END      1  */
                0: '',                    /* Z_OK              0  */
                '-1': 'file error',          /* Z_ERRNO         (-1) */
                '-2': 'stream error',        /* Z_STREAM_ERROR  (-2) */
                '-3': 'data error',          /* Z_DATA_ERROR    (-3) */
                '-4': 'insufficient memory', /* Z_MEM_ERROR     (-4) */
                '-5': 'buffer error',        /* Z_BUF_ERROR     (-5) */
                '-6': 'incompatible version' /* Z_VERSION_ERROR (-6) */
            };

        }, {}], 73: [function (require, module, exports) {
            'use strict';


            var utils = require('../utils/common');

            /* Public constants ==========================================================*/
            /* ===========================================================================*/


            //var Z_FILTERED          = 1;
            //var Z_HUFFMAN_ONLY      = 2;
            //var Z_RLE               = 3;
            var Z_FIXED = 4;
            //var Z_DEFAULT_STRATEGY  = 0;

            /* Possible values of the data_type field (though see inflate()) */
            var Z_BINARY = 0;
            var Z_TEXT = 1;
            //var Z_ASCII             = 1; // = Z_TEXT
            var Z_UNKNOWN = 2;

            /*============================================================================*/


            function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

            // From zutil.h

            var STORED_BLOCK = 0;
            var STATIC_TREES = 1;
            var DYN_TREES = 2;
            /* The three kinds of block type */

            var MIN_MATCH = 3;
            var MAX_MATCH = 258;
            /* The minimum and maximum match lengths */

            // From deflate.h
            /* ===========================================================================
             * Internal compression state.
             */

            var LENGTH_CODES = 29;
            /* number of length codes, not counting the special END_BLOCK code */

            var LITERALS = 256;
            /* number of literal bytes 0..255 */

            var L_CODES = LITERALS + 1 + LENGTH_CODES;
            /* number of Literal or Length codes, including the END_BLOCK code */

            var D_CODES = 30;
            /* number of distance codes */

            var BL_CODES = 19;
            /* number of codes used to transfer the bit lengths */

            var HEAP_SIZE = 2 * L_CODES + 1;
            /* maximum heap size */

            var MAX_BITS = 15;
            /* All codes must not exceed MAX_BITS bits */

            var Buf_size = 16;
            /* size of bit buffer in bi_buf */


            /* ===========================================================================
             * Constants
             */

            var MAX_BL_BITS = 7;
            /* Bit length codes must not exceed MAX_BL_BITS bits */

            var END_BLOCK = 256;
            /* end of block literal code */

            var REP_3_6 = 16;
            /* repeat previous bit length 3-6 times (2 bits of repeat count) */

            var REPZ_3_10 = 17;
            /* repeat a zero length 3-10 times  (3 bits of repeat count) */

            var REPZ_11_138 = 18;
            /* repeat a zero length 11-138 times  (7 bits of repeat count) */

            /* eslint-disable comma-spacing,array-bracket-spacing */
            var extra_lbits =   /* extra bits for each length code */
              [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];

            var extra_dbits =   /* extra bits for each distance code */
              [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

            var extra_blbits =  /* extra bits for each bit length code */
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];

            var bl_order =
              [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            /* eslint-enable comma-spacing,array-bracket-spacing */

            /* The lengths of the bit length codes are sent in order of decreasing
             * probability, to avoid transmitting the lengths for unused bit length codes.
             */

            /* ===========================================================================
             * Local data. These are initialized only once.
             */

            // We pre-fill arrays with 0 to avoid uninitialized gaps

            var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

            // !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
            var static_ltree = new Array((L_CODES + 2) * 2);
            zero(static_ltree);
            /* The static literal tree. Since the bit lengths are imposed, there is no
             * need for the L_CODES extra codes used during heap construction. However
             * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
             * below).
             */

            var static_dtree = new Array(D_CODES * 2);
            zero(static_dtree);
            /* The static distance tree. (Actually a trivial tree since all codes use
             * 5 bits.)
             */

            var _dist_code = new Array(DIST_CODE_LEN);
            zero(_dist_code);
            /* Distance codes. The first 256 values correspond to the distances
             * 3 .. 258, the last 256 values correspond to the top 8 bits of
             * the 15 bit distances.
             */

            var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
            zero(_length_code);
            /* length code for each normalized match length (0 == MIN_MATCH) */

            var base_length = new Array(LENGTH_CODES);
            zero(base_length);
            /* First normalized length for each code (0 = MIN_MATCH) */

            var base_dist = new Array(D_CODES);
            zero(base_dist);
            /* First normalized distance for each code (0 = distance of 1) */


            function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

                this.static_tree = static_tree;  /* static tree or NULL */
                this.extra_bits = extra_bits;   /* extra bits for each code or NULL */
                this.extra_base = extra_base;   /* base index for extra_bits */
                this.elems = elems;        /* max number of elements in the tree */
                this.max_length = max_length;   /* max bit length for the codes */

                // show if `static_tree` has data or dummy - needed for monomorphic objects
                this.has_stree = static_tree && static_tree.length;
            }


            var static_l_desc;
            var static_d_desc;
            var static_bl_desc;


            function TreeDesc(dyn_tree, stat_desc) {
                this.dyn_tree = dyn_tree;     /* the dynamic tree */
                this.max_code = 0;            /* largest code with non zero frequency */
                this.stat_desc = stat_desc;   /* the corresponding static tree */
            }



            function d_code(dist) {
                return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
            }


            /* ===========================================================================
             * Output a short LSB first on the stream.
             * IN assertion: there is enough room in pendingBuf.
             */
            function put_short(s, w) {
                //    put_byte(s, (uch)((w) & 0xff));
                //    put_byte(s, (uch)((ush)(w) >> 8));
                s.pending_buf[s.pending++] = (w) & 0xff;
                s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
            }


            /* ===========================================================================
             * Send a value on a given number of bits.
             * IN assertion: length <= 16 and value fits in length bits.
             */
            function send_bits(s, value, length) {
                if (s.bi_valid > (Buf_size - length)) {
                    s.bi_buf |= (value << s.bi_valid) & 0xffff;
                    put_short(s, s.bi_buf);
                    s.bi_buf = value >> (Buf_size - s.bi_valid);
                    s.bi_valid += length - Buf_size;
                } else {
                    s.bi_buf |= (value << s.bi_valid) & 0xffff;
                    s.bi_valid += length;
                }
            }


            function send_code(s, c, tree) {
                send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
            }


            /* ===========================================================================
             * Reverse the first len bits of a code, using straightforward code (a faster
             * method would use a table)
             * IN assertion: 1 <= len <= 15
             */
            function bi_reverse(code, len) {
                var res = 0;
                do {
                    res |= code & 1;
                    code >>>= 1;
                    res <<= 1;
                } while (--len > 0);
                return res >>> 1;
            }


            /* ===========================================================================
             * Flush the bit buffer, keeping at most 7 bits in it.
             */
            function bi_flush(s) {
                if (s.bi_valid === 16) {
                    put_short(s, s.bi_buf);
                    s.bi_buf = 0;
                    s.bi_valid = 0;

                } else if (s.bi_valid >= 8) {
                    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
                    s.bi_buf >>= 8;
                    s.bi_valid -= 8;
                }
            }


            /* ===========================================================================
             * Compute the optimal bit lengths for a tree and update the total bit length
             * for the current block.
             * IN assertion: the fields freq and dad are set, heap[heap_max] and
             *    above are the tree nodes sorted by increasing frequency.
             * OUT assertions: the field len is set to the optimal bit length, the
             *     array bl_count contains the frequencies for each bit length.
             *     The length opt_len is updated; static_len is also updated if stree is
             *     not null.
             */
            function gen_bitlen(s, desc)
                //    deflate_state *s;
                //    tree_desc *desc;    /* the tree descriptor */
            {
                var tree = desc.dyn_tree;
                var max_code = desc.max_code;
                var stree = desc.stat_desc.static_tree;
                var has_stree = desc.stat_desc.has_stree;
                var extra = desc.stat_desc.extra_bits;
                var base = desc.stat_desc.extra_base;
                var max_length = desc.stat_desc.max_length;
                var h;              /* heap index */
                var n, m;           /* iterate over the tree elements */
                var bits;           /* bit length */
                var xbits;          /* extra bits */
                var f;              /* frequency */
                var overflow = 0;   /* number of elements with bit length too large */

                for (bits = 0; bits <= MAX_BITS; bits++) {
                    s.bl_count[bits] = 0;
                }

                /* In a first pass, compute the optimal bit lengths (which may
                 * overflow in the case of the bit length tree).
                 */
                tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

                for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
                    n = s.heap[h];
                    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
                    if (bits > max_length) {
                        bits = max_length;
                        overflow++;
                    }
                    tree[n * 2 + 1]/*.Len*/ = bits;
                    /* We overwrite tree[n].Dad which is no longer needed */

                    if (n > max_code) { continue; } /* not a leaf node */

                    s.bl_count[bits]++;
                    xbits = 0;
                    if (n >= base) {
                        xbits = extra[n - base];
                    }
                    f = tree[n * 2]/*.Freq*/;
                    s.opt_len += f * (bits + xbits);
                    if (has_stree) {
                        s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
                    }
                }
                if (overflow === 0) { return; }

                // Trace((stderr,"\nbit length overflow\n"));
                /* This happens for example on obj2 and pic of the Calgary corpus */

                /* Find the first bit length which could increase: */
                do {
                    bits = max_length - 1;
                    while (s.bl_count[bits] === 0) { bits--; }
                    s.bl_count[bits]--;      /* move one leaf down the tree */
                    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
                    s.bl_count[max_length]--;
                    /* The brother of the overflow item also moves one step up,
                     * but this does not affect bl_count[max_length]
                     */
                    overflow -= 2;
                } while (overflow > 0);

                /* Now recompute all bit lengths, scanning in increasing frequency.
                 * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
                 * lengths instead of fixing only the wrong ones. This idea is taken
                 * from 'ar' written by Haruhiko Okumura.)
                 */
                for (bits = max_length; bits !== 0; bits--) {
                    n = s.bl_count[bits];
                    while (n !== 0) {
                        m = s.heap[--h];
                        if (m > max_code) { continue; }
                        if (tree[m * 2 + 1]/*.Len*/ !== bits) {
                            // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
                            s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
                            tree[m * 2 + 1]/*.Len*/ = bits;
                        }
                        n--;
                    }
                }
            }


            /* ===========================================================================
             * Generate the codes for a given tree and bit counts (which need not be
             * optimal).
             * IN assertion: the array bl_count contains the bit length statistics for
             * the given tree and the field len is set for all tree elements.
             * OUT assertion: the field code is set for all tree elements of non
             *     zero code length.
             */
            function gen_codes(tree, max_code, bl_count)
                //    ct_data *tree;             /* the tree to decorate */
                //    int max_code;              /* largest code with non zero frequency */
                //    ushf *bl_count;            /* number of codes at each bit length */
            {
                var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
                var code = 0;              /* running code value */
                var bits;                  /* bit index */
                var n;                     /* code index */

                /* The distribution counts are first used to generate the code values
                 * without bit reversal.
                 */
                for (bits = 1; bits <= MAX_BITS; bits++) {
                    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
                }
                /* Check that the bit counts in bl_count are consistent. The last code
                 * must be all ones.
                 */
                //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
                //        "inconsistent bit counts");
                //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

                for (n = 0; n <= max_code; n++) {
                    var len = tree[n * 2 + 1]/*.Len*/;
                    if (len === 0) { continue; }
                    /* Now reverse the bits */
                    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

                    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
                    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
                }
            }


            /* ===========================================================================
             * Initialize the various 'constant' tables.
             */
            function tr_static_init() {
                var n;        /* iterates over tree elements */
                var bits;     /* bit counter */
                var length;   /* length value */
                var code;     /* code value */
                var dist;     /* distance index */
                var bl_count = new Array(MAX_BITS + 1);
                /* number of codes at each bit length for an optimal tree */

                // do check in _tr_init()
                //if (static_init_done) return;

                /* For some embedded targets, global variables are not initialized: */
                /*#ifdef NO_INIT_GLOBAL_POINTERS
                  static_l_desc.static_tree = static_ltree;
                  static_l_desc.extra_bits = extra_lbits;
                  static_d_desc.static_tree = static_dtree;
                  static_d_desc.extra_bits = extra_dbits;
                  static_bl_desc.extra_bits = extra_blbits;
                #endif*/

                /* Initialize the mapping length (0..255) -> length code (0..28) */
                length = 0;
                for (code = 0; code < LENGTH_CODES - 1; code++) {
                    base_length[code] = length;
                    for (n = 0; n < (1 << extra_lbits[code]) ; n++) {
                        _length_code[length++] = code;
                    }
                }
                //Assert (length == 256, "tr_static_init: length != 256");
                /* Note that the length 255 (match length 258) can be represented
                 * in two different ways: code 284 + 5 bits or code 285, so we
                 * overwrite length_code[255] to use the best encoding:
                 */
                _length_code[length - 1] = code;

                /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
                dist = 0;
                for (code = 0; code < 16; code++) {
                    base_dist[code] = dist;
                    for (n = 0; n < (1 << extra_dbits[code]) ; n++) {
                        _dist_code[dist++] = code;
                    }
                }
                //Assert (dist == 256, "tr_static_init: dist != 256");
                dist >>= 7; /* from now on, all distances are divided by 128 */
                for (; code < D_CODES; code++) {
                    base_dist[code] = dist << 7;
                    for (n = 0; n < (1 << (extra_dbits[code] - 7)) ; n++) {
                        _dist_code[256 + dist++] = code;
                    }
                }
                //Assert (dist == 256, "tr_static_init: 256+dist != 512");

                /* Construct the codes of the static literal tree */
                for (bits = 0; bits <= MAX_BITS; bits++) {
                    bl_count[bits] = 0;
                }

                n = 0;
                while (n <= 143) {
                    static_ltree[n * 2 + 1]/*.Len*/ = 8;
                    n++;
                    bl_count[8]++;
                }
                while (n <= 255) {
                    static_ltree[n * 2 + 1]/*.Len*/ = 9;
                    n++;
                    bl_count[9]++;
                }
                while (n <= 279) {
                    static_ltree[n * 2 + 1]/*.Len*/ = 7;
                    n++;
                    bl_count[7]++;
                }
                while (n <= 287) {
                    static_ltree[n * 2 + 1]/*.Len*/ = 8;
                    n++;
                    bl_count[8]++;
                }
                /* Codes 286 and 287 do not exist, but we must include them in the
                 * tree construction to get a canonical Huffman tree (longest code
                 * all ones)
                 */
                gen_codes(static_ltree, L_CODES + 1, bl_count);

                /* The static distance tree is trivial: */
                for (n = 0; n < D_CODES; n++) {
                    static_dtree[n * 2 + 1]/*.Len*/ = 5;
                    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
                }

                // Now data ready and we can init static trees
                static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
                static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
                static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);

                //static_init_done = true;
            }


            /* ===========================================================================
             * Initialize a new block.
             */
            function init_block(s) {
                var n; /* iterates over tree elements */

                /* Initialize the trees. */
                for (n = 0; n < L_CODES; n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
                for (n = 0; n < D_CODES; n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
                for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

                s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
                s.opt_len = s.static_len = 0;
                s.last_lit = s.matches = 0;
            }


            /* ===========================================================================
             * Flush the bit buffer and align the output on a byte boundary
             */
            function bi_windup(s) {
                if (s.bi_valid > 8) {
                    put_short(s, s.bi_buf);
                } else if (s.bi_valid > 0) {
                    //put_byte(s, (Byte)s->bi_buf);
                    s.pending_buf[s.pending++] = s.bi_buf;
                }
                s.bi_buf = 0;
                s.bi_valid = 0;
            }

            /* ===========================================================================
             * Copy a stored block, storing first the length and its
             * one's complement if requested.
             */
            function copy_block(s, buf, len, header)
                //DeflateState *s;
                //charf    *buf;    /* the input data */
                //unsigned len;     /* its length */
                //int      header;  /* true if block header must be written */
            {
                bi_windup(s);        /* align on byte boundary */

                if (header) {
                    put_short(s, len);
                    put_short(s, ~len);
                }
                //  while (len--) {
                //    put_byte(s, *buf++);
                //  }
                utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
                s.pending += len;
            }

            /* ===========================================================================
             * Compares to subtrees, using the tree depth as tie breaker when
             * the subtrees have equal frequency. This minimizes the worst case length.
             */
            function smaller(tree, n, m, depth) {
                var _n2 = n * 2;
                var _m2 = m * 2;
                return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
                       (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
            }

            /* ===========================================================================
             * Restore the heap property by moving down the tree starting at node k,
             * exchanging a node with the smallest of its two sons if necessary, stopping
             * when the heap property is re-established (each father smaller than its
             * two sons).
             */
            function pqdownheap(s, tree, k)
                //    deflate_state *s;
                //    ct_data *tree;  /* the tree to restore */
                //    int k;               /* node to move down */
            {
                var v = s.heap[k];
                var j = k << 1;  /* left son of k */
                while (j <= s.heap_len) {
                    /* Set j to the smallest of the two sons: */
                    if (j < s.heap_len &&
                      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
                        j++;
                    }
                    /* Exit if v is smaller than both sons */
                    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

                    /* Exchange v with the smallest son */
                    s.heap[k] = s.heap[j];
                    k = j;

                    /* And continue down the tree, setting j to the left son of k */
                    j <<= 1;
                }
                s.heap[k] = v;
            }


            // inlined manually
            // var SMALLEST = 1;

            /* ===========================================================================
             * Send the block data compressed using the given Huffman trees
             */
            function compress_block(s, ltree, dtree)
                //    deflate_state *s;
                //    const ct_data *ltree; /* literal tree */
                //    const ct_data *dtree; /* distance tree */
            {
                var dist;           /* distance of matched string */
                var lc;             /* match length or unmatched char (if dist == 0) */
                var lx = 0;         /* running index in l_buf */
                var code;           /* the code to send */
                var extra;          /* number of extra bits to send */

                if (s.last_lit !== 0) {
                    do {
                        dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
                        lc = s.pending_buf[s.l_buf + lx];
                        lx++;

                        if (dist === 0) {
                            send_code(s, lc, ltree); /* send a literal byte */
                            //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
                        } else {
                            /* Here, lc is the match length - MIN_MATCH */
                            code = _length_code[lc];
                            send_code(s, code + LITERALS + 1, ltree); /* send the length code */
                            extra = extra_lbits[code];
                            if (extra !== 0) {
                                lc -= base_length[code];
                                send_bits(s, lc, extra);       /* send the extra length bits */
                            }
                            dist--; /* dist is now the match distance - 1 */
                            code = d_code(dist);
                            //Assert (code < D_CODES, "bad d_code");

                            send_code(s, code, dtree);       /* send the distance code */
                            extra = extra_dbits[code];
                            if (extra !== 0) {
                                dist -= base_dist[code];
                                send_bits(s, dist, extra);   /* send the extra distance bits */
                            }
                        } /* literal or match pair ? */

                        /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
                        //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
                        //       "pendingBuf overflow");

                    } while (lx < s.last_lit);
                }

                send_code(s, END_BLOCK, ltree);
            }


            /* ===========================================================================
             * Construct one Huffman tree and assigns the code bit strings and lengths.
             * Update the total bit length for the current block.
             * IN assertion: the field freq is set for all tree elements.
             * OUT assertions: the fields len and code are set to the optimal bit length
             *     and corresponding code. The length opt_len is updated; static_len is
             *     also updated if stree is not null. The field max_code is set.
             */
            function build_tree(s, desc)
                //    deflate_state *s;
                //    tree_desc *desc; /* the tree descriptor */
            {
                var tree = desc.dyn_tree;
                var stree = desc.stat_desc.static_tree;
                var has_stree = desc.stat_desc.has_stree;
                var elems = desc.stat_desc.elems;
                var n, m;          /* iterate over heap elements */
                var max_code = -1; /* largest code with non zero frequency */
                var node;          /* new node being created */

                /* Construct the initial heap, with least frequent element in
                 * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
                 * heap[0] is not used.
                 */
                s.heap_len = 0;
                s.heap_max = HEAP_SIZE;

                for (n = 0; n < elems; n++) {
                    if (tree[n * 2]/*.Freq*/ !== 0) {
                        s.heap[++s.heap_len] = max_code = n;
                        s.depth[n] = 0;

                    } else {
                        tree[n * 2 + 1]/*.Len*/ = 0;
                    }
                }

                /* The pkzip format requires that at least one distance code exists,
                 * and that at least one bit should be sent even if there is only one
                 * possible code. So to avoid special checks later on we force at least
                 * two codes of non zero frequency.
                 */
                while (s.heap_len < 2) {
                    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
                    tree[node * 2]/*.Freq*/ = 1;
                    s.depth[node] = 0;
                    s.opt_len--;

                    if (has_stree) {
                        s.static_len -= stree[node * 2 + 1]/*.Len*/;
                    }
                    /* node is 0 or 1 so it does not have extra bits */
                }
                desc.max_code = max_code;

                /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
                 * establish sub-heaps of increasing lengths:
                 */
                for (n = (s.heap_len >> 1/*int /2*/) ; n >= 1; n--) { pqdownheap(s, tree, n); }

                /* Construct the Huffman tree by repeatedly combining the least two
                 * frequent nodes.
                 */
                node = elems;              /* next internal node of the tree */
                do {
                    //pqremove(s, tree, n);  /* n = node of least frequency */
                    /*** pqremove ***/
                    n = s.heap[1/*SMALLEST*/];
                    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
                    pqdownheap(s, tree, 1/*SMALLEST*/);
                    /***/

                    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

                    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
                    s.heap[--s.heap_max] = m;

                    /* Create a new node father of n and m */
                    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
                    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
                    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

                    /* and insert the new node in the heap */
                    s.heap[1/*SMALLEST*/] = node++;
                    pqdownheap(s, tree, 1/*SMALLEST*/);

                } while (s.heap_len >= 2);

                s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

                /* At this point, the fields freq and dad are set. We can now
                 * generate the bit lengths.
                 */
                gen_bitlen(s, desc);

                /* The field len is now set, we can generate the bit codes */
                gen_codes(tree, max_code, s.bl_count);
            }


            /* ===========================================================================
             * Scan a literal or distance tree to determine the frequencies of the codes
             * in the bit length tree.
             */
            function scan_tree(s, tree, max_code)
                //    deflate_state *s;
                //    ct_data *tree;   /* the tree to be scanned */
                //    int max_code;    /* and its largest code of non zero frequency */
            {
                var n;                     /* iterates over all tree elements */
                var prevlen = -1;          /* last emitted length */
                var curlen;                /* length of current code */

                var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

                var count = 0;             /* repeat count of the current code */
                var max_count = 7;         /* max repeat count */
                var min_count = 4;         /* min repeat count */

                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }
                tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

                    if (++count < max_count && curlen === nextlen) {
                        continue;

                    } else if (count < min_count) {
                        s.bl_tree[curlen * 2]/*.Freq*/ += count;

                    } else if (curlen !== 0) {

                        if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
                        s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

                    } else if (count <= 10) {
                        s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

                    } else {
                        s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
                    }

                    count = 0;
                    prevlen = curlen;

                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;

                    } else if (curlen === nextlen) {
                        max_count = 6;
                        min_count = 3;

                    } else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            }


            /* ===========================================================================
             * Send a literal or distance tree in compressed form, using the codes in
             * bl_tree.
             */
            function send_tree(s, tree, max_code)
                //    deflate_state *s;
                //    ct_data *tree; /* the tree to be scanned */
                //    int max_code;       /* and its largest code of non zero frequency */
            {
                var n;                     /* iterates over all tree elements */
                var prevlen = -1;          /* last emitted length */
                var curlen;                /* length of current code */

                var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

                var count = 0;             /* repeat count of the current code */
                var max_count = 7;         /* max repeat count */
                var min_count = 4;         /* min repeat count */

                /* tree[max_code+1].Len = -1; */  /* guard already set */
                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }

                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

                    if (++count < max_count && curlen === nextlen) {
                        continue;

                    } else if (count < min_count) {
                        do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

                    } else if (curlen !== 0) {
                        if (curlen !== prevlen) {
                            send_code(s, curlen, s.bl_tree);
                            count--;
                        }
                        //Assert(count >= 3 && count <= 6, " 3_6?");
                        send_code(s, REP_3_6, s.bl_tree);
                        send_bits(s, count - 3, 2);

                    } else if (count <= 10) {
                        send_code(s, REPZ_3_10, s.bl_tree);
                        send_bits(s, count - 3, 3);

                    } else {
                        send_code(s, REPZ_11_138, s.bl_tree);
                        send_bits(s, count - 11, 7);
                    }

                    count = 0;
                    prevlen = curlen;
                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;

                    } else if (curlen === nextlen) {
                        max_count = 6;
                        min_count = 3;

                    } else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            }


            /* ===========================================================================
             * Construct the Huffman tree for the bit lengths and return the index in
             * bl_order of the last bit length code to send.
             */
            function build_bl_tree(s) {
                var max_blindex;  /* index of last bit length code of non zero freq */

                /* Determine the bit length frequencies for literal and distance trees */
                scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
                scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

                /* Build the bit length tree: */
                build_tree(s, s.bl_desc);
                /* opt_len now includes the length of the tree representations, except
                 * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
                 */

                /* Determine the number of bit length codes to send. The pkzip format
                 * requires that at least 4 bit length codes be sent. (appnote.txt says
                 * 3 but the actual value used is 4.)
                 */
                for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
                    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
                        break;
                    }
                }
                /* Update opt_len to include the bit length tree and counts */
                s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
                //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
                //        s->opt_len, s->static_len));

                return max_blindex;
            }


            /* ===========================================================================
             * Send the header for a block using dynamic Huffman trees: the counts, the
             * lengths of the bit length codes, the literal tree and the distance tree.
             * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
             */
            function send_all_trees(s, lcodes, dcodes, blcodes)
                //    deflate_state *s;
                //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
            {
                var rank;                    /* index in bl_order */

                //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
                //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
                //        "too many codes");
                //Tracev((stderr, "\nbl counts: "));
                send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
                send_bits(s, dcodes - 1, 5);
                send_bits(s, blcodes - 4, 4); /* not -3 as stated in appnote.txt */
                for (rank = 0; rank < blcodes; rank++) {
                    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
                    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
                }
                //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

                send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
                //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

                send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
                //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
            }


            /* ===========================================================================
             * Check if the data type is TEXT or BINARY, using the following algorithm:
             * - TEXT if the two conditions below are satisfied:
             *    a) There are no non-portable control characters belonging to the
             *       "black list" (0..6, 14..25, 28..31).
             *    b) There is at least one printable character belonging to the
             *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
             * - BINARY otherwise.
             * - The following partially-portable control characters form a
             *   "gray list" that is ignored in this detection algorithm:
             *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
             * IN assertion: the fields Freq of dyn_ltree are set.
             */
            function detect_data_type(s) {
                /* black_mask is the bit mask of black-listed bytes
                 * set bits 0..6, 14..25, and 28..31
                 * 0xf3ffc07f = binary 11110011111111111100000001111111
                 */
                var black_mask = 0xf3ffc07f;
                var n;

                /* Check for non-textual ("black-listed") bytes. */
                for (n = 0; n <= 31; n++, black_mask >>>= 1) {
                    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
                        return Z_BINARY;
                    }
                }

                /* Check for textual ("white-listed") bytes. */
                if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
                    s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
                    return Z_TEXT;
                }
                for (n = 32; n < LITERALS; n++) {
                    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
                        return Z_TEXT;
                    }
                }

                /* There are no "black-listed" or "white-listed" bytes:
                 * this stream either is empty or has tolerated ("gray-listed") bytes only.
                 */
                return Z_BINARY;
            }


            var static_init_done = false;

            /* ===========================================================================
             * Initialize the tree data structures for a new zlib stream.
             */
            function _tr_init(s) {

                if (!static_init_done) {
                    tr_static_init();
                    static_init_done = true;
                }

                s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
                s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
                s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

                s.bi_buf = 0;
                s.bi_valid = 0;

                /* Initialize the first block of the first file: */
                init_block(s);
            }


            /* ===========================================================================
             * Send a stored block
             */
            function _tr_stored_block(s, buf, stored_len, last)
                //DeflateState *s;
                //charf *buf;       /* input block */
                //ulg stored_len;   /* length of input block */
                //int last;         /* one if this is the last block for a file */
            {
                send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
                copy_block(s, buf, stored_len, true); /* with header */
            }


            /* ===========================================================================
             * Send one empty static block to give enough lookahead for inflate.
             * This takes 10 bits, of which 7 may remain in the bit buffer.
             */
            function _tr_align(s) {
                send_bits(s, STATIC_TREES << 1, 3);
                send_code(s, END_BLOCK, static_ltree);
                bi_flush(s);
            }


            /* ===========================================================================
             * Determine the best encoding for the current block: dynamic trees, static
             * trees or store, and output the encoded block to the zip file.
             */
            function _tr_flush_block(s, buf, stored_len, last)
                //DeflateState *s;
                //charf *buf;       /* input block, or NULL if too old */
                //ulg stored_len;   /* length of input block */
                //int last;         /* one if this is the last block for a file */
            {
                var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
                var max_blindex = 0;        /* index of last bit length code of non zero freq */

                /* Build the Huffman trees unless a stored block is forced */
                if (s.level > 0) {

                    /* Check if the file is binary or text */
                    if (s.strm.data_type === Z_UNKNOWN) {
                        s.strm.data_type = detect_data_type(s);
                    }

                    /* Construct the literal and distance trees */
                    build_tree(s, s.l_desc);
                    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
                    //        s->static_len));

                    build_tree(s, s.d_desc);
                    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
                    //        s->static_len));
                    /* At this point, opt_len and static_len are the total bit lengths of
                     * the compressed block data, excluding the tree representations.
                     */

                    /* Build the bit length tree for the above two trees, and get the index
                     * in bl_order of the last bit length code to send.
                     */
                    max_blindex = build_bl_tree(s);

                    /* Determine the best encoding. Compute the block lengths in bytes. */
                    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
                    static_lenb = (s.static_len + 3 + 7) >>> 3;

                    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
                    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
                    //        s->last_lit));

                    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

                } else {
                    // Assert(buf != (char*)0, "lost buf");
                    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
                }

                if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
                    /* 4: two words for the lengths */

                    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
                     * Otherwise we can't have processed more than WSIZE input bytes since
                     * the last block flush, because compression would have been
                     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
                     * transform a block into a stored block.
                     */
                    _tr_stored_block(s, buf, stored_len, last);

                } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

                    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
                    compress_block(s, static_ltree, static_dtree);

                } else {
                    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
                    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
                    compress_block(s, s.dyn_ltree, s.dyn_dtree);
                }
                // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
                /* The above check is made mod 2^32, for files larger than 512 MB
                 * and uLong implemented on 32 bits.
                 */
                init_block(s);

                if (last) {
                    bi_windup(s);
                }
                // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
                //       s->compressed_len-7*last));
            }

            /* ===========================================================================
             * Save the match info and tally the frequency counts. Return true if
             * the current block must be flushed.
             */
            function _tr_tally(s, dist, lc)
                //    deflate_state *s;
                //    unsigned dist;  /* distance of matched string */
                //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
            {
                //var out_length, in_length, dcode;

                s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 0xff;
                s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

                s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
                s.last_lit++;

                if (dist === 0) {
                    /* lc is the unmatched char */
                    s.dyn_ltree[lc * 2]/*.Freq*/++;
                } else {
                    s.matches++;
                    /* Here, lc is the match length - MIN_MATCH */
                    dist--;             /* dist = match distance - 1 */
                    //Assert((ush)dist < (ush)MAX_DIST(s) &&
                    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
                    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

                    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
                    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
                }

                // (!) This block is disabled in zlib defailts,
                // don't enable it for binary compatibility

                //#ifdef TRUNCATE_BLOCK
                //  /* Try to guess if it is profitable to stop the current block here */
                //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
                //    /* Compute an upper bound for the compressed length */
                //    out_length = s.last_lit*8;
                //    in_length = s.strstart - s.block_start;
                //
                //    for (dcode = 0; dcode < D_CODES; dcode++) {
                //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
                //    }
                //    out_length >>>= 3;
                //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
                //    //       s->last_lit, in_length, out_length,
                //    //       100L - out_length*100L/in_length));
                //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
                //      return true;
                //    }
                //  }
                //#endif

                return (s.last_lit === s.lit_bufsize - 1);
                /* We avoid equality with lit_bufsize because of wraparound at 64K
                 * on 16 bit machines and because stored blocks are restricted to
                 * 64K-1 bytes.
                 */
            }

            exports._tr_init = _tr_init;
            exports._tr_stored_block = _tr_stored_block;
            exports._tr_flush_block = _tr_flush_block;
            exports._tr_tally = _tr_tally;
            exports._tr_align = _tr_align;

        }, { "../utils/common": 62 }], 74: [function (require, module, exports) {
            'use strict';


            function ZStream() {
                /* next input byte */
                this.input = null; // JS specific, because we have no pointers
                this.next_in = 0;
                /* number of bytes available at input */
                this.avail_in = 0;
                /* total number of input bytes read so far */
                this.total_in = 0;
                /* next output byte should be put there */
                this.output = null; // JS specific, because we have no pointers
                this.next_out = 0;
                /* remaining free space at output */
                this.avail_out = 0;
                /* total number of bytes output so far */
                this.total_out = 0;
                /* last error message, NULL if no error */
                this.msg = ''/*Z_NULL*/;
                /* not visible by applications */
                this.state = null;
                /* best guess about the data type: binary or text */
                this.data_type = 2/*Z_UNKNOWN*/;
                /* adler32 value of the uncompressed data */
                this.adler = 0;
            }

            module.exports = ZStream;

        }, {}]
    }, {}, [10])(10)
});



/*CanvasNote fileserver.js*/

/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function (view) {
      "use strict";
      // IE <10 is explicitly unsupported
      if (typeof navigator !== "undefined" &&
          /MSIE [1-9]\./.test(navigator.userAgent)) {
          return;
      }
      var
            doc = view.document
            // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
          , get_URL = function () {
              return view.URL || view.webkitURL || view;
          }
          , URL = view.URL || view.webkitURL || view
          , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
          , can_use_save_link = !view.externalHost && "download" in save_link
          , click = function (node) {
              var event = doc.createEvent("MouseEvents");
              event.initMouseEvent(
                  "click", true, false, view, 0, 0, 0, 0, 0
                  , false, false, false, false, 0, null
              );
              node.dispatchEvent(event);
          }
          , webkit_req_fs = view.webkitRequestFileSystem
          , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
          , throw_outside = function (ex) {
              (view.setImmediate || view.setTimeout)(function () {
                  throw ex;
              }, 0);
          }
          , force_saveable_type = "application/octet-stream"
          , fs_min_size = 0
          , deletion_queue = []
          , process_deletion_queue = function () {
              var i = deletion_queue.length;
              while (i--) {
                  var file = deletion_queue[i];
                  if (typeof file === "string") { // file is an object URL
                      URL.revokeObjectURL(file);
                  } else { // file is a File
                      file.remove();
                  }
              }
              deletion_queue.length = 0; // clear queue
          }
          , dispatch = function (filesaver, event_types, event) {
              event_types = [].concat(event_types);
              var i = event_types.length;
              while (i--) {
                  var listener = filesaver["on" + event_types[i]];
                  if (typeof listener === "function") {
                      try {
                          listener.call(filesaver, event || filesaver);
                      } catch (ex) {
                          throw_outside(ex);
                      }
                  }
              }
          }
          , FileSaver = function (blob, name) {
              // First try a.download, then web filesystem, then object URLs
              var
                    filesaver = this
                  , type = blob.type
                  , blob_changed = false
                  , object_url
                  , target_view
                  , get_object_url = function () {
                      var object_url = get_URL().createObjectURL(blob);
                      deletion_queue.push(object_url);
                      return object_url;
                  }
                  , dispatch_all = function () {
                      dispatch(filesaver, "writestart progress write writeend".split(" "));
                  }
                  // on any filesys errors revert to saving with object URLs
                  , fs_error = function () {
                      // don't create more object URLs than needed
                      if (blob_changed || !object_url) {
                          object_url = get_object_url(blob);
                      }
                      if (target_view) {
                          target_view.location.href = object_url;
                      } else {
                          window.open(object_url, "_blank");
                      }
                      filesaver.readyState = filesaver.DONE;
                      dispatch_all();
                  }
                  , abortable = function (func) {
                      return function () {
                          if (filesaver.readyState !== filesaver.DONE) {
                              return func.apply(this, arguments);
                          }
                      };
                  }
                  , create_if_not_found = { create: true, exclusive: false }
                  , slice
              ;
              filesaver.readyState = filesaver.INIT;
              if (!name) {
                  name = "download";
              }
              if (can_use_save_link) {
                  object_url = get_object_url(blob);
                  // FF for Android has a nasty garbage collection mechanism
                  // that turns all objects that are not pure javascript into 'deadObject'
                  // this means `doc` and `save_link` are unusable and need to be recreated
                  // `view` is usable though:
                  doc = view.document;
                  save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
                  save_link.href = object_url;
                  save_link.download = name;
                  var event = doc.createEvent("MouseEvents");
                  event.initMouseEvent(
                      "click", true, false, view, 0, 0, 0, 0, 0
                      , false, false, false, false, 0, null
                  );
                  save_link.dispatchEvent(event);
                  filesaver.readyState = filesaver.DONE;
                  dispatch_all();
                  return;
              }
              // Object and web filesystem URLs have a problem saving in Google Chrome when
              // viewed in a tab, so I force save with application/octet-stream
              // http://code.google.com/p/chromium/issues/detail?id=91158
              if (view.chrome && type && type !== force_saveable_type) {
                  slice = blob.slice || blob.webkitSlice;
                  blob = slice.call(blob, 0, blob.size, force_saveable_type);
                  blob_changed = true;
              }
              // Since I can't be sure that the guessed media type will trigger a download
              // in WebKit, I append .download to the filename.
              // https://bugs.webkit.org/show_bug.cgi?id=65440
              if (webkit_req_fs && name !== "download") {
                  name += ".download";
              }
              if (type === force_saveable_type || webkit_req_fs) {
                  target_view = view;
              }
              if (!req_fs) {
                  fs_error();
                  return;
              }
              fs_min_size += blob.size;
              req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
                  fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
                      var save = function () {
                          dir.getFile(name, create_if_not_found, abortable(function (file) {
                              file.createWriter(abortable(function (writer) {
                                  writer.onwriteend = function (event) {
                                      target_view.location.href = file.toURL();
                                      deletion_queue.push(file);
                                      filesaver.readyState = filesaver.DONE;
                                      dispatch(filesaver, "writeend", event);
                                  };
                                  writer.onerror = function () {
                                      var error = writer.error;
                                      if (error.code !== error.ABORT_ERR) {
                                          fs_error();
                                      }
                                  };
                                  "writestart progress write abort".split(" ").forEach(function (event) {
                                      writer["on" + event] = filesaver["on" + event];
                                  });
                                  writer.write(blob);
                                  filesaver.abort = function () {
                                      writer.abort();
                                      filesaver.readyState = filesaver.DONE;
                                  };
                                  filesaver.readyState = filesaver.WRITING;
                              }), fs_error);
                          }), fs_error);
                      };
                      dir.getFile(name, { create: false }, abortable(function (file) {
                          // delete file if it already exists
                          file.remove();
                          save();
                      }), abortable(function (ex) {
                          if (ex.code === ex.NOT_FOUND_ERR) {
                              save();
                          } else {
                              fs_error();
                          }
                      }));
                  }), fs_error);
              }), fs_error);
          }
          , FS_proto = FileSaver.prototype
          , saveAs = function (blob, name) {
              return new FileSaver(blob, name);
          }
      ;
      FS_proto.abort = function () {
          var filesaver = this;
          filesaver.readyState = filesaver.DONE;
          dispatch(filesaver, "abort");
      };
      FS_proto.readyState = FS_proto.INIT = 0;
      FS_proto.WRITING = 1;
      FS_proto.DONE = 2;

      FS_proto.error =
      FS_proto.onwritestart =
      FS_proto.onprogress =
      FS_proto.onwrite =
      FS_proto.onabort =
      FS_proto.onerror =
      FS_proto.onwriteend =
          null;

      view.addEventListener("unload", process_deletion_queue, false);
      saveAs.unload = function () {
          process_deletion_queue();
          view.removeEventListener("unload", process_deletion_queue, false);
      };
      return saveAs;
  }(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined") module.exports = saveAs;



/*CanvasNote excel.js*/
//https://www.npmjs.com/package/exceljs
$JExcel = {
};


// Pending runText formatting http://officeopenxml.com/SSstyles.php
(function () {

    var borderKind = ["left", "right", "top", "bottom"];                                    // Not implementing diagonal borders, as they require an additonal attributes: diagonalUp diagonalDown
    var horAlign = ["LEFT", "CENTER", "RIGHT", "NONE"];
    var vertAlign = ["TOP", "CENTER", "BOTTOM", "NONE"];
    var align = {
        L: "left", C: "center", R: "right", T: "top", B: "bottom", W: "wrapText"
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    $JExcel.rgbToHex = function (r, g, b) {
        if (r == undefined || g == undefined || b == undefined) return undefined;
        return (componentToHex(r) + componentToHex(g) + componentToHex(b)).toUpperCase();
    }

    $JExcel.toExcelUTCTime = function (date1) {
        var d2 = Math.floor(date1.getTime() / 1000);													// Number of seconds since JS epoch
        d2 = Math.floor(d2 / 86400) + 25569;																// Days since epoch plus difference in days between Excel EPOCH and JS epoch

        var seconds = date1.getUTCSeconds() + 60 * date1.getUTCMinutes() + 60 * 60 * date1.getUTCHours();		// Number of seconds of received hour
        var SECS_DAY = 60 * 60 * 24;																	// Number of seconds of a day
        return d2 + (seconds / SECS_DAY);																// Returns a local time !!
    }

    $JExcel.toExcelLocalTime = function (date1) {
        var d2 = Math.floor(date1.getTime() / 1000);													// Number of seconds since JS epoch
        d2 = Math.floor(d2 / 86400) + 25569;																// Days since epoch plus difference in days between Excel EPOCH and JS epoch
        var seconds = date1.getUTCSeconds() + 60 * date1.getUTCMinutes() + 60 * 60 * date1.getUTCHours();		// Number of seconds of received hour
        seconds = seconds - 60 * (date1.getTimezoneOffset());											// Differences in seconds between UTC and LOCAL this depends on date becase daylight saving time
        var SECS_DAY = 60 * 60 * 24;																	// Number of seconds of a day
        return d2 + (seconds / SECS_DAY);																// Returns a local time !!
    }

    // For styles see page 2127-2143 of the standard at
    // http://www.ecma-international.org/news/TC45_current_work/Office%20Open%20XML%20Part%204%20-%20Markup%20Language%20Reference.pdf

    var BuiltInFormats = [];
    BuiltInFormats[0] = 'General';
    BuiltInFormats[1] = '0';
    BuiltInFormats[2] = '0.00';
    BuiltInFormats[3] = '#,##0';
    BuiltInFormats[4] = '#,##0.00';

    BuiltInFormats[9] = '0%';
    BuiltInFormats[10] = '0.00%';
    BuiltInFormats[11] = '0.00E+00';
    BuiltInFormats[12] = '# ?/?';
    BuiltInFormats[13] = '# ??/??';
    BuiltInFormats[14] = 'mm-dd-yy';
    BuiltInFormats[15] = 'd-mmm-yy';
    BuiltInFormats[16] = 'd-mmm';
    BuiltInFormats[17] = 'mmm-yy';
    BuiltInFormats[18] = 'h:mm AM/PM';
    BuiltInFormats[19] = 'h:mm:ss AM/PM';
    BuiltInFormats[20] = 'h:mm';
    BuiltInFormats[21] = 'h:mm:ss';
    BuiltInFormats[22] = 'm/d/yy h:mm';

    BuiltInFormats[27] = '[$-404]e/m/d';
    BuiltInFormats[30] = 'm/d/yy';
    BuiltInFormats[36] = '[$-404]e/m/d';

    BuiltInFormats[37] = '#,##0 ;(#,##0)';
    BuiltInFormats[38] = '#,##0 ;[Red](#,##0)';
    BuiltInFormats[39] = '#,##0.00;(#,##0.00)';
    BuiltInFormats[40] = '#,##0.00;[Red](#,##0.00)';

    BuiltInFormats[44] = '_("$"* #,##0.00_);_("$"* \(#,##0.00\);_("$"* "-"??_);_(@_)';
    BuiltInFormats[45] = 'mm:ss';
    BuiltInFormats[46] = '[h]:mm:ss';
    BuiltInFormats[47] = 'mmss.0';
    BuiltInFormats[48] = '##0.0E+0';
    BuiltInFormats[49] = '@';

    BuiltInFormats[50] = '[$-404]e/m/d';
    BuiltInFormats[57] = '[$-404]e/m/d';
    BuiltInFormats[59] = 't0';
    BuiltInFormats[60] = 't0.00';
    BuiltInFormats[61] = 't#,##0';
    BuiltInFormats[62] = 't#,##0.00';
    BuiltInFormats[67] = 't0%';
    BuiltInFormats[68] = 't0.00%';
    BuiltInFormats[69] = 't# ?/?';
    BuiltInFormats[70] = 't# ??/??';
    BuiltInFormats[165] = '*********';              // Here we start with non hardcoded formats
    BuiltInFormats[166] = 'Text';

    var baseFormats = 167;
    //var baseFormats = 166;                              // Formats below this one are builtInt




    $JExcel.formats = BuiltInFormats;

    $JExcel.borderStyles = [
        "none", "thin", "medium", "dashed", "dotted", "thick", "double", "hair", "mediumDashed",
        "dashDot", "mediumDashDot", "dashDotDot", "mediumDashDotDot", "slantDashDot"];

    var borderStylesUpper = [];
    for (var i = 0; i < $JExcel.borderStyles.length; i++) borderStylesUpper.push($JExcel.borderStyles[i].toUpperCase());




    var templateSheet = '<?xml version="1.0" ?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
        'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" ' +
        'xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
        'xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" ' +
        'xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main">' +
        '{views}{columns}' +
        '<sheetData>{rows}</sheetData><sheetProtection sheet="1" objects="1" scenarios="1"/> {mergeCells}</worksheet>';


    // --------------------- BEGIN of generic UTILS
    function getArray(v) {
        if (!v) return undefined;
        return (v.constructor === Array) ? v.slice() : undefined;
    }

    function findOrAdd(list, value) {
        var i = list.indexOf(value);
        if (i != -1) return i;
        list.push(value);
        return list.length - 1;
    }

    function pushV(list, value) {
        list.push(value);
        return value;
    }

    function pushI(list, value) {
        list.push(value);
        return list.length - 1;
    }

    function setV(list, index, value) {
        list[index] = value;
        return value;
    }

    // --------------------- END of generic UTILS



    // --------------------- BEGIN Handling of sheets 
    function toWorkBookSheet(sheet) {
        return '<sheet state="visible" name="' + sheet.name + '" sheetId="' + sheet.id + '" r:id="' + sheet.rId + '"/>';
    }

    function toWorkBookRel(sheet, i) {
        return '<Relationship Id="' + sheet.rId + '" Target="worksheets/sheet' + i + '.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"/>';
    }


    function getAsXml(sheet) {
        return templateSheet.replace('{views}', generateViews(sheet.views))
                            .replace('{columns}', generateColums(sheet.columns))
                            .replace("{rows}", generateRows(sheet.rows, sheet.mergeCells))
                            .replace("{mergeCells}", generateMergeCells(sheet.mergeCells));
    }


    // ------------------- BEGIN Sheet DATA Handling
    function setSheet(value, style, size) {
        this.name = value;                                                      // The only think that we can set in a sheet Is the name
    }

    function getRow(y) {
        return (this.rows[y] ? this.rows[y] : setV(this.rows, y, { cells: [] }));                                                        // If there is a row return it, otherwise create it and return it
    }

    function getColumn(x) {
        return (this.columns[x] ? this.columns[x] : setV(this.columns, x, {}));                                                          // If there is a column return it, otherwise create it and return it
    }

    function getCell(x, y) {
        var row = this.getRow(y).cells;                                                                                                  // Get the row a,d its DATA component
        return (row[x] ? row[x] : setV(row, x, {}));
    }

    function setCell(cell, value, style, isstring, colspan) {
        if (value != undefined) cell.v = value;
        cell.isstring = isstring;
        if (style) cell.s = style;
        if (colspan) cell.colspan = colspan;
    }

    function setColumn(column, value, style) {
        if (value != undefined) column.wt = value;
        if (style) column.style = style;
    }

    function setRow(row, value, style) {
        if (value && !isNaN(value)) row.ht = value;
        if (style) row.style = style;
    }

    function freezePane(x, y) {
        var pane = { topLeftCell: cellName(x, y) };
        if (x >= 0) { pane.xSplit = x; }
        if (y >= 0) { pane.ySplit = y - 1; }
        var view = { panes: [pane] };
        view.workbookViewId = pushI(this.views, view);
    }
    // ------------------- END Sheet DATA Handling


    function createSheets() {
        var oSheets = {
            sheets: [],
            add: function (name) {
                var sheet = { id: this.sheets.length + 1, rId: "rId" + (3 + this.sheets.length), name: name, rows: [], columns: [], getColumn: getColumn, set: setSheet, getRow: getRow, getCell: getCell, mergeCells: [], views: [], freezePane: freezePane };
                return pushI(this.sheets, sheet);
            },
            get: function (index) {
                var sheet = this.sheets[index];
                if (!sheet) throw "Bad sheet " + index;
                return sheet;
            },



            rows: function (i) {
                if (i < 0 || i >= this.sheets.length) throw "Bad sheet number must be [0.." + (this.sheets.length - 1) + "] and is: " + i;
                return this.sheets[i].rows;
            },
            setWidth: function (sheet, column, value, style) {
                // See 3.3.1.12 col (Column Width & Formatting
                if (value) this.sheets[sheet].colWidths[column] = isNaN(value) ? value.toString().toLowerCase() : value;
                if (style) this.sheets[sheet].colStyles[column] = style;
            },

            toWorkBook: function () {
                var s = '<?xml version="1.0" standalone="yes"?>' +
                    '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
                    '<sheets>';
                for (var i = 0; i < this.sheets.length; i++) s = s + toWorkBookSheet(this.sheets[i]);
                return s + '</sheets><calcPr/></workbook>';
            },
            toWorkBookRels: function () {
                var s = '<?xml version="1.0" ?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
                s = s + '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>';                      // rId2 is hardcoded and reserved for STYLES
                for (var i = 0; i < this.sheets.length; i++) s = s + toWorkBookRel(this.sheets[i], i + 1);
                return s + '</Relationships>';
            },
            toRels: function () {
                var s = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
                s = s + '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>';         // rId1 is reserverd for WorkBook
                return s + '</Relationships>';
            },
            toContentType: function () {
                var s = '<?xml version="1.0" standalone="yes" ?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="application/xml" Extension="xml"/>';
                s = s + '<Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>';
                s = s + '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" PartName="/xl/workbook.xml"/>';
                s = s + '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" PartName="/xl/styles.xml" />';
                for (var i = 1; i <= this.sheets.length; i++) s = s + '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" PartName="/xl/worksheets/sheet' + i + '.xml"/>';
                return s + '</Types>';
            },
            fileData: function (xl) {
                for (var i = 0; i < this.sheets.length; i++) {
                    xl.file('worksheets/sheet' + (i + 1) + '.xml', getAsXml(this.sheets[i]));
                }
            }
        };
        return oSheets;
    }
    // --------------------- END Handling of sheets 

    // --------------------- BEGIN Handling of style

    function toFontXml(f) {
        var f = f.split(";");
        return '<font>' +
            (f[3].indexOf("B") > -1 ? '<b />' : '') +
            (f[3].indexOf("I") > -1 ? '<i />' : '') +
            (f[3].indexOf("U") > -1 ? '<u />' : '') +
            (f[1] != "_" ? '<sz val="' + f[1] + '" />' : '') +
            (f[2] != "_" ? '<color rgb="FF' + f[2] + '" />' : '') +
            (f[0] ? '<name val="' + f[0] + '" />' : '') +
            '</font>';   // <family val="2" /><scheme val="minor" />

    }

    function toFillXml(f) {
        return '<fill><patternFill patternType="solid"><fgColor rgb="FF' + f + '" /><bgColor indexed="64" /></patternFill ></fill>';
    }

    function toBorderXml(b) {
        var s = "<border>";
        b = b.split(",");
        for (var i = 0; i < 4; i++) {
            var vals = b[i].split(" ");
            s = s + "<" + borderKind[i];
            if (vals[0] == "NONE") s = s + "/>";
            else {
                var border = $JExcel.borderStyles[borderStylesUpper.indexOf(vals[0])];
                if (border)
                    s = s + ' style="' + border + '" >' + (vals[1] != "NONE" ? '<color rgb="FF' + vals[1].substring(1) + '"/>' : '');
                else
                    s = s + ">";
                s = s + "</" + borderKind[i] + ">";
            }
        }
        return s + "<diagonal/></border>";
    }

    function replaceAll(where, search, replacement) {
        return where.split(search).join(replacement);
    };

    function replaceAllMultiple(where, search, replacement) {
        while (where.indexOf(search) != -1) where = replaceAll(where, search, replacement);
        return where;
    }

    function createKey(style) {
        if (!style.key) {
            style.key = JSON.stringify(style);
        }
    }

    function toStyleXml(style) {
        var alignXml = "";
        if (style.align) {
            var h = align[style.align.charAt(0)];
            var v = align[style.align.charAt(1)];
            var w = align[style.align.charAt(2)];

            if (h || v || w) {
                alignXml = "<alignment ";
                if (h) alignXml = alignXml + ' horizontal="' + h + '" ';
                if (v) alignXml = alignXml + ' vertical="' + v + '" ';
                if (w) alignXml = alignXml + ' ' + w + '="1" ';
                alignXml = alignXml + " />";
            }
        }
        var s = '<xf numFmtId="' + (style.format || 0) + '" fontId="' + (style.font || 0) + '" fillId="' + (style.fill || 0) + '" borderId="' + (style.border || 0) + '" xfId="0" ';
        if ((style.border || 0) != 0) s = s + ' applyBorder="1" ';
        if (style.format >= baseFormats) s = s + ' applyNumberFormat="1" ';
        if ((style.fill || 0) != 0) s = s + ' applyFill="1" ';
        if ((alignXml || "") != "") s = s + ' applyAlignment="1" ';
        s = s + '>';
        s = s + alignXml;
        return s + "</xf>";
    }

    //"Arial", 14, "#0000EE","UBI"

    function normalizeFont(fontDescription) {
        fontDescription = replaceAllMultiple(fontDescription, "  ", " ");
        var fNormalized = ["_", "_", "_", "_"];                                 //  Name - Size - Color - Style (use NONE as placeholder) 
        var i = 0, list = fontDescription.split(" ");                       //  Split by " "
        var name = [];
        while (list[0] && (list[0] != "none") && (isNaN(list[0])) && (list[0].charAt(0) != "#")) {
            name.push(list[0].charAt(0).toUpperCase() + list[0].substring(1).toLowerCase());
            list.splice(0, 1);
        }

        fNormalized[0] = name.join(" ");
        while (list[0] == "none") list.splice(0, 1);                        // Delete any "none" that we might have
        if (!isNaN(list[0])) {                                              // IF we have a number then this is the font size    
            fNormalized[1] = list[0];
            list.splice(0, 1);
        }
        while (list[0] == "none") list.splice(0, 1);                        // Delete any "none" that we might have
        if (list[0] && list[0].length == 7 && list[0].charAt(0) == "#") {      // IF we have a 6 digits value it must be the color
            fNormalized[2] = list[0].substring(1).toUpperCase();
            list.splice(0, 1);
        }
        while (list[0] == "none") list.splice(0, 1);                                    // Delete any "none" that we might have
        if (list[0] && list[0].length < 4) fNormalized[3] = list[0].toUpperCase();      // Finally get the STYLE
        return fNormalized.join(";");
    }


    function normalizeAlign(a) {
        if (!a) return "---";
        var a = replaceAllMultiple(a.toString() + " - - -", "  ", " ").trim().toUpperCase().split(" ");
        return a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0);
    }

    function normalizeBorders(b) {
        b = replaceAllMultiple(b, "  ", " ").trim();
        var l = (b + ",NONE,NONE,NONE,NONE").split(",");
        var p = "";
        for (var i = 0; i < 4; i++) {
            l[i] = l[i].trim().toUpperCase();
            l[i] = ((l[i].substring(0, 4) == "NONE" ? "NONE" : l[i]).trim() + " NONE NONE NONE").trim();
            var st = l[i].split(" ");
            if (st[0].charAt(0) == "#") {
                st[2] = st[0]; st[0] = st[1]; st[1] = st[2];
            }
            p = p + st[0] + " " + st[1] + ",";
        }
        return p;
    }



    function createStyleSheet(defaultFont) {
        var styles = [], fonts = [], formats = BuiltInFormats.slice(0), borders = [], fills = [];

        var oStyles = {
            add: function (a) {
                var style = { isstring: a.isstring };
                if (a.fill && a.fill.charAt(0) == "#") style.fill = 2 + findOrAdd(fills, a.fill.toString().substring(1).toUpperCase());                  // If there is a fill color add it, with a gap of 2, because of the TWO DEFAULT HARDCODED fills
                if (a.font) style.font = findOrAdd(fonts, normalizeFont(a.font.toString().trim()));
                if (a.format) style.format = findOrAdd(formats, a.format);
                if (a.align) style.align = normalizeAlign(a.align);
                if (a.border) style.border = 1 + findOrAdd(borders, normalizeBorders(a.border.toString().trim()));                                          // There is a HARDCODED border         

                createKey(style);
                for (var i = styles.length - 1; i >= 0; i--) {
                    if (styles[i].key == style.key) return 1 + i;
                }
                return 1 + pushI(styles, style);                                                            // Add the style and return INDEX+1 because of the DEFAULT HARDCODED style
            }
        };

        if (!defaultFont) defaultFont = "Arial 11 0000EE";
        oStyles.add({ font: defaultFont });


        oStyles.register = function (thisOne) {
            createKey(thisOne);

            for (var i = styles.length - 1; i >= 0; i--) {
                if (styles[i].key == thisOne.key) return i;
            }
            return pushI(styles, thisOne);
        }

        oStyles.getStyle = function (a) {
            return styles[a];
        }
        oStyles.toStyleSheet = function () {
            var s = '<?xml version="1.0" encoding="utf-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
                    'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';

            s = s + '<numFmts count="' + (formats.length - baseFormats) + '">';
            for (var i = baseFormats; i < formats.length; i++) s = s + '<numFmt numFmtId="' + (i) + '" formatCode="' + formats[i] + '"/>';
            s = s + '</numFmts>';


            s = s + '<fonts count="' + (fonts.length) + '" x14ac:knownFonts="1" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
            for (var i = 0; i < fonts.length; i++) s = s + toFontXml(fonts[i]); //'<font><sz val="8" /><name val="Calibri" /><family val="2" /><scheme val="minor" /></font>' +
            s = s + '</fonts>';

            s = s + '<fills count="' + (2 + fills.length) + '"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>';
            for (var i = 0; i < fills.length; i++) s = s + toFillXml(fills[i]);
            s = s + '</fills>';

            s = s + '<borders count="' + (1 + borders.length) + '"><border><left /><right /><top /><bottom /><diagonal /></border>';
            for (var i = 0; i < borders.length; i++) s = s + toBorderXml(borders[i]);
            s = s + '</borders>';

            s = s + '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';

            s = s + '<cellXfs count="' + (1 + styles.length) + '"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />';
            for (var i = 0; i < styles.length; i++) {
                s = s + toStyleXml(styles[i]);
            }
            s = s + '</cellXfs>';

            s = s + '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
            s = s + '<dxfs count="0"/>';
            s = s + '</styleSheet>';
            return s;
        }
        return oStyles;
    }



    // --------------------- END Handling of styles





    var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    function basePropertyOf(object) {
        return function (key) {
            return object == null ? undefined : object[key];
        };
    }
    var escapeHtmlChar = basePropertyOf(htmlEscapes);

    function escape(string) {
        if (typeof string != 'string') string = null ? '' : (string + '');

        return (string && reHasUnescapedHtml.test(string))
          ? string.replace(reUnescapedHtml, escapeHtmlChar)
          : string;
    }

    function cellNameH(i) {
        var rest = Math.floor(i / 26) - 1;
        var s = (rest > -1 ? cellNameH(rest) : '');
        return s + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(i % 26);
    }

    function cellName(colIndex, rowIndex) {
        return cellNameH(colIndex) + rowIndex;
    };

    function generateCell(cell, column, row, mergeCells) {
        if (cell.colspan != undefined) {
            if (cell.colspan.length > 0) {
                //var m = { from: cellName(column, row), to: cellName(column + cell.colspan - 1, row) };
                //mergeCells.push(m);
                var m
                for (var idx = 0; idx < cell.colspan.length; idx++) {
                    m = { from: cellName(cell.colspan[idx].col, cell.colspan[idx].row + 1), to: cellName(cell.colspan[idx].col2, cell.colspan[idx].row2 + 1) };
                    mergeCells.push(m);

                }
            }
        }
        var s = '<c r="' + cellName(column, row) + '"';
        if (cell.s) s = s + ' s="' + cell.s + '" ';


        var value = cell.v;
        if (cell.isstring || isNaN(value)) {
            if (cell.isstring || value.charAt(0) != '=') return s + ' t="inlineStr" ><is><t xml:space="preserve">' + escape(value) + '</t></is></c>';
            return s + ' ><f>' + value.substring(1) + '</f></c>';
        }
        return s + '><v>' + value + '</v></c>';
    }

    function generateRow(row, index, mergeCells) {
        var rowIndex = index + 1;
        var oCells = [];
        for (var i = 0; i < row.cells.length; i++) {
            if (row.cells[i]) oCells.push(generateCell(row.cells[i], i, rowIndex, mergeCells));
        }
        var s = '<row r="' + rowIndex + '" '
        if (row.ht) s = s + ' ht="' + row.ht + '" customHeight="1" ';
        if (row.style) s = s + 's="' + row.style + '" customFormat="1"';
        return s + ' >' + oCells.join('') + '</row>';
    }

    function generateMergeCells(mergeCells) {
        if (mergeCells.length == 0) return;

        var s = '<mergeCells count="' + mergeCells.length + '">';
        for (var i = 0; i < mergeCells.length; i++) {
            var m = mergeCells[i];
            if (m) {
                s = s + '<mergeCell ref="' + m.from + ':' + m.to + '" />';
            }
        }
        return s + "</mergeCells>";
    }
    function generateRows(rows, mergeCells) {
        var oRows = [];
        for (var index = 0; index < rows.length; index++) {
            if (rows[index]) {
                oRows.push(generateRow(rows[index], index, mergeCells));
            }
        }
        return oRows.join('');
    }

    function generateColums(columns) {
        if (columns.length == 0) return;

        var s = '<cols>';
        for (var i = 0; i < columns.length; i++) {
            var c = columns[i];
            if (c) {
                s = s + '<col min="' + (i + 1) + '" max="' + (i + 1) + '" ';
                if (c.wt == "auto") s = s + ' width="18" bestFit="1" customWidth="1" '; else if (c.wt) s = s + ' width="' + c.wt + '" customWidth="1" ';
                if (c.style) s = s + ' style="' + c.style + '"';
                s = s + "/>";
            }
        }
        return s + "</cols>";
    }

    function generateViews(views) {
        if (views.length == 0) return;

        var s = '<sheetViews>';
        for (var i = 0; i < views.length; i++) {
            var c = views[i];
            if (c && c.panes && c.panes.length) {
                s += '<sheetView workbookViewId="' + (c.workbookViewId || i) + '">';
                for (var p = 0; p < c.panes.length; p++) {
                    var pane = c.panes[p];
                    s += '<pane state="frozen" topLeftCell="' + pane.topLeftCell + '"';
                    if (pane.xSplit) {
                        s += ' xSplit="' + pane.xSplit + '"';
                    }
                    if (pane.ySplit) {
                        s += ' ySplit="' + pane.ySplit + '"';
                    }
                    s += '/>';
                }
                s += '</sheetView>';
            }
        }
        s += "</sheetViews>";
        return s;
    }

    function isObject(v) {
        return (v !== null && typeof v === 'object');
    }


    //  Loops all rows & columns in sheets. 
    //  If a row has a style it tries to apply the style componenets to all cells in the row (provided that the cell has not defined is not own style component)

    function CombineStyles(sheets, styles) {
        // First lets do the sheets
        for (var i = 0; i < sheets.length; i++) {
            // First let's do the rows
            for (var j = 0; j < sheets[i].rows.length; j++) {
                var row = sheets[i].rows[j];
                if (row && row.style) {
                    for (var k = 0; k < row.cells.length; k++) {
                        if (row.cells[k]) AddStyleToCell(row.cells[k], styles, row.style);
                    }
                }
            }

            // Second let's do the cols
            for (var c = 0; c < sheets[i].columns.length; c++) {
                if (sheets[i].columns[c] && sheets[i].columns[c].style) {
                    var cstyle = sheets[i].columns[c].style;
                    for (var j = 0; j < sheets[i].rows.length; j++) {
                        var row = sheets[i].rows[j];
                        if (row) for (var k = 0; k < row.cells.length; k++)
                            if (row.cells[k] && k == c) AddStyleToCell(row.cells[k], styles, cstyle);
                    }
                }
            }
        }
    }

    function AddStyleToCell(cell, styles, toAdd) {
        if (!cell) return;                                      // If no cell then return
        if (!cell.s) {                                          // If cell has no style, use toAdd
            cell.s = toAdd;
            return;
        }
        var cs = styles.getStyle(cell.s - 1);
        var os = styles.getStyle(toAdd - 1);
        var ns = {}, b = false;
        for (var x in cs) ns[x] = cs[x];                        // Clone cell style
        for (var x in os) {
            if (!ns[x]) {
                ns[x] = os[x];
                b = true;
            }
        }
        if (!b) return;                                         // If the toAdd style does NOT add anything new
        delete ns.key; // the key should be recalculated, remove the key from any of the origin objects
        cell.s = 1 + styles.register(ns);
    }


    $JExcel.new = function (defaultFont) {
        var excel = {};

        var sheets = createSheets();                                                                              //  Create Excel    sheets
        var styles = createStyleSheet(defaultFont);                                                                        //  Create Styles   sheet
        sheets.add("Sheet 0");                                                                                  // At least we have a [Sheet 0]

        excel.addSheet = function (name) {
            if (!name) name = "Sheet " + sheets.length;
            return sheets.add(name);
        }


        excel.addStyle = function (a) {
            return styles.add(a);
        }

        excel.set = function (s, column, row, value, style, colspan) {
            if (isObject(s)) return this.set(s.sheet, s.column, s.row, s.value, s.style);                                        // If using Object form, expand it
            if (!s) s = 0;                                                                                                       // Use default sheet
            s = sheets.get(s);
            if (isNaN(column) && isNaN(row)) return s.set(value, style);                                                         // If this is a sheet operation
            if (!isNaN(column)) {                                                                                                // If this is a column operation
                if (!isNaN(row)) {
                    var isstring = style && styles.getStyle(style - 1).isstring;
                    return setCell(s.getCell(column, row), value, style, isstring, colspan);                                              // and also a ROW operation the this is a CELL operation
                }
                return setColumn(s.getColumn(column), value, style);                                                             // if not we confirm than this is a COLUMN operation
            }
            return setRow(s.getRow(row), value, style);                                                                          // If got here, thet this is a Row operation
        }

        excel.freezePane = function (s, x, y) {
            sheets.get(s).freezePane(x, y);
        }

        excel.generate = function (filename) {
            CombineStyles(sheets.sheets, styles);
            var zip = new JSZip();                                                                              // Create a ZIP file
            zip.file('_rels/.rels', sheets.toRels());                                                           // Add WorkBook RELS   
            var xl = zip.folder('xl');                                                                          // Add a XL folder for sheets
            xl.file('workbook.xml', sheets.toWorkBook());                                                       // And a WorkBook
            xl.file('styles.xml', styles.toStyleSheet());                                                       // Add styles
            xl.file('_rels/workbook.xml.rels', sheets.toWorkBookRels());                                        // Add WorkBook RELs
            zip.file('[Content_Types].xml', sheets.toContentType());                                            // Add content types
            sheets.fileData(xl);                                                                                // Zip the rest    
            zip.generateAsync({ type: "blob", mimeType: "application/vnd.ms-excel" }).then(function (content) { saveAs(content, filename); });        // And generate !!!

        }
        return excel;
    }
})();


//*Export to PDF*//
!function(t){"function"==typeof define&&define.amd?define(t):t()}(function(){"use strict";
/** @license
   * jsPDF - PDF Document creation from JavaScript
   * Version 1.5.3 Built on 2018-12-27T14:11:42.696Z
   *                      CommitID d93d28db14
   *
   * Copyright (c) 2010-2016 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
   *               2010 Aaron Spike, https://github.com/acspike
   *               2012 Willow Systems Corporation, willow-systems.com
   *               2012 Pablo Hess, https://github.com/pablohess
   *               2012 Florian Jenett, https://github.com/fjenett
   *               2013 Warren Weckesser, https://github.com/warrenweckesser
   *               2013 Youssef Beddad, https://github.com/lifof
   *               2013 Lee Driscoll, https://github.com/lsdriscoll
   *               2013 Stefan Slonevskiy, https://github.com/stefslon
   *               2013 Jeremy Morel, https://github.com/jmorel
   *               2013 Christoph Hartmann, https://github.com/chris-rock
   *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
   *               2014 James Makes, https://github.com/dollaruw
   *               2014 Diego Casorran, https://github.com/diegocr
   *               2014 Steven Spungin, https://github.com/Flamenco
   *               2014 Kenneth Glassey, https://github.com/Gavvers
   *
   * Licensed under the MIT License
   *
   * Contributor(s):
   *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
   *    kim3er, mfo, alnorth, Flamenco
   */function se(t){return(se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t){if("object"!==se(t.console)){t.console={};for(var e,n,r=t.console,i=function(){},o=["memory"],a="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");e=o.pop();)r[e]||(r[e]={});for(;n=a.pop();)r[n]||(r[n]=i)}var s,l,h,u,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";void 0===t.btoa&&(t.btoa=function(t){var e,n,r,i,o,a=0,s=0,l="",h=[];if(!t)return t;for(;e=(o=t.charCodeAt(a++)<<16|t.charCodeAt(a++)<<8|t.charCodeAt(a++))>>18&63,n=o>>12&63,r=o>>6&63,i=63&o,h[s++]=c.charAt(e)+c.charAt(n)+c.charAt(r)+c.charAt(i),a<t.length;);l=h.join("");var u=t.length%3;return(u?l.slice(0,u-3):l)+"===".slice(u||3)}),void 0===t.atob&&(t.atob=function(t){var e,n,r,i,o,a,s=0,l=0,h=[];if(!t)return t;for(t+="";e=(a=c.indexOf(t.charAt(s++))<<18|c.indexOf(t.charAt(s++))<<12|(i=c.indexOf(t.charAt(s++)))<<6|(o=c.indexOf(t.charAt(s++))))>>16&255,n=a>>8&255,r=255&a,h[l++]=64==i?String.fromCharCode(e):64==o?String.fromCharCode(e,n):String.fromCharCode(e,n,r),s<t.length;);return h.join("")}),Array.prototype.map||(Array.prototype.map=function(t){if(null==this||"function"!=typeof t)throw new TypeError;for(var e=Object(this),n=e.length>>>0,r=new Array(n),i=1<arguments.length?arguments[1]:void 0,o=0;o<n;o++)o in e&&(r[o]=t.call(i,e[o],o,e));return r}),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){if(null==this||"function"!=typeof t)throw new TypeError;for(var n=Object(this),r=n.length>>>0,i=0;i<r;i++)i in n&&t.call(e,n[i],i,n)}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),n=e.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var r=arguments[1],i=0;i<n;){var o=e[i];if(t.call(r,o,i,e))return o;i++}},configurable:!0,writable:!0}),Object.keys||(Object.keys=(s=Object.prototype.hasOwnProperty,l=!{toString:null}.propertyIsEnumerable("toString"),u=(h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]).length,function(t){if("object"!==se(t)&&("function"!=typeof t||null===t))throw new TypeError;var e,n,r=[];for(e in t)s.call(t,e)&&r.push(e);if(l)for(n=0;n<u;n++)s.call(t,h[n])&&r.push(h[n]);return r})),"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");t=Object(t);for(var e=1;e<arguments.length;e++){var n=arguments[e];if(null!=n)for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.trimLeft||(String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}),String.prototype.trimRight||(String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")}),Number.isInteger=Number.isInteger||function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")());var t,e,n,_,l,F,P,p,d,k,a,o,s,h,u,c,r,i,f,g,m,y,v,w,b,x,I,C,B,N,L,A,S,j,E,M,O,q,T,R,D,U,z,H,W,V,G,Y,J,X,K,Z,Q,$,tt,et,nt,rt,it,ot,at,st,lt=function(ie){function oe(o){if("object"!==se(o))throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");var a={};this.subscribe=function(t,e,n){if(n=n||!1,"string"!=typeof t||"function"!=typeof e||"boolean"!=typeof n)throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");a.hasOwnProperty(t)||(a[t]={});var r=Math.random().toString(35);return a[t][r]=[e,!!n],r},this.unsubscribe=function(t){for(var e in a)if(a[e][t])return delete a[e][t],0===Object.keys(a[e]).length&&delete a[e],!0;return!1},this.publish=function(t){if(a.hasOwnProperty(t)){var e=Array.prototype.slice.call(arguments,1),n=[];for(var r in a[t]){var i=a[t][r];try{i[0].apply(o,e)}catch(t){ie.console&&console.error("jsPDF PubSub Error",t.message,t)}i[1]&&n.push(r)}n.length&&n.forEach(this.unsubscribe)}},this.getTopics=function(){return a}}function ae(t,e,i,n){var r={},o=[],a=1;"object"===se(t)&&(t=(r=t).orientation,e=r.unit||e,i=r.format||i,n=r.compress||r.compressPdf||n,o=r.filters||(!0===n?["FlateEncode"]:o),a="number"==typeof r.userUnit?Math.abs(r.userUnit):1),e=e||"mm",t=(""+(t||"P")).toLowerCase();var s=r.putOnlyUsedFonts||!0,K={},l={internal:{},__private__:{}};l.__private__.PubSub=oe;var h="1.3",u=l.__private__.getPdfVersion=function(){return h},c=(l.__private__.setPdfVersion=function(t){h=t},{a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]}),f=(l.__private__.getPageFormats=function(){return c},l.__private__.getPageFormat=function(t){return c[t]});"string"==typeof i&&(i=f(i)),i=i||f("a4");var p,Z=l.f2=l.__private__.f2=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.f2");return t.toFixed(2)},Q=l.__private__.f3=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.f3");return t.toFixed(3)},d="00000000000000000000000000000000",g=l.__private__.getFileId=function(){return d},m=l.__private__.setFileId=function(t){return t=t||"12345678901234567890123456789012".split("").map(function(){return"ABCDEF0123456789".charAt(Math.floor(16*Math.random()))}).join(""),d=t};l.setFileId=function(t){return m(t),this},l.getFileId=function(){return g()};var y=l.__private__.convertDateToPDFDate=function(t){var e=t.getTimezoneOffset(),n=e<0?"+":"-",r=Math.floor(Math.abs(e/60)),i=Math.abs(e%60),o=[n,P(r),"'",P(i),"'"].join("");return["D:",t.getFullYear(),P(t.getMonth()+1),P(t.getDate()),P(t.getHours()),P(t.getMinutes()),P(t.getSeconds()),o].join("")},v=l.__private__.convertPDFDateToDate=function(t){var e=parseInt(t.substr(2,4),10),n=parseInt(t.substr(6,2),10)-1,r=parseInt(t.substr(8,2),10),i=parseInt(t.substr(10,2),10),o=parseInt(t.substr(12,2),10),a=parseInt(t.substr(14,2),10);parseInt(t.substr(16,2),10),parseInt(t.substr(20,2),10);return new Date(e,n,r,i,o,a,0)},w=l.__private__.setCreationDate=function(t){var e;if(void 0===t&&(t=new Date),"object"===se(t)&&"[object Date]"===Object.prototype.toString.call(t))e=y(t);else{if(!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|\-0[0-9]|\-1[0-1])\'(0[0-9]|[1-5][0-9])\'?$/.test(t))throw new Error("Invalid argument passed to jsPDF.setCreationDate");e=t}return p=e},b=l.__private__.getCreationDate=function(t){var e=p;return"jsDate"===t&&(e=v(p)),e};l.setCreationDate=function(t){return w(t),this},l.getCreationDate=function(t){return b(t)};var x,N,L,A,S,$,_,F,P=l.__private__.padd2=function(t){return("0"+parseInt(t)).slice(-2)},k=!1,I=[],C=[],B=0,tt=(l.__private__.setCustomOutputDestination=function(t){N=t},l.__private__.resetCustomOutputDestination=function(t){N=void 0},l.__private__.out=function(t){var e;return t="string"==typeof t?t:t.toString(),(e=void 0===N?k?I[x]:C:N).push(t),k||(B+=t.length+1),e}),j=l.__private__.write=function(t){return tt(1===arguments.length?t.toString():Array.prototype.join.call(arguments," "))},E=l.__private__.getArrayBuffer=function(t){for(var e=t.length,n=new ArrayBuffer(e),r=new Uint8Array(n);e--;)r[e]=t.charCodeAt(e);return n},M=[["Helvetica","helvetica","normal","WinAnsiEncoding"],["Helvetica-Bold","helvetica","bold","WinAnsiEncoding"],["Helvetica-Oblique","helvetica","italic","WinAnsiEncoding"],["Helvetica-BoldOblique","helvetica","bolditalic","WinAnsiEncoding"],["Courier","courier","normal","WinAnsiEncoding"],["Courier-Bold","courier","bold","WinAnsiEncoding"],["Courier-Oblique","courier","italic","WinAnsiEncoding"],["Courier-BoldOblique","courier","bolditalic","WinAnsiEncoding"],["Times-Roman","times","normal","WinAnsiEncoding"],["Times-Bold","times","bold","WinAnsiEncoding"],["Times-Italic","times","italic","WinAnsiEncoding"],["Times-BoldItalic","times","bolditalic","WinAnsiEncoding"],["ZapfDingbats","zapfdingbats","normal",null],["Symbol","symbol","normal",null]],et=(l.__private__.getStandardFonts=function(t){return M},r.fontSize||16),O=(l.__private__.setFontSize=l.setFontSize=function(t){return et=t,this},l.__private__.getFontSize=l.getFontSize=function(){return et}),nt=r.R2L||!1,q=(l.__private__.setR2L=l.setR2L=function(t){return nt=t,this},l.__private__.getR2L=l.getR2L=function(t){return nt},l.__private__.setZoomMode=function(t){var e=[void 0,null,"fullwidth","fullheight","fullpage","original"];if(/^\d*\.?\d*\%$/.test(t))L=t;else if(isNaN(t)){if(-1===e.indexOf(t))throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "'+t+'" is not recognized.');L=t}else L=parseInt(t,10)}),T=(l.__private__.getZoomMode=function(){return L},l.__private__.setPageMode=function(t){if(-1==[void 0,null,"UseNone","UseOutlines","UseThumbs","FullScreen"].indexOf(t))throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "'+t+'" is not recognized.');A=t}),R=(l.__private__.getPageMode=function(){return A},l.__private__.setLayoutMode=function(t){if(-1==[void 0,null,"continuous","single","twoleft","tworight","two"].indexOf(t))throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "'+t+'" is not recognized.');S=t}),D=(l.__private__.getLayoutMode=function(){return S},l.__private__.setDisplayMode=l.setDisplayMode=function(t,e,n){return q(t),R(e),T(n),this},{title:"",subject:"",author:"",keywords:"",creator:""}),U=(l.__private__.getDocumentProperty=function(t){if(-1===Object.keys(D).indexOf(t))throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");return D[t]},l.__private__.getDocumentProperties=function(t){return D},l.__private__.setDocumentProperties=l.setProperties=l.setDocumentProperties=function(t){for(var e in D)D.hasOwnProperty(e)&&t[e]&&(D[e]=t[e]);return this},l.__private__.setDocumentProperty=function(t,e){if(-1===Object.keys(D).indexOf(t))throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");return D[t]=e},0),z=[],rt={},H={},W=0,V=[],G=[],it=new oe(l),Y=r.hotfixes||[],J=l.__private__.newObject=function(){var t=X();return ot(t,!0),t},X=l.__private__.newObjectDeferred=function(){return z[++U]=function(){return B},U},ot=function(t,e){return e="boolean"==typeof e&&e,z[t]=B,e&&tt(t+" 0 obj"),t},at=l.__private__.newAdditionalObject=function(){var t={objId:X(),content:""};return G.push(t),t},st=X(),lt=X(),ht=l.__private__.decodeColorString=function(t){var e=t.split(" ");if(2===e.length&&("g"===e[1]||"G"===e[1])){var n=parseFloat(e[0]);e=[n,n,n,"r"]}for(var r="#",i=0;i<3;i++)r+=("0"+Math.floor(255*parseFloat(e[i])).toString(16)).slice(-2);return r},ut=l.__private__.encodeColorString=function(t){var e;"string"==typeof t&&(t={ch1:t});var n=t.ch1,r=t.ch2,i=t.ch3,o=t.ch4,a=(t.precision,"draw"===t.pdfColorType?["G","RG","K"]:["g","rg","k"]);if("string"==typeof n&&"#"!==n.charAt(0)){var s=new RGBColor(n);if(s.ok)n=s.toHex();else if(!/^\d*\.?\d*$/.test(n))throw new Error('Invalid color "'+n+'" passed to jsPDF.encodeColorString.')}if("string"==typeof n&&/^#[0-9A-Fa-f]{3}$/.test(n)&&(n="#"+n[1]+n[1]+n[2]+n[2]+n[3]+n[3]),"string"==typeof n&&/^#[0-9A-Fa-f]{6}$/.test(n)){var l=parseInt(n.substr(1),16);n=l>>16&255,r=l>>8&255,i=255&l}if(void 0===r||void 0===o&&n===r&&r===i)if("string"==typeof n)e=n+" "+a[0];else switch(t.precision){case 2:e=Z(n/255)+" "+a[0];break;case 3:default:e=Q(n/255)+" "+a[0]}else if(void 0===o||"object"===se(o)){if(o&&!isNaN(o.a)&&0===o.a)return e=["1.000","1.000","1.000",a[1]].join(" ");if("string"==typeof n)e=[n,r,i,a[1]].join(" ");else switch(t.precision){case 2:e=[Z(n/255),Z(r/255),Z(i/255),a[1]].join(" ");break;default:case 3:e=[Q(n/255),Q(r/255),Q(i/255),a[1]].join(" ")}}else if("string"==typeof n)e=[n,r,i,o,a[2]].join(" ");else switch(t.precision){case 2:e=[Z(n/255),Z(r/255),Z(i/255),Z(o/255),a[2]].join(" ");break;case 3:default:e=[Q(n/255),Q(r/255),Q(i/255),Q(o/255),a[2]].join(" ")}return e},ct=l.__private__.getFilters=function(){return o},ft=l.__private__.putStream=function(t){var e=(t=t||{}).data||"",n=t.filters||ct(),r=t.alreadyAppliedFilters||[],i=t.addLength1||!1,o=e.length,a={};!0===n&&(n=["FlateEncode"]);var s=t.additionalKeyValues||[],l=(a=void 0!==ae.API.processDataByFilters?ae.API.processDataByFilters(e,n):{data:e,reverseChain:[]}).reverseChain+(Array.isArray(r)?r.join(" "):r.toString());0!==a.data.length&&(s.push({key:"Length",value:a.data.length}),!0===i&&s.push({key:"Length1",value:o})),0!=l.length&&(l.split("/").length-1==1?s.push({key:"Filter",value:l}):s.push({key:"Filter",value:"["+l+"]"})),tt("<<");for(var h=0;h<s.length;h++)tt("/"+s[h].key+" "+s[h].value);tt(">>"),0!==a.data.length&&(tt("stream"),tt(a.data),tt("endstream"))},pt=l.__private__.putPage=function(t){t.mediaBox;var e=t.number,n=t.data,r=t.objId,i=t.contentsObjId;ot(r,!0);V[x].mediaBox.topRightX,V[x].mediaBox.bottomLeftX,V[x].mediaBox.topRightY,V[x].mediaBox.bottomLeftY;tt("<</Type /Page"),tt("/Parent "+t.rootDictionaryObjId+" 0 R"),tt("/Resources "+t.resourceDictionaryObjId+" 0 R"),tt("/MediaBox ["+parseFloat(Z(t.mediaBox.bottomLeftX))+" "+parseFloat(Z(t.mediaBox.bottomLeftY))+" "+Z(t.mediaBox.topRightX)+" "+Z(t.mediaBox.topRightY)+"]"),null!==t.cropBox&&tt("/CropBox ["+Z(t.cropBox.bottomLeftX)+" "+Z(t.cropBox.bottomLeftY)+" "+Z(t.cropBox.topRightX)+" "+Z(t.cropBox.topRightY)+"]"),null!==t.bleedBox&&tt("/BleedBox ["+Z(t.bleedBox.bottomLeftX)+" "+Z(t.bleedBox.bottomLeftY)+" "+Z(t.bleedBox.topRightX)+" "+Z(t.bleedBox.topRightY)+"]"),null!==t.trimBox&&tt("/TrimBox ["+Z(t.trimBox.bottomLeftX)+" "+Z(t.trimBox.bottomLeftY)+" "+Z(t.trimBox.topRightX)+" "+Z(t.trimBox.topRightY)+"]"),null!==t.artBox&&tt("/ArtBox ["+Z(t.artBox.bottomLeftX)+" "+Z(t.artBox.bottomLeftY)+" "+Z(t.artBox.topRightX)+" "+Z(t.artBox.topRightY)+"]"),"number"==typeof t.userUnit&&1!==t.userUnit&&tt("/UserUnit "+t.userUnit),it.publish("putPage",{objId:r,pageContext:V[e],pageNumber:e,page:n}),tt("/Contents "+i+" 0 R"),tt(">>"),tt("endobj");var o=n.join("\n");return ot(i,!0),ft({data:o,filters:ct()}),tt("endobj"),r},dt=l.__private__.putPages=function(){var t,e,n=[];for(t=1;t<=W;t++)V[t].objId=X(),V[t].contentsObjId=X();for(t=1;t<=W;t++)n.push(pt({number:t,data:I[t],objId:V[t].objId,contentsObjId:V[t].contentsObjId,mediaBox:V[t].mediaBox,cropBox:V[t].cropBox,bleedBox:V[t].bleedBox,trimBox:V[t].trimBox,artBox:V[t].artBox,userUnit:V[t].userUnit,rootDictionaryObjId:st,resourceDictionaryObjId:lt}));ot(st,!0),tt("<</Type /Pages");var r="/Kids [";for(e=0;e<W;e++)r+=n[e]+" 0 R ";tt(r+"]"),tt("/Count "+W),tt(">>"),tt("endobj"),it.publish("postPutPages")},gt=function(){!function(){for(var t in rt)rt.hasOwnProperty(t)&&(!1===s||!0===s&&K.hasOwnProperty(t))&&(e=rt[t],it.publish("putFont",{font:e,out:tt,newObject:J,putStream:ft}),!0!==e.isAlreadyPutted&&(e.objectNumber=J(),tt("<<"),tt("/Type /Font"),tt("/BaseFont /"+e.postScriptName),tt("/Subtype /Type1"),"string"==typeof e.encoding&&tt("/Encoding /"+e.encoding),tt("/FirstChar 32"),tt("/LastChar 255"),tt(">>"),tt("endobj")));var e}(),it.publish("putResources"),ot(lt,!0),tt("<<"),function(){for(var t in tt("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),tt("/Font <<"),rt)rt.hasOwnProperty(t)&&(!1===s||!0===s&&K.hasOwnProperty(t))&&tt("/"+t+" "+rt[t].objectNumber+" 0 R");tt(">>"),tt("/XObject <<"),it.publish("putXobjectDict"),tt(">>")}(),tt(">>"),tt("endobj"),it.publish("postPutResources")},mt=function(t,e,n){H.hasOwnProperty(e)||(H[e]={}),H[e][n]=t},yt=function(t,e,n,r,i){i=i||!1;var o="F"+(Object.keys(rt).length+1).toString(10),a={id:o,postScriptName:t,fontName:e,fontStyle:n,encoding:r,isStandardFont:i,metadata:{}};return it.publish("addFont",{font:a,instance:this}),void 0!==o&&(rt[o]=a,mt(o,e,n)),o},vt=l.__private__.pdfEscape=l.pdfEscape=function(t,e){return function(t,e){var n,r,i,o,a,s,l,h,u;if(i=(e=e||{}).sourceEncoding||"Unicode",a=e.outputEncoding,(e.autoencode||a)&&rt[$].metadata&&rt[$].metadata[i]&&rt[$].metadata[i].encoding&&(o=rt[$].metadata[i].encoding,!a&&rt[$].encoding&&(a=rt[$].encoding),!a&&o.codePages&&(a=o.codePages[0]),"string"==typeof a&&(a=o[a]),a)){for(l=!1,s=[],n=0,r=t.length;n<r;n++)(h=a[t.charCodeAt(n)])?s.push(String.fromCharCode(h)):s.push(t[n]),s[n].charCodeAt(0)>>8&&(l=!0);t=s.join("")}for(n=t.length;void 0===l&&0!==n;)t.charCodeAt(n-1)>>8&&(l=!0),n--;if(!l)return t;for(s=e.noBOM?[]:[254,255],n=0,r=t.length;n<r;n++){if((u=(h=t.charCodeAt(n))>>8)>>8)throw new Error("Character at position "+n+" of string '"+t+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");s.push(u),s.push(h-(u<<8))}return String.fromCharCode.apply(void 0,s)}(t,e).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},wt=l.__private__.beginPage=function(t,e){var n,r="string"==typeof e&&e.toLowerCase();if("string"==typeof t&&(n=f(t.toLowerCase()))&&(t=n[0],e=n[1]),Array.isArray(t)&&(e=t[1],t=t[0]),(isNaN(t)||isNaN(e))&&(t=i[0],e=i[1]),r){switch(r.substr(0,1)){case"l":t<e&&(r="s");break;case"p":e<t&&(r="s")}"s"===r&&(n=t,t=e,e=n)}(14400<t||14400<e)&&(console.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"),t=Math.min(14400,t),e=Math.min(14400,e)),i=[t,e],k=!0,I[++W]=[],V[W]={objId:0,contentsObjId:0,userUnit:Number(a),artBox:null,bleedBox:null,cropBox:null,trimBox:null,mediaBox:{bottomLeftX:0,bottomLeftY:0,topRightX:Number(t),topRightY:Number(e)}},xt(W)},bt=function(){wt.apply(this,arguments),Dt(Rt),tt(Jt),0!==te&&tt(te+" J"),0!==ne&&tt(ne+" j"),it.publish("addPage",{pageNumber:W})},xt=function(t){0<t&&t<=W&&(x=t)},Nt=l.__private__.getNumberOfPages=l.getNumberOfPages=function(){return I.length-1},Lt=function(t,e,n){var r,i=void 0;return n=n||{},t=void 0!==t?t:rt[$].fontName,e=void 0!==e?e:rt[$].fontStyle,r=t.toLowerCase(),void 0!==H[r]&&void 0!==H[r][e]?i=H[r][e]:void 0!==H[t]&&void 0!==H[t][e]?i=H[t][e]:!1===n.disableWarning&&console.warn("Unable to look up font label for font '"+t+"', '"+e+"'. Refer to getFontList() for available fonts."),i||n.noFallback||null==(i=H.times[e])&&(i=H.times.normal),i},At=l.__private__.putInfo=function(){for(var t in J(),tt("<<"),tt("/Producer (jsPDF "+ae.version+")"),D)D.hasOwnProperty(t)&&D[t]&&tt("/"+t.substr(0,1).toUpperCase()+t.substr(1)+" ("+vt(D[t])+")");tt("/CreationDate ("+p+")"),tt(">>"),tt("endobj")},St=l.__private__.putCatalog=function(t){var e=(t=t||{}).rootDictionaryObjId||st;switch(J(),tt("<<"),tt("/Type /Catalog"),tt("/Pages "+e+" 0 R"),L||(L="fullwidth"),L){case"fullwidth":tt("/OpenAction [3 0 R /FitH null]");break;case"fullheight":tt("/OpenAction [3 0 R /FitV null]");break;case"fullpage":tt("/OpenAction [3 0 R /Fit]");break;case"original":tt("/OpenAction [3 0 R /XYZ null null 1]");break;default:var n=""+L;"%"===n.substr(n.length-1)&&(L=parseInt(L)/100),"number"==typeof L&&tt("/OpenAction [3 0 R /XYZ null null "+Z(L)+"]")}switch(S||(S="continuous"),S){case"continuous":tt("/PageLayout /OneColumn");break;case"single":tt("/PageLayout /SinglePage");break;case"two":case"twoleft":tt("/PageLayout /TwoColumnLeft");break;case"tworight":tt("/PageLayout /TwoColumnRight")}A&&tt("/PageMode /"+A),it.publish("putCatalog"),tt(">>"),tt("endobj")},_t=l.__private__.putTrailer=function(){tt("trailer"),tt("<<"),tt("/Size "+(U+1)),tt("/Root "+U+" 0 R"),tt("/Info "+(U-1)+" 0 R"),tt("/ID [ <"+d+"> <"+d+"> ]"),tt(">>")},Ft=l.__private__.putHeader=function(){tt("%PDF-"+h),tt("%ºß¬à")},Pt=l.__private__.putXRef=function(){var t=1,e="0000000000";for(tt("xref"),tt("0 "+(U+1)),tt("0000000000 65535 f "),t=1;t<=U;t++){"function"==typeof z[t]?tt((e+z[t]()).slice(-10)+" 00000 n "):void 0!==z[t]?tt((e+z[t]).slice(-10)+" 00000 n "):tt("0000000000 00000 n ")}},kt=l.__private__.buildDocument=function(){k=!1,B=U=0,C=[],z=[],G=[],st=X(),lt=X(),it.publish("buildDocument"),Ft(),dt(),function(){it.publish("putAdditionalObjects");for(var t=0;t<G.length;t++){var e=G[t];ot(e.objId,!0),tt(e.content),tt("endobj")}it.publish("postPutAdditionalObjects")}(),gt(),At(),St();var t=B;return Pt(),_t(),tt("startxref"),tt(""+t),tt("%%EOF"),k=!0,C.join("\n")},It=l.__private__.getBlob=function(t){return new Blob([E(t)],{type:"application/pdf"})},Ct=l.output=l.__private__.output=((F=function(t,e){e=e||{};var n=kt();switch("string"==typeof e?e={filename:e}:e.filename=e.filename||"generated.pdf",t){case void 0:return n;case"save":l.save(e.filename);break;case"arraybuffer":return E(n);case"blob":return It(n);case"bloburi":case"bloburl":if(void 0!==ie.URL&&"function"==typeof ie.URL.createObjectURL)return ie.URL&&ie.URL.createObjectURL(It(n))||void 0;console.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");break;case"datauristring":case"dataurlstring":return"data:application/pdf;filename="+e.filename+";base64,"+btoa(n);case"dataurlnewwindow":var r='<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="'+this.output("datauristring")+'"></iframe></body></html>',i=ie.open();if(null!==i&&i.document.write(r),i||"undefined"==typeof safari)return i;case"datauri":case"dataurl":return ie.document.location.href="data:application/pdf;filename="+e.filename+";base64,"+btoa(n);default:return null}}).foo=function(){try{return F.apply(this,arguments)}catch(t){var e=t.stack||"";~e.indexOf(" at ")&&(e=e.split(" at ")[1]);var n="Error in function "+e.split("\n")[0].split("<")[0]+": "+t.message;if(!ie.console)throw new Error(n);ie.console.error(n,t),ie.alert&&alert(n)}},(F.foo.bar=F).foo),Bt=function(t){return!0===Array.isArray(Y)&&-1<Y.indexOf(t)};switch(e){case"pt":_=1;break;case"mm":_=72/25.4;break;case"cm":_=72/2.54;break;case"in":_=72;break;case"px":_=1==Bt("px_scaling")?.75:96/72;break;case"pc":case"em":_=12;break;case"ex":_=6;break;default:throw new Error("Invalid unit: "+e)}w(),m();var jt=l.__private__.getPageInfo=function(t){if(isNaN(t)||t%1!=0)throw new Error("Invalid argument passed to jsPDF.getPageInfo");return{objId:V[t].objId,pageNumber:t,pageContext:V[t]}},Et=l.__private__.getPageInfoByObjId=function(t){for(var e in V)if(V[e].objId===t)break;if(isNaN(t)||t%1!=0)throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");return jt(e)},Mt=l.__private__.getCurrentPageInfo=function(){return{objId:V[x].objId,pageNumber:x,pageContext:V[x]}};l.addPage=function(){return bt.apply(this,arguments),this},l.setPage=function(){return xt.apply(this,arguments),this},l.insertPage=function(t){return this.addPage(),this.movePage(x,t),this},l.movePage=function(t,e){if(e<t){for(var n=I[t],r=V[t],i=t;e<i;i--)I[i]=I[i-1],V[i]=V[i-1];I[e]=n,V[e]=r,this.setPage(e)}else if(t<e){for(n=I[t],r=V[t],i=t;i<e;i++)I[i]=I[i+1],V[i]=V[i+1];I[e]=n,V[e]=r,this.setPage(e)}return this},l.deletePage=function(){return function(t){0<t&&t<=W&&(I.splice(t,1),--W<x&&(x=W),this.setPage(x))}.apply(this,arguments),this};l.__private__.text=l.text=function(t,e,n,i){var r;"number"!=typeof t||"number"!=typeof e||"string"!=typeof n&&!Array.isArray(n)||(r=n,n=e,e=t,t=r);var o=arguments[3],a=arguments[4],s=arguments[5];if("object"===se(o)&&null!==o||("string"==typeof a&&(s=a,a=null),"string"==typeof o&&(s=o,o=null),"number"==typeof o&&(a=o,o=null),i={flags:o,angle:a,align:s}),(o=o||{}).noBOM=o.noBOM||!0,o.autoencode=o.autoencode||!0,isNaN(e)||isNaN(n)||null==t)throw new Error("Invalid arguments passed to jsPDF.text");if(0===t.length)return c;var l,h="",u="number"==typeof i.lineHeightFactor?i.lineHeightFactor:Tt,c=i.scope||this;function f(t){for(var e,n=t.concat(),r=[],i=n.length;i--;)"string"==typeof(e=n.shift())?r.push(e):Array.isArray(t)&&1===e.length?r.push(e[0]):r.push([e[0],e[1],e[2]]);return r}function p(t,e){var n;if("string"==typeof t)n=e(t)[0];else if(Array.isArray(t)){for(var r,i,o=t.concat(),a=[],s=o.length;s--;)"string"==typeof(r=o.shift())?a.push(e(r)[0]):Array.isArray(r)&&"string"===r[0]&&(i=e(r[0],r[1],r[2]),a.push([i[0],i[1],i[2]]));n=a}return n}var d=!1,g=!0;if("string"==typeof t)d=!0;else if(Array.isArray(t)){for(var m,y=t.concat(),v=[],w=y.length;w--;)("string"!=typeof(m=y.shift())||Array.isArray(m)&&"string"!=typeof m[0])&&(g=!1);d=g}if(!1===d)throw new Error('Type of text must be string or Array. "'+t+'" is not recognized.');var b=rt[$].encoding;"WinAnsiEncoding"!==b&&"StandardEncoding"!==b||(t=p(t,function(t,e,n){return[(r=t,r=r.split("\t").join(Array(i.TabLen||9).join(" ")),vt(r,o)),e,n];var r})),"string"==typeof t&&(t=t.match(/[\r?\n]/)?t.split(/\r\n|\r|\n/g):[t]);var x=et/c.internal.scaleFactor,N=x*(Tt-1);switch(i.baseline){case"bottom":n-=N;break;case"top":n+=x-N;break;case"hanging":n+=x-2*N;break;case"middle":n+=x/2-N}0<(O=i.maxWidth||0)&&("string"==typeof t?t=c.splitTextToSize(t,O):"[object Array]"===Object.prototype.toString.call(t)&&(t=c.splitTextToSize(t.join(" "),O)));var L={text:t,x:e,y:n,options:i,mutex:{pdfEscape:vt,activeFontKey:$,fonts:rt,activeFontSize:et}};it.publish("preProcessText",L),t=L.text;a=(i=L.options).angle;var A=c.internal.scaleFactor,S=[];if(a){a*=Math.PI/180;var _=Math.cos(a),F=Math.sin(a);S=[Z(_),Z(F),Z(-1*F),Z(_)]}void 0!==(M=i.charSpace)&&(h+=Q(M*A)+" Tc\n");i.lang;var P=-1,k=void 0!==i.renderingMode?i.renderingMode:i.stroke,I=c.internal.getCurrentPageInfo().pageContext;switch(k){case 0:case!1:case"fill":P=0;break;case 1:case!0:case"stroke":P=1;break;case 2:case"fillThenStroke":P=2;break;case 3:case"invisible":P=3;break;case 4:case"fillAndAddForClipping":P=4;break;case 5:case"strokeAndAddPathForClipping":P=5;break;case 6:case"fillThenStrokeAndAddToPathForClipping":P=6;break;case 7:case"addToPathForClipping":P=7}var C=void 0!==I.usedRenderingMode?I.usedRenderingMode:-1;-1!==P?h+=P+" Tr\n":-1!==C&&(h+="0 Tr\n"),-1!==P&&(I.usedRenderingMode=P);s=i.align||"left";var B=et*u,j=c.internal.pageSize.getWidth(),E=(A=c.internal.scaleFactor,rt[$]),M=i.charSpace||Qt,O=i.maxWidth||0,q=(o={},[]);if("[object Array]"===Object.prototype.toString.call(t)){var T,R;v=f(t);"left"!==s&&(R=v.map(function(t){return c.getStringUnitWidth(t,{font:E,charSpace:M,fontSize:et})*et/A}));var D,U=Math.max.apply(Math,R),z=0;if("right"===s){e-=R[0],t=[];var H=0;for(w=v.length;H<w;H++)U-R[H],T=0===H?(D=Wt(e),Vt(n)):(D=(z-R[H])*A,-B),t.push([v[H],D,T]),z=R[H]}else if("center"===s){e-=R[0]/2,t=[];for(H=0,w=v.length;H<w;H++)(U-R[H])/2,T=0===H?(D=Wt(e),Vt(n)):(D=(z-R[H])/2*A,-B),t.push([v[H],D,T]),z=R[H]}else if("left"===s){t=[];for(H=0,w=v.length;H<w;H++)T=0===H?Vt(n):-B,D=0===H?Wt(e):0,t.push(v[H])}else{if("justify"!==s)throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');t=[];for(O=0!==O?O:j,H=0,w=v.length;H<w;H++)T=0===H?Vt(n):-B,D=0===H?Wt(e):0,H<w-1&&q.push(((O-R[H])/(v[H].split(" ").length-1)*A).toFixed(2)),t.push([v[H],D,T])}}!0===("boolean"==typeof i.R2L?i.R2L:nt)&&(t=p(t,function(t,e,n){return[t.split("").reverse().join(""),e,n]}));L={text:t,x:e,y:n,options:i,mutex:{pdfEscape:vt,activeFontKey:$,fonts:rt,activeFontSize:et}};it.publish("postProcessText",L),t=L.text,l=L.mutex.isHex;v=f(t);t=[];var W,V,G,Y=0,J=(w=v.length,"");for(H=0;H<w;H++)J="",Array.isArray(v[H])?(W=parseFloat(v[H][1]),V=parseFloat(v[H][2]),G=(l?"<":"(")+v[H][0]+(l?">":")"),Y=1):(W=Wt(e),V=Vt(n),G=(l?"<":"(")+v[H]+(l?">":")")),void 0!==q&&void 0!==q[H]&&(J=q[H]+" Tw\n"),0!==S.length&&0===H?t.push(J+S.join(" ")+" "+W.toFixed(2)+" "+V.toFixed(2)+" Tm\n"+G):1===Y||0===Y&&0===H?t.push(J+W.toFixed(2)+" "+V.toFixed(2)+" Td\n"+G):t.push(J+G);t=0===Y?t.join(" Tj\nT* "):t.join(" Tj\n"),t+=" Tj\n";var X="BT\n/"+$+" "+et+" Tf\n"+(et*u).toFixed(2)+" TL\n"+Kt+"\n";return X+=h,X+=t,tt(X+="ET"),K[$]=!0,c},l.__private__.lstext=l.lstext=function(t,e,n,r){return console.warn("jsPDF.lstext is deprecated"),this.text(t,e,n,{charSpace:r})},l.__private__.clip=l.clip=function(t){tt("evenodd"===t?"W*":"W"),tt("n")},l.__private__.clip_fixed=l.clip_fixed=function(t){console.log("clip_fixed is deprecated"),l.clip(t)};var Ot=l.__private__.isValidStyle=function(t){var e=!1;return-1!==[void 0,null,"S","F","DF","FD","f","f*","B","B*"].indexOf(t)&&(e=!0),e},qt=l.__private__.getStyle=function(t){var e="S";return"F"===t?e="f":"FD"===t||"DF"===t?e="B":"f"!==t&&"f*"!==t&&"B"!==t&&"B*"!==t||(e=t),e};l.__private__.line=l.line=function(t,e,n,r){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r))throw new Error("Invalid arguments passed to jsPDF.line");return this.lines([[n-t,r-e]],t,e)},l.__private__.lines=l.lines=function(t,e,n,r,i,o){var a,s,l,h,u,c,f,p,d,g,m,y;if("number"==typeof t&&(y=n,n=e,e=t,t=y),r=r||[1,1],o=o||!1,isNaN(e)||isNaN(n)||!Array.isArray(t)||!Array.isArray(r)||!Ot(i)||"boolean"!=typeof o)throw new Error("Invalid arguments passed to jsPDF.lines");for(tt(Q(Wt(e))+" "+Q(Vt(n))+" m "),a=r[0],s=r[1],h=t.length,g=e,m=n,l=0;l<h;l++)2===(u=t[l]).length?(g=u[0]*a+g,m=u[1]*s+m,tt(Q(Wt(g))+" "+Q(Vt(m))+" l")):(c=u[0]*a+g,f=u[1]*s+m,p=u[2]*a+g,d=u[3]*s+m,g=u[4]*a+g,m=u[5]*s+m,tt(Q(Wt(c))+" "+Q(Vt(f))+" "+Q(Wt(p))+" "+Q(Vt(d))+" "+Q(Wt(g))+" "+Q(Vt(m))+" c"));return o&&tt(" h"),null!==i&&tt(qt(i)),this},l.__private__.rect=l.rect=function(t,e,n,r,i){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r)||!Ot(i))throw new Error("Invalid arguments passed to jsPDF.rect");return tt([Z(Wt(t)),Z(Vt(e)),Z(n*_),Z(-r*_),"re"].join(" ")),null!==i&&tt(qt(i)),this},l.__private__.triangle=l.triangle=function(t,e,n,r,i,o,a){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r)||isNaN(i)||isNaN(o)||!Ot(a))throw new Error("Invalid arguments passed to jsPDF.triangle");return this.lines([[n-t,r-e],[i-n,o-r],[t-i,e-o]],t,e,[1,1],a,!0),this},l.__private__.roundedRect=l.roundedRect=function(t,e,n,r,i,o,a){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r)||isNaN(i)||isNaN(o)||!Ot(a))throw new Error("Invalid arguments passed to jsPDF.roundedRect");var s=4/3*(Math.SQRT2-1);return this.lines([[n-2*i,0],[i*s,0,i,o-o*s,i,o],[0,r-2*o],[0,o*s,-i*s,o,-i,o],[2*i-n,0],[-i*s,0,-i,-o*s,-i,-o],[0,2*o-r],[0,-o*s,i*s,-o,i,-o]],t+i,e,[1,1],a),this},l.__private__.ellipse=l.ellipse=function(t,e,n,r,i){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r)||!Ot(i))throw new Error("Invalid arguments passed to jsPDF.ellipse");var o=4/3*(Math.SQRT2-1)*n,a=4/3*(Math.SQRT2-1)*r;return tt([Z(Wt(t+n)),Z(Vt(e)),"m",Z(Wt(t+n)),Z(Vt(e-a)),Z(Wt(t+o)),Z(Vt(e-r)),Z(Wt(t)),Z(Vt(e-r)),"c"].join(" ")),tt([Z(Wt(t-o)),Z(Vt(e-r)),Z(Wt(t-n)),Z(Vt(e-a)),Z(Wt(t-n)),Z(Vt(e)),"c"].join(" ")),tt([Z(Wt(t-n)),Z(Vt(e+a)),Z(Wt(t-o)),Z(Vt(e+r)),Z(Wt(t)),Z(Vt(e+r)),"c"].join(" ")),tt([Z(Wt(t+o)),Z(Vt(e+r)),Z(Wt(t+n)),Z(Vt(e+a)),Z(Wt(t+n)),Z(Vt(e)),"c"].join(" ")),null!==i&&tt(qt(i)),this},l.__private__.circle=l.circle=function(t,e,n,r){if(isNaN(t)||isNaN(e)||isNaN(n)||!Ot(r))throw new Error("Invalid arguments passed to jsPDF.circle");return this.ellipse(t,e,n,n,r)};l.setFont=function(t,e){return $=Lt(t,e,{disableWarning:!1}),this},l.setFontStyle=l.setFontType=function(t){return $=Lt(void 0,t),this};l.__private__.getFontList=l.getFontList=function(){var t,e,n,r={};for(t in H)if(H.hasOwnProperty(t))for(e in r[t]=n=[],H[t])H[t].hasOwnProperty(e)&&n.push(e);return r};l.addFont=function(t,e,n,r){yt.call(this,t,e,n,r=r||"Identity-H")};var Tt,Rt=r.lineWidth||.200025,Dt=l.__private__.setLineWidth=l.setLineWidth=function(t){return tt((t*_).toFixed(2)+" w"),this},Ut=(l.__private__.setLineDash=ae.API.setLineDash=function(t,e){if(t=t||[],e=e||0,isNaN(e)||!Array.isArray(t))throw new Error("Invalid arguments passed to jsPDF.setLineDash");return t=t.map(function(t){return(t*_).toFixed(3)}).join(" "),e=parseFloat((e*_).toFixed(3)),tt("["+t+"] "+e+" d"),this},l.__private__.getLineHeight=l.getLineHeight=function(){return et*Tt}),zt=(Ut=l.__private__.getLineHeight=l.getLineHeight=function(){return et*Tt},l.__private__.setLineHeightFactor=l.setLineHeightFactor=function(t){return"number"==typeof(t=t||1.15)&&(Tt=t),this}),Ht=l.__private__.getLineHeightFactor=l.getLineHeightFactor=function(){return Tt};zt(r.lineHeight);var Wt=l.__private__.getHorizontalCoordinate=function(t){return t*_},Vt=l.__private__.getVerticalCoordinate=function(t){return V[x].mediaBox.topRightY-V[x].mediaBox.bottomLeftY-t*_},Gt=l.__private__.getHorizontalCoordinateString=function(t){return Z(t*_)},Yt=l.__private__.getVerticalCoordinateString=function(t){return Z(V[x].mediaBox.topRightY-V[x].mediaBox.bottomLeftY-t*_)},Jt=r.strokeColor||"0 G",Xt=(l.__private__.getStrokeColor=l.getDrawColor=function(){return ht(Jt)},l.__private__.setStrokeColor=l.setDrawColor=function(t,e,n,r){return Jt=ut({ch1:t,ch2:e,ch3:n,ch4:r,pdfColorType:"draw",precision:2}),tt(Jt),this},r.fillColor||"0 g"),Kt=(l.__private__.getFillColor=l.getFillColor=function(){return ht(Xt)},l.__private__.setFillColor=l.setFillColor=function(t,e,n,r){return Xt=ut({ch1:t,ch2:e,ch3:n,ch4:r,pdfColorType:"fill",precision:2}),tt(Xt),this},r.textColor||"0 g"),Zt=l.__private__.getTextColor=l.getTextColor=function(){return ht(Kt)},Qt=(l.__private__.setTextColor=l.setTextColor=function(t,e,n,r){return Kt=ut({ch1:t,ch2:e,ch3:n,ch4:r,pdfColorType:"text",precision:3}),this},r.charSpace||0),$t=l.__private__.getCharSpace=l.getCharSpace=function(){return Qt},te=(l.__private__.setCharSpace=l.setCharSpace=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.setCharSpace");return Qt=t,this},0);l.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2};l.__private__.setLineCap=l.setLineCap=function(t){var e=l.CapJoinStyles[t];if(void 0===e)throw new Error("Line cap style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return tt((te=e)+" J"),this};var ee,ne=0;l.__private__.setLineJoin=l.setLineJoin=function(t){var e=l.CapJoinStyles[t];if(void 0===e)throw new Error("Line join style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return tt((ne=e)+" j"),this},l.__private__.setMiterLimit=l.setMiterLimit=function(t){if(t=t||0,isNaN(t))throw new Error("Invalid argument passed to jsPDF.setMiterLimit");return ee=parseFloat(Z(t*_)),tt(ee+" M"),this};for(var re in l.save=function(r,t){if(r=r||"generated.pdf",(t=t||{}).returnPromise=t.returnPromise||!1,!1!==t.returnPromise)return new Promise(function(t,e){try{var n=le(It(kt()),r);"function"==typeof le.unload&&ie.setTimeout&&setTimeout(le.unload,911),t(n)}catch(t){e(t.message)}});le(It(kt()),r),"function"==typeof le.unload&&ie.setTimeout&&setTimeout(le.unload,911)},ae.API)ae.API.hasOwnProperty(re)&&("events"===re&&ae.API.events.length?function(t,e){var n,r,i;for(i=e.length-1;-1!==i;i--)n=e[i][0],r=e[i][1],t.subscribe.apply(t,[n].concat("function"==typeof r?[r]:r))}(it,ae.API.events):l[re]=ae.API[re]);return l.internal={pdfEscape:vt,getStyle:qt,getFont:function(){return rt[Lt.apply(l,arguments)]},getFontSize:O,getCharSpace:$t,getTextColor:Zt,getLineHeight:Ut,getLineHeightFactor:Ht,write:j,getHorizontalCoordinate:Wt,getVerticalCoordinate:Vt,getCoordinateString:Gt,getVerticalCoordinateString:Yt,collections:{},newObject:J,newAdditionalObject:at,newObjectDeferred:X,newObjectDeferredBegin:ot,getFilters:ct,putStream:ft,events:it,scaleFactor:_,pageSize:{getWidth:function(){return(V[x].mediaBox.topRightX-V[x].mediaBox.bottomLeftX)/_},setWidth:function(t){V[x].mediaBox.topRightX=t*_+V[x].mediaBox.bottomLeftX},getHeight:function(){return(V[x].mediaBox.topRightY-V[x].mediaBox.bottomLeftY)/_},setHeight:function(t){V[x].mediaBox.topRightY=t*_+V[x].mediaBox.bottomLeftY}},output:Ct,getNumberOfPages:Nt,pages:I,out:tt,f2:Z,f3:Q,getPageInfo:jt,getPageInfoByObjId:Et,getCurrentPageInfo:Mt,getPDFVersion:u,hasHotfix:Bt},Object.defineProperty(l.internal.pageSize,"width",{get:function(){return(V[x].mediaBox.topRightX-V[x].mediaBox.bottomLeftX)/_},set:function(t){V[x].mediaBox.topRightX=t*_+V[x].mediaBox.bottomLeftX},enumerable:!0,configurable:!0}),Object.defineProperty(l.internal.pageSize,"height",{get:function(){return(V[x].mediaBox.topRightY-V[x].mediaBox.bottomLeftY)/_},set:function(t){V[x].mediaBox.topRightY=t*_+V[x].mediaBox.bottomLeftY},enumerable:!0,configurable:!0}),function(t){for(var e=0,n=M.length;e<n;e++){var r=yt(t[e][0],t[e][1],t[e][2],M[e][3],!0);K[r]=!0;var i=t[e][0].split("-");mt(r,i[0],i[1]||"")}it.publish("addFonts",{fonts:rt,dictionary:H})}(M),$="F1",bt(i,t),it.publish("initialized"),l}return ae.API={events:[]},ae.version="1.5.3","function"==typeof define&&define.amd?define("jsPDF",function(){return ae}):"undefined"!=typeof module&&module.exports?(module.exports=ae,module.exports.jsPDF=ae):ie.jsPDF=ae,ae}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")());
/**
   * @license
   * Copyright (c) 2016 Alexander Weidt,
   * https://github.com/BiggA94
   * 
   * Licensed under the MIT License. http://opensource.org/licenses/mit-license
   */
(function(t,e){var A,n=1,S=function(t){return t.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},y=function(t){return t.replace(/\\\\/g,"\\").replace(/\\\(/g,"(").replace(/\\\)/g,")")},_=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.f2");return t.toFixed(2)},s=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.f2");return t.toFixed(5)};t.__acroform__={};var r=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t},v=function(t){return t*n},w=function(t){return t/n},l=function(t){var e=new j,n=Y.internal.getHeight(t)||0,r=Y.internal.getWidth(t)||0;return e.BBox=[0,0,Number(_(r)),Number(_(n))],e},i=t.__acroform__.setBit=function(t,e){if(t=t||0,e=e||0,isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");return t|=1<<e},o=t.__acroform__.clearBit=function(t,e){if(t=t||0,e=e||0,isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");return t&=~(1<<e)},a=t.__acroform__.getBit=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");return 0==(t&1<<e)?0:1},b=t.__acroform__.getBitForPdf=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");return a(t,e-1)},x=t.__acroform__.setBitForPdf=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");return i(t,e-1)},N=t.__acroform__.clearBitForPdf=function(t,e,n){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");return o(t,e-1)},c=t.__acroform__.calculateCoordinates=function(t){var e=this.internal.getHorizontalCoordinate,n=this.internal.getVerticalCoordinate,r=t[0],i=t[1],o=t[2],a=t[3],s={};return s.lowerLeft_X=e(r)||0,s.lowerLeft_Y=n(i+a)||0,s.upperRight_X=e(r+o)||0,s.upperRight_Y=n(i)||0,[Number(_(s.lowerLeft_X)),Number(_(s.lowerLeft_Y)),Number(_(s.upperRight_X)),Number(_(s.upperRight_Y))]},f=function(t){if(t.appearanceStreamContent)return t.appearanceStreamContent;if(t.V||t.DV){var e=[],n=t.V||t.DV,r=h(t,n),i=A.internal.getFont(t.fontName,t.fontStyle).id;e.push("/Tx BMC"),e.push("q"),e.push("BT"),e.push(A.__private__.encodeColorString(t.color)),e.push("/"+i+" "+_(r.fontSize)+" Tf"),e.push("1 0 0 1 0 0 Tm"),e.push(r.text),e.push("ET"),e.push("Q"),e.push("EMC");var o=new l(t);return o.stream=e.join("\n"),o}},h=function(i,t){var e=i.maxFontSize||12,n=(i.fontName,{text:"",fontSize:""}),o=(t=")"==(t="("==t.substr(0,1)?t.substr(1):t).substr(t.length-1)?t.substr(0,t.length-1):t).split(" "),r=(A.__private__.encodeColorString(i.color),e),a=Y.internal.getHeight(i)||0;a=a<0?-a:a;var s=Y.internal.getWidth(i)||0;s=s<0?-s:s;var l=function(t,e,n){if(t+1<o.length){var r=e+" "+o[t+1];return F(r,i,n).width<=s-4}return!1};r++;t:for(;;){t="";var h=F("3",i,--r).height,u=i.multiline?a-r:(a-h)/2,c=-2,f=u+=2,p=0,d=0,g=0;if(r<=0){t="(...) Tj\n",t+="% Width of Text: "+F(t,i,r=12).width+", FieldWidth:"+s+"\n";break}g=F(o[0]+" ",i,r).width;var m="",y=0;for(var v in o)if(o.hasOwnProperty(v)){m=" "==(m+=o[v]+" ").substr(m.length-1)?m.substr(0,m.length-1):m;var w=parseInt(v);g=F(m+" ",i,r).width;var b=l(w,m,r),x=v>=o.length-1;if(b&&!x){m+=" ";continue}if(b||x){if(x)d=w;else if(i.multiline&&a<(h+2)*(y+2)+2)continue t}else{if(!i.multiline)continue t;if(a<(h+2)*(y+2)+2)continue t;d=w}for(var N="",L=p;L<=d;L++)N+=o[L]+" ";switch(N=" "==N.substr(N.length-1)?N.substr(0,N.length-1):N,g=F(N,i,r).width,i.textAlign){case"right":c=s-g-2;break;case"center":c=(s-g)/2;break;case"left":default:c=2}t+=_(c)+" "+_(f)+" Td\n",t+="("+S(N)+") Tj\n",t+=-_(c)+" 0 Td\n",f=-(r+2),g=0,p=d+1,y++,m=""}else;break}return n.text=t,n.fontSize=r,n},F=function(t,e,n){var r=A.internal.getFont(e.fontName,e.fontStyle),i=A.getStringUnitWidth(t,{font:r,fontSize:parseFloat(n),charSpace:0})*parseFloat(n);return{height:A.getStringUnitWidth("3",{font:r,fontSize:parseFloat(n),charSpace:0})*parseFloat(n)*1.5,width:i}},u={fields:[],xForms:[],acroFormDictionaryRoot:null,printedOut:!1,internal:null,isInitialized:!1},p=function(){A.internal.acroformPlugin.acroFormDictionaryRoot.objId=void 0;var t=A.internal.acroformPlugin.acroFormDictionaryRoot.Fields;for(var e in t)if(t.hasOwnProperty(e)){var n=t[e];n.objId=void 0,n.hasAnnotation&&d.call(A,n)}},d=function(t){var e={type:"reference",object:t};void 0===A.internal.getPageInfo(t.page).pageContext.annotations.find(function(t){return t.type===e.type&&t.object===e.object})&&A.internal.getPageInfo(t.page).pageContext.annotations.push(e)},g=function(){if(void 0===A.internal.acroformPlugin.acroFormDictionaryRoot)throw new Error("putCatalogCallback: Root missing.");A.internal.write("/AcroForm "+A.internal.acroformPlugin.acroFormDictionaryRoot.objId+" 0 R")},m=function(){A.internal.events.unsubscribe(A.internal.acroformPlugin.acroFormDictionaryRoot._eventID),delete A.internal.acroformPlugin.acroFormDictionaryRoot._eventID,A.internal.acroformPlugin.printedOut=!0},L=function(t){var e=!t;t||(A.internal.newObjectDeferredBegin(A.internal.acroformPlugin.acroFormDictionaryRoot.objId,!0),A.internal.acroformPlugin.acroFormDictionaryRoot.putStream());t=t||A.internal.acroformPlugin.acroFormDictionaryRoot.Kids;for(var n in t)if(t.hasOwnProperty(n)){var r=t[n],i=[],o=r.Rect;if(r.Rect&&(r.Rect=c.call(this,r.Rect)),A.internal.newObjectDeferredBegin(r.objId,!0),r.DA=Y.createDefaultAppearanceStream(r),"object"===se(r)&&"function"==typeof r.getKeyValueListForStream&&(i=r.getKeyValueListForStream()),r.Rect=o,r.hasAppearanceStream&&!r.appearanceStreamContent){var a=f.call(this,r);i.push({key:"AP",value:"<</N "+a+">>"}),A.internal.acroformPlugin.xForms.push(a)}if(r.appearanceStreamContent){var s="";for(var l in r.appearanceStreamContent)if(r.appearanceStreamContent.hasOwnProperty(l)){var h=r.appearanceStreamContent[l];if(s+="/"+l+" ",s+="<<",1<=Object.keys(h).length||Array.isArray(h))for(var n in h){var u;if(h.hasOwnProperty(n))"function"==typeof(u=h[n])&&(u=u.call(this,r)),s+="/"+n+" "+u+" ",0<=A.internal.acroformPlugin.xForms.indexOf(u)||A.internal.acroformPlugin.xForms.push(u)}else"function"==typeof(u=h)&&(u=u.call(this,r)),s+="/"+n+" "+u,0<=A.internal.acroformPlugin.xForms.indexOf(u)||A.internal.acroformPlugin.xForms.push(u);s+=">>"}i.push({key:"AP",value:"<<\n"+s+">>"})}A.internal.putStream({additionalKeyValues:i}),A.internal.out("endobj")}e&&P.call(this,A.internal.acroformPlugin.xForms)},P=function(t){for(var e in t)if(t.hasOwnProperty(e)){var n=e,r=t[e];A.internal.newObjectDeferredBegin(r&&r.objId,!0),"object"===se(r)&&"function"==typeof r.putStream&&r.putStream(),delete t[n]}},k=function(){if(void 0!==this.internal&&(void 0===this.internal.acroformPlugin||!1===this.internal.acroformPlugin.isInitialized)){if(A=this,M.FieldNum=0,this.internal.acroformPlugin=JSON.parse(JSON.stringify(u)),this.internal.acroformPlugin.acroFormDictionaryRoot)throw new Error("Exception while creating AcroformDictionary");n=A.internal.scaleFactor,A.internal.acroformPlugin.acroFormDictionaryRoot=new E,A.internal.acroformPlugin.acroFormDictionaryRoot._eventID=A.internal.events.subscribe("postPutResources",m),A.internal.events.subscribe("buildDocument",p),A.internal.events.subscribe("putCatalog",g),A.internal.events.subscribe("postPutPages",L),A.internal.acroformPlugin.isInitialized=!0}},I=t.__acroform__.arrayToPdfArray=function(t){if(Array.isArray(t)){for(var e="[",n=0;n<t.length;n++)switch(0!==n&&(e+=" "),se(t[n])){case"boolean":case"number":case"object":e+=t[n].toString();break;case"string":"/"!==t[n].substr(0,1)?e+="("+S(t[n].toString())+")":e+=t[n].toString()}return e+="]"}throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray")};var C=function(t){return(t=t||"").toString(),t="("+S(t)+")"},B=function(){var e;Object.defineProperty(this,"objId",{configurable:!0,get:function(){if(e||(e=A.internal.newObjectDeferred()),!e)throw new Error("AcroFormPDFObject: Couldn't create Object ID");return e},set:function(t){e=t}})};B.prototype.toString=function(){return this.objId+" 0 R"},B.prototype.putStream=function(){var t=this.getKeyValueListForStream();A.internal.putStream({data:this.stream,additionalKeyValues:t}),A.internal.out("endobj")},B.prototype.getKeyValueListForStream=function(){return function(t){var e=[],n=Object.getOwnPropertyNames(t).filter(function(t){return"content"!=t&&"appearanceStreamContent"!=t&&"_"!=t.substring(0,1)});for(var r in n)if(!1===Object.getOwnPropertyDescriptor(t,n[r]).configurable){var i=n[r],o=t[i];o&&(Array.isArray(o)?e.push({key:i,value:I(o)}):o instanceof B?e.push({key:i,value:o.objId+" 0 R"}):"function"!=typeof o&&e.push({key:i,value:o}))}return e}(this)};var j=function(){B.call(this),Object.defineProperty(this,"Type",{value:"/XObject",configurable:!1,writeable:!0}),Object.defineProperty(this,"Subtype",{value:"/Form",configurable:!1,writeable:!0}),Object.defineProperty(this,"FormType",{value:1,configurable:!1,writeable:!0});var e,n=[];Object.defineProperty(this,"BBox",{configurable:!1,writeable:!0,get:function(){return n},set:function(t){n=t}}),Object.defineProperty(this,"Resources",{value:"2 0 R",configurable:!1,writeable:!0}),Object.defineProperty(this,"stream",{enumerable:!1,configurable:!0,set:function(t){e=t.trim()},get:function(){return e||null}})};r(j,B);var E=function(){B.call(this);var e,t=[];Object.defineProperty(this,"Kids",{enumerable:!1,configurable:!0,get:function(){return 0<t.length?t:void 0}}),Object.defineProperty(this,"Fields",{enumerable:!1,configurable:!1,get:function(){return t}}),Object.defineProperty(this,"DA",{enumerable:!1,configurable:!1,get:function(){if(e)return"("+e+")"},set:function(t){e=t}})};r(E,B);var M=function t(){B.call(this);var e=4;Object.defineProperty(this,"F",{enumerable:!1,configurable:!1,get:function(){return e},set:function(t){if(isNaN(t))throw new Error('Invalid value "'+t+'" for attribute F supplied.');e=t}}),Object.defineProperty(this,"showWhenPrinted",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(e,3))},set:function(t){!0===Boolean(t)?this.F=x(e,3):this.F=N(e,3)}});var n=0;Object.defineProperty(this,"Ff",{enumerable:!1,configurable:!1,get:function(){return n},set:function(t){if(isNaN(t))throw new Error('Invalid value "'+t+'" for attribute Ff supplied.');n=t}});var r=[];Object.defineProperty(this,"Rect",{enumerable:!1,configurable:!1,get:function(){if(0!==r.length)return r},set:function(t){r=void 0!==t?t:[]}}),Object.defineProperty(this,"x",{enumerable:!0,configurable:!0,get:function(){return!r||isNaN(r[0])?0:w(r[0])},set:function(t){r[0]=v(t)}}),Object.defineProperty(this,"y",{enumerable:!0,configurable:!0,get:function(){return!r||isNaN(r[1])?0:w(r[1])},set:function(t){r[1]=v(t)}}),Object.defineProperty(this,"width",{enumerable:!0,configurable:!0,get:function(){return!r||isNaN(r[2])?0:w(r[2])},set:function(t){r[2]=v(t)}}),Object.defineProperty(this,"height",{enumerable:!0,configurable:!0,get:function(){return!r||isNaN(r[3])?0:w(r[3])},set:function(t){r[3]=v(t)}});var i="";Object.defineProperty(this,"FT",{enumerable:!0,configurable:!1,get:function(){return i},set:function(t){switch(t){case"/Btn":case"/Tx":case"/Ch":case"/Sig":i=t;break;default:throw new Error('Invalid value "'+t+'" for attribute FT supplied.')}}});var o=null;Object.defineProperty(this,"T",{enumerable:!0,configurable:!1,get:function(){if(!o||o.length<1){if(this instanceof H)return;o="FieldObject"+t.FieldNum++}return"("+S(o)+")"},set:function(t){o=t.toString()}}),Object.defineProperty(this,"fieldName",{configurable:!0,enumerable:!0,get:function(){return o},set:function(t){o=t}});var a="helvetica";Object.defineProperty(this,"fontName",{enumerable:!0,configurable:!0,get:function(){return a},set:function(t){a=t}});var s="normal";Object.defineProperty(this,"fontStyle",{enumerable:!0,configurable:!0,get:function(){return s},set:function(t){s=t}});var l=0;Object.defineProperty(this,"fontSize",{enumerable:!0,configurable:!0,get:function(){return w(l)},set:function(t){l=v(t)}});var h=50;Object.defineProperty(this,"maxFontSize",{enumerable:!0,configurable:!0,get:function(){return w(h)},set:function(t){h=v(t)}});var u="black";Object.defineProperty(this,"color",{enumerable:!0,configurable:!0,get:function(){return u},set:function(t){u=t}});var c="/F1 0 Tf 0 g";Object.defineProperty(this,"DA",{enumerable:!0,configurable:!1,get:function(){if(!(!c||this instanceof H||this instanceof V))return C(c)},set:function(t){t=t.toString(),c=t}});var f=null;Object.defineProperty(this,"DV",{enumerable:!1,configurable:!1,get:function(){if(f)return this instanceof D==!1?C(f):f},set:function(t){t=t.toString(),f=this instanceof D==!1?"("===t.substr(0,1)?y(t.substr(1,t.length-2)):y(t):t}}),Object.defineProperty(this,"defaultValue",{enumerable:!0,configurable:!0,get:function(){return this instanceof D==!0?y(f.substr(1,f.length-1)):f},set:function(t){t=t.toString(),f=this instanceof D==!0?"/"+t:t}});var p=null;Object.defineProperty(this,"V",{enumerable:!1,configurable:!1,get:function(){if(p)return this instanceof D==!1?C(p):p},set:function(t){t=t.toString(),p=this instanceof D==!1?"("===t.substr(0,1)?y(t.substr(1,t.length-2)):y(t):t}}),Object.defineProperty(this,"value",{enumerable:!0,configurable:!0,get:function(){return this instanceof D==!0?y(p.substr(1,p.length-1)):p},set:function(t){t=t.toString(),p=this instanceof D==!0?"/"+t:t}}),Object.defineProperty(this,"hasAnnotation",{enumerable:!0,configurable:!0,get:function(){return this.Rect}}),Object.defineProperty(this,"Type",{enumerable:!0,configurable:!1,get:function(){return this.hasAnnotation?"/Annot":null}}),Object.defineProperty(this,"Subtype",{enumerable:!0,configurable:!1,get:function(){return this.hasAnnotation?"/Widget":null}});var d,g=!1;Object.defineProperty(this,"hasAppearanceStream",{enumerable:!0,configurable:!0,writeable:!0,get:function(){return g},set:function(t){t=Boolean(t),g=t}}),Object.defineProperty(this,"page",{enumerable:!0,configurable:!0,writeable:!0,get:function(){if(d)return d},set:function(t){d=t}}),Object.defineProperty(this,"readOnly",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,1))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,1):this.Ff=N(this.Ff,1)}}),Object.defineProperty(this,"required",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,2))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,2):this.Ff=N(this.Ff,2)}}),Object.defineProperty(this,"noExport",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,3))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,3):this.Ff=N(this.Ff,3)}});var m=null;Object.defineProperty(this,"Q",{enumerable:!0,configurable:!1,get:function(){if(null!==m)return m},set:function(t){if(-1===[0,1,2].indexOf(t))throw new Error('Invalid value "'+t+'" for attribute Q supplied.');m=t}}),Object.defineProperty(this,"textAlign",{get:function(){var t="left";switch(m){case 0:default:t="left";break;case 1:t="center";break;case 2:t="right"}return t},configurable:!0,enumerable:!0,set:function(t){switch(t){case"right":case 2:m=2;break;case"center":case 1:m=1;break;case"left":case 0:default:m=0}}})};r(M,B);var O=function(){M.call(this),this.FT="/Ch",this.V="()",this.fontName="zapfdingbats";var e=0;Object.defineProperty(this,"TI",{enumerable:!0,configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"topIndex",{enumerable:!0,configurable:!0,get:function(){return e},set:function(t){e=t}});var r=[];Object.defineProperty(this,"Opt",{enumerable:!0,configurable:!1,get:function(){return I(r)},set:function(t){var e,n;n=[],"string"==typeof(e=t)&&(n=function(t,e,n){n||(n=1);for(var r,i=[];r=e.exec(t);)i.push(r[n]);return i}(e,/\((.*?)\)/g)),r=n}}),this.getOptions=function(){return r},this.setOptions=function(t){r=t,this.sort&&r.sort()},this.addOption=function(t){t=(t=t||"").toString(),r.push(t),this.sort&&r.sort()},this.removeOption=function(t,e){for(e=e||!1,t=(t=t||"").toString();-1!==r.indexOf(t)&&(r.splice(r.indexOf(t),1),!1!==e););},Object.defineProperty(this,"combo",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,18))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,18):this.Ff=N(this.Ff,18)}}),Object.defineProperty(this,"edit",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,19))},set:function(t){!0===this.combo&&(!0===Boolean(t)?this.Ff=x(this.Ff,19):this.Ff=N(this.Ff,19))}}),Object.defineProperty(this,"sort",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,20))},set:function(t){!0===Boolean(t)?(this.Ff=x(this.Ff,20),r.sort()):this.Ff=N(this.Ff,20)}}),Object.defineProperty(this,"multiSelect",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,22))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,22):this.Ff=N(this.Ff,22)}}),Object.defineProperty(this,"doNotSpellCheck",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,23))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,23):this.Ff=N(this.Ff,23)}}),Object.defineProperty(this,"commitOnSelChange",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,27))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,27):this.Ff=N(this.Ff,27)}}),this.hasAppearanceStream=!1};r(O,M);var q=function(){O.call(this),this.fontName="helvetica",this.combo=!1};r(q,O);var T=function(){q.call(this),this.combo=!0};r(T,q);var R=function(){T.call(this),this.edit=!0};r(R,T);var D=function(){M.call(this),this.FT="/Btn",Object.defineProperty(this,"noToggleToOff",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,15))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,15):this.Ff=N(this.Ff,15)}}),Object.defineProperty(this,"radio",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,16))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,16):this.Ff=N(this.Ff,16)}}),Object.defineProperty(this,"pushButton",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,17))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,17):this.Ff=N(this.Ff,17)}}),Object.defineProperty(this,"radioIsUnison",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,26))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,26):this.Ff=N(this.Ff,26)}});var e,n={};Object.defineProperty(this,"MK",{enumerable:!1,configurable:!1,get:function(){if(0!==Object.keys(n).length){var t,e=[];for(t in e.push("<<"),n)e.push("/"+t+" ("+n[t]+")");return e.push(">>"),e.join("\n")}},set:function(t){"object"===se(t)&&(n=t)}}),Object.defineProperty(this,"caption",{enumerable:!0,configurable:!0,get:function(){return n.CA||""},set:function(t){"string"==typeof t&&(n.CA=t)}}),Object.defineProperty(this,"AS",{enumerable:!1,configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"appearanceState",{enumerable:!0,configurable:!0,get:function(){return e.substr(1,e.length-1)},set:function(t){e="/"+t}})};r(D,M);var U=function(){D.call(this),this.pushButton=!0};r(U,D);var z=function(){D.call(this),this.radio=!0,this.pushButton=!1;var e=[];Object.defineProperty(this,"Kids",{enumerable:!0,configurable:!1,get:function(){return e},set:function(t){e=void 0!==t?t:[]}})};r(z,D);var H=function(){var e,n;M.call(this),Object.defineProperty(this,"Parent",{enumerable:!1,configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"optionName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(t){n=t}});var r,i={};Object.defineProperty(this,"MK",{enumerable:!1,configurable:!1,get:function(){var t,e=[];for(t in e.push("<<"),i)e.push("/"+t+" ("+i[t]+")");return e.push(">>"),e.join("\n")},set:function(t){"object"===se(t)&&(i=t)}}),Object.defineProperty(this,"caption",{enumerable:!0,configurable:!0,get:function(){return i.CA||""},set:function(t){"string"==typeof t&&(i.CA=t)}}),Object.defineProperty(this,"AS",{enumerable:!1,configurable:!1,get:function(){return r},set:function(t){r=t}}),Object.defineProperty(this,"appearanceState",{enumerable:!0,configurable:!0,get:function(){return r.substr(1,r.length-1)},set:function(t){r="/"+t}}),this.optionName=name,this.caption="l",this.appearanceState="Off",this._AppearanceType=Y.RadioButton.Circle,this.appearanceStreamContent=this._AppearanceType.createAppearanceStream(name)};r(H,M),z.prototype.setAppearance=function(t){if(!("createAppearanceStream"in t&&"getCA"in t))throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");for(var e in this.Kids)if(this.Kids.hasOwnProperty(e)){var n=this.Kids[e];n.appearanceStreamContent=t.createAppearanceStream(n.optionName),n.caption=t.getCA()}},z.prototype.createOption=function(t){this.Kids.length;var e=new H;return e.Parent=this,e.optionName=t,this.Kids.push(e),J.call(this,e),e};var W=function(){D.call(this),this.fontName="zapfdingbats",this.caption="3",this.appearanceState="On",this.value="On",this.textAlign="center",this.appearanceStreamContent=Y.CheckBox.createAppearanceStream()};r(W,D);var V=function(){M.call(this),this.FT="/Tx",Object.defineProperty(this,"multiline",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,13))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,13):this.Ff=N(this.Ff,13)}}),Object.defineProperty(this,"fileSelect",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,21))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,21):this.Ff=N(this.Ff,21)}}),Object.defineProperty(this,"doNotSpellCheck",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,23))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,23):this.Ff=N(this.Ff,23)}}),Object.defineProperty(this,"doNotScroll",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,24))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,24):this.Ff=N(this.Ff,24)}}),Object.defineProperty(this,"comb",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,25))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,25):this.Ff=N(this.Ff,25)}}),Object.defineProperty(this,"richText",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,26))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,26):this.Ff=N(this.Ff,26)}});var e=null;Object.defineProperty(this,"MaxLen",{enumerable:!0,configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"maxLength",{enumerable:!0,configurable:!0,get:function(){return e},set:function(t){Number.isInteger(t)&&(e=t)}}),Object.defineProperty(this,"hasAppearanceStream",{enumerable:!0,configurable:!0,get:function(){return this.V||this.DV}})};r(V,M);var G=function(){V.call(this),Object.defineProperty(this,"password",{enumerable:!0,configurable:!0,get:function(){return Boolean(b(this.Ff,14))},set:function(t){!0===Boolean(t)?this.Ff=x(this.Ff,14):this.Ff=N(this.Ff,14)}}),this.password=!0};r(G,V);var Y={CheckBox:{createAppearanceStream:function(){return{N:{On:Y.CheckBox.YesNormal},D:{On:Y.CheckBox.YesPushDown,Off:Y.CheckBox.OffPushDown}}},YesPushDown:function(t){var e=l(t),n=[],r=A.internal.getFont(t.fontName,t.fontStyle).id,i=A.__private__.encodeColorString(t.color),o=h(t,t.caption);return n.push("0.749023 g"),n.push("0 0 "+_(Y.internal.getWidth(t))+" "+_(Y.internal.getHeight(t))+" re"),n.push("f"),n.push("BMC"),n.push("q"),n.push("0 0 1 rg"),n.push("/"+r+" "+_(o.fontSize)+" Tf "+i),n.push("BT"),n.push(o.text),n.push("ET"),n.push("Q"),n.push("EMC"),e.stream=n.join("\n"),e},YesNormal:function(t){var e=l(t),n=A.internal.getFont(t.fontName,t.fontStyle).id,r=A.__private__.encodeColorString(t.color),i=[],o=Y.internal.getHeight(t),a=Y.internal.getWidth(t),s=h(t,t.caption);return i.push("1 g"),i.push("0 0 "+_(a)+" "+_(o)+" re"),i.push("f"),i.push("q"),i.push("0 0 1 rg"),i.push("0 0 "+_(a-1)+" "+_(o-1)+" re"),i.push("W"),i.push("n"),i.push("0 g"),i.push("BT"),i.push("/"+n+" "+_(s.fontSize)+" Tf "+r),i.push(s.text),i.push("ET"),i.push("Q"),e.stream=i.join("\n"),e},OffPushDown:function(t){var e=l(t),n=[];return n.push("0.749023 g"),n.push("0 0 "+_(Y.internal.getWidth(t))+" "+_(Y.internal.getHeight(t))+" re"),n.push("f"),e.stream=n.join("\n"),e}},RadioButton:{Circle:{createAppearanceStream:function(t){var e={D:{Off:Y.RadioButton.Circle.OffPushDown},N:{}};return e.N[t]=Y.RadioButton.Circle.YesNormal,e.D[t]=Y.RadioButton.Circle.YesPushDown,e},getCA:function(){return"l"},YesNormal:function(t){var e=l(t),n=[],r=Y.internal.getWidth(t)<=Y.internal.getHeight(t)?Y.internal.getWidth(t)/4:Y.internal.getHeight(t)/4;r=Number((.9*r).toFixed(5));var i=Y.internal.Bezier_C,o=Number((r*i).toFixed(5));return n.push("q"),n.push("1 0 0 1 "+s(Y.internal.getWidth(t)/2)+" "+s(Y.internal.getHeight(t)/2)+" cm"),n.push(r+" 0 m"),n.push(r+" "+o+" "+o+" "+r+" 0 "+r+" c"),n.push("-"+o+" "+r+" -"+r+" "+o+" -"+r+" 0 c"),n.push("-"+r+" -"+o+" -"+o+" -"+r+" 0 -"+r+" c"),n.push(o+" -"+r+" "+r+" -"+o+" "+r+" 0 c"),n.push("f"),n.push("Q"),e.stream=n.join("\n"),e},YesPushDown:function(t){var e=l(t),n=[],r=Y.internal.getWidth(t)<=Y.internal.getHeight(t)?Y.internal.getWidth(t)/4:Y.internal.getHeight(t)/4,i=(r=Number((.9*r).toFixed(5)),Number((2*r).toFixed(5))),o=Number((i*Y.internal.Bezier_C).toFixed(5)),a=Number((r*Y.internal.Bezier_C).toFixed(5));return n.push("0.749023 g"),n.push("q"),n.push("1 0 0 1 "+s(Y.internal.getWidth(t)/2)+" "+s(Y.internal.getHeight(t)/2)+" cm"),n.push(i+" 0 m"),n.push(i+" "+o+" "+o+" "+i+" 0 "+i+" c"),n.push("-"+o+" "+i+" -"+i+" "+o+" -"+i+" 0 c"),n.push("-"+i+" -"+o+" -"+o+" -"+i+" 0 -"+i+" c"),n.push(o+" -"+i+" "+i+" -"+o+" "+i+" 0 c"),n.push("f"),n.push("Q"),n.push("0 g"),n.push("q"),n.push("1 0 0 1 "+s(Y.internal.getWidth(t)/2)+" "+s(Y.internal.getHeight(t)/2)+" cm"),n.push(r+" 0 m"),n.push(r+" "+a+" "+a+" "+r+" 0 "+r+" c"),n.push("-"+a+" "+r+" -"+r+" "+a+" -"+r+" 0 c"),n.push("-"+r+" -"+a+" -"+a+" -"+r+" 0 -"+r+" c"),n.push(a+" -"+r+" "+r+" -"+a+" "+r+" 0 c"),n.push("f"),n.push("Q"),e.stream=n.join("\n"),e},OffPushDown:function(t){var e=l(t),n=[],r=Y.internal.getWidth(t)<=Y.internal.getHeight(t)?Y.internal.getWidth(t)/4:Y.internal.getHeight(t)/4,i=(r=Number((.9*r).toFixed(5)),Number((2*r).toFixed(5))),o=Number((i*Y.internal.Bezier_C).toFixed(5));return n.push("0.749023 g"),n.push("q"),n.push("1 0 0 1 "+s(Y.internal.getWidth(t)/2)+" "+s(Y.internal.getHeight(t)/2)+" cm"),n.push(i+" 0 m"),n.push(i+" "+o+" "+o+" "+i+" 0 "+i+" c"),n.push("-"+o+" "+i+" -"+i+" "+o+" -"+i+" 0 c"),n.push("-"+i+" -"+o+" -"+o+" -"+i+" 0 -"+i+" c"),n.push(o+" -"+i+" "+i+" -"+o+" "+i+" 0 c"),n.push("f"),n.push("Q"),e.stream=n.join("\n"),e}},Cross:{createAppearanceStream:function(t){var e={D:{Off:Y.RadioButton.Cross.OffPushDown},N:{}};return e.N[t]=Y.RadioButton.Cross.YesNormal,e.D[t]=Y.RadioButton.Cross.YesPushDown,e},getCA:function(){return"8"},YesNormal:function(t){var e=l(t),n=[],r=Y.internal.calculateCross(t);return n.push("q"),n.push("1 1 "+_(Y.internal.getWidth(t)-2)+" "+_(Y.internal.getHeight(t)-2)+" re"),n.push("W"),n.push("n"),n.push(_(r.x1.x)+" "+_(r.x1.y)+" m"),n.push(_(r.x2.x)+" "+_(r.x2.y)+" l"),n.push(_(r.x4.x)+" "+_(r.x4.y)+" m"),n.push(_(r.x3.x)+" "+_(r.x3.y)+" l"),n.push("s"),n.push("Q"),e.stream=n.join("\n"),e},YesPushDown:function(t){var e=l(t),n=Y.internal.calculateCross(t),r=[];return r.push("0.749023 g"),r.push("0 0 "+_(Y.internal.getWidth(t))+" "+_(Y.internal.getHeight(t))+" re"),r.push("f"),r.push("q"),r.push("1 1 "+_(Y.internal.getWidth(t)-2)+" "+_(Y.internal.getHeight(t)-2)+" re"),r.push("W"),r.push("n"),r.push(_(n.x1.x)+" "+_(n.x1.y)+" m"),r.push(_(n.x2.x)+" "+_(n.x2.y)+" l"),r.push(_(n.x4.x)+" "+_(n.x4.y)+" m"),r.push(_(n.x3.x)+" "+_(n.x3.y)+" l"),r.push("s"),r.push("Q"),e.stream=r.join("\n"),e},OffPushDown:function(t){var e=l(t),n=[];return n.push("0.749023 g"),n.push("0 0 "+_(Y.internal.getWidth(t))+" "+_(Y.internal.getHeight(t))+" re"),n.push("f"),e.stream=n.join("\n"),e}}},createDefaultAppearanceStream:function(t){var e=A.internal.getFont(t.fontName,t.fontStyle).id,n=A.__private__.encodeColorString(t.color);return"/"+e+" "+t.fontSize+" Tf "+n}};Y.internal={Bezier_C:.551915024494,calculateCross:function(t){var e=Y.internal.getWidth(t),n=Y.internal.getHeight(t),r=Math.min(e,n);return{x1:{x:(e-r)/2,y:(n-r)/2+r},x2:{x:(e-r)/2+r,y:(n-r)/2},x3:{x:(e-r)/2,y:(n-r)/2},x4:{x:(e-r)/2+r,y:(n-r)/2+r}}}},Y.internal.getWidth=function(t){var e=0;return"object"===se(t)&&(e=v(t.Rect[2])),e},Y.internal.getHeight=function(t){var e=0;return"object"===se(t)&&(e=v(t.Rect[3])),e};var J=t.addField=function(t){if(k.call(this),!(t instanceof M))throw new Error("Invalid argument passed to jsPDF.addField.");return function(t){A.internal.acroformPlugin.printedOut&&(A.internal.acroformPlugin.printedOut=!1,A.internal.acroformPlugin.acroFormDictionaryRoot=null),A.internal.acroformPlugin.acroFormDictionaryRoot||k.call(A),A.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(t)}.call(this,t),t.page=A.internal.getCurrentPageInfo().pageNumber,this};t.addButton=function(t){if(t instanceof D==!1)throw new Error("Invalid argument passed to jsPDF.addButton.");return J.call(this,t)},t.addTextField=function(t){if(t instanceof V==!1)throw new Error("Invalid argument passed to jsPDF.addTextField.");return J.call(this,t)},t.addChoiceField=function(t){if(t instanceof O==!1)throw new Error("Invalid argument passed to jsPDF.addChoiceField.");return J.call(this,t)};"object"==se(e)&&void 0===e.ChoiceField&&void 0===e.ListBox&&void 0===e.ComboBox&&void 0===e.EditBox&&void 0===e.Button&&void 0===e.PushButton&&void 0===e.RadioButton&&void 0===e.CheckBox&&void 0===e.TextField&&void 0===e.PasswordField?(e.ChoiceField=O,e.ListBox=q,e.ComboBox=T,e.EditBox=R,e.Button=D,e.PushButton=U,e.RadioButton=z,e.CheckBox=W,e.TextField=V,e.PasswordField=G,e.AcroForm={Appearance:Y}):console.warn("AcroForm-Classes are not populated into global-namespace, because the class-Names exist already."),t.AcroFormChoiceField=O,t.AcroFormListBox=q,t.AcroFormComboBox=T,t.AcroFormEditBox=R,t.AcroFormButton=D,t.AcroFormPushButton=U,t.AcroFormRadioButton=z,t.AcroFormCheckBox=W,t.AcroFormTextField=V,t.AcroFormPasswordField=G,t.AcroFormAppearance=Y,t.AcroForm={ChoiceField:O,ListBox:q,ComboBox:T,EditBox:R,Button:D,PushButton:U,RadioButton:z,CheckBox:W,TextField:V,PasswordField:G,Appearance:Y}})((window.tmp=lt).API,"undefined"!=typeof window&&window||"undefined"!=typeof global&&global),
/** @license
   * jsPDF addImage plugin
   * Copyright (c) 2012 Jason Siefken, https://github.com/siefkenj/
   *               2013 Chris Dowling, https://github.com/gingerchris
   *               2013 Trinh Ho, https://github.com/ineedfat
   *               2013 Edwin Alejandro Perez, https://github.com/eaparango
   *               2013 Norah Smith, https://github.com/burnburnrocket
   *               2014 Diego Casorran, https://github.com/diegocr
   *               2014 James Robb, https://github.com/jamesbrobb
   *
   * 
   */
function(x){var N="addImage_",l={PNG:[[137,80,78,71]],TIFF:[[77,77,0,42],[73,73,42,0]],JPEG:[[255,216,255,224,void 0,void 0,74,70,73,70,0],[255,216,255,225,void 0,void 0,69,120,105,102,0,0]],JPEG2000:[[0,0,0,12,106,80,32,32]],GIF87a:[[71,73,70,56,55,97]],GIF89a:[[71,73,70,56,57,97]],BMP:[[66,77],[66,65],[67,73],[67,80],[73,67],[80,84]]},h=x.getImageFileTypeByImageData=function(t,e){var n,r;e=e||"UNKNOWN";var i,o,a,s="UNKNOWN";for(a in x.isArrayBufferView(t)&&(t=x.arrayBufferToBinaryString(t)),l)for(i=l[a],n=0;n<i.length;n+=1){for(o=!0,r=0;r<i[n].length;r+=1)if(void 0!==i[n][r]&&i[n][r]!==t.charCodeAt(r)){o=!1;break}if(!0===o){s=a;break}}return"UNKNOWN"===s&&"UNKNOWN"!==e&&(console.warn('FileType of Image not recognized. Processing image as "'+e+'".'),s=e),s},n=function t(e){for(var n=this.internal.newObject(),r=this.internal.write,i=this.internal.putStream,o=(0,this.internal.getFilters)();-1!==o.indexOf("FlateEncode");)o.splice(o.indexOf("FlateEncode"),1);e.n=n;var a=[];if(a.push({key:"Type",value:"/XObject"}),a.push({key:"Subtype",value:"/Image"}),a.push({key:"Width",value:e.w}),a.push({key:"Height",value:e.h}),e.cs===this.color_spaces.INDEXED?a.push({key:"ColorSpace",value:"[/Indexed /DeviceRGB "+(e.pal.length/3-1)+" "+("smask"in e?n+2:n+1)+" 0 R]"}):(a.push({key:"ColorSpace",value:"/"+e.cs}),e.cs===this.color_spaces.DEVICE_CMYK&&a.push({key:"Decode",value:"[1 0 1 0 1 0 1 0]"})),a.push({key:"BitsPerComponent",value:e.bpc}),"dp"in e&&a.push({key:"DecodeParms",value:"<<"+e.dp+">>"}),"trns"in e&&e.trns.constructor==Array){for(var s="",l=0,h=e.trns.length;l<h;l++)s+=e.trns[l]+" "+e.trns[l]+" ";a.push({key:"Mask",value:"["+s+"]"})}"smask"in e&&a.push({key:"SMask",value:n+1+" 0 R"});var u=void 0!==e.f?["/"+e.f]:void 0;if(i({data:e.data,additionalKeyValues:a,alreadyAppliedFilters:u}),r("endobj"),"smask"in e){var c="/Predictor "+e.p+" /Colors 1 /BitsPerComponent "+e.bpc+" /Columns "+e.w,f={w:e.w,h:e.h,cs:"DeviceGray",bpc:e.bpc,dp:c,data:e.smask};"f"in e&&(f.f=e.f),t.call(this,f)}e.cs===this.color_spaces.INDEXED&&(this.internal.newObject(),i({data:this.arrayBufferToBinaryString(new Uint8Array(e.pal))}),r("endobj"))},L=function(){var t=this.internal.collections[N+"images"];for(var e in t)n.call(this,t[e])},A=function(){var t,e=this.internal.collections[N+"images"],n=this.internal.write;for(var r in e)n("/I"+(t=e[r]).i,t.n,"0","R")},S=function(t){return"function"==typeof x["process"+t.toUpperCase()]},_=function(t){return"object"===se(t)&&1===t.nodeType},F=function(t,e){if("IMG"===t.nodeName&&t.hasAttribute("src")){var n=""+t.getAttribute("src");if(0===n.indexOf("data:image/"))return unescape(n);var r=x.loadFile(n);if(void 0!==r)return btoa(r)}if("CANVAS"===t.nodeName){var i=t;return t.toDataURL("image/jpeg",1)}(i=document.createElement("canvas")).width=t.clientWidth||t.width,i.height=t.clientHeight||t.height;var o=i.getContext("2d");if(!o)throw"addImage requires canvas to be supported by browser.";return o.drawImage(t,0,0,i.width,i.height),i.toDataURL("png"==(""+e).toLowerCase()?"image/png":"image/jpeg")},P=function(t,e){var n;if(e)for(var r in e)if(t===e[r].alias){n=e[r];break}return n};x.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPARATION:"Separation",DEVICE_N:"DeviceN"},x.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"},x.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"},x.sHashCode=function(t){var e,n=0;if(0===(t=t||"").length)return n;for(e=0;e<t.length;e++)n=(n<<5)-n+t.charCodeAt(e),n|=0;return n},x.isString=function(t){return"string"==typeof t},x.validateStringAsBase64=function(t){(t=t||"").toString().trim();var e=!0;return 0===t.length&&(e=!1),t.length%4!=0&&(e=!1),!1===/^[A-Za-z0-9+\/]+$/.test(t.substr(0,t.length-2))&&(e=!1),!1===/^[A-Za-z0-9\/][A-Za-z0-9+\/]|[A-Za-z0-9+\/]=|==$/.test(t.substr(-2))&&(e=!1),e},x.extractInfoFromBase64DataURI=function(t){return/^data:([\w]+?\/([\w]+?));\S*;*base64,(.+)$/g.exec(t)},x.extractImageFromDataUrl=function(t){var e=(t=t||"").split("base64,"),n=null;if(2===e.length){var r=/^data:(\w*\/\w*);*(charset=[\w=-]*)*;*$/.exec(e[0]);Array.isArray(r)&&(n={mimeType:r[1],charset:r[2],data:e[1]})}return n},x.supportsArrayBuffer=function(){return"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array},x.isArrayBuffer=function(t){return!!this.supportsArrayBuffer()&&t instanceof ArrayBuffer},x.isArrayBufferView=function(t){return!!this.supportsArrayBuffer()&&("undefined"!=typeof Uint32Array&&(t instanceof Int8Array||t instanceof Uint8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))},x.binaryStringToUint8Array=function(t){for(var e=t.length,n=new Uint8Array(e),r=0;r<e;r++)n[r]=t.charCodeAt(r);return n},x.arrayBufferToBinaryString=function(t){if("function"==typeof atob)return atob(this.arrayBufferToBase64(t))},x.arrayBufferToBase64=function(t){for(var e,n="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=new Uint8Array(t),o=i.byteLength,a=o%3,s=o-a,l=0;l<s;l+=3)n+=r[(16515072&(e=i[l]<<16|i[l+1]<<8|i[l+2]))>>18]+r[(258048&e)>>12]+r[(4032&e)>>6]+r[63&e];return 1==a?n+=r[(252&(e=i[s]))>>2]+r[(3&e)<<4]+"==":2==a&&(n+=r[(64512&(e=i[s]<<8|i[s+1]))>>10]+r[(1008&e)>>4]+r[(15&e)<<2]+"="),n},x.createImageInfo=function(t,e,n,r,i,o,a,s,l,h,u,c,f){var p={alias:s,w:e,h:n,cs:r,bpc:i,i:a,data:t};return o&&(p.f=o),l&&(p.dp=l),h&&(p.trns=h),u&&(p.pal=u),c&&(p.smask=c),f&&(p.p=f),p},x.addImage=function(t,e,n,r,i,o,a,s,l){var h="";if("string"!=typeof e){var u=o;o=i,i=r,r=n,n=e,e=u}if("object"===se(t)&&!_(t)&&"imageData"in t){var c=t;t=c.imageData,e=c.format||e||"UNKNOWN",n=c.x||n||0,r=c.y||r||0,i=c.w||i,o=c.h||o,a=c.alias||a,s=c.compression||s,l=c.rotation||c.angle||l}var f=this.internal.getFilters();if(void 0===s&&-1!==f.indexOf("FlateEncode")&&(s="SLOW"),"string"==typeof t&&(t=unescape(t)),isNaN(n)||isNaN(r))throw console.error("jsPDF.addImage: Invalid coordinates",arguments),new Error("Invalid coordinates passed to jsPDF.addImage");var p,d,g,m,y,v,w,b=function(){var t=this.internal.collections[N+"images"];return t||(this.internal.collections[N+"images"]=t={},this.internal.events.subscribe("putResources",L),this.internal.events.subscribe("putXobjectDict",A)),t}.call(this);if(!((p=P(t,b))||(_(t)&&(t=F(t,e)),(null==(w=a)||0===w.length)&&(a="string"==typeof(v=t)?x.sHashCode(v):x.isArrayBufferView(v)?x.sHashCode(x.arrayBufferToBinaryString(v)):null),p=P(a,b)))){if(this.isString(t)&&(""!==(h=this.convertStringToImageData(t))?t=h:void 0!==(h=x.loadFile(t))&&(t=h)),e=this.getImageFileTypeByImageData(t,e),!S(e))throw new Error("addImage does not support files of type '"+e+"', please ensure that a plugin for '"+e+"' support is added.");if(this.supportsArrayBuffer()&&(t instanceof Uint8Array||(d=t,t=this.binaryStringToUint8Array(t))),!(p=this["process"+e.toUpperCase()](t,(y=0,(m=b)&&(y=Object.keys?Object.keys(m).length:function(t){var e=0;for(var n in t)t.hasOwnProperty(n)&&e++;return e}(m)),y),a,((g=s)&&"string"==typeof g&&(g=g.toUpperCase()),g in x.image_compression?g:x.image_compression.NONE),d)))throw new Error("An unknown error occurred whilst processing the image")}return function(t,e,n,r,i,o,a,s){var l=function(t,e,n){return t||e||(e=t=-96),t<0&&(t=-1*n.w*72/t/this.internal.scaleFactor),e<0&&(e=-1*n.h*72/e/this.internal.scaleFactor),0===t&&(t=e*n.w/n.h),0===e&&(e=t*n.h/n.w),[t,e]}.call(this,n,r,i),h=this.internal.getCoordinateString,u=this.internal.getVerticalCoordinateString;if(n=l[0],r=l[1],a[o]=i,s){s*=Math.PI/180;var c=Math.cos(s),f=Math.sin(s),p=function(t){return t.toFixed(4)},d=[p(c),p(f),p(-1*f),p(c),0,0,"cm"]}this.internal.write("q"),s?(this.internal.write([1,"0","0",1,h(t),u(e+r),"cm"].join(" ")),this.internal.write(d.join(" ")),this.internal.write([h(n),"0","0",h(r),"0","0","cm"].join(" "))):this.internal.write([h(n),"0","0",h(r),h(t),u(e+r),"cm"].join(" ")),this.internal.write("/I"+i.i+" Do"),this.internal.write("Q")}.call(this,n,r,i,o,p,p.i,b,l),this},x.convertStringToImageData=function(t){var e,n="";if(this.isString(t)){var r;e=null!==(r=this.extractImageFromDataUrl(t))?r.data:t;try{n=atob(e)}catch(t){throw x.validateStringAsBase64(e)?new Error("atob-Error in jsPDF.convertStringToImageData "+t.message):new Error("Supplied Data is not a valid base64-String jsPDF.convertStringToImageData ")}}return n};var u=function(t,e){return t.subarray(e,e+5)};x.processJPEG=function(t,e,n,r,i,o){var a,s=this.decode.DCT_DECODE;if(!this.isString(t)&&!this.isArrayBuffer(t)&&!this.isArrayBufferView(t))return null;if(this.isString(t)&&(a=function(t){var e;if("JPEG"!==h(t))throw new Error("getJpegSize requires a binary string jpeg file");for(var n=256*t.charCodeAt(4)+t.charCodeAt(5),r=4,i=t.length;r<i;){if(r+=n,255!==t.charCodeAt(r))throw new Error("getJpegSize could not find the size of the image");if(192===t.charCodeAt(r+1)||193===t.charCodeAt(r+1)||194===t.charCodeAt(r+1)||195===t.charCodeAt(r+1)||196===t.charCodeAt(r+1)||197===t.charCodeAt(r+1)||198===t.charCodeAt(r+1)||199===t.charCodeAt(r+1))return e=256*t.charCodeAt(r+5)+t.charCodeAt(r+6),[256*t.charCodeAt(r+7)+t.charCodeAt(r+8),e,t.charCodeAt(r+9)];r+=2,n=256*t.charCodeAt(r)+t.charCodeAt(r+1)}}(t)),this.isArrayBuffer(t)&&(t=new Uint8Array(t)),this.isArrayBufferView(t)&&(a=function(t){if(65496!=(t[0]<<8|t[1]))throw new Error("Supplied data is not a JPEG");for(var e,n=t.length,r=(t[4]<<8)+t[5],i=4;i<n;){if(r=((e=u(t,i+=r))[2]<<8)+e[3],(192===e[1]||194===e[1])&&255===e[0]&&7<r)return{width:((e=u(t,i+5))[2]<<8)+e[3],height:(e[0]<<8)+e[1],numcomponents:e[4]};i+=2}throw new Error("getJpegSizeFromBytes could not find the size of the image")}(t),t=i||this.arrayBufferToBinaryString(t)),void 0===o)switch(a.numcomponents){case 1:o=this.color_spaces.DEVICE_GRAY;break;case 4:o=this.color_spaces.DEVICE_CMYK;break;default:case 3:o=this.color_spaces.DEVICE_RGB}return this.createImageInfo(t,a.width,a.height,o,8,s,e,n)},x.processJPG=function(){return this.processJPEG.apply(this,arguments)},x.getImageProperties=function(t){var e,n,r="";if(_(t)&&(t=F(t)),this.isString(t)&&(""!==(r=this.convertStringToImageData(t))?t=r:void 0!==(r=x.loadFile(t))&&(t=r)),n=this.getImageFileTypeByImageData(t),!S(n))throw new Error("addImage does not support files of type '"+n+"', please ensure that a plugin for '"+n+"' support is added.");if(this.supportsArrayBuffer()&&(t instanceof Uint8Array||(t=this.binaryStringToUint8Array(t))),!(e=this["process"+n.toUpperCase()](t)))throw new Error("An unknown error occurred whilst processing the image");return{fileType:n,width:e.w,height:e.h,colorSpace:e.cs,compressionMode:e.f,bitsPerComponent:e.bpc}}}(lt.API),
/**
   * @license
   * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
t=lt.API,lt.API.events.push(["addPage",function(t){this.internal.getPageInfo(t.pageNumber).pageContext.annotations=[]}]),t.events.push(["putPage",function(t){for(var e=this.internal.getPageInfoByObjId(t.objId),n=t.pageContext.annotations,r=function(t){if(void 0!==t&&""!=t)return!0},i=!1,o=0;o<n.length&&!i;o++)switch((l=n[o]).type){case"link":if(r(l.options.url)||r(l.options.pageNumber)){i=!0;break}case"reference":case"text":case"freetext":i=!0}if(0!=i){this.internal.write("/Annots ["),this.internal.pageSize.height;var a=this.internal.getCoordinateString,s=this.internal.getVerticalCoordinateString;for(o=0;o<n.length;o++){var l;switch((l=n[o]).type){case"reference":this.internal.write(" "+l.object.objId+" 0 R ");break;case"text":var h=this.internal.newAdditionalObject(),u=this.internal.newAdditionalObject(),c=l.title||"Note";m="<</Type /Annot /Subtype /Text "+(p="/Rect ["+a(l.bounds.x)+" "+s(l.bounds.y+l.bounds.h)+" "+a(l.bounds.x+l.bounds.w)+" "+s(l.bounds.y)+"] ")+"/Contents ("+l.contents+")",m+=" /Popup "+u.objId+" 0 R",m+=" /P "+e.objId+" 0 R",m+=" /T ("+c+") >>",h.content=m;var f=h.objId+" 0 R";m="<</Type /Annot /Subtype /Popup "+(p="/Rect ["+a(l.bounds.x+30)+" "+s(l.bounds.y+l.bounds.h)+" "+a(l.bounds.x+l.bounds.w+30)+" "+s(l.bounds.y)+"] ")+" /Parent "+f,l.open&&(m+=" /Open true"),m+=" >>",u.content=m,this.internal.write(h.objId,"0 R",u.objId,"0 R");break;case"freetext":var p="/Rect ["+a(l.bounds.x)+" "+s(l.bounds.y)+" "+a(l.bounds.x+l.bounds.w)+" "+s(l.bounds.y+l.bounds.h)+"] ",d=l.color||"#000000";m="<</Type /Annot /Subtype /FreeText "+p+"/Contents ("+l.contents+")",m+=" /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#"+d+")",m+=" /Border [0 0 0]",m+=" >>",this.internal.write(m);break;case"link":if(l.options.name){var g=this.annotations._nameMap[l.options.name];l.options.pageNumber=g.page,l.options.top=g.y}else l.options.top||(l.options.top=0);p="/Rect ["+a(l.x)+" "+s(l.y)+" "+a(l.x+l.w)+" "+s(l.y+l.h)+"] ";var m="";if(l.options.url)m="<</Type /Annot /Subtype /Link "+p+"/Border [0 0 0] /A <</S /URI /URI ("+l.options.url+") >>";else if(l.options.pageNumber)switch(m="<</Type /Annot /Subtype /Link "+p+"/Border [0 0 0] /Dest ["+this.internal.getPageInfo(l.options.pageNumber).objId+" 0 R",l.options.magFactor=l.options.magFactor||"XYZ",l.options.magFactor){case"Fit":m+=" /Fit]";break;case"FitH":m+=" /FitH "+l.options.top+"]";break;case"FitV":l.options.left=l.options.left||0,m+=" /FitV "+l.options.left+"]";break;case"XYZ":default:var y=s(l.options.top);l.options.left=l.options.left||0,void 0===l.options.zoom&&(l.options.zoom=0),m+=" /XYZ "+l.options.left+" "+y+" "+l.options.zoom+"]"}""!=m&&(m+=" >>",this.internal.write(m))}}this.internal.write("]")}}]),t.createAnnotation=function(t){var e=this.internal.getCurrentPageInfo();switch(t.type){case"link":this.link(t.bounds.x,t.bounds.y,t.bounds.w,t.bounds.h,t);break;case"text":case"freetext":e.pageContext.annotations.push(t)}},t.link=function(t,e,n,r,i){this.internal.getCurrentPageInfo().pageContext.annotations.push({x:t,y:e,w:n,h:r,options:i,type:"link"})},t.textWithLink=function(t,e,n,r){var i=this.getTextWidth(t),o=this.internal.getLineHeight()/this.internal.scaleFactor;return this.text(t,e,n),n+=.2*o,this.link(e,n-o,i,o,r),i},t.getTextWidth=function(t){var e=this.internal.getFontSize();return this.getStringUnitWidth(t)*e/this.internal.scaleFactor},
/**
   * @license
   * Copyright (c) 2017 Aras Abbasi 
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
function(t){var h={1569:[65152],1570:[65153,65154],1571:[65155,65156],1572:[65157,65158],1573:[65159,65160],1574:[65161,65162,65163,65164],1575:[65165,65166],1576:[65167,65168,65169,65170],1577:[65171,65172],1578:[65173,65174,65175,65176],1579:[65177,65178,65179,65180],1580:[65181,65182,65183,65184],1581:[65185,65186,65187,65188],1582:[65189,65190,65191,65192],1583:[65193,65194],1584:[65195,65196],1585:[65197,65198],1586:[65199,65200],1587:[65201,65202,65203,65204],1588:[65205,65206,65207,65208],1589:[65209,65210,65211,65212],1590:[65213,65214,65215,65216],1591:[65217,65218,65219,65220],1592:[65221,65222,65223,65224],1593:[65225,65226,65227,65228],1594:[65229,65230,65231,65232],1601:[65233,65234,65235,65236],1602:[65237,65238,65239,65240],1603:[65241,65242,65243,65244],1604:[65245,65246,65247,65248],1605:[65249,65250,65251,65252],1606:[65253,65254,65255,65256],1607:[65257,65258,65259,65260],1608:[65261,65262],1609:[65263,65264,64488,64489],1610:[65265,65266,65267,65268],1649:[64336,64337],1655:[64477],1657:[64358,64359,64360,64361],1658:[64350,64351,64352,64353],1659:[64338,64339,64340,64341],1662:[64342,64343,64344,64345],1663:[64354,64355,64356,64357],1664:[64346,64347,64348,64349],1667:[64374,64375,64376,64377],1668:[64370,64371,64372,64373],1670:[64378,64379,64380,64381],1671:[64382,64383,64384,64385],1672:[64392,64393],1676:[64388,64389],1677:[64386,64387],1678:[64390,64391],1681:[64396,64397],1688:[64394,64395],1700:[64362,64363,64364,64365],1702:[64366,64367,64368,64369],1705:[64398,64399,64400,64401],1709:[64467,64468,64469,64470],1711:[64402,64403,64404,64405],1713:[64410,64411,64412,64413],1715:[64406,64407,64408,64409],1722:[64414,64415],1723:[64416,64417,64418,64419],1726:[64426,64427,64428,64429],1728:[64420,64421],1729:[64422,64423,64424,64425],1733:[64480,64481],1734:[64473,64474],1735:[64471,64472],1736:[64475,64476],1737:[64482,64483],1739:[64478,64479],1740:[64508,64509,64510,64511],1744:[64484,64485,64486,64487],1746:[64430,64431],1747:[64432,64433]},a={65247:{65154:65269,65156:65271,65160:65273,65166:65275},65248:{65154:65270,65156:65272,65160:65274,65166:65276},65165:{65247:{65248:{65258:65010}}},1617:{1612:64606,1613:64607,1614:64608,1615:64609,1616:64610}},e={1612:64606,1613:64607,1614:64608,1615:64609,1616:64610},n=[1570,1571,1573,1575];t.__arabicParser__={};var r=t.__arabicParser__.isInArabicSubstitutionA=function(t){return void 0!==h[t.charCodeAt(0)]},u=t.__arabicParser__.isArabicLetter=function(t){return"string"==typeof t&&/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(t)},i=t.__arabicParser__.isArabicEndLetter=function(t){return u(t)&&r(t)&&h[t.charCodeAt(0)].length<=2},o=t.__arabicParser__.isArabicAlfLetter=function(t){return u(t)&&0<=n.indexOf(t.charCodeAt(0))},s=(t.__arabicParser__.arabicLetterHasIsolatedForm=function(t){return u(t)&&r(t)&&1<=h[t.charCodeAt(0)].length},t.__arabicParser__.arabicLetterHasFinalForm=function(t){return u(t)&&r(t)&&2<=h[t.charCodeAt(0)].length}),l=(t.__arabicParser__.arabicLetterHasInitialForm=function(t){return u(t)&&r(t)&&3<=h[t.charCodeAt(0)].length},t.__arabicParser__.arabicLetterHasMedialForm=function(t){return u(t)&&r(t)&&4==h[t.charCodeAt(0)].length}),c=t.__arabicParser__.resolveLigatures=function(t){var e=0,n=a,r=0,i="",o=0;for(e=0;e<t.length;e+=1)void 0!==n[t.charCodeAt(e)]?(o++,"number"==typeof(n=n[t.charCodeAt(e)])&&(r=-1!==(r=f(t.charAt(e),t.charAt(e-o),t.charAt(e+1)))?r:0,i+=String.fromCharCode(n),n=a,o=0),e===t.length-1&&(n=a,i+=t.charAt(e-(o-1)),e-=o-1,o=0)):(n=a,i+=t.charAt(e-o),e-=o,o=0);return i},f=(t.__arabicParser__.isArabicDiacritic=function(t){return void 0!==t&&void 0!==e[t.charCodeAt(0)]},t.__arabicParser__.getCorrectForm=function(t,e,n){return u(t)?!1===r(t)?-1:!s(t)||!u(e)&&!u(n)||!u(n)&&i(e)||i(t)&&!u(e)||i(t)&&o(e)||i(t)&&i(e)?0:l(t)&&u(e)&&!i(e)&&u(n)&&s(n)?3:i(t)||!u(n)?1:2:-1}),p=t.__arabicParser__.processArabic=t.processArabic=function(t){var e=0,n=0,r=0,i="",o="",a="",s=(t=t||"").split("\\s+"),l=[];for(e=0;e<s.length;e+=1){for(l.push(""),n=0;n<s[e].length;n+=1)i=s[e][n],o=s[e][n-1],a=s[e][n+1],u(i)?(r=f(i,o,a),l[e]+=-1!==r?String.fromCharCode(h[i.charCodeAt(0)][r]):i):l[e]+=i;l[e]=c(l[e])}return l.join(" ")};t.events.push(["preProcessText",function(t){var e=t.text,n=(t.x,t.y,t.options||{}),r=(t.mutex,n.lang,[]);if("[object Array]"===Object.prototype.toString.call(e)){var i=0;for(r=[],i=0;i<e.length;i+=1)"[object Array]"===Object.prototype.toString.call(e[i])?r.push([p(e[i][0]),e[i][1],e[i][2]]):r.push([p(e[i])]);t.text=r}else t.text=p(e)}])}(lt.API),lt.API.autoPrint=function(t){var e;switch((t=t||{}).variant=t.variant||"non-conform",t.variant){case"javascript":this.addJS("print({});");break;case"non-conform":default:this.internal.events.subscribe("postPutResources",function(){e=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/S /Named"),this.internal.out("/Type /Action"),this.internal.out("/N /Print"),this.internal.out(">>"),this.internal.out("endobj")}),this.internal.events.subscribe("putCatalog",function(){this.internal.out("/OpenAction "+e+" 0 R")})}return this},
/**
   * @license
   * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
e=lt.API,(n=function(){var e=void 0;Object.defineProperty(this,"pdf",{get:function(){return e},set:function(t){e=t}});var n=150;Object.defineProperty(this,"width",{get:function(){return n},set:function(t){n=isNaN(t)||!1===Number.isInteger(t)||t<0?150:t,this.getContext("2d").pageWrapXEnabled&&(this.getContext("2d").pageWrapX=n+1)}});var r=300;Object.defineProperty(this,"height",{get:function(){return r},set:function(t){r=isNaN(t)||!1===Number.isInteger(t)||t<0?300:t,this.getContext("2d").pageWrapYEnabled&&(this.getContext("2d").pageWrapY=r+1)}});var i=[];Object.defineProperty(this,"childNodes",{get:function(){return i},set:function(t){i=t}});var o={};Object.defineProperty(this,"style",{get:function(){return o},set:function(t){o=t}}),Object.defineProperty(this,"parentNode",{get:function(){return!1}})}).prototype.getContext=function(t,e){var n;if("2d"!==(t=t||"2d"))return null;for(n in e)this.pdf.context2d.hasOwnProperty(n)&&(this.pdf.context2d[n]=e[n]);return(this.pdf.context2d._canvas=this).pdf.context2d},n.prototype.toDataURL=function(){throw new Error("toDataURL is not implemented.")},e.events.push(["initialized",function(){this.canvas=new n,this.canvas.pdf=this}]),
/** 
   * @license
   * ====================================================================
   * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
   *               2013 Eduardo Menezes de Morais, eduardo.morais@usp.br
   *               2013 Lee Driscoll, https://github.com/lsdriscoll
   *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
   *               2014 James Hall, james@parall.ax
   *               2014 Diego Casorran, https://github.com/diegocr
   *
   * 
   * ====================================================================
   */
_=lt.API,F={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},P=1,p=function(t,e,n,r,i){F={x:t,y:e,w:n,h:r,ln:i}},d=function(){return F},k={left:0,top:0,bottom:0},_.setHeaderFunction=function(t){l=t},_.getTextDimensions=function(t,e){var n=this.table_font_size||this.internal.getFontSize(),r=(this.internal.getFont().fontStyle,(e=e||{}).scaleFactor||this.internal.scaleFactor),i=0,o=0,a=0;if("string"==typeof t)0!=(i=this.getStringUnitWidth(t)*n)&&(o=1);else{if("[object Array]"!==Object.prototype.toString.call(t))throw new Error("getTextDimensions expects text-parameter to be of type String or an Array of Strings.");for(var s=0;s<t.length;s++)i<(a=this.getStringUnitWidth(t[s])*n)&&(i=a);0!==i&&(o=t.length)}return{w:i/=r,h:Math.max((o*n*this.getLineHeightFactor()-n*(this.getLineHeightFactor()-1))/r,0)}},_.cellAddPage=function(){var t=this.margins||k;this.addPage(),p(t.left,t.top,void 0,void 0),P+=1},_.cellInitialize=function(){F={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},P=1},_.cell=function(t,e,n,r,i,o,a){var s=d(),l=!1;if(void 0!==s.ln)if(s.ln===o)t=s.x+s.w,e=s.y;else{var h=this.margins||k;s.y+s.h+r+13>=this.internal.pageSize.getHeight()-h.bottom&&(this.cellAddPage(),l=!0,this.printHeaders&&this.tableHeaderRow&&this.printHeaderRow(o,!0)),e=d().y+d().h,l&&(e=23)}if(void 0!==i[0])if(this.printingHeaderRow?this.rect(t,e,n,r,"FD"):this.rect(t,e,n,r),"right"===a){i instanceof Array||(i=[i]);for(var u=0;u<i.length;u++){var c=i[u],f=this.getStringUnitWidth(c)*this.internal.getFontSize()/this.internal.scaleFactor;this.text(c,t+n-f-3,e+this.internal.getLineHeight()*(u+1))}}else this.text(i,t+3,e+this.internal.getLineHeight());return p(t,e,n,r,o),this},_.arrayMax=function(t,e){var n,r,i,o=t[0];for(n=0,r=t.length;n<r;n+=1)i=t[n],e?-1===e(o,i)&&(o=i):o<i&&(o=i);return o},_.table=function(t,e,n,r,i){if(!n)throw"No data for PDF table";var o,a,s,l,h,u,c,f,p,d,g=[],m=[],y={},v={},w=[],b=[],x=!1,N=!0,L=12,A=k;if(A.width=this.internal.pageSize.getWidth(),i&&(!0===i.autoSize&&(x=!0),!1===i.printHeaders&&(N=!1),i.fontSize&&(L=i.fontSize),i.css&&void 0!==i.css["font-size"]&&(L=16*i.css["font-size"]),i.margins&&(A=i.margins)),this.lnMod=0,F={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},P=1,this.printHeaders=N,this.margins=A,this.setFontSize(L),this.table_font_size=L,null==r)g=Object.keys(n[0]);else if(r[0]&&"string"!=typeof r[0])for(a=0,s=r.length;a<s;a+=1)o=r[a],g.push(o.name),m.push(o.prompt),v[o.name]=o.width*(19.049976/25.4);else g=r;if(x)for(d=function(t){return t[o]},a=0,s=g.length;a<s;a+=1){for(y[o=g[a]]=n.map(d),w.push(this.getTextDimensions(m[a]||o,{scaleFactor:1}).w),c=0,l=(u=y[o]).length;c<l;c+=1)h=u[c],w.push(this.getTextDimensions(h,{scaleFactor:1}).w);v[o]=_.arrayMax(w),w=[]}if(N){var S=this.calculateLineHeight(g,v,m.length?m:g);for(a=0,s=g.length;a<s;a+=1)o=g[a],b.push([t,e,v[o],S,String(m.length?m[a]:o)]);this.setTableHeaderRow(b),this.printHeaderRow(1,!1)}for(a=0,s=n.length;a<s;a+=1)for(f=n[a],S=this.calculateLineHeight(g,v,f),c=0,p=g.length;c<p;c+=1)o=g[c],this.cell(t,e,v[o],S,f[o],a+2,o.align);return this.lastCellPos=F,this.table_x=t,this.table_y=e,this},_.calculateLineHeight=function(t,e,n){for(var r,i=0,o=0;o<t.length;o++){n[r=t[o]]=this.splitTextToSize(String(n[r]),e[r]-3);var a=this.internal.getLineHeight()*n[r].length+3;i<a&&(i=a)}return i},_.setTableHeaderRow=function(t){this.tableHeaderRow=t},_.printHeaderRow=function(t,e){if(!this.tableHeaderRow)throw"Property tableHeaderRow does not exist.";var n,r,i,o;if(this.printingHeaderRow=!0,void 0!==l){var a=l(this,P);p(a[0],a[1],a[2],a[3],-1)}this.setFontStyle("bold");var s=[];for(i=0,o=this.tableHeaderRow.length;i<o;i+=1)this.setFillColor(200,200,200),n=this.tableHeaderRow[i],e&&(this.margins.top=13,n[1]=this.margins&&this.margins.top||0,s.push(n)),r=[].concat(n),this.cell.apply(this,r.concat(t));0<s.length&&this.setTableHeaderRow(s),this.setFontStyle("normal"),this.printingHeaderRow=!1},
/**
   * jsPDF Context2D PlugIn Copyright (c) 2014 Steven Spungin (TwelveTone LLC) steven@twelvetone.tv
   *
   * Licensed under the MIT License. http://opensource.org/licenses/mit-license
   */
function(t,e){var l,i,o,h,u,c=function(t){return t=t||{},this.isStrokeTransparent=t.isStrokeTransparent||!1,this.strokeOpacity=t.strokeOpacity||1,this.strokeStyle=t.strokeStyle||"#000000",this.fillStyle=t.fillStyle||"#000000",this.isFillTransparent=t.isFillTransparent||!1,this.fillOpacity=t.fillOpacity||1,this.font=t.font||"10px sans-serif",this.textBaseline=t.textBaseline||"alphabetic",this.textAlign=t.textAlign||"left",this.lineWidth=t.lineWidth||1,this.lineJoin=t.lineJoin||"miter",this.lineCap=t.lineCap||"butt",this.path=t.path||[],this.transform=void 0!==t.transform?t.transform.clone():new M,this.globalCompositeOperation=t.globalCompositeOperation||"normal",this.globalAlpha=t.globalAlpha||1,this.clip_path=t.clip_path||[],this.currentPoint=t.currentPoint||new j,this.miterLimit=t.miterLimit||10,this.lastPoint=t.lastPoint||new j,this.ignoreClearRect="boolean"!=typeof t.ignoreClearRect||t.ignoreClearRect,this};t.events.push(["initialized",function(){this.context2d=new n(this),l=this.internal.f2,this.internal.f3,i=this.internal.getCoordinateString,o=this.internal.getVerticalCoordinateString,h=this.internal.getHorizontalCoordinate,u=this.internal.getVerticalCoordinate}]);var n=function(t){Object.defineProperty(this,"canvas",{get:function(){return{parentNode:!1,style:!1}}}),Object.defineProperty(this,"pdf",{get:function(){return t}});var e=!1;Object.defineProperty(this,"pageWrapXEnabled",{get:function(){return e},set:function(t){e=Boolean(t)}});var n=!1;Object.defineProperty(this,"pageWrapYEnabled",{get:function(){return n},set:function(t){n=Boolean(t)}});var r=0;Object.defineProperty(this,"posX",{get:function(){return r},set:function(t){isNaN(t)||(r=t)}});var i=0;Object.defineProperty(this,"posY",{get:function(){return i},set:function(t){isNaN(t)||(i=t)}});var o=!1;Object.defineProperty(this,"autoPaging",{get:function(){return o},set:function(t){o=Boolean(t)}});var a=0;Object.defineProperty(this,"lastBreak",{get:function(){return a},set:function(t){a=t}});var s=[];Object.defineProperty(this,"pageBreaks",{get:function(){return s},set:function(t){s=t}});var l=new c;Object.defineProperty(this,"ctx",{get:function(){return l},set:function(t){t instanceof c&&(l=t)}}),Object.defineProperty(this,"path",{get:function(){return l.path},set:function(t){l.path=t}});var h=[];Object.defineProperty(this,"ctxStack",{get:function(){return h},set:function(t){h=t}}),Object.defineProperty(this,"fillStyle",{get:function(){return this.ctx.fillStyle},set:function(t){var e;e=f(t),this.ctx.fillStyle=e.style,this.ctx.isFillTransparent=0===e.a,this.ctx.fillOpacity=e.a,this.pdf.setFillColor(e.r,e.g,e.b,{a:e.a}),this.pdf.setTextColor(e.r,e.g,e.b,{a:e.a})}}),Object.defineProperty(this,"strokeStyle",{get:function(){return this.ctx.strokeStyle},set:function(t){var e=f(t);this.ctx.strokeStyle=e.style,this.ctx.isStrokeTransparent=0===e.a,this.ctx.strokeOpacity=e.a,0===e.a?this.pdf.setDrawColor(255,255,255):(e.a,this.pdf.setDrawColor(e.r,e.g,e.b))}}),Object.defineProperty(this,"lineCap",{get:function(){return this.ctx.lineCap},set:function(t){-1!==["butt","round","square"].indexOf(t)&&(this.ctx.lineCap=t,this.pdf.setLineCap(t))}}),Object.defineProperty(this,"lineWidth",{get:function(){return this.ctx.lineWidth},set:function(t){isNaN(t)||(this.ctx.lineWidth=t,this.pdf.setLineWidth(t))}}),Object.defineProperty(this,"lineJoin",{get:function(){return this.ctx.lineJoin},set:function(t){-1!==["bevel","round","miter"].indexOf(t)&&(this.ctx.lineJoin=t,this.pdf.setLineJoin(t))}}),Object.defineProperty(this,"miterLimit",{get:function(){return this.ctx.miterLimit},set:function(t){isNaN(t)||(this.ctx.miterLimit=t,this.pdf.setMiterLimit(t))}}),Object.defineProperty(this,"textBaseline",{get:function(){return this.ctx.textBaseline},set:function(t){this.ctx.textBaseline=t}}),Object.defineProperty(this,"textAlign",{get:function(){return this.ctx.textAlign},set:function(t){-1!==["right","end","center","left","start"].indexOf(t)&&(this.ctx.textAlign=t)}}),Object.defineProperty(this,"font",{get:function(){return this.ctx.font},set:function(t){var e;if(this.ctx.font=t,null!==(e=/^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(t))){var n=e[1],r=(e[2],e[3]),i=e[4],o=e[5],a=e[6];i="px"===o?Math.floor(parseFloat(i)):"em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(i)),this.pdf.setFontSize(i);var s="";("bold"===r||700<=parseInt(r,10)||"bold"===n)&&(s="bold"),"italic"===n&&(s+="italic"),0===s.length&&(s="normal");for(var l="",h=a.toLowerCase().replace(/"|'/g,"").split(/\s*,\s*/),u={arial:"Helvetica",verdana:"Helvetica",helvetica:"Helvetica","sans-serif":"Helvetica",fixed:"Courier",monospace:"Courier",terminal:"Courier",courier:"Courier",times:"Times",cursive:"Times",fantasy:"Times",serif:"Times"},c=0;c<h.length;c++){if(void 0!==this.pdf.internal.getFont(h[c],s,{noFallback:!0,disableWarning:!0})){l=h[c];break}if("bolditalic"===s&&void 0!==this.pdf.internal.getFont(h[c],"bold",{noFallback:!0,disableWarning:!0}))l=h[c],s="bold";else if(void 0!==this.pdf.internal.getFont(h[c],"normal",{noFallback:!0,disableWarning:!0})){l=h[c],s="normal";break}}if(""===l)for(c=0;c<h.length;c++)if(u[h[c]]){l=u[h[c]];break}l=""===l?"Times":l,this.pdf.setFont(l,s)}}}),Object.defineProperty(this,"globalCompositeOperation",{get:function(){return this.ctx.globalCompositeOperation},set:function(t){this.ctx.globalCompositeOperation=t}}),Object.defineProperty(this,"globalAlpha",{get:function(){return this.ctx.globalAlpha},set:function(t){this.ctx.globalAlpha=t}}),Object.defineProperty(this,"ignoreClearRect",{get:function(){return this.ctx.ignoreClearRect},set:function(t){this.ctx.ignoreClearRect=Boolean(t)}})};n.prototype.fill=function(){r.call(this,"fill",!1)},n.prototype.stroke=function(){r.call(this,"stroke",!1)},n.prototype.beginPath=function(){this.path=[{type:"begin"}]},n.prototype.moveTo=function(t,e){if(isNaN(t)||isNaN(e))throw console.error("jsPDF.context2d.moveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.moveTo");var n=this.ctx.transform.applyToPoint(new j(t,e));this.path.push({type:"mt",x:n.x,y:n.y}),this.ctx.lastPoint=new j(t,e)},n.prototype.closePath=function(){var t=new j(0,0),e=0;for(e=this.path.length-1;-1!==e;e--)if("begin"===this.path[e].type&&"object"===se(this.path[e+1])&&"number"==typeof this.path[e+1].x){t=new j(this.path[e+1].x,this.path[e+1].y),this.path.push({type:"lt",x:t.x,y:t.y});break}"object"===se(this.path[e+2])&&"number"==typeof this.path[e+2].x&&this.path.push(JSON.parse(JSON.stringify(this.path[e+2]))),this.path.push({type:"close"}),this.ctx.lastPoint=new j(t.x,t.y)},n.prototype.lineTo=function(t,e){if(isNaN(t)||isNaN(e))throw console.error("jsPDF.context2d.lineTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.lineTo");var n=this.ctx.transform.applyToPoint(new j(t,e));this.path.push({type:"lt",x:n.x,y:n.y}),this.ctx.lastPoint=new j(n.x,n.y)},n.prototype.clip=function(){this.ctx.clip_path=JSON.parse(JSON.stringify(this.path)),r.call(this,null,!0)},n.prototype.quadraticCurveTo=function(t,e,n,r){if(isNaN(n)||isNaN(r)||isNaN(t)||isNaN(e))throw console.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");var i=this.ctx.transform.applyToPoint(new j(n,r)),o=this.ctx.transform.applyToPoint(new j(t,e));this.path.push({type:"qct",x1:o.x,y1:o.y,x:i.x,y:i.y}),this.ctx.lastPoint=new j(i.x,i.y)},n.prototype.bezierCurveTo=function(t,e,n,r,i,o){if(isNaN(i)||isNaN(o)||isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r))throw console.error("jsPDF.context2d.bezierCurveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");var a=this.ctx.transform.applyToPoint(new j(i,o)),s=this.ctx.transform.applyToPoint(new j(t,e)),l=this.ctx.transform.applyToPoint(new j(n,r));this.path.push({type:"bct",x1:s.x,y1:s.y,x2:l.x,y2:l.y,x:a.x,y:a.y}),this.ctx.lastPoint=new j(a.x,a.y)},n.prototype.arc=function(t,e,n,r,i,o){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r)||isNaN(i))throw console.error("jsPDF.context2d.arc: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.arc");if(o=Boolean(o),!this.ctx.transform.isIdentity){var a=this.ctx.transform.applyToPoint(new j(t,e));t=a.x,e=a.y;var s=this.ctx.transform.applyToPoint(new j(0,n)),l=this.ctx.transform.applyToPoint(new j(0,0));n=Math.sqrt(Math.pow(s.x-l.x,2)+Math.pow(s.y-l.y,2))}Math.abs(i-r)>=2*Math.PI&&(r=0,i=2*Math.PI),this.path.push({type:"arc",x:t,y:e,radius:n,startAngle:r,endAngle:i,counterclockwise:o})},n.prototype.arcTo=function(t,e,n,r,i){throw new Error("arcTo not implemented.")},n.prototype.rect=function(t,e,n,r){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r))throw console.error("jsPDF.context2d.rect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.rect");this.moveTo(t,e),this.lineTo(t+n,e),this.lineTo(t+n,e+r),this.lineTo(t,e+r),this.lineTo(t,e),this.lineTo(t+n,e),this.lineTo(t,e)},n.prototype.fillRect=function(t,e,n,r){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r))throw console.error("jsPDF.context2d.fillRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.fillRect");if(!N.call(this)){var i={};"butt"!==this.lineCap&&(i.lineCap=this.lineCap,this.lineCap="butt"),"miter"!==this.lineJoin&&(i.lineJoin=this.lineJoin,this.lineJoin="miter"),this.beginPath(),this.rect(t,e,n,r),this.fill(),i.hasOwnProperty("lineCap")&&(this.lineCap=i.lineCap),i.hasOwnProperty("lineJoin")&&(this.lineJoin=i.lineJoin)}},n.prototype.strokeRect=function(t,e,n,r){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r))throw console.error("jsPDF.context2d.strokeRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");L.call(this)||(this.beginPath(),this.rect(t,e,n,r),this.stroke())},n.prototype.clearRect=function(t,e,n,r){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r))throw console.error("jsPDF.context2d.clearRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.clearRect");this.ignoreClearRect||(this.fillStyle="#ffffff",this.fillRect(t,e,n,r))},n.prototype.save=function(t){t="boolean"!=typeof t||t;for(var e=this.pdf.internal.getCurrentPageInfo().pageNumber,n=0;n<this.pdf.internal.getNumberOfPages();n++)this.pdf.setPage(n+1),this.pdf.internal.out("q");if(this.pdf.setPage(e),t){this.ctx.fontSize=this.pdf.internal.getFontSize();var r=new c(this.ctx);this.ctxStack.push(this.ctx),this.ctx=r}},n.prototype.restore=function(t){t="boolean"!=typeof t||t;for(var e=this.pdf.internal.getCurrentPageInfo().pageNumber,n=0;n<this.pdf.internal.getNumberOfPages();n++)this.pdf.setPage(n+1),this.pdf.internal.out("Q");this.pdf.setPage(e),t&&0!==this.ctxStack.length&&(this.ctx=this.ctxStack.pop(),this.fillStyle=this.ctx.fillStyle,this.strokeStyle=this.ctx.strokeStyle,this.font=this.ctx.font,this.lineCap=this.ctx.lineCap,this.lineWidth=this.ctx.lineWidth,this.lineJoin=this.ctx.lineJoin)},n.prototype.toDataURL=function(){throw new Error("toDataUrl not implemented.")};var f=function(t){var e,n,r,i;if(!0===t.isCanvasGradient&&(t=t.getColor()),!t)return{r:0,g:0,b:0,a:0,style:t};if(/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(t))i=r=n=e=0;else{var o=/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(t);if(null!==o)e=parseInt(o[1]),n=parseInt(o[2]),r=parseInt(o[3]),i=1;else if(null!==(o=/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/.exec(t)))e=parseInt(o[1]),n=parseInt(o[2]),r=parseInt(o[3]),i=parseFloat(o[4]);else{if(i=1,"string"==typeof t&&"#"!==t.charAt(0)){var a=new RGBColor(t);t=a.ok?a.toHex():"#000000"}4===t.length?(e=t.substring(1,2),e+=e,n=t.substring(2,3),n+=n,r=t.substring(3,4),r+=r):(e=t.substring(1,3),n=t.substring(3,5),r=t.substring(5,7)),e=parseInt(e,16),n=parseInt(n,16),r=parseInt(r,16)}}return{r:e,g:n,b:r,a:i,style:t}},N=function(){return this.ctx.isFillTransparent||0==this.globalAlpha},L=function(){return Boolean(this.ctx.isStrokeTransparent||0==this.globalAlpha)};n.prototype.fillText=function(t,e,n,r){if(isNaN(e)||isNaN(n)||"string"!=typeof t)throw console.error("jsPDF.context2d.fillText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.fillText");if(r=isNaN(r)?void 0:r,!N.call(this)){n=a.call(this,n);var i=B(this.ctx.transform.rotation),o=this.ctx.transform.scaleX;s.call(this,{text:t,x:e,y:n,scale:o,angle:i,align:this.textAlign,maxWidth:r})}},n.prototype.strokeText=function(t,e,n,r){if(isNaN(e)||isNaN(n)||"string"!=typeof t)throw console.error("jsPDF.context2d.strokeText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.strokeText");if(!L.call(this)){r=isNaN(r)?void 0:r,n=a.call(this,n);var i=B(this.ctx.transform.rotation),o=this.ctx.transform.scaleX;s.call(this,{text:t,x:e,y:n,scale:o,renderingMode:"stroke",angle:i,align:this.textAlign,maxWidth:r})}},n.prototype.measureText=function(t){if("string"!=typeof t)throw console.error("jsPDF.context2d.measureText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.measureText");var e=this.pdf,n=this.pdf.internal.scaleFactor,r=e.internal.getFontSize(),i=e.getStringUnitWidth(t)*r/e.internal.scaleFactor;return new function(t){var e=(t=t||{}).width||0;return Object.defineProperty(this,"width",{get:function(){return e}}),this}({width:i*=Math.round(96*n/72*1e4)/1e4})},n.prototype.scale=function(t,e){if(isNaN(t)||isNaN(e))throw console.error("jsPDF.context2d.scale: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.scale");var n=new M(t,0,0,e,0,0);this.ctx.transform=this.ctx.transform.multiply(n)},n.prototype.rotate=function(t){if(isNaN(t))throw console.error("jsPDF.context2d.rotate: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.rotate");var e=new M(Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0);this.ctx.transform=this.ctx.transform.multiply(e)},n.prototype.translate=function(t,e){if(isNaN(t)||isNaN(e))throw console.error("jsPDF.context2d.translate: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.translate");var n=new M(1,0,0,1,t,e);this.ctx.transform=this.ctx.transform.multiply(n)},n.prototype.transform=function(t,e,n,r,i,o){if(isNaN(t)||isNaN(e)||isNaN(n)||isNaN(r)||isNaN(i)||isNaN(o))throw console.error("jsPDF.context2d.transform: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.transform");var a=new M(t,e,n,r,i,o);this.ctx.transform=this.ctx.transform.multiply(a)},n.prototype.setTransform=function(t,e,n,r,i,o){t=isNaN(t)?1:t,e=isNaN(e)?0:e,n=isNaN(n)?0:n,r=isNaN(r)?1:r,i=isNaN(i)?0:i,o=isNaN(o)?0:o,this.ctx.transform=new M(t,e,n,r,i,o)},n.prototype.drawImage=function(t,e,n,r,i,o,a,s,l){var h=this.pdf.getImageProperties(t),u=1,c=1,f=1,p=1;void 0!==r&&void 0!==s&&(f=s/r,p=l/i,u=h.width/r*s/r,c=h.height/i*l/i),void 0===o&&(o=e,a=n,n=e=0),void 0!==r&&void 0===s&&(s=r,l=i),void 0===r&&void 0===s&&(s=h.width,l=h.height);var d=this.ctx.transform.decompose(),g=B(d.rotate.shx);d.scale.sx,d.scale.sy;for(var m,y=new M,v=((y=(y=(y=y.multiply(d.translate)).multiply(d.skew)).multiply(d.scale)).applyToPoint(new j(s,l)),y.applyToRectangle(new E(o-e*f,a-n*p,r*u,i*c))),w=F.call(this,v),b=[],x=0;x<w.length;x+=1)-1===b.indexOf(w[x])&&b.push(w[x]);if(b.sort(),this.autoPaging)for(var N=b[0],L=b[b.length-1],A=N;A<L+1;A++){if(this.pdf.setPage(A),0!==this.ctx.clip_path.length){var S=this.path;m=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=P(m,this.posX,-1*this.pdf.internal.pageSize.height*(A-1)+this.posY),k.call(this,"fill",!0),this.path=S}var _=JSON.parse(JSON.stringify(v));_=P([_],this.posX,-1*this.pdf.internal.pageSize.height*(A-1)+this.posY)[0],this.pdf.addImage(t,"jpg",_.x,_.y,_.w,_.h,null,null,g)}else this.pdf.addImage(t,"jpg",v.x,v.y,v.w,v.h,null,null,g)};var F=function(t,e,n){var r=[];switch(e=e||this.pdf.internal.pageSize.width,n=n||this.pdf.internal.pageSize.height,t.type){default:case"mt":case"lt":r.push(Math.floor((t.y+this.posY)/n)+1);break;case"arc":r.push(Math.floor((t.y+this.posY-t.radius)/n)+1),r.push(Math.floor((t.y+this.posY+t.radius)/n)+1);break;case"qct":var i=w(this.ctx.lastPoint.x,this.ctx.lastPoint.y,t.x1,t.y1,t.x,t.y);r.push(Math.floor(i.y/n)+1),r.push(Math.floor((i.y+i.h)/n)+1);break;case"bct":var o=b(this.ctx.lastPoint.x,this.ctx.lastPoint.y,t.x1,t.y1,t.x2,t.y2,t.x,t.y);r.push(Math.floor(o.y/n)+1),r.push(Math.floor((o.y+o.h)/n)+1);break;case"rect":r.push(Math.floor((t.y+this.posY)/n)+1),r.push(Math.floor((t.y+t.h+this.posY)/n)+1)}for(var a=0;a<r.length;a+=1)for(;this.pdf.internal.getNumberOfPages()<r[a];)v.call(this);return r},v=function(){var t=this.fillStyle,e=this.strokeStyle,n=this.font,r=this.lineCap,i=this.lineWidth,o=this.lineJoin;this.pdf.addPage(),this.fillStyle=t,this.strokeStyle=e,this.font=n,this.lineCap=r,this.lineWidth=i,this.lineJoin=o},P=function(t,e,n){for(var r=0;r<t.length;r++)switch(t[r].type){case"bct":t[r].x2+=e,t[r].y2+=n;case"qct":t[r].x1+=e,t[r].y1+=n;case"mt":case"lt":case"arc":default:t[r].x+=e,t[r].y+=n}return t},r=function(t,e){for(var n,r,i=this.fillStyle,o=this.strokeStyle,a=(this.font,this.lineCap),s=this.lineWidth,l=this.lineJoin,h=JSON.parse(JSON.stringify(this.path)),u=JSON.parse(JSON.stringify(this.path)),c=[],f=0;f<u.length;f++)if(void 0!==u[f].x)for(var p=F.call(this,u[f]),d=0;d<p.length;d+=1)-1===c.indexOf(p[d])&&c.push(p[d]);for(f=0;f<c.length;f++)for(;this.pdf.internal.getNumberOfPages()<c[f];)v.call(this);if(c.sort(),this.autoPaging){var g=c[0],m=c[c.length-1];for(f=g;f<m+1;f++){if(this.pdf.setPage(f),this.fillStyle=i,this.strokeStyle=o,this.lineCap=a,this.lineWidth=s,this.lineJoin=l,0!==this.ctx.clip_path.length){var y=this.path;n=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=P(n,this.posX,-1*this.pdf.internal.pageSize.height*(f-1)+this.posY),k.call(this,t,!0),this.path=y}r=JSON.parse(JSON.stringify(h)),this.path=P(r,this.posX,-1*this.pdf.internal.pageSize.height*(f-1)+this.posY),!1!==e&&0!==f||k.call(this,t,e)}}else k.call(this,t,e);this.path=h},k=function(t,e){if(("stroke"!==t||e||!L.call(this))&&("stroke"===t||e||!N.call(this))){var n=[];this.ctx.globalAlpha;this.ctx.fillOpacity<1&&this.ctx.fillOpacity;for(var r,i=this.path,o=0;o<i.length;o++){var a=i[o];switch(a.type){case"begin":n.push({begin:!0});break;case"close":n.push({close:!0});break;case"mt":n.push({start:a,deltas:[],abs:[]});break;case"lt":var s=n.length;if(!isNaN(i[o-1].x)){var l=[a.x-i[o-1].x,a.y-i[o-1].y];if(0<s)for(;0<=s;s--)if(!0!==n[s-1].close&&!0!==n[s-1].begin){n[s-1].deltas.push(l),n[s-1].abs.push(a);break}}break;case"bct":l=[a.x1-i[o-1].x,a.y1-i[o-1].y,a.x2-i[o-1].x,a.y2-i[o-1].y,a.x-i[o-1].x,a.y-i[o-1].y];n[n.length-1].deltas.push(l);break;case"qct":var h=i[o-1].x+2/3*(a.x1-i[o-1].x),u=i[o-1].y+2/3*(a.y1-i[o-1].y),c=a.x+2/3*(a.x1-a.x),f=a.y+2/3*(a.y1-a.y),p=a.x,d=a.y;l=[h-i[o-1].x,u-i[o-1].y,c-i[o-1].x,f-i[o-1].y,p-i[o-1].x,d-i[o-1].y];n[n.length-1].deltas.push(l);break;case"arc":n.push({deltas:[],abs:[],arc:!0}),Array.isArray(n[n.length-1].abs)&&n[n.length-1].abs.push(a)}}r=e?null:"stroke"===t?"stroke":"fill";for(o=0;o<n.length;o++){if(n[o].arc)for(var g=n[o].abs,m=0;m<g.length;m++){var y=g[m];if(void 0!==y.startAngle){var v=B(y.startAngle),w=B(y.endAngle),b=y.x,x=y.y;A.call(this,b,x,y.radius,v,w,y.counterclockwise,r,e)}else I.call(this,y.x,y.y)}if(!n[o].arc&&!0!==n[o].close&&!0!==n[o].begin){b=n[o].start.x,x=n[o].start.y;C.call(this,n[o].deltas,b,x,null,null)}}r&&S.call(this,r),e&&_.call(this)}},a=function(t){var e=this.pdf.internal.getFontSize()/this.pdf.internal.scaleFactor,n=e*(this.pdf.internal.getLineHeightFactor()-1);switch(this.ctx.textBaseline){case"bottom":return t-n;case"top":return t+e-n;case"hanging":return t+e-2*n;case"middle":return t+e/2-n;case"ideographic":return t;case"alphabetic":default:return t}};n.prototype.createLinearGradient=function(){var t=function(){};return t.colorStops=[],t.addColorStop=function(t,e){this.colorStops.push([t,e])},t.getColor=function(){return 0===this.colorStops.length?"#000000":this.colorStops[0][1]},t.isCanvasGradient=!0,t},n.prototype.createPattern=function(){return this.createLinearGradient()},n.prototype.createRadialGradient=function(){return this.createLinearGradient()};var A=function(t,e,n,r,i,o,a,s){this.pdf.internal.scaleFactor;for(var l=y(r),h=y(i),u=g.call(this,n,l,h,o),c=0;c<u.length;c++){var f=u[c];0===c&&p.call(this,f.x1+t,f.y1+e),d.call(this,t,e,f.x2,f.y2,f.x3,f.y3,f.x4,f.y4)}s?_.call(this):S.call(this,a)},S=function(t){switch(t){case"stroke":this.pdf.internal.out("S");break;case"fill":this.pdf.internal.out("f")}},_=function(){this.pdf.clip()},p=function(t,e){this.pdf.internal.out(i(t)+" "+o(e)+" m")},s=function(t){var e;switch(t.align){case"right":case"end":e="right";break;case"center":e="center";break;case"left":case"start":default:e="left"}var n=this.ctx.transform.applyToPoint(new j(t.x,t.y)),r=this.ctx.transform.decompose(),i=new M;i=(i=(i=i.multiply(r.translate)).multiply(r.skew)).multiply(r.scale);for(var o,a=this.pdf.getTextDimensions(t.text),s=this.ctx.transform.applyToRectangle(new E(t.x,t.y,a.w,a.h)),l=i.applyToRectangle(new E(t.x,t.y-a.h,a.w,a.h)),h=F.call(this,l),u=[],c=0;c<h.length;c+=1)-1===u.indexOf(h[c])&&u.push(h[c]);if(u.sort(),!0===this.autoPaging)for(var f=u[0],p=u[u.length-1],d=f;d<p+1;d++){if(this.pdf.setPage(d),0!==this.ctx.clip_path.length){var g=this.path;o=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=P(o,this.posX,-1*this.pdf.internal.pageSize.height*(d-1)+this.posY),k.call(this,"fill",!0),this.path=g}var m=JSON.parse(JSON.stringify(s));if(m=P([m],this.posX,-1*this.pdf.internal.pageSize.height*(d-1)+this.posY)[0],.01<=t.scale){var y=this.pdf.internal.getFontSize();this.pdf.setFontSize(y*t.scale)}this.pdf.text(t.text,m.x,m.y,{angle:t.angle,align:e,renderingMode:t.renderingMode,maxWidth:t.maxWidth}),.01<=t.scale&&this.pdf.setFontSize(y)}else{if(.01<=t.scale){y=this.pdf.internal.getFontSize();this.pdf.setFontSize(y*t.scale)}this.pdf.text(t.text,n.x+this.posX,n.y+this.posY,{angle:t.angle,align:e,renderingMode:t.renderingMode,maxWidth:t.maxWidth}),.01<=t.scale&&this.pdf.setFontSize(y)}},I=function(t,e,n,r){n=n||0,r=r||0,this.pdf.internal.out(i(t+n)+" "+o(e+r)+" l")},C=function(t,e,n){return this.pdf.lines(t,e,n,null,null)},d=function(t,e,n,r,i,o,a,s){this.pdf.internal.out([l(h(n+t)),l(u(r+e)),l(h(i+t)),l(u(o+e)),l(h(a+t)),l(u(s+e)),"c"].join(" "))},g=function(t,e,n,r){var i=2*Math.PI,o=e;(o<i||i<o)&&(o%=i);var a=n;(a<i||i<a)&&(a%=i);for(var s=[],l=Math.PI/2,h=r?-1:1,u=e,c=Math.min(i,Math.abs(a-o));1e-5<c;){var f=u+h*Math.min(c,l);s.push(m.call(this,t,u,f)),c-=Math.abs(f-u),u=f}return s},m=function(t,e,n){var r=(n-e)/2,i=t*Math.cos(r),o=t*Math.sin(r),a=i,s=-o,l=a*a+s*s,h=l+a*i+s*o,u=4/3*(Math.sqrt(2*l*h)-h)/(a*o-s*i),c=a-u*s,f=s+u*a,p=c,d=-f,g=r+e,m=Math.cos(g),y=Math.sin(g);return{x1:t*Math.cos(e),y1:t*Math.sin(e),x2:c*m-f*y,y2:c*y+f*m,x3:p*m-d*y,y3:p*y+d*m,x4:t*Math.cos(n),y4:t*Math.sin(n)}},B=function(t){return 180*t/Math.PI},y=function(t){return t*Math.PI/180},w=function(t,e,n,r,i,o){var a=t+.5*(n-t),s=e+.5*(r-e),l=i+.5*(n-i),h=o+.5*(r-o),u=Math.min(t,i,a,l),c=Math.max(t,i,a,l),f=Math.min(e,o,s,h),p=Math.max(e,o,s,h);return new E(u,f,c-u,p-f)},b=function(t,e,n,r,i,o,a,s){for(var l,h,u,c,f,p,d,g,m,y,v,w,b,x=n-t,N=r-e,L=i-n,A=o-r,S=a-i,_=s-o,F=0;F<41;F++)g=(p=(h=t+(l=F/40)*x)+l*((c=n+l*L)-h))+l*(c+l*(i+l*S-c)-p),m=(d=(u=e+l*N)+l*((f=r+l*A)-u))+l*(f+l*(o+l*_-f)-d),b=0==F?(w=y=g,v=m):(y=Math.min(y,g),v=Math.min(v,m),w=Math.max(w,g),Math.max(b,m));return new E(Math.round(y),Math.round(v),Math.round(w-y),Math.round(b-v))},j=function(t,e){var n=t||0;Object.defineProperty(this,"x",{enumerable:!0,get:function(){return n},set:function(t){isNaN(t)||(n=parseFloat(t))}});var r=e||0;Object.defineProperty(this,"y",{enumerable:!0,get:function(){return r},set:function(t){isNaN(t)||(r=parseFloat(t))}});var i="pt";return Object.defineProperty(this,"type",{enumerable:!0,get:function(){return i},set:function(t){i=t.toString()}}),this},E=function(t,e,n,r){j.call(this,t,e),this.type="rect";var i=n||0;Object.defineProperty(this,"w",{enumerable:!0,get:function(){return i},set:function(t){isNaN(t)||(i=parseFloat(t))}});var o=r||0;return Object.defineProperty(this,"h",{enumerable:!0,get:function(){return o},set:function(t){isNaN(t)||(o=parseFloat(t))}}),this},M=function(t,e,n,r,i,o){var a=[];return Object.defineProperty(this,"sx",{get:function(){return a[0]},set:function(t){a[0]=Math.round(1e5*t)/1e5}}),Object.defineProperty(this,"shy",{get:function(){return a[1]},set:function(t){a[1]=Math.round(1e5*t)/1e5}}),Object.defineProperty(this,"shx",{get:function(){return a[2]},set:function(t){a[2]=Math.round(1e5*t)/1e5}}),Object.defineProperty(this,"sy",{get:function(){return a[3]},set:function(t){a[3]=Math.round(1e5*t)/1e5}}),Object.defineProperty(this,"tx",{get:function(){return a[4]},set:function(t){a[4]=Math.round(1e5*t)/1e5}}),Object.defineProperty(this,"ty",{get:function(){return a[5]},set:function(t){a[5]=Math.round(1e5*t)/1e5}}),Object.defineProperty(this,"rotation",{get:function(){return Math.atan2(this.shx,this.sx)}}),Object.defineProperty(this,"scaleX",{get:function(){return this.decompose().scale.sx}}),Object.defineProperty(this,"scaleY",{get:function(){return this.decompose().scale.sy}}),Object.defineProperty(this,"isIdentity",{get:function(){return 1===this.sx&&(0===this.shy&&(0===this.shx&&(1===this.sy&&(0===this.tx&&0===this.ty))))}}),this.sx=isNaN(t)?1:t,this.shy=isNaN(e)?0:e,this.shx=isNaN(n)?0:n,this.sy=isNaN(r)?1:r,this.tx=isNaN(i)?0:i,this.ty=isNaN(o)?0:o,this};M.prototype.multiply=function(t){var e=t.sx*this.sx+t.shy*this.shx,n=t.sx*this.shy+t.shy*this.sy,r=t.shx*this.sx+t.sy*this.shx,i=t.shx*this.shy+t.sy*this.sy,o=t.tx*this.sx+t.ty*this.shx+this.tx,a=t.tx*this.shy+t.ty*this.sy+this.ty;return new M(e,n,r,i,o,a)},M.prototype.decompose=function(){var t=this.sx,e=this.shy,n=this.shx,r=this.sy,i=this.tx,o=this.ty,a=Math.sqrt(t*t+e*e),s=(t/=a)*n+(e/=a)*r;n-=t*s,r-=e*s;var l=Math.sqrt(n*n+r*r);return s/=l,t*(r/=l)<e*(n/=l)&&(t=-t,e=-e,s=-s,a=-a),{scale:new M(a,0,0,l,0,0),translate:new M(1,0,0,1,i,o),rotate:new M(t,e,-e,t,0,0),skew:new M(1,0,s,1,0,0)}},M.prototype.applyToPoint=function(t){var e=t.x*this.sx+t.y*this.shx+this.tx,n=t.x*this.shy+t.y*this.sy+this.ty;return new j(e,n)},M.prototype.applyToRectangle=function(t){var e=this.applyToPoint(t),n=this.applyToPoint(new j(t.x+t.w,t.y+t.h));return new E(e.x,e.y,n.x-e.x,n.y-e.y)},M.prototype.clone=function(){var t=this.sx,e=this.shy,n=this.shx,r=this.sy,i=this.tx,o=this.ty;return new M(t,e,n,r,i,o)}}(lt.API,"undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")()),
/**
   * jsPDF filters PlugIn
   * Copyright (c) 2014 Aras Abbasi 
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
a=lt.API,o=function(t){var r,e,n,i,o,a,s,l,h,u;for(/[^\x00-\xFF]/.test(t),e=[],n=0,i=(t+=r="\0\0\0\0".slice(t.length%4||4)).length;n<i;n+=4)0!==(o=(t.charCodeAt(n)<<24)+(t.charCodeAt(n+1)<<16)+(t.charCodeAt(n+2)<<8)+t.charCodeAt(n+3))?(a=(o=((o=((o=((o=(o-(u=o%85))/85)-(h=o%85))/85)-(l=o%85))/85)-(s=o%85))/85)%85,e.push(a+33,s+33,l+33,h+33,u+33)):e.push(122);return function(t,e){for(var n=r.length;0<n;n--)t.pop()}(e),String.fromCharCode.apply(String,e)+"~>"},s=function(t){var r,e,n,i,o,a=String,s="length",l="charCodeAt",h="slice",u="replace";for(t[h](-2),t=t[h](0,-2)[u](/\s/g,"")[u]("z","!!!!!"),n=[],i=0,o=(t+=r="uuuuu"[h](t[s]%5||5))[s];i<o;i+=5)e=52200625*(t[l](i)-33)+614125*(t[l](i+1)-33)+7225*(t[l](i+2)-33)+85*(t[l](i+3)-33)+(t[l](i+4)-33),n.push(255&e>>24,255&e>>16,255&e>>8,255&e);return function(t,e){for(var n=r[s];0<n;n--)t.pop()}(n),a.fromCharCode.apply(a,n)},h=function(t){for(var e="",n=0;n<t.length;n+=1)e+=("0"+t.charCodeAt(n).toString(16)).slice(-2);return e+=">"},u=function(t){var e=new RegExp(/^([0-9A-Fa-f]{2})+$/);if(-1!==(t=t.replace(/\s/g,"")).indexOf(">")&&(t=t.substr(0,t.indexOf(">"))),t.length%2&&(t+="0"),!1===e.test(t))return"";for(var n="",r=0;r<t.length;r+=2)n+=String.fromCharCode("0x"+(t[r]+t[r+1]));return n},c=function(t,e){e=Object.assign({predictor:1,colors:1,bitsPerComponent:8,columns:1},e);for(var n,r,i=[],o=t.length;o--;)i[o]=t.charCodeAt(o);return n=a.adler32cs.from(t),(r=new Deflater(6)).append(new Uint8Array(i)),t=r.flush(),(i=new Uint8Array(t.length+6)).set(new Uint8Array([120,156])),i.set(t,2),i.set(new Uint8Array([255&n,n>>8&255,n>>16&255,n>>24&255]),t.length+2),t=String.fromCharCode.apply(null,i)},a.processDataByFilters=function(t,e){var n=0,r=t||"",i=[];for("string"==typeof(e=e||[])&&(e=[e]),n=0;n<e.length;n+=1)switch(e[n]){case"ASCII85Decode":case"/ASCII85Decode":r=s(r),i.push("/ASCII85Encode");break;case"ASCII85Encode":case"/ASCII85Encode":r=o(r),i.push("/ASCII85Decode");break;case"ASCIIHexDecode":case"/ASCIIHexDecode":r=u(r),i.push("/ASCIIHexEncode");break;case"ASCIIHexEncode":case"/ASCIIHexEncode":r=h(r),i.push("/ASCIIHexDecode");break;case"FlateEncode":case"/FlateEncode":r=c(r),i.push("/FlateDecode");break;default:throw'The filter: "'+e[n]+'" is not implemented'}return{data:r,reverseChain:i.reverse().join(" ")}},(
/**
   * jsPDF fileloading PlugIn
   * Copyright (c) 2018 Aras Abbasi (aras.abbasi@gmail.com)
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
r=lt.API).loadFile=function(t,e,n){var r;e=e||!0,n=n||function(){};try{r=function(t,e,n){var r=new XMLHttpRequest,i=[],o=0,a=function(t){var e=t.length,n=String.fromCharCode;for(o=0;o<e;o+=1)i.push(n(255&t.charCodeAt(o)));return i.join("")};if(r.open("GET",t,!e),r.overrideMimeType("text/plain; charset=x-user-defined"),!1===e&&(r.onload=function(){return a(this.responseText)}),r.send(null),200===r.status)return e?a(r.responseText):void 0;console.warn('Unable to load file "'+t+'"')}(t,e)}catch(t){r=void 0}return r},r.loadImageFile=r.loadFile,
/**
   * Copyright (c) 2018 Erik Koopmans
   * Released under the MIT License.
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
i=lt.API,f="undefined"!=typeof window&&window||"undefined"!=typeof global&&global,g=function(t){var e=se(t);return"undefined"===e?"undefined":"string"===e||t instanceof String?"string":"number"===e||t instanceof Number?"number":"function"===e||t instanceof Function?"function":t&&t.constructor===Array?"array":t&&1===t.nodeType?"element":"object"===e?"object":"unknown"},m=function(t,e){var n=document.createElement(t);if(e.className&&(n.className=e.className),e.innerHTML){n.innerHTML=e.innerHTML;for(var r=n.getElementsByTagName("script"),i=r.length;0<i--;null)r[i].parentNode.removeChild(r[i])}for(var o in e.style)n.style[o]=e.style[o];return n},(((y=function t(e){var n=Object.assign(t.convert(Promise.resolve()),JSON.parse(JSON.stringify(t.template))),r=t.convert(Promise.resolve(),n);return r=(r=r.setProgress(1,t,1,[t])).set(e)}).prototype=Object.create(Promise.prototype)).constructor=y).convert=function(t,e){return t.__proto__=e||y.prototype,t},y.template={prop:{src:null,container:null,overlay:null,canvas:null,img:null,pdf:null,pageSize:null,callback:function(){}},progress:{val:0,state:null,n:0,stack:[]},opt:{filename:"file.pdf",margin:[0,0,0,0],enableLinks:!0,x:0,y:0,html2canvas:{},jsPDF:{}}},y.prototype.from=function(t,e){return this.then(function(){switch(e=e||function(t){switch(g(t)){case"string":return"string";case"element":return"canvas"===t.nodeName.toLowerCase?"canvas":"element";default:return"unknown"}}(t)){case"string":return this.set({src:m("div",{innerHTML:t})});case"element":return this.set({src:t});case"canvas":return this.set({canvas:t});case"img":return this.set({img:t});default:return this.error("Unknown source type.")}})},y.prototype.to=function(t){switch(t){case"container":return this.toContainer();case"canvas":return this.toCanvas();case"img":return this.toImg();case"pdf":return this.toPdf();default:return this.error("Invalid target.")}},y.prototype.toContainer=function(){return this.thenList([function(){return this.prop.src||this.error("Cannot duplicate - no source HTML.")},function(){return this.prop.pageSize||this.setPageSize()}]).then(function(){var t={position:"relative",display:"inline-block",width:Math.max(this.prop.src.clientWidth,this.prop.src.scrollWidth,this.prop.src.offsetWidth)+"px",left:0,right:0,top:0,margin:"auto",backgroundColor:"white"},e=function t(e,n){for(var r=3===e.nodeType?document.createTextNode(e.nodeValue):e.cloneNode(!1),i=e.firstChild;i;i=i.nextSibling)!0!==n&&1===i.nodeType&&"SCRIPT"===i.nodeName||r.appendChild(t(i,n));return 1===e.nodeType&&("CANVAS"===e.nodeName?(r.width=e.width,r.height=e.height,r.getContext("2d").drawImage(e,0,0)):"TEXTAREA"!==e.nodeName&&"SELECT"!==e.nodeName||(r.value=e.value),r.addEventListener("load",function(){r.scrollTop=e.scrollTop,r.scrollLeft=e.scrollLeft},!0)),r}(this.prop.src,this.opt.html2canvas.javascriptEnabled);"BODY"===e.tagName&&(t.height=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)+"px"),this.prop.overlay=m("div",{className:"html2pdf__overlay",style:{position:"fixed",overflow:"hidden",zIndex:1e3,left:"-100000px",right:0,bottom:0,top:0}}),this.prop.container=m("div",{className:"html2pdf__container",style:t}),this.prop.container.appendChild(e),this.prop.container.firstChild.appendChild(m("div",{style:{clear:"both",border:"0 none transparent",margin:0,padding:0,height:0}})),this.prop.container.style.float="none",this.prop.overlay.appendChild(this.prop.container),document.body.appendChild(this.prop.overlay),this.prop.container.firstChild.style.position="relative",this.prop.container.height=Math.max(this.prop.container.firstChild.clientHeight,this.prop.container.firstChild.scrollHeight,this.prop.container.firstChild.offsetHeight)+"px"})},y.prototype.toCanvas=function(){var t=[function(){return document.body.contains(this.prop.container)||this.toContainer()}];return this.thenList(t).then(function(){var t=Object.assign({},this.opt.html2canvas);if(delete t.onrendered,this.isHtml2CanvasLoaded())return html2canvas(this.prop.container,t)}).then(function(t){(this.opt.html2canvas.onrendered||function(){})(t),this.prop.canvas=t,document.body.removeChild(this.prop.overlay)})},y.prototype.toContext2d=function(){var t=[function(){return document.body.contains(this.prop.container)||this.toContainer()}];return this.thenList(t).then(function(){var t=this.opt.jsPDF,e=Object.assign({async:!0,allowTaint:!0,backgroundColor:"#ffffff",imageTimeout:15e3,logging:!0,proxy:null,removeContainer:!0,foreignObjectRendering:!1,useCORS:!1},this.opt.html2canvas);if(delete e.onrendered,t.context2d.autoPaging=!0,t.context2d.posX=this.opt.x,t.context2d.posY=this.opt.y,e.windowHeight=e.windowHeight||0,e.windowHeight=0==e.windowHeight?Math.max(this.prop.container.clientHeight,this.prop.container.scrollHeight,this.prop.container.offsetHeight):e.windowHeight,this.isHtml2CanvasLoaded())return html2canvas(this.prop.container,e)}).then(function(t){(this.opt.html2canvas.onrendered||function(){})(t),this.prop.canvas=t,document.body.removeChild(this.prop.overlay)})},y.prototype.toImg=function(){return this.thenList([function(){return this.prop.canvas||this.toCanvas()}]).then(function(){var t=this.prop.canvas.toDataURL("image/"+this.opt.image.type,this.opt.image.quality);this.prop.img=document.createElement("img"),this.prop.img.src=t})},y.prototype.toPdf=function(){return this.thenList([function(){return this.toContext2d()}]).then(function(){this.prop.pdf=this.prop.pdf||this.opt.jsPDF})},y.prototype.output=function(t,e,n){return"img"===(n=n||"pdf").toLowerCase()||"image"===n.toLowerCase()?this.outputImg(t,e):this.outputPdf(t,e)},y.prototype.outputPdf=function(t,e){return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).then(function(){return this.prop.pdf.output(t,e)})},y.prototype.outputImg=function(t,e){return this.thenList([function(){return this.prop.img||this.toImg()}]).then(function(){switch(t){case void 0:case"img":return this.prop.img;case"datauristring":case"dataurlstring":return this.prop.img.src;case"datauri":case"dataurl":return document.location.href=this.prop.img.src;default:throw'Image output type "'+t+'" is not supported.'}})},y.prototype.isHtml2CanvasLoaded=function(){var t=void 0!==f.html2canvas;return t||console.error("html2canvas not loaded."),t},y.prototype.save=function(t){if(this.isHtml2CanvasLoaded())return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).set(t?{filename:t}:null).then(function(){this.prop.pdf.save(this.opt.filename)})},y.prototype.doCallback=function(t){if(this.isHtml2CanvasLoaded())return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).then(function(){this.prop.callback(this.prop.pdf)})},y.prototype.set=function(e){if("object"!==g(e))return this;var t=Object.keys(e||{}).map(function(t){if(t in y.template.prop)return function(){this.prop[t]=e[t]};switch(t){case"margin":return this.setMargin.bind(this,e.margin);case"jsPDF":return function(){return this.opt.jsPDF=e.jsPDF,this.setPageSize()};case"pageSize":return this.setPageSize.bind(this,e.pageSize);default:return function(){this.opt[t]=e[t]}}},this);return this.then(function(){return this.thenList(t)})},y.prototype.get=function(e,n){return this.then(function(){var t=e in y.template.prop?this.prop[e]:this.opt[e];return n?n(t):t})},y.prototype.setMargin=function(t){return this.then(function(){switch(g(t)){case"number":t=[t,t,t,t];case"array":if(2===t.length&&(t=[t[0],t[1],t[0],t[1]]),4===t.length)break;default:return this.error("Invalid margin array.")}this.opt.margin=t}).then(this.setPageSize)},y.prototype.setPageSize=function(t){function e(t,e){return Math.floor(t*e/72*96)}return this.then(function(){(t=t||lt.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner")||(t.inner={width:t.width-this.opt.margin[1]-this.opt.margin[3],height:t.height-this.opt.margin[0]-this.opt.margin[2]},t.inner.px={width:e(t.inner.width,t.k),height:e(t.inner.height,t.k)},t.inner.ratio=t.inner.height/t.inner.width),this.prop.pageSize=t})},y.prototype.setProgress=function(t,e,n,r){return null!=t&&(this.progress.val=t),null!=e&&(this.progress.state=e),null!=n&&(this.progress.n=n),null!=r&&(this.progress.stack=r),this.progress.ratio=this.progress.val/this.progress.state,this},y.prototype.updateProgress=function(t,e,n,r){return this.setProgress(t?this.progress.val+t:null,e||null,n?this.progress.n+n:null,r?this.progress.stack.concat(r):null)},y.prototype.then=function(t,e){var n=this;return this.thenCore(t,e,function(e,t){return n.updateProgress(null,null,1,[e]),Promise.prototype.then.call(this,function(t){return n.updateProgress(null,e),t}).then(e,t).then(function(t){return n.updateProgress(1),t})})},y.prototype.thenCore=function(t,e,n){n=n||Promise.prototype.then;var r=this;t&&(t=t.bind(r)),e&&(e=e.bind(r));var i=-1!==Promise.toString().indexOf("[native code]")&&"Promise"===Promise.name?r:y.convert(Object.assign({},r),Promise.prototype),o=n.call(i,t,e);return y.convert(o,r.__proto__)},y.prototype.thenExternal=function(t,e){return Promise.prototype.then.call(this,t,e)},y.prototype.thenList=function(t){var e=this;return t.forEach(function(t){e=e.thenCore(t)}),e},y.prototype.catch=function(t){t&&(t=t.bind(this));var e=Promise.prototype.catch.call(this,t);return y.convert(e,this)},y.prototype.catchExternal=function(t){return Promise.prototype.catch.call(this,t)},y.prototype.error=function(t){return this.then(function(){throw new Error(t)})},y.prototype.using=y.prototype.set,y.prototype.saveAs=y.prototype.save,y.prototype.export=y.prototype.output,y.prototype.run=y.prototype.then,lt.getPageSize=function(t,e,n){if("object"===se(t)){var r=t;t=r.orientation,e=r.unit||e,n=r.format||n}e=e||"mm",n=n||"a4",t=(""+(t||"P")).toLowerCase();var i=(""+n).toLowerCase(),o={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};switch(e){case"pt":var a=1;break;case"mm":a=72/25.4;break;case"cm":a=72/2.54;break;case"in":a=72;break;case"px":a=.75;break;case"pc":case"em":a=12;break;case"ex":a=6;break;default:throw"Invalid unit: "+e}if(o.hasOwnProperty(i))var s=o[i][1]/a,l=o[i][0]/a;else try{s=n[1],l=n[0]}catch(t){throw new Error("Invalid format: "+n)}if("p"===t||"portrait"===t){if(t="p",s<l){var h=l;l=s,s=h}}else{if("l"!==t&&"landscape"!==t)throw"Invalid orientation: "+t;t="l",l<s&&(h=l,l=s,s=h)}return{width:l,height:s,unit:e,k:a}},i.html=function(t,e){(e=e||{}).callback=e.callback||function(){},e.html2canvas=e.html2canvas||{},e.html2canvas.canvas=e.html2canvas.canvas||this.canvas,e.jsPDF=e.jsPDF||this,e.jsPDF;var n=new y(e);return e.worker?n:n.from(t).doCallback()},lt.API.addJS=function(t){return b=t,this.internal.events.subscribe("postPutResources",function(t){v=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/Names [(EmbeddedJS) "+(v+1)+" 0 R]"),this.internal.out(">>"),this.internal.out("endobj"),w=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/S /JavaScript"),this.internal.out("/JS ("+b+")"),this.internal.out(">>"),this.internal.out("endobj")}),this.internal.events.subscribe("putCatalog",function(){void 0!==v&&void 0!==w&&this.internal.out("/Names <</JavaScript "+v+" 0 R>>")}),this},(
/**
   * @license
   * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
x=lt.API).events.push(["postPutResources",function(){var t=this,e=/^(\d+) 0 obj$/;if(0<this.outline.root.children.length)for(var n=t.outline.render().split(/\r\n/),r=0;r<n.length;r++){var i=n[r],o=e.exec(i);if(null!=o){var a=o[1];t.internal.newObjectDeferredBegin(a,!1)}t.internal.write(i)}if(this.outline.createNamedDestinations){var s=this.internal.pages.length,l=[];for(r=0;r<s;r++){var h=t.internal.newObject();l.push(h);var u=t.internal.getPageInfo(r+1);t.internal.write("<< /D["+u.objId+" 0 R /XYZ null null null]>> endobj")}var c=t.internal.newObject();for(t.internal.write("<< /Names [ "),r=0;r<l.length;r++)t.internal.write("(page_"+(r+1)+")"+l[r]+" 0 R");t.internal.write(" ] >>","endobj"),t.internal.newObject(),t.internal.write("<< /Dests "+c+" 0 R"),t.internal.write(">>","endobj")}}]),x.events.push(["putCatalog",function(){0<this.outline.root.children.length&&(this.internal.write("/Outlines",this.outline.makeRef(this.outline.root)),this.outline.createNamedDestinations&&this.internal.write("/Names "+namesOid+" 0 R"))}]),x.events.push(["initialized",function(){var a=this;a.outline={createNamedDestinations:!1,root:{children:[]}},a.outline.add=function(t,e,n){var r={title:e,options:n,children:[]};return null==t&&(t=this.root),t.children.push(r),r},a.outline.render=function(){return this.ctx={},this.ctx.val="",this.ctx.pdf=a,this.genIds_r(this.root),this.renderRoot(this.root),this.renderItems(this.root),this.ctx.val},a.outline.genIds_r=function(t){t.id=a.internal.newObjectDeferred();for(var e=0;e<t.children.length;e++)this.genIds_r(t.children[e])},a.outline.renderRoot=function(t){this.objStart(t),this.line("/Type /Outlines"),0<t.children.length&&(this.line("/First "+this.makeRef(t.children[0])),this.line("/Last "+this.makeRef(t.children[t.children.length-1]))),this.line("/Count "+this.count_r({count:0},t)),this.objEnd()},a.outline.renderItems=function(t){this.ctx.pdf.internal.getCoordinateString;for(var e=this.ctx.pdf.internal.getVerticalCoordinateString,n=0;n<t.children.length;n++){var r=t.children[n];this.objStart(r),this.line("/Title "+this.makeString(r.title)),this.line("/Parent "+this.makeRef(t)),0<n&&this.line("/Prev "+this.makeRef(t.children[n-1])),n<t.children.length-1&&this.line("/Next "+this.makeRef(t.children[n+1])),0<r.children.length&&(this.line("/First "+this.makeRef(r.children[0])),this.line("/Last "+this.makeRef(r.children[r.children.length-1])));var i=this.count=this.count_r({count:0},r);if(0<i&&this.line("/Count "+i),r.options&&r.options.pageNumber){var o=a.internal.getPageInfo(r.options.pageNumber);this.line("/Dest ["+o.objId+" 0 R /XYZ 0 "+e(0)+" 0]")}this.objEnd()}for(n=0;n<t.children.length;n++)r=t.children[n],this.renderItems(r)},a.outline.line=function(t){this.ctx.val+=t+"\r\n"},a.outline.makeRef=function(t){return t.id+" 0 R"},a.outline.makeString=function(t){return"("+a.internal.pdfEscape(t)+")"},a.outline.objStart=function(t){this.ctx.val+="\r\n"+t.id+" 0 obj\r\n<<\r\n"},a.outline.objEnd=function(t){this.ctx.val+=">> \r\nendobj\r\n"},a.outline.count_r=function(t,e){for(var n=0;n<e.children.length;n++)t.count++,this.count_r(t,e.children[n]);return t.count}}]),
/**
   * @license
   * 
   * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
   *
   * 
   * ====================================================================
   */
I=lt.API,C=function(){var t="function"==typeof Deflater;if(!t)throw new Error("requires deflate.js for compression");return t},B=function(t,e,n,r){var i=5,o=E;switch(r){case I.image_compression.FAST:i=3,o=j;break;case I.image_compression.MEDIUM:i=6,o=M;break;case I.image_compression.SLOW:i=9,o=O}t=A(t,e,n,o);var a=new Uint8Array(N(i)),s=L(t),l=new Deflater(i),h=l.append(t),u=l.flush(),c=a.length+h.length+u.length,f=new Uint8Array(c+4);return f.set(a),f.set(h,a.length),f.set(u,a.length+h.length),f[c++]=s>>>24&255,f[c++]=s>>>16&255,f[c++]=s>>>8&255,f[c++]=255&s,I.arrayBufferToBinaryString(f)},N=function(t,e){var n=Math.LOG2E*Math.log(32768)-8<<4|8,r=n<<8;return r|=Math.min(3,(e-1&255)>>1)<<6,r|=0,[n,255&(r+=31-r%31)]},L=function(t,e){for(var n,r=1,i=0,o=t.length,a=0;0<o;){for(o-=n=e<o?e:o;i+=r+=t[a++],--n;);r%=65521,i%=65521}return(i<<16|r)>>>0},A=function(t,e,n,r){for(var i,o,a,s=t.length/e,l=new Uint8Array(t.length+s),h=T(),u=0;u<s;u++){if(a=u*e,i=t.subarray(a,a+e),r)l.set(r(i,n,o),a+u);else{for(var c=0,f=h.length,p=[];c<f;c++)p[c]=h[c](i,n,o);var d=R(p.concat());l.set(p[d],a+u)}o=i}return l},S=function(t,e,n){var r=Array.apply([],t);return r.unshift(0),r},j=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=1;o<a;o++)r=t[o-e]||0,i[o+1]=t[o]-r+256&255;return i},E=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=2;o<a;o++)r=n&&n[o]||0,i[o+1]=t[o]-r+256&255;return i},M=function(t,e,n){var r,i,o=[],a=0,s=t.length;for(o[0]=3;a<s;a++)r=t[a-e]||0,i=n&&n[a]||0,o[a+1]=t[a]+256-(r+i>>>1)&255;return o},O=function(t,e,n){var r,i,o,a,s=[],l=0,h=t.length;for(s[0]=4;l<h;l++)r=t[l-e]||0,i=n&&n[l]||0,o=n&&n[l-e]||0,a=q(r,i,o),s[l+1]=t[l]-a+256&255;return s},q=function(t,e,n){var r=t+e-n,i=Math.abs(r-t),o=Math.abs(r-e),a=Math.abs(r-n);return i<=o&&i<=a?t:o<=a?e:n},T=function(){return[S,j,E,M,O]},R=function(t){for(var e,n,r,i=0,o=t.length;i<o;)((e=D(t[i].slice(1)))<n||!n)&&(n=e,r=i),i++;return r},D=function(t){for(var e=0,n=t.length,r=0;e<n;)r+=Math.abs(t[e++]);return r},I.processPNG=function(t,e,n,r,i){var o,a,s,l,h,u,c=this.color_spaces.DEVICE_RGB,f=this.decode.FLATE_DECODE,p=8;if(this.isArrayBuffer(t)&&(t=new Uint8Array(t)),this.isArrayBufferView(t)){if("function"!=typeof PNG||"function"!=typeof kt)throw new Error("PNG support requires png.js and zlib.js");if(t=(o=new PNG(t)).imgData,p=o.bits,c=o.colorSpace,l=o.colors,-1!==[4,6].indexOf(o.colorType)){if(8===o.bits)for(var d,g=(_=32==o.pixelBitlength?new Uint32Array(o.decodePixels().buffer):16==o.pixelBitlength?new Uint16Array(o.decodePixels().buffer):new Uint8Array(o.decodePixels().buffer)).length,m=new Uint8Array(g*o.colors),y=new Uint8Array(g),v=o.pixelBitlength-o.bits,w=0,b=0;w<g;w++){for(x=_[w],d=0;d<v;)m[b++]=x>>>d&255,d+=o.bits;y[w]=x>>>d&255}if(16===o.bits){g=(_=new Uint32Array(o.decodePixels().buffer)).length,m=new Uint8Array(g*(32/o.pixelBitlength)*o.colors),y=new Uint8Array(g*(32/o.pixelBitlength));for(var x,N=1<o.colors,L=b=w=0;w<g;)x=_[w++],m[b++]=x>>>0&255,N&&(m[b++]=x>>>16&255,x=_[w++],m[b++]=x>>>0&255),y[L++]=x>>>16&255;p=8}r!==I.image_compression.NONE&&C()?(t=B(m,o.width*o.colors,o.colors,r),u=B(y,o.width,1,r)):(t=m,u=y,f=null)}if(3===o.colorType&&(c=this.color_spaces.INDEXED,h=o.palette,o.transparency.indexed)){var A=o.transparency.indexed,S=0;for(w=0,g=A.length;w<g;++w)S+=A[w];if((S/=255)==g-1&&-1!==A.indexOf(0))s=[A.indexOf(0)];else if(S!==g){var _=o.decodePixels();for(y=new Uint8Array(_.length),w=0,g=_.length;w<g;w++)y[w]=A[_[w]];u=B(y,o.width,1)}}var F=function(t){var e;switch(t){case I.image_compression.FAST:e=11;break;case I.image_compression.MEDIUM:e=13;break;case I.image_compression.SLOW:e=14;break;default:e=12}return e}(r);return a=f===this.decode.FLATE_DECODE?"/Predictor "+F+" /Colors "+l+" /BitsPerComponent "+p+" /Columns "+o.width:"/Colors "+l+" /BitsPerComponent "+p+" /Columns "+o.width,(this.isArrayBuffer(t)||this.isArrayBufferView(t))&&(t=this.arrayBufferToBinaryString(t)),(u&&this.isArrayBuffer(u)||this.isArrayBufferView(u))&&(u=this.arrayBufferToBinaryString(u)),this.createImageInfo(t,o.width,o.height,c,p,f,e,n,a,s,h,u,F)}throw new Error("Unsupported PNG image data, try using JPEG instead.")},(
/**
   * @license
   * Copyright (c) 2017 Aras Abbasi 
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
U=lt.API).processGIF89A=function(t,e,n,r,i){var o=new At(t),a=o.width,s=o.height,l=[];o.decodeAndBlitFrameRGBA(0,l);var h={data:l,width:a,height:s},u=new _t(100).encode(h,100);return U.processJPEG.call(this,u,e,n,r)},U.processGIF87A=U.processGIF89A,(
/**
   * Copyright (c) 2018 Aras Abbasi 
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
z=lt.API).processBMP=function(t,e,n,r,i){var o=new Ft(t,!1),a=o.width,s=o.height,l={data:o.getData(),width:a,height:s},h=new _t(100).encode(l,100);return z.processJPEG.call(this,h,e,n,r)},lt.API.setLanguage=function(t){return void 0===this.internal.languageSettings&&(this.internal.languageSettings={},this.internal.languageSettings.isSubscribed=!1),void 0!=={af:"Afrikaans",sq:"Albanian",ar:"Arabic (Standard)","ar-DZ":"Arabic (Algeria)","ar-BH":"Arabic (Bahrain)","ar-EG":"Arabic (Egypt)","ar-IQ":"Arabic (Iraq)","ar-JO":"Arabic (Jordan)","ar-KW":"Arabic (Kuwait)","ar-LB":"Arabic (Lebanon)","ar-LY":"Arabic (Libya)","ar-MA":"Arabic (Morocco)","ar-OM":"Arabic (Oman)","ar-QA":"Arabic (Qatar)","ar-SA":"Arabic (Saudi Arabia)","ar-SY":"Arabic (Syria)","ar-TN":"Arabic (Tunisia)","ar-AE":"Arabic (U.A.E.)","ar-YE":"Arabic (Yemen)",an:"Aragonese",hy:"Armenian",as:"Assamese",ast:"Asturian",az:"Azerbaijani",eu:"Basque",be:"Belarusian",bn:"Bengali",bs:"Bosnian",br:"Breton",bg:"Bulgarian",my:"Burmese",ca:"Catalan",ch:"Chamorro",ce:"Chechen",zh:"Chinese","zh-HK":"Chinese (Hong Kong)","zh-CN":"Chinese (PRC)","zh-SG":"Chinese (Singapore)","zh-TW":"Chinese (Taiwan)",cv:"Chuvash",co:"Corsican",cr:"Cree",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch (Standard)","nl-BE":"Dutch (Belgian)",en:"English","en-AU":"English (Australia)","en-BZ":"English (Belize)","en-CA":"English (Canada)","en-IE":"English (Ireland)","en-JM":"English (Jamaica)","en-NZ":"English (New Zealand)","en-PH":"English (Philippines)","en-ZA":"English (South Africa)","en-TT":"English (Trinidad & Tobago)","en-GB":"English (United Kingdom)","en-US":"English (United States)","en-ZW":"English (Zimbabwe)",eo:"Esperanto",et:"Estonian",fo:"Faeroese",fj:"Fijian",fi:"Finnish",fr:"French (Standard)","fr-BE":"French (Belgium)","fr-CA":"French (Canada)","fr-FR":"French (France)","fr-LU":"French (Luxembourg)","fr-MC":"French (Monaco)","fr-CH":"French (Switzerland)",fy:"Frisian",fur:"Friulian",gd:"Gaelic (Scots)","gd-IE":"Gaelic (Irish)",gl:"Galacian",ka:"Georgian",de:"German (Standard)","de-AT":"German (Austria)","de-DE":"German (Germany)","de-LI":"German (Liechtenstein)","de-LU":"German (Luxembourg)","de-CH":"German (Switzerland)",el:"Greek",gu:"Gujurati",ht:"Haitian",he:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",id:"Indonesian",iu:"Inuktitut",ga:"Irish",it:"Italian (Standard)","it-CH":"Italian (Switzerland)",ja:"Japanese",kn:"Kannada",ks:"Kashmiri",kk:"Kazakh",km:"Khmer",ky:"Kirghiz",tlh:"Klingon",ko:"Korean","ko-KP":"Korean (North Korea)","ko-KR":"Korean (South Korea)",la:"Latin",lv:"Latvian",lt:"Lithuanian",lb:"Luxembourgish",mk:"FYRO Macedonian",ms:"Malay",ml:"Malayalam",mt:"Maltese",mi:"Maori",mr:"Marathi",mo:"Moldavian",nv:"Navajo",ng:"Ndonga",ne:"Nepali",no:"Norwegian",nb:"Norwegian (Bokmal)",nn:"Norwegian (Nynorsk)",oc:"Occitan",or:"Oriya",om:"Oromo",fa:"Persian","fa-IR":"Persian/Iran",pl:"Polish",pt:"Portuguese","pt-BR":"Portuguese (Brazil)",pa:"Punjabi","pa-IN":"Punjabi (India)","pa-PK":"Punjabi (Pakistan)",qu:"Quechua",rm:"Rhaeto-Romanic",ro:"Romanian","ro-MO":"Romanian (Moldavia)",ru:"Russian","ru-MO":"Russian (Moldavia)",sz:"Sami (Lappish)",sg:"Sango",sa:"Sanskrit",sc:"Sardinian",sd:"Sindhi",si:"Singhalese",sr:"Serbian",sk:"Slovak",sl:"Slovenian",so:"Somani",sb:"Sorbian",es:"Spanish","es-AR":"Spanish (Argentina)","es-BO":"Spanish (Bolivia)","es-CL":"Spanish (Chile)","es-CO":"Spanish (Colombia)","es-CR":"Spanish (Costa Rica)","es-DO":"Spanish (Dominican Republic)","es-EC":"Spanish (Ecuador)","es-SV":"Spanish (El Salvador)","es-GT":"Spanish (Guatemala)","es-HN":"Spanish (Honduras)","es-MX":"Spanish (Mexico)","es-NI":"Spanish (Nicaragua)","es-PA":"Spanish (Panama)","es-PY":"Spanish (Paraguay)","es-PE":"Spanish (Peru)","es-PR":"Spanish (Puerto Rico)","es-ES":"Spanish (Spain)","es-UY":"Spanish (Uruguay)","es-VE":"Spanish (Venezuela)",sx:"Sutu",sw:"Swahili",sv:"Swedish","sv-FI":"Swedish (Finland)","sv-SV":"Swedish (Sweden)",ta:"Tamil",tt:"Tatar",te:"Teluga",th:"Thai",tig:"Tigre",ts:"Tsonga",tn:"Tswana",tr:"Turkish",tk:"Turkmen",uk:"Ukrainian",hsb:"Upper Sorbian",ur:"Urdu",ve:"Venda",vi:"Vietnamese",vo:"Volapuk",wa:"Walloon",cy:"Welsh",xh:"Xhosa",ji:"Yiddish",zu:"Zulu"}[t]&&(this.internal.languageSettings.languageCode=t,!1===this.internal.languageSettings.isSubscribed&&(this.internal.events.subscribe("putCatalog",function(){this.internal.write("/Lang ("+this.internal.languageSettings.languageCode+")")}),this.internal.languageSettings.isSubscribed=!0)),this},
/** @license
   * MIT license.
   * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
   *               2014 Diego Casorran, https://github.com/diegocr
   *
   * 
   * ====================================================================
   */
H=lt.API,W=H.getCharWidthsArray=function(t,e){var n,r,i,o=(e=e||{}).font||this.internal.getFont(),a=e.fontSize||this.internal.getFontSize(),s=e.charSpace||this.internal.getCharSpace(),l=e.widths?e.widths:o.metadata.Unicode.widths,h=l.fof?l.fof:1,u=e.kerning?e.kerning:o.metadata.Unicode.kerning,c=u.fof?u.fof:1,f=0,p=l[0]||h,d=[];for(n=0,r=t.length;n<r;n++)i=t.charCodeAt(n),"function"==typeof o.metadata.widthOfString?d.push((o.metadata.widthOfGlyph(o.metadata.characterToGlyph(i))+s*(1e3/a)||0)/1e3):d.push((l[i]||p)/h+(u[i]&&u[i][f]||0)/c),f=i;return d},V=H.getArraySum=function(t){for(var e=t.length,n=0;e;)n+=t[--e];return n},G=H.getStringUnitWidth=function(t,e){var n=(e=e||{}).fontSize||this.internal.getFontSize(),r=e.font||this.internal.getFont(),i=e.charSpace||this.internal.getCharSpace();return"function"==typeof r.metadata.widthOfString?r.metadata.widthOfString(t,n,i)/n:V(W.apply(this,arguments))},Y=function(t,e,n,r){for(var i=[],o=0,a=t.length,s=0;o!==a&&s+e[o]<n;)s+=e[o],o++;i.push(t.slice(0,o));var l=o;for(s=0;o!==a;)s+e[o]>r&&(i.push(t.slice(l,o)),s=0,l=o),s+=e[o],o++;return l!==o&&i.push(t.slice(l,o)),i},J=function(t,e,n){n||(n={});var r,i,o,a,s,l,h=[],u=[h],c=n.textIndent||0,f=0,p=0,d=t.split(" "),g=W.apply(this,[" ",n])[0];if(l=-1===n.lineIndent?d[0].length+2:n.lineIndent||0){var m=Array(l).join(" "),y=[];d.map(function(t){1<(t=t.split(/\s*\n/)).length?y=y.concat(t.map(function(t,e){return(e&&t.length?"\n":"")+t})):y.push(t[0])}),d=y,l=G.apply(this,[m,n])}for(o=0,a=d.length;o<a;o++){var v=0;if(r=d[o],l&&"\n"==r[0]&&(r=r.substr(1),v=1),i=W.apply(this,[r,n]),e<c+f+(p=V(i))||v){if(e<p){for(s=Y.apply(this,[r,i,e-(c+f),e]),h.push(s.shift()),h=[s.pop()];s.length;)u.push([s.shift()]);p=V(i.slice(r.length-(h[0]?h[0].length:0)))}else h=[r];u.push(h),c=p+l,f=g}else h.push(r),c+=f+p,f=g}if(l)var w=function(t,e){return(e?m:"")+t.join(" ")};else w=function(t){return t.join(" ")};return u.map(w)},H.splitTextToSize=function(t,e,n){var r,i=(n=n||{}).fontSize||this.internal.getFontSize(),o=function(t){var e={0:1},n={};if(t.widths&&t.kerning)return{widths:t.widths,kerning:t.kerning};var r=this.internal.getFont(t.fontName,t.fontStyle),i="Unicode";return r.metadata[i]?{widths:r.metadata[i].widths||e,kerning:r.metadata[i].kerning||n}:{font:r.metadata,fontSize:this.internal.getFontSize(),charSpace:this.internal.getCharSpace()}}.call(this,n);r=Array.isArray(t)?t:t.split(/\r?\n/);var a=1*this.internal.scaleFactor*e/i;o.textIndent=n.textIndent?1*n.textIndent*this.internal.scaleFactor/i:0,o.lineIndent=n.lineIndent;var s,l,h=[];for(s=0,l=r.length;s<l;s++)h=h.concat(J.apply(this,[r[s],a,o]));return h},
/** @license
   jsPDF standard_fonts_metrics plugin
   * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
   * MIT license.
   * 
   * ====================================================================
   */
X=lt.API,Z={codePages:["WinAnsiEncoding"],WinAnsiEncoding:(K=function(t){for(var e="klmnopqrstuvwxyz",n={},r=0;r<e.length;r++)n[e[r]]="0123456789abcdef"[r];var i,o,a,s,l,h={},u=1,c=h,f=[],p="",d="",g=t.length-1;for(r=1;r!=g;)l=t[r],r+=1,"'"==l?o=o?(s=o.join(""),i):[]:o?o.push(l):"{"==l?(f.push([c,s]),c={},s=i):"}"==l?((a=f.pop())[0][a[1]]=c,s=i,c=a[0]):"-"==l?u=-1:s===i?n.hasOwnProperty(l)?(p+=n[l],s=parseInt(p,16)*u,u=1,p=""):p+=l:n.hasOwnProperty(l)?(d+=n[l],c[s]=parseInt(d,16)*u,u=1,s=i,d=""):d+=l;return h})("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},Q={Unicode:{Courier:Z,"Courier-Bold":Z,"Courier-BoldOblique":Z,"Courier-Oblique":Z,Helvetica:Z,"Helvetica-Bold":Z,"Helvetica-BoldOblique":Z,"Helvetica-Oblique":Z,"Times-Roman":Z,"Times-Bold":Z,"Times-BoldItalic":Z,"Times-Italic":Z}},$={Unicode:{"Courier-Oblique":K("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":K("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":K("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:K("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":K("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":K("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Symbol:K("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"),Helvetica:K("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":K("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),ZapfDingbats:K("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-Bold":K("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":K("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":K("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":K("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}},X.events.push(["addFont",function(t){var e,n,r,i=t.font,o="Unicode";(e=$[o][i.postScriptName])&&((n=i.metadata[o]?i.metadata[o]:i.metadata[o]={}).widths=e.widths,n.kerning=e.kerning),(r=Q[o][i.postScriptName])&&((n=i.metadata[o]?i.metadata[o]:i.metadata[o]={}).encoding=r).codePages&&r.codePages.length&&(i.encoding=r.codePages[0])}]),
/**
   * @license
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   */
tt=lt,"undefined"!=typeof self&&self||"undefined"!=typeof global&&global||"undefined"!=typeof window&&window||Function("return this")(),tt.API.events.push(["addFont",function(t){var e=t.font,n=t.instance;if(void 0!==n&&n.existsFileInVFS(e.postScriptName)){var r=n.getFileFromVFS(e.postScriptName);if("string"!=typeof r)throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('"+e.postScriptName+"').");e.metadata=tt.API.TTFFont.open(e.postScriptName,e.fontName,r,e.encoding),e.metadata.Unicode=e.metadata.Unicode||{encoding:{},kerning:{},widths:[]},e.metadata.glyIdsUsed=[0]}else if(!1===e.isStandardFont)throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('"+e.postScriptName+"').")}]),(
/** @license
   * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
   * 
   * 
   * ====================================================================
   */
et=lt.API).addSvg=function(t,e,n,r,i){if(void 0===e||void 0===n)throw new Error("addSVG needs values for 'x' and 'y'");function o(t){for(var e=parseFloat(t[1]),n=parseFloat(t[2]),r=[],i=3,o=t.length;i<o;)"c"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2]),parseFloat(t[i+3]),parseFloat(t[i+4]),parseFloat(t[i+5]),parseFloat(t[i+6])]),i+=7):"l"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2])]),i+=3):i+=1;return[e,n,r]}var a,s,l,h,u,c,f,p,d=(h=document,p=h.createElement("iframe"),u=".jsPDF_sillysvg_iframe {display:none;position:absolute;}",(f=(c=h).createElement("style")).type="text/css",f.styleSheet?f.styleSheet.cssText=u:f.appendChild(c.createTextNode(u)),c.getElementsByTagName("head")[0].appendChild(f),p.name="childframe",p.setAttribute("width",0),p.setAttribute("height",0),p.setAttribute("frameborder","0"),p.setAttribute("scrolling","no"),p.setAttribute("seamless","seamless"),p.setAttribute("class","jsPDF_sillysvg_iframe"),h.body.appendChild(p),p),g=(a=t,(l=((s=d).contentWindow||s.contentDocument).document).write(a),l.close(),l.getElementsByTagName("svg")[0]),m=[1,1],y=parseFloat(g.getAttribute("width")),v=parseFloat(g.getAttribute("height"));y&&v&&(r&&i?m=[r/y,i/v]:r?m=[r/y,r/y]:i&&(m=[i/v,i/v]));var w,b,x,N,L=g.childNodes;for(w=0,b=L.length;w<b;w++)(x=L[w]).tagName&&"PATH"===x.tagName.toUpperCase()&&((N=o(x.getAttribute("d").split(" ")))[0]=N[0]*m[0]+e,N[1]=N[1]*m[1]+n,this.lines.call(this,N[2],N[0],N[1],m));return this},et.addSVG=et.addSvg,et.addSvgAsImage=function(t,e,n,r,i,o,a,s){if(isNaN(e)||isNaN(n))throw console.error("jsPDF.addSvgAsImage: Invalid coordinates",arguments),new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");if(isNaN(r)||isNaN(i))throw console.error("jsPDF.addSvgAsImage: Invalid measurements",arguments),new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");var l=document.createElement("canvas");l.width=r,l.height=i;var h=l.getContext("2d");return h.fillStyle="#fff",h.fillRect(0,0,l.width,l.height),canvg(l,t,{ignoreMouse:!0,ignoreAnimation:!0,ignoreDimensions:!0,ignoreClear:!0}),this.addImage(l.toDataURL("image/jpeg",1),e,n,r,i,a,s),this},lt.API.putTotalPages=function(t){var e,n=0;n=parseInt(this.internal.getFont().id.substr(1),10)<15?(e=new RegExp(t,"g"),this.internal.getNumberOfPages()):(e=new RegExp(this.pdfEscape16(t,this.internal.getFont()),"g"),this.pdfEscape16(this.internal.getNumberOfPages()+"",this.internal.getFont()));for(var r=1;r<=this.internal.getNumberOfPages();r++)for(var i=0;i<this.internal.pages[r].length;i++)this.internal.pages[r][i]=this.internal.pages[r][i].replace(e,n);return this},lt.API.viewerPreferences=function(t,e){var n;t=t||{},e=e||!1;var r,i,o={HideToolbar:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},HideMenubar:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},HideWindowUI:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},FitWindow:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},CenterWindow:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},DisplayDocTitle:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.4},NonFullScreenPageMode:{defaultValue:"UseNone",value:"UseNone",type:"name",explicitSet:!1,valueSet:["UseNone","UseOutlines","UseThumbs","UseOC"],pdfVersion:1.3},Direction:{defaultValue:"L2R",value:"L2R",type:"name",explicitSet:!1,valueSet:["L2R","R2L"],pdfVersion:1.3},ViewArea:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},ViewClip:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintArea:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintClip:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintScaling:{defaultValue:"AppDefault",value:"AppDefault",type:"name",explicitSet:!1,valueSet:["AppDefault","None"],pdfVersion:1.6},Duplex:{defaultValue:"",value:"none",type:"name",explicitSet:!1,valueSet:["Simplex","DuplexFlipShortEdge","DuplexFlipLongEdge","none"],pdfVersion:1.7},PickTrayByPDFSize:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.7},PrintPageRange:{defaultValue:"",value:"",type:"array",explicitSet:!1,valueSet:null,pdfVersion:1.7},NumCopies:{defaultValue:1,value:1,type:"integer",explicitSet:!1,valueSet:null,pdfVersion:1.7}},a=Object.keys(o),s=[],l=0,h=0,u=0,c=!0;function f(t,e){var n,r=!1;for(n=0;n<t.length;n+=1)t[n]===e&&(r=!0);return r}if(void 0===this.internal.viewerpreferences&&(this.internal.viewerpreferences={},this.internal.viewerpreferences.configuration=JSON.parse(JSON.stringify(o)),this.internal.viewerpreferences.isSubscribed=!1),n=this.internal.viewerpreferences.configuration,"reset"===t||!0===e){var p=a.length;for(u=0;u<p;u+=1)n[a[u]].value=n[a[u]].defaultValue,n[a[u]].explicitSet=!1}if("object"===se(t))for(r in t)if(i=t[r],f(a,r)&&void 0!==i){if("boolean"===n[r].type&&"boolean"==typeof i)n[r].value=i;else if("name"===n[r].type&&f(n[r].valueSet,i))n[r].value=i;else if("integer"===n[r].type&&Number.isInteger(i))n[r].value=i;else if("array"===n[r].type){for(l=0;l<i.length;l+=1)if(c=!0,1===i[l].length&&"number"==typeof i[l][0])s.push(String(i[l]-1));else if(1<i[l].length){for(h=0;h<i[l].length;h+=1)"number"!=typeof i[l][h]&&(c=!1);!0===c&&s.push([i[l][0]-1,i[l][1]-1].join(" "))}n[r].value="["+s.join(" ")+"]"}else n[r].value=n[r].defaultValue;n[r].explicitSet=!0}return!1===this.internal.viewerpreferences.isSubscribed&&(this.internal.events.subscribe("putCatalog",function(){var t,e=[];for(t in n)!0===n[t].explicitSet&&("name"===n[t].type?e.push("/"+t+" /"+n[t].value):e.push("/"+t+" "+n[t].value));0!==e.length&&this.internal.write("/ViewerPreferences\n<<\n"+e.join("\n")+"\n>>")}),this.internal.viewerpreferences.isSubscribed=!0),this.internal.viewerpreferences.configuration=n,this},
/** ==================================================================== 
   * jsPDF XMP metadata plugin
   * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
   * 
   * 
   * ====================================================================
   */
nt=lt.API,ot=it=rt="",nt.addMetadata=function(t,e){return it=e||"http://jspdf.default.namespaceuri/",rt=t,this.internal.events.subscribe("postPutResources",function(){if(rt){var t='<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="'+it+'"><jspdf:metadata>',e=unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')),n=unescape(encodeURIComponent(t)),r=unescape(encodeURIComponent(rt)),i=unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")),o=unescape(encodeURIComponent("</x:xmpmeta>")),a=n.length+r.length+i.length+e.length+o.length;ot=this.internal.newObject(),this.internal.write("<< /Type /Metadata /Subtype /XML /Length "+a+" >>"),this.internal.write("stream"),this.internal.write(e+n+r+i+o),this.internal.write("endstream"),this.internal.write("endobj")}else ot=""}),this.internal.events.subscribe("putCatalog",function(){ot&&this.internal.write("/Metadata "+ot+" 0 R")}),this},function(f,t){var e=f.API;var m=e.pdfEscape16=function(t,e){for(var n,r=e.metadata.Unicode.widths,i=["","0","00","000","0000"],o=[""],a=0,s=t.length;a<s;++a){if(n=e.metadata.characterToGlyph(t.charCodeAt(a)),e.metadata.glyIdsUsed.push(n),e.metadata.toUnicode[n]=t.charCodeAt(a),-1==r.indexOf(n)&&(r.push(n),r.push([parseInt(e.metadata.widthOfGlyph(n),10)])),"0"==n)return o.join("");n=n.toString(16),o.push(i[4-n.length],n)}return o.join("")},p=function(t){var e,n,r,i,o,a,s;for(o="/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange",r=[],a=0,s=(n=Object.keys(t).sort(function(t,e){return t-e})).length;a<s;a++)e=n[a],100<=r.length&&(o+="\n"+r.length+" beginbfchar\n"+r.join("\n")+"\nendbfchar",r=[]),i=("0000"+t[e].toString(16)).slice(-4),e=("0000"+(+e).toString(16)).slice(-4),r.push("<"+e+"><"+i+">");return r.length&&(o+="\n"+r.length+" beginbfchar\n"+r.join("\n")+"\nendbfchar\n"),o+="endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend"};e.events.push(["putFont",function(t){!function(t,e,n,r){if(t.metadata instanceof f.API.TTFFont&&"Identity-H"===t.encoding){for(var i=t.metadata.Unicode.widths,o=t.metadata.subset.encode(t.metadata.glyIdsUsed,1),a="",s=0;s<o.length;s++)a+=String.fromCharCode(o[s]);var l=n();r({data:a,addLength1:!0}),e("endobj");var h=n();r({data:p(t.metadata.toUnicode),addLength1:!0}),e("endobj");var u=n();e("<<"),e("/Type /FontDescriptor"),e("/FontName /"+t.fontName),e("/FontFile2 "+l+" 0 R"),e("/FontBBox "+f.API.PDFObject.convert(t.metadata.bbox)),e("/Flags "+t.metadata.flags),e("/StemV "+t.metadata.stemV),e("/ItalicAngle "+t.metadata.italicAngle),e("/Ascent "+t.metadata.ascender),e("/Descent "+t.metadata.decender),e("/CapHeight "+t.metadata.capHeight),e(">>"),e("endobj");var c=n();e("<<"),e("/Type /Font"),e("/BaseFont /"+t.fontName),e("/FontDescriptor "+u+" 0 R"),e("/W "+f.API.PDFObject.convert(i)),e("/CIDToGIDMap /Identity"),e("/DW 1000"),e("/Subtype /CIDFontType2"),e("/CIDSystemInfo"),e("<<"),e("/Supplement 0"),e("/Registry (Adobe)"),e("/Ordering ("+t.encoding+")"),e(">>"),e(">>"),e("endobj"),t.objectNumber=n(),e("<<"),e("/Type /Font"),e("/Subtype /Type0"),e("/ToUnicode "+h+" 0 R"),e("/BaseFont /"+t.fontName),e("/Encoding /"+t.encoding),e("/DescendantFonts ["+c+" 0 R]"),e(">>"),e("endobj"),t.isAlreadyPutted=!0}}(t.font,t.out,t.newObject,t.putStream)}]);e.events.push(["putFont",function(t){!function(t,e,n,r){if(t.metadata instanceof f.API.TTFFont&&"WinAnsiEncoding"===t.encoding){t.metadata.Unicode.widths;for(var i=t.metadata.rawData,o="",a=0;a<i.length;a++)o+=String.fromCharCode(i[a]);var s=n();r({data:o,addLength1:!0}),e("endobj");var l=n();r({data:p(t.metadata.toUnicode),addLength1:!0}),e("endobj");var h=n();for(e("<<"),e("/Descent "+t.metadata.decender),e("/CapHeight "+t.metadata.capHeight),e("/StemV "+t.metadata.stemV),e("/Type /FontDescriptor"),e("/FontFile2 "+s+" 0 R"),e("/Flags 96"),e("/FontBBox "+f.API.PDFObject.convert(t.metadata.bbox)),e("/FontName /"+t.fontName),e("/ItalicAngle "+t.metadata.italicAngle),e("/Ascent "+t.metadata.ascender),e(">>"),e("endobj"),t.objectNumber=n(),a=0;a<t.metadata.hmtx.widths.length;a++)t.metadata.hmtx.widths[a]=parseInt(t.metadata.hmtx.widths[a]*(1e3/t.metadata.head.unitsPerEm));e("<</Subtype/TrueType/Type/Font/ToUnicode "+l+" 0 R/BaseFont/"+t.fontName+"/FontDescriptor "+h+" 0 R/Encoding/"+t.encoding+" /FirstChar 29 /LastChar 255 /Widths "+f.API.PDFObject.convert(t.metadata.hmtx.widths)+">>"),e("endobj"),t.isAlreadyPutted=!0}}(t.font,t.out,t.newObject,t.putStream)}]);var h=function(t){var e,n,r=t.text||"",i=t.x,o=t.y,a=t.options||{},s=t.mutex||{},l=s.pdfEscape,h=s.activeFontKey,u=s.fonts,c=(s.activeFontSize,""),f=0,p="",d=u[n=h].encoding;if("Identity-H"!==u[n].encoding)return{text:r,x:i,y:o,options:a,mutex:s};for(p=r,n=h,"[object Array]"===Object.prototype.toString.call(r)&&(p=r[0]),f=0;f<p.length;f+=1)u[n].metadata.hasOwnProperty("cmap")&&(e=u[n].metadata.cmap.unicode.codeMap[p[f].charCodeAt(0)]),e?c+=p[f]:p[f].charCodeAt(0)<256&&u[n].metadata.hasOwnProperty("Unicode")?c+=p[f]:c+="";var g="";return parseInt(n.slice(1))<14||"WinAnsiEncoding"===d?g=function(t){for(var e="",n=0;n<t.length;n++)e+=""+t.charCodeAt(n).toString(16);return e}(l(c,n)):"Identity-H"===d&&(g=m(c,u[n])),s.isHex=!0,{text:g,x:i,y:o,options:a,mutex:s}};e.events.push(["postProcessText",function(t){var e=t.text||"",n=t.x,r=t.y,i=t.options,o=t.mutex,a=(i.lang,[]),s={text:e,x:n,y:r,options:i,mutex:o};if("[object Array]"===Object.prototype.toString.call(e)){var l=0;for(l=0;l<e.length;l+=1)"[object Array]"===Object.prototype.toString.call(e[l])&&3===e[l].length?a.push([h(Object.assign({},s,{text:e[l][0]})).text,e[l][1],e[l][2]]):a.push(h(Object.assign({},s,{text:e[l]})).text);t.text=a}else t.text=h(Object.assign({},s,{text:e})).text}])}(lt,"undefined"!=typeof self&&self||"undefined"!=typeof global&&global||"undefined"!=typeof window&&window||Function("return this")()),at=lt.API,st=function(t){return void 0!==t&&(void 0===t.vFS&&(t.vFS={}),!0)},at.existsFileInVFS=function(t){return!!st(this.internal)&&void 0!==this.internal.vFS[t]},at.addFileToVFS=function(t,e){return st(this.internal),this.internal.vFS[t]=e,this},at.getFileFromVFS=function(t){return st(this.internal),void 0!==this.internal.vFS[t]?this.internal.vFS[t]:null},lt.API.addHTML=function(t,d,g,s,m){if("undefined"==typeof html2canvas&&"undefined"==typeof rasterizeHTML)throw new Error("You need either https://github.com/niklasvh/html2canvas or https://github.com/cburgmer/rasterizeHTML.js");"number"!=typeof d&&(s=d,m=g),"function"==typeof s&&(m=s,s=null),"function"!=typeof m&&(m=function(){});var e=this.internal,y=e.scaleFactor,v=e.pageSize.getWidth(),w=e.pageSize.getHeight();if((s=s||{}).onrendered=function(l){d=parseInt(d)||0,g=parseInt(g)||0;var t=s.dim||{},h=Object.assign({top:0,right:0,bottom:0,left:0,useFor:"content"},s.margin),e=t.h||Math.min(w,l.height/y),u=t.w||Math.min(v,l.width/y)-d,c=s.format||"JPEG",f=s.imageCompression||"SLOW";if(l.height>w-h.top-h.bottom&&s.pagesplit){var p=function(t,e,n,r,i){var o=document.createElement("canvas");o.height=i,o.width=r;var a=o.getContext("2d");return a.mozImageSmoothingEnabled=!1,a.webkitImageSmoothingEnabled=!1,a.msImageSmoothingEnabled=!1,a.imageSmoothingEnabled=!1,a.fillStyle=s.backgroundColor||"#ffffff",a.fillRect(0,0,r,i),a.drawImage(t,e,n,r,i,0,0,r,i),o},n=function(){for(var t,e,n=0,r=0,i={},o=!1;;){var a;if(r=0,i.top=0!==n?h.top:g,i.left=0!==n?h.left:d,o=(v-h.left-h.right)*y<l.width,"content"===h.useFor?0===n?(t=Math.min((v-h.left)*y,l.width),e=Math.min((w-h.top)*y,l.height-n)):(t=Math.min(v*y,l.width),e=Math.min(w*y,l.height-n),i.top=0):(t=Math.min((v-h.left-h.right)*y,l.width),e=Math.min((w-h.bottom-h.top)*y,l.height-n)),o)for(;;){"content"===h.useFor&&(0===r?t=Math.min((v-h.left)*y,l.width):(t=Math.min(v*y,l.width-r),i.left=0));var s=[a=p(l,r,n,t,e),i.left,i.top,a.width/y,a.height/y,c,null,f];if(this.addImage.apply(this,s),(r+=t)>=l.width)break;this.addPage()}else s=[a=p(l,0,n,t,e),i.left,i.top,a.width/y,a.height/y,c,null,f],this.addImage.apply(this,s);if((n+=e)>=l.height)break;this.addPage()}m(u,n,null,s)}.bind(this);if("CANVAS"===l.nodeName){var r=new Image;r.onload=n,r.src=l.toDataURL("image/png"),l=r}else n()}else{var i=Math.random().toString(35),o=[l,d,g,u,e,c,i,f];this.addImage.apply(this,o),m(u,e,i,o)}}.bind(this),"undefined"!=typeof html2canvas&&!s.rstz)return html2canvas(t,s);if("undefined"==typeof rasterizeHTML)return null;var n="drawDocument";return"string"==typeof t&&(n=/^http/.test(t)?"drawURL":"drawHTML"),s.width=s.width||v*y,rasterizeHTML[n](t,void 0,s).then(function(t){s.onrendered(t.image)},function(t){m(null,t)})},
/**
   * jsPDF fromHTML plugin. BETA stage. API subject to change. Needs browser
   * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
   *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
   *               2014 Diego Casorran, https://github.com/diegocr
   *               2014 Daniel Husar, https://github.com/danielhusar
   *               2014 Wolfgang Gassler, https://github.com/woolfg
   *               2014 Steven Spungin, https://github.com/flamenco
   *
   * @license
   * 
   * ====================================================================
   */
function(t){var P,k,i,a,s,l,h,u,I,w,f,c,p,n,C,B,d,g,m,j;P=function(){return function(t){return e.prototype=t,new e};function e(){}}(),w=function(t){var e,n,r,i,o,a,s;for(n=0,r=t.length,e=void 0,a=i=!1;!i&&n!==r;)(e=t[n]=t[n].trimLeft())&&(i=!0),n++;for(n=r-1;r&&!a&&-1!==n;)(e=t[n]=t[n].trimRight())&&(a=!0),n--;for(o=/\s+$/g,s=!0,n=0;n!==r;)"\u2028"!=t[n]&&(e=t[n].replace(/\s+/g," "),s&&(e=e.trimLeft()),e&&(s=o.test(e)),t[n]=e),n++;return t},c=function(t){var e,n,r;for(e=void 0,n=(r=t.split(",")).shift();!e&&n;)e=i[n.trim().toLowerCase()],n=r.shift();return e},p=function(t){var e;return-1<(t="auto"===t?"0px":t).indexOf("em")&&!isNaN(Number(t.replace("em","")))&&(t=18.719*Number(t.replace("em",""))+"px"),-1<t.indexOf("pt")&&!isNaN(Number(t.replace("pt","")))&&(t=1.333*Number(t.replace("pt",""))+"px"),void 0,16,(e=n[t])?e:void 0!==(e={"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0}[t])?n[t]=e/16:(e=parseFloat(t))?n[t]=e/16:(e=t.match(/([\d\.]+)(px)/),Array.isArray(e)&&3===e.length?n[t]=parseFloat(e[1])/16:n[t]=1)},I=function(t){var e,n,r,i,o;return o=t,i=document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(o,null):o.currentStyle?o.currentStyle:o.style,n=void 0,(e={})["font-family"]=c((r=function(t){return t=t.replace(/-\D/g,function(t){return t.charAt(1).toUpperCase()}),i[t]})("font-family"))||"times",e["font-style"]=a[r("font-style")]||"normal",e["text-align"]=s[r("text-align")]||"left","bold"===(n=l[r("font-weight")]||"normal")&&("normal"===e["font-style"]?e["font-style"]=n:e["font-style"]=n+e["font-style"]),e["font-size"]=p(r("font-size"))||1,e["line-height"]=p(r("line-height"))||1,e.display="inline"===r("display")?"inline":"block",n="block"===e.display,e["margin-top"]=n&&p(r("margin-top"))||0,e["margin-bottom"]=n&&p(r("margin-bottom"))||0,e["padding-top"]=n&&p(r("padding-top"))||0,e["padding-bottom"]=n&&p(r("padding-bottom"))||0,e["margin-left"]=n&&p(r("margin-left"))||0,e["margin-right"]=n&&p(r("margin-right"))||0,e["padding-left"]=n&&p(r("padding-left"))||0,e["padding-right"]=n&&p(r("padding-right"))||0,e["page-break-before"]=r("page-break-before")||"auto",e.float=h[r("cssFloat")]||"none",e.clear=u[r("clear")]||"none",e.color=r("color"),e},C=function(t,e,n){var r,i,o,a,s;if(o=!1,a=i=void 0,r=n["#"+t.id])if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;if(r=n[t.nodeName],!o&&r)if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;for(s="string"==typeof t.className?t.className.split(" "):[],i=0;i<s.length;i++)if(r=n["."+s[i]],!o&&r)if("function"==typeof r)o=r(t,e);else for(i=0,a=r.length;!o&&i!==a;)o=r[i](t,e),i++;return o},j=function(t,e){var n,r,i,o,a,s,l,h,u;for(n=[],r=[],i=0,u=t.rows[0].cells.length,l=t.clientWidth;i<u;)h=t.rows[0].cells[i],r[i]={name:h.textContent.toLowerCase().replace(/\s+/g,""),prompt:h.textContent.replace(/\r?\n/g,""),width:h.clientWidth/l*e.pdf.internal.pageSize.getWidth()},i++;for(i=1;i<t.rows.length;){for(s=t.rows[i],a={},o=0;o<s.cells.length;)a[r[o].name]=s.cells[o].textContent.replace(/\r?\n/g,""),o++;n.push(a),i++}return{rows:n,headers:r}};var E={SCRIPT:1,STYLE:1,NOSCRIPT:1,OBJECT:1,EMBED:1,SELECT:1},M=1;k=function(t,i,e){var n,r,o,a,s,l,h,u;for(r=t.childNodes,n=void 0,(s="block"===(o=I(t)).display)&&(i.setBlockBoundary(),i.setBlockStyle(o)),a=0,l=r.length;a<l;){if("object"===se(n=r[a])){if(i.executeWatchFunctions(n),1===n.nodeType&&"HEADER"===n.nodeName){var c=n,f=i.pdf.margins_doc.top;i.pdf.internal.events.subscribe("addPage",function(t){i.y=f,k(c,i,e),i.pdf.margins_doc.top=i.y+10,i.y+=10},!1)}if(8===n.nodeType&&"#comment"===n.nodeName)~n.textContent.indexOf("ADD_PAGE")&&(i.pdf.addPage(),i.y=i.pdf.margins_doc.top);else if(1!==n.nodeType||E[n.nodeName])if(3===n.nodeType){var p=n.nodeValue;if(n.nodeValue&&"LI"===n.parentNode.nodeName)if("OL"===n.parentNode.parentNode.nodeName)p=M+++". "+p;else{var d=o["font-size"],g=(3-.75*d)*i.pdf.internal.scaleFactor,m=.75*d*i.pdf.internal.scaleFactor,y=1.74*d/i.pdf.internal.scaleFactor;u=function(t,e){this.pdf.circle(t+g,e+m,y,"FD")}}16&n.ownerDocument.body.compareDocumentPosition(n)&&i.addText(p,o)}else"string"==typeof n&&i.addText(n,o);else{var v;if("IMG"===n.nodeName){var w=n.getAttribute("src");v=B[i.pdf.sHashCode(w)||w]}if(v){i.pdf.internal.pageSize.getHeight()-i.pdf.margins_doc.bottom<i.y+n.height&&i.y>i.pdf.margins_doc.top&&(i.pdf.addPage(),i.y=i.pdf.margins_doc.top,i.executeWatchFunctions(n));var b=I(n),x=i.x,N=12/i.pdf.internal.scaleFactor,L=(b["margin-left"]+b["padding-left"])*N,A=(b["margin-right"]+b["padding-right"])*N,S=(b["margin-top"]+b["padding-top"])*N,_=(b["margin-bottom"]+b["padding-bottom"])*N;void 0!==b.float&&"right"===b.float?x+=i.settings.width-n.width-A:x+=L,i.pdf.addImage(v,x,i.y+S,n.width,n.height),v=void 0,"right"===b.float||"left"===b.float?(i.watchFunctions.push(function(t,e,n,r){return i.y>=e?(i.x+=t,i.settings.width+=n,!0):!!(r&&1===r.nodeType&&!E[r.nodeName]&&i.x+r.width>i.pdf.margins_doc.left+i.pdf.margins_doc.width)&&(i.x+=t,i.y=e,i.settings.width+=n,!0)}.bind(this,"left"===b.float?-n.width-L-A:0,i.y+n.height+S+_,n.width)),i.watchFunctions.push(function(t,e,n){return!(i.y<t&&e===i.pdf.internal.getNumberOfPages())||1===n.nodeType&&"both"===I(n).clear&&(i.y=t,!0)}.bind(this,i.y+n.height,i.pdf.internal.getNumberOfPages())),i.settings.width-=n.width+L+A,"left"===b.float&&(i.x+=n.width+L+A)):i.y+=n.height+S+_}else if("TABLE"===n.nodeName)h=j(n,i),i.y+=10,i.pdf.table(i.x,i.y,h.rows,h.headers,{autoSize:!1,printHeaders:e.printHeaders,margins:i.pdf.margins_doc,css:I(n)}),i.y=i.pdf.lastCellPos.y+i.pdf.lastCellPos.h+20;else if("OL"===n.nodeName||"UL"===n.nodeName)M=1,C(n,i,e)||k(n,i,e),i.y+=10;else if("LI"===n.nodeName){var F=i.x;i.x+=20/i.pdf.internal.scaleFactor,i.y+=3,C(n,i,e)||k(n,i,e),i.x=F}else"BR"===n.nodeName?(i.y+=o["font-size"]*i.pdf.internal.scaleFactor,i.addText("\u2028",P(o))):C(n,i,e)||k(n,i,e)}}a++}if(e.outY=i.y,s)return i.setBlockBoundary(u)},B={},d=function(t,o,e,n){var a,r=t.getElementsByTagName("img"),i=r.length,s=0;function l(){o.pdf.internal.events.publish("imagesLoaded"),n(a)}function h(e,n,r){if(e){var i=new Image;a=++s,i.crossOrigin="",i.onerror=i.onload=function(){if(i.complete&&(0===i.src.indexOf("data:image/")&&(i.width=n||i.width||0,i.height=r||i.height||0),i.width+i.height)){var t=o.pdf.sHashCode(e)||e;B[t]=B[t]||i}--s||l()},i.src=e}}for(;i--;)h(r[i].getAttribute("src"),r[i].width,r[i].height);return s||l()},g=function(t,o,a){var s=t.getElementsByTagName("footer");if(0<s.length){s=s[0];var e=o.pdf.internal.write,n=o.y;o.pdf.internal.write=function(){},k(s,o,a);var l=Math.ceil(o.y-n)+5;o.y=n,o.pdf.internal.write=e,o.pdf.margins_doc.bottom+=l;for(var r=function(t){var e=void 0!==t?t.pageNumber:1,n=o.y;o.y=o.pdf.internal.pageSize.getHeight()-o.pdf.margins_doc.bottom,o.pdf.margins_doc.bottom-=l;for(var r=s.getElementsByTagName("span"),i=0;i<r.length;++i)-1<(" "+r[i].className+" ").replace(/[\n\t]/g," ").indexOf(" pageCounter ")&&(r[i].innerHTML=e),-1<(" "+r[i].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")&&(r[i].innerHTML="###jsPDFVarTotalPages###");k(s,o,a),o.pdf.margins_doc.bottom+=l,o.y=n},i=s.getElementsByTagName("span"),h=0;h<i.length;++h)-1<(" "+i[h].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")&&o.pdf.internal.events.subscribe("htmlRenderingFinished",o.pdf.putTotalPages.bind(o.pdf,"###jsPDFVarTotalPages###"),!0);o.pdf.internal.events.subscribe("addPage",r,!1),r(),E.FOOTER=1}},m=function(t,e,n,r,i,o){if(!e)return!1;var a,s,l,h;"string"==typeof e||e.parentNode||(e=""+e.innerHTML),"string"==typeof e&&(a=e.replace(/<\/?script[^>]*?>/gi,""),h="jsPDFhtmlText"+Date.now().toString()+(1e3*Math.random()).toFixed(0),(l=document.createElement("div")).style.cssText="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;",l.innerHTML='<iframe style="height:1px;width:1px" name="'+h+'" />',document.body.appendChild(l),(s=window.frames[h]).document.open(),s.document.writeln(a),s.document.close(),e=s.document.body);var u,c=new f(t,n,r,i);return d.call(this,e,c,i.elementHandlers,function(t){g(e,c,i.elementHandlers),k(e,c,i.elementHandlers),c.pdf.internal.events.publish("htmlRenderingFinished"),u=c.dispose(),"function"==typeof o?o(u):t&&console.error("jsPDF Warning: rendering issues? provide a callback to fromHTML!")}),u||{x:c.x,y:c.y}},(f=function(t,e,n,r){return this.pdf=t,this.x=e,this.y=n,this.settings=r,this.watchFunctions=[],this.init(),this}).prototype.init=function(){return this.paragraph={text:[],style:[]},this.pdf.internal.write("q")},f.prototype.dispose=function(){return this.pdf.internal.write("Q"),{x:this.x,y:this.y,ready:!0}},f.prototype.executeWatchFunctions=function(t){var e=!1,n=[];if(0<this.watchFunctions.length){for(var r=0;r<this.watchFunctions.length;++r)!0===this.watchFunctions[r](t)?e=!0:n.push(this.watchFunctions[r]);this.watchFunctions=n}return e},f.prototype.splitFragmentsIntoLines=function(t,e){var n,r,i,o,a,s,l,h,u,c,f,p,d,g;for(12,c=this.pdf.internal.scaleFactor,o={},s=l=h=g=a=i=u=r=void 0,p=[f=[]],n=0,d=this.settings.width;t.length;)if(a=t.shift(),g=e.shift(),a)if((i=o[(r=g["font-family"])+(u=g["font-style"])])||(i=this.pdf.internal.getFont(r,u).metadata.Unicode,o[r+u]=i),h={widths:i.widths,kerning:i.kerning,fontSize:12*g["font-size"],textIndent:n},l=this.pdf.getStringUnitWidth(a,h)*h.fontSize/c,"\u2028"==a)f=[],p.push(f);else if(d<n+l){for(s=this.pdf.splitTextToSize(a,d,h),f.push([s.shift(),g]);s.length;)f=[[s.shift(),g]],p.push(f);n=this.pdf.getStringUnitWidth(f[0][0],h)*h.fontSize/c}else f.push([a,g]),n+=l;if(void 0!==g["text-align"]&&("center"===g["text-align"]||"right"===g["text-align"]||"justify"===g["text-align"]))for(var m=0;m<p.length;++m){var y=this.pdf.getStringUnitWidth(p[m][0][0],h)*h.fontSize/c;0<m&&(p[m][0][1]=P(p[m][0][1]));var v=d-y;if("right"===g["text-align"])p[m][0][1]["margin-left"]=v;else if("center"===g["text-align"])p[m][0][1]["margin-left"]=v/2;else if("justify"===g["text-align"]){var w=p[m][0][0].split(" ").length-1;p[m][0][1]["word-spacing"]=v/w,m===p.length-1&&(p[m][0][1]["word-spacing"]=0)}}return p},f.prototype.RenderTextFragment=function(t,e){var n,r;r=0,this.pdf.internal.pageSize.getHeight()-this.pdf.margins_doc.bottom<this.y+this.pdf.internal.getFontSize()&&(this.pdf.internal.write("ET","Q"),this.pdf.addPage(),this.y=this.pdf.margins_doc.top,this.pdf.internal.write("q","BT",this.getPdfColor(e.color),this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td"),r=Math.max(r,e["line-height"],e["font-size"]),this.pdf.internal.write(0,(-12*r).toFixed(2),"Td")),n=this.pdf.internal.getFont(e["font-family"],e["font-style"]);var i=this.getPdfColor(e.color);i!==this.lastTextColor&&(this.pdf.internal.write(i),this.lastTextColor=i),void 0!==e["word-spacing"]&&0<e["word-spacing"]&&this.pdf.internal.write(e["word-spacing"].toFixed(2),"Tw"),this.pdf.internal.write("/"+n.id,(12*e["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(t)+") Tj"),void 0!==e["word-spacing"]&&this.pdf.internal.write(0,"Tw")},f.prototype.getPdfColor=function(t){var e,n,r,i=/rgb\s*\(\s*(\d+),\s*(\d+),\s*(\d+\s*)\)/.exec(t);if(null!=i)e=parseInt(i[1]),n=parseInt(i[2]),r=parseInt(i[3]);else{if("string"==typeof t&&"#"!=t.charAt(0)){var o=new RGBColor(t);t=o.ok?o.toHex():"#000000"}e=t.substring(1,3),e=parseInt(e,16),n=t.substring(3,5),n=parseInt(n,16),r=t.substring(5,7),r=parseInt(r,16)}if("string"==typeof e&&/^#[0-9A-Fa-f]{6}$/.test(e)){var a=parseInt(e.substr(1),16);e=a>>16&255,n=a>>8&255,r=255&a}var s=this.f3;return 0===e&&0===n&&0===r||void 0===n?s(e/255)+" g":[s(e/255),s(n/255),s(r/255),"rg"].join(" ")},f.prototype.f3=function(t){return t.toFixed(3)},f.prototype.renderParagraph=function(t){var e,n,r,i,o,a,s,l,h,u,c,f,p;if(r=w(this.paragraph.text),f=this.paragraph.style,e=this.paragraph.blockstyle,this.paragraph.priorblockstyle||{},this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:e},r.join("").trim()){s=this.splitFragmentsIntoLines(r,f),l=a=void 0,n=12/this.pdf.internal.scaleFactor,this.priorMarginBottom=this.priorMarginBottom||0,c=(Math.max((e["margin-top"]||0)-this.priorMarginBottom,0)+(e["padding-top"]||0))*n,u=((e["margin-bottom"]||0)+(e["padding-bottom"]||0))*n,this.priorMarginBottom=e["margin-bottom"]||0,"always"===e["page-break-before"]&&(this.pdf.addPage(),this.y=0,c=((e["margin-top"]||0)+(e["padding-top"]||0))*n),h=this.pdf.internal.write,o=i=void 0,this.y+=c,h("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");for(var d=0;s.length;){for(i=l=0,o=(a=s.shift()).length;i!==o;)a[i][0].trim()&&(l=Math.max(l,a[i][1]["line-height"],a[i][1]["font-size"]),p=7*a[i][1]["font-size"]),i++;var g=0,m=0;for(void 0!==a[0][1]["margin-left"]&&0<a[0][1]["margin-left"]&&(g=(m=this.pdf.internal.getCoordinateString(a[0][1]["margin-left"]))-d,d=m),h(g+Math.max(e["margin-left"]||0,0)*n,(-12*l).toFixed(2),"Td"),i=0,o=a.length;i!==o;)a[i][0]&&this.RenderTextFragment(a[i][0],a[i][1]),i++;if(this.y+=l*n,this.executeWatchFunctions(a[0][1])&&0<s.length){var y=[],v=[];s.forEach(function(t){for(var e=0,n=t.length;e!==n;)t[e][0]&&(y.push(t[e][0]+" "),v.push(t[e][1])),++e}),s=this.splitFragmentsIntoLines(w(y),v),h("ET","Q"),h("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td")}}return t&&"function"==typeof t&&t.call(this,this.x-9,this.y-p/2),h("ET","Q"),this.y+=u}},f.prototype.setBlockBoundary=function(t){return this.renderParagraph(t)},f.prototype.setBlockStyle=function(t){return this.paragraph.blockstyle=t},f.prototype.addText=function(t,e){return this.paragraph.text.push(t),this.paragraph.style.push(e)},i={helvetica:"helvetica","sans-serif":"helvetica","times new roman":"times",serif:"times",times:"times",monospace:"courier",courier:"courier"},l={100:"normal",200:"normal",300:"normal",400:"normal",500:"bold",600:"bold",700:"bold",800:"bold",900:"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"},a={normal:"normal",italic:"italic",oblique:"italic"},s={left:"left",right:"right",center:"center",justify:"justify"},h={none:"none",right:"right",left:"left"},u={none:"none",both:"both"},n={normal:1},t.fromHTML=function(t,e,n,r,i,o){return this.margins_doc=o||{top:0,bottom:0},r||(r={}),r.elementHandlers||(r.elementHandlers={}),m(this,t,isNaN(e)?4:e,isNaN(n)?4:n,r,i)}}(lt.API),lt.API,("undefined"!=typeof window&&window||"undefined"!=typeof global&&global).html2pdf=function(t,a,e){var n=a.canvas;if(n){var r,i;if((n.pdf=a).annotations={_nameMap:[],createAnnotation:function(t,e){var n,r=a.context2d._wrapX(e.left),i=a.context2d._wrapY(e.top),o=(a.context2d._page(e.top),t.indexOf("#"));n=0<=o?{name:t.substring(o+1)}:{url:t},a.link(r,i,e.right-e.left,e.bottom-e.top,n)},setName:function(t,e){var n=a.context2d._wrapX(e.left),r=a.context2d._wrapY(e.top),i=a.context2d._page(e.top);this._nameMap[t]={page:i,x:n,y:r}}},n.annotations=a.annotations,a.context2d._pageBreakAt=function(t){this.pageBreaks.push(t)},a.context2d._gotoPage=function(t){for(;a.internal.getNumberOfPages()<t;)a.addPage();a.setPage(t)},"string"==typeof t){t=t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");var o,s,l=document.createElement("iframe");document.body.appendChild(l),null!=(o=l.contentDocument)&&null!=o||(o=l.contentWindow.document),o.open(),o.write(t),o.close(),r=o.body,s=o.body||{},t=o.documentElement||{},i=Math.max(s.scrollHeight,s.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)}else s=(r=t).body||{},i=Math.max(s.scrollHeight,s.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight);var h={async:!0,allowTaint:!0,backgroundColor:"#ffffff",canvas:n,imageTimeout:15e3,logging:!0,proxy:null,removeContainer:!0,foreignObjectRendering:!1,useCORS:!1,windowHeight:i=a.internal.pageSize.getHeight(),scrollY:i};a.context2d.pageWrapYEnabled=!0,a.context2d.pageWrapY=a.internal.pageSize.getHeight(),html2canvas(r,h).then(function(t){e&&(l&&l.parentElement.removeChild(l),e(a))})}else alert("jsPDF canvas plugin not installed")},window.tmp=html2pdf,function(f){var r=f.BlobBuilder||f.WebKitBlobBuilder||f.MSBlobBuilder||f.MozBlobBuilder;f.URL=f.URL||f.webkitURL||function(t,e){return(e=document.createElement("a")).href=t,e};var n=f.Blob,p=URL.createObjectURL,d=URL.revokeObjectURL,o=f.Symbol&&f.Symbol.toStringTag,t=!1,e=!1,g=!!f.ArrayBuffer,i=r&&r.prototype.append&&r.prototype.getBlob;try{t=2===new Blob(["ä"]).size,e=2===new Blob([new Uint8Array([1,2])]).size}catch(t){}function a(t){return t.map(function(t){if(t.buffer instanceof ArrayBuffer){var e=t.buffer;if(t.byteLength!==e.byteLength){var n=new Uint8Array(t.byteLength);n.set(new Uint8Array(e,t.byteOffset,t.byteLength)),e=n.buffer}return e}return t})}function s(t,e){e=e||{};var n=new r;return a(t).forEach(function(t){n.append(t)}),e.type?n.getBlob(e.type):n.getBlob()}function l(t,e){return new n(a(t),e||{})}if(f.Blob&&(s.prototype=Blob.prototype,l.prototype=Blob.prototype),o)try{File.prototype[o]="File",Blob.prototype[o]="Blob",FileReader.prototype[o]="FileReader"}catch(t){}function h(){var t=!!f.ActiveXObject||"-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style,e=f.XMLHttpRequest&&f.XMLHttpRequest.prototype.send;t&&e&&(XMLHttpRequest.prototype.send=function(t){t instanceof Blob&&this.setRequestHeader("Content-Type",t.type),e.call(this,t)});try{new File([],"")}catch(t){try{var n=new Function('class File extends Blob {constructor(chunks, name, opts) {opts = opts || {};super(chunks, opts || {});this.name = name;this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date;this.lastModified = +this.lastModifiedDate;}};return new File([], ""), File')();f.File=n}catch(t){n=function(t,e,n){var r=new Blob(t,n),i=n&&void 0!==n.lastModified?new Date(n.lastModified):new Date;return r.name=e,r.lastModifiedDate=i,r.lastModified=+i,r.toString=function(){return"[object File]"},o&&(r[o]="File"),r};f.File=n}}}t?(h(),f.Blob=e?f.Blob:l):i?(h(),f.Blob=s):function(){function a(t){for(var e=[],n=0;n<t.length;n++){var r=t.charCodeAt(n);r<128?e.push(r):r<2048?e.push(192|r>>6,128|63&r):r<55296||57344<=r?e.push(224|r>>12,128|r>>6&63,128|63&r):(n++,r=65536+((1023&r)<<10|1023&t.charCodeAt(n)),e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r))}return e}function e(t){var e,n,r,i,o,a;for(e="",r=t.length,n=0;n<r;)switch((i=t[n++])>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:e+=String.fromCharCode(i);break;case 12:case 13:o=t[n++],e+=String.fromCharCode((31&i)<<6|63&o);break;case 14:o=t[n++],a=t[n++],e+=String.fromCharCode((15&i)<<12|(63&o)<<6|(63&a)<<0)}return e}function s(t){for(var e=new Array(t.byteLength),n=new Uint8Array(t),r=e.length;r--;)e[r]=n[r];return e}function n(t){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=[],r=0;r<t.length;r+=3){var i=t[r],o=r+1<t.length,a=o?t[r+1]:0,s=r+2<t.length,l=s?t[r+2]:0,h=i>>2,u=(3&i)<<4|a>>4,c=(15&a)<<2|l>>6,f=63&l;s||(f=64,o||(c=64)),n.push(e[h],e[u],e[c],e[f])}return n.join("")}var t=Object.create||function(t){function e(){}return e.prototype=t,new e};if(g)var r=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],l=ArrayBuffer.isView||function(t){return t&&-1<r.indexOf(Object.prototype.toString.call(t))};function h(t,e){for(var n=0,r=(t=t||[]).length;n<r;n++){var i=t[n];i instanceof h?t[n]=i._buffer:"string"==typeof i?t[n]=a(i):g&&(ArrayBuffer.prototype.isPrototypeOf(i)||l(i))?t[n]=s(i):g&&(o=i)&&DataView.prototype.isPrototypeOf(o)?t[n]=s(i.buffer):t[n]=a(String(i))}var o;this._buffer=[].concat.apply([],t),this.size=this._buffer.length,this.type=e&&e.type||""}function i(t,e,n){var r=h.call(this,t,n=n||{})||this;return r.name=e,r.lastModifiedDate=n.lastModified?new Date(n.lastModified):new Date,r.lastModified=+r.lastModifiedDate,r}if(h.prototype.slice=function(t,e,n){return new h([this._buffer.slice(t||0,e||this._buffer.length)],{type:n})},h.prototype.toString=function(){return"[object Blob]"},(i.prototype=t(h.prototype)).constructor=i,Object.setPrototypeOf)Object.setPrototypeOf(i,h);else try{i.__proto__=h}catch(t){}function o(){if(!(this instanceof o))throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");var n=document.createDocumentFragment();this.addEventListener=n.addEventListener,this.dispatchEvent=function(t){var e=this["on"+t.type];"function"==typeof e&&e(t),n.dispatchEvent(t)},this.removeEventListener=n.removeEventListener}function u(t,e,n){if(!(e instanceof h))throw new TypeError("Failed to execute '"+n+"' on 'FileReader': parameter 1 is not of type 'Blob'.");t.result="",setTimeout(function(){this.readyState=o.LOADING,t.dispatchEvent(new Event("load")),t.dispatchEvent(new Event("loadend"))})}i.prototype.toString=function(){return"[object File]"},o.EMPTY=0,o.LOADING=1,o.DONE=2,o.prototype.error=null,o.prototype.onabort=null,o.prototype.onerror=null,o.prototype.onload=null,o.prototype.onloadend=null,o.prototype.onloadstart=null,o.prototype.onprogress=null,o.prototype.readAsDataURL=function(t){u(this,t,"readAsDataURL"),this.result="data:"+t.type+";base64,"+n(t._buffer)},o.prototype.readAsText=function(t){u(this,t,"readAsText"),this.result=e(t._buffer)},o.prototype.readAsArrayBuffer=function(t){u(this,t,"readAsText"),this.result=t._buffer.slice()},o.prototype.abort=function(){},URL.createObjectURL=function(t){return t instanceof h?"data:"+t.type+";base64,"+n(t._buffer):p.call(URL,t)},URL.revokeObjectURL=function(t){d&&d.call(URL,t)};var c=f.XMLHttpRequest&&f.XMLHttpRequest.prototype.send;c&&(XMLHttpRequest.prototype.send=function(t){t instanceof h?(this.setRequestHeader("Content-Type",t.type),c.call(this,e(t._buffer))):c.call(this,t)}),f.FileReader=o,f.File=i,f.Blob=h}()}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")());var ht,ut,ct,ft,pt,dt,gt,mt,yt,vt,wt,bt,xt,Nt,Lt,le=le||function(s){if(!(void 0===s||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=s.document,l=function(){return s.URL||s.webkitURL||s},h=t.createElementNS("http://www.w3.org/1999/xhtml","a"),u="download"in h,c=/constructor/i.test(s.HTMLElement)||s.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),p=s.setImmediate||s.setTimeout,d=function(t){p(function(){throw t},0)},g=function(t){setTimeout(function(){"string"==typeof t?l().revokeObjectURL(t):t.remove()},4e4)},m=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},r=function(t,n,e){e||(t=m(t));var r,i=this,o="application/octet-stream"===t.type,a=function(){!function(t,e,n){for(var r=(e=[].concat(e)).length;r--;){var i=t["on"+e[r]];if("function"==typeof i)try{i.call(t,n||t)}catch(t){d(t)}}}(i,"writestart progress write writeend".split(" "))};if(i.readyState=i.INIT,u)return r=l().createObjectURL(t),void p(function(){var t,e;h.href=r,h.download=n,t=h,e=new MouseEvent("click"),t.dispatchEvent(e),a(),g(r),i.readyState=i.DONE},0);!function(){if((f||o&&c)&&s.FileReader){var e=new FileReader;return e.onloadend=function(){var t=f?e.result:e.result.replace(/^data:[^;]*;/,"data:attachment/file;");s.open(t,"_blank")||(s.location.href=t),t=void 0,i.readyState=i.DONE,a()},e.readAsDataURL(t),i.readyState=i.INIT}r||(r=l().createObjectURL(t)),o?s.location.href=r:s.open(r,"_blank")||(s.location.href=r);i.readyState=i.DONE,a(),g(r)}()},e=r.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=m(t)),navigator.msSaveOrOpenBlob(t,e)}:(e.abort=function(){},e.readyState=e.INIT=0,e.WRITING=1,e.DONE=2,e.error=e.onwritestart=e.onprogress=e.onwrite=e.onabort=e.onerror=e.onwriteend=null,function(t,e,n){return new r(t,e||t.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||void 0);function At(x){var t=0;if(71!==x[t++]||73!==x[t++]||70!==x[t++]||56!==x[t++]||56!=(x[t++]+1&253)||97!==x[t++])throw"Invalid GIF 87a/89a header.";var N=x[t++]|x[t++]<<8,e=x[t++]|x[t++]<<8,n=x[t++],r=n>>7,i=1<<(7&n)+1;x[t++];x[t++];var o=null;r&&(o=t,t+=3*i);var a=!0,s=[],l=0,h=null,u=0,c=null;for(this.width=N,this.height=e;a&&t<x.length;)switch(x[t++]){case 33:switch(x[t++]){case 255:if(11!==x[t]||78==x[t+1]&&69==x[t+2]&&84==x[t+3]&&83==x[t+4]&&67==x[t+5]&&65==x[t+6]&&80==x[t+7]&&69==x[t+8]&&50==x[t+9]&&46==x[t+10]&&48==x[t+11]&&3==x[t+12]&&1==x[t+13]&&0==x[t+16])t+=14,c=x[t++]|x[t++]<<8,t++;else for(t+=12;;){if(0===(A=x[t++]))break;t+=A}break;case 249:if(4!==x[t++]||0!==x[t+4])throw"Invalid graphics extension block.";var f=x[t++];l=x[t++]|x[t++]<<8,h=x[t++],0==(1&f)&&(h=null),u=f>>2&7,t++;break;case 254:for(;;){if(0===(A=x[t++]))break;t+=A}break;default:throw"Unknown graphic control label: 0x"+x[t-1].toString(16)}break;case 44:var p=x[t++]|x[t++]<<8,d=x[t++]|x[t++]<<8,g=x[t++]|x[t++]<<8,m=x[t++]|x[t++]<<8,y=x[t++],v=y>>6&1,w=o,b=!1;if(y>>7){b=!0;w=t,t+=3*(1<<(7&y)+1)}var L=t;for(t++;;){var A;if(0===(A=x[t++]))break;t+=A}s.push({x:p,y:d,width:g,height:m,has_local_palette:b,palette_offset:w,data_offset:L,data_length:t-L,transparent_index:h,interlaced:!!v,delay:l,disposal:u});break;case 59:a=!1;break;default:throw"Unknown gif block: 0x"+x[t-1].toString(16)}this.numFrames=function(){return s.length},this.loopCount=function(){return c},this.frameInfo=function(t){if(t<0||t>=s.length)throw"Frame index out of range.";return s[t]},this.decodeAndBlitFrameBGRA=function(t,e){var n=this.frameInfo(t),r=n.width*n.height,i=new Uint8Array(r);St(x,n.data_offset,i,r);var o=n.palette_offset,a=n.transparent_index;null===a&&(a=256);var s=n.width,l=N-s,h=s,u=4*(n.y*N+n.x),c=4*((n.y+n.height)*N+n.x),f=u,p=4*l;!0===n.interlaced&&(p+=4*(s+l)*7);for(var d=8,g=0,m=i.length;g<m;++g){var y=i[g];if(0===h&&(h=s,c<=(f+=p)&&(p=l+4*(s+l)*(d-1),f=u+(s+l)*(d<<1),d>>=1)),y===a)f+=4;else{var v=x[o+3*y],w=x[o+3*y+1],b=x[o+3*y+2];e[f++]=b,e[f++]=w,e[f++]=v,e[f++]=255}--h}},this.decodeAndBlitFrameRGBA=function(t,e){var n=this.frameInfo(t),r=n.width*n.height,i=new Uint8Array(r);St(x,n.data_offset,i,r);var o=n.palette_offset,a=n.transparent_index;null===a&&(a=256);var s=n.width,l=N-s,h=s,u=4*(n.y*N+n.x),c=4*((n.y+n.height)*N+n.x),f=u,p=4*l;!0===n.interlaced&&(p+=4*(s+l)*7);for(var d=8,g=0,m=i.length;g<m;++g){var y=i[g];if(0===h&&(h=s,c<=(f+=p)&&(p=l+4*(s+l)*(d-1),f=u+(s+l)*(d<<1),d>>=1)),y===a)f+=4;else{var v=x[o+3*y],w=x[o+3*y+1],b=x[o+3*y+2];e[f++]=v,e[f++]=w,e[f++]=b,e[f++]=255}--h}}}function St(t,e,n,r){for(var i=t[e++],o=1<<i,a=o+1,s=a+1,l=i+1,h=(1<<l)-1,u=0,c=0,f=0,p=t[e++],d=new Int32Array(4096),g=null;;){for(;u<16&&0!==p;)c|=t[e++]<<u,u+=8,1===p?p=t[e++]:--p;if(u<l)break;var m=c&h;if(c>>=l,u-=l,m!==o){if(m===a)break;for(var y=m<s?m:g,v=0,w=y;o<w;)w=d[w]>>8,++v;var b=w;if(r<f+v+(y!==m?1:0))return void console.log("Warning, gif stream longer than expected.");n[f++]=b;var x=f+=v;for(y!==m&&(n[f++]=b),w=y;v--;)w=d[w],n[--x]=255&w,w>>=8;null!==g&&s<4096&&(d[s++]=g<<8|b,h+1<=s&&l<12&&(++l,h=h<<1|1)),g=m}else s=a+1,h=(1<<(l=i+1))-1,g=null}return f!==r&&console.log("Warning, gif stream shorter than expected."),n}try{exports.GifWriter=function(y,t,e,n){var v=0,r=void 0===(n=void 0===n?{}:n).loop?null:n.loop,w=void 0===n.palette?null:n.palette;if(t<=0||e<=0||65535<t||65535<e)throw"Width/Height invalid.";function b(t){var e=t.length;if(e<2||256<e||e&e-1)throw"Invalid code/color length, must be power of 2 and 2 .. 256.";return e}y[v++]=71,y[v++]=73,y[v++]=70,y[v++]=56,y[v++]=57,y[v++]=97;var i=0,o=0;if(null!==w){for(var a=b(w);a>>=1;)++i;if(a=1<<i,--i,void 0!==n.background){if(a<=(o=n.background))throw"Background index out of range.";if(0===o)throw"Background index explicitly passed as 0."}}if(y[v++]=255&t,y[v++]=t>>8&255,y[v++]=255&e,y[v++]=e>>8&255,y[v++]=(null!==w?128:0)|i,y[v++]=o,y[v++]=0,null!==w)for(var s=0,l=w.length;s<l;++s){var h=w[s];y[v++]=h>>16&255,y[v++]=h>>8&255,y[v++]=255&h}if(null!==r){if(r<0||65535<r)throw"Loop count invalid.";y[v++]=33,y[v++]=255,y[v++]=11,y[v++]=78,y[v++]=69,y[v++]=84,y[v++]=83,y[v++]=67,y[v++]=65,y[v++]=80,y[v++]=69,y[v++]=50,y[v++]=46,y[v++]=48,y[v++]=3,y[v++]=1,y[v++]=255&r,y[v++]=r>>8&255,y[v++]=0}var x=!1;this.addFrame=function(t,e,n,r,i,o){if(!0===x&&(--v,x=!1),o=void 0===o?{}:o,t<0||e<0||65535<t||65535<e)throw"x/y invalid.";if(n<=0||r<=0||65535<n||65535<r)throw"Width/Height invalid.";if(i.length<n*r)throw"Not enough pixels for the frame size.";var a=!0,s=o.palette;if(null==s&&(a=!1,s=w),null==s)throw"Must supply either a local or global palette.";for(var l=b(s),h=0;l>>=1;)++h;l=1<<h;var u=void 0===o.delay?0:o.delay,c=void 0===o.disposal?0:o.disposal;if(c<0||3<c)throw"Disposal out of range.";var f=!1,p=0;if(void 0!==o.transparent&&null!==o.transparent&&(f=!0,(p=o.transparent)<0||l<=p))throw"Transparent color index.";if((0!==c||f||0!==u)&&(y[v++]=33,y[v++]=249,y[v++]=4,y[v++]=c<<2|(!0===f?1:0),y[v++]=255&u,y[v++]=u>>8&255,y[v++]=p,y[v++]=0),y[v++]=44,y[v++]=255&t,y[v++]=t>>8&255,y[v++]=255&e,y[v++]=e>>8&255,y[v++]=255&n,y[v++]=n>>8&255,y[v++]=255&r,y[v++]=r>>8&255,y[v++]=!0===a?128|h-1:0,!0===a)for(var d=0,g=s.length;d<g;++d){var m=s[d];y[v++]=m>>16&255,y[v++]=m>>8&255,y[v++]=255&m}v=function(e,n,t,r){e[n++]=t;var i=n++,o=1<<t,a=o-1,s=o+1,l=s+1,h=t+1,u=0,c=0;function f(t){for(;t<=u;)e[n++]=255&c,c>>=8,u-=8,n===i+256&&(e[i]=255,i=n++)}function p(t){c|=t<<u,u+=h,f(8)}var d=r[0]&a,g={};p(o);for(var m=1,y=r.length;m<y;++m){var v=r[m]&a,w=d<<8|v,b=g[w];if(void 0===b){for(c|=d<<u,u+=h;8<=u;)e[n++]=255&c,c>>=8,u-=8,n===i+256&&(e[i]=255,i=n++);4096===l?(p(o),l=s+1,h=t+1,g={}):(1<<h<=l&&++h,g[w]=l++),d=v}else d=b}return p(d),p(s),f(1),i+1===n?e[i]=0:(e[i]=n-i-1,e[n++]=0),n}(y,v,h<2?2:h,i)},this.end=function(){return!1===x&&(y[v++]=59,x=!0),v}},exports.GifReader=At}catch(t){}
/*
    Copyright (c) 2008, Adobe Systems Incorporated
    All rights reserved.

    Redistribution and use in source and binary forms, with or without 
    modification, are permitted provided that the following conditions are
    met:

    * Redistributions of source code must retain the above copyright notice, 
      this list of conditions and the following disclaimer.
    
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the 
      documentation and/or other materials provided with the distribution.
    
    * Neither the name of Adobe Systems Incorporated nor the names of its 
      contributors may be used to endorse or promote products derived from 
      this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
    IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
    THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
    CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
    EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
    LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
function _t(t){var N,L,A,S,e,c=Math.floor,_=new Array(64),F=new Array(64),P=new Array(64),k=new Array(64),y=new Array(65535),v=new Array(65535),Z=new Array(64),w=new Array(64),I=[],C=0,B=7,j=new Array(64),E=new Array(64),M=new Array(64),n=new Array(256),O=new Array(2048),b=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],q=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],T=[0,1,2,3,4,5,6,7,8,9,10,11],R=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],D=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],U=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],z=[0,1,2,3,4,5,6,7,8,9,10,11],H=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],W=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];function r(t,e){for(var n=0,r=0,i=new Array,o=1;o<=16;o++){for(var a=1;a<=t[o];a++)i[e[r]]=[],i[e[r]][0]=n,i[e[r]][1]=o,r++,n++;n*=2}return i}function V(t){for(var e=t[0],n=t[1]-1;0<=n;)e&1<<n&&(C|=1<<B),n--,--B<0&&(255==C?(G(255),G(0)):G(C),B=7,C=0)}function G(t){I.push(t)}function Y(t){G(t>>8&255),G(255&t)}function J(t,e,n,r,i){for(var o,a=i[0],s=i[240],l=function(t,e){var n,r,i,o,a,s,l,h,u,c,f=0;for(u=0;u<8;++u){n=t[f],r=t[f+1],i=t[f+2],o=t[f+3],a=t[f+4],s=t[f+5],l=t[f+6];var p=n+(h=t[f+7]),d=n-h,g=r+l,m=r-l,y=i+s,v=i-s,w=o+a,b=o-a,x=p+w,N=p-w,L=g+y,A=g-y;t[f]=x+L,t[f+4]=x-L;var S=.707106781*(A+N);t[f+2]=N+S,t[f+6]=N-S;var _=.382683433*((x=b+v)-(A=m+d)),F=.5411961*x+_,P=1.306562965*A+_,k=.707106781*(L=v+m),I=d+k,C=d-k;t[f+5]=C+F,t[f+3]=C-F,t[f+1]=I+P,t[f+7]=I-P,f+=8}for(u=f=0;u<8;++u){n=t[f],r=t[f+8],i=t[f+16],o=t[f+24],a=t[f+32],s=t[f+40],l=t[f+48];var B=n+(h=t[f+56]),j=n-h,E=r+l,M=r-l,O=i+s,q=i-s,T=o+a,R=o-a,D=B+T,U=B-T,z=E+O,H=E-O;t[f]=D+z,t[f+32]=D-z;var W=.707106781*(H+U);t[f+16]=U+W,t[f+48]=U-W;var V=.382683433*((D=R+q)-(H=M+j)),G=.5411961*D+V,Y=1.306562965*H+V,J=.707106781*(z=q+M),X=j+J,K=j-J;t[f+40]=K+G,t[f+24]=K-G,t[f+8]=X+Y,t[f+56]=X-Y,f++}for(u=0;u<64;++u)c=t[u]*e[u],Z[u]=0<c?c+.5|0:c-.5|0;return Z}(t,e),h=0;h<64;++h)w[b[h]]=l[h];var u=w[0]-n;n=w[0],0==u?V(r[0]):(V(r[v[o=32767+u]]),V(y[o]));for(var c=63;0<c&&0==w[c];c--);if(0==c)return V(a),n;for(var f,p=1;p<=c;){for(var d=p;0==w[p]&&p<=c;++p);var g=p-d;if(16<=g){f=g>>4;for(var m=1;m<=f;++m)V(s);g&=15}o=32767+w[p],V(i[(g<<4)+v[o]]),V(y[o]),p++}return 63!=c&&V(a),n}function X(t){if(t<=0&&(t=1),100<t&&(t=100),e!=t){(function(t){for(var e=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],n=0;n<64;n++){var r=c((e[n]*t+50)/100);r<1?r=1:255<r&&(r=255),_[b[n]]=r}for(var i=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],o=0;o<64;o++){var a=c((i[o]*t+50)/100);a<1?a=1:255<a&&(a=255),F[b[o]]=a}for(var s=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],l=0,h=0;h<8;h++)for(var u=0;u<8;u++)P[l]=1/(_[b[l]]*s[h]*s[u]*8),k[l]=1/(F[b[l]]*s[h]*s[u]*8),l++})(t<50?Math.floor(5e3/t):Math.floor(200-2*t)),e=t}}this.encode=function(t,e){var n,r;(new Date).getTime();e&&X(e),I=new Array,C=0,B=7,Y(65496),Y(65504),Y(16),G(74),G(70),G(73),G(70),G(0),G(1),G(1),G(0),Y(1),Y(1),G(0),G(0),function(){Y(65499),Y(132),G(0);for(var t=0;t<64;t++)G(_[t]);G(1);for(var e=0;e<64;e++)G(F[e])}(),n=t.width,r=t.height,Y(65472),Y(17),G(8),Y(r),Y(n),G(3),G(1),G(17),G(0),G(2),G(17),G(1),G(3),G(17),G(1),function(){Y(65476),Y(418),G(0);for(var t=0;t<16;t++)G(q[t+1]);for(var e=0;e<=11;e++)G(T[e]);G(16);for(var n=0;n<16;n++)G(R[n+1]);for(var r=0;r<=161;r++)G(D[r]);G(1);for(var i=0;i<16;i++)G(U[i+1]);for(var o=0;o<=11;o++)G(z[o]);G(17);for(var a=0;a<16;a++)G(H[a+1]);for(var s=0;s<=161;s++)G(W[s])}(),Y(65498),Y(12),G(3),G(1),G(0),G(2),G(17),G(3),G(17),G(0),G(63),G(0);var i=0,o=0,a=0;C=0,B=7,this.encode.displayName="_encode_";for(var s,l,h,u,c,f,p,d,g,m=t.data,y=t.width,v=t.height,w=4*y,b=0;b<v;){for(s=0;s<w;){for(f=c=w*b+s,p=-1,g=d=0;g<64;g++)f=c+(d=g>>3)*w+(p=4*(7&g)),v<=b+d&&(f-=w*(b+1+d-v)),w<=s+p&&(f-=s+p-w+4),l=m[f++],h=m[f++],u=m[f++],j[g]=(O[l]+O[h+256>>0]+O[u+512>>0]>>16)-128,E[g]=(O[l+768>>0]+O[h+1024>>0]+O[u+1280>>0]>>16)-128,M[g]=(O[l+1280>>0]+O[h+1536>>0]+O[u+1792>>0]>>16)-128;i=J(j,P,i,N,A),o=J(E,k,o,L,S),a=J(M,k,a,L,S),s+=32}b+=8}if(0<=B){var x=[];x[1]=B+1,x[0]=(1<<B+1)-1,V(x)}return Y(65497),new Uint8Array(I)},function(){(new Date).getTime();t||(t=50),function(){for(var t=String.fromCharCode,e=0;e<256;e++)n[e]=t(e)}(),N=r(q,T),L=r(U,z),A=r(R,D),S=r(H,W),function(){for(var t=1,e=2,n=1;n<=15;n++){for(var r=t;r<e;r++)v[32767+r]=n,y[32767+r]=[],y[32767+r][1]=n,y[32767+r][0]=r;for(var i=-(e-1);i<=-t;i++)v[32767+i]=n,y[32767+i]=[],y[32767+i][1]=n,y[32767+i][0]=e-1+i;t<<=1,e<<=1}}(),function(){for(var t=0;t<256;t++)O[t]=19595*t,O[t+256>>0]=38470*t,O[t+512>>0]=7471*t+32768,O[t+768>>0]=-11059*t,O[t+1024>>0]=-21709*t,O[t+1280>>0]=32768*t+8421375,O[t+1536>>0]=-27439*t,O[t+1792>>0]=-5329*t}(),X(t),(new Date).getTime()}()}function Ft(t,e){if(this.pos=0,this.buffer=t,this.datav=new DataView(t.buffer),this.is_with_alpha=!!e,this.bottom_up=!0,this.flag=String.fromCharCode(this.buffer[0])+String.fromCharCode(this.buffer[1]),this.pos+=2,-1===["BM","BA","CI","CP","IC","PT"].indexOf(this.flag))throw new Error("Invalid BMP File");this.parseHeader(),this.parseBGR()}window.tmp=At,lt.API.adler32cs=(dt="function"==typeof ArrayBuffer&&"function"==typeof Uint8Array,gt=null,mt=function(){if(!dt)return function(){return!1};try{var t={};"function"==typeof t.Buffer&&(gt=t.Buffer)}catch(t){}return function(t){return t instanceof ArrayBuffer||null!==gt&&t instanceof gt}}(),yt=null!==gt?function(t){return new gt(t,"utf8").toString("binary")}:function(t){return unescape(encodeURIComponent(t))},vt=function(t,e){for(var n=65535&t,r=t>>>16,i=0,o=e.length;i<o;i++)n=(n+(255&e.charCodeAt(i)))%65521,r=(r+n)%65521;return(r<<16|n)>>>0},wt=function(t,e){for(var n=65535&t,r=t>>>16,i=0,o=e.length;i<o;i++)n=(n+e[i])%65521,r=(r+n)%65521;return(r<<16|n)>>>0},xt=(bt={}).Adler32=(((pt=(ft=function(t){if(!(this instanceof ft))throw new TypeError("Constructor cannot called be as a function.");if(!isFinite(t=null==t?1:+t))throw new Error("First arguments needs to be a finite number.");this.checksum=t>>>0}).prototype={}).constructor=ft).from=((ht=function(t){if(!(this instanceof ft))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");this.checksum=vt(1,t.toString())}).prototype=pt,ht),ft.fromUtf8=((ut=function(t){if(!(this instanceof ft))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");var e=yt(t.toString());this.checksum=vt(1,e)}).prototype=pt,ut),dt&&(ft.fromBuffer=((ct=function(t){if(!(this instanceof ft))throw new TypeError("Constructor cannot called be as a function.");if(!mt(t))throw new Error("First argument needs to be ArrayBuffer.");var e=new Uint8Array(t);return this.checksum=wt(1,e)}).prototype=pt,ct)),pt.update=function(t){if(null==t)throw new Error("First argument needs to be a string.");return t=t.toString(),this.checksum=vt(this.checksum,t)},pt.updateUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=yt(t.toString());return this.checksum=vt(this.checksum,e)},dt&&(pt.updateBuffer=function(t){if(!mt(t))throw new Error("First argument needs to be ArrayBuffer.");var e=new Uint8Array(t);return this.checksum=wt(this.checksum,e)}),pt.clone=function(){return new xt(this.checksum)},ft),bt.from=function(t){if(null==t)throw new Error("First argument needs to be a string.");return vt(1,t.toString())},bt.fromUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=yt(t.toString());return vt(1,e)},dt&&(bt.fromBuffer=function(t){if(!mt(t))throw new Error("First argument need to be ArrayBuffer.");var e=new Uint8Array(t);return wt(1,e)}),bt),function(t){t.__bidiEngine__=t.prototype.__bidiEngine__=function(t){var d,g,c,f,i,o,a,s=e,m=[[0,3,0,1,0,0,0],[0,3,0,1,2,2,0],[0,3,0,17,2,0,1],[0,3,5,5,4,1,0],[0,3,21,21,4,0,1],[0,3,5,5,4,2,0]],y=[[2,0,1,1,0,1,0],[2,0,1,1,0,2,0],[2,0,2,1,3,2,0],[2,0,2,33,3,1,1]],v={L:0,R:1,EN:2,AN:3,N:4,B:5,S:6},l={0:0,5:1,6:2,7:3,32:4,251:5,254:6,255:7},h=["(",")","(","<",">","<","[","]","[","{","}","{","«","»","«","‹","›","‹","⁅","⁆","⁅","⁽","⁾","⁽","₍","₎","₍","≤","≥","≤","〈","〉","〈","﹙","﹚","﹙","﹛","﹜","﹛","﹝","﹞","﹝","﹤","﹥","﹤"],u=new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/),w=!1,b=0;this.__bidiEngine__={};var x=function(t){var e=t.charCodeAt(),n=e>>8,r=l[n];return void 0!==r?s[256*r+(255&e)]:252===n||253===n?"AL":u.test(n)?"L":8===n?"R":"N"},p=function(t){for(var e,n=0;n<t.length;n++){if("L"===(e=x(t.charAt(n))))return!1;if("R"===e)return!0}return!1},N=function(t,e,n,r){var i,o,a,s,l=e[r];switch(l){case"L":case"R":w=!1;break;case"N":case"AN":break;case"EN":w&&(l="AN");break;case"AL":w=!0,l="R";break;case"WS":l="N";break;case"CS":r<1||r+1>=e.length||"EN"!==(i=n[r-1])&&"AN"!==i||"EN"!==(o=e[r+1])&&"AN"!==o?l="N":w&&(o="AN"),l=o===i?o:"N";break;case"ES":l="EN"===(i=0<r?n[r-1]:"B")&&r+1<e.length&&"EN"===e[r+1]?"EN":"N";break;case"ET":if(0<r&&"EN"===n[r-1]){l="EN";break}if(w){l="N";break}for(a=r+1,s=e.length;a<s&&"ET"===e[a];)a++;l=a<s&&"EN"===e[a]?"EN":"N";break;case"NSM":if(c&&!f){for(s=e.length,a=r+1;a<s&&"NSM"===e[a];)a++;if(a<s){var h=t[r],u=1425<=h&&h<=2303||64286===h;if(i=e[a],u&&("R"===i||"AL"===i)){l="R";break}}}l=r<1||"B"===(i=e[r-1])?"N":n[r-1];break;case"B":d=!(w=!1),l=b;break;case"S":g=!0,l="N";break;case"LRE":case"RLE":case"LRO":case"RLO":case"PDF":w=!1;break;case"BN":l="N"}return l},L=function(t,e,n){var r=t.split("");return n&&A(r,n,{hiLevel:b}),r.reverse(),e&&e.reverse(),r.join("")},A=function(t,e,n){var r,i,o,a,s,l=-1,h=t.length,u=0,c=[],f=b?y:m,p=[];for(g=d=w=!1,i=0;i<h;i++)p[i]=x(t[i]);for(o=0;o<h;o++){if(s=u,c[o]=N(t,p,c,o),r=240&(u=f[s][v[c[o]]]),u&=15,e[o]=a=f[u][5],0<r)if(16===r){for(i=l;i<o;i++)e[i]=1;l=-1}else l=-1;if(f[u][6])-1===l&&(l=o);else if(-1<l){for(i=l;i<o;i++)e[i]=a;l=-1}"B"===p[o]&&(e[o]=0),n.hiLevel|=a}g&&function(t,e,n){for(var r=0;r<n;r++)if("S"===t[r]){e[r]=b;for(var i=r-1;0<=i&&"WS"===t[i];i--)e[i]=b}}(p,e,h)},S=function(t,e,n,r,i){if(!(i.hiLevel<t)){if(1===t&&1===b&&!d)return e.reverse(),void(n&&n.reverse());for(var o,a,s,l,h=e.length,u=0;u<h;){if(r[u]>=t){for(s=u+1;s<h&&r[s]>=t;)s++;for(l=u,a=s-1;l<a;l++,a--)o=e[l],e[l]=e[a],e[a]=o,n&&(o=n[l],n[l]=n[a],n[a]=o);u=s}u++}}},_=function(t,e,n){var r=t.split(""),i={hiLevel:b};return n||(n=[]),A(r,n,i),function(t,e,n){if(0!==n.hiLevel&&a)for(var r,i=0;i<t.length;i++)1===e[i]&&0<=(r=h.indexOf(t[i]))&&(t[i]=h[r+1])}(r,n,i),S(2,r,e,n,i),S(1,r,e,n,i),r.join("")};return this.__bidiEngine__.doBidiReorder=function(t,e,n){if(function(t,e){if(e)for(var n=0;n<t.length;n++)e[n]=n;void 0===f&&(f=p(t)),void 0===o&&(o=p(t))}(t,e),c||!i||o)if(c&&i&&f^o)b=f?1:0,t=L(t,e,n);else if(!c&&i&&o)b=f?1:0,t=_(t,e,n),t=L(t,e);else if(!c||f||i||o){if(c&&!i&&f^o)t=L(t,e),t=f?(b=0,_(t,e,n)):(b=1,t=_(t,e,n),L(t,e));else if(c&&f&&!i&&o)b=1,t=_(t,e,n),t=L(t,e);else if(!c&&!i&&f^o){var r=a;f?(b=1,t=_(t,e,n),b=0,a=!1,t=_(t,e,n),a=r):(b=0,t=_(t,e,n),t=L(t,e),a=!(b=1),t=_(t,e,n),a=r,t=L(t,e))}}else b=0,t=_(t,e,n);else b=f?1:0,t=_(t,e,n);return t},this.__bidiEngine__.setOptions=function(t){t&&(c=t.isInputVisual,i=t.isOutputVisual,f=t.isInputRtl,o=t.isOutputRtl,a=t.isSymmetricSwapping)},this.__bidiEngine__.setOptions(t),this.__bidiEngine__};var e=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","N","N","ET","ET","ET","N","N","N","N","N","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","N","ET","ET","ET","ET","N","N","N","N","L","N","N","BN","N","N","ET","ET","EN","EN","N","L","N","N","N","EN","L","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","N","N","N","N","N","ET","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","R","NSM","R","NSM","NSM","R","NSM","NSM","R","NSM","N","N","N","N","N","N","N","N","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","N","N","N","N","N","R","R","R","R","R","N","N","N","N","N","N","N","N","N","N","N","AN","AN","AN","AN","AN","AN","N","N","AL","ET","ET","AL","CS","AL","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","AN","AN","AN","AN","AN","AN","AN","AN","AN","ET","AN","AN","AL","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","N","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","NSM","NSM","N","NSM","NSM","NSM","NSM","AL","AL","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","N","N","N","N","N","N","N","N","N","N","N","N","N","N","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","R","R","N","N","N","N","R","N","N","N","N","N","WS","WS","WS","WS","WS","WS","WS","WS","WS","WS","WS","BN","BN","BN","L","R","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","WS","B","LRE","RLE","PDF","LRO","RLO","CS","ET","ET","ET","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","CS","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","WS","BN","BN","BN","BN","BN","N","LRI","RLI","FSI","PDI","BN","BN","BN","BN","BN","BN","EN","L","N","N","EN","EN","EN","EN","EN","EN","ES","ES","N","N","N","L","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","ES","ES","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","L","L","N","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","N","N","N","N","N","R","NSM","R","R","R","R","R","R","R","R","R","R","ES","R","R","R","R","R","R","R","R","R","R","R","R","R","N","R","R","R","R","R","N","R","N","R","R","N","R","R","N","R","R","R","R","R","R","R","R","R","R","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","CS","N","CS","N","N","CS","N","N","N","N","N","N","N","N","N","ET","N","N","ES","ES","N","N","N","N","N","ET","ET","N","N","N","N","N","AL","AL","AL","AL","AL","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","N","BN","N","N","N","ET","ET","ET","N","N","N","N","N","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","L","L","L","L","L","L","N","N","L","L","L","L","L","L","N","N","L","L","L","L","L","L","N","N","L","L","L","N","N","N","ET","ET","N","N","N","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"],o=new t.__bidiEngine__({isInputVisual:!0});t.API.events.push(["postProcessText",function(t){var e=t.text,n=(t.x,t.y,t.options||{}),r=(t.mutex,n.lang,[]);if("[object Array]"===Object.prototype.toString.call(e)){var i=0;for(r=[],i=0;i<e.length;i+=1)"[object Array]"===Object.prototype.toString.call(e[i])?r.push([o.doBidiReorder(e[i][0]),e[i][1],e[i][2]]):r.push([o.doBidiReorder(e[i])]);t.text=r}else t.text=o.doBidiReorder(e)}])}(lt),window.tmp=_t,Ft.prototype.parseHeader=function(){if(this.fileSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.reserved=this.datav.getUint32(this.pos,!0),this.pos+=4,this.offset=this.datav.getUint32(this.pos,!0),this.pos+=4,this.headerSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.width=this.datav.getUint32(this.pos,!0),this.pos+=4,this.height=this.datav.getInt32(this.pos,!0),this.pos+=4,this.planes=this.datav.getUint16(this.pos,!0),this.pos+=2,this.bitPP=this.datav.getUint16(this.pos,!0),this.pos+=2,this.compress=this.datav.getUint32(this.pos,!0),this.pos+=4,this.rawSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.hr=this.datav.getUint32(this.pos,!0),this.pos+=4,this.vr=this.datav.getUint32(this.pos,!0),this.pos+=4,this.colors=this.datav.getUint32(this.pos,!0),this.pos+=4,this.importantColors=this.datav.getUint32(this.pos,!0),this.pos+=4,16===this.bitPP&&this.is_with_alpha&&(this.bitPP=15),this.bitPP<15){var t=0===this.colors?1<<this.bitPP:this.colors;this.palette=new Array(t);for(var e=0;e<t;e++){var n=this.datav.getUint8(this.pos++,!0),r=this.datav.getUint8(this.pos++,!0),i=this.datav.getUint8(this.pos++,!0),o=this.datav.getUint8(this.pos++,!0);this.palette[e]={red:i,green:r,blue:n,quad:o}}}this.height<0&&(this.height*=-1,this.bottom_up=!1)},Ft.prototype.parseBGR=function(){this.pos=this.offset;try{var t="bit"+this.bitPP,e=this.width*this.height*4;this.data=new Uint8Array(e),this[t]()}catch(t){console.log("bit decode error:"+t)}},Ft.prototype.bit1=function(){var t=Math.ceil(this.width/8),e=t%4,n=0<=this.height?this.height-1:-this.height;for(n=this.height-1;0<=n;n--){for(var r=this.bottom_up?n:this.height-1-n,i=0;i<t;i++)for(var o=this.datav.getUint8(this.pos++,!0),a=r*this.width*4+8*i*4,s=0;s<8&&8*i+s<this.width;s++){var l=this.palette[o>>7-s&1];this.data[a+4*s]=l.blue,this.data[a+4*s+1]=l.green,this.data[a+4*s+2]=l.red,this.data[a+4*s+3]=255}0!=e&&(this.pos+=4-e)}},Ft.prototype.bit4=function(){for(var t=Math.ceil(this.width/2),e=t%4,n=this.height-1;0<=n;n--){for(var r=this.bottom_up?n:this.height-1-n,i=0;i<t;i++){var o=this.datav.getUint8(this.pos++,!0),a=r*this.width*4+2*i*4,s=o>>4,l=15&o,h=this.palette[s];if(this.data[a]=h.blue,this.data[a+1]=h.green,this.data[a+2]=h.red,this.data[a+3]=255,2*i+1>=this.width)break;h=this.palette[l],this.data[a+4]=h.blue,this.data[a+4+1]=h.green,this.data[a+4+2]=h.red,this.data[a+4+3]=255}0!=e&&(this.pos+=4-e)}},Ft.prototype.bit8=function(){for(var t=this.width%4,e=this.height-1;0<=e;e--){for(var n=this.bottom_up?e:this.height-1-e,r=0;r<this.width;r++){var i=this.datav.getUint8(this.pos++,!0),o=n*this.width*4+4*r;if(i<this.palette.length){var a=this.palette[i];this.data[o]=a.red,this.data[o+1]=a.green,this.data[o+2]=a.blue,this.data[o+3]=255}else this.data[o]=255,this.data[o+1]=255,this.data[o+2]=255,this.data[o+3]=255}0!=t&&(this.pos+=4-t)}},Ft.prototype.bit15=function(){for(var t=this.width%3,e=parseInt("11111",2),n=this.height-1;0<=n;n--){for(var r=this.bottom_up?n:this.height-1-n,i=0;i<this.width;i++){var o=this.datav.getUint16(this.pos,!0);this.pos+=2;var a=(o&e)/e*255|0,s=(o>>5&e)/e*255|0,l=(o>>10&e)/e*255|0,h=o>>15?255:0,u=r*this.width*4+4*i;this.data[u]=l,this.data[u+1]=s,this.data[u+2]=a,this.data[u+3]=h}this.pos+=t}},Ft.prototype.bit16=function(){for(var t=this.width%3,e=parseInt("11111",2),n=parseInt("111111",2),r=this.height-1;0<=r;r--){for(var i=this.bottom_up?r:this.height-1-r,o=0;o<this.width;o++){var a=this.datav.getUint16(this.pos,!0);this.pos+=2;var s=(a&e)/e*255|0,l=(a>>5&n)/n*255|0,h=(a>>11)/e*255|0,u=i*this.width*4+4*o;this.data[u]=h,this.data[u+1]=l,this.data[u+2]=s,this.data[u+3]=255}this.pos+=t}},Ft.prototype.bit24=function(){for(var t=this.height-1;0<=t;t--){for(var e=this.bottom_up?t:this.height-1-t,n=0;n<this.width;n++){var r=this.datav.getUint8(this.pos++,!0),i=this.datav.getUint8(this.pos++,!0),o=this.datav.getUint8(this.pos++,!0),a=e*this.width*4+4*n;this.data[a]=o,this.data[a+1]=i,this.data[a+2]=r,this.data[a+3]=255}this.pos+=this.width%4}},Ft.prototype.bit32=function(){for(var t=this.height-1;0<=t;t--)for(var e=this.bottom_up?t:this.height-1-t,n=0;n<this.width;n++){var r=this.datav.getUint8(this.pos++,!0),i=this.datav.getUint8(this.pos++,!0),o=this.datav.getUint8(this.pos++,!0),a=this.datav.getUint8(this.pos++,!0),s=e*this.width*4+4*n;this.data[s]=o,this.data[s+1]=i,this.data[s+2]=r,this.data[s+3]=a}},Ft.prototype.getData=function(){return this.data},window.tmp=Ft,
/*
   Copyright (c) 2013 Gildas Lormeau. All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright 
   notice, this list of conditions and the following disclaimer in 
   the documentation and/or other materials provided with the distribution.

   3. The names of the authors may not be used to endorse or promote products
   derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
   INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
   INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
function(t){var d=15,g=573,e=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];function ct(){var p=this;function l(t,e){for(var n=0;n|=1&t,t>>>=1,n<<=1,0<--e;);return n>>>1}p.build_tree=function(t){var e,n,r,i=p.dyn_tree,o=p.stat_desc.static_tree,a=p.stat_desc.elems,s=-1;for(t.heap_len=0,t.heap_max=g,e=0;e<a;e++)0!==i[2*e]?(t.heap[++t.heap_len]=s=e,t.depth[e]=0):i[2*e+1]=0;for(;t.heap_len<2;)i[2*(r=t.heap[++t.heap_len]=s<2?++s:0)]=1,t.depth[r]=0,t.opt_len--,o&&(t.static_len-=o[2*r+1]);for(p.max_code=s,e=Math.floor(t.heap_len/2);1<=e;e--)t.pqdownheap(i,e);for(r=a;e=t.heap[1],t.heap[1]=t.heap[t.heap_len--],t.pqdownheap(i,1),n=t.heap[1],t.heap[--t.heap_max]=e,t.heap[--t.heap_max]=n,i[2*r]=i[2*e]+i[2*n],t.depth[r]=Math.max(t.depth[e],t.depth[n])+1,i[2*e+1]=i[2*n+1]=r,t.heap[1]=r++,t.pqdownheap(i,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t){var e,n,r,i,o,a,s=p.dyn_tree,l=p.stat_desc.static_tree,h=p.stat_desc.extra_bits,u=p.stat_desc.extra_base,c=p.stat_desc.max_length,f=0;for(i=0;i<=d;i++)t.bl_count[i]=0;for(s[2*t.heap[t.heap_max]+1]=0,e=t.heap_max+1;e<g;e++)c<(i=s[2*s[2*(n=t.heap[e])+1]+1]+1)&&(i=c,f++),s[2*n+1]=i,n>p.max_code||(t.bl_count[i]++,o=0,u<=n&&(o=h[n-u]),a=s[2*n],t.opt_len+=a*(i+o),l&&(t.static_len+=a*(l[2*n+1]+o)));if(0!==f){do{for(i=c-1;0===t.bl_count[i];)i--;t.bl_count[i]--,t.bl_count[i+1]+=2,t.bl_count[c]--,f-=2}while(0<f);for(i=c;0!==i;i--)for(n=t.bl_count[i];0!==n;)(r=t.heap[--e])>p.max_code||(s[2*r+1]!=i&&(t.opt_len+=(i-s[2*r+1])*s[2*r],s[2*r+1]=i),n--)}}(t),function(t,e,n){var r,i,o,a=[],s=0;for(r=1;r<=d;r++)a[r]=s=s+n[r-1]<<1;for(i=0;i<=e;i++)0!==(o=t[2*i+1])&&(t[2*i]=l(a[o]++,o))}(i,p.max_code,t.bl_count)}}function ft(t,e,n,r,i){this.static_tree=t,this.extra_bits=e,this.extra_base=n,this.elems=r,this.max_length=i}ct._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28],ct.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],ct.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],ct.d_code=function(t){return t<256?e[t]:e[256+(t>>>7)]},ct.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ct.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],ct.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ct.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ft.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8],ft.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5],ft.static_l_desc=new ft(ft.static_ltree,ct.extra_lbits,257,286,d),ft.static_d_desc=new ft(ft.static_dtree,ct.extra_dbits,0,30,d),ft.static_bl_desc=new ft(null,ct.extra_blbits,0,19,7);function n(t,e,n,r,i){this.good_length=t,this.max_lazy=e,this.nice_length=n,this.max_chain=r,this.func=i}var pt=[new n(0,0,0,0,0),new n(4,4,8,4,1),new n(4,5,16,8,1),new n(4,6,32,32,1),new n(4,4,16,16,2),new n(8,16,32,32,2),new n(8,16,128,128,2),new n(8,32,128,256,2),new n(32,128,258,1024,2),new n(32,258,258,4096,2)],dt=["need dictionary","stream end","","","stream error","data error","","buffer error","",""];function gt(t,e,n,r){var i=t[2*e],o=t[2*n];return i<o||i==o&&r[e]<=r[n]}function r(){var l,h,u,c,f,p,d,g,i,m,y,v,w,a,b,x,N,L,A,S,_,F,P,k,I,C,B,j,E,M,s,O,q,T,R,D,U,o,z,H,W,V=this,G=new ct,Y=new ct,J=new ct;function X(){var t;for(t=0;t<286;t++)s[2*t]=0;for(t=0;t<30;t++)O[2*t]=0;for(t=0;t<19;t++)q[2*t]=0;s[512]=1,V.opt_len=V.static_len=0,D=o=0}function K(t,e){var n,r,i=-1,o=t[1],a=0,s=7,l=4;for(0===o&&(s=138,l=3),t[2*(e+1)+1]=65535,n=0;n<=e;n++)r=o,o=t[2*(n+1)+1],++a<s&&r==o||(a<l?q[2*r]+=a:0!==r?(r!=i&&q[2*r]++,q[32]++):a<=10?q[34]++:q[36]++,i=r,l=(a=0)===o?(s=138,3):r==o?(s=6,3):(s=7,4))}function Z(t){V.pending_buf[V.pending++]=t}function Q(t){Z(255&t),Z(t>>>8&255)}function $(t,e){var n,r=e;16-r<W?(Q(H|=(n=t)<<W&65535),H=n>>>16-W,W+=r-16):(H|=t<<W&65535,W+=r)}function tt(t,e){var n=2*t;$(65535&e[n],65535&e[n+1])}function et(t,e){var n,r,i=-1,o=t[1],a=0,s=7,l=4;for(0===o&&(s=138,l=3),n=0;n<=e;n++)if(r=o,o=t[2*(n+1)+1],!(++a<s&&r==o)){if(a<l)for(;tt(r,q),0!=--a;);else 0!==r?(r!=i&&(tt(r,q),a--),tt(16,q),$(a-3,2)):a<=10?(tt(17,q),$(a-3,3)):(tt(18,q),$(a-11,7));i=r,l=(a=0)===o?(s=138,3):r==o?(s=6,3):(s=7,4)}}function nt(){16==W?(Q(H),W=H=0):8<=W&&(Z(255&H),H>>>=8,W-=8)}function rt(t,e){var n,r,i;if(V.pending_buf[U+2*D]=t>>>8&255,V.pending_buf[U+2*D+1]=255&t,V.pending_buf[T+D]=255&e,D++,0===t?s[2*e]++:(o++,t--,s[2*(ct._length_code[e]+256+1)]++,O[2*ct.d_code(t)]++),0==(8191&D)&&2<B){for(n=8*D,r=_-N,i=0;i<30;i++)n+=O[2*i]*(5+ct.extra_dbits[i]);if(n>>>=3,o<Math.floor(D/2)&&n<Math.floor(r/2))return!0}return D==R-1}function it(t,e){var n,r,i,o,a=0;if(0!==D)for(;n=V.pending_buf[U+2*a]<<8&65280|255&V.pending_buf[U+2*a+1],r=255&V.pending_buf[T+a],a++,0===n?tt(r,t):(tt((i=ct._length_code[r])+256+1,t),0!==(o=ct.extra_lbits[i])&&$(r-=ct.base_length[i],o),tt(i=ct.d_code(--n),e),0!==(o=ct.extra_dbits[i])&&$(n-=ct.base_dist[i],o)),a<D;);tt(256,t),z=t[513]}function ot(){8<W?Q(H):0<W&&Z(255&H),W=H=0}function at(t,e,n){var r,i,o;$(0+(n?1:0),3),r=t,i=e,o=!0,ot(),z=8,o&&(Q(i),Q(~i)),V.pending_buf.set(g.subarray(r,r+i),V.pending),V.pending+=i}function e(t,e,n){var r,i,o=0;0<B?(G.build_tree(V),Y.build_tree(V),o=function(){var t;for(K(s,G.max_code),K(O,Y.max_code),J.build_tree(V),t=18;3<=t&&0===q[2*ct.bl_order[t]+1];t--);return V.opt_len+=3*(t+1)+5+5+4,t}(),r=V.opt_len+3+7>>>3,(i=V.static_len+3+7>>>3)<=r&&(r=i)):r=i=e+5,e+4<=r&&-1!=t?at(t,e,n):i==r?($(2+(n?1:0),3),it(ft.static_ltree,ft.static_dtree)):($(4+(n?1:0),3),function(t,e,n){var r;for($(t-257,5),$(e-1,5),$(n-4,4),r=0;r<n;r++)$(q[2*ct.bl_order[r]+1],3);et(s,t-1),et(O,e-1)}(G.max_code+1,Y.max_code+1,o+1),it(s,O)),X(),n&&ot()}function st(t){e(0<=N?N:-1,_-N,t),N=_,l.flush_pending()}function lt(){var t,e,n,r;do{if(0===(r=i-P-_)&&0===_&&0===P)r=f;else if(-1==r)r--;else if(f+f-262<=_){for(g.set(g.subarray(f,f+f),0),F-=f,_-=f,N-=f,n=t=w;e=65535&y[--n],y[n]=f<=e?e-f:0,0!=--t;);for(n=t=f;e=65535&m[--n],m[n]=f<=e?e-f:0,0!=--t;);r+=f}if(0===l.avail_in)return;t=l.read_buf(g,_+P,r),3<=(P+=t)&&(v=((v=255&g[_])<<x^255&g[_+1])&b)}while(P<262&&0!==l.avail_in)}function ht(t){var e,n,r=I,i=_,o=k,a=f-262<_?_-(f-262):0,s=M,l=d,h=_+258,u=g[i+o-1],c=g[i+o];E<=k&&(r>>=2),P<s&&(s=P);do{if(g[(e=t)+o]==c&&g[e+o-1]==u&&g[e]==g[i]&&g[++e]==g[i+1]){i+=2,e++;do{}while(g[++i]==g[++e]&&g[++i]==g[++e]&&g[++i]==g[++e]&&g[++i]==g[++e]&&g[++i]==g[++e]&&g[++i]==g[++e]&&g[++i]==g[++e]&&g[++i]==g[++e]&&i<h);if(n=258-(h-i),i=h-258,o<n){if(F=t,s<=(o=n))break;u=g[i+o-1],c=g[i+o]}}}while((t=65535&m[t&l])>a&&0!=--r);return o<=P?o:P}function ut(t){return t.total_in=t.total_out=0,t.msg=null,V.pending=0,V.pending_out=0,h=113,c=0,G.dyn_tree=s,G.stat_desc=ft.static_l_desc,Y.dyn_tree=O,Y.stat_desc=ft.static_d_desc,J.dyn_tree=q,J.stat_desc=ft.static_bl_desc,W=H=0,z=8,X(),function(){var t;for(i=2*f,t=y[w-1]=0;t<w-1;t++)y[t]=0;C=pt[B].max_lazy,E=pt[B].good_length,M=pt[B].nice_length,I=pt[B].max_chain,L=k=2,v=S=P=N=_=0}(),0}V.depth=[],V.bl_count=[],V.heap=[],s=[],O=[],q=[],V.pqdownheap=function(t,e){for(var n=V.heap,r=n[e],i=e<<1;i<=V.heap_len&&(i<V.heap_len&&gt(t,n[i+1],n[i],V.depth)&&i++,!gt(t,r,n[i],V.depth));)n[e]=n[i],e=i,i<<=1;n[e]=r},V.deflateInit=function(t,e,n,r,i,o){return r||(r=8),i||(i=8),o||(o=0),t.msg=null,-1==e&&(e=6),i<1||9<i||8!=r||n<9||15<n||e<0||9<e||o<0||2<o?-2:(t.dstate=V,d=(f=1<<(p=n))-1,b=(w=1<<(a=i+7))-1,x=Math.floor((a+3-1)/3),g=new Uint8Array(2*f),m=[],y=[],R=1<<i+6,V.pending_buf=new Uint8Array(4*R),u=4*R,U=Math.floor(R/2),T=3*R,B=e,j=o,ut(t))},V.deflateEnd=function(){return 42!=h&&113!=h&&666!=h?-2:(V.pending_buf=null,g=m=y=null,V.dstate=null,113==h?-3:0)},V.deflateParams=function(t,e,n){var r=0;return-1==e&&(e=6),e<0||9<e||n<0||2<n?-2:(pt[B].func!=pt[e].func&&0!==t.total_in&&(r=t.deflate(1)),B!=e&&(C=pt[B=e].max_lazy,E=pt[B].good_length,M=pt[B].nice_length,I=pt[B].max_chain),j=n,r)},V.deflateSetDictionary=function(t,e,n){var r,i=n,o=0;if(!e||42!=h)return-2;if(i<3)return 0;for(f-262<i&&(o=n-(i=f-262)),g.set(e.subarray(o,o+i),0),N=_=i,v=((v=255&g[0])<<x^255&g[1])&b,r=0;r<=i-3;r++)v=(v<<x^255&g[r+2])&b,m[r&d]=y[v],y[v]=r;return 0},V.deflate=function(t,e){var n,r,i,o,a,s;if(4<e||e<0)return-2;if(!t.next_out||!t.next_in&&0!==t.avail_in||666==h&&4!=e)return t.msg=dt[4],-2;if(0===t.avail_out)return t.msg=dt[7],-5;if(l=t,o=c,c=e,42==h&&(r=8+(p-8<<4)<<8,3<(i=(B-1&255)>>1)&&(i=3),r|=i<<6,0!==_&&(r|=32),h=113,Z((s=r+=31-r%31)>>8&255),Z(255&s)),0!==V.pending){if(l.flush_pending(),0===l.avail_out)return c=-1,0}else if(0===l.avail_in&&e<=o&&4!=e)return l.msg=dt[7],-5;if(666==h&&0!==l.avail_in)return t.msg=dt[7],-5;if(0!==l.avail_in||0!==P||0!=e&&666!=h){switch(a=-1,pt[B].func){case 0:a=function(t){var e,n=65535;for(u-5<n&&(n=u-5);;){if(P<=1){if(lt(),0===P&&0==t)return 0;if(0===P)break}if(_+=P,e=N+n,((P=0)===_||e<=_)&&(P=_-e,_=e,st(!1),0===l.avail_out))return 0;if(f-262<=_-N&&(st(!1),0===l.avail_out))return 0}return st(4==t),0===l.avail_out?4==t?2:0:4==t?3:1}(e);break;case 1:a=function(t){for(var e,n=0;;){if(P<262){if(lt(),P<262&&0==t)return 0;if(0===P)break}if(3<=P&&(v=(v<<x^255&g[_+2])&b,n=65535&y[v],m[_&d]=y[v],y[v]=_),0!==n&&(_-n&65535)<=f-262&&2!=j&&(L=ht(n)),3<=L)if(e=rt(_-F,L-3),P-=L,L<=C&&3<=P){for(L--;v=(v<<x^255&g[++_+2])&b,n=65535&y[v],m[_&d]=y[v],y[v]=_,0!=--L;);_++}else _+=L,L=0,v=((v=255&g[_])<<x^255&g[_+1])&b;else e=rt(0,255&g[_]),P--,_++;if(e&&(st(!1),0===l.avail_out))return 0}return st(4==t),0===l.avail_out?4==t?2:0:4==t?3:1}(e);break;case 2:a=function(t){for(var e,n,r=0;;){if(P<262){if(lt(),P<262&&0==t)return 0;if(0===P)break}if(3<=P&&(v=(v<<x^255&g[_+2])&b,r=65535&y[v],m[_&d]=y[v],y[v]=_),k=L,A=F,L=2,0!==r&&k<C&&(_-r&65535)<=f-262&&(2!=j&&(L=ht(r)),L<=5&&(1==j||3==L&&4096<_-F)&&(L=2)),3<=k&&L<=k){for(n=_+P-3,e=rt(_-1-A,k-3),P-=k-1,k-=2;++_<=n&&(v=(v<<x^255&g[_+2])&b,r=65535&y[v],m[_&d]=y[v],y[v]=_),0!=--k;);if(S=0,L=2,_++,e&&(st(!1),0===l.avail_out))return 0}else if(0!==S){if((e=rt(0,255&g[_-1]))&&st(!1),_++,P--,0===l.avail_out)return 0}else S=1,_++,P--}return 0!==S&&(e=rt(0,255&g[_-1]),S=0),st(4==t),0===l.avail_out?4==t?2:0:4==t?3:1}(e)}if(2!=a&&3!=a||(h=666),0==a||2==a)return 0===l.avail_out&&(c=-1),0;if(1==a){if(1==e)$(2,3),tt(256,ft.static_ltree),nt(),1+z+10-W<9&&($(2,3),tt(256,ft.static_ltree),nt()),z=7;else if(at(0,0,!1),3==e)for(n=0;n<w;n++)y[n]=0;if(l.flush_pending(),0===l.avail_out)return c=-1,0}}return 4!=e?0:1}}function i(){this.next_in_index=0,this.next_out_index=0,this.avail_in=0,this.total_in=0,this.avail_out=0,this.total_out=0}i.prototype={deflateInit:function(t,e){return this.dstate=new r,e||(e=d),this.dstate.deflateInit(this,t,e)},deflate:function(t){return this.dstate?this.dstate.deflate(this,t):-2},deflateEnd:function(){if(!this.dstate)return-2;var t=this.dstate.deflateEnd();return this.dstate=null,t},deflateParams:function(t,e){return this.dstate?this.dstate.deflateParams(this,t,e):-2},deflateSetDictionary:function(t,e){return this.dstate?this.dstate.deflateSetDictionary(this,t,e):-2},read_buf:function(t,e,n){var r=this.avail_in;return n<r&&(r=n),0===r?0:(this.avail_in-=r,t.set(this.next_in.subarray(this.next_in_index,this.next_in_index+r),e),this.next_in_index+=r,this.total_in+=r,r)},flush_pending:function(){var t=this,e=t.dstate.pending;e>t.avail_out&&(e=t.avail_out),0!==e&&(t.next_out.set(t.dstate.pending_buf.subarray(t.dstate.pending_out,t.dstate.pending_out+e),t.next_out_index),t.next_out_index+=e,t.dstate.pending_out+=e,t.total_out+=e,t.avail_out-=e,t.dstate.pending-=e,0===t.dstate.pending&&(t.dstate.pending_out=0))}};var o=t.zip||t;o.Deflater=o._jzlib_Deflater=function(t){var s=new i,l=new Uint8Array(512),e=t?t.level:-1;void 0===e&&(e=-1),s.deflateInit(e),s.next_out=l,this.append=function(t,e){var n,r=[],i=0,o=0,a=0;if(t.length){s.next_in_index=0,s.next_in=t,s.avail_in=t.length;do{if(s.next_out_index=0,s.avail_out=512,0!=s.deflate(0))throw new Error("deflating: "+s.msg);s.next_out_index&&(512==s.next_out_index?r.push(new Uint8Array(l)):r.push(new Uint8Array(l.subarray(0,s.next_out_index)))),a+=s.next_out_index,e&&0<s.next_in_index&&s.next_in_index!=i&&(e(s.next_in_index),i=s.next_in_index)}while(0<s.avail_in||0===s.avail_out);return n=new Uint8Array(a),r.forEach(function(t){n.set(t,o),o+=t.length}),n}},this.flush=function(){var t,e,n=[],r=0,i=0;do{if(s.next_out_index=0,s.avail_out=512,1!=(t=s.deflate(4))&&0!=t)throw new Error("deflating: "+s.msg);0<512-s.avail_out&&n.push(new Uint8Array(l.subarray(0,s.next_out_index))),i+=s.next_out_index}while(0<s.avail_in||0===s.avail_out);return s.deflateEnd(),e=new Uint8Array(i),n.forEach(function(t){e.set(t,r),r+=t.length}),e}}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")()),("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")()).RGBColor=function(t){var e;t=t||"",this.ok=!1,"#"==t.charAt(0)&&(t=t.substr(1,6)),t=(t=t.replace(/ /g,"")).toLowerCase();var n={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};for(var r in n)t==r&&(t=n[r]);for(var i=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(t){return[parseInt(t[1]),parseInt(t[2]),parseInt(t[3])]}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}}],o=0;o<i.length;o++){var a=i[o].re,s=i[o].process,l=a.exec(t);l&&(e=s(l),this.r=e[0],this.g=e[1],this.b=e[2],this.ok=!0)}this.r=this.r<0||isNaN(this.r)?0:255<this.r?255:this.r,this.g=this.g<0||isNaN(this.g)?0:255<this.g?255:this.g,this.b=this.b<0||isNaN(this.b)?0:255<this.b?255:this.b,this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"},this.toHex=function(){var t=this.r.toString(16),e=this.g.toString(16),n=this.b.toString(16);return 1==t.length&&(t="0"+t),1==e.length&&(e="0"+e),1==n.length&&(n="0"+n),"#"+t+e+n}},function(t){var n="+".charCodeAt(0),r="/".charCodeAt(0),i="0".charCodeAt(0),o="a".charCodeAt(0),a="A".charCodeAt(0),s="-".charCodeAt(0),l="_".charCodeAt(0),u=function(t){var e=t.charCodeAt(0);return e===n||e===s?62:e===r||e===l?63:e<i?-1:e<i+10?e-i+26+26:e<a+26?e-a:e<o+26?e-o+26:void 0};t.API.TTFFont=function(){function i(t,e,n){var r;if(this.rawData=t,r=this.contents=new J(t),this.contents.pos=4,"ttcf"===r.readString(4)){if(!e)throw new Error("Must specify a font name for TTC files.");throw new Error("Font "+e+" not found in TTC file.")}r.pos=0,this.parse(),this.subset=new P(this),this.registerTTF()}return i.open=function(t,e,n,r){if("string"!=typeof n)throw new Error("Invalid argument supplied in TTFFont.open");return new i(function(t){var e,n,r,i,o,a;if(0<t.length%4)throw new Error("Invalid string. Length must be a multiple of 4");var s=t.length;o="="===t.charAt(s-2)?2:"="===t.charAt(s-1)?1:0,a=new Uint8Array(3*t.length/4-o),r=0<o?t.length-4:t.length;var l=0;function h(t){a[l++]=t}for(n=e=0;e<r;e+=4,n+=3)h((16711680&(i=u(t.charAt(e))<<18|u(t.charAt(e+1))<<12|u(t.charAt(e+2))<<6|u(t.charAt(e+3))))>>16),h((65280&i)>>8),h(255&i);return 2===o?h(255&(i=u(t.charAt(e))<<2|u(t.charAt(e+1))>>4)):1===o&&(h((i=u(t.charAt(e))<<10|u(t.charAt(e+1))<<4|u(t.charAt(e+2))>>2)>>8&255),h(255&i)),a}(n),e,r)},i.prototype.parse=function(){return this.directory=new e(this.contents),this.head=new p(this),this.name=new b(this),this.cmap=new y(this),this.toUnicode=new Map,this.hhea=new g(this),this.maxp=new x(this),this.hmtx=new N(this),this.post=new v(this),this.os2=new m(this),this.loca=new F(this),this.glyf=new A(this),this.ascender=this.os2.exists&&this.os2.ascender||this.hhea.ascender,this.decender=this.os2.exists&&this.os2.decender||this.hhea.decender,this.lineGap=this.os2.exists&&this.os2.lineGap||this.hhea.lineGap,this.bbox=[this.head.xMin,this.head.yMin,this.head.xMax,this.head.yMax]},i.prototype.registerTTF=function(){var i,t,e,n,r;if(this.scaleFactor=1e3/this.head.unitsPerEm,this.bbox=function(){var t,e,n,r;for(r=[],t=0,e=(n=this.bbox).length;t<e;t++)i=n[t],r.push(Math.round(i*this.scaleFactor));return r}.call(this),this.stemV=0,this.post.exists?(e=255&(n=this.post.italic_angle),!0&(t=n>>16)&&(t=-(1+(65535^t))),this.italicAngle=+(t+"."+e)):this.italicAngle=0,this.ascender=Math.round(this.ascender*this.scaleFactor),this.decender=Math.round(this.decender*this.scaleFactor),this.lineGap=Math.round(this.lineGap*this.scaleFactor),this.capHeight=this.os2.exists&&this.os2.capHeight||this.ascender,this.xHeight=this.os2.exists&&this.os2.xHeight||0,this.familyClass=(this.os2.exists&&this.os2.familyClass||0)>>8,this.isSerif=1===(r=this.familyClass)||2===r||3===r||4===r||5===r||7===r,this.isScript=10===this.familyClass,this.flags=0,this.post.isFixedPitch&&(this.flags|=1),this.isSerif&&(this.flags|=2),this.isScript&&(this.flags|=8),0!==this.italicAngle&&(this.flags|=64),this.flags|=32,!this.cmap.unicode)throw new Error("No unicode cmap for font")},i.prototype.characterToGlyph=function(t){var e;return(null!=(e=this.cmap.unicode)?e.codeMap[t]:void 0)||0},i.prototype.widthOfGlyph=function(t){var e;return e=1e3/this.head.unitsPerEm,this.hmtx.forGlyph(t).advance*e},i.prototype.widthOfString=function(t,e,n){var r,i,o,a,s;for(i=a=o=0,s=(t=""+t).length;0<=s?a<s:s<a;i=0<=s?++a:--a)r=t.charCodeAt(i),o+=this.widthOfGlyph(this.characterToGlyph(r))+n*(1e3/e)||0;return o*(e/1e3)},i.prototype.lineHeight=function(t,e){var n;return null==e&&(e=!1),n=e?this.lineGap:0,(this.ascender+n-this.decender)/1e3*t},i}();var h,J=function(){function t(t){this.data=null!=t?t:[],this.pos=0,this.length=this.data.length}return t.prototype.readByte=function(){return this.data[this.pos++]},t.prototype.writeByte=function(t){return this.data[this.pos++]=t},t.prototype.readUInt32=function(){return 16777216*this.readByte()+(this.readByte()<<16)+(this.readByte()<<8)+this.readByte()},t.prototype.writeUInt32=function(t){return this.writeByte(t>>>24&255),this.writeByte(t>>16&255),this.writeByte(t>>8&255),this.writeByte(255&t)},t.prototype.readInt32=function(){var t;return 2147483648<=(t=this.readUInt32())?t-4294967296:t},t.prototype.writeInt32=function(t){return t<0&&(t+=4294967296),this.writeUInt32(t)},t.prototype.readUInt16=function(){return this.readByte()<<8|this.readByte()},t.prototype.writeUInt16=function(t){return this.writeByte(t>>8&255),this.writeByte(255&t)},t.prototype.readInt16=function(){var t;return 32768<=(t=this.readUInt16())?t-65536:t},t.prototype.writeInt16=function(t){return t<0&&(t+=65536),this.writeUInt16(t)},t.prototype.readString=function(t){var e,n,r;for(n=[],e=r=0;0<=t?r<t:t<r;e=0<=t?++r:--r)n[e]=String.fromCharCode(this.readByte());return n.join("")},t.prototype.writeString=function(t){var e,n,r,i;for(i=[],e=n=0,r=t.length;0<=r?n<r:r<n;e=0<=r?++n:--n)i.push(this.writeByte(t.charCodeAt(e)));return i},t.prototype.readShort=function(){return this.readInt16()},t.prototype.writeShort=function(t){return this.writeInt16(t)},t.prototype.readLongLong=function(){var t,e,n,r,i,o,a,s;return t=this.readByte(),e=this.readByte(),n=this.readByte(),r=this.readByte(),i=this.readByte(),o=this.readByte(),a=this.readByte(),s=this.readByte(),128&t?-1*(72057594037927940*(255^t)+281474976710656*(255^e)+1099511627776*(255^n)+4294967296*(255^r)+16777216*(255^i)+65536*(255^o)+256*(255^a)+(255^s)+1):72057594037927940*t+281474976710656*e+1099511627776*n+4294967296*r+16777216*i+65536*o+256*a+s},t.prototype.writeLongLong=function(t){var e,n;return e=Math.floor(t/4294967296),n=4294967295&t,this.writeByte(e>>24&255),this.writeByte(e>>16&255),this.writeByte(e>>8&255),this.writeByte(255&e),this.writeByte(n>>24&255),this.writeByte(n>>16&255),this.writeByte(n>>8&255),this.writeByte(255&n)},t.prototype.readInt=function(){return this.readInt32()},t.prototype.writeInt=function(t){return this.writeInt32(t)},t.prototype.read=function(t){var e,n;for(e=[],n=0;0<=t?n<t:t<n;0<=t?++n:--n)e.push(this.readByte());return e},t.prototype.write=function(t){var e,n,r,i;for(i=[],n=0,r=t.length;n<r;n++)e=t[n],i.push(this.writeByte(e));return i},t}(),e=function(){var d;function t(t){var e,n,r;for(this.scalarType=t.readInt(),this.tableCount=t.readShort(),this.searchRange=t.readShort(),this.entrySelector=t.readShort(),this.rangeShift=t.readShort(),this.tables={},n=0,r=this.tableCount;0<=r?n<r:r<n;0<=r?++n:--n)e={tag:t.readString(4),checksum:t.readInt(),offset:t.readInt(),length:t.readInt()},this.tables[e.tag]=e}return t.prototype.encode=function(t){var e,n,r,i,o,a,s,l,h,u,c,f,p;for(p in c=Object.keys(t).length,a=Math.log(2),h=16*Math.floor(Math.log(c)/a),i=Math.floor(h/a),l=16*c-h,(n=new J).writeInt(this.scalarType),n.writeShort(c),n.writeShort(h),n.writeShort(i),n.writeShort(l),r=16*c,s=n.pos+r,o=null,f=[],t)for(u=t[p],n.writeString(p),n.writeInt(d(u)),n.writeInt(s),n.writeInt(u.length),f=f.concat(u),"head"===p&&(o=s),s+=u.length;s%4;)f.push(0),s++;return n.write(f),e=2981146554-d(n.data),n.pos=o+8,n.writeUInt32(e),n.data},d=function(t){var e,n,r,i;for(t=L.call(t);t.length%4;)t.push(0);for(n=new J(t),r=e=0,i=t.length;r<i;r+=4)e+=n.readUInt32();return 4294967295&e},t}(),c={}.hasOwnProperty,f=function(t,e){for(var n in e)c.call(e,n)&&(t[n]=e[n]);function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};h=function(){function t(t){var e;this.file=t,e=this.file.directory.tables[this.tag],this.exists=!!e,e&&(this.offset=e.offset,this.length=e.length,this.parse(this.file.contents))}return t.prototype.parse=function(){},t.prototype.encode=function(){},t.prototype.raw=function(){return this.exists?(this.file.contents.pos=this.offset,this.file.contents.read(this.length)):null},t}();var p=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="head",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.revision=t.readInt(),this.checkSumAdjustment=t.readInt(),this.magicNumber=t.readInt(),this.flags=t.readShort(),this.unitsPerEm=t.readShort(),this.created=t.readLongLong(),this.modified=t.readLongLong(),this.xMin=t.readShort(),this.yMin=t.readShort(),this.xMax=t.readShort(),this.yMax=t.readShort(),this.macStyle=t.readShort(),this.lowestRecPPEM=t.readShort(),this.fontDirectionHint=t.readShort(),this.indexToLocFormat=t.readShort(),this.glyphDataFormat=t.readShort()},e.prototype.encode=function(t){var e;return(e=new J).writeInt(this.version),e.writeInt(this.revision),e.writeInt(this.checkSumAdjustment),e.writeInt(this.magicNumber),e.writeShort(this.flags),e.writeShort(this.unitsPerEm),e.writeLongLong(this.created),e.writeLongLong(this.modified),e.writeShort(this.xMin),e.writeShort(this.yMin),e.writeShort(this.xMax),e.writeShort(this.yMax),e.writeShort(this.macStyle),e.writeShort(this.lowestRecPPEM),e.writeShort(this.fontDirectionHint),e.writeShort(t),e.writeShort(this.glyphDataFormat),e.data},e}(),d=function(){function t(n,t){var e,r,i,o,a,s,l,h,u,c,f,p,d,g,m,y,v,w;switch(this.platformID=n.readUInt16(),this.encodingID=n.readShort(),this.offset=t+n.readInt(),u=n.pos,n.pos=this.offset,this.format=n.readUInt16(),this.length=n.readUInt16(),this.language=n.readUInt16(),this.isUnicode=3===this.platformID&&1===this.encodingID&&4===this.format||0===this.platformID&&4===this.format,this.codeMap={},this.format){case 0:for(s=m=0;m<256;s=++m)this.codeMap[s]=n.readByte();break;case 4:for(f=n.readUInt16(),c=f/2,n.pos+=6,i=function(){var t,e;for(e=[],s=t=0;0<=c?t<c:c<t;s=0<=c?++t:--t)e.push(n.readUInt16());return e}(),n.pos+=2,d=function(){var t,e;for(e=[],s=t=0;0<=c?t<c:c<t;s=0<=c?++t:--t)e.push(n.readUInt16());return e}(),l=function(){var t,e;for(e=[],s=t=0;0<=c?t<c:c<t;s=0<=c?++t:--t)e.push(n.readUInt16());return e}(),h=function(){var t,e;for(e=[],s=t=0;0<=c?t<c:c<t;s=0<=c?++t:--t)e.push(n.readUInt16());return e}(),r=(this.length-n.pos+this.offset)/2,a=function(){var t,e;for(e=[],s=t=0;0<=r?t<r:r<t;s=0<=r?++t:--t)e.push(n.readUInt16());return e}(),s=y=0,w=i.length;y<w;s=++y)for(g=i[s],e=v=p=d[s];p<=g?v<=g:g<=v;e=p<=g?++v:--v)0===h[s]?o=e+l[s]:0!==(o=a[h[s]/2+(e-p)-(c-s)]||0)&&(o+=l[s]),this.codeMap[e]=65535&o}n.pos=u}return t.encode=function(t,e){var n,r,i,o,a,s,l,h,u,c,f,p,d,g,m,y,v,w,b,x,N,L,A,S,_,F,P,k,I,C,B,j,E,M,O,q,T,R,D,U,z,H,W,V,G,Y;switch(k=new J,o=Object.keys(t).sort(function(t,e){return t-e}),e){case"macroman":for(d=0,g=function(){var t,e;for(e=[],p=t=0;t<256;p=++t)e.push(0);return e}(),y={0:0},i={},I=0,E=o.length;I<E;I++)null==y[W=t[r=o[I]]]&&(y[W]=++d),i[r]={old:t[r],new:y[t[r]]},g[r]=y[t[r]];return k.writeUInt16(1),k.writeUInt16(0),k.writeUInt32(12),k.writeUInt16(0),k.writeUInt16(262),k.writeUInt16(0),k.write(g),{charMap:i,subtable:k.data,maxGlyphID:d+1};case"unicode":for(F=[],u=[],y={},n={},m=l=null,C=v=0,M=o.length;C<M;C++)null==y[b=t[r=o[C]]]&&(y[b]=++v),n[r]={old:b,new:y[b]},a=y[b]-r,null!=m&&a===l||(m&&u.push(m),F.push(r),l=a),m=r;for(m&&u.push(m),u.push(65535),F.push(65535),S=2*(A=F.length),L=2*Math.pow(Math.log(A)/Math.LN2,2),c=Math.log(L/2)/Math.LN2,N=2*A-L,s=[],x=[],f=[],p=B=0,O=F.length;B<O;p=++B){if(_=F[p],h=u[p],65535===_){s.push(0),x.push(0);break}if(32768<=_-(P=n[_].new))for(s.push(0),x.push(2*(f.length+A-p)),r=j=_;_<=h?j<=h:h<=j;r=_<=h?++j:--j)f.push(n[r].new);else s.push(P-_),x.push(0)}for(k.writeUInt16(3),k.writeUInt16(1),k.writeUInt32(12),k.writeUInt16(4),k.writeUInt16(16+8*A+2*f.length),k.writeUInt16(0),k.writeUInt16(S),k.writeUInt16(L),k.writeUInt16(c),k.writeUInt16(N),z=0,q=u.length;z<q;z++)r=u[z],k.writeUInt16(r);for(k.writeUInt16(0),H=0,T=F.length;H<T;H++)r=F[H],k.writeUInt16(r);for(V=0,R=s.length;V<R;V++)a=s[V],k.writeUInt16(a);for(G=0,D=x.length;G<D;G++)w=x[G],k.writeUInt16(w);for(Y=0,U=f.length;Y<U;Y++)d=f[Y],k.writeUInt16(d);return{charMap:n,subtable:k.data,maxGlyphID:v+1}}},t}(),y=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="cmap",e.prototype.parse=function(t){var e,n,r;for(t.pos=this.offset,this.version=t.readUInt16(),n=t.readUInt16(),this.tables=[],this.unicode=null,r=0;0<=n?r<n:n<r;0<=n?++r:--r)e=new d(t,this.offset),this.tables.push(e),e.isUnicode&&null==this.unicode&&(this.unicode=e);return!0},e.encode=function(t,e){var n,r;return null==e&&(e="macroman"),n=d.encode(t,e),(r=new J).writeUInt16(0),r.writeUInt16(1),n.table=r.data.concat(n.subtable),n},e}(),g=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="hhea",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.ascender=t.readShort(),this.decender=t.readShort(),this.lineGap=t.readShort(),this.advanceWidthMax=t.readShort(),this.minLeftSideBearing=t.readShort(),this.minRightSideBearing=t.readShort(),this.xMaxExtent=t.readShort(),this.caretSlopeRise=t.readShort(),this.caretSlopeRun=t.readShort(),this.caretOffset=t.readShort(),t.pos+=8,this.metricDataFormat=t.readShort(),this.numberOfMetrics=t.readUInt16()},e}(),m=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="OS/2",e.prototype.parse=function(n){if(n.pos=this.offset,this.version=n.readUInt16(),this.averageCharWidth=n.readShort(),this.weightClass=n.readUInt16(),this.widthClass=n.readUInt16(),this.type=n.readShort(),this.ySubscriptXSize=n.readShort(),this.ySubscriptYSize=n.readShort(),this.ySubscriptXOffset=n.readShort(),this.ySubscriptYOffset=n.readShort(),this.ySuperscriptXSize=n.readShort(),this.ySuperscriptYSize=n.readShort(),this.ySuperscriptXOffset=n.readShort(),this.ySuperscriptYOffset=n.readShort(),this.yStrikeoutSize=n.readShort(),this.yStrikeoutPosition=n.readShort(),this.familyClass=n.readShort(),this.panose=function(){var t,e;for(e=[],t=0;t<10;++t)e.push(n.readByte());return e}(),this.charRange=function(){var t,e;for(e=[],t=0;t<4;++t)e.push(n.readInt());return e}(),this.vendorID=n.readString(4),this.selection=n.readShort(),this.firstCharIndex=n.readShort(),this.lastCharIndex=n.readShort(),0<this.version&&(this.ascent=n.readShort(),this.descent=n.readShort(),this.lineGap=n.readShort(),this.winAscent=n.readShort(),this.winDescent=n.readShort(),this.codePageRange=function(){var t,e;for(e=[],t=0;t<2;++t)e.push(n.readInt());return e}(),1<this.version))return this.xHeight=n.readShort(),this.capHeight=n.readShort(),this.defaultChar=n.readShort(),this.breakChar=n.readShort(),this.maxContext=n.readShort()},e}(),v=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="post",e.prototype.parse=function(r){var t,e,n,i;switch(r.pos=this.offset,this.format=r.readInt(),this.italicAngle=r.readInt(),this.underlinePosition=r.readShort(),this.underlineThickness=r.readShort(),this.isFixedPitch=r.readInt(),this.minMemType42=r.readInt(),this.maxMemType42=r.readInt(),this.minMemType1=r.readInt(),this.maxMemType1=r.readInt(),this.format){case 65536:break;case 131072:for(e=r.readUInt16(),this.glyphNameIndex=[],n=0;0<=e?n<e:e<n;0<=e?++n:--n)this.glyphNameIndex.push(r.readUInt16());for(this.names=[],i=[];r.pos<this.offset+this.length;)t=r.readByte(),i.push(this.names.push(r.readString(t)));return i;case 151552:return e=r.readUInt16(),this.offsets=r.read(e);case 196608:break;case 262144:return this.map=function(){var t,e,n;for(n=[],t=0,e=this.file.maxp.numGlyphs;0<=e?t<e:e<t;0<=e?++t:--t)n.push(r.readUInt32());return n}.call(this)}},e}(),w=function(t,e){this.raw=t,this.length=t.length,this.platformID=e.platformID,this.encodingID=e.encodingID,this.languageID=e.languageID},b=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="name",e.prototype.parse=function(t){var e,n,r,i,o,a,s,l,h,u,c,f;for(t.pos=this.offset,t.readShort(),e=t.readShort(),a=t.readShort(),n=[],i=h=0;0<=e?h<e:e<h;i=0<=e?++h:--h)n.push({platformID:t.readShort(),encodingID:t.readShort(),languageID:t.readShort(),nameID:t.readShort(),length:t.readShort(),offset:this.offset+a+t.readShort()});for(s={},i=u=0,c=n.length;u<c;i=++u)r=n[i],t.pos=r.offset,l=t.readString(r.length),o=new w(l,r),null==s[f=r.nameID]&&(s[f]=[]),s[r.nameID].push(o);this.strings=s,this.copyright=s[0],this.fontFamily=s[1],this.fontSubfamily=s[2],this.uniqueSubfamily=s[3],this.fontName=s[4],this.version=s[5];try{this.postscriptName=s[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g,"")}catch(t){this.postscriptName=s[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g,"")}return this.trademark=s[7],this.manufacturer=s[8],this.designer=s[9],this.description=s[10],this.vendorUrl=s[11],this.designerUrl=s[12],this.license=s[13],this.licenseUrl=s[14],this.preferredFamily=s[15],this.preferredSubfamily=s[17],this.compatibleFull=s[18],this.sampleText=s[19]},e}(),x=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="maxp",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.numGlyphs=t.readUInt16(),this.maxPoints=t.readUInt16(),this.maxContours=t.readUInt16(),this.maxCompositePoints=t.readUInt16(),this.maxComponentContours=t.readUInt16(),this.maxZones=t.readUInt16(),this.maxTwilightPoints=t.readUInt16(),this.maxStorage=t.readUInt16(),this.maxFunctionDefs=t.readUInt16(),this.maxInstructionDefs=t.readUInt16(),this.maxStackElements=t.readUInt16(),this.maxSizeOfInstructions=t.readUInt16(),this.maxComponentElements=t.readUInt16(),this.maxComponentDepth=t.readUInt16()},e}(),N=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="hmtx",e.prototype.parse=function(n){var t,r,i,e,o,a,s;for(n.pos=this.offset,this.metrics=[],e=0,a=this.file.hhea.numberOfMetrics;0<=a?e<a:a<e;0<=a?++e:--e)this.metrics.push({advance:n.readUInt16(),lsb:n.readInt16()});for(r=this.file.maxp.numGlyphs-this.file.hhea.numberOfMetrics,this.leftSideBearings=function(){var t,e;for(e=[],t=0;0<=r?t<r:r<t;0<=r?++t:--t)e.push(n.readInt16());return e}(),this.widths=function(){var t,e,n,r;for(r=[],t=0,e=(n=this.metrics).length;t<e;t++)i=n[t],r.push(i.advance);return r}.call(this),t=this.widths[this.widths.length-1],s=[],o=0;0<=r?o<r:r<o;0<=r?++o:--o)s.push(this.widths.push(t));return s},e.prototype.forGlyph=function(t){return t in this.metrics?this.metrics[t]:{advance:this.metrics[this.metrics.length-1].advance,lsb:this.leftSideBearings[t-this.metrics.length]}},e}(),L=[].slice,A=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="glyf",e.prototype.parse=function(t){return this.cache={}},e.prototype.glyphFor=function(t){var e,n,r,i,o,a,s,l,h,u;return(t=t)in this.cache?this.cache[t]:(i=this.file.loca,e=this.file.contents,n=i.indexOf(t),0===(r=i.lengthOf(t))?this.cache[t]=null:(e.pos=this.offset+n,o=(a=new J(e.read(r))).readShort(),l=a.readShort(),u=a.readShort(),s=a.readShort(),h=a.readShort(),this.cache[t]=-1===o?new _(a,l,u,s,h):new S(a,o,l,u,s,h),this.cache[t]))},e.prototype.encode=function(t,e,n){var r,i,o,a,s;for(o=[],i=[],a=0,s=e.length;a<s;a++)r=t[e[a]],i.push(o.length),r&&(o=o.concat(r.encode(n)));return i.push(o.length),{table:o,offsets:i}},e}(),S=function(){function t(t,e,n,r,i,o){this.raw=t,this.numberOfContours=e,this.xMin=n,this.yMin=r,this.xMax=i,this.yMax=o,this.compound=!1}return t.prototype.encode=function(){return this.raw.data},t}(),_=function(){function t(t,e,n,r,i){var o,a;for(this.raw=t,this.xMin=e,this.yMin=n,this.xMax=r,this.yMax=i,this.compound=!0,this.glyphIDs=[],this.glyphOffsets=[],o=this.raw;a=o.readShort(),this.glyphOffsets.push(o.pos),this.glyphIDs.push(o.readShort()),32&a;)o.pos+=1&a?4:2,128&a?o.pos+=8:64&a?o.pos+=4:8&a&&(o.pos+=2)}return 1,8,32,64,128,t.prototype.encode=function(t){var e,n,r,i,o;for(n=new J(L.call(this.raw.data)),e=r=0,i=(o=this.glyphIDs).length;r<i;e=++r)o[e],n.pos=this.glyphOffsets[e];return n.data},t}(),F=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return f(e,h),e.prototype.tag="loca",e.prototype.parse=function(r){var t;return r.pos=this.offset,t=this.file.head.indexToLocFormat,this.offsets=0===t?function(){var t,e,n;for(n=[],t=0,e=this.length;t<e;t+=2)n.push(2*r.readUInt16());return n}.call(this):function(){var t,e,n;for(n=[],t=0,e=this.length;t<e;t+=4)n.push(r.readUInt32());return n}.call(this)},e.prototype.indexOf=function(t){return this.offsets[t]},e.prototype.lengthOf=function(t){return this.offsets[t+1]-this.offsets[t]},e.prototype.encode=function(t,e){for(var n=new Uint32Array(this.offsets.length),r=0,i=0,o=0;o<n.length;++o)if(n[o]=r,i<e.length&&e[i]==o){++i,n[o]=r;var a=this.offsets[o],s=this.offsets[o+1]-a;0<s&&(r+=s)}for(var l=new Array(4*n.length),h=0;h<n.length;++h)l[4*h+3]=255&n[h],l[4*h+2]=(65280&n[h])>>8,l[4*h+1]=(16711680&n[h])>>16,l[4*h]=(4278190080&n[h])>>24;return l},e}(),P=function(){function t(t){this.font=t,this.subset={},this.unicodes={},this.next=33}return t.prototype.generateCmap=function(){var t,e,n,r,i;for(e in r=this.font.cmap.tables[0].codeMap,t={},i=this.subset)n=i[e],t[e]=r[n];return t},t.prototype.glyphsFor=function(t){var e,n,r,i,o,a,s;for(r={},o=0,a=t.length;o<a;o++)r[i=t[o]]=this.font.glyf.glyphFor(i);for(i in e=[],r)(null!=(n=r[i])?n.compound:void 0)&&e.push.apply(e,n.glyphIDs);if(0<e.length)for(i in s=this.glyphsFor(e))n=s[i],r[i]=n;return r},t.prototype.encode=function(t,e){var n,r,i,o,a,s,l,h,u,c,f,p,d,g,m;for(r in n=y.encode(this.generateCmap(),"unicode"),o=this.glyphsFor(t),f={0:0},m=n.charMap)f[(s=m[r]).old]=s.new;for(p in c=n.maxGlyphID,o)p in f||(f[p]=c++);return h=function(t){var e,n;for(e in n={},t)n[t[e]]=e;return n}(f),u=Object.keys(h).sort(function(t,e){return t-e}),d=function(){var t,e,n;for(n=[],t=0,e=u.length;t<e;t++)a=u[t],n.push(h[a]);return n}(),i=this.font.glyf.encode(o,d,f),l=this.font.loca.encode(i.offsets,d),g={cmap:this.font.cmap.raw(),glyf:i.table,loca:l,hmtx:this.font.hmtx.raw(),hhea:this.font.hhea.raw(),maxp:this.font.maxp.raw(),post:this.font.post.raw(),name:this.font.name.raw(),head:this.font.head.encode(e)},this.font.os2.exists&&(g["OS/2"]=this.font.os2.raw()),this.font.directory.encode(g)},t}();t.API.PDFObject=function(){var o;function a(){}return o=function(t,e){return(Array(e+1).join("0")+t).slice(-e)},a.convert=function(r){var i,t,e,n;if(Array.isArray(r))return"["+function(){var t,e,n;for(n=[],t=0,e=r.length;t<e;t++)i=r[t],n.push(a.convert(i));return n}().join(" ")+"]";if("string"==typeof r)return"/"+r;if(null!=r?r.isString:void 0)return"("+r+")";if(r instanceof Date)return"(D:"+o(r.getUTCFullYear(),4)+o(r.getUTCMonth(),2)+o(r.getUTCDate(),2)+o(r.getUTCHours(),2)+o(r.getUTCMinutes(),2)+o(r.getUTCSeconds(),2)+"Z)";if("[object Object]"!=={}.toString.call(r))return""+r;for(t in e=["<<"],r)n=r[t],e.push("/"+t+" "+a.convert(n));return e.push(">>"),e.join("\n")},a}()}(lt),
/*
  # PNG.js
  # Copyright (c) 2011 Devon Govett
  # MIT LICENSE
  # 
  # 
  */
Nt="undefined"!=typeof self&&self||"undefined"!=typeof window&&window||"undefined"!=typeof global&&global||Function('return typeof this === "object" && this.content')()||Function("return this")(),Lt=function(){var h,n,r;function i(t){var e,n,r,i,o,a,s,l,h,u,c,f,p,d;for(this.data=t,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.animation=null,this.text={},a=null;;){switch(e=this.readUInt32(),h=function(){var t,e;for(e=[],t=0;t<4;++t)e.push(String.fromCharCode(this.data[this.pos++]));return e}.call(this).join("")){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};break;case"PLTE":this.palette=this.read(e);break;case"fcTL":a&&this.animation.frames.push(a),this.pos+=4,a={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()},o=this.readUInt16(),i=this.readUInt16()||100,a.delay=1e3*o/i,a.disposeOp=this.data[this.pos++],a.blendOp=this.data[this.pos++],a.data=[];break;case"IDAT":case"fdAT":for("fdAT"===h&&(this.pos+=4,e-=4),t=(null!=a?a.data:void 0)||this.imgData,f=0;0<=e?f<e:e<f;0<=e?++f:--f)t.push(this.data[this.pos++]);break;case"tRNS":switch(this.transparency={},this.colorType){case 3:if(r=this.palette.length/3,this.transparency.indexed=this.read(e),this.transparency.indexed.length>r)throw new Error("More transparent colors than palette size");if(0<(u=r-this.transparency.indexed.length))for(p=0;0<=u?p<u:u<p;0<=u?++p:--p)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(e)[0];break;case 2:this.transparency.rgb=this.read(e)}break;case"tEXt":s=(c=this.read(e)).indexOf(0),l=String.fromCharCode.apply(String,c.slice(0,s)),this.text[l]=String.fromCharCode.apply(String,c.slice(s+1));break;case"IEND":return a&&this.animation.frames.push(a),this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}.call(this),this.hasAlphaChannel=4===(d=this.colorType)||6===d,n=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*n,this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}.call(this),void(this.imgData=new Uint8Array(this.imgData));default:this.pos+=e}if(this.pos+=4,this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}i.load=function(t,e,n){var r;return"function"==typeof e&&(n=e),(r=new XMLHttpRequest).open("GET",t,!0),r.responseType="arraybuffer",r.onload=function(){var t;return t=new i(new Uint8Array(r.response||r.mozResponseArrayBuffer)),"function"==typeof(null!=e?e.getContext:void 0)&&t.render(e),"function"==typeof n?n(t):void 0},r.send(null)},i.prototype.read=function(t){var e,n;for(n=[],e=0;0<=t?e<t:t<e;0<=t?++e:--e)n.push(this.data[this.pos++]);return n},i.prototype.readUInt32=function(){return this.data[this.pos++]<<24|this.data[this.pos++]<<16|this.data[this.pos++]<<8|this.data[this.pos++]},i.prototype.readUInt16=function(){return this.data[this.pos++]<<8|this.data[this.pos++]},i.prototype.decodePixels=function(C){var B=this.pixelBitlength/8,j=new Uint8Array(this.width*this.height*B),E=0,M=this;if(null==C&&(C=this.imgData),0===C.length)return new Uint8Array(0);function t(t,e,n,r){var i,o,a,s,l,h,u,c,f,p,d,g,m,y,v,w,b,x,N,L,A,S=Math.ceil((M.width-t)/n),_=Math.ceil((M.height-e)/r),F=M.width==S&&M.height==_;for(y=B*S,g=F?j:new Uint8Array(y*_),h=C.length,o=m=0;m<_&&E<h;){switch(C[E++]){case 0:for(s=b=0;b<y;s=b+=1)g[o++]=C[E++];break;case 1:for(s=x=0;x<y;s=x+=1)i=C[E++],l=s<B?0:g[o-B],g[o++]=(i+l)%256;break;case 2:for(s=N=0;N<y;s=N+=1)i=C[E++],a=(s-s%B)/B,v=m&&g[(m-1)*y+a*B+s%B],g[o++]=(v+i)%256;break;case 3:for(s=L=0;L<y;s=L+=1)i=C[E++],a=(s-s%B)/B,l=s<B?0:g[o-B],v=m&&g[(m-1)*y+a*B+s%B],g[o++]=(i+Math.floor((l+v)/2))%256;break;case 4:for(s=A=0;A<y;s=A+=1)i=C[E++],a=(s-s%B)/B,l=s<B?0:g[o-B],0===m?v=w=0:(v=g[(m-1)*y+a*B+s%B],w=a&&g[(m-1)*y+(a-1)*B+s%B]),u=l+v-w,c=Math.abs(u-l),p=Math.abs(u-v),d=Math.abs(u-w),f=c<=p&&c<=d?l:p<=d?v:w,g[o++]=(i+f)%256;break;default:throw new Error("Invalid filter algorithm: "+C[E-1])}if(!F){var P=((e+m*r)*M.width+t)*B,k=m*y;for(s=0;s<S;s+=1){for(var I=0;I<B;I+=1)j[P++]=g[k++];P+=(n-1)*B}}m++}}return C=(C=new kt(C)).getBytes(),1==M.interlaceMethod?(t(0,0,8,8),t(4,0,8,8),t(0,4,4,8),t(2,0,4,4),t(0,2,2,4),t(1,0,2,2),t(0,1,1,2)):t(0,0,1,1),j},i.prototype.decodePalette=function(){var t,e,n,r,i,o,a,s,l;for(n=this.palette,o=this.transparency.indexed||[],i=new Uint8Array((o.length||0)+n.length),r=0,n.length,e=a=t=0,s=n.length;a<s;e=a+=3)i[r++]=n[e],i[r++]=n[e+1],i[r++]=n[e+2],i[r++]=null!=(l=o[t++])?l:255;return i},i.prototype.copyToImageData=function(t,e){var n,r,i,o,a,s,l,h,u,c,f;if(r=this.colors,u=null,n=this.hasAlphaChannel,this.palette.length&&(u=null!=(f=this._decodedPalette)?f:this._decodedPalette=this.decodePalette(),r=4,n=!0),h=(i=t.data||t).length,a=u||e,o=s=0,1===r)for(;o<h;)l=u?4*e[o/4]:s,c=a[l++],i[o++]=c,i[o++]=c,i[o++]=c,i[o++]=n?a[l++]:255,s=l;else for(;o<h;)l=u?4*e[o/4]:s,i[o++]=a[l++],i[o++]=a[l++],i[o++]=a[l++],i[o++]=n?a[l++]:255,s=l},i.prototype.decode=function(){var t;return t=new Uint8Array(this.width*this.height*4),this.copyToImageData(t,this.decodePixels()),t};try{n=Nt.document.createElement("canvas"),r=n.getContext("2d")}catch(t){return-1}return h=function(t){var e;return r.width=t.width,r.height=t.height,r.clearRect(0,0,t.width,t.height),r.putImageData(t,0,0),(e=new Image).src=n.toDataURL(),e},i.prototype.decodeFrames=function(t){var e,n,r,i,o,a,s,l;if(this.animation){for(l=[],n=o=0,a=(s=this.animation.frames).length;o<a;n=++o)e=s[n],r=t.createImageData(e.width,e.height),i=this.decodePixels(new Uint8Array(e.data)),this.copyToImageData(r,i),e.imageData=r,l.push(e.image=h(r));return l}},i.prototype.renderFrame=function(t,e){var n,r,i;return n=(r=this.animation.frames)[e],i=r[e-1],0===e&&t.clearRect(0,0,this.width,this.height),1===(null!=i?i.disposeOp:void 0)?t.clearRect(i.xOffset,i.yOffset,i.width,i.height):2===(null!=i?i.disposeOp:void 0)&&t.putImageData(i.imageData,i.xOffset,i.yOffset),0===n.blendOp&&t.clearRect(n.xOffset,n.yOffset,n.width,n.height),t.drawImage(n.image,n.xOffset,n.yOffset)},i.prototype.animate=function(n){var r,i,o,a,s,t,l=this;return i=0,t=this.animation,a=t.numFrames,o=t.frames,s=t.numPlays,(r=function(){var t,e;if(t=i++%a,e=o[t],l.renderFrame(n,t),1<a&&i/a<s)return l.animation._timeout=setTimeout(r,e.delay)})()},i.prototype.stopAnimation=function(){var t;return clearTimeout(null!=(t=this.animation)?t._timeout:void 0)},i.prototype.render=function(t){var e,n;return t._png&&t._png.stopAnimation(),t._png=this,t.width=this.width,t.height=this.height,e=t.getContext("2d"),this.animation?(this.decodeFrames(e),this.animate(e)):(n=e.createImageData(this.width,this.height),this.copyToImageData(n,this.decodePixels()),e.putImageData(n,0,0))},i}(),Nt.PNG=Lt;
/*
   * Extracted from pdf.js
   * https://github.com/andreasgal/pdf.js
   *
   * Copyright (c) 2011 Mozilla Foundation
   *
   * Contributors: Andreas Gal <gal@mozilla.com>
   *               Chris G Jones <cjones@mozilla.com>
   *               Shaon Barman <shaon.barman@gmail.com>
   *               Vivien Nicolas <21@vingtetun.org>
   *               Justin D'Arcangelo <justindarc@gmail.com>
   *               Yury Delendik
   *
   * 
   */
var Pt=function(){function t(){this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=null}return t.prototype={ensureBuffer:function(t){var e=this.buffer,n=e?e.byteLength:0;if(t<n)return e;for(var r=512;r<t;)r<<=1;for(var i=new Uint8Array(r),o=0;o<n;++o)i[o]=e[o];return this.buffer=i},getByte:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return this.buffer[this.pos++]},getBytes:function(t){var e=this.pos;if(t){this.ensureBuffer(e+t);for(var n=e+t;!this.eof&&this.bufferLength<n;)this.readBlock();var r=this.bufferLength;r<n&&(n=r)}else{for(;!this.eof;)this.readBlock();n=this.bufferLength}return this.pos=n,this.buffer.subarray(e,n)},lookChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return String.fromCharCode(this.buffer[this.pos])},getChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock()}return String.fromCharCode(this.buffer[this.pos++])},makeSubStream:function(t,e,n){for(var r=t+e;this.bufferLength<=r&&!this.eof;)this.readBlock();return new Stream(this.buffer,t,e,n)},skip:function(t){t||(t=1),this.pos+=t},reset:function(){this.pos=0}},t}(),kt=function(){if("undefined"!=typeof Uint32Array){var k=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),I=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),C=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),B=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],j=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];return(t.prototype=Object.create(Pt.prototype)).getBits=function(t){for(var e,n=this.codeSize,r=this.codeBuf,i=this.bytes,o=this.bytesPos;n<t;)void 0===(e=i[o++])&&E("Bad encoding in flate stream"),r|=e<<n,n+=8;return e=r&(1<<t)-1,this.codeBuf=r>>t,this.codeSize=n-=t,this.bytesPos=o,e},t.prototype.getCode=function(t){for(var e=t[0],n=t[1],r=this.codeSize,i=this.codeBuf,o=this.bytes,a=this.bytesPos;r<n;){var s;void 0===(s=o[a++])&&E("Bad encoding in flate stream"),i|=s<<r,r+=8}var l=e[i&(1<<n)-1],h=l>>16,u=65535&l;return(0==r||r<h||0==h)&&E("Bad encoding in flate stream"),this.codeBuf=i>>h,this.codeSize=r-h,this.bytesPos=a,u},t.prototype.generateHuffmanTable=function(t){for(var e=t.length,n=0,r=0;r<e;++r)t[r]>n&&(n=t[r]);for(var i=1<<n,o=new Uint32Array(i),a=1,s=0,l=2;a<=n;++a,s<<=1,l<<=1)for(var h=0;h<e;++h)if(t[h]==a){var u=0,c=s;for(r=0;r<a;++r)u=u<<1|1&c,c>>=1;for(r=u;r<i;r+=l)o[r]=a<<16|h;++s}return[o,n]},t.prototype.readBlock=function(){function t(t,e,n,r,i){for(var o=t.getBits(n)+r;0<o--;)e[l++]=i}var e=this.getBits(3);if(1&e&&(this.eof=!0),0!=(e>>=1)){var n,r;if(1==e)n=B,r=j;else if(2==e){for(var i=this.getBits(5)+257,o=this.getBits(5)+1,a=this.getBits(4)+4,s=Array(k.length),l=0;l<a;)s[k[l++]]=this.getBits(3);for(var h=this.generateHuffmanTable(s),u=0,c=(l=0,i+o),f=new Array(c);l<c;){var p=this.getCode(h);16==p?t(this,f,2,3,u):17==p?t(this,f,3,3,u=0):18==p?t(this,f,7,11,u=0):f[l++]=u=p}n=this.generateHuffmanTable(f.slice(0,i)),r=this.generateHuffmanTable(f.slice(i,c))}else E("Unknown block type in flate stream");for(var d=(_=this.buffer)?_.length:0,g=this.bufferLength;;){var m=this.getCode(n);if(m<256)d<=g+1&&(d=(_=this.ensureBuffer(g+1)).length),_[g++]=m;else{if(256==m)return void(this.bufferLength=g);var y=(m=I[m-=257])>>16;0<y&&(y=this.getBits(y));u=(65535&m)+y;m=this.getCode(r),0<(y=(m=C[m])>>16)&&(y=this.getBits(y));var v=(65535&m)+y;d<=g+u&&(d=(_=this.ensureBuffer(g+u)).length);for(var w=0;w<u;++w,++g)_[g]=_[g-v]}}}else{var b,x=this.bytes,N=this.bytesPos;void 0===(b=x[N++])&&E("Bad block header in flate stream");var L=b;void 0===(b=x[N++])&&E("Bad block header in flate stream"),L|=b<<8,void 0===(b=x[N++])&&E("Bad block header in flate stream");var A=b;void 0===(b=x[N++])&&E("Bad block header in flate stream"),(A|=b<<8)!=(65535&~L)&&E("Bad uncompressed block length in flate stream"),this.codeBuf=0,this.codeSize=0;var S=this.bufferLength,_=this.ensureBuffer(S+L),F=S+L;this.bufferLength=F;for(var P=S;P<F;++P){if(void 0===(b=x[N++])){this.eof=!0;break}_[P]=b}this.bytesPos=N}},t}function E(t){throw new Error(t)}function t(t){var e=0,n=t[e++],r=t[e++];-1!=n&&-1!=r||E("Invalid header in flate stream"),8!=(15&n)&&E("Unknown compression method in flate stream"),((n<<8)+r)%31!=0&&E("Bad FCHECK in flate stream"),32&r&&E("FDICT bit set in flate stream"),this.bytes=t,this.bytesPos=2,this.codeSize=0,this.codeBuf=0,Pt.call(this)}}();window.tmp=kt});try{module.exports=jsPDF}catch(t){}
//*Export to PDF*//

//*Export to PDF auto table*//



//*Export to PDF auto table*//


/*CanvasNote export.js  Original*/


const wordToHex = {
    aliceblue: "#F0F8FF",
    antiquewhite: "#FAEBD7",
    aqua: "#00FFFF",
    aquamarine: "#7FFFD4",
    azure: "#F0FFFF",
    beige: "#F5F5DC",
    bisque: "#FFE4C4",
    black: "#000000",
    blanchedalmond: "#FFEBCD",
    blue: "#0000FF",
    blueviolet: "#8A2BE2",
    brown: "#A52A2A",
    burlywood: "#DEB887",
    cadetblue: "#5F9EA0",
    chartreuse: "#7FFF00",
    chocolate: "#D2691E",
    coral: "#FF7F50",
    cornflowerblue: "#6495ED",
    cornsilk: "#FFF8DC",
    crimson: "#DC143C",
    cyan: "#00FFFF",
    darkblue: "#00008B",
    darkcyan: "#008B8B",
    darkgoldenrod: "#B8860B",
    darkgray: "#A9A9A9",
    darkgrey: "#A9A9A9",
    darkgreen: "#006400",
    darkkhaki: "#BDB76B",
    darkmagenta: "#8B008B",
    darkolivegreen: "#556B2F",
    darkorange: "#FF8C00",
    darkorchid: "#9932CC",
    darkred: "#8B0000",
    darksalmon: "#E9967A",
    darkseagreen: "#8FBC8F",
    darkslateblue: "#483D8B",
    darkslategray: "#2F4F4F",
    darkslategrey: "#2F4F4F",
    darkturquoise: "#00CED1",
    darkviolet: "#9400D3",
    deeppink: "#FF1493",
    deepskyblue: "#00BFFF",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1E90FF",
    firebrick: "#B22222",
    floralwhite: "#FFFAF0",
    forestgreen: "#228B22",
    fuchsia: "#FF00FF",
    gainsboro: "#DCDCDC",
    ghostwhite: "#F8F8FF",
    gold: "#FFD700",
    goldenrod: "#DAA520",
    gray: "#808080",
    grey: "#808080",
    green: "#008000",
    greenyellow: "#ADFF2F",
    honeydew: "#F0FFF0",
    hotpink: "#FF69B4",
    indianred: "#CD5C5C",
    indigo: "#4B0082",
    ivory: "#FFFFF0",
    khaki: "#F0E68C",
    lavender: "#E6E6FA",
    lavenderblush: "#FFF0F5",
    lawngreen: "#7CFC00",
    lemonchiffon: "#FFFACD",
    lightblue: "#ADD8E6",
    lightcoral: "#F08080",
    lightcyan: "#E0FFFF",
    lightgoldenrodyellow: "#FAFAD2",
    lightgray: "#D3D3D3",
    lightgrey: "#D3D3D3",
    lightgreen: "#90EE90",
    lightpink: "#FFB6C1",
    lightsalmon: "#FFA07A",
    lightseagreen: "#20B2AA",
    lightskyblue: "#87CEFA",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#B0C4DE",
    lightyellow: "#FFFFE0",
    lime: "#00FF00",
    limegreen: "#32CD32",
    linen: "#FAF0E6",
    magenta: "#FF00FF",
    maroon: "#800000",
    mediumaquamarine: "#66CDAA",
    mediumblue: "#0000CD",
    mediumorchid: "#BA55D3",
    mediumpurple: "#9370DB",
    mediumseagreen: "#3CB371",
    mediumslateblue: "#7B68EE",
    mediumspringgreen: "#00FA9A",
    mediumturquoise: "#48D1CC",
    mediumvioletred: "#C71585",
    midnightblue: "#191970",
    mintcream: "#F5FFFA",
    mistyrose: "#FFE4E1",
    moccasin: "#FFE4B5",
    navajowhite: "#FFDEAD",
    navy: "#000080",
    oldlace: "#FDF5E6",
    olive: "#808000",
    olivedrab: "#6B8E23",
    orange: "#FFA500",
    orangered: "#FF4500",
    orchid: "#DA70D6",
    palegoldenrod: "#EEE8AA",
    palegreen: "#98FB98",
    paleturquoise: "#AFEEEE",
    palevioletred: "#DB7093",
    papayawhip: "#FFEFD5",
    peachpuff: "#FFDAB9",
    peru: "#CD853F",
    pink: "#FFC0CB",
    plum: "#DDA0DD",
    powderblue: "#B0E0E6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#FF0000",
    rosybrown: "#BC8F8F",
    royalblue: "#4169E1",
    saddlebrown: "#8B4513",
    salmon: "#FA8072",
    sandybrown: "#F4A460",
    seagreen: "#2E8B57",
    seashell: "#FFF5EE",
    sienna: "#A0522D",
    silver: "#C0C0C0",
    skyblue: "#87CEEB",
    slateblue: "#6A5ACD",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#FFFAFA",
    springgreen: "#00FF7F",
    steelblue: "#4682B4",
    tan: "#D2B48C",
    teal: "#008080",
    thistle: "#D8BFD8",
    tomato: "#FF6347",
    turquoise: "#40E0D0",
    violet: "#EE82EE",
    wheat: "#F5DEB3",
    white: "#FFFFFF",
    whitesmoke: "#F5F5F5",
    yellow: "#FFFF00",
    yellowgreen: "#9ACD32",
};

$(function () {
    p8Spread_JSExport = true;
});

function p8Spread_Export(msbook, fileName) {
    //dtExport = dtExport[0]
    var startRow = 5;
    var dataVal = "";
    var SheetNames = msbook.GetSheets();// Object.keys(dtExport);
    var hdrNames = [];
    var excel = $JExcel.new("Arial 10 #333333");
    var formula = "";
    excel.set({ sheet: 0, value: SheetNames[0] });
    for (var i = 1; i < SheetNames.length; i++) {
        excel.addSheet(SheetNames[i]);
    }



    var rowadd = 0;


    for (var isheet = 0; isheet < SheetNames.length; isheet++) {
        var rowcount = msbook.Sheet[isheet].Data.length;
        var colcount = msbook.Sheet[isheet].ColumnConfig.length;

        rowadd = 0;
        if (msbook.Sheet[isheet].exportColumn) rowadd = 1;

        for (var irow = 0 - rowadd; irow < rowcount ; irow++) {
            for (var icol = 0; icol < colcount; icol++) {

                if (irow == -1) {
                    var formats = p8Spread_ExportGetFormatHeader(excel, msbook.Sheet[isheet]);
                    excel.set(isheet, icol, 0, msbook.Sheet[isheet].ColumnName(icol), formats, undefined);
                    continue;
                }

                var formats = p8Spread_ExportGetFormat(excel, msbook.Sheet[isheet], icol, irow);
                dataVal = msbook.Sheet[isheet].GetValue(icol, irow) + "";
                formula = msbook.Sheet[isheet].GetFormula(icol, irow) + "";
                dataVal = (dataVal) + "";
                formula = (formula) + "";
                if (formula.startsWith('=')) {

                    if (msbook.Sheet[isheet].exportColumn) {
                        excel.set(isheet, icol, irow + rowadd, dataVal, formats, undefined);
                    } else {
                        excel.set(isheet, icol, irow + rowadd, formula, formats, undefined);
                    }

                    //excel.set(isheet, icol, irow , formula, formats, undefined);
                }
                else {
                    excel.set(isheet, icol, irow + rowadd, dataVal, formats, undefined);
                }
            }
        }
        for (var icol = 0; icol < colcount; icol++) {

            excel.set(isheet, icol, undefined, msbook.Sheet[isheet].GetColumnWidth(icol) / 5.3);
        }

        excel.freezePane(isheet, msbook.Sheet[isheet].FreezeCol, msbook.Sheet[isheet].FreezeRow + 1);
        excel.set(isheet, 0, 1, undefined, undefined, msbook.Sheet[isheet].mergeList);
    }
    excel.generate(fileName + ".xlsx");
}
function p8Spread_ExportGetFormatHeader(excel, activesheet) {
    var bgcolor = wordToHex["gainsboro"];
    var txtColor = wordToHex["black"];
    var datatype = "text";
    var Precision = 0;
    var fontBold = "B";
    var fontItalic = "";
    var fontUnderline = "";

    var format = 'General';
    var borders = ""

    var formats = excel.addStyle({
        font: "Arial" + ' ' + "11" + ' ' + txtColor + ' ' + fontBold + ' ' + fontUnderline + ' ' + fontItalic,
        align: "C" + ' C' + (activesheet.AutoWrap ? ' W' : ''),
        fill: bgcolor,
        format: "General",
        border: borders
    });
    return formats;
}
function p8Spread_ExportGetFormat(excel, activesheet, icol, irow) {
    var bgcolor = wordToHex[activesheet.GetBackground(icol, irow).toLowerCase()];
    var txtColor = wordToHex[activesheet.GetTextColor(icol, irow).toLowerCase()];
    var datatype = activesheet.GetDataType(icol, irow).toLowerCase();
    var Precision = activesheet.GetPrecision(icol, irow);
    var fontBold = activesheet.GetBold(icol, irow) != false && activesheet.GetBold(icol, irow) != undefined ? (activesheet.GetBold(icol, irow) == true ? 'B' : activesheet.GetBold(icol, irow).toUpperCase().substring(0, 1)) : '';
    var fontItalic = activesheet.GetItalic(icol, irow) != false && activesheet.GetItalic(icol, irow) != undefined ? (activesheet.GetItalic(icol, irow) == true ? 'I' : activesheet.GetItalic(icol, irow).toUpperCase().substring(0, 1)) : '';
    var fontUnderline = activesheet.GetUnderline(icol, irow) != false && activesheet.GetUnderline(icol, irow) != undefined ? (activesheet.GetUnderline(icol, irow) == true ? 'U' : activesheet.GetUnderline(icol, irow).toUpperCase().substring(0, 1)) : '';


    var BorderStyle = activesheet.GetBorderStyle(icol, irow)[0];
    var BorderColor = activesheet.GetBorderColor(icol, irow)[0];
    var BorderWidth = activesheet.GetBorderWidth(icol, irow)[0];

    var format = (datatype == 'currency' ? '#,##0' + (Precision == 0 ? '' : '.' + ('0').repeat(Precision)) : 'General');
    var currencyCode = activesheet.GetCurrencyCode(icol, irow) || "";
    if (datatype == "percentvalue") {
        format = "0.00%";
    }
    if (datatype == "percent") {
        format = "0.00%";
    }
    if (currencyCode != "") {
        try {
            //format = "₱ " + format
            format = P8Spread_Currency[currencyCode].format;
            //format = '_-[$₱-en-PH]* #,##0.00_-;-[$₱-en-PH]* #,##0.00_-;_-[$₱-en-PH]* " - "??_-;_-@_-';
        } catch (err) { }
    }
    if (datatype == null) {
        format = "General";
    }
    var formats;

    var borders = (
                  (BorderWidth.borderWidthLeft.toLowerCase() == 'none' ? 'none ' : (BorderStyle.borderStyleLeft + ' ' + (wordToHex[BorderColor.borderColorLeft] == undefined ? "none " : wordToHex[BorderColor.borderColorLeft]))) + ',' +
                  (BorderWidth.borderWidthRight.toLowerCase() == 'none' ? 'none ' : (BorderStyle.borderStyleRight + ' ' + (wordToHex[BorderColor.borderColorRight] == undefined ? "none " : wordToHex[BorderColor.borderColorRight]))) + ',' +
                  (BorderWidth.borderWidthTop.toLowerCase() == 'none' ? 'none ' : (BorderStyle.borderStyleTop + ' ' + (wordToHex[BorderColor.borderColorTop] == undefined ? "none " : wordToHex[BorderColor.borderColorTop]))) + ',' +
                  (BorderWidth.borderWidthBottom.toLowerCase() == 'none' ? 'none ' : (BorderStyle.borderStyleBottom + ' ' + (wordToHex[BorderColor.borderColorBottom] == undefined ? "none " : wordToHex[BorderColor.borderColorBottom])))
                 ).toLowerCase().replaceAll('solid', 'thin');

    if (format == "General") {
        formats = excel.addStyle({
            //border: "thin,thin,thin,thin #000000",
            font: activesheet.GetFontFamily(icol, irow) + ' ' + activesheet.GetFontSize(icol, irow) + ' ' + (txtColor == undefined ? activesheet.GetTextColor(icol, irow) : txtColor) + ' ' + fontBold + ' ' + fontUnderline + ' ' + fontItalic,
            align: activesheet.GetTextAlign(icol, irow).substring(0, 1).toUpperCase() + ' C' + (activesheet.AutoWrap ? ' W' : ''),
            fill: (bgcolor == undefined ? activesheet.GetBackground(icol, irow) : bgcolor),
            format: "General",
            border: borders
        });
    } else {
        formats = excel.addStyle({
            //border: "thin,thin,thin,thin #000000",
            font: activesheet.GetFontFamily(icol, irow) + ' ' + activesheet.GetFontSize(icol, irow) + ' ' + (txtColor == undefined ? activesheet.GetTextColor(icol, irow) : txtColor) + ' ' + fontBold + ' ' + fontUnderline + ' ' + fontItalic,
            align: activesheet.GetTextAlign(icol, irow).substring(0, 1).toUpperCase() + ' C' + (activesheet.AutoWrap ? ' W' : ''),
            fill: (bgcolor == undefined ? activesheet.GetBackground(icol, irow) : bgcolor),
            format: format,
            border: borders
        });
    }

    return formats;
}

function p8Spread_ExportCSV(msbook, fileName) {
    var final_filename
    fileName = fileName.replace(".csv");

    for (var isheet = 0; isheet < msbook.Sheet.length; isheet++) {
        if (msbook.Sheet.length <= 1) fileName = fileName + ".csv";
        else fileName = fileName + "_" + (isheet + 1) + ".csv";



        var rowcount = msbook.Sheet[isheet].Data.length;
        var colcount = msbook.Sheet[isheet].ColumnConfig.length;
        var data = [];

        var datacolumnS = [];

        var ColumnHeaderIndex = 0;
        try{
            ColumnHeaderIndex = msbook.Sheet[isheet].ColumnHeaderIndex;
        }catch(err){}
        if (ColumnHeaderIndex <= 0) {
            for (var icol = 0; icol < colcount; icol++) {
                if (msbook.Sheet[isheet].ColumnWidth(icol) <= 0) continue;
                dataVal = msbook.Sheet[isheet].ColumnName(icol);
                datacolumnS.push(dataVal);
            }
            data.push(datacolumnS);
        }
        



        for (var irow = 0; irow < rowcount; irow++) {
            var datacolumn = [];
            for (var icol = 0; icol < colcount; icol++) {
                if (msbook.Sheet[isheet].ColumnWidth(icol) <= 0) continue;

                dataVal = msbook.Sheet[isheet].GetText(icol, irow);
                datacolumn.push(dataVal);
            }
            data.push(datacolumn);
        }



        p8Spread_ExportCSVDetails(data, fileName);
    }

}
function p8Spread_ExportCSVDetails(rows, filename) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

var p8Spread_JSPrint = true; //_isNewSpreadPrint
$(function () {
    $("body").append('<div id="PrintCanvasCon"></div>');
    $("#PrintCanvasCon").hide();
});
function p8Spread_Print(msbook, fileName) {
    var doc;
    var orientation = "l";

    var imgwidth = 100;
    var imgheight = 100;
    var print_bgcolormain = "white";
    var print_ColumnTitleHide = true;
    var print_RowTitleHide = true;

    var print_StartRow = 0;
    var print_StartCol = 0;

    var print_LastRow = 0;

    var print_PageJump = 30;


    doc = new jsPDF({
        //putOnlyUsedFonts: true,
        orientation: orientation
        , unit: 'px', format: [1300, 800]
    });

    var obj = msbook.ActiveSheet;
    


    var startRow = 5;
    var dataVal = "";
    var SheetNames = msbook.GetSheets();
    var hdrNames = [];
    var formula = "";
    var rowadd = 0;
    var borderMargin = 1;
    var pageno = 0;


    var canvasID = msbook.ActiveSheet.canvasID + "_print";
    $("#PrintCanvasCon").append("<canvas id='" + canvasID + "'></canvas>");

    var defconwidth = 1300;
    var conwidth = 0;

    var defconheight = 800;
    var conheight = defconheight;


    for (var ic = 0; ic < obj.ColumnConfig.length; ic++) {
        var colwidth = parseInt(obj.GetColumnWidth(ic));
        if (colwidth > 5) {
            conwidth += colwidth + borderMargin;
        }
    }
    if (conwidth <= defconwidth) conwidth = defconwidth;
    else { conwidth += 50; }

    $("#" + canvasID).height(conheight);
    $("#" + canvasID).width(conwidth);
    var conWidth = $('#' + canvasID).width();
    var conheight = $('#' + canvasID).height();


    ///Print Loop
    while (print_StartRow < obj.Data.length) //&& pageno <= 10
    {

        console.log("loop:" + print_StartRow);
        if (pageno >= 2) {
            print_StartRow += print_PageJump - (obj.HideHeaderIndex -  1);
        } else if (pageno >= 1){
            print_StartRow += print_PageJump - (obj.FreezeRow);
        }
        
        if (print_StartRow > obj.Data.length) break;

        
        try {
            sleep(10);
            setTimeout(function () { 
                $("#aagLoadingNSpreadPrint .nwLoadingInfo").html("Rendering record " + print_StartRow + " out of " + obj.Data.length);
            }, 10);
        } catch (err) {
            console.log(err);
        }

        var data = obj.Data;

    var myCanvas = createHiDPICanvas(canvasID, conWidth, conheight, 1.2);

    var canvasSheet = document.getElementById(canvasID);
    var contextSheet = canvasSheet.getContext('2d');
    var contextSheetText = canvasSheet.getContext('2d');

    var canvasSheetCurrentSelected = document.getElementById(canvasID);
    var contextCurrentSelected = canvasSheetCurrentSelected.getContext('2d');

    var elemLeft = 0;
    var elemTop = 0;

    var scolumn = 17;
    var srow = 26;
    
    var borderMarginScale = 1;
    var current_X = borderMargin;
    var current_Y = borderMargin;
    var current_Width = def_Width;
    var current_Height = def_Height;
    obj.currentCells = [];

    srow = data.length;
    try {
        scolumn = obj.ColumnConfig.length;
    } catch (err) { }
    var t_srow = srow;
    var t_scolumn = scolumn;

    var conheightDraw = conheight - (def_Height * 3);
    obj.CellRowMax = 0;
    var rowStart = print_StartRow + obj.FreezeRow;
    var rowindexHe = 1;


    var tlLetterHeight = obj.HeadertColumnHeight;
    var tlGroupHeight = obj.HeadertGroupHeight;
    var sheetStart_y = tlLetterHeight;

    if (obj.HeaderGroup == undefined) obj.HeaderGroup = [];
    if (obj.HeaderGroup.length >= 1) {
        sheetStart_y += tlGroupHeight + borderMargin;

    }

    var sheetStart_y2 = 0;
    if (obj.HideHeader || pageno >=1) {
        for (var i = 0; i < obj.HideHeaderIndex; i++) {
            sheetStart_y2 += obj.RowHeight(i) + borderMargin;
        }
        sheetStart_y -= sheetStart_y2;
        conheightDraw += sheetStart_y2
    }

    rowindexHe = 1;
    if (obj.FreezeRow >= rowindexHe)
        ;
    else
        rowindexHe = rowStart;

    while (conheightDraw >= 0) {

        var heightrow = def_Height + 0;
        try {
            heightrow = obj.Data[rowindexHe - 1].aagrowHeight || (def_Height + 0);
        } catch (err) { }

        rowindexHe += 1;
        conheightDraw -= heightrow + borderMargin;
        obj.CellRowMax += 1;
    }


    var conWidthDraw = conWidth - (0);
    obj.CellColMax = 1;
    var icounter = obj.startCol - 1;
    icounter += obj.FreezeCol;

    var applyfreezeW = 0;
    while (conWidthDraw >= 0) {
        var widthcol = def_Width;
        try {
            widthcol = obj.ColumnConfig[icounter].width;
        } catch (err) { }

        if (applyfreezeW < obj.FreezeCol) {
            widthcol = obj.ColumnConfig[applyfreezeW].width;
            applyfreezeW++;
            if ((conWidthDraw - widthcol) <= 0) break;
          
        }
        else {
            icounter++;
            if ((conWidthDraw - widthcol) <= 0) break;
        }

        obj.CellColMax += 1;
        conWidthDraw -= widthcol;
        if (icounter >= 1000) break;
    }
    var maxLimitRowAdd = obj.CellRowMaxAdd;
    var maxLimitRow = obj.CellRowMax + maxLimitRowAdd;
    var maxLimitCol = obj.CellColMax;

   //srow = print_StartRow + maxLimitRow - 1;

    srow = print_StartRow + print_PageJump;
    //t_srow = print_StartRow + print_PageJump;


    scolumn = obj.startCol + maxLimitCol - 1;

    if (t_srow <= srow) srow = t_srow;
    if (t_scolumn <= scolumn) scolumn = t_scolumn;

    var tlNumberWidth = 23;

    var tlBgColor = "#c0c7d5";
    tlNumberWidth += ((srow - 2) + "").length * 6;

    var tlHBG = obj.HeaderBackround;
    var tlHFont = obj.HeaderFontFamily;
    var tlHFontSize = obj.HeaderFontSize;
    var tlHColor = obj.HeaderColor;


    var tlVBG = obj.VHeaderBackround;
    var tlVFont = obj.VHeaderFontFamily;
    var tlVFontSize = obj.VHeaderFontSize;
    var tlVColor = obj.VHeaderColor;

    var sheetStart_x = tlNumberWidth + borderMargin;


    var defaultpadding = 2;
    var scale = 1;
    var selectedValue = "rgba(255,255,255,0.0)";

    contextSheet.scale(scale, scale);
    contextSheet.clearRect(0, 0, canvasSheet.width, canvasSheet.height);
    contextSheet.fillStyle = print_bgcolormain; //'#CECECE';
    contextSheet.fillRect(0, 0, canvasSheet.width, canvasSheet.height);




    var FreezeLineCol = 0;
    var FreezeLineRow = 0;

    var xFreezeRow = obj.FreezeRow + 1;
    var xFreezeCol = obj.FreezeCol + 1;

    if (print_StartRow <= 0) print_StartRow = 1;
    if (print_StartRow <= 0) print_StartRow = 1;

    var ix = -1;
    var ix2 = 1;
    var obj_startRow = print_StartRow;
    var icx = -1;
    var icx2 = 1;
    var obj_startCol = obj.startCol;


    var xcurrent_Width = tlNumberWidth - borderMargin;

    srow = print_StartRow + maxLimitRow - 1;
    scolumn = obj.startCol + maxLimitCol - 1;

    if (srow >= data.length) srow = data.length;
    if (scolumn >= obj.ColumnConfig.length) scolumn = obj.ColumnConfig.length;


    if (srow - obj_startRow < xFreezeRow) {
        if (xFreezeRow <= 1) obj_startRow = srow - xFreezeRow + 1;
            //ifreeze pane
        else obj_startRow = srow - (xFreezeRow - 1);

    }
    if (scolumn - obj_startCol < xFreezeCol) {
        obj_startCol = scolumn - xFreezeCol + 1;
    }

    mergeList = obj.mergeList;

    var dashedarry = [3, 5];
    var dottedarry = [2, 2];
    var defaultarry = [];
    // Print Cell Records
    current_Y = borderMargin;    // srow = 0;
    current_X = borderMargin;

    ix = -1;
    ix2 = 1;

    var firstFreezeCol = 0;
    firstFreezeCol = (xFreezeCol - 1) + (obj_startCol - 1);



    // list of MergeObject from previous
    var jsonFreezeBgList = [];
    var jsonFreezeTextList = [];
    var listOfMergeDraw = [];
    var listOfMergeDrawText = [];


    var curCol = 0; // current column
    var curRow = 0; // current row
    var curXorigin = undefined;
    var curYorigin = undefined;
    var curWidth = undefined;
    var curHeight = undefined;

    if (obj.Data.length == obj.FreezeRow)
        srow -= 1;

     //if (P8Spread_currcavas != randomid) return false;

    //print_LastRow = srow + 1;
    //print_StartRow = print_LastRow;



    //field render Background border
    for (var i = obj_startRow; i <= srow; i++) {
        current_X = borderMargin;
        current_Height = def_Height;

        if (ix2 < xFreezeRow) {
            ix = ix2;
        }
        else {
            ix = i;
        }
        ix2++;
        icx = -1;
        icx2 = 1;


        try { //get Row height if there is
            current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
            //console.log(ix + " " + current_Height);
        } catch (err) { }

        var isFreezeCol = false;



        for (var ic = obj_startCol; ic <= scolumn; ic++) {


            if (ic + 1 >= xFreezeCol && xFreezeCol > scolumn) continue;

            if (icx2 < xFreezeCol) {
                icx = icx2;
            }
            else {

                //draw other data after freeze
                icx = ic;
                //icx = icx - obj.FreezeCol;
            }
            icx2++;


            //altering variables start
            curCol = icx;
            curRow = ix;
            curXorigin = undefined;
            curYorigin = undefined;
            curWidth = undefined;
            curHeight = undefined;
            //altering variables

            try {
                current_Width = def_Width;
                current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
            } catch (err) { }

 
            var isaffected = false;
            for (var it = 0; it < mergeList.length; it++) {
                if ((mergeList[it].col2 >= icx - 1 && mergeList[it].col <= icx - 1)
                    && (mergeList[it].row2 >= ix - 1 && mergeList[it].row <= ix - 1)
                    && !(mergeList[it].col == icx - 1 && mergeList[it].row == ix - 1)
                    ) {


                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    if (listOfMergeDraw.indexOf(idlist) < 0) {
                        listOfMergeDraw.push(idlist);
                        curCol = mergeList[it].col + 1; 
                        curRow = mergeList[it].row + 1; 

                        curXorigin = sheetStart_x + current_X;
                        curYorigin = sheetStart_y + current_Y;


                        curWidth = 0;
                        curHeight = 0;
                        var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
                        if (merge_ix != undefined) {
                            var recol2 = merge_ix[0].col2;
                            var rerow2 = merge_ix[0].row2;
                            var xcurrent_Width = def_Width;
                            for (var icc = merge_ix[0].col ; icc <= merge_ix[0].col2; icc++) {

                                try {
                                    xcurrent_Width = def_Width;
                                    xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); // + 1
                                } catch (err) { }

                                if (xcurrent_Width <= 1) {
                                    continue;
                                }
                                curWidth += xcurrent_Width + borderMargin;
                                if (icc < icx - 1) {
                                    curXorigin -= borderMargin + xcurrent_Width;
                                }
                            }

                            var totalheight = def_Height;
                            for (var icc = merge_ix[0].row ; icc <= merge_ix[0].row2; icc++) {

                                try { //get Row height if there is
                                    totalheight = obj.Data[icc].aagrowHeight || def_Height;
                                } catch (err) { }

                                curHeight += borderMargin + totalheight;
                                if (icc < ix - 1) {
                                    curYorigin -= borderMargin + totalheight;
                                }
                            }
                            curHeight -= borderMargin;

                        }

                    }
                    else {
                        isaffected = true;
                    }


                    break;
                }
                else if (mergeList[it].row == ix - 1 && mergeList[it].col == icx - 1) {
                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    listOfMergeDraw.push(idlist);
                }
            }
            if (isaffected) {

                if (current_Width > 0)
                    current_X += borderMargin + current_Width;
                continue;
            }

            if (current_Width <= 0) continue;


            //merge
            var plusWidth = 0;
            var plusHeight = 0;
            var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
            if (merge_ix != undefined) {

                var recol2 = merge_ix[0].col2;
                var rerow2 = merge_ix[0].row2;

                var xcurrent_Width = current_Width;
                for (var icc = merge_ix[0].col + 1 ; icc <= recol2; icc++) {

                    try {
                        xcurrent_Width = def_Width;
                        xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); 
                    } catch (err) { }

                    if (icc < xFreezeCol - 1) { }
                    else if (icc >= (xFreezeCol - 1) && icc < firstFreezeCol) {
                        continue;
                    }
                    else if (icc > recol2)  
                    {
                        continue;
                    }
                    if (xcurrent_Width <= 1) {
                        continue;
                    }

                    plusWidth += xcurrent_Width + borderMargin;

                }

                var totalheight = current_Height;
                plusHeight = 0;
                for (var icc = curRow ; icc <= rerow2; icc++) {

                    try { //get Row height if there is
                        totalheight = obj.Data[icc].aagrowHeight || def_Height;
                    } catch (err) { }

                    //must check the row height +1
                    plusHeight += borderMargin + totalheight;
                }

            }
            //merge end

            var myCell = {
                x: curXorigin || sheetStart_x + current_X,
                y: curYorigin || sheetStart_y + current_Y,
                width: curWidth || current_Width + plusWidth,
                height: curHeight || current_Height + plusHeight,
                borderWidth: borderMargin * borderMarginScale,

                fillStyle: "white",
                strokeStyle: 'black'
                , col: curCol
                , row: curRow
                , type: "cell"
                , borderMargin: borderMargin
                , selectedValue: selectedValue


                , borderColorTop: obj.gridlLineColor
                , borderColorBottom: obj.gridlLineColor
                , borderColorLeft: obj.gridlLineColor
                , borderColorRight: obj.gridlLineColor

                , borderStyleTop: "solid"
                , borderStyleBottom: "solid"
                , borderStyleLeft: "solid"
                , borderStyleRight: "solid"

                , borderWidthTop: "1"
                , borderWidthBottom: "1"
                , borderWidthLeft: "1"
                , borderWidthRight: "1"
            };


            var option = {
                font: " " + tlVFontSize + "px " + tlVFont, x: myCell.x + defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: 2 * defaultpadding, width: myCell.width - (defaultpadding * 2), height: myCell.height - (defaultpadding * 2)
             , verticalAlign: "middle"
            , textAlign: "center"
            };
            option = _sfSetFormatText(obj, option, curCol - 1, curRow - 1);


            var canvas = document.getElementById(canvasID);
            var stringText = "";
            myCell = _sfSetFormatBox(obj, myCell, curCol - 1, curRow - 1);
            myCell.fontsize = fontsize;

            if (curCol < xFreezeCol || curRow < xFreezeRow) {
                jsonFreezeBgList.push(myCell);
            } else {
                _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);
            }

            current_X += borderMargin + current_Width;
        }

        current_Y += borderMargin + current_Height;
    }

    icx = -1;
    icx2 = 1;
    ix2 = 1;
    listOfMergeDraw = [];

    current_Y = borderMargin;    // srow = 0;
    current_X = borderMargin;


    //border render 
    //text render
    for (var i = obj_startRow; i <= srow; i++) {
        // dito matagal

        current_X = borderMargin;
        current_Height = def_Height;

        if (ix2 < xFreezeRow) {
            ix = ix2;

        }
        else {
            ix = i;
        }
        ix2++;
        icx = -1;
        icx2 = 1;

        try { 
            current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
        } catch (err) { }



        for (var ic = obj_startCol; ic <= scolumn; ic++) {
            //if (P8Spread_currcavas != randomid) return false;
            if (ic + 1 >= xFreezeCol && xFreezeCol > scolumn) continue;

           

            if (icx2 < xFreezeCol) {
                icx = icx2;
            }
            else {
                icx = ic;
               
            }
            icx2++;



            try {
                current_Width = def_Width;
                current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
            } catch (err) { }

            curCol = icx;
            curRow = ix;
            curXorigin = undefined;
            curYorigin = undefined;
            curWidth = undefined;
            curHeight = undefined;
            //altering variables

            //merge block
            var isaffected = false;
            var mergeConfig = [];
            for (var it = 0; it < mergeList.length; it++) {
                if ((mergeList[it].col2 >= icx - 1 && mergeList[it].col <= icx - 1)
                    && (mergeList[it].row2 >= ix - 1 && mergeList[it].row <= ix - 1)
                    && !(mergeList[it].col == icx - 1 && mergeList[it].row == ix - 1)
                    ) {

                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    if (listOfMergeDraw.indexOf(idlist) < 0) {
                        listOfMergeDraw.push(idlist);
                        curCol = mergeList[it].col + 1; // alter the current to previous curcol;
                        curRow = mergeList[it].row + 1; // alter the current to previous curRow;
                        curXorigin = sheetStart_x + current_X;
                        curYorigin = sheetStart_y + current_Y;


                        curWidth = 0;
                        curHeight = 0;
                        var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
                        if (merge_ix != undefined) {
                            var recol2 = merge_ix[0].col2;
                            var rerow2 = merge_ix[0].row2;
                            var xcurrent_Width = def_Width;
                            for (var icc = merge_ix[0].col ; icc <= merge_ix[0].col2; icc++) {

                                try {
                                    xcurrent_Width = def_Width;
                                    xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); // + 1
                                } catch (err) { }

                                if (xcurrent_Width <= 1) {
                                    
                                    continue;
                                }
                                curWidth += xcurrent_Width + borderMargin;

                                if (icc < icx - 1) {
                                    curXorigin -= borderMargin + xcurrent_Width;
                                }
                            }

                            var totalheight = def_Height;
                            for (var icc = merge_ix[0].row ; icc <= merge_ix[0].row2; icc++) {

                                try { 
                                    totalheight = obj.Data[icc].aagrowHeight || def_Height;
                                } catch (err) { }

                                curHeight += borderMargin + totalheight;
                                if (icc < ix - 1) {
                                    curYorigin -= borderMargin + totalheight;
                                }
                            }
                            curHeight -= borderMargin;
                        }
                    }
                    else {
                        isaffected = true;
                    }


                    break;
                }
                else if (mergeList[it].row == ix - 1 && mergeList[it].col == icx - 1) {
                    var idlist = mergeList[it].row + "|" + mergeList[it].col + "|" + mergeList[it].row2 + "|" + mergeList[it].col2;
                    listOfMergeDraw.push(idlist);
                }
            }
            if (isaffected) {
                if (current_Width > 0)
                    current_X += borderMargin + current_Width;
                continue;
            }
            else {

            }


            var plusWidth = 0;
            var plusHeight = 0;
            var merge_ix = _sfGetFormatCell(obj, curCol - 1, curRow - 1, "merge");
            if (merge_ix != undefined) {

                var recol2 = merge_ix[0].col2;
                var rerow2 = merge_ix[0].row2;


                var xcurrent_Width = current_Width;
                for (var icc = merge_ix[0].col + 1 ; icc <= recol2; icc++) {

                    try {
                        xcurrent_Width = def_Width;
                        xcurrent_Width = parseInt(obj.ColumnConfig[icc].width); // + 1
                    } catch (err) { }

                    if (icc < xFreezeCol - 1) { }
                    else if (icc >= (xFreezeCol - 1) && icc < firstFreezeCol)
                        continue;
                    else if (icc > recol2)  //- (obj_startCol - 1)
                        continue;
                    if (xcurrent_Width <= 0)
                        continue;



                    plusWidth += xcurrent_Width + borderMargin;
                }


                var totalheight = current_Height;
                for (var icc = curRow ; icc <= rerow2; icc++) {
                    try { //get Row height if there is
                        totalheight = obj.Data[icc].aagrowHeight || def_Height;
                    } catch (err) { }

                    //must check the row height +1
                    plusHeight += borderMargin + totalheight;
                }

            }
            //merge end

            if (current_Width <= 0) continue;

            // cell box Config
            var myCell = {
                x: curXorigin || sheetStart_x + current_X,
                y: curYorigin || sheetStart_y + current_Y,
                width: curWidth || current_Width + plusWidth,
                height: (curHeight || current_Height + plusHeight), //+ 3
                borderWidth: borderMargin * borderMarginScale,

                fillStyle: "white",
                strokeStyle: 'black'
                , col: curCol
                , row: curRow
                , type: "cell"
                , borderMargin: borderMargin
                , selectedValue: selectedValue


                , borderColorTop: "black"
                , borderColorBottom: "black"
                , borderColorLeft: "black"
                , borderColorRight: "black"

                , borderStyleTop: "solid"
                , borderStyleBottom: "solid"
                , borderStyleLeft: "solid"
                , borderStyleRight: "solid"

                , borderWidthTop: "1"
                , borderWidthBottom: "1"
                , borderWidthLeft: "1"
                , borderWidthRight: "1"

                , merge: []
            };

            myCell = _sfSetFormatBox(obj, myCell, curCol - 1, curRow - 1, curCol - 1, curRow - 1, "border");


            var option = {
                font: " " + tlVFontSize + "px " + tlVFont, x: myCell.x + defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: 2 * defaultpadding, width: myCell.width - (defaultpadding * 2), height: myCell.height - (defaultpadding * 2)
              , verticalAlign: "middle"
              , textAlign: "center"
              , col: curCol - 1, row: curRow - 1
              , currencyCode: myCell.currencyCode
              , backgroundColor: ""
            };
            option = _sfSetFormatText(obj, option, curCol - 1, curRow - 1);

            option.dashedarry = dashedarry;
            option.dottedarry = dottedarry;
            option.curCol = curCol;
            option.curRow = curRow;
            option.curWidth = curCol;
            option.curHeight = curHeight;

            option.img_sizeWidth = img_sizeWidth;
            option.img_sizeHeight = img_sizeHeight;


            if (curCol < xFreezeCol || curRow < xFreezeRow) {
                jsonFreezeTextList.push({ border: myCell, text: option, col: curCol, row: curRow });
            } else {
                _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected,false);
            }


            current_X += borderMargin + current_Width;
        }

        current_Y += borderMargin + current_Height;
    }

    var yTime = new Date().getTime();

    //clear column part
    var HeadertotalHeight = sheetStart_y + borderMargin;
    for (var i = 0 ; i < xFreezeRow - 1; i++) {
        current_Height = def_Height;
        try {
            current_Height = obj.Data[i].aagrowHeight || def_Height;
        } catch (err) { }
        HeadertotalHeight += current_Height + borderMargin;
    }
    contextSheet.fillStyle = print_bgcolormain;
    contextSheet.fillRect(0, 0, canvasSheet.width, HeadertotalHeight);

    // print Freeze Objects BG
    var tempColumn = [];
    for (var ifr = 0; ifr < jsonFreezeBgList.length; ifr++) {
        //console.log("FreezeLEFT:" + randomid);

        var myCell = jsonFreezeBgList[ifr];
        if (myCell.col <= xFreezeCol) {
            tempColumn.push(myCell);
        } else {
            _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);
        }
    }
    // print Text and Border
    var tempColumnBorder = [];
    for (var ifr = 0; ifr < jsonFreezeTextList.length; ifr++) {
        var data = jsonFreezeTextList[ifr];
        if (data.col < xFreezeCol) {
            tempColumnBorder.push(data);
        } else {
            var myCell = data.border;
            var option = data.text;
            _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected, false);
        }
    }


    var freezewidth = sheetStart_x;
    for (var i = 0; i < obj.FreezeCol; i++) {
        freezewidth += parseInt(obj.GetColumnWidth(i)) + borderMargin;
    }
    freezewidth += borderMargin;
    contextSheet.fillStyle = print_bgcolormain;
    contextSheet.fillRect(0, 0, freezewidth, canvasSheet.height);


    // print Freeze Objects BG top freeze
    for (var ifr = 0; ifr < tempColumn.length; ifr++) {
        var myCell = tempColumn[ifr];
        _sfCellDrawBox(obj, contextSheetText, contextSheet, myCell);
    }
    // print Text and Border top freeze
    for (var ifr = 0; ifr < tempColumnBorder.length; ifr++) {
        var data = tempColumnBorder[ifr];
        var myCell = data.border;
        var option = data.text;
        _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected,false);
    }

    for (var ifr = 0; ifr < jsonFreezeTextList.length; ifr++) {

        var data = jsonFreezeTextList[ifr];
        if (data.col < xFreezeCol) {
            //tempColumnBorder.push(data);
        } else if (data.col == xFreezeCol) {
            var myCell = data.border;
            var option = data.text;
            _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected, false);
        }
        else if (data.col > xFreezeCol) {
            var myCell = data.border;
            var option = data.text;
            myCell.borderColorBottom = "transparent";
            myCell.borderColorRight = "transparent";
            myCell.borderColorLeft = "transparent";
            option.tagText = "0";


            //var option = data.text;
            _sfCellDrawText(canvasID, obj, contextSheet, myCell, option, selectedValue, borderMargin, contextCurrentSelected, false);
        }
    }


    //clear row part
    var HeadertotalWidth = sheetStart_x + borderMargin;
    for (var i = 0 ; i < xFreezeCol - 1; i++) {
        current_Width = def_Width;
        try {
            current_Width = parseInt(obj.ColumnConfig[i].width) || def_Width;
        } catch (err) { }
        HeadertotalWidth += current_Height + borderMargin;
    }

    // clear extra lines
    contextSheet.beginPath();
    contextSheet.fillStyle = print_bgcolormain;
    contextSheet.fillRect(0, 0, tlNumberWidth + 1, canvasSheet.height);
    contextSheet.closePath();



    ix2 = 1;
    icx2 = 1;
    // Print Row Number
    current_Y = borderMargin;

    if (print_RowTitleHide == false) {
        for (var i = obj_startRow ; i <= srow; i++) {

            //must check per rowheight
            current_Height = def_Height;


            if (ix2 < xFreezeRow) {
                ix = ix2;
                FreezeLineRow = sheetStart_y + current_Y + borderMargin + current_Height;
            }
            else {
                ix = i;
                //icx = icx - obj.FreezeCol;
            }
            ix2++;


            try { //get Row height if there is
                current_Height = obj.Data[ix - 1].aagrowHeight || def_Height;
            } catch (err) { }


            current_X = borderMargin;
            var myCell = {
                x: 0,
                y: sheetStart_y + current_Y,
                width: tlNumberWidth,
                height: current_Height,
                borderWidth: borderMargin * borderMarginScale,
                fillStyle: tlVBG,
                strokeStyle: 'black'
                  , row: ix
                , type: "row"
            };
            contextSheet.fillStyle = myCell.fillStyle;
            contextSheet.lineWidth = myCell.borderWidth;
            contextSheet.strokeStyle = myCell.strokeStyle;
            contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);
            obj.currentCells.push(myCell);

            //contextSheetText.font = tlVFontSize + "px " + tlVFont;
            //contextSheetText.fillStyle = "black";
            //contextSheetText.fillText(i + "", myCell.x + defaultpadding, myCell.y + fontsize, myCell.width, myCell.height);

            var option = {
                font: "bold " + tlVFontSize + "px " + tlVFont, x: defaultpadding, y: myCell.y, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
                , verticalAlign: "middle"
                , textAlign: "center"
                , color: tlVColor
            };
            var canvas = document.getElementById(canvasID);
            CanvasTextWrapper(canvas, ix, option);





            current_Y += borderMargin + current_Height;


            //gridlLineColor
        }
    }


    // Print Column Header
    current_Y = borderMargin;
    current_X = borderMargin;

    contextSheet.fillStyle = print_bgcolormain;
    contextSheet.fillRect(0, 0, conWidth, tlGroupHeight - borderMargin);

    if (print_ColumnTitleHide == false) {
        for (var ic = obj_startCol ; ic <= scolumn ; ic++) {

            if (ic + 1 >= xFreezeCol && xFreezeCol > scolumn) continue;

            if (icx2 < xFreezeCol) {
                icx = icx2;
                try {
                    current_Width = def_Width;
                    current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
                } catch (err) { }
                FreezeLineCol = sheetStart_x + current_X + borderMargin + current_Width;
            }
            else {
                icx = ic;
                //icx = icx - obj.FreezeCol;
            }
            icx2++;

            try {
                current_Width = def_Width;
                current_Width = parseInt(obj.ColumnConfig[icx - 1].width);
            } catch (err) { }

            if (current_Width <= 0) continue;

            var myCell = {
                x: sheetStart_x + current_X,
                y: borderMargin,
                width: current_Width,
                height: tlGroupHeight - borderMargin,
                borderWidth: borderMargin * borderMarginScale,
                fillStyle: tlHBG,
                strokeStyle: 'black'
                , col: icx
                 , colindex: ic - 1
                 , type: "col"

            };


            var yAxisValue = 0;
            var tmp_current_Width = 0;
            var fnl_current_Width = 0;
            if (obj.HeaderGroup.length >= 1) {
                var isPart = false;
                var Title = "";
                var CellStart;
                var CellNumber;
                var colindex = ic - 1;
                for (var ih = 0; ih < obj.HeaderGroup.length; ih++) {
                    CellStart = obj.HeaderGroup[ih].CellStart;
                    CellNumber = obj.HeaderGroup[ih].CellNumber;
                    Title = obj.HeaderGroup[ih].Title;
                    if (CellStart == colindex) {

                        for (var ihx = CellStart; ihx <= CellStart + (CellNumber - 1) ; ihx++) {
                            try {
                                tmp_current_Width = def_Width;
                                tmp_current_Width = parseInt(obj.ColumnConfig[ihx].width);
                            } catch (err) { }
                            tmp_current_Width += borderMargin;
                            fnl_current_Width += tmp_current_Width;
                        }
                        fnl_current_Width -= borderMargin;
                        var myCellGroup = {
                            x: sheetStart_x + current_X,
                            y: borderMargin,
                            width: fnl_current_Width,
                            height: tlLetterHeight - borderMargin,
                            borderWidth: borderMargin * borderMarginScale,
                            fillStyle: tlHBG,
                            strokeStyle: 'black'
                            , col: icx
                            , type: "colg"
                        };
                        contextSheet.beginPath();
                        contextSheet.fillStyle = myCellGroup.fillStyle;
                        contextSheet.lineWidth = myCellGroup.borderWidth;
                        contextSheet.strokeStyle = myCellGroup.strokeStyle;
                        contextSheet.fillRect(myCellGroup.x, myCellGroup.y, myCellGroup.width, myCellGroup.height);
                        obj.currentCells.push(myCellGroup);
                        contextSheetText.font = fontsize + "px Arial";
                        contextSheetText.fillStyle = "black";
                        contextSheet.closePath();

                        var option = {
                            font: "bold " + tlHFontSize + "px " + tlHFont, x: myCellGroup.x, y: 0, paddingX: defaultpadding, paddingY: defaultpadding, width: myCellGroup.width, height: myCellGroup.height
                           , verticalAlign: "middle"
                           , textAlign: "center"
                           , color: tlHColor
                        };
                        var canvas = document.getElementById(canvasID);
                        CanvasTextWrapper(canvas, Title, option);

                    }
                    if (CellStart <= colindex && (CellStart + (CellNumber - 1) >= colindex)) {
                        isPart = true;
                        break;
                    }
                    CellStart = undefined;
                    CellNumber = undefined;


                }

                //nwGridMainCon_Book.ActiveSheet.HeaderGroup[0].CellNumber
                //nwGridMainCon_Book.ActiveSheet.HeaderGroup[0].CellStart
                //nwGridMainCon_Book.ActiveSheet.HeaderGroup[0].Title

                if (isPart == false) {
                    myCell.height = (tlLetterHeight - borderMargin) + (tlGroupHeight + borderMargin);
                }
                else {

                    yAxisValue = (tlLetterHeight + borderMargin);
                    myCell.y = myCell.y + yAxisValue;

                }
            }


            contextSheet.fillStyle = myCell.fillStyle;
            contextSheet.lineWidth = myCell.borderWidth;
            contextSheet.strokeStyle = myCell.strokeStyle;
            contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);
            obj.currentCells.push(myCell);
            contextSheetText.font = fontsize + "px Arial";
            contextSheetText.fillStyle = "black";

            // contextSheetText.fillText(ic, myCell.x + defaultpadding, myCell.y + fontsize, myCell.width, myCell.height);
            var option = {
                font: "bold " + tlHFontSize + "px " + tlHFont, x: myCell.x, y: 0 + yAxisValue, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
                , verticalAlign: "middle"
                , textAlign: "center"
                , color: tlHColor
            };
            var canvas = document.getElementById(canvasID);

            var extraText = ""; var option2 = {};
            if (obj.ColumnConfig[icx - 1].HeaderColumnReq == "nwFieldreq") {
                extraText = "*";
                option2.color = "red";
            }
            else {
                ;
            }

            CanvasTextWrapper(canvas, _sfGetCellNameEdit(obj, icx - 1), option, extraText, option2);

            current_X += borderMargin + current_Width;
        }
    }

    if (print_RowTitleHide == false) {
        current_Y = borderMargin;
        var fontsize = 12;
        var myCell = {
            x: borderMargin,
            y: borderMargin,
            width: tlNumberWidth - borderMargin,
            height: tlLetterHeight - borderMargin,
            borderWidth: borderMargin * borderMarginScale,
            fillStyle: tlHBG,
            strokeStyle: 'black'
            , row: 0
            , col: 0
             , type: "tot"
        };
        if (obj.HeaderGroup.length >= 1) {
            myCell.height = (tlLetterHeight - borderMargin) + (tlGroupHeight + borderMargin)
        }
        contextSheet.fillStyle = myCell.fillStyle;
        contextSheet.lineWidth = myCell.borderWidth;
        contextSheet.strokeStyle = myCell.strokeStyle;
        contextSheet.fillRect(myCell.x, myCell.y, myCell.width, myCell.height);
        obj.currentCells.push(myCell);
        contextSheetText.font = fontsize + "px Arial";
        contextSheetText.fillStyle = "black";
        contextSheetText.fillText("", myCell.x + defaultpadding, myCell.y + fontsize, myCell.width, myCell.height);


        if (obj.HeaderNumText != "") {
            var option = {
                font: "bold " + tlHFontSize + "px " + tlHFont, x: myCell.x + defaultpadding, y: 0 + yAxisValue, paddingX: defaultpadding, paddingY: defaultpadding, width: myCell.width, height: myCell.height
             , verticalAlign: "middle"
             , textAlign: "center"
             , color: tlHColor
            };
            CanvasTextWrapper(canvas, obj.HeaderNumText, option);
        }

    }



    //var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
    var image = canvas.toDataURL();
    //(defconwidth / conwidth) * conwidth
    //(defconheight / conheight) * conheight

    //var widthnew = (conwidth * 0.00962).toFixed(2);
    //var heightnew = (conheight * 0.00962).toFixed(2);

    if (pageno >= 1) {
        doc.addPage({
             orientation: orientation
       , unit: 'px', format: [1300, 800]
        });
    }
   
    //doc.addImage(image, 'PNG', 0, 0, 12.80, 7.8);
    doc.addImage(image, 'PNG', 0, 0, defconwidth * 0.73, defconheight * 0.73);

        console.log("image add");
        pageno++;
        //defconheight
        // defconwidth

    }
 

    if ((fileName || "") == "") fileName = "Document";
    fileName = fileName + ".pdf"
    doc.save(fileName);



    return;


    for (var isheet = 0; isheet < SheetNames.length; isheet++) {


        if (isheet > 0) {

        }

        var rowcount = msbook.Sheet[isheet].Data.length;
        var colcount = msbook.Sheet[isheet].ColumnConfig.length;

        rowadd = 0;
        var xorigin = 10;
        var yorigin = 10;

        var x = xorigin;
        var y = yorigin;
        var border = 1;


        var width = 100;

        var fontsize = 8;
        var height = 3;

        var leftMargin = 1;
        var topMargin = 1;
        var headerRowHeight = 5;
        var cellWidth = 50;


        var config = {
            autoSize: false,
            printHeaders: true,
            margins: 0,
            padding: 0
        }
        var header = [];
        doc.setFontSize(fontsize);

        var _columnHeaderIndex = msbook.Sheet[isheet].ColumnHeaderIndex;
        if (_columnHeaderIndex >= 1) {
            for (var icol = 0; icol < colcount; icol++) {
                cellWidth = msbook.Sheet[isheet].ColumnWidth(icol);
                if (cellWidth <= 5) continue;
                header.push(msbook.Sheet[isheet].GetText(icol, _columnHeaderIndex - 1) + "");
            }
        }
        else _columnHeaderIndex = 0;


        var data = [];
        var str = "";
        str += "[";
        for (var irow = 0 + _columnHeaderIndex ; irow < rowcount ; irow++) {
            x = xorigin;
            if (irow >= (1 + _columnHeaderIndex)) str += ",";

            str += "{";
            var colindex = 0;
            for (var icol = 0; icol < colcount; icol++) {


                //var formats = p8Spread_ExportGetFormat(excel, msbook.Sheet[isheet], icol, irow);
                var bold = msbook.Sheet[isheet].GetBold(icol, irow);
                dataVal = msbook.Sheet[isheet].GetText(icol, irow);
                cellWidth = msbook.Sheet[isheet].ColumnWidth(icol);
                if (cellWidth <= 5) continue;
                colname = header[colindex];
                colindex++;

                if (icol >= 1) str += ",";
                str += "\"" + colname + "\":\"" + dataVal + "\"";

                //doc.text(dataVal, x, y);
                // doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, dataVal, irow);
                // x += width + border;
            }
            str += "}";
            // y += height + border;
        }
        str += "]";

      
    }

    if ((fileName || "") == "") fileName = "Document";
    fileName = fileName + ".pdf"
    doc.save(fileName);
}

function p8Spread_Print2(msbook, fileName) {
    var doc;
    var orientation = "l";

    var imgwidth = 100;
    var imgheight = 100;

    doc = new jsPDF({ putOnlyUsedFonts: true, orientation: orientation });
    //doc = new jsPDF(
    //       {
    //           orientation: orientation,
    //           unit: 'in'
    //           //,format: [imgwidth , imgheight]
    //       });



    var startRow = 5;
    var dataVal = "";
    var SheetNames = msbook.GetSheets();
    var hdrNames = [];
    //var excel = $JExcel.new("Arial 10 #333333");
    var formula = "";

    var rowadd = 0;


    for (var isheet = 0; isheet < SheetNames.length; isheet++) {


        if (isheet > 0) {
            //doc.addPage({
            //    orientation: orientation,
            //    unit: 'in',
            //    format: [imgwidth, imgheight]
            //});
        }

        var rowcount = msbook.Sheet[isheet].Data.length;
        var colcount = msbook.Sheet[isheet].ColumnConfig.length;

        rowadd = 0;
        var xorigin = 10;
        var yorigin = 10;

        var x = xorigin;
        var y = yorigin;
        var border = 1;
    
       
        var width = 100;

        var fontsize = 8;
        var height = 3;

        var leftMargin = 1;
        var topMargin = 1;
        var headerRowHeight = 5;
        var cellWidth = 50;

       
        var config = {
            autoSize: false,
            printHeaders: true, 
            margins:0,
            padding:0
        }
        var header = [];
        doc.setFontSize(fontsize);
        
        var _columnHeaderIndex=msbook.Sheet[isheet].ColumnHeaderIndex;
        if (_columnHeaderIndex >= 1) {
            for (var icol = 0; icol < colcount; icol++) {
                cellWidth = msbook.Sheet[isheet].ColumnWidth(icol);
                if (cellWidth <= 5) continue;
                header.push(msbook.Sheet[isheet].GetText(icol, _columnHeaderIndex - 1) + "");
            }
        }
        else _columnHeaderIndex = 0;
        

        //  if (msbook.Sheet[isheet].exportColumn) rowadd = 1;


        var data = [];
        var str = "";
        str += "[";
        for (var irow = 0 + _columnHeaderIndex ; irow < rowcount ; irow++) {
            x = xorigin;
            if (irow >= (1+_columnHeaderIndex)) str += ",";

            str += "{";
            var colindex = 0;
            for (var icol = 0; icol < colcount; icol++) {

               
                //var formats = p8Spread_ExportGetFormat(excel, msbook.Sheet[isheet], icol, irow);
                var bold = msbook.Sheet[isheet].GetBold(icol, irow);
                dataVal = msbook.Sheet[isheet].GetText(icol, irow) ;
                cellWidth = msbook.Sheet[isheet].ColumnWidth(icol);
                if (cellWidth <= 5) continue;
                colname = header[colindex];
                colindex++;
                //if (bold == true) doc.setFontType("bold");
                //else doc.setFontType("normal");

                if (icol >= 1) str += ",";
                str += "\"" + colname + "\":\"" + dataVal + "\"";

                //doc.text(dataVal, x, y);
                // doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, dataVal, irow);
               // x += width + border;
            }
            str += "}";
           // y += height + border;
        }
        str += "]";

        data = JSON.parse(str);
        doc.table(1, 1, data, createHeaders(header), config);
        
        

       // excel.freezePane(isheet, msbook.Sheet[isheet].FreezeCol, msbook.Sheet[isheet].FreezeRow + 1);
       // excel.set(isheet, 0, 1, undefined, undefined, msbook.Sheet[isheet].mergeList);
    }

    //autoTable(doc, {
    //    head: [['Name', 'Email', 'Country']],
    //    body: [
    //      ['David', 'david@example.com', 'Sweden'],
    //      ['Castille', 'castille@example.com', 'Spain']
    //      // ...
    //    ],
    //});
    //doc.text("Hello world!", 10, 10);

    if ((fileName|| "") == "") fileName = "Document";
    fileName = fileName + ".pdf"
    doc.save(fileName);
   // excel.generate(fileName + ".xlsx");
}

function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
        result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 50,
            printHeaders: false,
            fontSize:8,
            align: "center",
            headerBackgroundColor : "gray",
            padding: 0
        });
    }
    return result;
}