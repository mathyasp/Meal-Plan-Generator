import './App.css'
import MealPlanForm from './components/MealPlanForm'
import MealPlanDisplay from './components/MealPlanDisplay'
import DebugPanel from './components/DebugPanel'

function App() {
  return (
    <div>
      <h1>Meal Plan Generator</h1>
      <p>Generate personalized meal plans based on your ingredients and preferences</p>
      
      <MealPlanForm />
      <MealPlanDisplay />
      <DebugPanel />
    </div>
  )
}

export default App;
