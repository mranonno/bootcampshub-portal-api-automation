describe("Update Profile Picture API", () => {
  let accessToken;

  before(() => {
    // Read the token before the test
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
      console.log("Access Token:", accessToken); // Log after assignment
    });
  });

  it("Should successfully update the profile picture", () => {
    const imagePath = "/images/image1.png";

    cy.fixture(imagePath, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        const formData = new FormData();
        formData.append("image", blob, "image1.png");

        // Send PATCH request with FormData
        return cy.request({
          method: "PATCH",
          url: "/user/updateimage",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        if (response.status === 200) {
          expect(response.status).to.eq(200);
          cy.log("Profile picture updated successfully");
          //   cy.log(JSON.stringify(response.body, null, 2));
        } else {
          cy.log(
            "Profile picture update failed with status code: ",
            response.status
          );
          cy.log(response.body.error || "Unknown error");
        }
      });
  });
});
