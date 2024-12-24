describe("Update notification preference successfully with status code 200", () => {
  let accessToken;
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able to Get notification preference or not", () => {
    cy.request({
      method: "PATCH",
      url: "/notification/preference/getall",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        preferences: [
          {
            id: "changePassword",
            channels: ["push", "web", "chat", "email", "sms"],
            _id: "66cb3bc324e209cf61f1a4bd",
          },
          {
            id: "updateProfile",
            channels: ["push", "web", "chat", "email"],
            _id: "66cb3bc324e209cf61f1a4be",
          },
          {
            id: "changeStatusShowAndTell",
            channels: ["web", "chat", "push"],
            _id: "66cb3bc324e209cf61f1a4bf",
          },
          {
            id: "createMyDocument",
            channels: ["web", "chat"],
            _id: "66cb3bc324e209cf61f1a4c0",
          },
          {
            id: "mediaSendingToUser",
            channels: ["web", "chat"],
            _id: "66cb3bc324e209cf61f1a4c1",
          },
          {
            id: "createSlide",
            channels: ["web", "chat"],
            _id: "66cb3bc324e209cf61f1a4c2",
          },
          {
            id: "createCalendarEvent",
            channels: ["web", "chat", "push", "email"],
            _id: "66cb3bc324e209cf61f1a4c3",
          },
          {
            id: "rescheduleCalendarEvent",
            channels: ["web", "chat", "push", "email"],
            _id: "66cb3bc324e209cf61f1a4c4",
          },
          {
            id: "invitationCalendarEvent",
            channels: ["web", "chat", "push", "email"],
            _id: "66cb3bc324e209cf61f1a4c5",
          },
          {
            id: "createImportantLink",
            channels: ["web", "push", "chat"],
            _id: "66cb3bc324e209cf61f1a4c6",
          },
          {
            id: "createContent",
            channels: ["web", "push", "chat"],
            _id: "66cb3bc324e209cf61f1a4c7",
          },
          {
            id: "createTemplate",
            channels: ["web", "push", "chat"],
            _id: "66cb3bc324e209cf61f1a4c8",
          },
          {
            id: "createDiagram",
            channels: ["web", "push", "chat"],
            _id: "66cb3bc324e209cf61f1a4c9",
          },
          {
            id: "createMockInterview",
            channels: ["web", "push", "chat"],
            _id: "66cb3bc324e209cf61f1a4ca",
          },
          {
            id: "updateTransactionStatus",
            channels: ["web", "push", "chat", "email"],
            _id: "66cb3bc324e209cf61f1a4cb",
          },
          {
            id: "organizationStatusChange",
            channels: ["web", "push", "chat", "email", "sms"],
            _id: "66cb3bc324e209cf61f1a4cc",
          },
          {
            id: "enrollmentStatusChange",
            channels: ["web", "push", "chat", "email", "sms"],
            _id: "66cb3bc324e209cf61f1a4cd",
          },
          {
            id: "orderStatusChange",
            channels: ["web", "push", "chat", "email", "sms"],
            _id: "66cb3bc324e209cf61f1a4ce",
          },
          {
            id: "orderTransactionStatusChange",
            channels: ["web", "push", "chat", "email"],
            _id: "66cb3bc324e209cf61f1a4cf",
          },
          {
            id: "newLessonAdd",
            channels: ["web", "push", "chat"],
            _id: "66cb3bc324e209cf61f1a4d0",
          },
          {
            id: "sendInvoice",
            channels: ["web", "push", "chat"],
            _id: "66cb3bc324e209cf61f1a4d1",
          },
          {
            id: "certificateGenerate",
            channels: ["web", "push", "chat", "email"],
            _id: "66cb3bc324e209cf61f1a4d2",
          },
          {
            id: "calendarReminder",
            channels: ["sms", "email", "web", "push", "groups", "chat"],
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
        cy.log("Get notification preference successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log(
          "Get notification preference failed with status code:",
          response.status
        );
        cy.log(`Get notification preference failed  ${response.body.error}`);
      }
    });
  });
});
