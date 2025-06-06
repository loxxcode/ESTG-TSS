
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Campus from "./pages/Campus";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Announcement from "./pages/Announcement";
import NotFound from "./pages/NotFound";

import AdminForm from "./pages/Auth/AdminForm";
import User from "./pages/Auth/User";
import ContentCreatorRegistration from "./pages/Auth/ContentCreatorRegistration";
import ForgetPassword from "./pages/Auth/forgetPassword";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Adminpanel from "./pages/Adminpanel";

import Update from './pages/Adminpanel/Adminpages/updates/update';
import Event from './pages/Adminpanel/Adminpages/event';
import Logout from './pages/Adminpanel/Adminpages/usermagement';
import CreateEvent from './pages/Adminpanel/Adminpages/Contents/event';
import CreateUpdate from './pages/Adminpanel/Adminpages/Contents/update';
import UpdateForm from './pages/Adminpanel/Adminpages/updates/createupdate';
import EditEventForm from './pages/Adminpanel/Adminpages/Contents/createupdate';
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToastContainer autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <BrowserRouter>
          <Routes>
            <Route path="/update" element={<Update />} />
            <Route path="/adminevent" element={<Event />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Index />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/createevent" element={<CreateEvent />} />
            <Route path="/createupdate" element={<CreateUpdate />} />

            <Route path="/news" element={<News />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/admission" element={<Campus />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminForm />} />
            <Route path="/events" element={<News />} />
            <Route path="/admission" element={<Campus />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminForm />} />
            <Route path="/adminpanel" element={<Adminpanel />} />
            <Route path="/admin"  element={<AdminForm />} />
            <Route path="/adminpanel"  element={<Adminpanel />} />
            
            <Route path="/user" element={<User />} />
            <Route path="/contentcreatorregistration" element={<ContentCreatorRegistration />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/update/:id" element={<UpdateForm />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/editeevent/:id" element={<EditEventForm />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
