import { Notion } from "@connectors";

jest.mock("../connectors/Notion");

describe("Notion", () => {
    it("Notion bad code", async () => {
        const authenticateMock = jest.fn();

        Notion.prototype.authenticate = authenticateMock;
        authenticateMock.mockRejectedValue(new Error('Connection Notion failed.'));

        const notion = new Notion('token');
        await expect(notion.authenticate('badcode')).rejects.toThrowError('Connection Notion failed.');
    });
})