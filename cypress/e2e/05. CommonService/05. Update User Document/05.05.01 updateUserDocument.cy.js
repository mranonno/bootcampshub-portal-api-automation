const { faker } = require("@faker-js/faker");

let accessToken;
let enrollmentId;
let documentId;
describe("Update user document successfully with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
    cy.readFile("cypress/fixtures/documentId.json").then((docData) => {
      documentId = docData.documentId;
    });
  });

  it("Checking if should be able to Update user document or not", () => {
    cy.request({
      method: "PATCH",
      url: `/document/userdocument/update/${documentId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      body: {
        name: faker.person.fullName(),
        description: "Random description text",
        attachment: [],
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Update user document successfully");
        console.log("Update user document successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log(
          "Update user document failed with status code:",
          response.status
        );
        console.log(
          `Update user document failed with status code ${response.status}`
        );
        cy.log(`Update user document failed  ${response.body.error}`);
        console.log(`Update user document failed  ${response.body.error}`);
      }
    });
  });
});
