/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.RendererRequest = (function() {

    /**
     * Properties of a RendererRequest.
     * @exports IRendererRequest
     * @interface IRendererRequest
     * @property {string|null} [url] RendererRequest url
     * @property {string|null} [lang] RendererRequest lang
     */

    /**
     * Constructs a new RendererRequest.
     * @exports RendererRequest
     * @classdesc Represents a RendererRequest.
     * @implements IRendererRequest
     * @constructor
     * @param {IRendererRequest=} [properties] Properties to set
     */
    function RendererRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RendererRequest url.
     * @member {string} url
     * @memberof RendererRequest
     * @instance
     */
    RendererRequest.prototype.url = "";

    /**
     * RendererRequest lang.
     * @member {string} lang
     * @memberof RendererRequest
     * @instance
     */
    RendererRequest.prototype.lang = "";

    /**
     * Creates a new RendererRequest instance using the specified properties.
     * @function create
     * @memberof RendererRequest
     * @static
     * @param {IRendererRequest=} [properties] Properties to set
     * @returns {RendererRequest} RendererRequest instance
     */
    RendererRequest.create = function create(properties) {
        return new RendererRequest(properties);
    };

    /**
     * Encodes the specified RendererRequest message. Does not implicitly {@link RendererRequest.verify|verify} messages.
     * @function encode
     * @memberof RendererRequest
     * @static
     * @param {IRendererRequest} message RendererRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.url != null && message.hasOwnProperty("url"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
        if (message.lang != null && message.hasOwnProperty("lang"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.lang);
        return writer;
    };

    /**
     * Encodes the specified RendererRequest message, length delimited. Does not implicitly {@link RendererRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RendererRequest
     * @static
     * @param {IRendererRequest} message RendererRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RendererRequest message from the specified reader or buffer.
     * @function decode
     * @memberof RendererRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RendererRequest} RendererRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RendererRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.url = reader.string();
                break;
            case 2:
                message.lang = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RendererRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RendererRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RendererRequest} RendererRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RendererRequest message.
     * @function verify
     * @memberof RendererRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RendererRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.url != null && message.hasOwnProperty("url"))
            if (!$util.isString(message.url))
                return "url: string expected";
        if (message.lang != null && message.hasOwnProperty("lang"))
            if (!$util.isString(message.lang))
                return "lang: string expected";
        return null;
    };

    /**
     * Creates a RendererRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RendererRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RendererRequest} RendererRequest
     */
    RendererRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.RendererRequest)
            return object;
        var message = new $root.RendererRequest();
        if (object.url != null)
            message.url = String(object.url);
        if (object.lang != null)
            message.lang = String(object.lang);
        return message;
    };

    /**
     * Creates a plain object from a RendererRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RendererRequest
     * @static
     * @param {RendererRequest} message RendererRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RendererRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.url = "";
            object.lang = "";
        }
        if (message.url != null && message.hasOwnProperty("url"))
            object.url = message.url;
        if (message.lang != null && message.hasOwnProperty("lang"))
            object.lang = message.lang;
        return object;
    };

    /**
     * Converts this RendererRequest to JSON.
     * @function toJSON
     * @memberof RendererRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RendererRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RendererRequest;
})();

$root.RendererResponse = (function() {

    /**
     * Properties of a RendererResponse.
     * @exports IRendererResponse
     * @interface IRendererResponse
     * @property {number|null} [statusCode] RendererResponse statusCode
     * @property {string|null} [error] RendererResponse error
     * @property {string|null} [redirectTo] RendererResponse redirectTo
     * @property {Uint8Array|null} [htmlHead] RendererResponse htmlHead
     * @property {Uint8Array|null} [htmlBody] RendererResponse htmlBody
     * @property {Uint8Array|null} [htmlLinks] RendererResponse htmlLinks
     * @property {Uint8Array|null} [htmlStyles] RendererResponse htmlStyles
     * @property {Uint8Array|null} [htmlScripts] RendererResponse htmlScripts
     * @property {number|null} [ttr] RendererResponse ttr
     */

    /**
     * Constructs a new RendererResponse.
     * @exports RendererResponse
     * @classdesc Represents a RendererResponse.
     * @implements IRendererResponse
     * @constructor
     * @param {IRendererResponse=} [properties] Properties to set
     */
    function RendererResponse(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RendererResponse statusCode.
     * @member {number} statusCode
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.statusCode = 0;

    /**
     * RendererResponse error.
     * @member {string} error
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.error = "";

    /**
     * RendererResponse redirectTo.
     * @member {string} redirectTo
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.redirectTo = "";

    /**
     * RendererResponse htmlHead.
     * @member {Uint8Array} htmlHead
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.htmlHead = $util.newBuffer([]);

    /**
     * RendererResponse htmlBody.
     * @member {Uint8Array} htmlBody
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.htmlBody = $util.newBuffer([]);

    /**
     * RendererResponse htmlLinks.
     * @member {Uint8Array} htmlLinks
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.htmlLinks = $util.newBuffer([]);

    /**
     * RendererResponse htmlStyles.
     * @member {Uint8Array} htmlStyles
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.htmlStyles = $util.newBuffer([]);

    /**
     * RendererResponse htmlScripts.
     * @member {Uint8Array} htmlScripts
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.htmlScripts = $util.newBuffer([]);

    /**
     * RendererResponse ttr.
     * @member {number} ttr
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.ttr = 0;

    /**
     * Creates a new RendererResponse instance using the specified properties.
     * @function create
     * @memberof RendererResponse
     * @static
     * @param {IRendererResponse=} [properties] Properties to set
     * @returns {RendererResponse} RendererResponse instance
     */
    RendererResponse.create = function create(properties) {
        return new RendererResponse(properties);
    };

    /**
     * Encodes the specified RendererResponse message. Does not implicitly {@link RendererResponse.verify|verify} messages.
     * @function encode
     * @memberof RendererResponse
     * @static
     * @param {IRendererResponse} message RendererResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.statusCode);
        if (message.error != null && message.hasOwnProperty("error"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.error);
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.redirectTo);
        if (message.htmlHead != null && message.hasOwnProperty("htmlHead"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.htmlHead);
        if (message.htmlBody != null && message.hasOwnProperty("htmlBody"))
            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.htmlBody);
        if (message.htmlLinks != null && message.hasOwnProperty("htmlLinks"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.htmlLinks);
        if (message.htmlStyles != null && message.hasOwnProperty("htmlStyles"))
            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.htmlStyles);
        if (message.htmlScripts != null && message.hasOwnProperty("htmlScripts"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.htmlScripts);
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.ttr);
        return writer;
    };

    /**
     * Encodes the specified RendererResponse message, length delimited. Does not implicitly {@link RendererResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RendererResponse
     * @static
     * @param {IRendererResponse} message RendererResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RendererResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RendererResponse message from the specified reader or buffer.
     * @function decode
     * @memberof RendererResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RendererResponse} RendererResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RendererResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.statusCode = reader.int32();
                break;
            case 2:
                message.error = reader.string();
                break;
            case 3:
                message.redirectTo = reader.string();
                break;
            case 4:
                message.htmlHead = reader.bytes();
                break;
            case 5:
                message.htmlBody = reader.bytes();
                break;
            case 6:
                message.htmlLinks = reader.bytes();
                break;
            case 7:
                message.htmlStyles = reader.bytes();
                break;
            case 8:
                message.htmlScripts = reader.bytes();
                break;
            case 9:
                message.ttr = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RendererResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RendererResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RendererResponse} RendererResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RendererResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RendererResponse message.
     * @function verify
     * @memberof RendererResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RendererResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            if (!$util.isInteger(message.statusCode))
                return "statusCode: integer expected";
        if (message.error != null && message.hasOwnProperty("error"))
            if (!$util.isString(message.error))
                return "error: string expected";
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            if (!$util.isString(message.redirectTo))
                return "redirectTo: string expected";
        if (message.htmlHead != null && message.hasOwnProperty("htmlHead"))
            if (!(message.htmlHead && typeof message.htmlHead.length === "number" || $util.isString(message.htmlHead)))
                return "htmlHead: buffer expected";
        if (message.htmlBody != null && message.hasOwnProperty("htmlBody"))
            if (!(message.htmlBody && typeof message.htmlBody.length === "number" || $util.isString(message.htmlBody)))
                return "htmlBody: buffer expected";
        if (message.htmlLinks != null && message.hasOwnProperty("htmlLinks"))
            if (!(message.htmlLinks && typeof message.htmlLinks.length === "number" || $util.isString(message.htmlLinks)))
                return "htmlLinks: buffer expected";
        if (message.htmlStyles != null && message.hasOwnProperty("htmlStyles"))
            if (!(message.htmlStyles && typeof message.htmlStyles.length === "number" || $util.isString(message.htmlStyles)))
                return "htmlStyles: buffer expected";
        if (message.htmlScripts != null && message.hasOwnProperty("htmlScripts"))
            if (!(message.htmlScripts && typeof message.htmlScripts.length === "number" || $util.isString(message.htmlScripts)))
                return "htmlScripts: buffer expected";
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            if (!$util.isInteger(message.ttr))
                return "ttr: integer expected";
        return null;
    };

    /**
     * Creates a RendererResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RendererResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RendererResponse} RendererResponse
     */
    RendererResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.RendererResponse)
            return object;
        var message = new $root.RendererResponse();
        if (object.statusCode != null)
            message.statusCode = object.statusCode | 0;
        if (object.error != null)
            message.error = String(object.error);
        if (object.redirectTo != null)
            message.redirectTo = String(object.redirectTo);
        if (object.htmlHead != null)
            if (typeof object.htmlHead === "string")
                $util.base64.decode(object.htmlHead, message.htmlHead = $util.newBuffer($util.base64.length(object.htmlHead)), 0);
            else if (object.htmlHead.length)
                message.htmlHead = object.htmlHead;
        if (object.htmlBody != null)
            if (typeof object.htmlBody === "string")
                $util.base64.decode(object.htmlBody, message.htmlBody = $util.newBuffer($util.base64.length(object.htmlBody)), 0);
            else if (object.htmlBody.length)
                message.htmlBody = object.htmlBody;
        if (object.htmlLinks != null)
            if (typeof object.htmlLinks === "string")
                $util.base64.decode(object.htmlLinks, message.htmlLinks = $util.newBuffer($util.base64.length(object.htmlLinks)), 0);
            else if (object.htmlLinks.length)
                message.htmlLinks = object.htmlLinks;
        if (object.htmlStyles != null)
            if (typeof object.htmlStyles === "string")
                $util.base64.decode(object.htmlStyles, message.htmlStyles = $util.newBuffer($util.base64.length(object.htmlStyles)), 0);
            else if (object.htmlStyles.length)
                message.htmlStyles = object.htmlStyles;
        if (object.htmlScripts != null)
            if (typeof object.htmlScripts === "string")
                $util.base64.decode(object.htmlScripts, message.htmlScripts = $util.newBuffer($util.base64.length(object.htmlScripts)), 0);
            else if (object.htmlScripts.length)
                message.htmlScripts = object.htmlScripts;
        if (object.ttr != null)
            message.ttr = object.ttr | 0;
        return message;
    };

    /**
     * Creates a plain object from a RendererResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RendererResponse
     * @static
     * @param {RendererResponse} message RendererResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RendererResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.statusCode = 0;
            object.error = "";
            object.redirectTo = "";
            if (options.bytes === String)
                object.htmlHead = "";
            else {
                object.htmlHead = [];
                if (options.bytes !== Array)
                    object.htmlHead = $util.newBuffer(object.htmlHead);
            }
            if (options.bytes === String)
                object.htmlBody = "";
            else {
                object.htmlBody = [];
                if (options.bytes !== Array)
                    object.htmlBody = $util.newBuffer(object.htmlBody);
            }
            if (options.bytes === String)
                object.htmlLinks = "";
            else {
                object.htmlLinks = [];
                if (options.bytes !== Array)
                    object.htmlLinks = $util.newBuffer(object.htmlLinks);
            }
            if (options.bytes === String)
                object.htmlStyles = "";
            else {
                object.htmlStyles = [];
                if (options.bytes !== Array)
                    object.htmlStyles = $util.newBuffer(object.htmlStyles);
            }
            if (options.bytes === String)
                object.htmlScripts = "";
            else {
                object.htmlScripts = [];
                if (options.bytes !== Array)
                    object.htmlScripts = $util.newBuffer(object.htmlScripts);
            }
            object.ttr = 0;
        }
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            object.statusCode = message.statusCode;
        if (message.error != null && message.hasOwnProperty("error"))
            object.error = message.error;
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            object.redirectTo = message.redirectTo;
        if (message.htmlHead != null && message.hasOwnProperty("htmlHead"))
            object.htmlHead = options.bytes === String ? $util.base64.encode(message.htmlHead, 0, message.htmlHead.length) : options.bytes === Array ? Array.prototype.slice.call(message.htmlHead) : message.htmlHead;
        if (message.htmlBody != null && message.hasOwnProperty("htmlBody"))
            object.htmlBody = options.bytes === String ? $util.base64.encode(message.htmlBody, 0, message.htmlBody.length) : options.bytes === Array ? Array.prototype.slice.call(message.htmlBody) : message.htmlBody;
        if (message.htmlLinks != null && message.hasOwnProperty("htmlLinks"))
            object.htmlLinks = options.bytes === String ? $util.base64.encode(message.htmlLinks, 0, message.htmlLinks.length) : options.bytes === Array ? Array.prototype.slice.call(message.htmlLinks) : message.htmlLinks;
        if (message.htmlStyles != null && message.hasOwnProperty("htmlStyles"))
            object.htmlStyles = options.bytes === String ? $util.base64.encode(message.htmlStyles, 0, message.htmlStyles.length) : options.bytes === Array ? Array.prototype.slice.call(message.htmlStyles) : message.htmlStyles;
        if (message.htmlScripts != null && message.hasOwnProperty("htmlScripts"))
            object.htmlScripts = options.bytes === String ? $util.base64.encode(message.htmlScripts, 0, message.htmlScripts.length) : options.bytes === Array ? Array.prototype.slice.call(message.htmlScripts) : message.htmlScripts;
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            object.ttr = message.ttr;
        return object;
    };

    /**
     * Converts this RendererResponse to JSON.
     * @function toJSON
     * @memberof RendererResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RendererResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RendererResponse;
})();

module.exports = $root;
