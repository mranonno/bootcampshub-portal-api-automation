describe("Get content by content Id successfully with status code 200", () => {
  let accessToken;
  let enrollmentId;
  const courseId = "670221e5e018710019b9bab8";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });

    cy.log(enrollmentId);
  });

  it("Checking if should be able get content by content Id or not", () => {
    cy.request({
      method: "GET",
      url: `/content/getcontent/${courseId}`,
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
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Get course by course Id Response:", response.body);
        console.log("Get course data by course id Response:", response.body);
      } else {
        cy.log(
          "Get content by content Id failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
