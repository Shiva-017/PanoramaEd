[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/OuSBNpwM)

# Global Education Helper Platform (PanoramaEd)
 
## Project Overview
 
Welcome to the Global Education Helper Platform! This platform is designed to empower students worldwide in their pursuit of higher education. Whether you're exploring universities, researching programs, seeking admission advice, or sharing your educational journey, this platform is your go-to destination.
 
## Key Entities

### 1. Student

- **Fields:**
  - `id`: Unique identifier for the student.
  - `name`: Full name of the student.
  - `degree`: Current academic degree of the student.
  - `university`: University currently associated with the student.
  - `score`: Academic score or GPA.
  - `nationality`: Nationality of the student.
  - `experience`: Relevant work or academic experience.
  - `programsShortlisted`: Array of program IDs that the student has shortlisted.
  - `programsApplied`: Array of program IDs that the student has applied to.

### 2. Consultant

- **Fields:**
  - `id`: Unique identifier for the consultant.
  - `name`: Full name of the consultant.
  - `rating`: Rating assigned to the consultant based on student interactions.

### 3. Chat

- **Fields:**
  - `id`: Unique identifier generated as a combination of student and consultant IDs.
  - `messages`: Array of messages within the chat.

### 4. University Admin

- **Fields:**
  - `id`: Unique identifier for the university administrator.
  - `university`: University associated with the administrator.

### 5. Program

- **Fields:**
  - `id`: Unique identifier for the program.
  - `fee`: Tuition fee for the program.
  - `ranking`: Ranking of the program.
  - `university`: University offering the program.
  - `course`: Associated course for the program.
  - `requirements`: Admission requirements for the program.

### 6. Post

- **Fields:**
  - `id`: Unique identifier for the post.
  - `status`: Current status of the post.
  - `message`: Content of the post.
  - `votes`: Number of votes received.
  - `comments`: Array of comments on the post.
  - `postedBy`: ID of the student who posted the content.

### 7. Intake

- **Fields:**
  - `year`: Academic year associated with the intake.
  - `semester`: Semester associated with the intake.

### 8. Course

- **Fields:**
  - `name`: Name of the course.
  - `details`: Additional details about the course.

## Features
 
### 1. University Research and Program Exploration
- Browse and research information about universities globally.
- Explore detailed program descriptions, fees, and admission requirements.
 
### 2. Admission Chances Calculator
- Evaluate your chances of getting admitted to a particular university based on your profile.
- Gain insights into admission requirements and program competitiveness.
 
### 3. Interactive Student Feed
- Share your experiences, insights, and questions in a dynamic student feed.
- Upvote and engage with posts from fellow students.
 
### 4. Advanced Filtering Options
- Filter universities based on courses, locations, and other criteria.
- Connect with students who share similar academic interests.
 
### 5. Consultation with Experienced Consultants
- Connect with experienced consultants for personalized advice.
- Engage in one-on-one chats to address your academic queries.
 
### 6. University Admin Video Content
- Access exclusive video content posted by university administrators.
- Gain insights into programs, campus life, and more.

## POST API:

- implemented REST API calls for the following:

- 1. Show all the posts of students
- 2. Save new post of a student
- 3. remove a post by ID


 
