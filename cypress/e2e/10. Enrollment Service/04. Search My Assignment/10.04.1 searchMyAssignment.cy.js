describe("Search my assignment successfully with status code 200", () => {
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

  it("Checking if should be able Search my assignment or not", () => {
    cy.request({
      method: "POST",
      url: "/assignment/myassignments",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollment,
      },
      body: {
        category: "",
        limit: 50,
        page: 1,
        query: "",
        status: "pending",
        type: "",
        workshop: "",
      },

      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2500);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Search my assignment Response:", response.body);
        console.log("Search my assignment Response:", response.body);
      } else {
        cy.log(
          "Search my assignment failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
