import { ConnectorFactory } from "@connectors";
import { IConnector } from "@interfaces";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import {
    ActionService,
    ReactionService,
    TokenService,
    WorkflowReactionService,
    WorkflowService,
} from "@services";
import { NextFunction, Request, Response } from "express";

class WorkflowController {
    create = async (
        req: Request & { user: { id: number } },
        res: Response,
        next: NextFunction
    ) => {
        const { action, reaction, action_args } = req.body;
        try {
            const action_ = await ActionService.existsAndGetById(action);
            if (action_ == null)
                throw new BadRequestException("action unknown");

            const token = await TokenService.getByServiceId(
                action_.service.id,
                req.user.id
            );
            if (token == null)
                throw new UnauthorizedException("Not authenticated to action.");

            const reactions = await ReactionService.getAllInIds(
                reaction.map((item: { id: number; args?: string }) => item.id)
            );
            if (reactions.length !== reaction.length)
                throw new BadRequestException("reactions unknown");

            const services = reactions.map((reaction) => reaction.service.id);

            const tokens = await TokenService.getAllInServiceIdsAndById(
                services,
                req.user.id
            );
            if (
                tokens.length !==
                services.filter((a, i, x) => x.indexOf(a) === i).length
            )
                throw new UnauthorizedException(
                    "Not authenticated to reactions."
                );

            const workflow = await WorkflowService.create(
                req.user.id,
                action,
                action_args
            );

            reactions.forEach(async (reaction) => {
                await WorkflowReactionService.create(
                    workflow.id,
                    reaction.id,
                    req.body.reaction.find(
                        (x: { id: number; args?: string }) =>
                            x.id === reaction.id
                    ).args || undefined
                );
            });
            const connector: IConnector = new ConnectorFactory().getConnector(
                action_.service.name
            )(token.token);
            connector.webhook(
                workflow.id,
                action_.name,
                workflow.action_args == null
                    ? undefined
                    : JSON.parse(workflow.action_args)
            );
            return res.status(200).json(workflow);
        } catch (err) {
            next(err);
        }
    };

    getByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workflows = await WorkflowService.getAllByUserId(req.user.id);
            return res.status(200).json(workflows);
        } catch (err) {
            next(err);
        }
    };

    callback = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            // check event for some connectors which call the url for all events
            const workflow = await WorkflowService.getById(parseInt(id));
            if (workflow == null)
                throw new BadRequestException("Unknown workflow.");

            const workflowReactions =
                await WorkflowReactionService.getReactionsByWorkflowId(
                    parseInt(id)
                );
            const services = workflowReactions
                .map((workflowReaction) => {
                    return workflowReaction.reaction.service.id;
                })
                .filter((x, i, a) => a.indexOf(x) == i);

            const tokens = await TokenService.getAllInServiceIdsAndById(
                services,
                workflow.user_id
            );
            const serviceIdToToken: { [key: number]: string } = tokens.reduce(
                (acc, current) => ({
                    ...acc,
                    [current.service_id]: current.token,
                }),
                {}
            );

            workflowReactions.forEach((workflowReaction) => {
                const connector = new ConnectorFactory().getConnector(
                    workflowReaction.reaction.service.name
                )(serviceIdToToken[workflowReaction.reaction.service.id]);
                connector.event(
                    workflowReaction.reaction.name,
                    workflowReaction.args != null
                        ? JSON.parse(workflowReaction.args)
                        : undefined
                );
            });
            return res.status(200).json("reactions done!");
        } catch (err) {
            next(err);
        }
    };
}

export default new WorkflowController();
