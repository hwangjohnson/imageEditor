
/**
 * Supported content type to be automatically associated with a {@link Request}.
 * @experimental
 */
export enum RequestContentType {
    NONE = 0,
    JSON = 1,
    FORM = 2,
    FORM_DATA = 3,
    TEXT = 4,
    BLOB = 5,
    ARRAY_BUFFER = 6,
}
/**
 * Define which buffer to use to store the response
 * @experimental
 */
export enum ResponseContentType {
    Text = 0,
    Json = 1,
    ArrayBuffer = 2,
    Blob = 3,
}

export enum ResponseType {
    NONE = 0,
    SUCCESS = 1,
    ERROR = 2,
    WARNING = 3,
    INFO = 4
}
