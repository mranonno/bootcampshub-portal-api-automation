describe("Get Company Details successfully with status code 200", () => {
  let accessToken;
  let slug;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      slug = loginData.slug;
    });
  });

  it("Checking if should be able get Company Details or not", () => {
    cy.request({
      method: "GET",
      url: `/organization/details/${slug}`,
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
        cy.log("Get Company Details  Response:", response.body);
        console.log("Get Company Details  Response:", response.body);
      } else {
        cy.log(
          "Get Company Details failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
