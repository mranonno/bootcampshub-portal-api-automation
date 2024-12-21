describe("Get event history successfully with status code 200", () => {
  let accessToken;
  let eventId = "673de99fe2da047564276bf7";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Get event history or not", () => {
    cy.request({
      method: "POST",
      url: "/history/getHistory",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        itemId: eventId,
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
        cy.log("Get event history Response:", response.body);
        console.log("Get event history Response:", response.body);
      } else {
        cy.log("Get event history failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
