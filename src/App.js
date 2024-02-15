import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Navbar from "./components/nav/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/nav/Footer";
import LiteraturePage from "./pages/LiteraturePage";
import { baseURL } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "./redux/homepage-slice";
import { Helmet } from "react-helmet";
import ScrollToTop from "./ScrollToTop";
import DashboardPage from "./pages/DashboardPage";
import EditProfile from "./pages/EditProfile";
import ProductDetails from "./pages/ProductDetails";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import WithdrawPage from "./pages/WithdrawPage";
import ProductsPage from "./pages/ProductsPage";
import PurchasePage from "./pages/PurchasePage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.homepage.isLoading);
  const [favIcon, setFavIcon] = useState("");
  const [navbarMenu, setNavbarMenu] = useState();

  const getBusinessSettingsData = async () => {
    dispatch(homepageActions.setIsLoading(true));
    const response = await fetch(`${baseURL}/business-settings`);

    if (!response.ok) return;

    const data = await response.json();

    dispatch(homepageActions.setHomepageData(data.data[0]));
    setFavIcon(data.data[0].favicon);
    getContentByCategory();

    const token = localStorage.getItem("tokenLonthon");
    const userData = localStorage.getItem("userDataLonthon");

    if (token && userData) {
      dispatch(homepageActions.setIsLoggedIn(true));
      dispatch(homepageActions.setToken(token));
      dispatch(homepageActions.setUserData(userData));
    }
  };

  const getContentByCategory = async () => {
    dispatch(homepageActions.setIsLoading(true));
    const response = await fetch(`${baseURL}/content-by-category`);

    if (!response.ok) return;

    const data = await response.json();

    dispatch(homepageActions.setContentByCat(data.data));
    dispatch(homepageActions.setIsLoading(false));
  };

  const getNavbarMenu = async () => {
    const response = await fetch(`${baseURL}/category`);

    if (!response.ok) return;

    const data = await response.json();

    const NavbarMenuItems = [
      { label: "HOME", url: "/" },
      ...data.data,
      { label: "OTHERS", id: null, url: "others" },
      { label: "PROMOTIONS", id: null, url: "promotions" },
      { label: "DASHBOARD", id: null, url: "dashboard" },
    ];

    setNavbarMenu(NavbarMenuItems);
    dispatch(homepageActions.setIsLoading(false));
  };

  useEffect(() => {
    getBusinessSettingsData();
    getNavbarMenu();
  }, []);

  return (
    <Router>
      <div className={styles.container}>
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
            <Navbar menuItems={navbarMenu} />
            <Helmet>
              <link rel="icon" href={favIcon} />
            </Helmet>
            <ScrollToTop>
              <Routes>
                <Route exact path="/" element={<HomePage />} />

                <Route exact path="/dashboard" element={<DashboardPage />} />

                <Route
                  path="/dashboard/edit_profile"
                  element={<EditProfile />}
                />

                <Route path="/dashboard/contents" element={<ProductsPage />} />

                <Route path="/dashboard/purchase" element={<PurchasePage />} />

                <Route path="/dashboard/withdraw" element={<WithdrawPage />} />

                <Route path="/content/:id" element={<ProductDetails />} />

                {/* <Route path="/content/edit/:id" element={<ProductDetails />} /> */}

                <Route path="/login" element={<LoginPage />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                  path="/contents/:cat/:subCat"
                  element={<LiteraturePage />}
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

export default App;
