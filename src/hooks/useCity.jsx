import axios from "axios";
import React, { useEffect, useState } from "react";


const useCity = (url) => {

const [data, setData] = useState([]);
     useEffect(() => {
    axios({
      method: 'get',  
      url: url })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
        setData([])
      });
      
    },[url]) 
    return data;
};

export default useCity;
