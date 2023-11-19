import './App.css';
import Welcome from './Components/Welcome';
import Home from './Pages/Home';
import Notification from './Pages/Notification.jsx';
import Profile from './Pages/Profile.jsx';
import { Route, Routes, BrowserRouter,createRoutesFromElements } from "react-router-dom";
import Post from './Pages/Post';
import { Store } from './Redux/Store';
import { Provider } from "react-redux";
import Login from './Components/Login';
import Messages from './Pages/Messages.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SocketContext,socket} from './Socket.js'
function App() {

  return (
    <SocketContext.Provider value={socket}>
      <Provider store={Store}>
        <ToastContainer/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="home/:id" element={<Home/>}/>
            <Route path="post/:id" element={<Post/>}/>
            <Route path="welcome" element={<Welcome/>}/>
            <Route path="notification" element={<Notification/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="profile/:id" element={<Profile/>}/>
            <Route path="messages"element ={<Messages/>} />
            {/* <Route path="messages/:id"element ={<Messages/>} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </SocketContext.Provider>
    
  );
}

export default App;
