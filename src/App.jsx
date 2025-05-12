import { Provider } from 'react-redux'
import { store } from './store'
import MealPlanForm from './components/MealPlanForm'
import MealPlanDisplay from './components/MealPlanDisplay'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div>
        <header>
          <div>
            <h1>AI Meal Plan Generator</h1>
          </div>
        </header>
        <main>
          <MealPlanForm />
          <MealPlanDisplay />
        </main>
      </div>
    </Provider>
  )
}

export default App
