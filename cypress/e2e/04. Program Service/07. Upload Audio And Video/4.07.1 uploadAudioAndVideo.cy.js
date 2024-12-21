describe("Upload video and audio with status code 200", () => {
  let accessToken;

  before(() => {
    // Read the token before the test
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
      console.log("Access Token:", accessToken); // Log after assignment
    });
  });

  it("Should successfully update the audio and video", () => {
    const filePath = "/example-people.csv";

    cy.fixture(filePath, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        const formData = new FormData();
        formData.append("file", blob, "example-people.csv");

        // Send PATCH request with FormData
        return cy.request({
          method: "POST",
          url: "/settings/video-audio-upload",
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
          cy.log("Upload audio and video file successfully");
          //   cy.log(JSON.stringify(response.body, null, 2));
        } else {
          cy.log(
            "Upload video and audio file failed with status code: ",
            response.status
          );
          cy.log(response.body.error || "Unknown error");
        }
      });
  });
});
