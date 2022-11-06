import './App.css';
import TextEditor from "./TextEditor"
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import { redirect } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />}></Route>
      <Route path="/documents/:id" element={<TextEditor />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
