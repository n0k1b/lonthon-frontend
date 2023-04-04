import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Navbar from "./components/nav/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/nav/Footer";
import LiteraturePage from "./pages/LiteraturePage";
import { baseURL } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "./redux/homepage-slice";
import { Helmet } from "react-helmet";
import ScrollToTop from "./ScrollToTop";
import DashboardPage from "./pages/DashboardPage";
import EditProfile from "./pages/EditProfile";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.homepage.isLoading);
  const [favIcon, setFavIcon] = useState("");

  const getBusinessSettingsData = async () => {
    dispatch(homepageActions.setIsLoading(true));
    const response = await fetch(`${baseURL}/business-settings`);

    if (!response.ok) return;

    const data = await response.json();

    console.log(data.data[0]);
    dispatch(homepageActions.setHomepageData(data.data[0]));
    dispatch(homepageActions.setIsLoading(false));
    setFavIcon(data.data[0].favicon);
  };

  useEffect(() => {
    getBusinessSettingsData();
  }, []);

  return (
    <Router>
      <div className={styles.container}>
        <Navbar menuItems={NavbarMenuItems} />

        {!isLoading && (
          <>
            <Helmet>
              <link rel="icon" href={favIcon} />
            </Helmet>
            <ScrollToTop>
              <Routes>
                <Route exact path="/" element={<HomePage />} />

                <Route path="/literature" element={<LiteraturePage />} />

                <Route exact path="/dashboard" element={<DashboardPage />} />

                <Route
                  path="/dashboard/edit_profile"
                  element={<EditProfile />}
                />
              </Routes>
            </ScrollToTop>

            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

const NavbarMenuItems = [
  { label: "HOME", url: "/" },
  {
    label: "LITERATUE",
    url: "/literature",
    submenu: ["Novel", "Poems", "Others"],
  },
  {
    label: "MEDIA CONTENT",
    url: "/media",
    submenu: ["Script", "Lyrics", "Documentary", "Short Films", "TVC"],
  },
  {
    label: "AUDIO E-BOOK",
    url: "/audio",
    submenu: ["Novel", "Poems", "Others"],
  },
  { label: "OTHERS", url: "/others" },
  { label: "PROMOTIONS", url: "/promotions" },
  { label: "DASHBOARD", url: "/dashboard" },
  { label: "LOGIN", url: "/login" },
  { label: "SIGNUP", url: "/signup", isAction: true },
];

export default App;
