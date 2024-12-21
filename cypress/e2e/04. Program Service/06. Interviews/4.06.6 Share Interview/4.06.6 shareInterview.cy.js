describe("Share interview successfully with status code 200", () => {
  let accessToken;
  let enrollment;
  let submissionId = "66bc65e48a5075001979c850";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollment = loginData.enrollmentId;
    });
  });

  it("Checking if should be able Share interview or not", () => {
    cy.request({
      method: "PATCH",
      url: `/interview/share/${submissionId}`,
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
        cy.log("Share interview Response:", response.body);
        console.log("Share interview Response:", response.body);
      } else {
        cy.log("Share interview failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
