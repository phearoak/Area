import { Schema } from "express-validator";

const CreateSchema: Schema = {
    reaction_id: {
        in: "body",
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "property {reaction_id} must be a positive number.",
        },
    },
    action_id: {
        in: "body",
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "property {action_id} must be a positive number.",
        },
    },
    name: {
        in: "body",
        notEmpty: {
            errorMessage: "property {name} is required.",
        },
        isString: {
            errorMessage: "property {name} must be a string.",
        },
    },
    label: {
        in: "body",
        optional: true,
        isString: {
            errorMessage: "property {label} must be a string.",
        },
    },
    type: {
        in: "body",
        notEmpty: {
            errorMessage: "property {type} is required.",
        },
        isString: {
            errorMessage: "property {type} must be a string.",
        },
    },
    helper: {
        in: "body",
        optional: true,
        isString: {
            errorMessage: "property {helper} must be a string.",
        },
    },
    required: {
        in: "body",
        notEmpty: {
            errorMessage: "property {required} is required",
        },
        isBoolean: {
            errorMessage: "property {required} must be a boolean.",
        },
    },
};

const ReadSchema: Schema = {
    id: {
        in: "params",
        notEmpty: {
            errorMessage: "param id is required",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param id must be a positive integer.",
        },
    },
};

const UpdateSchema: Schema = {
    id: {
        in: "params",
        notEmpty: {
            errorMessage: "param id is required",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param id must be a positive integer.",
        },
    },
};

const DeleteSchema: Schema = {
    id: {
        in: "params",
        notEmpty: {
            errorMessage: "param id is required",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param id must be a positive integer.",
        },
    },
};

export default { CreateSchema, ReadSchema, UpdateSchema, DeleteSchema };
