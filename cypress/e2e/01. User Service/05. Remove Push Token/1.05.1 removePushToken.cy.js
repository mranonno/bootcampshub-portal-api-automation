describe("Remove push token successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if the remove push token or not", () => {
    cy.request({
      method: "POST",
      url: "/user/remove-pushtoken",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        token: "user",
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
        cy.log("Remove push token Response:", response.body);
        console.log("Remove push token Response:", response.body);
      } else {
        cy.log("Remove push token failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
