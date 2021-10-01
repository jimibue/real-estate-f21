data = [
  {
    id: 101,
    beds: 6,
    baths: 6,
    sq_ft: 6831,
    agent_id: 21,
    price: 420931,
    email: "dan.ullrich@kessler-wolf.co",
    first_name: "Zana",
    last_name: "Rowe",
    city: "Sandy",
    zip: "47670",
    street: "65441 Haley Village",
  },
  {
    id: 102,
    beds: 4,
    baths: 4,
    sq_ft: 1831,
    agent_id: 21,
    price: 40931,
    email: "dan.ullrich@kessler-wolf.co",
    first_name: "Zana",
    last_name: "Rowe",
    city: "Sandy",
    zip: "47670",
    street: "65441 Haley Village",
  },
  {
    id: 102,
    beds: 4,
    baths: 4,
    sq_ft: 1831,
    agent_id: 21,
    price: 403931,
    email: "dan.ullrich@kessler-wolf.co",
    first_name: "Zana",
    last_name: "Rowe",
    city: "SLC",
    zip: "47670",
    street: "65441 Haley Village",
  },
  {
    id: 102,
    beds: 3,
    baths: 4,
    sq_ft: 1831,
    agent_id: 21,
    price: 430931,
    email: "dan.ullrich@kessler-wolf.co",
    first_name: "Zana",
    last_name: "Rowe",
    city: "SLC",
    zip: "47670",
    street: "65441 Haley Village",
  },
];

const normalizeData = (data) => {
  let citySum = data.reduce((accum, property) => {
    let index = accum.findIndex((a) => a.name === property.city);
    if (index === -1) {
      accum.push({ name: property.city, sum: property.price, count: 1 });
    } // if in accum updat sum and count
    else {
      accum[index].sum += property.price;
      accum[index].count++;
    }
    return accum;
  }, []);

  return citySum.map((d) => {
    return { name: d.name, average: d.sum / d.count };
  });
};

let y = normalizeData(data);
console.log(y);

////

//

//

//

//
//
//

//

//
//

//

///to this... use reduce.. for each or however
const normalizeData1 = (data) => {
  return data.reduce((accum, property) => {
    // findIndex of city name
    index = accum.findIndex((a) => property.city === a.name);
    // not in array add it
    if (index === -1) {
      accum.push({ name: property.city, sum: property.price, count: 1 });
    }
    // is in array update Values
    else {
      accum[index].sum += property.price;
      accum[index].count++;
    }
    return accum;
  }, []);
};

// let x = normalizeData1(data);
// console.log(x);
