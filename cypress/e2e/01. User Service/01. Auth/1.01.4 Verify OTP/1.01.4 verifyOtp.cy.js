describe.skip("Verify OTP with status code 200", () => {
  let studentID;

  before(() => {
    cy.readFile("cypress/fixtures/studentLoginID.json").then((data) => {
      studentID = data.userId;
    });
  });

  it("should be able to verify", () => {
    const otp = "731258";

    cy.request({
      method: "POST",
      url: "/user/verifyotp",
      body: {
        otp: otp,
        channel: "email",
        userId: studentID, // Use student ID obtained from fixture
      },
    }).then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        cy.log("OTP verification successful");
        console.log("OTP verification successful");
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
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
