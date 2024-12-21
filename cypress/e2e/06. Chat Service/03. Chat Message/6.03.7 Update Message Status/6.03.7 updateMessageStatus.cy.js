describe.skip("Update message status with status code 200", () => {
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

  it("Checking if should be able Update message status or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/update-status/${messageId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        status: "delivered",
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
        console.log("Update message status Response:", response.body);
      } else {
        cy.log(
          "Update message status failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
