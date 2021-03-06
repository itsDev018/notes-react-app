import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>

      <Navigation/>

      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/create-user" component={CreateUser} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/create-note" component={CreateNote} />
      </div>
    </Router>
  );
}

export default App;
