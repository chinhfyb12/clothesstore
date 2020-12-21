import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import RouterURL from "./components/RouterURL";

function App() {
  return (
    <Router>
        <Navbar />
          <RouterURL />
        <Footer />
    </Router>
  );
}

export default App;
