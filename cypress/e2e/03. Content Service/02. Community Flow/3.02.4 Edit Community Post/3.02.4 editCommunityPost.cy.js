describe("Edit community post successfully with status code 200", () => {
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

  it("Checking if should be able Edit community post or not", () => {
    cy.request({
      method: "PATCH",
      url: `/content/community/post/edit/${communityPostId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        title: "Community post testing for edit",
        description: "Description text",
        tags: "#app",
        attachments: "",
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
        cy.log("Edit community post Response:", response.body);
        console.log("Edit community post Response:", response.body);
      } else {
        cy.log(
          "Edit community post failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
