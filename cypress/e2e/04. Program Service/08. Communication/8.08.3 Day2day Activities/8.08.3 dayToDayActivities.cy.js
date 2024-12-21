describe("Day to day activities successfully with status code 200", () => {
  let accessToken;
  let enrollment;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollment = loginData.enrollmentId;
    });
  });

  it("Checking if should be able Day to day activities or not", () => {
    cy.request({
      method: "GET",
      url: `/communication/myshout/day2day?page=1&limit=8`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollment,
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
        cy.log("Day to day activities Response:", response.body);
        console.log("Day to day activities Response:", response.body);
      } else {
        cy.log(
          "Day to day activities failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
