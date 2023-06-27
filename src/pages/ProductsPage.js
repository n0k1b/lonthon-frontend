import React, { useEffect, useState, useRef } from "react";
import styles from "./DashboardPage.module.css";
import classes from "./ProductsPage.module.css";
import dp from "../image/dp.jpg";
import { Link, Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import GreyBtn from "../components/UI/GreyBtn";
import addBtn from "../image/addBtn.png";
import addBtn2 from "../image/addBtn2.png";
import { BsImage, BsFiletypePdf, BsCameraVideoFill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { baseURL } from "../api";

import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { homepageActions } from "../redux/homepage-slice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductsPage = () => {
  const isLoading = useSelector((state) => state.homepage.isLoading);
  const isLoggedIn = useSelector((state) => state.homepage.isLoggedIn);
  const token = useSelector((state) => state.homepage.token);
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [upload, setUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [addImg, setAddImg] = useState(false);

  const [pdfFile, setPdfFile] = useState(null);
  const [thumbImg, setThumbImg] = useState(null);
  const [banImg, setBanImg] = useState(null);
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [author, setAuthor] = useState([]);

  const [num, setNum] = useState(1);
  const [authorNum, setAuthorNum] = useState([1]);

  const [addPdf, setAddPdf] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [addText, setAddText] = useState(false);
  const [addVideo, setAddVideo] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryData, setSubCategoryData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [formFillUpError, setFormFillUpError] = useState(false);
  const [submittedPopUp, setSubmittedPopUp] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [desError, setDesError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    if (dashboardData) {
      const result = dashboardData.contents.filter((data) =>
        data.title.toLocaleLowerCase().match(search.toLocaleLowerCase())
      );
      setData(result);
    }
  }, [search]);

  useEffect(() => {
    if (image) {
      setAddImg(true);
      if (image.length === 0) {
        setImage(null);
      }
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (!image) {
          setImage([reader.result]);
        } else {
          setImage([...image, reader.result]);
        }
      };
    } catch {
      console.log("Not selected");
    }
  };

  const handleImageChangeThumb = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbImg(reader.result);
      };
    } catch {
      console.log("Not selected");
    }
  };

  const handleImageChangeBan = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBanImg(reader.result);
      };
    } catch {
      console.log("Not selected");
    }
  };

  const authorHandler = () => {
    setNum(num + 1);
    setAuthorNum([...authorNum, num + 1]);
  };

  const pdfUploadSec = () => {
    clearContentHandler();
    setAddPdf(true);
    setAddImage(false);
    setAddText(false);
    setAddVideo(false);
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const imageUploadSec = () => {
    clearContentHandler();
    setAddPdf(false);
    setAddImage(true);
    setAddText(false);
    setAddVideo(false);
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const textUploadSec = () => {
    clearContentHandler();
    setAddPdf(false);
    setAddImage(false);
    setAddText(true);
    setAddVideo(false);
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const videoUploadSec = () => {
    clearContentHandler();
    setAddPdf(false);
    setAddImage(false);
    setAddText(false);
    setAddVideo(true);
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const columns = [
    {
      name: "Content ID",
      selector: (row) => row.id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : 0),
    },
    {
      name: "Author",
      selector: (row) => row.author,
    },
    {
      name: "",
      cell: (row) => (
        <Link to={`/content/${row.id}`}>
          <GreyBtn>Details</GreyBtn>
        </Link>
      ),
    },
  ];

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setTextContent(editorRef.current.getContent());
    }
    postDataHandler();
  };

  const handlePDFInputChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      // const base64Code = reader.result.split(",")[1];
      // setPdfFile(base64Code);
      setPdfFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadHandler = () => {
    categoryFetch();
    setUpload(true);
  };

  const handleCatSelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCatSelect = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleGenreSelect = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFormFillUpError(false);
  };

  const submitHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmittedPopUp(false);
  };

  //Data Fetch
  const categoryFetch = async () => {
    const response = await fetch(`${baseURL}/category`);

    if (!response.ok) return;

    const data = await response.json();
    console.log(data);
    setCategoryData(data.data);
  };

  const subcategoryFetch = async () => {
    const response = await fetch(
      `${baseURL}/category/${parseInt(selectedCategory)}`
    );

    if (!response.ok) return;

    const data = await response.json();
    console.log(data);
    setSubCategoryData(data.data);
  };

  useEffect(() => {
    subcategoryFetch();
  }, [selectedCategory]);

  const genreFetch = async () => {
    const response = await fetch(
      `${baseURL}/sub-category/${selectedSubCategory}`
    );

    if (!response.ok) return;

    const data = await response.json();
    console.log(data);
    setGenreData(data.data);
  };

  useEffect(() => {
    genreFetch();
  }, [selectedSubCategory]);

  const dashboardDataFetch = async () => {
    setLoading(true);
    const response = await fetch(`${baseURL}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = await response.json();
    console.log(data.data);
    setDashboardData(data.data);
    setData(data.data.contents);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dashboardDataFetch();
    }
  }, [isLoggedIn]);

  //Post Data
  const postDataHandler = async () => {
    let content = "";
    let cType = "";

    if (addPdf) content = pdfFile;
    if (addText) content = textContent;
    if (addImage) content = image;

    if (addPdf) cType = 1;
    if (addText) cType = 2;
    if (addImage) cType = 0;

    if (
      title &&
      thumbImg &&
      banImg &&
      description &&
      author &&
      selectedCategory &&
      selectedSubCategory &&
      selectedGenre
    ) {
      dispatch(homepageActions.setIsLoading(true));
      const data = {
        title: title,
        category_id: selectedCategory,
        sub_category_id: selectedSubCategory,
        genre_id: selectedGenre,
        thumbnail_image: thumbImg,
        feature_image: banImg,
        summary: description,
        author: author,
        type: 0,
        content_type: cType,
        content: addText ? textContent : content,
      };

      console.log(data);
      const token = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

      try {
        console.log("start");
        // const response = await fetch(`https://admin.lonthonaloy.com/api/test`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "X-CSRF-Token": token,
        //   },
        //   body: JSON.stringify(data),
        // });

        const response = await fetch(`${baseURL}/content-upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": token,
          },
          body: JSON.stringify(data),
        });

        // const response = await axios.post(`${baseURL}/content-upload`, data, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        console.log("response:", response);

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data2 = await response.json();
        console.log("Data:", data2);

        setSubmitMsg(data2.message);
        setSubmittedPopUp(true);
        goBackHandler();
      } catch (error) {
        console.error("Error:", error);
        console.log("Error");
      }
    } else {
      setFormFillUpError(true);

      if (!title) setTitleError(true);
      if (!description) setDesError(true);
      if (author.length === 0) setAuthorError(true);

      if (title) setTitleError(false);
      if (description) setDesError(false);
      if (author.length !== 0) setAuthorError(false);
    }
    dispatch(homepageActions.setIsLoading(false));
  };

  const goBackHandler = () => {
    setPdfFile(null);
    setThumbImg([]);
    setBanImg([]);
    setTextContent("");
    setTitle(null);
    setDescription(null);
    setAuthor([]);
    setImage(null);

    setTitleError(false);
    setDesError(false);
    setAuthorError(false);

    setUpload(false);
  };

  const clearContentHandler = () => {
    setPdfFile(null);
    setTextContent("");
    setImage(null);
  };

  return (
    <>
      {!isLoggedIn && <Navigate to="/login" />}

      {isLoggedIn && !loading && dashboardData && (
        <div className={styles.container}>
          <div className={styles.leftCon}>
            <div className={styles.authorCon}>
              <div className={styles.authorSec}>
                <img className={styles.dp} src={dp} alt="author_dp" />

                <div>
                  <p className={styles.name}>
                    {dashboardData.user.first_name}{" "}
                    {dashboardData.user.last_name}
                  </p>
                  <p className={styles.role}>{dashboardData.user.role}</p>
                </div>
              </div>
              <Link className={styles.link} to="/dashboard/edit_profile">
                <div className={styles.btn}>Edit Profile</div>
              </Link>
            </div>

            <div className={styles.optionsCon}>
              <Link className={styles.link} to="/dashboard">
                <p className={styles.options}>Dashboard</p>
              </Link>

              <Link className={styles.link} to="/dashboard/contact">
                <p className={styles.options}>Contact</p>
              </Link>

              <Link className={styles.link} to="/dashboard/contents">
                <p className={styles.active}>Contents</p>
              </Link>
            </div>
          </div>

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

          <div className={classes.rightCon}>
            {!upload && (
              <div className={classes.rContainer}>
                <p className={classes.pTitle}>Contents</p>

                <div className={classes.filterContainer}>
                  <select className={classes.filterOp} name="filter">
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    <option value="novels">Novels</option>
                    <option value="poems">Poems</option>
                    <option value="others">Others</option>
                  </select>

                  <select className={classes.filterOp} name="filter">
                    <option value="" disabled selected>
                      Select Sub Category
                    </option>
                    <option value="novels">Novels</option>
                    <option value="poems">Poems</option>
                    <option value="others">Others</option>
                  </select>

                  <select className={classes.filterOp} name="filter">
                    <option value="" disabled selected>
                      Genre
                    </option>
                    <option value="novels">Novels</option>
                    <option value="poems">Poems</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <img
                  src={addBtn}
                  className={classes.addBtn}
                  onClick={uploadHandler}
                />

                <div className={classes.tableCon}>
                  <DataTable
                    data={data}
                    columns={columns}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="500px"
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                      <input
                        type="text"
                        placeholder="Search"
                        className={classes.tableSearch}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    }
                  />
                </div>
              </div>
            )}

            {upload && (
              <div className={classes.uploadSection}>
                <p className={classes.back} onClick={goBackHandler}>
                  Go back
                </p>
                <p className={classes.pTitle}>Producte Upload</p>

                <div className={classes.filterContainer}>
                  <select
                    className={classes.filterOp}
                    name="filter"
                    onChange={handleCatSelect}
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    {categoryData.map((op, i) => (
                      <option key={i} value={op.id}>
                        {op.name}
                      </option>
                    ))}
                  </select>

                  {selectedCategory && (
                    <select
                      className={classes.filterOp}
                      name="filter"
                      onChange={handleSubCatSelect}
                    >
                      <option value="" disabled selected>
                        Select Sub Category
                      </option>
                      {subcategoryData.map((op, i) => (
                        <option key={i} value={op.id}>
                          {op.name}
                        </option>
                      ))}
                    </select>
                  )}

                  {selectedSubCategory && (
                    <select
                      className={classes.filterOp}
                      name="filter"
                      onClick={handleGenreSelect}
                    >
                      <option value="" disabled selected>
                        Genre
                      </option>
                      {genreData.map((op, i) => (
                        <option key={i} value={op.id}>
                          {op.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className={classes.addPForm}>
                  <div>
                    <p className={classes.formTitle}>Title*</p>
                    <input
                      className={classes.inputText}
                      type="text"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    {titleError && (
                      <p className={classes.errorTxt}>Please add a title!</p>
                    )}
                  </div>
                  <div>
                    <p className={classes.formTitle}>Description*</p>
                    <textarea
                      className={classes.ayInput}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    {desError && (
                      <p className={classes.errorTxt}>
                        Please add a description!
                      </p>
                    )}
                  </div>
                  <div className={classes.nameCon}>
                    {/* <div className={classes.lanSelectCon}>
                  <p className={classes.formTitle}>Language</p>

                  <select className={classes.filterOpUp} name="filter">
                    <option value="" disabled selected>
                      Select Language
                    </option>
                    <option value="novels">Novels</option>
                    <option value="poems">Poems</option>
                    <option value="others">Others</option>
                  </select>
                </div> */}
                  </div>
                  <div className={classes.authorNameSec}>
                    {authorNum.map((num, index) => (
                      <div key={index}>
                        <p className={classes.formTitle}>Author Name {num}</p>
                        <input
                          className={classes.inputText}
                          type="text"
                          onChange={(e) => {
                            const updatedAuthors = [...author];
                            updatedAuthors[index] = e.target.value;
                            setAuthor(updatedAuthors);
                          }}
                        />
                      </div>
                    ))}
                    <img
                      className={classes.addimgBtn}
                      src={addBtn2}
                      alt=""
                      onClick={authorHandler}
                    />
                    {authorError && (
                      <p className={classes.errorTxt}>Please add an author!</p>
                    )}
                  </div>
                  <div className={classes.uploadContentCon}>
                    <p className={classes.ucTitle}>Upload your content</p>
                    <div>
                      <BsFiletypePdf
                        className={classes.docLogo}
                        onClick={pdfUploadSec}
                      />
                      <BsImage
                        className={classes.docLogo}
                        onClick={imageUploadSec}
                      />
                      <BiText
                        className={classes.docLogo}
                        onClick={textUploadSec}
                      />
                      <BsCameraVideoFill
                        className={classes.docLogo}
                        onClick={videoUploadSec}
                      />
                    </div>
                  </div>

                  <div ref={contentRef}>
                    {addText && (
                      <div>
                        <p className={classes.formTitle}>Content</p>
                        {/* <textarea className={classes.contentInput} /> */}
                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue=""
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                        />
                      </div>
                    )}
                    {addImage && (
                      <div>
                        <p className={classes.formTitle}>Content</p>
                        {image === null && (
                          <div
                            className={classes.uploadImg}
                            onClick={() =>
                              document.querySelector(".input_img").click()
                            }
                          >
                            <p>Upload Image</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="input_img"
                          hidden
                          onChange={handleImageChange}
                        />
                        {image &&
                          image.map((item, i) => (
                            <div key={i} className={classes.imagePrevCon}>
                              <img
                                className={classes.previewImg}
                                src={item}
                                id={`contentRem${i}`}
                                onClick={(e) => {
                                  const selectedImg = image.filter(
                                    (item) => item !== e.target.src
                                  );
                                  setImage(selectedImg);
                                }}
                              />
                              <p
                                className={classes.imagePrevRem}
                                onClick={() => {
                                  document
                                    .querySelector(`#contentRem${i}`)
                                    .click();
                                }}
                              >
                                Click to Remove
                              </p>
                            </div>
                          ))}
                        {addImg && (
                          <img
                            className={classes.addimgBtn}
                            src={addBtn2}
                            alt=""
                            onClick={() =>
                              document.querySelector(".input_img").click()
                            }
                          />
                        )}
                      </div>
                    )}
                    {addPdf && (
                      <div className={classes.addPDF}>
                        <p className={classes.formTitle}>Content</p>
                        <div
                          className={classes.uploadImg}
                          onClick={() =>
                            document.querySelector(".input_pdf").click()
                          }
                        >
                          <p>Upload PDF</p>
                        </div>
                        <input
                          className="input_pdf"
                          type="file"
                          accept="application/pdf"
                          hidden
                          onChange={handlePDFInputChange}
                        />
                      </div>
                    )}
                    {addVideo && <div>Add video</div>}
                  </div>
                  <div className={classes.TBSec}>
                    <p className={classes.formTitle}>Thumbnail and Banner</p>
                    {!thumbImg && (
                      <div
                        className={classes.uploadImg}
                        onClick={() =>
                          document.querySelector(".input_thumbImg").click()
                        }
                      >
                        <p>Upload Thumbnail Image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="input_thumbImg"
                      hidden
                      onChange={handleImageChangeThumb}
                    />
                    {thumbImg && (
                      <div className={classes.imagePrevCon}>
                        <img
                          className={classes.previewImg}
                          src={thumbImg}
                          onClick={() => {
                            setThumbImg(null);
                          }}
                          id="thumbImgRem"
                        />
                        <p
                          className={classes.imagePrevRem}
                          onClick={() => {
                            document.querySelector("#thumbImgRem").click();
                          }}
                        >
                          Click to Remove
                        </p>
                      </div>
                    )}

                    {!banImg && (
                      <div
                        className={classes.uploadImgBan}
                        onClick={() =>
                          document.querySelector(".input_banImg").click()
                        }
                      >
                        <p>Upload Banner Image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="input_banImg"
                      hidden
                      onChange={handleImageChangeBan}
                    />
                    {banImg && (
                      <div className={classes.imagePrevCon}>
                        <img
                          className={classes.previewImg}
                          src={banImg}
                          onClick={() => {
                            setBanImg(null);
                          }}
                          id="banImgRem"
                        />
                        <p
                          className={classes.imagePrevRem}
                          onClick={() => {
                            document.querySelector("#banImgRem").click();
                          }}
                        >
                          Click to Remove
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={classes.saveBtn} onClick={log}>
                    <GreyBtn>Save</GreyBtn>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Snackbar
            open={formFillUpError}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Please fill out the form!
            </Alert>
          </Snackbar>

          <Snackbar
            open={submittedPopUp}
            autoHideDuration={6000}
            onClose={submitHandleClose}
          >
            <Alert
              onClose={submitHandleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {submitMsg}
            </Alert>
          </Snackbar>
        </div>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "500px",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
    </>
  );
};
export default ProductsPage;
