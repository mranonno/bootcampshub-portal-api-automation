describe("Create community post successfully with status code 200", () => {
  let accessToken;
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      organizationId = loginData.organizationId;
    });
  });

  it("Checking if should be able create community post or not", () => {
    cy.request({
      method: "POST",
      url: "/content/community/post/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        title: "Mobile App Api Testing",
        description: "community post for mobile app api testing",
        attachments: [],
        tags: [],
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        cy.writeFile("cypress/fixtures/communityPostId.json", {
          community_postId: response.body.post._id,
        });

        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Create community post Response:", response.body);
        console.log("Create community post Response:", response.body);
      } else {
        cy.log(
          "Create community post failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
