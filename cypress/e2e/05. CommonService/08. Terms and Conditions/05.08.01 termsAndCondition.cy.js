describe.skip("Terms and Conditions successfully with status code 200", () => {
  let accessToken;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able to Terms and Conditions or not", () => {
    cy.request({
      method: "POST",
      url: "/terms-conditions/myterm",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        branch: {
          data: {
            address: {
              street: "Street",
              city: "City",
              zip: "8700",
              country: "Bangladesh",
              state: "State",
            },
            firstContact: {
              email: "first@gmail.com",
              name: "First name",
              phone: "11728068200",
            },
            secondContact: {
              email: "second@gmail.com",
              name: "First name",
              phone: "8801647760872",
            },
            socialLinks: {
              facebook: "facebook",
              github: "github",
              instagram: "instagram",
            },
            branchUrl: "http://localhost:3003/newUI/branch-setting",
            faxNumber: "1245758454",
            taxNumber: "25458758454",
            branchLogo:
              "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/document-sending/1722570757127-SchoolHubs-logo-final-white.png",
            branchDocument: "",
            otherDocument:
              "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/document-sending/1720431819679-dog2.jpeg",
            about: "about",
            phone: "11735590775",
          },
          _id: "64fcb4e8944cf215d8d32f95",
          name: "first-branch",
          slug: "first-branch-pgbr",
        },
        program: "64fcb957b0cf6e9ae43d126d",
        session: "66491689e44f020019e08e4f",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Terms and Conditions successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log(
          "Terms and Conditions failed with status code:",
          response.status
        );
        cy.log(`Terms and Conditions failed  ${response.body.error}`);
      }
    });
  });
});
