import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Dropdown } from "semantic-ui-react";
import PropertyCard from "../components/PropertyCard";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    getCities();
  }, []);

  const renderProperties = () => {
    return properties.map((p) => <PropertyCard {...p} />);
  };

  const handleChange = async (e, { value }) => {
    try {
      let res = await axios.get(`/api/cities/${value}`);
      setProperties(res.data);
    } catch (err) {
      console.log(err);
    }
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
      {properties && <Card.Group>{renderProperties()}</Card.Group>}
    </div>
  );
};

export default Cities;
