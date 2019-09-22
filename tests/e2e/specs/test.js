const TIMER_VALIDATION = 2000;
const EXAMPLE_TIME_TEST_VALIDATION = [":10", "30:10", "40:", "50:123"];

describe("My First Test", () => {
  const taskItems = () => cy.get("[data-cy='task-items']");
  const saveTaskButton = () => cy.get("[data-cy='save-task-button']");
  const inputTime = () => cy.get("[data-cy='input-time']");
  const inputText = () => cy.get("[data-cy='input-text']");
  const openAddTaskContainer = () => cy.get("[data-cy='add-task-button']");

  it("Visits the app root url", () => {
    cy.visit("http://localhost:8080/");
  });

  it("Add task", () => {
    taskItems()
      .children()
      .then(e => {
        let startTasksLength = e.length;

        openAddTaskContainer().click();

        inputTime()
          .type("10:10")
          .wait(TIMER_VALIDATION);

        inputText().type("Test");

        saveTaskButton().click();

        taskItems()
          .children()
          .should("have.length", ++startTasksLength);
      });
  });

  it("Time validation", () => {
    openAddTaskContainer()
      .click()
      .wrap(EXAMPLE_TIME_TEST_VALIDATION)
      .each(num => {
        return new Cypress.Promise(resolve => {
          inputTime()
            .clear()
            .type(num);

          cy.wait(TIMER_VALIDATION);

          inputText().should("be.disabled");
          resolve();
        });
      });

    inputTime()
      .clear()
      .type("00:00")
      .wait(TIMER_VALIDATION);

    inputText().should("not.be.disabled");

    inputTime()
      .clear()
      .wait(500)
      .type("00:00");

    inputText()
      .should("be.disabled")
      .wait(TIMER_VALIDATION)
      .should("not.be.disabled");
  });
});
