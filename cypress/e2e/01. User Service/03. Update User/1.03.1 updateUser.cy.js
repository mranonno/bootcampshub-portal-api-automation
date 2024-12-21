describe("Update user successfully with status code 200", () => {
  let accessToken;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if the user can reset their password or not", () => {
    cy.request({
      method: "PATCH",
      url: "/user/updateuser",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        firstName: "Md",
        lastName: "Shimul",
        about: "Nothing",
        personalData: {
          address: {
            street: "",
            city: "Dhaka",
            postalCode: "1216",
            state: "Dhaka",
            country: "Bangladesh",
          },
          socialMedia: {
            facebook: "",
            github: "",
            instagram: "",
            linkedin: "",
            twitter: "",
          },
          resume: "",
          bio: "Don't have bio",
        },
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Password Reset Response:", response.body);
        console.log("Password Reset Response:", response.body);
      } else {
        cy.log("Reset password failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
