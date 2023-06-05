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

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.homepage.isLoading);
  const [favIcon, setFavIcon] = useState("");
  const [navbarMenu, setNavbarMenu] = useState();
  const [conByCat, setConByCat] = useState();
  const [busSettings, setBusSettings] = useState();

  const getBusinessSettingsData = async () => {
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

                <Route path="/dashboard/products" element={<ProductsPage />} />

                <Route path="/product/:id" element={<ProductDetails />} />
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
