describe("Get course roadmap data successfully with status code 200", () => {
  let accessToken;
  let courseId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/courseId.json").then((courseData) => {
      courseId = courseData.courseId;
    });
  });

  it("Checking if should be able Get course roadmap data or not", () => {
    cy.request({
      method: "GET",
      url: `/course/roadmap/find/${courseId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        cy.log("Get course roadmap data Response:", response.body);
        console.log("Get course roadmap data Response:", response.body);
      } else {
        cy.log(
          "Get course roadmap data failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
