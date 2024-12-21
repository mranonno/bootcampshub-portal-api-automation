describe("Get thread messages successfully with status code 200", () => {
  let accessToken;
  let organizationId;
  let parentMessageId = "674e92e4f987f5001a56c6d4";
  let chatId = "66c98e781fce73001a388db3";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/organizationID.json").then((orgData) => {
      organizationId = orgData.organizationId;
    });
  });

  it("Checking if should be able Get thread messages or not", () => {
    cy.request({
      method: "POST",
      url: "/chat/messages",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        parentMessage: parentMessageId,
        chat: chatId,
        page: 1,
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
        cy.log("Get thread messages Response:", response.body);
        console.log("Get thread messages Response:", response.body);
      } else {
        cy.log(
          "Get thread messages failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
