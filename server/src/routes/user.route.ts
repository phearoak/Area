import { UserController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { UserSchema } from "@validations";
import { Router } from "express";

const router = Router();

router.post(
    "/signup",
    validate(UserSchema.SignUpSchema),
    UserController.signUp
);
router.post(
    "/signin",
    validate(UserSchema.SignInSchema),
    UserController.signIn
);
router.get("/signin/google/authorize", UserController.googleAuthorize);

router.get("/signin/google", UserController.signInGoogle);

router.get("/signin/github/authorize", UserController.githubAuthorize);

router.get("/signin/github", UserController.signInGithub);

router.get("/signin/facebook/authorize", UserController.facebookAuthorize);

router.get("/signin/facebook", UserController.signInFacebook);

export default router;
