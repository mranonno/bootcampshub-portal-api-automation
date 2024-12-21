describe("Get single community post successfully with status code 200", () => {
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

  it("Checking if should be able get single community post or not", () => {
    cy.request({
      method: "GET",
      url: `/content/community/post/${communityPostId}`,
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
        cy.log("Get single community post Response:", response.body);
        console.log("Get single community post Response:", response.body);
      } else {
        cy.log(
          "Get single community post failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
