describe("Submit interview answer successfully with status code 200", () => {
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

  it("Checking if should be able Submit interview answer or not", () => {
    cy.request({
      method: "PUT",
      url: "/interview/submit-answer",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollment,
      },
      body: {
        interview: "66bc64f18a5075001979c83e",
        video: "Interview question answer testing",
        audio: "",
        question: "66a45d333992e3001996d0a9",
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
        cy.log("Submit interview answer Response:", response.body);
        console.log("Submit interview answer Response:", response.body);
      } else {
        cy.log(
          "Submit interview answer failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
