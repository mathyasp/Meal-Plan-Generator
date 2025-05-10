import './App.css'
import MealPlanForm from './components/MealPlanForm'
import DebugPanel from './components/DebugPanel'

function App() {
  return (
    <div>
      <h1>Meal Plan Generator</h1>
      <p>Generate personalized meal plans based on your ingredients and preferences</p>
      
      <MealPlanForm />
      
      <div>
        <h2>Your Meal Plan</h2>
        <p>Your generated meal plan will appear here</p>
      </div>

      <DebugPanel />
    </div>
  )
}

export default App;
