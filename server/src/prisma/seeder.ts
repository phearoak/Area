import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma; // used for tests

async function usersInitialization() {
    /**
     * @description demo User (ADMIN rights) [demo@area.com:demodemo]
     */
    await prisma.user.upsert({
        where: { email: "demo@area.com" },
        update: {},
        create: {
            email: "demo@area.com",
            // password: demodemo
            password:
                "$2a$10$Jd9zZYCqQLc8GxFbvhbljeYT9utOjeyfJDM0DNicoGAoco4PeLhla",
            admin: true,
        },
    });
}

async function gitHubInitialization() {
    /**
     * @description GitHub service with their actions and reactions
     */
    const github = await prisma.service.upsert({
        where: { name: "github" },
        update: {},
        create: {
            name: "github",
            title: "Github",
            description: "GitHub service",
            color: "#000000",
            logo_url: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
    });

    /* Issue action */
    const github_issue = await prisma.action.upsert({
        where: { name: "issues" },
        update: {},
        create: {
            service_id: github.id,
            name: "issues",
            description:
                "triggered when there is activity relating to an issue",
        },
    });
    /* Push action */
    const github_push = await prisma.action.upsert({
        where: { name: "push" },
        update: {},
        create: {
            service_id: github.id,
            name: "push",
            description: "triggered when a commit or tag is pushed",
        },
    });
    /* Pull request action */
    const github_pull_request = await prisma.action.upsert({
        where: { name: "pull_request" },
        update: {},
        create: {
            service_id: github.id,
            name: "pull_request",
            description: "triggered when there is activity on a pull request",
        },
    });
    /* Star action */
    const github_star = await prisma.action.upsert({
        where: { name: "star" },
        update: {},
        create: {
            service_id: github.id,
            name: "star",
            description:
                "triggered when there is activity relating to repository stars",
        },
    });
    /* Release action */
    const github_release = await prisma.action.upsert({
        where: { name: "release" },
        update: {},
        create: {
            service_id: github.id,
            name: "release",
            description:
                "triggered when there is activity relating to releases",
        },
    });
    /* Create action */
    const github_create = await prisma.action.upsert({
        where: { name: "create" },
        update: {},
        create: {
            service_id: github.id,
            name: "create",
            description: "triggered when a Git branch or tag is created",
        },
    });
    /* Fork action */
    const github_fork = await prisma.action.upsert({
        where: { name: "fork" },
        update: {},
        create: {
            service_id: github.id,
            name: "fork",
            description: "triggered when someone forks a repository",
        },
    });
    /* Status action */
    const github_status = await prisma.action.upsert({
        where: { name: "status" },
        update: {},
        create: {
            service_id: github.id,
            name: "status",
            description: "triggered when the status of a Git commit changes",
        },
    });
    /* Repository action */
    const github_repository = await prisma.action.upsert({
        where: { name: "repository" },
        update: {},
        create: {
            service_id: github.id,
            name: "repository",
            description:
                "triggered when there is activity relating to repositories",
        },
    });
    /* -------- FIELDS -------- */
    /* Issue fields */
    await prisma.field.create({
        // ACTION ISSUE FIELD : SELECT REPO
        data: {
            action_id: github_issue.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Push fields */
    await prisma.field.create({
        // ACTION PUSH FIELD : SELECT REPO
        data: {
            action_id: github_push.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Pull request fields */
    await prisma.field.create({
        // ACTION PULL REQUEST FIELD : SELECT REPO
        data: {
            action_id: github_pull_request.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Star fields */
    await prisma.field.create({
        // ACTION STAR FIELD : SELECT REPO
        data: {
            action_id: github_star.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Star fields */
    await prisma.field.create({
        // ACTION RELEASE FIELD : SELECT REPO
        data: {
            action_id: github_release.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Star fields */
    await prisma.field.create({
        // ACTION CREATE FIELD : SELECT REPO
        data: {
            action_id: github_create.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Star fields */
    await prisma.field.create({
        // ACTION FORK FIELD : SELECT REPO
        data: {
            action_id: github_fork.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Star fields */
    await prisma.field.create({
        // ACTION STATUS FIELD : SELECT REPO
        data: {
            action_id: github_status.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    /* -------- FIELDS -------- */
    /* Star fields */
    await prisma.field.create({
        // ACTION REPOSITORY FIELD : SELECT REPO
        data: {
            action_id: github_repository.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });

    /* Rename reaction */
    const github_rename = await prisma.reaction.upsert({
        where: { name: "rename_repository" },
        update: {},
        create: {
            service_id: github.id,
            name: "rename_repository",
            description: "Rename a github repository",
        },
    });
    /* REACTION */
    await prisma.field.create({
        // REACTION RENAME FIELD : SELECT REPO
        data: {
            reaction_id: github_rename.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION RENAME FIELD : CHOOSE NEW NAME
        data: {
            reaction_id: github_rename.id,
            name: "new_name",
            label: "Choose a new name",
            type: "input",
            required: true,
        },
    });

    /* Issues creation reaction */
    const github_issue_creation = await prisma.reaction.upsert({
        where: { name: "issue_creation" },
        update: {},
        create: {
            service_id: github.id,
            name: "issue_creation",
            description: "Create an issue",
        },
    });
    await prisma.field.create({
        // REACTION ISSUE CREATION FIELD : Select a repo
        data: {
            reaction_id: github_issue_creation.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION ISSUE CREATION FIELD: choose a title
        data: {
            reaction_id: github_issue_creation.id,
            name: "title",
            label: "Title of the issue",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION ISSUE CREATION FIELD : write a body
        data: {
            reaction_id: github_issue_creation.id,
            name: "body",
            label: "Body of the issue",
            type: "input",
            required: false,
        },
    });

    /* Merge branch reaction */
    const github_merge_branch = await prisma.reaction.upsert({
        where: { name: "merge_branch" },
        update: {},
        create: {
            service_id: github.id,
            name: "merge_branch",
            description: "Merge a branch",
        },
    });
    await prisma.field.create({
        // REACTION MERGE BRANCH FIELD : Select a repo
        data: {
            reaction_id: github_merge_branch.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION MERGE BRANCH FIELD: name of the base
        data: {
            reaction_id: github_merge_branch.id,
            name: "base",
            label: "Base",
            helper: "The name of the base branch that the head will be merged into.",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION MERGE BRANCH FIELD : name of the head
        data: {
            reaction_id: github_merge_branch.id,
            name: "head",
            label: "Head",
            helper: "The head to merge. This can be a branch name or a commit SHA1.",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION MERGE BRANCH FIELD : commit message
        data: {
            reaction_id: github_merge_branch.id,
            name: "commit_message",
            label: "Message of the commit",
            type: "input",
            required: true,
        },
    });
    /* Create pull request reaction */
    const github_create_pull_request = await prisma.reaction.upsert({
        where: { name: "create_pull_request" },
        update: {},
        create: {
            service_id: github.id,
            name: "create_pull_request",
            description: "Create a pull request",
        },
    });
    await prisma.field.create({
        // REACTION CREATE PULL REQUEST FIELD : Select a repo
        data: {
            reaction_id: github_create_pull_request.id,
            name: "repository",
            label: "Select a repository",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION CREATE PULL REQUEST FIELD: title
        data: {
            reaction_id: github_create_pull_request.id,
            name: "title",
            label: "Title of the new pull request",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION CREATE PULL REQUEST FIELD : head
        data: {
            reaction_id: github_create_pull_request.id,
            name: "head",
            label: "Head",
            helper: "The name of the branch where your changes are implemented.",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // REACTION CREATE PULL REQUEST FIELD : base
        data: {
            reaction_id: github_create_pull_request.id,
            name: "base",
            label: "Base",
            helper: "The name of the branch you want the changes pulled into.",
            type: "input",
            required: true,
        },
    });
}

async function discordInitialization() {
    /**
     * @description Discord service with their actions and reactions
     */
    const discord = await prisma.service.upsert({
        where: { name: "discord" },
        update: {},
        create: {
            name: "discord",
            title: "Discord",
            description: "Discord service",
            color: "#738adb",
            logo_url:
                "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
        },
    });
    /* Post_message reaction */
    const discord_post_message = await prisma.reaction.upsert({
        where: { name: "post_message" },
        update: {},
        create: {
            service_id: discord.id,
            name: "post_message",
            description: "post a message to a channel",
        },
    });
    /* REACTION POST_MESSAGE_TO_CHANNEL */
    await prisma.field.create({
        // WHICH SERVER
        data: {
            reaction_id: discord_post_message.id,
            name: "server",
            label: "server",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // WHICH CHANNEL
        data: {
            reaction_id: discord_post_message.id,
            name: "channel",
            label: "channel",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // MESSAGE TO POST
        data: {
            reaction_id: discord_post_message.id,
            name: "message",
            label: "message",
            type: "text-area",
            helper: "Max limit of 2000 characters.", // TO EDIT LATER
            required: true,
        },
    });
}

async function gmailInitialization() {
    /**
     * @description Gmail service with their actions and reactions
     */
    const gmail = await prisma.service.upsert({
        where: { name: "gmail" },
        update: {},
        create: {
            name: "gmail",
            title: "Gmail",
            description: "Gmail service",
            color: "#c71610",
            logo_url:
                "https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png",
        },
    });

    /* Send email reaction */
    const gmail_send_email_notification = await prisma.reaction.upsert({
        where: { name: "send_email_notification" },
        update: {},
        create: {
            service_id: gmail.id,
            name: "send_email_notification",
            description: "send an email notification to myself",
        },
    });

    /* Send email reaction fields */
    await prisma.field.create({
        // To whom
        data: {
            reaction_id: gmail_send_email_notification.id,
            name: "subject",
            label: "subject",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // which message
        data: {
            reaction_id: gmail_send_email_notification.id,
            name: "body",
            label: "body",
            type: "text-area",
            helper: "Max limit of 2000 characters.", // TO EDIT LATER
            required: true,
        },
    });

    /* Send email reaction */
    const gmail_send_email = await prisma.reaction.upsert({
        where: { name: "send_email" },
        update: {},
        create: {
            service_id: gmail.id,
            name: "send_email",
            description: "send an email to a perso",
        },
    });
    /* Send email reaction fields */
    await prisma.field.create({
        // To whom
        data: {
            reaction_id: gmail_send_email.id,
            name: "to_address",
            label: "to_address",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // which subject
        data: {
            reaction_id: gmail_send_email.id,
            name: "subject",
            label: "subject",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // which message
        data: {
            reaction_id: gmail_send_email.id,
            name: "body",
            label: "body",
            type: "text-area",
            helper: "Max limit of 2000 characters.", // TO EDIT LATER
            required: true,
        },
    });
}

async function youtubeInitialization() {
    /**
     * @description Youtube service with their actions and reactions
     */
    const youtube = await prisma.service.upsert({
        where: { name: "youtube" },
        update: {},
        create: {
            name: "youtube",
            title: "Youtube",
            description: "Youtube service",
            color: "#c71610",
            logo_url:
                "https://assets.stickpng.com/images/580b57fcd9996e24bc43c545.png",
        },
    });
}

async function twitterInitialization() {
    /**
     * @description Twitter service without their actions and reactions
     */
    const twitter = await prisma.service.upsert({
        where: { name: "twitter" },
        update: {},
        create: {
            name: "twitter",
            title: "Twitter",
            description: "Twitter service",
            color: "#1DA1F2",
            logo_url:
                "https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png",
        },
    });
}

async function instagramInitialization() {
    /**
     * @description Instagram service without their actions and reactions
     */
    const instagram = await prisma.service.upsert({
        where: { name: "instagram" },
        update: {},
        create: {
            name: "instagram",
            title: "Instagram",
            description: "Instagram service",
            color: "##d6225f",
            logo_url:
                "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png",
        },
    });
}

async function spotifyInitialization() {
    /**
     * @description Spotify service without their actions and reactions
     */
    const spotify = await prisma.service.upsert({
        where: { name: "spotify" },
        update: {},
        create: {
            name: "spotify",
            title: "Spotify",
            description: "Spotify service",
            color: "#1DB954",
            logo_url:
                "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png",
        },
    });
    const spotify_create_playlist = await prisma.reaction.upsert({
        where: { name: "create_playlist" },
        update: {},
        create: {
            service_id: spotify.id,
            name: "create_playlist",
            description: "Create a playlist",
        },
    });
    /* -------- FIELDS -------- */
    /* Create playlist */
    await prisma.field.create({
        // PLAYLIST NAME
        data: {
            reaction_id: spotify_create_playlist.id,
            name: "playlist",
            label: "Name of the playlist",
            type: "input",
            required: true,
        },
    });
    const spotify_add_item_to_playlist = await prisma.reaction.upsert({
        where: { name: "add_item_to_playlist" },
        update: {},
        create: {
            service_id: spotify.id,
            name: "add_item_to_playlist",
            description: "Add item to a playlist",
        },
    });
    /* -------- FIELDS -------- */
    /* Add item to playlist */
    await prisma.field.create({
        // PLAYLIST ID
        data: {
            reaction_id: spotify_add_item_to_playlist.id,
            name: "playlist",
            label: "Select Playlist ID",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // SPOTIFY ID
        data: {
            reaction_id: spotify_add_item_to_playlist.id,
            name: "uri",
            label: "Spotify URI to add",
            type: "input",
            required: true,
        },
    });
    const spotify_follow_playlist = await prisma.reaction.upsert({
        where: { name: "follow_playlist" },
        update: {},
        create: {
            service_id: spotify.id,
            name: "follow_playlist",
            description: "Follow a playlist",
        },
    });
    await prisma.field.create({
        // PLAYLIST ID
        data: {
            reaction_id: spotify_follow_playlist.id,
            name: "playlist",
            label: "Playlist ID",
            type: "input",
            required: true,
        },
    });

    const spotify_update_playlist = await prisma.reaction.upsert({
        where: { name: "update_playlist" },
        update: {},
        create: {
            service_id: spotify.id,
            name: "update_playlist",
            description: "Update playlist details",
        },
    });
    await prisma.field.create({
        // PLAYLIST ID
        data: {
            reaction_id: spotify_update_playlist.id,
            name: "playlist",
            label: "Select playlist",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // PLAYLIST ID
        data: {
            reaction_id: spotify_update_playlist.id,
            name: "name",
            label: "Name",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        // PLAYLIST ID
        data: {
            reaction_id: spotify_update_playlist.id,
            name: "description",
            label: "Description",
            type: "input",
            required: true,
        },
    });
    const spotify_save_user_track = await prisma.reaction.upsert({
        where: { name: "save_user_track" },
        update: {},
        create: {
            service_id: spotify.id,
            name: "save_user_track",
            description: "Save track for current user",
        },
    });
    await prisma.field.create({
        // PLAYLIST ID
        data: {
            reaction_id: spotify_save_user_track.id,
            name: "track",
            label: "Track ID",
            type: "input",
            required: true,
        },
    });
}

async function facebookInitialization() {
    /**
     * @description Facebook service without their actions and reactions
     */
    const facebook = await prisma.service.upsert({
        where: { name: "facebook" },
        update: {},
        create: {
            name: "facebook",
            title: "Facebook",
            description: "Facebook service",
            color: "#0d8cf0",
            logo_url:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/800px-Facebook_logo_%28square%29.png",
        },
    });
    /* Post publication on page action */
    const post_publication_on_page = await prisma.reaction.upsert({
        where: { name: "post_publication_on_page" },
        update: {},
        create: {
            service_id: facebook.id,
            name: "post_publication_on_page",
            description:
                "Post a publication on a page you manage (only text for now)",
        },
    });
    /* Post publication on page action */
    const like_last_page_publication = await prisma.reaction.upsert({
        where: { name: "like_last_page_publication" },
        update: {},
        create: {
            service_id: facebook.id,
            name: "like_last_page_publication",
            description: "Like the last post of a page publication",
        },
    });
    /* Post publication on page action */
    const comment_last_page_publication = await prisma.reaction.upsert({
        where: { name: "comment_last_page_publication" },
        update: {},
        create: {
            service_id: facebook.id,
            name: "comment_last_page_publication",
            description: "Comment the last post of a page publication",
        },
    });
    /* -------- FIELDS -------- */
    /* Post publication on page action fields */
    await prisma.field.create({
        // SELECT PAGE
        data: {
            reaction_id: post_publication_on_page.id,
            name: "page",
            label: "Select a page",
            type: "select",
            required: true,
        },
    });
    await prisma.field.create({
        // CHOOSE MESSAGE
        data: {
            reaction_id: post_publication_on_page.id,
            name: "message",
            label: "message",
            type: "text-area",
            required: true,
        },
    });
    await prisma.field.create({
        // CHOOSE PAGE ID
        data: {
            reaction_id: like_last_page_publication.id,
            name: "id",
            label: "id",
            type: "input",
            helper: "To get the page ID, go to the facebook page and copy the ID in the URL",
            required: true,
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: comment_last_page_publication.id,
            name: "id",
            label: "id",
            type: "input",
            helper: "To get the page ID, go to the facebook page and copy the ID in the URL",
            required: true,
        },
    });

    await prisma.field.create({
        data: {
            reaction_id: comment_last_page_publication.id,
            name: "body",
            label: "body",
            type: "text-area",
            helper: "Max limit of 2000 characters.",
            required: true,
        },
    });
}

async function dropboxInitialization() {
    /**
     * @description Dropbox service
     */
    const dropbox = await prisma.service.upsert({
        where: { name: "dropbox" },
        update: {},
        create: {
            name: "dropbox",
            title: "Dropbox",
            description: "Dropbox service",
            color: "#0060FF",
            logo_url:
                "https://cdn.freebiesupply.com/logos/large/2x/dropbox-2-logo-png-transparent.png",
        },
    });
    const dropbox_create_folder = await prisma.reaction.upsert({
        where: { name: "create_folder" },
        update: {},
        create: {
            service_id: dropbox.id,
            name: "create_folder",
            description: "Create a folder",
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: dropbox_create_folder.id,
            name: "destination",
            label: "Destination folder",
            type: "input",
            required: true,
        },
    });
    const dropbox_move_folder_file = await prisma.reaction.upsert({
        where: { name: "move_folder_file" },
        update: {},
        create: {
            service_id: dropbox.id,
            name: "move_folder_file",
            description: "Move a file or a folder",
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: dropbox_move_folder_file.id,
            name: "from",
            label: "From",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: dropbox_move_folder_file.id,
            name: "to",
            label: "To",
            type: "input",
            required: true,
        },
    });
}

async function notionInitialization() {
    const notion = await prisma.service.upsert({
        where: { name: "notion" },
        update: {},
        create: {
            name: "notion",
            title: "Notion",
            description: "Notion service",
            color: "#575757",
            logo_url:
                "https://assets.stickpng.com/images/5fb6d3336e2d460004a5e31f.png",
        },
    });
    const notion_create_page = await prisma.reaction.upsert({
        where: { name: "create_page" },
        update: {},
        create: {
            service_id: notion.id,
            name: "create_page",
            description: "Create a page",
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: notion_create_page.id,
            name: "parent",
            label: "Parent Id page",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: notion_create_page.id,
            name: "title",
            label: "Title",
            type: "input",
            required: true,
        },
    });
    const notion_update_page = await prisma.reaction.upsert({
        where: { name: "update_page" },
        update: {},
        create: {
            service_id: notion.id,
            name: "update_page",
            description: "Update a page",
        },
    });

    await prisma.field.create({
        data: {
            reaction_id: notion_update_page.id,
            name: "page_id",
            label: "Page id",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: notion_update_page.id,
            name: "icon",
            label: "Icon external Url",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: notion_update_page.id,
            name: "cover",
            label: "Cover external Url",
            type: "input",
            required: true,
        },
    });
    const notion_create_comment = await prisma.reaction.upsert({
        where: { name: "create_comment" },
        update: {},
        create: {
            service_id: notion.id,
            name: "create_comment",
            description: "Create a comment",
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: notion_create_comment.id,
            name: "parent",
            label: "Parent page id",
            type: "input",
            required: true,
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: notion_create_comment.id,
            name: "body",
            label: "Body of the comment",
            type: "text-area",
            required: true,
        },
    });
}

async function doorsInitialization() {
    const doors = await prisma.service.upsert({
        where: { name: "doors" },
        update: {},
        create: {
            name: "doors",
            title: "Doors",
            description: "Doors service",
            color: "#00589c",
            logo_url:
                "https://assets.stickpng.com/images/5fb6d3336e2d460004a5e31f.png",
        },
    });
    const doors_open = await prisma.reaction.upsert({
        where: { name: "doors_open" },
        update: {},
        create: {
            service_id: doors.id,
            name: "doors_open",
            description: "Open a door in Epitech",
        },
    });
    await prisma.field.create({
        data: {
            reaction_id: doors_open.id,
            name: "name",
            label: "name",
            type: "select",
            required: true,
        },
    });
}

async function jiraInitialization() {
    const jira = await prisma.service.upsert({
        where: { name: "jira" },
        update: {},
        create: {
            name: "jira",
            title: "Jira",
            description: "Jira service",
            color: "#0052CC",
            logo_url:
                "https://toppng.com/uploads/preview/jira-software-logo-jira-software-logo-11562914188wp8r59nt10.png",
        },
    });
    await prisma.action.upsert({
        where: { name: "issue_created" },
        update: {},
        create: {
            service_id: jira.id,
            name: "issue_created",
            description: "trigger when an issue is created",
        },
    });
    await prisma.action.upsert({
        where: { name: "jira:issue_deleted" },
        update: {},
        create: {
            service_id: jira.id,
            name: "jira:issue_deleted",
            description: "trigger when an issue is deleted",
        },
    });
    await prisma.action.upsert({
        where: { name: "comment_created" },
        update: {},
        create: {
            service_id: jira.id,
            name: "comment_created",
            description: "trigger when a comment is created",
        },
    });
}

async function main() {
    usersInitialization();
    gitHubInitialization();
    discordInitialization();
    gmailInitialization();
    youtubeInitialization();
    twitterInitialization();
    instagramInitialization();
    spotifyInitialization();
    facebookInitialization();
    dropboxInitialization();
    notionInitialization();
    doorsInitialization();
    jiraInitialization();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
