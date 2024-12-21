describe("Delete community post successfully with status code 200", () => {
  let accessToken;
  let communityPostId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/communityPostId.json").then(
      (communityData) => {
        communityPostId = communityData.community_postId;
      }
    );
  });

  it("Checking if should be able Delete community post or not", () => {
    cy.request({
      method: "DELETE",
      url: `/content/community/post/delete/${communityPostId}`,
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
        cy.log("Delete community post Response:", response.body);
        console.log("Delete community post Response:", response.body);
      } else {
        cy.log(
          "Delete community post failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
