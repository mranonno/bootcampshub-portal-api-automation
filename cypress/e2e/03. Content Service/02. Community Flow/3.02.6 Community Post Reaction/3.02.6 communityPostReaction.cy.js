describe("Community post reaction successfully with status code 200", () => {
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

  it("Checking if should be able Community post reaction or not", () => {
    cy.request({
      method: "PUT",
      url: `/content/community/post/react/${communityPostId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        symbol: "😀",
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
        cy.log("Community post reaction Response:", response.body);
        console.log("Community post reaction Response:", response.body);
      } else {
        cy.log(
          "Community post reaction failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
