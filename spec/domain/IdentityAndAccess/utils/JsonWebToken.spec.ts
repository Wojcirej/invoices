import { JsonWebToken } from "../../../../domain/IdentityAndAccess/utils/JsonWebToken";
import timekeeper from "timekeeper";

describe("JsonWebToken", () => {
  let now;
  const twentyMinutesInSeconds = 60 * 20;

  beforeAll(() => {
    now = new Date().getTime();
    timekeeper.freeze(now);
  });

  afterAll(() => {
    timekeeper.reset();
  });
  describe(".encode", () => {
    describe("when expiration param not provided", () => {
      it("returns JSON Web Token valid for default 20 minutes", () => {
        const payload = { foo: "bar" };
        const token = JsonWebToken.encode(payload);
        const decoded = JsonWebToken.decode(token);
        expect(decoded.exp).toEqual(Math.floor(now / 1000 + twentyMinutesInSeconds));
      });

      it("returns JSON Web Token with encoded passed payload under 'data' property", () => {
        const payload = { foo: "bar" };
        const token = JsonWebToken.encode(payload);
        const decoded = JsonWebToken.decode(token);

        expect(decoded.data).toEqual(payload);
      });
    });
  });

  describe(".decode", () => {
    describe("when token decoded successfully", () => {
      const payload = { foo: "bar" };
      let token;
      beforeAll(() => {
        token = JsonWebToken.encode(payload);
      });

      it("returns object with property indicating expiration date", () => {
        const decoded = JsonWebToken.decode(token);
        expect(Object.keys(decoded)).toContain("exp");
        expect(new Date(decoded.exp)).toBeTruthy();
      });

      it("returns object with property indicating when token was issued", () => {
        const decoded = JsonWebToken.decode(token);
        expect(Object.keys(decoded)).toContain("iat");
        expect(decoded.iat).toEqual(Math.floor(now / 1000));
      });

      it("returns object containing encoded payload under 'data' property", () => {
        const decoded = JsonWebToken.decode(token);
        expect(decoded.data).toEqual(payload);
      });
    });

    describe("when decoding failed due not token-like string passed", () => {
      const token = "invalidtoken";

      it("throws JsonWebTokenError", () => {
        try {
          JsonWebToken.decode(token);
        } catch (error) {
          expect(error.name).toEqual("JsonWebTokenError");
        }
      });

      it("throws error with message about malformed JWT", () => {
        try {
          JsonWebToken.decode(token);
        } catch (error) {
          expect(error.message).toEqual("jwt malformed");
        }
      });
    });

    describe("when decoding failed due token being encoded with different secret key", () => {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NTIwNzMxMzR9.s5G8XSOWQ4l6YP3jD7KLcbb0RB29eTN5pU49l-6sKKs";

      it("throws JsonWebTokenError", () => {
        try {
          JsonWebToken.decode(token);
        } catch (error) {
          expect(error.name).toEqual("JsonWebTokenError");
        }
      });

      it("throws error with message about invalid signature", () => {
        try {
          JsonWebToken.decode(token);
        } catch (error) {
          expect(error.message).toEqual("invalid signature");
        }
      });
    });

    describe("when decoding failed due token being expired", () => {
      let token;

      beforeAll(() => {
        token = JsonWebToken.encode({ foo: "bar" });
        const dateInFuture = new Date();
        dateInFuture.setFullYear(dateInFuture.getFullYear() + 1);
        timekeeper.travel(dateInFuture);
      });

      afterAll(() => {
        timekeeper.reset();
      });

      it("throws TokenExpiredError", () => {
        try {
          JsonWebToken.decode(token);
        } catch (error) {
          expect(error.name).toEqual("TokenExpiredError");
          expect(error.message).toEqual("jwt expired");
        }
      });
    });
  });
});
