import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, List, Image } from "semantic-ui-react";
// Beds	Baths	Sq. Ft.	Street	City

// [
//   {
//     "id": "54",
//     "price": 819962,
//     "beds": 4,
//     "baths": 7,
//     "sq_ft": 4721,
//     "city": "Sandy",
//     "zip": "00283",
//     "street": "239 Berge Haven",
//     "first_name": "Connie",
// //     "last_name": "Dickinson",
// //     "email": "miriam@walter.net",
// //     "agent_id": "11"
// //   },
// //   {
// //     "id": "52",
// //     "price": 662926,
// //     "beds": 6,
// //     "baths": 4,
// //     "sq_ft": 3232,
// //     "city": "Draper",
// //     "zip": "49841",
// //     "street": "3157 Fay Pine",
// //     "first_name": "Connie",
// //     "last_name": "Dickinson",
// //     "email": "miriam@walter.net",
// //     "agent_id": "11"
// //   },
// //   {
// //     "id": "60",
// //     "price": 1499257,
// //     "beds": 7,
// //     "baths": 2,
// //     "sq_ft": 1845,
// //     "city": "Draper",
// //     "zip": "08069",
// //     "street": "55875 Lauretta Trafficway",
// //     "first_name": "Stacey",
// //     "last_name": "Hackett",
// //     "email": "raymundo@kirlin.io",
// //     "agent_id": "12"
// //   },
// // ]

// // how do we want it to look?
// const agents = [
//   {
//     first_name: "Tony",
//     last_name: "Bob",
//     email: "test@test.com",
//     properties: [
//       { price: 123, beds: 1, baths: 2, street: "a", city: "slc", zip: "1234" },
//       {
//         price: 1223423,
//         beds: 1,
//         baths: 2,
//         street: "a",
//         city: "slc",
//         zip: "1234",
//       },
//     ],
//   },
//   {
//     first_name: "Jon",
//     last_name: "Bob",
//     email: "test@test.com",
//     properties: [
//       {
//         price: 123,
//         beds: 1,
//         baths: 2,
//         sq_ft: 123,
//         street: "a",
//         city: "slc",
//         zip: "1234",
//       },
//       {
//         price: 123123,
//         beds: 1,
//         baths: 2,
//         street: "a",
//         city: "slc",
//         zip: "1234",
//       },
//     ],
//   },
// ];
const Available = () => {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    getProperties();
  }, []);

  const normalizeData = (data) => {
    console.log(data);
  };
  const getProperties = async () => {
    try {
      let res = await axios.get("/api/properties");
      normalizeData(res.data);
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
  return (
    <List
      divided
      verticalAlign="middle"
      style={{ border: "1px solid", padding: "10px " }}
    >
      {renderList()}
    </List>
  );
};
export default Available;
