import { Schema } from "express-validator";

const CreateSchema: Schema = {
    access_token: {
        in: "body",
        notEmpty: {
            errorMessage: "access_token is required",
        },
        isString: {
            errorMessage: "access_token must be a string.",
        },
    },
    service: {
        in: "params",
        notEmpty: {
            errorMessage: "param service_id is required",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param service_id must be a positive number.",
        },
    },
};

export default { CreateSchema };
