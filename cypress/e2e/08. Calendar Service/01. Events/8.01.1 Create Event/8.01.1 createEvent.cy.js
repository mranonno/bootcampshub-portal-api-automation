describe("Create a calendar event successfully with status code 200", () => {
  let accessToken;
  let organizationId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/organizationId.json").then((orgData) => {
      organizationId = orgData.organizationId;
    });
  });

  it("Checking if should be able Create a calendar event or not", () => {
    cy.request({
      method: "POST",
      url: "/calendar/event/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Organization: organizationId,
      },
      body: {
        title: "create a new event",
        start: "2024-07-15T04:34:00.000Z",
        end: "2024-07-15T05:04:00.000Z",
        agenda: "Ffff",
        description: "Ffff",
        actionItems: "Fff",
        followUp: "Ffff",
        notifications: [
          {
            timeBefore: "5",
            methods: ["push"],
            chatGroups: [],
          },
          {
            timeBefore: 15,
            methods: ["push"],
            chatGroups: [],
          },
        ],
        meetingLink: "",
        eventColor: "gray",
        eventType: "reviewMeeting",
        attachments: [],
        invitations: ["6527902f122aa03f94d8576e", "64ef676669eaf6370c11429c"],
        isAllDay: false,
        timeRange: {
          disabledEditTimeRange: false,
          turnOn: false,
          repeatIteration: 1,
          repeatPeriod: "week",
          repeatDays: [1],
        },
        timeZone: "Asia/Dhaka",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        cy.writeFile("cypress/fixtures/eventId.json", {
          event_id: response.body.event._id,
        });
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Create a calendar event Response:", response.body);
        console.log("Create a calendar event Response:", response.body);
      } else {
        cy.log(
          "Create a calendar event failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
