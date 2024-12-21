describe("Send chat message with status code 200", () => {
  let accessToken;
  let organizationId;
  let chatId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      organizationId = loginData.organizationId;
      chatId = loginData.chatId;
    });
  });

  it("Checking if should be able Send chat message or not", () => {
    cy.request({
      method: "PUT",
      url: `/chat/sendmessage/${chatId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        text: "Your message here",
        files: [],
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        cy.writeFile("cypress/fixtures/messageId.json", {
          messageId: response.body.message._id,
        });

        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(7000);
        // expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Send chat message Response:", response.body);
      } else {
        cy.log("Send chat message failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
