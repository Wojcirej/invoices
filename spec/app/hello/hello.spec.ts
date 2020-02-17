import { hello } from "./../../../app/hello/hello";

describe("hello", () => {
  it("returns true", () => {
    expect(hello()).toBe(true);
  });
});
