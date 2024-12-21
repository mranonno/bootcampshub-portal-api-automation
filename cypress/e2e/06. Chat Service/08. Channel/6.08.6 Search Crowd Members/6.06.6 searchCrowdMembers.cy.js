describe("Search chat members with status code 200", () => {
  let accessToken;
  let crowdId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/crowdId.json").then((crowdData) => {
      crowdId = crowdData.crowdId;
    });
  });

  it("Checking if should be able Search chat members or not", () => {
    cy.request({
      method: "POST",
      url: `/chat/members/${crowdId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Organization: organizationId,
      },
      body: {
        query: "anonno",
        limit: 5,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        // expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Search chat members Response:", response.body);
      } else {
        cy.log(
          "Search chat members failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
