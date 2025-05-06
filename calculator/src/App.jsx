import { useState } from 'react'
import Navigation from './components/common/Navigation'
import RbbBumnCalculator from './components/calculators/RbbBumnCalculator'
import './App.css'

function App() {
  const [selectedCalculator, setSelectedCalculator] = useState(null)

  return (
    <div className="app-container">
      <header>
        <h1>Multi-Purpose Calculator</h1>
      </header>
      
      <main>
        <Navigation onSelectCalculator={setSelectedCalculator} />
        <div className="calculator-display">
          {selectedCalculator === 'rbb-bumn' ? (
            <RbbBumnCalculator />
          ) : (
            <div className="welcome-message">
              <h2>Welcome to Multi-Purpose Calculator</h2>
              <p>Please select a calculator type from the navigation menu</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
