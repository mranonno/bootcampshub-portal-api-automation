describe("Create community post comment successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Create community post comment or not", () => {
    cy.request({
      method: "POST",
      url: "/content/comment/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        comment: "Nice work bro 3",
        contentId: "673905dc92731d9ad8c78e37",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 201) {
        const { comment } = response.body;
        cy.writeFile("cypress/fixtures/deleteCommentId.json", {
          commentId: comment._id,
        });
        // Assertions
        expect(response.status).to.eq(201);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Create community post comment Response:", response.body);
        console.log("Create community post comment Response:", response.body);
      } else {
        cy.log(
          "Create community post comment failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
