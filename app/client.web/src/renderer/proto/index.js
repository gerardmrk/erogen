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
     * @property {boolean|null} [authenticated] RendererRequest authenticated
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
     * RendererRequest authenticated.
     * @member {boolean} authenticated
     * @memberof RendererRequest
     * @instance
     */
    RendererRequest.prototype.authenticated = false;

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
        if (message.authenticated != null && message.hasOwnProperty("authenticated"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.authenticated);
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
            case 3:
                message.authenticated = reader.bool();
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
        if (message.authenticated != null && message.hasOwnProperty("authenticated"))
            if (typeof message.authenticated !== "boolean")
                return "authenticated: boolean expected";
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
        if (object.authenticated != null)
            message.authenticated = Boolean(object.authenticated);
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
            object.authenticated = false;
        }
        if (message.url != null && message.hasOwnProperty("url"))
            object.url = message.url;
        if (message.lang != null && message.hasOwnProperty("lang"))
            object.lang = message.lang;
        if (message.authenticated != null && message.hasOwnProperty("authenticated"))
            object.authenticated = message.authenticated;
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
     * @property {RendererResponse.IRenderError|null} [error] RendererResponse error
     * @property {string|null} [redirectTo] RendererResponse redirectTo
     * @property {string|null} [lang] RendererResponse lang
     * @property {string|null} [metas] RendererResponse metas
     * @property {string|null} [app] RendererResponse app
     * @property {string|null} [links] RendererResponse links
     * @property {string|null} [styles] RendererResponse styles
     * @property {string|null} [scripts] RendererResponse scripts
     * @property {string|null} [initialState] RendererResponse initialState
     * @property {string|null} [i18nResources] RendererResponse i18nResources
     * @property {string|null} [ttr] RendererResponse ttr
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
     * @member {RendererResponse.IRenderError|null|undefined} error
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.error = null;

    /**
     * RendererResponse redirectTo.
     * @member {string} redirectTo
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.redirectTo = "";

    /**
     * RendererResponse lang.
     * @member {string} lang
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.lang = "";

    /**
     * RendererResponse metas.
     * @member {string} metas
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.metas = "";

    /**
     * RendererResponse app.
     * @member {string} app
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.app = "";

    /**
     * RendererResponse links.
     * @member {string} links
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.links = "";

    /**
     * RendererResponse styles.
     * @member {string} styles
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.styles = "";

    /**
     * RendererResponse scripts.
     * @member {string} scripts
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.scripts = "";

    /**
     * RendererResponse initialState.
     * @member {string} initialState
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.initialState = "";

    /**
     * RendererResponse i18nResources.
     * @member {string} i18nResources
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.i18nResources = "";

    /**
     * RendererResponse ttr.
     * @member {string} ttr
     * @memberof RendererResponse
     * @instance
     */
    RendererResponse.prototype.ttr = "";

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
            $root.RendererResponse.RenderError.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.redirectTo);
        if (message.lang != null && message.hasOwnProperty("lang"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.lang);
        if (message.metas != null && message.hasOwnProperty("metas"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.metas);
        if (message.app != null && message.hasOwnProperty("app"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.app);
        if (message.links != null && message.hasOwnProperty("links"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.links);
        if (message.styles != null && message.hasOwnProperty("styles"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.styles);
        if (message.scripts != null && message.hasOwnProperty("scripts"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.scripts);
        if (message.initialState != null && message.hasOwnProperty("initialState"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.initialState);
        if (message.i18nResources != null && message.hasOwnProperty("i18nResources"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.i18nResources);
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            writer.uint32(/* id 12, wireType 2 =*/98).string(message.ttr);
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
                message.error = $root.RendererResponse.RenderError.decode(reader, reader.uint32());
                break;
            case 3:
                message.redirectTo = reader.string();
                break;
            case 4:
                message.lang = reader.string();
                break;
            case 5:
                message.metas = reader.string();
                break;
            case 6:
                message.app = reader.string();
                break;
            case 7:
                message.links = reader.string();
                break;
            case 8:
                message.styles = reader.string();
                break;
            case 9:
                message.scripts = reader.string();
                break;
            case 10:
                message.initialState = reader.string();
                break;
            case 11:
                message.i18nResources = reader.string();
                break;
            case 12:
                message.ttr = reader.string();
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
        if (message.error != null && message.hasOwnProperty("error")) {
            var error = $root.RendererResponse.RenderError.verify(message.error);
            if (error)
                return "error." + error;
        }
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            if (!$util.isString(message.redirectTo))
                return "redirectTo: string expected";
        if (message.lang != null && message.hasOwnProperty("lang"))
            if (!$util.isString(message.lang))
                return "lang: string expected";
        if (message.metas != null && message.hasOwnProperty("metas"))
            if (!$util.isString(message.metas))
                return "metas: string expected";
        if (message.app != null && message.hasOwnProperty("app"))
            if (!$util.isString(message.app))
                return "app: string expected";
        if (message.links != null && message.hasOwnProperty("links"))
            if (!$util.isString(message.links))
                return "links: string expected";
        if (message.styles != null && message.hasOwnProperty("styles"))
            if (!$util.isString(message.styles))
                return "styles: string expected";
        if (message.scripts != null && message.hasOwnProperty("scripts"))
            if (!$util.isString(message.scripts))
                return "scripts: string expected";
        if (message.initialState != null && message.hasOwnProperty("initialState"))
            if (!$util.isString(message.initialState))
                return "initialState: string expected";
        if (message.i18nResources != null && message.hasOwnProperty("i18nResources"))
            if (!$util.isString(message.i18nResources))
                return "i18nResources: string expected";
        if (message.ttr != null && message.hasOwnProperty("ttr"))
            if (!$util.isString(message.ttr))
                return "ttr: string expected";
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
        if (object.error != null) {
            if (typeof object.error !== "object")
                throw TypeError(".RendererResponse.error: object expected");
            message.error = $root.RendererResponse.RenderError.fromObject(object.error);
        }
        if (object.redirectTo != null)
            message.redirectTo = String(object.redirectTo);
        if (object.lang != null)
            message.lang = String(object.lang);
        if (object.metas != null)
            message.metas = String(object.metas);
        if (object.app != null)
            message.app = String(object.app);
        if (object.links != null)
            message.links = String(object.links);
        if (object.styles != null)
            message.styles = String(object.styles);
        if (object.scripts != null)
            message.scripts = String(object.scripts);
        if (object.initialState != null)
            message.initialState = String(object.initialState);
        if (object.i18nResources != null)
            message.i18nResources = String(object.i18nResources);
        if (object.ttr != null)
            message.ttr = String(object.ttr);
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
            object.error = null;
            object.redirectTo = "";
            object.lang = "";
            object.metas = "";
            object.app = "";
            object.links = "";
            object.styles = "";
            object.scripts = "";
            object.initialState = "";
            object.i18nResources = "";
            object.ttr = "";
        }
        if (message.statusCode != null && message.hasOwnProperty("statusCode"))
            object.statusCode = message.statusCode;
        if (message.error != null && message.hasOwnProperty("error"))
            object.error = $root.RendererResponse.RenderError.toObject(message.error, options);
        if (message.redirectTo != null && message.hasOwnProperty("redirectTo"))
            object.redirectTo = message.redirectTo;
        if (message.lang != null && message.hasOwnProperty("lang"))
            object.lang = message.lang;
        if (message.metas != null && message.hasOwnProperty("metas"))
            object.metas = message.metas;
        if (message.app != null && message.hasOwnProperty("app"))
            object.app = message.app;
        if (message.links != null && message.hasOwnProperty("links"))
            object.links = message.links;
        if (message.styles != null && message.hasOwnProperty("styles"))
            object.styles = message.styles;
        if (message.scripts != null && message.hasOwnProperty("scripts"))
            object.scripts = message.scripts;
        if (message.initialState != null && message.hasOwnProperty("initialState"))
            object.initialState = message.initialState;
        if (message.i18nResources != null && message.hasOwnProperty("i18nResources"))
            object.i18nResources = message.i18nResources;
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

    RendererResponse.RenderError = (function() {

        /**
         * Properties of a RenderError.
         * @memberof RendererResponse
         * @interface IRenderError
         * @property {string|null} [message] RenderError message
         * @property {string|null} [stackTrace] RenderError stackTrace
         */

        /**
         * Constructs a new RenderError.
         * @memberof RendererResponse
         * @classdesc Represents a RenderError.
         * @implements IRenderError
         * @constructor
         * @param {RendererResponse.IRenderError=} [properties] Properties to set
         */
        function RenderError(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RenderError message.
         * @member {string} message
         * @memberof RendererResponse.RenderError
         * @instance
         */
        RenderError.prototype.message = "";

        /**
         * RenderError stackTrace.
         * @member {string} stackTrace
         * @memberof RendererResponse.RenderError
         * @instance
         */
        RenderError.prototype.stackTrace = "";

        /**
         * Creates a new RenderError instance using the specified properties.
         * @function create
         * @memberof RendererResponse.RenderError
         * @static
         * @param {RendererResponse.IRenderError=} [properties] Properties to set
         * @returns {RendererResponse.RenderError} RenderError instance
         */
        RenderError.create = function create(properties) {
            return new RenderError(properties);
        };

        /**
         * Encodes the specified RenderError message. Does not implicitly {@link RendererResponse.RenderError.verify|verify} messages.
         * @function encode
         * @memberof RendererResponse.RenderError
         * @static
         * @param {RendererResponse.IRenderError} message RenderError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenderError.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            if (message.stackTrace != null && message.hasOwnProperty("stackTrace"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.stackTrace);
            return writer;
        };

        /**
         * Encodes the specified RenderError message, length delimited. Does not implicitly {@link RendererResponse.RenderError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RendererResponse.RenderError
         * @static
         * @param {RendererResponse.IRenderError} message RenderError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenderError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RenderError message from the specified reader or buffer.
         * @function decode
         * @memberof RendererResponse.RenderError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RendererResponse.RenderError} RenderError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenderError.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RendererResponse.RenderError();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                case 2:
                    message.stackTrace = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RenderError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RendererResponse.RenderError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RendererResponse.RenderError} RenderError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenderError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RenderError message.
         * @function verify
         * @memberof RendererResponse.RenderError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenderError.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.stackTrace != null && message.hasOwnProperty("stackTrace"))
                if (!$util.isString(message.stackTrace))
                    return "stackTrace: string expected";
            return null;
        };

        /**
         * Creates a RenderError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RendererResponse.RenderError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RendererResponse.RenderError} RenderError
         */
        RenderError.fromObject = function fromObject(object) {
            if (object instanceof $root.RendererResponse.RenderError)
                return object;
            var message = new $root.RendererResponse.RenderError();
            if (object.message != null)
                message.message = String(object.message);
            if (object.stackTrace != null)
                message.stackTrace = String(object.stackTrace);
            return message;
        };

        /**
         * Creates a plain object from a RenderError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RendererResponse.RenderError
         * @static
         * @param {RendererResponse.RenderError} message RenderError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenderError.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.message = "";
                object.stackTrace = "";
            }
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.stackTrace != null && message.hasOwnProperty("stackTrace"))
                object.stackTrace = message.stackTrace;
            return object;
        };

        /**
         * Converts this RenderError to JSON.
         * @function toJSON
         * @memberof RendererResponse.RenderError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenderError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RenderError;
    })();

    return RendererResponse;
})();

module.exports = $root;
