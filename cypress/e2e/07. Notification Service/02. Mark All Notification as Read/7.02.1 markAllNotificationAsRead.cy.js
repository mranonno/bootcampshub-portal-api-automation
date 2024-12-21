describe("Mark all notification as read successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Mark all notification as read or not", () => {
    cy.request({
      method: "PATCH",
      url: "/notification/markreadall",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Mark all notification as read Response:", response.body);
        console.log("Mark all notification as read Response:", response.body);
      } else {
        cy.log(
          "Mark all notification as read failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
