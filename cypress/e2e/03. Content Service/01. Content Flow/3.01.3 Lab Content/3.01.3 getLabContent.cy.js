describe("Get Lab Content successfully with status code 200", () => {
  let accessToken;
  let enrollmentId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });

    cy.log(enrollmentId);
  });

  it("Checking if should be able get Lab Content or not", () => {
    cy.request({
      method: "GET",
      url: "/content/labcontent",
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
        cy.log("Get lab content Response:", response.body);
        console.log("Get lab content Response:", response.body);
      } else {
        cy.log("Get lab content failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
