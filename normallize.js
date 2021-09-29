const dataFromServer = [
  {
    id: "54",
    price: 819962,
    beds: 4,
    baths: 7,
    sq_ft: 4721,
    city: "Sandy",
    zip: "00283",
    street: "239 Berge Haven",
    first_name: "Connie",
    last_name: "Dickinson",
    email: "miriam@walter.net",
    agent_id: "11",
  },
  {
    id: "52",
    price: 662926,
    beds: 6,
    baths: 4,
    sq_ft: 3232,
    city: "Draper",
    zip: "49841",
    street: "3157 Fay Pine",
    first_name: "Connie",
    last_name: "Dickinson",
    email: "miriam@walter.net",
    agent_id: "11",
  },
  {
    id: "60",
    price: 1499257,
    beds: 7,
    baths: 2,
    sq_ft: 1845,
    city: "Draper",
    zip: "08069",
    street: "55875 Lauretta Trafficway",
    first_name: "Stacey",
    last_name: "Hackett",
    email: "raymundo@kirlin.io",
    agent_id: "12",
  },
];

const normalizeData = (data) => {
  // console.log(data);
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

data = normalizeData(dataFromServer);
console.log(data[0].properties);
