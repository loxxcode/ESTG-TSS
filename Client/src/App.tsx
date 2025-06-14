import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Administrative from "./pages/Administrative";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Updates from "./pages/Updates";
import NotFound from "./pages/NotFound";

import AdminForm from "./pages/Auth/AdminForm";
import User from "./pages/Auth/User";
import ContentCreatorRegistration from "./pages/Auth/ContentCreatorRegistration";
import ForgetPassword from "./pages/Auth/forgetPassword";
import Events from "./pages/Events";
import EventsDetail from "./pages/EventsDetail";
import Adminpanel from "./pages/Adminpanel";

import Update from './pages/Adminpanel/Adminpages/updates/update';
import Event from './pages/Adminpanel/Adminpages/Events/event';
import Logout from './pages/Adminpanel/Adminpages/Contents/ContentCreater';
import CreateEvent from './pages/Adminpanel/Adminpages/Events/CreateEvent';
import CreateUpdate from './pages/Adminpanel/Adminpages/Contents/update';
import UpdateForm from './pages/Adminpanel/Adminpages/updates/createupdate';
import EditEventForm from './pages/Adminpanel/Adminpages/Contents/createupdate';
import { ToastContainer } from 'react-toastify';
// import { Helmet } from "react-helmet";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToastContainer autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <BrowserRouter>
          {/* <Helmet>
            <title key="default-title">ESTG-TSS | School of Technology and Science</title>
            <meta key="description" name="description" content="ESTG-TSS is a leading educational institution offering programs in technology and science. Explore our school, programs, events, and updates." />
            <meta key="og:title" property="og:title" content="ESTG-TSS | School of Technology and Science" />
            <meta key="og:description" property="og:description" content="Discover ESTG-TSS, a premier school for technology and science education. Stay informed about our programs, events, and community." />
            <meta key="og:image" property="og:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:title" name="twitter:title" content="ESTG-TSS | School of Technology and Science" />
            <meta key="twitter:description" name="twitter:description" content="ESTG-TSS is a top institution for technology and science. Learn more about our school, programs, and events." />
            <meta key="twitter:image" name="twitter:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />
          </Helmet> */}
          <Routes>
            <Route path="/update" element={<Update />} />
            <Route path="/adminevent" element={<Event />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Index />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/createevent" element={<CreateEvent />} />
            <Route path="/createupdate" element={<CreateUpdate />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Updates" element={<Updates />} />
            <Route path="/administrative" element={<Administrative />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminForm />} />
            <Route path="/events" element={<Events />} />
            <Route path="/administrative" element={<Administrative />} />
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
            <Route path="/Events/:id" element={<EventsDetail />} />
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
