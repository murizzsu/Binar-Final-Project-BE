const statusCodeMapping = {
    400: "BadRequest",
    403: "Forbidden",
    422: "UnprocessableEntity",
    500: "InternalServerError",
};

const newErrorKind = (statusCode) => {
    return statusCodeMapping[statusCode];
};

const newError4xxPayload = (statusCode, message) => {
    return {
        self: "Error",
        statusCode,
        kind: newErrorKind(statusCode),
        message,
    };
};

const newError500Payload = (message) => {
    return {
        self: "Error",
        statusCode: 500,
        kind: newErrorKind(500),
        message,
    };
};

const Error4xx = (res, statusCode, message) => {
    res.status(statusCode).json(newError4xxPayload(statusCode, message));
};

const Error500 = (res, message) => {
    res.status(500).json(newError500Payload(message));
};


module.exports = {
    Error4xx,
    Error500
};
