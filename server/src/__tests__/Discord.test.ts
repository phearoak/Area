import { Discord } from "@connectors";

jest.mock("../connectors/Discord");

describe("Discord", () => {
    it("Discord bad code", async () => {
        const authenticateMock = jest.fn();

        Discord.prototype.authenticate = authenticateMock;
        authenticateMock.mockRejectedValue(new Error('Connection discord failed.'));

        const discord = new Discord('token');
        await expect(discord.authenticate('badcode')).rejects.toThrowError('Connection discord failed.');
    });
})
