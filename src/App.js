import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import ProductDetail from "./pages/ProductDetail";
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Home /> */}
        <ProductDetail />
      </div>
    </Router>
  );
}

export default App;
