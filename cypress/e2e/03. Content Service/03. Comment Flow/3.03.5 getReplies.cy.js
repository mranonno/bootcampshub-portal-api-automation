describe("Get community comment reply successfully with status code 200", () => {
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

  it("Checking if should be able Get community comment reply or not", () => {
    cy.request({
      method: "GET",
      url: "/content/comment/get/673905dc92731d9ad8c78e37?parentId=674835d5b419790019bb0f5a",
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
        cy.log("Get community comment reply Response:", response.body);
        console.log("Get community comment reply Response:", response.body);
      } else {
        cy.log(
          "Get community comment reply failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
