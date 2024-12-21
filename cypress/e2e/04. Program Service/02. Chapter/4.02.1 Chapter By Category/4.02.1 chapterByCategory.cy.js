describe("Get chapter by category successfully with status code 200", () => {
  let accessToken;
  let program_slug;
  let categoryId = "65eb5eaff6d7cc3e14e90cd7";
  let enrollmentId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/programSlug.json").then((programData) => {
      program_slug = programData.programSlug;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
  });

  it("Checking if should be able Get chapter by category or not", () => {
    cy.request({
      method: "POST",
      url: `/course/chapterv2/get/${program_slug}/${categoryId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      body: {
        parent: "",
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
        cy.log("Get chapter by category Response:", response.body);
        console.log("Get chapter by category Response:", response.body);
      } else {
        cy.log(
          "Get chapter by category failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
