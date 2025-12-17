import { BrowserRouter, Routes,Route } from "react-router-dom"
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Body from "./pages/Body"
import store from "./store/store"
// import Feed from "./pages/feed/Feed"
// import EditProfile from "./pages/profile/EditProfile"
// import Connections from "./pages/Connections"
// import Requests from "./pages/Requests";
// import Login from "./pages/Login"

// import Profile from "./pages/profile/Profile"
// import Signup from "./pages/Signup";
import { lazy, Suspense } from "react";

const Feed =lazy(()=>import("./pages/feed/Feed"));
const EditProfile =lazy(()=>import("./pages/profile/EditProfile"));
const Connections =lazy(()=>import("./pages/Connections"));
const Requests =lazy(()=>import("./pages/Requests"));
const Login =lazy(()=>import("./pages/Login"));
const Profile =lazy(()=>import("./pages/profile/Profile"));
const Signup =lazy(()=>import("./pages/Signup"));



function App() {
  return (
    <>
    <Provider store={store}>
   <BrowserRouter basename="/">
   <Suspense
  fallback={
<div className="text-black text-[2.5rem] min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-500 via-red-500 to-orange-500">
      loading....
    </div>}>

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
    </Suspense>
   </BrowserRouter>
   </Provider> 
   <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
     </>
  )
}

export default App
