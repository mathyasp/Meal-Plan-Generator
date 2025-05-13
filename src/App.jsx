import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MealPlanForm from './components/MealPlanForm'
import MealPlanDisplay from './components/MealPlanDisplay'
import PrintView from './components/PrintView'
import SavedPlans from './components/SavedPlans'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/print" element={<PrintView />} />
          <Route path="/saved" element={<SavedPlans />} />
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold text-gray-900">AI Meal Plan Generator</h1>
                </div>
              </header>
              <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                  <MealPlanForm />
                  <MealPlanDisplay />
                </div>
              </main>
            </div>
          } />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
