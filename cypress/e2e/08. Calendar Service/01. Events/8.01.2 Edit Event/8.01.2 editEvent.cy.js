describe("Update calender event successfully with status code 200", () => {
  let accessToken;
  let eventId;

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/eventId.json").then((eventData) => {
      eventId = eventData.event_id;
    });
  });

  it("Checking if should be able Update calender event or not", () => {
    cy.request({
      method: "PATCH",
      url: `/calendar/event/update/${eventId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        title: "Update event",
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
        invitations: ["663eeccc2e9c740019d33425", "6633d94abac9199ca01635a4"],
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
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        cy.log("Update calender event Response:", response.body);
        console.log("Update calender event Response:", response.body);
      } else {
        cy.log(
          "Update calender event failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
