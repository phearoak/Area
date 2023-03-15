import { Express } from "@providers";

(async () => {
    try {
        const server = new Express().listen();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
