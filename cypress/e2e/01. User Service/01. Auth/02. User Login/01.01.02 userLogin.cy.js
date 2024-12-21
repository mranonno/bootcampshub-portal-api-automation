describe("User login to the portal with valid credential and get stats code 200", () => {
  let userEmail;
  let userPassword;
  before(() => {
    cy.readFile("cypress/fixtures/loginInformation.json").then((data) => {
      userEmail = data.email;
      userPassword = data.password;
    });
  });

  it("Checking if should be able to login user to the portal", () => {
    cy.request({
      method: "POST",
      url: "/api/user/login",
      body: {
        email: userEmail,
        password: userPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        const { token, user } = response.body;

        // // Store token and login ID to fixtures
        cy.writeFile("cypress/fixtures/userToken.json", {
          token: token,
          userId: user._id,
        });

        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
        cy.log("User login successfully");
        console.log("User login successfully");
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
