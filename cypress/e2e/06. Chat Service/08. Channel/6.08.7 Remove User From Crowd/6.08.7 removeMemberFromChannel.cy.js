describe("Remove member from crowd with status code 200", () => {
  let accessToken;
  let crowdId;
  let crowdMember;
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/crowdId.json").then((crowdData) => {
      crowdId = crowdData.crowdId;
    });
    cy.readFile("cypress/fixtures/crowdMember.json").then((crowd) => {
      crowdMember = crowd.crowdMember;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      organizationId = loginData.organizationId;
    });
  });

  it("Checking if should be able Remove member from crowd or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/channel/remove-user/${crowdId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: { member: crowdMember },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Remove member from crowd Response:", response.body);
      } else {
        cy.log(
          "Remove member from crowd failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
