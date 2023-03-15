import { RevokeController } from "@controllers";
import { isAuthenticated } from "@middlewares/auth.middleware";
// import { AuthController } from "@controllers";
import { Router } from "express";

const router = Router();

router.get("/github", RevokeController.github);
// router.get("/github/authorize", RevokeController.github);

// router.get("/gmail", isAuthenticated, RevokeController.gmailAuthorize);
// router.get("/gmail/authorize", RevokeController.gmail);

// router.get("/youtube", isAuthenticated, RevokeController.youtubeAuthorize);
// router.get("/youtube/authorize", RevokeController.youtube);

// router.get("/youtube/test", RevokeController.test_youtube);

// // router.get("/github/get/channels", RevokeController.github);

// router.get("/discord", isAuthenticated, RevokeController.discordAuthorize);
// router.get("/discord/authorize", RevokeController.discord);

// router.get("/stripe", isAuthenticated, RevokeController.stripeAuthorize);
// router.get("/stripe/authorize", RevokeController.stripe);

// router.get(
//     "/twitter/request_token",
//     RevokeController.twitter_request_access
// );

// router.get("/twitter", isAuthenticated, RevokeController.twitterAuthorize);
// router.get("/twitter/authorize", RevokeController.twitter);

// router.get("/twitter/tweet", RevokeController.tweet);

// router.get("/slack", isAuthenticated, RevokeController.slackAuthorize);
// router.get("/slack/authorize", RevokeController.slack); // Change redirect uri inside slack app params

// router.get("/notion", isAuthenticated, RevokeController.notionAuthorize);
// router.get("/notion/authorize", RevokeController.notion); // Change redirect uri inside slack app params

// router.get("/spotify", isAuthenticated, RevokeController.spotifyAuthorize);
// router.get("/spotify/authorize", RevokeController.spotify);

export default router;
