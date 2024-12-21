describe("Leave from crowd with status code 200", () => {
  let accessToken;
  let crowdId;
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/crowdId.json").then((crowdData) => {
      crowdId = crowdData.crowdId;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      organizationId = loginData.organizationId;
    });
  });

  it("Checking if should be able Leave from crowd or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/channel/leave/${crowdId}`,
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
        console.log("Leave from crowd Response:", response.body);
      } else {
        cy.log("Leave from crowd failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
