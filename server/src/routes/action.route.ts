import { ActionController } from "@controllers";
import { isAdmin, isAuthenticated } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validator.middleware";
import { ActionSchema } from "@validations";
import { Router } from "express";

const router = Router();

router.get(
    "/:id/fields",
    isAuthenticated,
    validate(ActionSchema.FieldsSchema),
    ActionController.fields
);
router.get(
    "/",
    isAuthenticated,
    ActionController.get
);
router.post(
    "/:service",
    isAdmin,
    validate(ActionSchema.CreateSchema),
    ActionController.create
);
router.get(
    "/:id",
    isAdmin,
    validate(ActionSchema.ReadSchema),
    ActionController.read
);
router.patch(
    "/:service",
    isAdmin,
    validate(ActionSchema.UpdateSchema),
    ActionController.update
);
router.delete(
    "/:service",
    isAdmin,
    validate(ActionSchema.DeleteSchema),
    ActionController.delete
);

export default router;
