import { FieldController } from "@controllers";
import { isAdmin } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validator.middleware";
import { FieldSchema } from "@validations";
import { Router } from "express";

const router = Router();

router.post(
    "/",
    isAdmin,
    validate(FieldSchema.CreateSchema),
    FieldController.create
);
router.get(
    "/:id",
    isAdmin,
    validate(FieldSchema.ReadSchema),
    FieldController.read
);
router.patch(
    "/:id",
    isAdmin,
    validate(FieldSchema.UpdateSchema),
    FieldController.update
);
router.delete(
    "/:id",
    isAdmin,
    validate(FieldSchema.DeleteSchema),
    FieldController.delete
);

export default router;
