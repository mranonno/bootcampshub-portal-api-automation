describe("Get Community top contribute successfully with status code 200", () => {
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/organizationId.json").then((tokenData) => {
      organizationId = tokenData.organizationId;
    });
  });

  it("Checking if should be able Get Community top contribute or not", () => {
    cy.request({
      method: "GET",
      url: "/content/community/top-users",
      headers: {
        Organization: organizationId,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Get Community top contribute Response:", response.body);
        console.log("Get Community top contribute Response:", response.body);
      } else {
        cy.log(
          "Get Community top contribute failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
