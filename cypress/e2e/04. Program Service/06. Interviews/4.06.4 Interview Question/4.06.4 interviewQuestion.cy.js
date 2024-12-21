describe("Get interview question successfully with status code 200", () => {
  let accessToken;
  let enrollment;
  let questionId = "66965b09a7931c001920d174";
  let interviewId = "66bc64f18a5075001979c83e";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollment = loginData.enrollmentId;
    });
  });

  it("Checking if should be able Get interview question or not", () => {
    cy.request({
      method: "GET",
      url: `/interview/answer/${interviewId}/${questionId}`,
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
        cy.log("Get interview question Response:", response.body);
        console.log("Get interview question Response:", response.body);
      } else {
        cy.log(
          "Get interview question failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
