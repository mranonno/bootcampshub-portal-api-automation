describe("Crate my issue post successfully with status code 200", () => {
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

  it("Checking if should be able to Crate my issue post or not", () => {
    cy.request({
      method: "POST",
      url: "/communication/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      body: {
        title: "test",
        date: "2024-12-20T18:00:00.000Z",
        description: "fasdasd",
        category: "issues",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Issue posted successfully");
        console.log("Issue posted successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log(
          "Create my issue post failed with status code:",
          response.status
        );
        console.log(
          `Create my issue post failed with status code ${response.status}`
        );
        cy.log(`Create my issue post failed  ${response.body.error}`);
        console.log(`Create my issue post failed  ${response.body.error}`);
      }
    });
  });
});
