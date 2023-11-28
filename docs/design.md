BookFinder App

Overview
BookFinder is a Vue.js web application that enables users to search and view books utilizing the Google Books API. It combines a user-friendly interface with efficient state management and API interactions.

The current application design takes advantage of Vue 3's latest features and patterns to offer a scalable and maintainable solution. Each component is built with a single-responsibility principle in mind, ensuring that they remain modular, reusable, and easy to understand.

Key Features
• Book search functionality with real-time results.
• Detailed book information displayed in a modal.
• Responsive design for various screen sizes.

Architecture

1. Single-Page Application (SPA):
   • Framework: Vue.js 3
   • State Management: Pinia
   • Routing: Vue Router
   • API Communication: Axios with Global Error Handling
   • Unit Testing: Vitest and Vue Test Utils

2. Directory Structure :
   • /src/components : Reusable Vue components.
   • /src/views: Page components representing different views.
   • /src/router: Configuration of Vue Router.
   • /src/stores: Stores for API innteraction and state management.
   • /src/assets: Static resources like images and styles.
   • /src/shared: Shared configurations like Axios interceptors and utility functions.
   • /tests: Unit tests

3. Key Components and Functionalities:
   • SearchBar.vue: Enables users to input search queries.
   • BookDetails.vue: Displays a list of books and a modal for detailed views.
   • Modal.vue: A reusable component for modal dialogs.
   • HomeView.vue: The main page view that aggregates various components

4. State Management:
   • The book-data store in /stores/book-data manages:
   i. Fetching book data via apiCalls.ts.
   ii. Holding state related to books, loading indicators, and selected book details.

5. Testing:
   • Unit tests written using Vitest and Vue Test Utils.
   • Mocking of external dependencies like Pinia stores for isolated component testing.

Best Practices
• Maintain a clean separation between UI components, state management, and API logic.
• Ensure that components are reusable and well-encapsulated.
• Write comprehensive unit tests for all parts of the application to ensure reliability.
• Document features and code changes to facilitate easy understanding and collaboration.
