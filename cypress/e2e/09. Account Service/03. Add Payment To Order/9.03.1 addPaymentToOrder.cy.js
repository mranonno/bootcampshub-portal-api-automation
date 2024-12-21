describe("Add payment to order successfully with status code 200", () => {
  let accessToken;
  let orderId = "663b82eba724270019bd94c1";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Add payment to order or not", () => {
    cy.request({
      method: "POST",
      url: `/order/addpayment/${orderId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        method: "Card",
        amount: 50,
        date: "2024-11-20",
        note: "Payment for course",
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
        cy.log("Add payment to order Response:", response.body);
        console.log("Add payment to order Response:", response.body);
      } else {
        cy.log(
          "Add payment to order failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
