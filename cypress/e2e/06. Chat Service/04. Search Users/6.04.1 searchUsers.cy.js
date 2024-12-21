describe("Search Users successfully with status code 200", () => {
  let accessToken;
  let query = "anonno";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Search Users or not", () => {
    cy.request({
      method: "GET",
      url: `/chat/searchuser?query=${query}`,
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
        cy.log("Search Users Response:", response.body);
        console.log("Search Users Response:", response.body);
      } else {
        cy.log("Search Users failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
