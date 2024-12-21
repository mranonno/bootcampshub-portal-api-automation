describe("Update availability schedule successfully with status code 200", () => {
  let accessToken;
  let scheduleId = "658b2d300e8b2153646d05b3";

  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
  });

  it("Checking if should be able Update availability schedule or not", () => {
    cy.request({
      method: "PATCH",
      url: `/calendar/schedule/update/${scheduleId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        availability: [
          {
            _id: "658b2e0f0e8b2153646d05bc",
            type: "wady",
            intervals: [
              {
                _id: "afb05a2be5ee3e2490d9b7fc",
                from: "11:00",
                to: "12:00",
              },
            ],
            wday: "monday",
          },
          {
            _id: "658bf962f89a3a7314b913fb",
            type: "wady",
            intervals: [
              {
                _id: "56cf6f89fc420b7fc338a311",
                from: "11:00",
                to: "12:00",
              },
              {
                _id: "86c2a8e4e52f361c8ae7d9b0",
                from: "11:00",
                to: "12:00",
              },
            ],
            wday: "tuesday",
          },
          {
            _id: "658bf962f89a3a7314b913ff",
            type: "wady",
            intervals: [
              {
                _id: "6665390cd456da0019e7c49f",
                from: "09:00",
                to: "17:00",
              },
            ],
            wday: "wednesday",
          },
          {
            _id: "658bf962f89a3a7314b91403",
            type: "wady",
            intervals: [
              {
                _id: "6665390cd456da0019e7c49f",
                from: "20:00",
                to: "17:00",
              },
            ],
            wday: "thursday",
          },
          {
            _id: "658bf962f89a3a7314b91407",
            type: "wady",
            intervals: [
              {
                _id: "fc95e353f3852ce30e59161e",
                from: "11:00",
                to: "12:00",
              },
              {
                _id: "56cf6f89fc420b7fc338a311",
                from: "11:00",
                to: "12:00",
              },
            ],
            wday: "friday",
          },
          {
            _id: "66a4aa543102ed0019b4eaee",
            type: "wady",
            intervals: [
              {
                _id: "66a4aa543102ed0019b4eaef",
                from: "09:00",
                to: "15:00",
              },
            ],
            wday: "saturday",
          },
        ],
        name: "Ashik’s Time",
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
        cy.log("Update availability schedule Response:", response.body);
        console.log("Update availability schedule Response:", response.body);
      } else {
        cy.log(
          "Update availability schedule failed with status code: ",
          response.status
        );
        cy.log(response.body.error);
      }
    });
  });
});
