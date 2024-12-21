describe("Login to the portal with valid credential and get stats code 200", () => {
  let userEmail;
  let userPassword;
  before(() => {
    cy.readFile("cypress/fixtures/userInformation.json").then((data) => {
      userEmail = data.email;
      userPassword = data.password;
    });
  });

  it("Checking if should be able to login user", () => {
    cy.request({
      method: "POST",
      url: "/user/login",
      body: {
        email: userEmail,
        password: userPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        const { token, user } = response.body;
        const studentToken = token;
        const studentLoginID = user._id;

        // Store token and login ID to fixtures
        cy.writeFile("cypress/fixtures/studentToken.json", {
          studentLoginToken: studentToken,
        });
        // cy.writeFile("cypress/fixtures/studentLoginID.json", {
        //   userId: studentLoginID,
        // });

        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        expect(response.body.success).to.eq(true);
        expect(response.duration).to.be.lessThan(2000);
        cy.log("User Token:", studentToken);
        cy.log("User ID:", studentLoginID);
        console.log("User Token:", studentToken);
        console.log("User ID:", studentLoginID);
        cy.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Login failed with status:", response.status);
        cy.log(`Login failed  ${response.body.error}`);
        cy.log(`Login failed with status code ${response.status}`);
      }
    });
  });
});
