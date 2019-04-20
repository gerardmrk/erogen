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
     * @property {Uint8Array|null} [renderedHtmlHead] RendererResponse renderedHtmlHead
     * @property {Uint8Array|null} [renderedHtmlBody] RendererResponse renderedHtmlBody
     * @property {Uint8Array|null} [renderedHtmlStyles] RendererResponse renderedHtmlStyles
     * @property {Uint8Array|null} [renderedHtmlScripts] RendererResponse renderedHtmlScripts
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
     * RendererResponse renderedHtmlHead.
     * @member {Uint8Array} renderedHtmlHead
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedHtmlHead = $util.newBuffer([]);

    /**
     * RendererResponse renderedHtmlBody.
     * @member {Uint8Array} renderedHtmlBody
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedHtmlBody = $util.newBuffer([]);

    /**
     * RendererResponse renderedHtmlStyles.
     * @member {Uint8Array} renderedHtmlStyles
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedHtmlStyles = $util.newBuffer([]);

    /**
     * RendererResponse renderedHtmlScripts.
     * @member {Uint8Array} renderedHtmlScripts
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.renderedHtmlScripts = $util.newBuffer([]);

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
        if (message.renderedHtmlHead != null && message.hasOwnProperty("renderedHtmlHead"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.renderedHtmlHead);
        if (message.renderedHtmlBody != null && message.hasOwnProperty("renderedHtmlBody"))
            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.renderedHtmlBody);
        if (message.renderedHtmlStyles != null && message.hasOwnProperty("renderedHtmlStyles"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.renderedHtmlStyles);
        if (message.renderedHtmlScripts != null && message.hasOwnProperty("renderedHtmlScripts"))
            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.renderedHtmlScripts);
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ttr);
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
                message.renderedHtmlHead = reader.bytes();
                break;
            case 5:
                message.renderedHtmlBody = reader.bytes();
                break;
            case 6:
                message.renderedHtmlStyles = reader.bytes();
                break;
            case 7:
                message.renderedHtmlScripts = reader.bytes();
                break;
            case 8:
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
        if (message.renderedHtmlHead != null && message.hasOwnProperty("renderedHtmlHead"))
            if (!(message.renderedHtmlHead && typeof message.renderedHtmlHead.length === "number" || $util.isString(message.renderedHtmlHead)))
                return "renderedHtmlHead: buffer expected";
        if (message.renderedHtmlBody != null && message.hasOwnProperty("renderedHtmlBody"))
            if (!(message.renderedHtmlBody && typeof message.renderedHtmlBody.length === "number" || $util.isString(message.renderedHtmlBody)))
                return "renderedHtmlBody: buffer expected";
        if (message.renderedHtmlStyles != null && message.hasOwnProperty("renderedHtmlStyles"))
            if (!(message.renderedHtmlStyles && typeof message.renderedHtmlStyles.length === "number" || $util.isString(message.renderedHtmlStyles)))
                return "renderedHtmlStyles: buffer expected";
        if (message.renderedHtmlScripts != null && message.hasOwnProperty("renderedHtmlScripts"))
            if (!(message.renderedHtmlScripts && typeof message.renderedHtmlScripts.length === "number" || $util.isString(message.renderedHtmlScripts)))
                return "renderedHtmlScripts: buffer expected";
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
        if (object.renderedHtmlHead != null)
            if (typeof object.renderedHtmlHead === "string")
                $util.base64.decode(object.renderedHtmlHead, message.renderedHtmlHead = $util.newBuffer($util.base64.length(object.renderedHtmlHead)), 0);
            else if (object.renderedHtmlHead.length)
                message.renderedHtmlHead = object.renderedHtmlHead;
        if (object.renderedHtmlBody != null)
            if (typeof object.renderedHtmlBody === "string")
                $util.base64.decode(object.renderedHtmlBody, message.renderedHtmlBody = $util.newBuffer($util.base64.length(object.renderedHtmlBody)), 0);
            else if (object.renderedHtmlBody.length)
                message.renderedHtmlBody = object.renderedHtmlBody;
        if (object.renderedHtmlStyles != null)
            if (typeof object.renderedHtmlStyles === "string")
                $util.base64.decode(object.renderedHtmlStyles, message.renderedHtmlStyles = $util.newBuffer($util.base64.length(object.renderedHtmlStyles)), 0);
            else if (object.renderedHtmlStyles.length)
                message.renderedHtmlStyles = object.renderedHtmlStyles;
        if (object.renderedHtmlScripts != null)
            if (typeof object.renderedHtmlScripts === "string")
                $util.base64.decode(object.renderedHtmlScripts, message.renderedHtmlScripts = $util.newBuffer($util.base64.length(object.renderedHtmlScripts)), 0);
            else if (object.renderedHtmlScripts.length)
                message.renderedHtmlScripts = object.renderedHtmlScripts;
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
                object.renderedHtmlHead = "";
            else {
                object.renderedHtmlHead = [];
                if (options.bytes !== Array)
                    object.renderedHtmlHead = $util.newBuffer(object.renderedHtmlHead);
            }
            if (options.bytes === String)
                object.renderedHtmlBody = "";
            else {
                object.renderedHtmlBody = [];
                if (options.bytes !== Array)
                    object.renderedHtmlBody = $util.newBuffer(object.renderedHtmlBody);
            }
            if (options.bytes === String)
                object.renderedHtmlStyles = "";
            else {
                object.renderedHtmlStyles = [];
                if (options.bytes !== Array)
                    object.renderedHtmlStyles = $util.newBuffer(object.renderedHtmlStyles);
            }
            if (options.bytes === String)
                object.renderedHtmlScripts = "";
            else {
                object.renderedHtmlScripts = [];
                if (options.bytes !== Array)
                    object.renderedHtmlScripts = $util.newBuffer(object.renderedHtmlScripts);
            }
            object.ttr = 0;
        }
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            object.statusCode = message.statusCode;
        if (message.error != null && message.hasOwnProperty("error"))
            object.error = message.error;
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            object.redirectTo = message.redirectTo;
        if (message.renderedHtmlHead != null && message.hasOwnProperty("renderedHtmlHead"))
            object.renderedHtmlHead = options.bytes === String ? $util.base64.encode(message.renderedHtmlHead, 0, message.renderedHtmlHead.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedHtmlHead) : message.renderedHtmlHead;
        if (message.renderedHtmlBody != null && message.hasOwnProperty("renderedHtmlBody"))
            object.renderedHtmlBody = options.bytes === String ? $util.base64.encode(message.renderedHtmlBody, 0, message.renderedHtmlBody.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedHtmlBody) : message.renderedHtmlBody;
        if (message.renderedHtmlStyles != null && message.hasOwnProperty("renderedHtmlStyles"))
            object.renderedHtmlStyles = options.bytes === String ? $util.base64.encode(message.renderedHtmlStyles, 0, message.renderedHtmlStyles.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedHtmlStyles) : message.renderedHtmlStyles;
        if (message.renderedHtmlScripts != null && message.hasOwnProperty("renderedHtmlScripts"))
            object.renderedHtmlScripts = options.bytes === String ? $util.base64.encode(message.renderedHtmlScripts, 0, message.renderedHtmlScripts.length) : options.bytes === Array ? Array.prototype.slice.call(message.renderedHtmlScripts) : message.renderedHtmlScripts;
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
