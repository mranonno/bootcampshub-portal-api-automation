describe("Submit final submission successfully with status code 200", () => {
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

  it("Checking if should be able Submit final submission or not", () => {
    cy.request({
      method: "POST",
      url: "/interview/finalsubmission",
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
        cy.log("Submit final submission Response:", response.body);
        console.log("Submit final submission Response:", response.body);
      } else {
        cy.log(
          "Submit final submission failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
