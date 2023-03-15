import { AboutController } from "@controllers";
import { Router } from "express";

const router = Router();

router.get("/", AboutController.about);

export default router;
