//const request = require("request");
const testFn = (a, b) => {
    return a + b;
};

describe("Basic Test", () => {
    it("check 1st", () => {
        const result = testFn(1, 2);
        expect(result).toBe(3);
    });
});
