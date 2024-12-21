describe("Send OTP to email successfully with status code 200", () => {
  let userId;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      userId = data.userId;
    });
  });

  it("Checking if should be able to send OTP to email", () => {
    cy.request({
      method: "POST",
      url: "/api/user/sendotp",
      body: {
        userId: userId,
        channel: "email",
        captchaToken: "",
      },
    }).then((response) => {
      if (response.status === 200) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
        cy.log("Send OTP successfully");
        console.log("Send OTP successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Login failed with status code:", response.status);
        console.log(`Login failed with status code ${response.status}`);
        cy.log(`Login failed  ${response.body.error}`);
        console.log(`Login failed  ${response.body.error}`);
      }
    });
  });
});
