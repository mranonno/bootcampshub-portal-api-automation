describe("Get enrollment test successfully with status code 200", () => {
  let accessToken;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Get enrollment test or not", () => {
    cy.request({
      method: "GET",
      url: "/enrollment/enrollment-test/mytests",
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
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Get enrollment test Response:", response.body);
        console.log("Get enrollment test Response:", response.body);
      } else {
        cy.log(
          "Get enrollment test failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
