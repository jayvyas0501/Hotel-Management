import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Componets/Footer";
import Navbar from "./Componets/Navbar";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Login/Login";
import Register from "./Routes/Login/Register";
import Book from "./Routes/Bookebar/Book";
import Roombooking from "./Routes/RoomBooking/Roombooking";
import Eventbooking from "./Routes/Eventbooking/Eventbooking";
import About from "./Routes/About/About";
import Single from "./Routes/Rooms/Single";
import Double from "./Routes/Rooms/Double";
import Profile from "./Routes/Profile/Profile";

import { AuthProvider } from "./context/AuthContext"; // ✅ Auth context wrapper
import ProtectedRoute from "./Routes/ProtectedRoute"; // ✅ Secure routes
import Manager from "./Routes/Manager/Manager";
import RoomCreate from "./Routes/Manager/Createroom/RoomCreate";
import Createroom from "./Routes/Manager/Createroom/Createroom";
import Updateroom from "./Routes/Manager/Createroom/Updateroom";
import Roomstatus from "./Routes/Manager/Createroom/Roomsatus";
import EventManagementPage from "./Routes/Manager/Createevent/Eventlist";
import EventCreate from "./Routes/Manager/Createevent/Eventcreate";
import UpdateEvent from "./Routes/Manager/Createevent/Eventupdate";
import Eventstatus from "./Routes/Manager/Createevent/Eventstatus";
import AdminPanel from "./Routes/Admin/Adminpanel";
import Managerall from "./Routes/Admin/viewmanager/Managerall";
import Manageraprover from "./Routes/Admin/viewmanager/Manageraprover";
import Managerdelet from "./Routes/Admin/viewmanager/Managerdelet";
import Suite from "./Routes/Rooms/Delux";
import Evntbookingpage from "./Routes/Eventbooking/Eventpage/Evntbookingpage";

// 404 Page
const NotFound = () => (
  <div className="text-center py-20 text-2xl text-gray-600">
    <h2 className="text-6xl"><span className="text-red-700">404</span> Page Not Found.</h2>
  </div>
);

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <AuthProvider>
          <Navbar /> {/* Navbar with dynamic display based on auth */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking" element={<Book />} />
            <Route path="/roombooking" element={<Roombooking />} />
            <Route path="/eventbooking" element={<Eventbooking />} />
            <Route path="/about" element={<About />} />
            <Route path="/singleroom" element={<Single />} />
            <Route path="/doubleroom" element={<Double />} />
            <Route path="/delux" element={<Suite/>} />
            <Route path="/eventbooking/:id" element={<Evntbookingpage/>} />
            <Route path="/manager" element={<ProtectedRoute><Manager /></ProtectedRoute>} /> {/* Protect Manager route */}
            <Route path="/roomcreate" element={<ProtectedRoute><RoomCreate /></ProtectedRoute>} />
            <Route path="/createroom" element={<ProtectedRoute><Createroom /></ProtectedRoute>} />
            <Route path="/updateroom" element={<ProtectedRoute><Updateroom /></ProtectedRoute>} />
            <Route path="/roomstatus" element={<ProtectedRoute><Roomstatus /></ProtectedRoute>} />
            <Route path="/eventlist" element={<ProtectedRoute><EventManagementPage/></ProtectedRoute>}/>
            <Route path="/eventcreat" element={<ProtectedRoute><EventCreate/></ProtectedRoute>}/>
            <Route path="/updateevent" element={<ProtectedRoute><UpdateEvent/></ProtectedRoute>}/>
            <Route path="/eventstatus" element={<ProtectedRoute><Eventstatus/></ProtectedRoute>}/>
            <Route path="/adminpanel" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>}/>{/* Protected Admin route */}
            <Route path="/managerall" element={<ProtectedRoute><Managerall/></ProtectedRoute>}/>
            <Route path="/manageraprover" element={<ProtectedRoute><Manageraprover/></ProtectedRoute>}/>
            <Route path="/managerdelete" element={<ProtectedRoute><Managerdelet/></ProtectedRoute>}/>
            



            {/* Protected Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 404 Route for invalid URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
