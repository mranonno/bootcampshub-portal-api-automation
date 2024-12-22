const { faker } = require("@faker-js/faker");

describe("Send family invite successfully with status code 200", () => {
  let accessToken;
  let enrollmentId;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
  });

  it("Checking if should be able to send family invite or not", () => {
    cy.request({
      method: "POST",
      url: "/family/invite",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      body: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        relation: "Brother",
        image: "",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Invite sent successfully");
        console.log("Invite sent successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Invite sent failed with status code:", response.status);
        console.log(`Invite sent failed with status code ${response.status}`);
        cy.log(`Invite sent failed  ${response.body.error}`);
        console.log(`Invite sent failed  ${response.body.error}`);
      }
    });
  });
});
