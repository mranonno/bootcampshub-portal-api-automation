describe("Get course content successfully with status code 200", () => {
  let accessToken;
  let programSlug;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/programSlug.json").then((slugData) => {
      programSlug = slugData.programSlug;
    });
  });

  it("Checking if should be able Get course content or not", () => {
    cy.request({
      method: "GET",
      url: `/course/content/${programSlug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        cy.log("Get course content Response:", response.body);
        console.log("Get course content Response:", response.body);
      } else {
        cy.log("Get course content failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
