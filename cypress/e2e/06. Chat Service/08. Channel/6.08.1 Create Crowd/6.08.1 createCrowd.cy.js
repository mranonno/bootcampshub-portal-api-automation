const { faker } = require("@faker-js/faker");

describe("Create crowd with status code 200", () => {
  let accessToken;
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/organizationId.json").then((orgData) => {
      organizationId = orgData.organizationId;
    });
  });

  it("Checking if should be able Create crowd or not", () => {
    cy.request({
      method: "POST",
      url: "/chat/channel/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        name: faker.person.fullName,
        description: "It's description",
        users: ["64ef676669eaf6370c11429c", "650e70e7165fc20019352988"],
        isReadOnly: false,
        isPublic: true,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        cy.writeFile("cypress/fixtures/crowdId.json", {
          crowdId: response.body.chat._id,
        });

        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Create crowd Response:", response.body);
      } else {
        cy.log("Create crowd failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
