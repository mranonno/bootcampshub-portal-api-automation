describe("Proposed new event time successfully with status code 200", () => {
  let accessToken;
  let eventId = "674d62885889530019c2cb0f";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Proposed new event time or not", () => {
    cy.request({
      method: "PATCH",
      url: `/calendar/event/invitation/${eventId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        action: "status",
        status: "proposedTime",
        participantId: "674d62885889530019c2cb10",
        proposedTime: {
          start: "2024-12-05T07:30:59.535Z",
          end: "2024-12-05T15:45:59.535Z",
        },
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
        cy.log("Proposed new event time Response:", response.body);
        console.log("Proposed new event time Response:", response.body);
      } else {
        cy.log(
          "Proposed new event time failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
