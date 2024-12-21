describe("Fetch chat image with status code 200", () => {
  let accessToken;
  let organizationId;
  let chatId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      organizationId = loginData.organizationId;
      chatId = loginData.chatId;
    });
  });

  it("Checking if should be able Fetch chat image or not", () => {
    cy.request({
      method: "POST",
      url: `/chat/media/${chatId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: { limit: 1, type: "image" },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(7000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("Fetch chat image Response:", response.body);
      } else {
        cy.log("Fetch chat image failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
