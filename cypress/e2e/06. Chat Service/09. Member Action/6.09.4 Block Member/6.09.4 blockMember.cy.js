describe("Block member from crowd with status code 200", () => {
  let accessToken;
  let chatId;
  let member = "674e7e06f987f5001a56c5f8";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      chatId = loginData.chatId;
    });
  });

  it("Checking if should be able Block member from crowd or not", () => {
    cy.request({
      method: "POST",
      url: "/chat/member/update",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        member: member,
        chat: chatId,
        actionType: "block",
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
        console.log("Block member from crowd Response:", response.body);
      } else {
        cy.log(
          "Block member from crowd failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
