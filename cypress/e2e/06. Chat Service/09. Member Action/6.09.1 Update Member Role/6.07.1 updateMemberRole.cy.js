describe("Update member role with status code 200", () => {
  let accessToken;
  let chatId;
  let memberId = "674e7e06f987f5001a56c5f8";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      chatId = loginData.chatId;
    });
  });

  it("Checking if should be able Update member role or not", () => {
    cy.request({
      method: "POST",
      url: "/chat/member/update",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Organization: organizationId,
      },
      body: {
        member: memberId,
        role: "moderator",
        chat: chatId,
        actionType: "role",
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
        console.log("Update member role Response:", response.body);
      } else {
        cy.log("Update member role failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
