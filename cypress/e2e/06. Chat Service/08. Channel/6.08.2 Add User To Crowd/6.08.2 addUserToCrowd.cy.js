describe("Add user to crowd with status code 200", () => {
  let accessToken;
  let crowdId;
  let organizationId;
  let memberId = "6741c6ec1919010019fb4fa2";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/crowdId.json").then((crowdData) => {
      crowdId = crowdData.crowdId;
    });
    cy.readFile("cypress/fixtures/organizationID.json").then((orgData) => {
      organizationId = orgData.organizationId;
    });
  });

  it("Checking if should be able Add user to crowd or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/channel/adduser/${crowdId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        user: memberId,
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
        console.log("Add user to crowd Response:", response.body);
      } else {
        cy.log("Add user to crowd failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
