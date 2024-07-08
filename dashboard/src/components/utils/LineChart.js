import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import axios from "axios";

function LineChart() {
  const [loaded, setloaded] = useState(false);
  const [data, setdata] = useState([]);
  const [chartData, setChartData] = useState({});

  const getStats = async (e) => {
    try {
      const response = await axios.get(
        "https://mitx.mutukumaxwell.tech/api/stats/scpx",
        {
          withCredentials: true,
        }
      );
      setdata(response.data);
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
      labels: data.map((acolyte) => {
        const date = new Date(acolyte.date_created);
        return date;
      }),
      datasets: [
        {
          label: "Users Gained",
          data: data.map((entry) => entry.new_opportunities),
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
      {loaded ? (
        <div className="chart-container">
          <Typography style={{ textAlign: "center" }} variant="h5">
            Opportunity identification
          </Typography>
          <Line
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Trend of opportunity identification",
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      ) : (
        <div>
          <Typography>Running checks</Typography>
        </div>
      )}
    </>
  );
}
export default LineChart;
