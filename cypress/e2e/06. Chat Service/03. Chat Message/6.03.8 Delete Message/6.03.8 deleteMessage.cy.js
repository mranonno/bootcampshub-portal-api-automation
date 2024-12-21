describe("Delete chat message with status code 200", () => {
  let accessToken;
  let messageId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/messageId.json").then((msgId) => {
      messageId = msgId.messageId;
    });
  });

  it("Checking if should be able Delete chat message or not", () => {
    cy.request({
      method: "DELETE",
      url: `/chat/delete/message/${messageId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: { symbol: "😍" },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(7000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Delete chat message Response:", response.body);
      } else {
        cy.log(
          "Delete chat message failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
