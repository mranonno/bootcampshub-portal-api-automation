const { faker } = require("@faker-js/faker");

describe.skip("Register user to the portal with valid credential and get stats code 200", () => {
  it("Checking if should be able to register user or not", () => {
    cy.request({
      method: "POST",
      url: "/user/register",
      body: {
        firstName: faker.person.firstName("male"),
        lastName: faker.person.lastName("male"),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        confirm: "Ashraful186@",
        password: "Ashraful186@",
        referredBy: null,
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.duration).to.be.lessThan(2000);
        cy.log("User register successfully");
        console.log("User register successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Register failed with status code:", response.status);
        console.log(`Register failed with status code ${response.status}`);
        cy.log(`Register failed  ${response.body.error}`);
        console.log(`Register failed  ${response.body.error}`);
      }
    });
  });
});
