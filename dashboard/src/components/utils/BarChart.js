// components/BarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { Typography, Box } from "@mui/material";

export const BarChart = () => {
  const [loaded, setloaded] = useState(false);
  const [data, setdata] = useState([]);
  const [chartData, setChartData] = useState({});

  const getStats = async (e) => {
    try {
      const response = await axios.get(
        "https://mitx.mutukumaxwell.tech/api/stats/dist",
        {
          withCredentials: true,
        }
      );
      setdata(response.data.region_distribution);
      console.log(Object.keys(data));

      setloaded(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setloaded(false);
    getStats();
  }, []);

  useEffect(() => {
    setChartData({
      labels: Object.keys(data).map((region) => region.replace("_", " ")),
      datasets: [
        {
          label: "Users Gained",
          data: Object.values(data),
          backgroundColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(236, 240, 241, 1)",
            "#F50057",
            "#f3ba2f",
            "#6c63ff",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);
  return (
    <>
      {loaded && chartData ? (
        <div className="chart-container">
          <Typography
            style={{
              textAlign: "center",
              fontSize: {
                sm: "12px",
                md: "12px",
                lg: "16px",
                xl: "16px",
              },
            }}
            variant="h5"
          >
            Opportunities
          </Typography>
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Distribution of opportunities across different regions",
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      ) : (
        <Box></Box>
      )}
    </>
  );
};
