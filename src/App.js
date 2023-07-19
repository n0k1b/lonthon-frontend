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
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.homepage.isLoading);
  const [favIcon, setFavIcon] = useState("");
  const [navbarMenu, setNavbarMenu] = useState();
  const [conByCat, setConByCat] = useState();
  const [busSettings, setBusSettings] = useState();

  const getBusinessSettingsData = async () => {
    console.log("SHOULD PRINT ONLY ONCE");
    dispatch(homepageActions.setIsLoading(true));
    const response = await fetch(`${baseURL}/business-settings`);

    if (!response.ok) return;

    const data = await response.json();

    console.log(data.data[0]);
    dispatch(homepageActions.setHomepageData(data.data[0]));
    // dispatch(homepageActions.setIsLoading(false));
    setFavIcon(data.data[0].favicon);
    setBusSettings(true);
    getContentByCategory();
    // getNavbarMenu();

    const token = localStorage.getItem("tokenLonthon");
    const userData = localStorage.getItem("userDataLonthon");

    if (token && userData) {
      dispatch(homepageActions.setIsLoggedIn(true));
      dispatch(homepageActions.setToken(token));
      dispatch(homepageActions.setUserData(userData));
      console.log("logged in");
    }
  };

  const getContentByCategory = async () => {
    dispatch(homepageActions.setIsLoading(true));
    const response = await fetch(`${baseURL}/content-by-category`);
    console.log("res => ", response);

    if (!response.ok) return;

    const data = await response.json();

    console.log(data.data);
    dispatch(homepageActions.setContentByCat(data.data));
    dispatch(homepageActions.setIsLoading(false));
    setConByCat(true);
  };

  const getNavbarMenu = async () => {
    const response = await fetch(`${baseURL}/category`);

    if (!response.ok) return;

    const data = await response.json();

    console.log(data.data);
    setNavbarMenu(data.data);
    dispatch(homepageActions.setIsLoading(false));
  };

  useEffect(() => {
    // dispatch(homepageActions.setIsLoading(true));
    getBusinessSettingsData();
  }, []);

  // useEffect(() => {
  //   if (navbarMenu && conByCat && busSettings)
  //     dispatch(homepageActions.setIsLoading(false));
  // }, [navbarMenu, conByCat, busSettings]);

  // console.log([navbarMenu, NavbarMenuItems], "HHHHH");

  return (
    <Router>
      <div className={styles.container}>
        {/* <Navbar menuItems={navbarMenu} /> */}
        <Navbar menuItems={NavbarMenuItems} />

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        )}

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

                <Route path="/dashboard/contents" element={<ProductsPage />} />

                <Route path="/content/:id" element={<ProductDetails />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/signup" element={<Signup />} />
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
  // { label: "LOGIN", url: "/login" },
  // { label: "SIGNUP", url: "/signup", isAction: true },
];

export default App;
