import React from "react";
import styles from "./DashboardPage.module.css";
import dp from "../image/dp.jpg";
import InfoCard from "../components/UI/InfoCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DUMMY_DATA = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 25 },
  { name: "Jan", value: 20 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 25 },
];

const CList_DATA = [
  { name: "Afraful Islam", img: dp },
  { name: "Anika Rahnum", img: dp },
  { name: "Riyana Ria", img: dp },
  { name: "Electricity", img: dp },
  { name: "M.M. Muhammad", img: dp },
  { name: "Anika Rahnum", img: dp },
  { name: "Afraful Islam", img: dp },
  { name: "Riyana Ria", img: dp },
];

const DashboardPage = () => {
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
          <div className={styles.btn}>Edit Profile</div>
        </div>

        <div className={styles.optionsCon}>
          <p className={styles.active}>Dashboard</p>
          <p className={styles.options}>Contact</p>
          <p className={styles.options}>Products</p>
        </div>
      </div>

      <div className={styles.rightCon}>
        <div className={styles.dashCon}>
          <p className={styles.title}>Dashboard</p>
          <div className={styles.info}>
            <InfoCard title="Total Selles" amount={4500} />
            <InfoCard title="Total Visitors" amount={4500} />
            <InfoCard title="Total Orders" amount={4500} />
            <InfoCard title="Balance" amount={4500} />
          </div>

          <div className={styles.graph}>
            <p className={styles.graphTitle}>Income</p>
            <BarChart
              width={600}
              height={300}
              data={DUMMY_DATA}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6F6D6D" />
            </BarChart>
          </div>
        </div>

        <div className={styles.customerLi}>
          <p className={styles.clTitle}>Customar List</p>

          {CList_DATA.map((item, i) => (
            <>
              <div key={i} className={styles.clItem}>
                <img className={styles.clDp} src={item.img} alt="author_dp" />
                <p className={styles.clName}>{item.name}</p>
              </div>
              {i !== CList_DATA.length - 1 && <hr className={styles.clHr} />}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
