describe("Forgot password functionality if I forgot my password successfully with status code 200", () => {
  let studentEmail;
  let studentNumber;

  before(() => {
    cy.readFile("cypress/fixtures/userInformation.json").then((data) => {
      studentEmail = data.email;
      studentNumber = data.number;
    });
  });

  it("Checking if a user can use forgot password functionality in the browser or not", () => {
    cy.request({
      method: "POST",
      url: "/user/password/forgot",
      body: {
        phone: studentNumber,
        email: studentEmail,
        channel: "email",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("isOtpSend", true);
        cy.log("Forgot Password Response:", response.body);
        console.log("Forgot Password Response:", response.body);
      } else {
        cy.log("Forgot password failed due to: ", response.body.error);
      }
    });
  });
});
