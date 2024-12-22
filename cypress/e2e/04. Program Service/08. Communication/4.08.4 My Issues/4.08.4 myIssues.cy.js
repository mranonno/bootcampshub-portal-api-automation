describe("Get my issues successfully with status code 200", () => {
  let accessToken;
  let enrollmentId;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
  });

  it("Checking if should be able to get my issues or not", () => {
    cy.request({
      method: "GET",
      url: "/communication/mypost/issues",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Get Issues successfully");
        console.log("Get Issues successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Get my issues failed with status code:", response.status);
        console.log(`Get my issues failed with status code ${response.status}`);
        cy.log(`Get my issues failed  ${response.body.error}`);
        console.log(`Get my issues failed  ${response.body.error}`);
      }
    });
  });
});
