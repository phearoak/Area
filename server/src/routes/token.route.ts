import TokenSchema from "@validations/TokenSchema";
import { TokenController } from "@controllers";
import { isAdmin } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validator.middleware";
import { Router } from "express";

const router = Router();

router.post(
    "/:service",
    isAdmin,
    validate(TokenSchema.CreateSchema),
    TokenController.create
);

export default router;
