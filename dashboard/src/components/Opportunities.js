import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TuneIcon from "@mui/icons-material/Tune";
import { newtonsCradle } from "ldrs";
import OpportunityView from "./OpportunityView";
import { AuthContext } from "./Auth/AuthContext";
import "./styles/Opportunities.css";

function Opportunities() {
  const [opps, setopps] = useState();
  const [loaded, setloaded] = useState(false);
  const [filters, setfilters] = useState(true);
  const [selected, setselected] = useState("");
  const [duration, setduration] = useState("all-time");
  newtonsCradle.register();
  const { setisAuthenticated } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    getData(selected);
  }, [selected, duration]);

  const filtersManager = (filter) => {
    setselected(filter);
    setloaded(false);
  };

  const getTimedData = (data) => {
    if (duration === "all-time") {
      return data;
    } else if (duration === "last-24-hrs") {
      const opps = data.filter((item) => {
        return new Date() - new Date(item.date_created) < 86400000;
      });
      return opps;
    } else if (duration === "last-48-hrs") {
      const opps = data.filter((item) => {
        return new Date() - new Date(item.date_created) < 86400000 * 2;
      });
      return opps;
    } else if (duration === "last-one-week") {
      const opps = data.filter((item) => {
        return new Date() - new Date(item.date_created) < 86400000 * 7;
      });
      return opps;
    } else if (duration === "last-one-month") {
      const opps = data.filter((item) => {
        return new Date() - new Date(item.date_created) < 86400000 * 28;
      });
      return opps;
    }
  };

  const getData = async (filter_selected) => {
    try {
      var url;
      if (selected === "" || undefined) {
        url = "https://mitx.mutukumaxwell.tech/api/opps/";
      } else {
        url = `https://mitx.mutukumaxwell.tech/api/opps/region/${filter_selected}`;
      }
      const response = await axios.get(url, {
        withCredentials: true,
      });
      setopps(getTimedData(response.data));
      setloaded(true);
    } catch (error) {
      if (error.status === "403") {
        setisAuthenticated(false);
        localStorage.clear();
        navigate("/login");
      }
      setopps([]);
      console.log(error);
    } finally {
      setloaded(true);
      console.log(opps);
    }
  };

  const handleFilters = () => {
    setfilters(!filters);
  };

  return (
    <>
      {loaded ? (
        <Box
          sx={{
            display: "flex",
            marginX: "36px",
          }}
        >
          <Box
            sx={{
              minWidth: "1000px",
            }}
          >
            <Box
              className="flex"
              sx={{
                boxSizing: "border-box",
                maxWidth: "1200px",
                minWidth: "1200px",
              }}
            >
              <OpportunityView opportunities={opps} />
            </Box>
          </Box>
          <Box
            sx={{
              width: "400px",
              marginY: "64px",
              marginLeft: "24px",
              padding: "24px",
              borderRadius: "8px",
              border: `${filters ? "1px solid #ccc" : "none"}`,
              backgroundColor: `${filters ? "#dde2ff" : "inherit"}`,
              height: `${filters ? "700px" : "0px"}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "12px",
                justifyContent: "space-between",
              }}
            >
              <Typography>Filters</Typography>
              <Box
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  handleFilters();
                }}
              >
                <TuneIcon sx={{ color: "#6c63ff" }} />
              </Box>
            </Box>
            {filters && (
              <Box className="flex">
                <ul className="filters-opps-li list">
                  <li>
                    {" "}
                    <Typography className="text-span">
                      <span>Regions</span>
                    </Typography>
                  </li>
                  <ol className="list">
                    <li>
                      <Button
                        sx={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                          transition: "0.3s ease-in-out",
                          color: "#1f1650",
                          "&:hover": {
                            backgroundColor: "#dde2ff",
                            fontWeight: "600",
                          },
                        }}
                        onClick={() => {
                          filtersManager("northern_africa");
                        }}
                      >
                        North Africa
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                          transition: "0.3s ease-in-out",
                          color: "#1f1650",
                          "&:hover": {
                            fontWeight: "600",
                            backgroundColor: "#dde2ff",
                          },
                        }}
                        onClick={() => {
                          filtersManager("eastern_africa");
                        }}
                      >
                        East Africa
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{
                          transition: "0.3s ease-in-out",

                          fontWeight: "500",
                          textTransform: "capitalize",
                          color: "#1f1650",
                          "&:hover": {
                            backgroundColor: "#dde2ff",
                            fontWeight: "600",
                          },
                        }}
                        onClick={() => {
                          filtersManager("eastern_europe");
                        }}
                      >
                        East Europe
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{
                          transition: "0.3s ease-in-out",
                          fontWeight: "500",
                          color: "#1f1650",
                          textTransform: "capitalize",
                          "&:hover": {
                            backgroundColor: "#dde2ff",
                            fontWeight: "600",
                          },
                        }}
                        onClick={() => {
                          filtersManager("southern_africa");
                        }}
                      >
                        South Africa
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{
                          fontWeight: "500",
                          transition: "0.3s ease-in-out",

                          textTransform: "capitalize",
                          color: "#1f1650",
                          "&:hover": {
                            fontWeight: "600",

                            backgroundColor: "#dde2ff",
                          },
                        }}
                        onClick={() => {
                          filtersManager("western_africa");
                        }}
                      >
                        West Africa
                      </Button>
                    </li>
                  </ol>
                  <li className="filters-opps">
                    <Typography className="text-span">
                      <span>Duration</span>
                    </Typography>
                  </li>
                  <ol className="list">
                    <li>
                      <Button
                        sx={{
                          transition: "0.3s ease-in-out",
                          fontWeight: "500",
                          textTransform: "capitalize",
                          color: "#1f1650",
                          "&:hover": {
                            fontWeight: "600",
                            backgroundColor: "#dde2ff",
                          },
                        }}
                        onClick={() => {
                          setduration("last-24-hrs");
                        }}
                      >
                        Today
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{
                          color: "#1f1650",
                          fontWeight: "500",
                          transition: "0.3s ease-in-out",
                          textTransform: "capitalize",
                          "&:hover": {
                            fontWeight: "600",
                            backgroundColor: "#dde2ff",
                          },
                        }}
                        onClick={() => {
                          setduration("last-48-hrs");
                        }}
                      >
                        Yesterday
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{
                          color: "#1f1650",
                          fontWeight: "500",
                          transition: "0.3s ease-in-out",
                          textTransform: "capitalize",
                          "&:hover": {
                            fontWeight: "600",
                            backgroundColor: "#dde2ff",
                          },
                        }}
                        onClick={() => {
                          setduration("last-one-week");
                        }}
                      >
                        Last one week
                      </Button>
                    </li>
                    <li>
                      <Button
                        sx={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                          transition: "0.3s ease-in-out",
                          color: "#1f1650",
                          "&:hover": {
                            fontWeight: "600",
                            backgroundColor: "#dde2ff",
                          },
                        }}
                        onClick={() => {
                          setduration("last-one-month");
                        }}
                      >
                        Last one Month
                      </Button>
                    </li>
                  </ol>
                </ul>
                <Button
                  sx={{
                    backgroundColor: "#6c63ff",
                    color: "white",
                    alignSelf: "flex-end",
                    "&:hover": { backgroundColor: "#F50057", color: "white" },
                  }}
                  onClick={() => {
                    filtersManager("");
                    setduration("all-time");
                  }}
                >
                  Reset
                </Button>
                <Box
                  sx={{
                    marginTop: "12px",
                    marginLeft: "36px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#1f1650",
                      fontWeight: "600px",
                    }}
                    variant="h6"
                    className="text-span-color"
                  >
                    <i>
                      Loaded <span>{opps.length}</span> opportunities from{" "}
                      <span>
                        {selected === ""
                          ? "all over the world"
                          : selected.replace("_", " ")}
                      </span>
                    </i>
                  </Typography>
                  <Typography
                    sx={{
                      color: "#1f1650",
                      fontWeight: "600px",
                    }}
                    variant="h6"
                    className="text-span-color"
                  >
                    <i>
                      Duration: <span>{duration.replace("-", " ")}</span>
                    </i>
                  </Typography>
                </Box>
                <Box
                  className="world"
                  sx={{
                    alignSelf: "center",
                  }}
                ></Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          className="quantum-loader, flex"
          height="100vh"
          sx={{
            alignItems: "center",
          }}
        >
          <Box className="world"></Box>
          <l-newtons-cradle
            size="100"
            speed="1.75"
            color="#6c63ff"
          ></l-newtons-cradle>
        </Box>
      )}
    </>
  );
}

export default Opportunities;
