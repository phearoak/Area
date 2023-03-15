import { WorkflowController } from "@controllers";
import { isAdmin, isAuthenticated } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validator.middleware";
import WorkflowSchema from "@validations/WorkflowSchema";
import { Router } from "express";

const router = Router();

router.post(
    "/",
    isAuthenticated,
    validate(WorkflowSchema.CreateSchema),
    WorkflowController.create
);
router.post(
    "/callback/:id",
    validate(WorkflowSchema.CallbackSchema),
    WorkflowController.callback
);
router.get("/", isAuthenticated, WorkflowController.getByUser);

export default router;
