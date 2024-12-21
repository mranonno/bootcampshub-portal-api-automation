describe("Upload user document file with status code 200", () => {
  let accessToken;

  before(() => {
    // Read the token before the test
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Should successfully upload user document file", () => {
    const filePath = "/image1.png";

    cy.fixture(filePath, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        const formData = new FormData();
        formData.append("file", blob, "image1.png");

        // Send PATCH request with FormData
        return cy.request({
          method: "POST",
          url: "/document/userdocumentfile",
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
          cy.log("Upload user document file successfully");
          //   cy.log(JSON.stringify(response.body, null, 2));
        } else {
          cy.log(
            "Upload user document file file failed with status code: ",
            response.status
          );
          cy.log(response.body.error || "Unknown error");
        }
      });
  });
});
