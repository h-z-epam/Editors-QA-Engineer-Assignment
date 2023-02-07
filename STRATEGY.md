
This document describes testing approaches for Photo Editor app.

In modern agile software development, automated testing is cornerstone of continuous delivery. This requires that feedback loop created be those tests is as fast as possible, on the other hand we do not want to reduce the amount of confidence we have created when running those tests regularly.
Having that in mind we should push as much tests to lower level which will increase speed of feedback loop:
1. E2E tests should be reduced to minimum, only main business paths will be covered to ensure correct system integration. 
2. Edge cases and business paths not covered within e2e tests, would be covered via API integration tests, this will ensure no gaps in functional test coverage.
3. Due to nature of the app, we need also to consider non-functional requirements, such as performance and security, both of those should be covered via:
    1. API performance tests
    2. API Security testing
    3. UI component performance testing
4. Visual regression tests should be also added because of the visual nature of the app itself.

This testing stack would ensure that no regression is introduced, unfortunately manual testing is not to be scrambled, exploratory manual testing is main tool that drives discovery of new bugs.

Following is the structure of granularity of testing approach, from top to bottom:
- Manual testing:
	- exploratory based testing.
- Automated testing:
	- System Integration:
		- E2E tests.
	- API:
		- Functional integration tests
		- Performance tests
		- Security tests
	- UI components:
		- Integration tests
		- Performance tests
	- Codebase:
		- static code analysis



As for e2E test scenarios I would consider going through photo editor MVP which is : creation of photo book using uploaded photos and proceeding to basket.
I would exclude login, registration and purchase from its scope since it does not pertain to photo editor itself.


Items that I have found during this task that could be added/or improved:

 - [ ] visual regression 
 - [ ] test setup via api call to reduce test run
       time. 
 - [ ] generate low quality images to reduce run time 
 - [ ] adding linter
 - [ ] tagging tests to have flexible test run options 
 - [ ] discussion about element test id strategy

