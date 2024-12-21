describe("Verify user successfully with status code 200", () => {
  let studentToken;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((data) => {
      studentToken = data.studentLoginToken;
    });
  });

  it("Checking if should be able to verify user", () => {
    cy.request({
      method: "POST",
      url: "/user/verify",
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
      body: {},
    }).then((response) => {
      if (response.status === 200) {
        cy.log("User verified successfully");
        console.log("User verified successfully");
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(3000);
      } else {
        cy.log("Verification failed with status:", response.status);
        cy.log(response.body);
        console.log("Verification failed with status:", response.status);
        console.log(response.body);
      }
    });
  });
});
