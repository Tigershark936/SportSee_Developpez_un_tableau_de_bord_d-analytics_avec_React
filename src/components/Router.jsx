import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Community from "../pages/Community/Community";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter = () => {
    const id = window.location
    console.log('id', id);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="profile/:userId" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="community" element={<Community />} />
                    <Route path="*" element={<NotFound/> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter