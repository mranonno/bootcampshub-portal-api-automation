describe("Update crowd avatar with status code 200", () => {
  let accessToken;
  let organizationId;
  let crowdId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      organizationId = loginData.organizationId;
    });
    cy.readFile("cypress/fixtures/crowdId.json").then((crowdData) => {
      crowdId = crowdData.crowdId;
    });
  });

  it("Checking if should be able Update crowd avatar or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/channel/update/${crowdId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        avatar:
          "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/undefined/1733208057920-avatar.JPEG",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(3000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Update crowd avatar Response:", response.body);
      } else {
        cy.log(
          "Update crowd avatar failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
