const chai = require("chai");
const expect = chai.expect;
const { healthCheckSync } = require("../controllers/HealthcheckController");

describe("Test /", () => {
  describe("Health check on /sync", () => {
    it("health should be okay", () => {
      const actualResult = healthCheckSync();
      expect(actualResult).to.equal("OK");
    });
  });
});
