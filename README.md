# Meal Plan Generator

An AI-powered meal planning application that helps users generate personalized meal plans based on their available ingredients, preferences, and desired themes.

## Project Description

This application allows users to:
- Input their available ingredients
- Specify dietary preferences
- Choose a cuisine theme
- Set a timeline (1-7 days)
- Generate a personalized meal plan

## Goals

- Create a user-friendly interface for meal planning
- Integrate with AI for intelligent meal suggestions
- Provide flexible and customizable meal plans
- Help users make the most of their available ingredients

## AI Integration

This project uses AI in the following ways:
- LLM integration for generating meal plans based on user inputs

## How I used AI

I used AI tools to help me build 2 major aspects of the app:
- `mealPlanSlice.js` 
  - to better understand redux and how to build slices/thunks
  - to polish my prompts to prevent bad AI outputs (particularly my ingredients)
- `tailwind` implementation 
  - mostly just for inspiration since I lack aesthetic creativity

## Learning Journey

While building this project, I learned several key concepts:
- How to use Redux for state management
- Working with async operations using Redux Thunk
- Prompt engineering for app usage (generating meal plans)

## Future Improvements

Some areas I'd like to improve:
- Move API calls to a separate file
- Add more error handling for API failures
- Implement loading states for better UX
- Add the ability to edit saved meal plans
- Add more customization options for meal preferences

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Tech Stack

- React
- Redux Toolkit
- Vite
- External API integration (to be implemented)
