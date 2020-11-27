import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from "./components/Counter";
import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom';
import About from "./components/About";
import Gallery from "./components/Gallery";
import HitDetails from "./components/HitDetails";

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand navbar-brand m-2">
            <ul className="navbar-nav">
                <li>
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li>
                    <Link className="nav-link"  to="/counter">Counter</Link>
                </li>
                <li>
                    <Link className="nav-link"  to="/about">About</Link>
                </li>
                <li>
                    <Link className="nav-link"  to="/gallery">Gallery</Link>
                </li>
            </ul>
        </nav>
        <div className="m-5">
            <Switch>s
                <Route path="/home" ></Route>
                <Route path="/counter" component={Counter}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/gallery" component={Gallery}></Route>
                <Route path="/hitDetails/:id" component={HitDetails}></Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
