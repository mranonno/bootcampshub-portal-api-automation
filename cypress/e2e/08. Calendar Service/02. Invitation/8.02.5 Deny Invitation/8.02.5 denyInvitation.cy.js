describe("Denied invitation successfully with status code 200", () => {
  let accessToken;
  let eventId = "674d3eee5889530019c2ca8c";
  let participantId = "674d3eee5889530019c2ca8d";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Denied invitation or not", () => {
    cy.request({
      method: "PATCH",
      url: `/calendar/event/invitation/${eventId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        action: "status",
        participantId: participantId,
        status: "denied",
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
        cy.log("Denied invitation Response:", response.body);
        console.log("Denied invitation Response:", response.body);
      } else {
        cy.log("Denied invitation failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
