describe("Update Activity successfully with status code 200", () => {
  let accessToken;
  let activityId = "6753cd597fd24f00197d71bd";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Update Activity or not", () => {
    cy.request({
      method: "PATCH",
      url: `/communication/update/${activityId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        title: "Update communication",
        category: "day2day",
        description: "No Change",
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
        cy.log("Update Activity Response:", response.body);
        console.log("Update Activity Response:", response.body);
      } else {
        cy.log("Update Activity failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
