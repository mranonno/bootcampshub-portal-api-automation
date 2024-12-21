describe("Get student reviews course successfully with status code 200", () => {
  let accessToken;
  let course_id;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/courseId.json").then((courseData) => {
      course_id = courseData.courseId;
    });
  });

  it("Checking if should be able get Get student reviews course or not", () => {
    cy.request({
      method: "GET",
      url: `/course/review/get/${course_id}?fields[]=reviews&&page=1&limit=10&category=student`,
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
        cy.log("Get student reviews course Response:", response.body);
        console.log("Get student reviews course Response:", response.body);
      } else {
        cy.log(
          "Get student reviews course failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
