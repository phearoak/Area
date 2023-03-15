import { Schema } from "express-validator";

const FieldsSchema: Schema = {
    id: {
        in: "params",
        notEmpty: {
            errorMessage: "param id is required.",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param id must be a positive number.",
        },
    },
};

const CreateSchema: Schema = {
    service: {
        in: ["params"],
        notEmpty: {
            errorMessage: "param ServiceId is required.",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param ServiceId must be a positive integer.",
        },
    },
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name is required.",
        },
        isString: {
            errorMessage: "Name must be a string.",
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Name should be at least 2 characters.",
        },
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Description is required.",
        },
        isString: {
            errorMessage: "Description must be a string.",
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Description should be at least 2 characters.",
        },
    },
};

const ReadSchema: Schema = {
    service: {
        in: ["params"],
        notEmpty: {
            errorMessage: "param ServiceId is required.",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param ServiceId must be a positive integer.",
        },
    },
};

const UpdateSchema: Schema = {
    service: {
        in: ["params"],
        notEmpty: {
            errorMessage: "param ServiceId is required.",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param ServiceId must be a positive integer.",
        },
    },
};

const DeleteSchema: Schema = {
    service: {
        in: ["params"],
        notEmpty: {
            errorMessage: "param ServiceId is required.",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "param ServiceId must be a positive integer.",
        },
    },
};

export default {
    FieldsSchema,
    CreateSchema,
    ReadSchema,
    UpdateSchema,
    DeleteSchema,
};
