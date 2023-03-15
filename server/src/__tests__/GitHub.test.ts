import { GitHub } from "@connectors";

jest.mock("../connectors/GitHub");

describe("GitHub", () => {
    it("Github bad code", async () => {
        const authenticateMock = jest.fn();

        GitHub.prototype.authenticate = authenticateMock;
        authenticateMock.mockRejectedValue(new Error('Connection github failed.'));

        const github = new GitHub('token');
        await expect(github.authenticate('badcode')).rejects.toThrowError('Connection github failed.');
    });
})


