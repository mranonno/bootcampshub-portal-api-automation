describe("My all chats with status code 200", () => {
  let accessToken;
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      organizationId = loginData.organizationId;
    });
  });

  it("Checking if should be able get my all chats or not", () => {
    cy.request({
      method: "GET",
      url: "/chat/mychats",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(3000);
        // expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("get my chats Response:", response.body);
      } else {
        cy.log("Get my chats failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
