
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import {RequireToken} from './components/Auth.js'
 
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Etudiant from "./components/etudiant";
import Profile from "./components/profile";
import AddEtudiant from "./components/addetudiant";
import EditEtudiant from './components/editetudiant'
 
function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
               
              <Route path='/' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }>
                  <Route path='' element={<Home />}></Route>
                  <Route path='/etudiant' element={<Etudiant />}></Route>
                  <Route path='/profile' element={<Profile />}></Route>
                  <Route path='/create' element={<AddEtudiant />}></Route>
                  <Route path='/etudiantedit/:id' element={<EditEtudiant />}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
   
export default App;