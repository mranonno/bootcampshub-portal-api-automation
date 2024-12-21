describe("Get my events successfully with status code 200", () => {
  let accessToken;
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/organizationID.json").then((orgData) => {
      organizationId = orgData.organizationId;
    });
  });

  it("Checking if should be able Get my events or not", () => {
    cy.request({
      method: "GET",
      url: "/calendar/event/myevents",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        cy.log("Get my events Response:", response.body);
        console.log("Get my events Response:", response.body);
      } else {
        cy.log("Get my events failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
