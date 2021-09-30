import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, List, Image, StepGroup } from "semantic-ui-react";
// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";
// Beds	Baths	Sq. Ft.	Street	City

const Available = () => {
  const [agents, setAgents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getProperties();
  }, []);

  const normalizeData = (data) => {
    // console.log(data);
    // console.log("here");
    let ids = data.map((d) => d.agent_id);
    /// create a set and then convert a set to an array
    let unique_ids = [...new Set(ids)];
    // console.log(ids);
    // console.log(unique_ids);

    return unique_ids.map((id) => {
      // working with one agent

      // find the agents properties
      let properties = data.filter((d) => d.agent_id === id);
      // console.log(id, "has: ");
      // console.log(properties);

      //get aggent info
      let { first_name, last_name, email } = properties[0];
      // cleaning up property data so it only includes property data
      let agentProperties = properties.map((p) => {
        return {
          price: p.price,
          beds: p.beds,
          sq_ft: p.sq_ft,
          city: p.city,
          street: p.street,
          zip: p.zip,
          baths: p.baths,
          id: p.id,
        };
      });
      // finally return on agent object
      return { first_name, last_name, email, properties: agentProperties };
    });
  };
  const getProperties = async () => {
    try {
      let res = await axios.get("/api/properties");
      setAgents(normalizeData(res.data.properties));
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.log(err);
    }
  };
  const renderProperties = (properties) => {
    return properties.map((p) => {
      return (
        <Table.Row>
          <Table.Cell>{p.price}</Table.Cell>
          <Table.Cell>{p.beds}</Table.Cell>
          <Table.Cell>{p.baths}</Table.Cell>
          <Table.Cell>{p.sq_ft}</Table.Cell>
          <Table.Cell>{p.street}</Table.Cell>
          <Table.Cell>{p.city}</Table.Cell>
          <Table.Cell>{p.zip}</Table.Cell>
        </Table.Row>
      );
    });
  };
  const renderList = () => {
    return agents.map((a) => {
      return (
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/molly.png"
          />
          <List.Content>
            <List.Content>{a.first_name}</List.Content>
          </List.Content>
          <List.Content>
            <Table celled style={{ marginTop: "10px" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Beds</Table.HeaderCell>
                  <Table.HeaderCell>Baths</Table.HeaderCell>
                  <Table.HeaderCell>Sq Ft</Table.HeaderCell>
                  <Table.HeaderCell>Street</Table.HeaderCell>
                  <Table.HeaderCell>City</Table.HeaderCell>
                  <Table.HeaderCell>Zip</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{renderProperties(a.properties)}</Table.Body>
            </Table>
          </List.Content>
        </List.Item>
      );
    });
  };
  const loadMore = async () => {
    console.log("loadMore called");
    try {
      let nextPage = page + 1;
      setPage(nextPage);
      let res = await axios.get(`/api/properties?page=${nextPage}`);
      let normalizedData = normalizeData(res.data.properties);
      setAgents([...agents, ...normalizedData]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <p>page: {page}</p>
      <p>total pages: {totalPages}</p>

      <List
        divided
        verticalAlign="middle"
        style={{
          border: "1px solid",
          padding: "10px ",
          height: "80vh",
          overflow: "auto",
        }}
      >
        {/* <InfiniteScroll
          pageStart={page}
          loadMore={loadMore}
          hasMore={page < totalPages}
          useWindow={false}
        >
          {renderList()}
        </InfiniteScroll> */}

        <InfiniteScroll
          dataLength={page * 50}
          next={loadMore}
          hasMore={page < totalPages}
          loader={<h4>Loading...</h4>}
        >
          {renderList()}
        </InfiniteScroll>
      </List>
    </>
  );
};
export default Available;
