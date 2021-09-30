import axios from "axios";
import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

const FindHomes = () => {
  const [agents, setAgents] = useState([]);
  const [buyers, setBuyers] = useState(null);
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    getAgents();
  }, []);
  const normalizeDropdownOptions = (data) => {
    return data.map((a) => {
      return {
        key: a.id,
        value: a.id,
        text: `${a.first_name} ${a.last_name}`,
      };
    });
  };
  const getAgents = async () => {
    try {
      let res = await axios.get("/api/agents");
      // {id: 13, first_name: 'Philomena', last_name: 'Abshire', sold: false, unsold_homes: 5} =>
      // {key:id, value:id, text: first_name+last_name}
      let normalizedAgents = normalizeDropdownOptions(res.data);
      setAgents(normalizedAgents);

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAgentChange = async (e, { value }) => {
    console.log(value);
    try {
      let res = await axios.get(`/api/agents/${value}`);
      let normalizedBuyers = normalizeDropdownOptions(res.data);
      setBuyers(normalizedBuyers);
    } catch (err) {
      console.log(err);
    }
  };
  const handleBuyerChange = async (e, { value }) => {
    console.log(value);
    try {
      let res = await axios.get(`/api/buyers/${value}`);
      setProperties(res.data);
    } catch (err) {}
  };
  return (
    <div>
      <h1>Homes</h1>
      <Dropdown
        placeholder="Agent"
        search
        selection
        label="Select Agent"
        options={agents}
        onChange={handleAgentChange}
      />
      <br />
      {buyers && (
        <Dropdown
          placeholder="Buyers"
          search
          selection
          label="Select Buyer"
          options={buyers}
          onChange={handleBuyerChange}
        />
      )}
      <br />
      {properties && <code>{JSON.stringify(properties)}</code>}
    </div>
  );
};

export default FindHomes;
