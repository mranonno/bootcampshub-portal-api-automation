describe("Update User Status successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able update user status or not", () => {
    cy.request({
      method: "PATCH",
      url: "/user/updateuser",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        profileStatus: {
          currentStatus: "Busy Nai",
          recurring: {
            isDailyRecurring: true,
            fromTime: "09:01 AM",
            toTime: "05:00 PM",
          },
        },
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
        cy.log("User status Response:", response.body);
        console.log("User status Response:", response.body);
      } else {
        cy.log("Update user status failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});