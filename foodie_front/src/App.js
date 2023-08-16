import './App.css';
import LoginPage from './Components/LoginPage/LoginPage';
import Home from './Components/HomePage/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Components/ProfilePage/Profile';
import UserRegistration from './Components/ProfilePage/Register';
import UserProfile from './Components/UserProfile/UserProfile';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={
            (localStorage.getItem("uid") == undefined || localStorage.getItem("uid") == null) ?
              <LoginPage /> : <Home />
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />

          {/*
          <Route path="/users" component={UserList} />
          <Route path="/about" component={About} /> */}
          {/* <Route component={NotFound} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
