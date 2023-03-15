import { ConnectorController } from "@controllers";
import { isAuthenticated } from "@middlewares/auth.middleware";
// import { AuthController } from "@controllers";
import { Router } from "express";

const router = Router();

router.get("/github", isAuthenticated, ConnectorController.githubAuthorize);
router.get("/github/authorize", ConnectorController.github);

router.get("/gmail", isAuthenticated, ConnectorController.gmailAuthorize);
router.get("/gmail/authorize", ConnectorController.gmail);

router.get("/youtube", isAuthenticated, ConnectorController.youtubeAuthorize);
router.get("/youtube/authorize", ConnectorController.youtube);

router.get(
    "/instagram",
    isAuthenticated,
    ConnectorController.instagramAuthorize
);
router.get("/instagram/authorize", ConnectorController.instagram);

router.get("/facebook", isAuthenticated, ConnectorController.facebookAuthorize);
router.get("/facebook/authorize", ConnectorController.facebook);

router.get("/youtube/test", ConnectorController.test_youtube);

// router.get("/github/get/channels", ConnectorController.github);

router.get("/discord", isAuthenticated, ConnectorController.discordAuthorize);
router.get("/discord/authorize", ConnectorController.discord);

router.get("/stripe", isAuthenticated, ConnectorController.stripeAuthorize);
router.get("/stripe/authorize", ConnectorController.stripe);

router.get(
    "/twitter/request_token",
    ConnectorController.twitter_request_access
);

router.get("/twitter", isAuthenticated, ConnectorController.twitterAuthorize);
router.get("/twitter/authorize", ConnectorController.twitter);

router.get("/twitter/tweet", ConnectorController.tweet);

router.get("/slack", isAuthenticated, ConnectorController.slackAuthorize);
router.get("/slack/authorize", ConnectorController.slack); // Change redirect uri inside slack app params

router.get("/notion", isAuthenticated, ConnectorController.notionAuthorize);
router.get("/notion/authorize", ConnectorController.notion); // Change redirect uri inside slack app params

router.get("/spotify", isAuthenticated, ConnectorController.spotifyAuthorize);
router.get("/spotify/authorize", ConnectorController.spotify);

router.get("/jira", isAuthenticated, ConnectorController.jiraAuthorize);
router.get("/jira/authorize", ConnectorController.jira);

router.get("/dropbox", isAuthenticated, ConnectorController.dropboxAuthorize);
router.get("/dropbox/authorize", ConnectorController.dropbox);

router.get("/doors", isAuthenticated, ConnectorController.doorsAuthorize);
router.get("/doors/authorize", ConnectorController.doors);

export default router;
