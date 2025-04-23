# Functional Design Document
A web application where men, women & misc people can interact with a storytelling game based around a real social problem, on how people feel, based of social media & influencers.

## Functional requirements
1. A user opens up the application.
2. A user can fill in his name and his gender.
3. A user needs to be able to interact with three buttons for answers a user can give a response with the button.
4. A user gets a new question/answer after he interacted with the answer

## Non-functional requirements
1. Performance
 - The application should load the initial screen within 2 seconds on a standard broadband connection. 
 - Subsequent questions and responses should load in under 1 second.

2. Scalability
 - The system must support at least 1000 concurrent users without performance degradation. 
 - Backend APIs must be optimized for concurrent requests using caching and efficient queries.

3. Usability
- The website must be easy to navigate
- The webpage should be responsive

4. Security
- It saves nothing of the user
- You don't log in

5. Functionality
- Every answer you give sends a post to the backend
- In the backend it looks if its answer 1, 2 or 3, and then it gives another 3 answers back it depend on what you said.
- 



