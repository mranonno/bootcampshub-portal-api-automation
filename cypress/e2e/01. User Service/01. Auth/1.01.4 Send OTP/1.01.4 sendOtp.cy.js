describe("Send OTP to email successfully with status code 200", () => {
  let userId;
  before(() => {
    cy.readFile("cypress/fixtures/studentLoginID.json").then((data) => {
      userId = data.userId;
    });
  });

  it("Checking if should be able to send OTP to email", () => {
    cy.request({
      method: "POST",
      url: "/user/sendotp",
      body: {
        userId: userId,
        channel: "email",
        captchaToken: "",
      },
    }).then((response) => {
      if (response.status === 200) {
        cy.log("Send OTP successful");
        console.log("Send OTP successful");
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(3000);
      } else {
        // Handle unsuccessful verification
        cy.log("Verification failed with status:", response.status);
        cy.log(response.body);
        console.log("Verification failed with status:", response.status);
        console.log(response.body);
      }
    });
  });
});
