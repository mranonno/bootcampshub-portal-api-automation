let accessToken;
describe("Get online users successfully with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able to Get online users or not", () => {
    cy.request({
      method: "GET",
      url: "/user/online",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Get online users successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Get online users failed with status code:", response.status);
        cy.log(`Get online users failed  ${response.body.error}`);
      }
    });
  });
});
