describe("Find user availability schedule successfully with status code 200", () => {
  let accessToken;
  let user_id = "650e70e7165fc20019352988";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Find user availability schedule or not", () => {
    cy.request({
      method: "GET",
      url: `/calendar/schedule/find/${user_id}`,
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
        cy.log("Find user availability schedule Response:", response.body);
        console.log("Find user availability schedule Response:", response.body);
      } else {
        cy.log(
          "Find user availability schedule failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
