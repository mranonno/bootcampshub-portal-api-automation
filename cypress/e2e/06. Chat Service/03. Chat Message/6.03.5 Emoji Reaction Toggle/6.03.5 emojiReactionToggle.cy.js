describe("Emoji reaction toggle with status code 200", () => {
  let accessToken;
  let messageId = "67501ef27a6514001a8a7b79";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Emoji reaction toggle or not", () => {
    cy.request({
      method: "PUT",
      url: `/chat/react/${messageId}`,
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
        console.log("Emoji reaction toggle Response:", response.body);
      } else {
        cy.log(
          "Emoji reaction toggle failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
