import request from "supertest";
import app from "../app";

test("pong", (done) => {
  request(app)
    .get("/ping")
    .expect(200, "pong")
    .end((err) => {
      if (err) {
        return done(err);
      }
      done();
    });
});
