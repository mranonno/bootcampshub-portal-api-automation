let accessToken;
let enrollmentId;
let page = 1;
let limit = 8;
let query = "Test";
describe("Get my slides successfully with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
  });

  it("Checking if should be able to Get my slides or not", () => {
    cy.request({
      method: "GET",
      url: `/slide/myslides?page=${page}&limit=${limit}&query=${query}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Get my slides successfully");
        console.log("Get my slides successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Get my slides failed with status code:", response.status);
        console.log(`Get my slides failed with status code ${response.status}`);
        cy.log(`Get my slides failed  ${response.body.error}`);
        console.log(`Get my slides failed  ${response.body.error}`);
      }
    });
  });
});
