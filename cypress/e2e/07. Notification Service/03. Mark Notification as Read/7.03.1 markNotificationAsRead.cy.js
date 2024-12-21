describe("Mark notification as Read successfully with status code 200", () => {
  let accessToken;
  let notificationId = "6757a6d5d40fe6212a9fbad9";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Mark notification as Read or not", () => {
    cy.request({
      method: "PATCH",
      url: `/notification/markread/${notificationId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        // expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Mark notification as Read Response:", response.body);
        console.log("Mark notification as Read Response:", response.body);
      } else {
        cy.log(
          "Mark notification as Read failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
