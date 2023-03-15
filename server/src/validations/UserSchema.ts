import { Schema } from "express-validator";

const SignUpSchema: Schema = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "",
        },
        isString: {
            errorMessage: "Email must be a string.",
        },
        isEmail: {
            errorMessage: "Email must be a valid email.",
        },
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required",
        },
        isString: {
            errorMessage: "Password property must be a string",
        },
        isLength: {
            errorMessage: "Password should be at least 8 characters.",
            options: { min: 8 },
        },
    },
};

const SignInSchema: Schema = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is required",
        },
        isString: {
            errorMessage: "Email must be a string.",
        },
        isEmail: {
            errorMessage: "Email must be a valid email.",
        },
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required",
        },
        isString: {
            errorMessage: "Password must be a string",
        },
        isLength: {
            errorMessage: "Password should be at least 8 characters.",
            options: { min: 8 },
        },
    },
};

const SignInGoogleSchema: Schema = {
    access_token: {
        in: "body",
        notEmpty: {
            errorMessage: "access_token is required",
        },
        isString: {
            errorMessage: "access_token must be a string.",
        },
    },
};

export default { SignUpSchema, SignInSchema, SignInGoogleSchema };
