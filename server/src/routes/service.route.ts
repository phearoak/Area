import { ServiceController } from "@controllers";
import { isAdmin, isAuthenticated } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validator.middleware";
import { ServiceSchema } from "@validations";
import { Router } from "express";

const router = Router();

router.post(
    "/",
    isAdmin,
    validate(ServiceSchema.CreateSchema),
    ServiceController.create
);
router.get(
    "/",
    // isAdmin,
    // validate(ServiceSchema.ReadSchema),
    ServiceController.get
);
router.get(
    "/:id",
    isAuthenticated,
    validate(ServiceSchema.ReadSchema),
    ServiceController.read
);
router.patch("/", isAdmin, ServiceController.update);
router.delete("/", isAdmin, ServiceController.delete);

export default router;
