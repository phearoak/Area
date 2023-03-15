import { Schema } from "express-validator";

const CreateSchema: Schema = {
    action: {
        in: ["body"],
        notEmpty: {
            errorMessage: "action is required",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "action must be a positive number.",
        },
    },
    action_args: {
        in: "body",
        optional: true,
        isString: {
            errorMessage: "action_args must be a string",
        },
    },
    reaction: {
        in: "body",
        isArray: {
            options: { min: 1 },
            errorMessage: "reaction must be a non-empty array",
        },
    },
    "reaction.*.id": {
        in: "body",
        isInt: {
            options: { min: 1 },
            errorMessage: "reaction.id must be a positive value",
        },
    },
    "reaction.*.args": {
        in: "body",
        optional: true,
        isString: {
            errorMessage: "reaction.id must be a string",
        },
    },
    status: {
        in: "body",
        isBoolean: {
            errorMessage: "status must be a boolean",
        },
        optional: true,
    },
};

const CallbackSchema: Schema = {
    id: {
        in: "params",
        notEmpty: {
            errorMessage: "id is required",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "id must be a positive number.",
        },
    },
};

export default { CreateSchema, CallbackSchema };
