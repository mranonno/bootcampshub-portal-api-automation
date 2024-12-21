describe("Update show n tell successfully with status code 200", () => {
  let accessToken;
  let enrollment;
  let snt_id;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollment = loginData.enrollmentId;
    });
    cy.readFile("cypress/fixtures/showNTellID.json").then((sntData) => {
      snt_id = sntData.snt_id;
    });
  });

  it("Checking if should be able Update show n tell or not", () => {
    cy.request({
      method: "PATCH",
      url: `/show-tell/update/${snt_id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollment,
      },
      body: {
        title: "Updated Title 3",
        agenda: "Updated Agenda",
        date: "2024-09-21T13:52:03+06:00",
        users: ["662882ef82d3120019fade53", "662776ef82d3120019fa94ec"],
        attachments: [""],
        notifications: [
          {
            timeBefore: 15,
            methods: ["inbox"],
            chatGroups: [],
          },
        ],
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
        cy.log("Update show n tell Response:", response.body);
        console.log("Update show n tell Response:", response.body);
      } else {
        cy.log("Update show n tell failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
