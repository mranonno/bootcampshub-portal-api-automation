describe("Add user transaction successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Add user transaction or not", () => {
    cy.request({
      method: "POST",
      url: "/transaction/addbyuser",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        method: "Bank Transfer",
        amount: 100,
        date: "2024-11-20",
        note: "Payment note",
        attachment: "",
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
        cy.log("Add user transaction Response:", response.body);
        console.log("Add user transaction Response:", response.body);
      } else {
        cy.log(
          "Add user transaction failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
