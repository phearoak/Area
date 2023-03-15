import { Schema } from "express-validator";

const CreateSchema: Schema = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name is required",
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
            errorMessage: "Description is required",
        },
        isString: {
            errorMessage: "Description must be a string.",
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Description should be at least 2 characters.",
        },
    },
    title: {
        in: "body",
        notEmpty: {
            errorMessage: "Title is required.",
        },
        isString: {
            errorMessage: "Title must be a string.",
        },
    },
};

const ReadSchema: Schema = {
    id: {
        in: ["params"],
        notEmpty: {
            errorMessage: "Id param is required",
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "Id must be a positive integer.",
        },
    },
};

export default { CreateSchema, ReadSchema };
