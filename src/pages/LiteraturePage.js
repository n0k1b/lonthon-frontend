import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import styles from "./LiteraturePage.module.css";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { GrFilter } from "react-icons/gr";
import { BiMenuAltLeft } from "react-icons/bi";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import ad from "../image/lit_ad.png";
import card1 from "../image/card1.png";
import card2 from "../image/card2.png";
import card3 from "../image/card3.png";
import LongCard from "../components/UI/LongCard";
import { baseURL } from "../api";

const FILTER_OPTIONS = [
  "History",
  "Fun",
  "Humor",
  "Political",
  "Drama",
  "Romance",
  "Survival",
  "Comic Books",
  "Biographies",
  "Learning & Education",
  "Research",
  "Superhero",
  "Others",
];

const CONTENT = [
  {
    id: 1,
    img: card1,
    type: "Novel",
  },
  {
    id: 2,
    img: card2,
    type: "Novel",
  },
  {
    id: 3,
    img: card3,
    type: "Novel",
  },
  {
    id: 4,
    img: ad,
    type: "Novel",
  },
  {
    id: 5,
    img: card1,
    type: "Novel",
  },
  {
    id: 6,
    img: card1,
    type: "Novel",
  },
  {
    id: 7,
    img: card2,
    type: "Novel",
  },
  {
    id: 8,
    img: card3,
    type: "Novel",
  },
  {
    id: 9,
    img: ad,
    type: "Novel",
  },
  {
    id: 10,
    img: card1,
    type: "Novel",
  },
];

const LiteraturePage = () => {
  const [filterOpen, setFilterOpen] = useState(true);
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [contentData, setContentData] = useState([]);
  const toggleFilter = useRef();

  const filterToggleHandler = () => {
    setFilterOpen(!filterOpen);
    toggleFilter.current.classList.toggle("closed");
  };

  const filterHandler = (name) => {
    if (filters.includes(name)) {
      setFilters(filters.filter((op) => op !== name));
    } else {
      setFilters([...filters, name]);
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = CONTENT.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(CONTENT.length / postsPerPage);

  const prevPageHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const contentDataFetch = async () => {
    const response = await fetch(`${baseURL}/content`);

    if (!response.ok) return;

    const data = await response.json();

    console.log(data);
    setContentData(data.data);
  };

  useEffect(() => {
    contentDataFetch();
  }, []);

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.coverText}>
          <p className={styles.title}>Novel</p>
          <p className={styles.route}>Literature &gt; Novel</p>
        </div>
      </div>

      <Container>
        <Sort>
          <p className={styles.sort}>Sort By: </p>

          <Box sx={{ minWidth: 120, maxWidth: 75 }} size="small">
            <FormControl fullWidth>
              <NativeSelect
                defaultValue="public"
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value="public">Public</option>
                <option value="popular">Popular</option>
                <option value="best seller">Best Seller</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Sort>

        <BodyArea>
          <div className={styles.filterCol}>
            <FilterArea>
              <div className={styles.filterText}>
                <p className={styles.filterTitle}>Filter</p>
                <GrFilter />
              </div>

              <div className={styles.filterToggle}>
                <BiMenuAltLeft />
                {!filterOpen && (
                  <MdArrowDropDown
                    className={styles.arrow}
                    onClick={filterToggleHandler}
                  />
                )}
                {filterOpen && (
                  <MdArrowDropUp
                    className={styles.arrow}
                    onClick={filterToggleHandler}
                  />
                )}
              </div>

              <Wrapper>
                <div className="filter_open mobile-links" ref={toggleFilter}>
                  {FILTER_OPTIONS.map((option) => (
                    <FilterOption onClick={() => filterHandler(option)}>
                      <div
                        className={
                          filters.includes(option) ? "selected" : "default"
                        }
                      >
                        {option}
                      </div>
                    </FilterOption>
                  ))}
                </div>
              </Wrapper>
            </FilterArea>

            <div>
              <img alt="ad" src={ad} className={styles.ad} />
            </div>
          </div>

          <Page>
            <ContentArea>
              {/* {contentData.map((item) => (
                <LongCard data={item} />
              ))} */}
            </ContentArea>
            <div className={styles.paginationContainer}>
              <p className={styles.pagiText}>
                {currentPage} of {totalPages}
              </p>
              <AiOutlineLeftSquare
                className={styles.pagiIcon}
                onClick={prevPageHandler}
              />
              <AiOutlineRightSquare
                className={styles.pagiIcon}
                onClick={nextPageHandler}
              />
            </div>
          </Page>
        </BodyArea>
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding: 0 7vw;
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 37px;
`;

const BodyArea = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  margin-bottom: 155px;

  @media (max-width: 620px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const FilterArea = styled.div`
  background-color: #ffff;
  height: 100%;
  width: 100%;
  padding: 0 25px;
`;

const Page = styled.div`
  background-color: #ffff;
  height: 100%;
  width: 73%;
  margin-top: 10px;
  padding: 69px 86px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 660px) {
    width: 63%;
    padding: 69px 60px;
  }

  @media (max-width: 620px) {
    width: 100%;
  }
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(253.4px, 1fr));
  grid-template-rows: auto;
  grid-gap: 20px;
`;

const FilterOption = styled.div`
  .default {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 14px;
    color: #484848;
    padding: 7px 22px;
    margin: 10px 0;
    transition: 0.5s ease;
    cursor: pointer;

    &:hover {
      background-color: #d9d9d9;
      color: #6d6d6d;
    }
  }

  .selected {
    border: 1px solid #6d6d6d;
    background-color: #6d6d6d;
    border-radius: 8px;
    font-size: 14px;
    color: #ffff;
    padding: 7px 22px;
    margin: 10px 0;
    transition: 0.5s ease;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  .filter_open {
    margin: 20px 0;
    max-height: ${(props) => props.FILTER_OPTIONS * 33.2}px;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }

  .mobile-links.closed {
    padding: 0px;
    max-height: 0;
  }
`;

export default LiteraturePage;
