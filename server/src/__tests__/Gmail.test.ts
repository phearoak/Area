import { Gmail } from "@connectors";

jest.mock("../connectors/Gmail");

describe("Gmail", () => {
    it("Gmail bad code", async () => {
        const authenticateMock = jest.fn();

        Gmail.prototype.authenticate = authenticateMock;
        authenticateMock.mockRejectedValue(new Error('Connection Gmail failed.'));

        const gmail = new Gmail('token');
        await expect(gmail.authenticate('badcode')).rejects.toThrowError('Connection Gmail failed.');
    });
})