import { BrowserRouter, Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Body from "./pages/Body"
import Profile from "./pages/profile/Profile"
import Signup from "./pages/Signup"
import { Provider } from "react-redux"
import store from "./store/store"
import Feed from "./pages/feed/Feed"
import EditProfile from "./pages/profile/EditProfile"
import Connections from "./pages/Connections"
import Requests from "./pages/Requests"


function App() {
  return (
    <>
    <Provider store={store}>
   <BrowserRouter basename="/">
   <Routes >
    <Route path="/" element={<Body/>}>
     <Route index element={<Feed />} />  
   <Route path="/profile" element={<Profile/>}/>
   <Route path="/editProfile" element={<EditProfile/>}/>
   <Route path="/connections" element={<Connections/>}/>
   <Route path="/requests" element={<Requests/>}/>
   <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
   </Route>
    
   </Routes>
   </BrowserRouter>
   </Provider> 
     </>
  )
}

export default App
