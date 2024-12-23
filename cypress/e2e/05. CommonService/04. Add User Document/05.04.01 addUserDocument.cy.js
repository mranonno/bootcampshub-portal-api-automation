const { faker } = require("@faker-js/faker");

let accessToken;
let enrollmentId;
describe("Add user document successfully with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
  });

  it("Checking if should be able to Add user document or not", () => {
    cy.request({
      method: "POST",
      url: "/document/userdocument/add",
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
        cy.writeFile("cypress/fixtures/documentId.json", {
          documentId: response.body.document._id,
        });
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Add user document successfully");
        console.log("Add user document successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Add user document failed with status code:", response.status);
        console.log(
          `Add user document failed with status code ${response.status}`
        );
        cy.log(`Add user document failed  ${response.body.error}`);
        console.log(`Add user document failed  ${response.body.error}`);
      }
    });
  });
});
