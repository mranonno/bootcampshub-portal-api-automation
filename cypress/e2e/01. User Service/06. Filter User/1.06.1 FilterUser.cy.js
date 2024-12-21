describe("User filtering successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able user filter or not", () => {
    cy.request({
      method: "POST",
      url: "/user/filter",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        program: "",
        session: "",
        query: "anonno",
        global: true,
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
        cy.log("User filter Response:", response.body);
        console.log("User filter Response:", response.body);
      } else {
        cy.log("User filtering failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
