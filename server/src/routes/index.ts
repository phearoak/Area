import userRoute from "@routes/user.route";
import serviceRoute from "@routes/service.route";
import actionRoute from "@routes/action.route";
import reactionRoute from "@routes/reaction.route";
import workflowRoute from "@routes/workflow.route";
import aboutRoute from "@routes/about.route";
import tokenRoute from "@routes/token.route";
import connectorRoute from "@routes/connector.route";
import fieldRoute from "@routes/field.route";
import revokeRoute from "@routes/revoke.route";
import { Router } from "express";

interface Route {
    path: string;
    route: Router;
}

const router = Router();
const routes: Route[] = [
    {
        path: "/auth",
        route: userRoute,
    },
    {
        path: "/service",
        route: serviceRoute,
    },
    {
        path: "/action",
        route: actionRoute,
    },
    {
        path: "/reaction",
        route: reactionRoute,
    },
    {
        path: "/workflow",
        route: workflowRoute,
    },
    {
        path: "/token",
        route: tokenRoute,
    },
    {
        path: "/field",
        route: fieldRoute,
    },
    {
        path: "/connector",
        route: connectorRoute,
    },
    {
        path: "/revoke",
        route: revokeRoute,
    },
    {
        path: "/about.json",
        route: aboutRoute,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
