import { ReactionController } from "@controllers";
import { isAdmin, isAuthenticated } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validator.middleware";
import { ReactionSchema } from "@validations";
import { Router } from "express";

const router = Router();

router.get(
    "/:id/fields",
    isAuthenticated,
    validate(ReactionSchema.FieldsSchema),
    ReactionController.fields
);

router.get(
    "/",
    isAuthenticated,
    ReactionController.get
);

router.post(
    "/:service",
    isAdmin,
    validate(ReactionSchema.CreateSchema),
    ReactionController.create
);
router.get(
    "/:service/:id",
    isAdmin,
    validate(ReactionSchema.ReadSchema),
    ReactionController.read
);
router.patch(
    "/:service",
    isAdmin,
    validate(ReactionSchema.UpdateSchema),
    ReactionController.update
);
router.delete(
    "/:service",
    isAdmin,
    validate(ReactionSchema.DeleteSchema),
    ReactionController.delete
);

export default router;
