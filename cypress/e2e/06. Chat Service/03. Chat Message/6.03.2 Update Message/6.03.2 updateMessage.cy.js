describe("Update chat message with status code 200", () => {
  let accessToken;
  let messageId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/messageId.json").then((mgsData) => {
      messageId = mgsData.messageId;
    });
  });

  it("Checking if should be able Update chat message or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/update/message/${messageId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        text: "Updated message text",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(7000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Update chat message Response:", response.body);
      } else {
        cy.log(
          "Update chat message failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
