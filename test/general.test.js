//const request = require("request");
const testFn = (a, b) => {
    return a + b;
};

describe("Basic Test", () => {
    it("check 1", () => {
        const result = testFn(1, 2);
        expect(result).toBe(3);
    });
    it("check 2", () => {
        const result = testFn(2, 2);
        expect(result).toBe(4);
    });
});
