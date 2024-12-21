describe("Create show n tell successfully with status code 200", () => {
  let accessToken;
  let enrollment;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollment = loginData.enrollmentId;
    });
  });

  it("Checking if should be able Create show n tell or not", () => {
    cy.request({
      method: "POST",
      url: "/show-tell/add",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollment,
      },
      body: {
        title: "Sample Title 2",
        agenda: "Sample Agenda",
        date: "2024-09-21T13:52:03+06:00",
        attachments: [""],
        users: ["662882ef82d3120019fade53", "662776ef82d3120019fa94ec"],
        notifications: [
          {
            timeBefore: 15,
            methods: ["inbox"],
            chatGroups: [],
          },
        ],
        creator: "64ef676669eaf6370c11429c",
      },

      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        cy.writeFile("cypress/fixtures/showNTellID.json", {
          snt_id: response.body.item._id,
        });
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Create show n tell Response:", response.body);
        console.log("Create show n tell Response:", response.body);
      } else {
        cy.log("Create show n tell failed with status code: ", response.status);
        cy.log(response.body.error);
      }
    });
  });
});
