describe("Get my order course successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Get my order course or not", () => {
    cy.request({
      method: "GET",
      url: "/order/myorder/course",
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
        cy.log("Get my order course Response:", response.body);
        console.log("Get my order course Response:", response.body);
      } else {
        cy.log(
          "Get my order course failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
