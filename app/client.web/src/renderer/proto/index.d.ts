import * as $protobuf from "protobufjs";
/** Properties of a RendererRequest. */
export interface IRendererRequest {

    /** RendererRequest url */
    url?: (string|null);

    /** RendererRequest lang */
    lang?: (string|null);

    /** RendererRequest authenticated */
    authenticated?: (boolean|null);
}

/** Represents a RendererRequest. */
export class RendererRequest implements IRendererRequest {

    /**
     * Constructs a new RendererRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRendererRequest);

    /** RendererRequest url. */
    public url: string;

    /** RendererRequest lang. */
    public lang: string;

    /** RendererRequest authenticated. */
    public authenticated: boolean;

    /**
     * Creates a new RendererRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RendererRequest instance
     */
    public static create(properties?: IRendererRequest): RendererRequest;

    /**
     * Encodes the specified RendererRequest message. Does not implicitly {@link RendererRequest.verify|verify} messages.
     * @param message RendererRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRendererRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RendererRequest message, length delimited. Does not implicitly {@link RendererRequest.verify|verify} messages.
     * @param message RendererRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRendererRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RendererRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RendererRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RendererRequest;

    /**
     * Decodes a RendererRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RendererRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RendererRequest;

    /**
     * Verifies a RendererRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RendererRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RendererRequest
     */
    public static fromObject(object: { [k: string]: any }): RendererRequest;

    /**
     * Creates a plain object from a RendererRequest message. Also converts values to other types if specified.
     * @param message RendererRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RendererRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RendererRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RendererResponse. */
export interface IRendererResponse {

    /** RendererResponse statusCode */
    statusCode?: (number|null);

    /** RendererResponse error */
    error?: (RendererResponse.IRenderError|null);

    /** RendererResponse redirectTo */
    redirectTo?: (string|null);

    /** RendererResponse lang */
    lang?: (string|null);

    /** RendererResponse metas */
    metas?: (string|null);

    /** RendererResponse app */
    app?: (string|null);

    /** RendererResponse links */
    links?: (string|null);

    /** RendererResponse styles */
    styles?: (string|null);

    /** RendererResponse scripts */
    scripts?: (string|null);

    /** RendererResponse initialState */
    initialState?: (string|null);

    /** RendererResponse i18nResources */
    i18nResources?: (string|null);

    /** RendererResponse ttr */
    ttr?: (string|null);
}

/** Represents a RendererResponse. */
export class RendererResponse implements IRendererResponse {

    /**
     * Constructs a new RendererResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRendererResponse);

    /** RendererResponse statusCode. */
    public statusCode: number;

    /** RendererResponse error. */
    public error?: (RendererResponse.IRenderError|null);

    /** RendererResponse redirectTo. */
    public redirectTo: string;

    /** RendererResponse lang. */
    public lang: string;

    /** RendererResponse metas. */
    public metas: string;

    /** RendererResponse app. */
    public app: string;

    /** RendererResponse links. */
    public links: string;

    /** RendererResponse styles. */
    public styles: string;

    /** RendererResponse scripts. */
    public scripts: string;

    /** RendererResponse initialState. */
    public initialState: string;

    /** RendererResponse i18nResources. */
    public i18nResources: string;

    /** RendererResponse ttr. */
    public ttr: string;

    /**
     * Creates a new RendererResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RendererResponse instance
     */
    public static create(properties?: IRendererResponse): RendererResponse;

    /**
     * Encodes the specified RendererResponse message. Does not implicitly {@link RendererResponse.verify|verify} messages.
     * @param message RendererResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRendererResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RendererResponse message, length delimited. Does not implicitly {@link RendererResponse.verify|verify} messages.
     * @param message RendererResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRendererResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RendererResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RendererResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RendererResponse;

    /**
     * Decodes a RendererResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RendererResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RendererResponse;

    /**
     * Verifies a RendererResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RendererResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RendererResponse
     */
    public static fromObject(object: { [k: string]: any }): RendererResponse;

    /**
     * Creates a plain object from a RendererResponse message. Also converts values to other types if specified.
     * @param message RendererResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RendererResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RendererResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace RendererResponse {

    /** Properties of a RenderError. */
    interface IRenderError {

        /** RenderError message */
        message?: (string|null);

        /** RenderError stackTrace */
        stackTrace?: (string|null);
    }

    /** Represents a RenderError. */
    class RenderError implements IRenderError {

        /**
         * Constructs a new RenderError.
         * @param [properties] Properties to set
         */
        constructor(properties?: RendererResponse.IRenderError);

        /** RenderError message. */
        public message: string;

        /** RenderError stackTrace. */
        public stackTrace: string;

        /**
         * Creates a new RenderError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RenderError instance
         */
        public static create(properties?: RendererResponse.IRenderError): RendererResponse.RenderError;

        /**
         * Encodes the specified RenderError message. Does not implicitly {@link RendererResponse.RenderError.verify|verify} messages.
         * @param message RenderError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RendererResponse.IRenderError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenderError message, length delimited. Does not implicitly {@link RendererResponse.RenderError.verify|verify} messages.
         * @param message RenderError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RendererResponse.IRenderError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenderError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenderError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RendererResponse.RenderError;

        /**
         * Decodes a RenderError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenderError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RendererResponse.RenderError;

        /**
         * Verifies a RenderError message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenderError message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenderError
         */
        public static fromObject(object: { [k: string]: any }): RendererResponse.RenderError;

        /**
         * Creates a plain object from a RenderError message. Also converts values to other types if specified.
         * @param message RenderError
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RendererResponse.RenderError, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenderError to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
