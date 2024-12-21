describe("Get course content by category successfully with status code 200", () => {
  let accessToken;
  let enrollmentId;
  const category = "other";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });

    cy.log(enrollmentId);
  });

  it("Checking if should be able get course data or not", () => {
    cy.request({
      method: "GET",
      url: `/content/getbycourse/${category}`,
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
        cy.log("Get course data Response:", response.body);
        console.log("Get course data Response:", response.body);
      } else {
        cy.log("Get course data failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
