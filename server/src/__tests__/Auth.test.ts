import app from "./app"
import request from "supertest";

describe("auth tests", () => {
    it("Singin without credential", async () => {
        await request(app.app).post("/auth/signin")
        .expect("Content-Type", /json/)
        .expect(400)
    });

    it("Singin bad credential", async () => {
        await request(app.app).post("/auth/signin")
        .send({email : "aaa@gmail.com", password : "otherWeirdInformation"})
        .expect("Content-Type", /json/)
        .expect(401)
    });

    it("Singin bad key params", async () => {
        await request(app.app).post("/auth/signin")
        .send({aa : "aaaaaaaa", bb : "otherWeirdInformation"})
        .expect("Content-Type", /json/)
        .expect(400)
    });

    // it("Singin good credential", async () => {
    //     await request(app).post("/auth/signin")
    //     .send({email : "", password : ""})
    //     .expect("Content-Type", /json/)
    //     .expect(200)
    //     .expect((res) => {
    //         notEqual(res.body.access_token, null)
    //     })
    // });
})