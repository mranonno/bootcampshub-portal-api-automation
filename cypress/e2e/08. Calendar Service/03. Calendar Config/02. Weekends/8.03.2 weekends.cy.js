describe("Calender config weekends successfully with status code 200", () => {
  let accessToken;
  let type = "weekend";
  let enrollment;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollment = loginData.enrollmentId;
    });
  });

  it("Checking if should be able Calender config weekends or not", () => {
    cy.request({
      method: "GET",
      url: `/calendar/config/type/${type}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollment,
      },

      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Calender config weekends Response:", response.body);
        console.log("Calender config weekends Response:", response.body);
      } else {
        cy.log(
          "Calender config weekends failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
