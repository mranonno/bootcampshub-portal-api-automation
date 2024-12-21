describe("Get my show n tell successfully with status code 200", () => {
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

  it("Checking if should be able Get my show n tell or not", () => {
    cy.request({
      method: "GET",
      url: "/show-tell/myshows",
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
        cy.log("Get my show n tell Response:", response.body);
        console.log("Get my show n tell Response:", response.body);
      } else {
        cy.log("Get my show n tell failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
