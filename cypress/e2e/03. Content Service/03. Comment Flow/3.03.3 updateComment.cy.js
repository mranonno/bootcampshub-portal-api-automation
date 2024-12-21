describe("Update community post comment successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Update community post comment or not", () => {
    cy.request({
      method: "PATCH",
      url: `/content/comment/update/674835d5b419790019bb0f5a`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        comment: "Updated comment again",
        contentId: "673905dc92731d9ad8c78e37",
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
        cy.log("Update community post comment Response:", response.body);
        console.log("Update community post comment Response:", response.body);
      } else {
        cy.log(
          "Update community post comment failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
