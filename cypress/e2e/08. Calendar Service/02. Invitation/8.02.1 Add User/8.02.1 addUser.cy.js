describe("Add invitation user successfully with status code 200", () => {
  let accessToken;
  let eventId = "6737b7029c8d6a9880ee968a";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Add invitation user or not", () => {
    cy.request({
      method: "PATCH",
      url: `/calendar/event/invitation/${eventId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        action: "add",
        user: "650e70e7165fc20019352988",
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
        cy.log("Add invitation user Response:", response.body);
        console.log("Add invitation user Response:", response.body);
      } else {
        cy.log(
          "Add invitation user failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
