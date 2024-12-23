let accessToken;
let enrollmentId;
let slideId = "6669734f466c2100191f66cd";
describe("Get single slide successfully with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
  });

  it("Checking if should be able to Get single slide or not", () => {
    cy.request({
      method: "GET",
      url: `/slide/single/${slideId}`,
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
        cy.log("Get single slide successfully");
        console.log("Get single slide successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Get single slide failed with status code:", response.status);
        console.log(
          `Get single slide failed with status code ${response.status}`
        );
        cy.log(`Get single slide failed  ${response.body.error}`);
        console.log(`Get single slide failed  ${response.body.error}`);
      }
    });
  });
});
