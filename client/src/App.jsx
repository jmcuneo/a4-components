
import {Route, Routes,BrowserRouter} from 'react-router-dom'
import './App.css'
import {LoginPage} from "./pages/Login.jsx"
import {DashboardPage} from "./pages/Dashboard.jsx"
import {BillingSystemPage} from "./pages/BillingSystem.jsx"
import {ErrorPage} from "./pages/Error.jsx"
import {UserPage} from "./pages/User.jsx"
import {InstructionsPage} from "./pages/instructions.jsx"
import {Logout} from "./components/Logout.jsx";
window.ENVIRONMENT = {api:'https://a4-saitejasunku.onrender.com'}
function App() {

  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginPage/>}/>
                  <Route path="/dashboard" element={<DashboardPage/>}/>
                  <Route
                      path="/billingsystem"
                      element={<BillingSystemPage>/</BillingSystemPage>}
                  />
                  <Route path="/error" element={<ErrorPage/>}/>
                  <Route path="/user_info" element={<UserPage/>}/>
                  <Route path="/instructions" element={<InstructionsPage/>}/>
                  <Route path="/login" element={<InstructionsPage/>}/>
                  <Route path="/logout" element={<Logout/>}/>
              </Routes>
          </BrowserRouter>
      </div>

  )
}

export default App
