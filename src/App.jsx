import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MealPlanForm from './components/MealPlanForm'
import MealPlanDisplay from './components/MealPlanDisplay'
import PrintView from './components/PrintView'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/print" element={<PrintView />} />
          <Route path="/" element={
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
          } />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
