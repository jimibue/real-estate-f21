import axios from "axios";
import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

const Cities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities();
  }, []);

  const handleChange = (e, { value }) => {
    console.log(value);
  };
  const getCities = async () => {
    try {
      let res = await axios.get("/api/cities");
      // [{city:'qwe'}] => [{key:'qwe', text:'qwe', value:'qwe'}]
      let normalizedData = res.data.map((d) => {
        return { key: d.city, text: d.city, value: d.city };
      });
      setCities(normalizedData);
      // do we need to normalize? yes
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>cities</h1>
      <Dropdown
        onChange={handleChange}
        placeholder="Select City"
        fluid
        selection
        options={cities}
      />
    </div>
  );
};

export default Cities;
