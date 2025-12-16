import { BrowserRouter, Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Body from "./pages/Body"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import { Provider } from "react-redux"
import store from "./store/store"


function App() {
  return (
    <>
    <Provider store={store}>
   <BrowserRouter basename="/">
   <Routes >
    <Route path="/" element={<Body/>}>
   <Route path="/profile" element={<Profile/>}/>
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
