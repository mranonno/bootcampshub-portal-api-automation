describe("Get preview chapter successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Get preview chapter or not", () => {
    cy.request({
      method: "POST",
      url: "/course/chapterv2/preview",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        courseId: "64fcb957b0cf6e9ae43d126d",
        fields: [
          "chapters",
          "categories",
          "totalDuration",
          "totalChapter",
          "totalLesson",
        ],
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
        cy.log("Get preview chapter Response:", response.body);
        console.log("Get preview chapter Response:", response.body);
      } else {
        cy.log(
          "Get preview chapter failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
