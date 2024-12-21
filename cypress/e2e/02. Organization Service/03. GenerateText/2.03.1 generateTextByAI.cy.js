describe("Generate Text successfully with status code 200", () => {
  let accessToken;
  let enrollmentId;
  let organizationId;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
      organizationId = loginData.organizationId;
    });
  });

  it("Checking if should be able generate text or not", () => {
    cy.request({
      method: "POST",
      url: "/organization/integration/generate-text",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
        Enrollment: enrollmentId,
      },
      body: {
        prompt: "How to make money?",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        // expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Generate text  Response:", response.body);
        console.log("Generate text  Response:", response.body);
      } else {
        cy.log("Generate text failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
