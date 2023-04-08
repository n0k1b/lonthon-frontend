import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import classes from "./ProductsPage.module.css";
import dp from "../image/dp.jpg";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import GreyBtn from "../components/UI/GreyBtn";
import addBtn from "../image/addBtn.png";

const products = [
  {
    id: 0,
    name: "Product1",
    price: 100,
  },
  {
    id: 1,
    name: "Product2",
    price: 100,
  },
  {
    id: 2,
    name: "Product3",
    price: 100,
  },
  {
    id: 4,
    name: "Product1",
    price: 100,
  },
  {
    id: 5,
    name: "Product2",
    price: 100,
  },
  {
    id: 6,
    name: "Product3",
    price: 100,
  },
  {
    id: 7,
    name: "Product1",
    price: 100,
  },
  {
    id: 8,
    name: "Product2",
    price: 100,
  },
  {
    id: 9,
    name: "Product3",
    price: 100,
  },
  {
    id: 10,
    name: "Product1",
    price: 100,
  },
  {
    id: 11,
    name: "Product2",
    price: 100,
  },
  {
    id: 12,
    name: "Product3",
    price: 100,
  },
];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(products);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    const result = products.filter((data) =>
      data.name.toLocaleLowerCase().match(search.toLocaleLowerCase())
    );
    setData(result);
  }, [search]);

  const columns = [
    {
      name: "Product ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Action",
      cell: (row) => <GreyBtn>Details</GreyBtn>,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftCon}>
        <div className={styles.authorCon}>
          <div className={styles.authorSec}>
            <img className={styles.dp} src={dp} alt="author_dp" />

            <div>
              <p className={styles.name}>Ashraful Hauqe</p>
              <p className={styles.role}>Content Writter</p>
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

          <Link className={styles.link} to="/dashboard/products">
            <p className={styles.active}>Products</p>
          </Link>
        </div>
      </div>

      <div className={classes.rightCon}>
        {!upload && (
          <div className={classes.rContainer}>
            <p className={classes.pTitle}>Products</p>

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
              onClick={() => setUpload(true)}
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

        <div className={classes.uploadSection}>
          <p className={classes.back} onClick={() => setUpload(false)}>
            Go back
          </p>
          <p className={classes.pTitle}>Producte Upload</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
