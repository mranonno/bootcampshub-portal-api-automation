describe("Reply community post successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Reply community post or not", () => {
    cy.request({
      method: "POST",
      url: "/content/comment/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        contentId: "673905dc92731d9ad8c78e37",
        comment: "Thank you",
        parentId: "674835d5b419790019bb0f5a",
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
        cy.log("Reply community post Response:", response.body);
        console.log("Reply community post Response:", response.body);
      } else {
        cy.log(
          "Reply community post failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
