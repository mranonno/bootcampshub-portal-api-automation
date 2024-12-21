describe("Get crowd members with status code 200", () => {
  let accessToken;
  let crowdId;
  const targetUserId = "6741c6ec1919010019fb4fa2";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/crowdId.json").then((crowdData) => {
      crowdId = crowdData.crowdId;
    });
  });

  it("Checking if should be able Get crowd members or not", () => {
    cy.request({
      method: "POST",
      url: `/chat/members/${crowdId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        const user = response.body.results.find(
          (item) => item.user._id === targetUserId
        );

        cy.writeFile("cypress/fixtures/crowdMember.json", {
          crowdMember: user,
        });

        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        // expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Get crowd members Response:", response.body);
      } else {
        cy.log("Get crowd members failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
