import React, { useEffect, useState } from "react";
import axios from "axios";
import OpportunityView from "./OpportunityView";
import { Box } from "@mui/material";
import "./Opportunities.css";
import { newtonsCradle } from "ldrs";

function Opportunities() {
  const [opps, setopps] = useState();
  const [loaded, setloaded] = useState(false);
  newtonsCradle.register();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("https://mitx.mutukumaxwell.tech/api/opps/", {
        withCredentials: true,
      });
      setopps(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloaded(true);
      console.log(opps);
    }
  };

  return (
    <>
      {loaded ? (
        <Box className="grid-loaded">
          <OpportunityView opportunities={opps} />
        </Box>
      ) : (
        <Box className="quantum-loader">
          <l-newtons-cradle
            size="45"
            speed="1.75"
            color="#4f94e2"
          ></l-newtons-cradle>
        </Box>
      )}
    </>
  );
}

export default Opportunities;
