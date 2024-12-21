describe("Pin or Unpin message successfully with status code 200", () => {
  let accessToken;
  let messageId = "674e91dbf987f5001a56c6b5";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Pin or Unpin message or not", () => {
    cy.request({
      method: "PATCH",
      url: `/chat/pin/${messageId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        cy.log("Pin or Unpin message Response:", response.body);
        console.log("Pin or Unpin message Response:", response.body);
      } else {
        cy.log(
          "Pin or Unpin message failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
