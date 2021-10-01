import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CityCost = () => {
  const [chartData, setChartData] = useState([]);
  const [chartData1, setChartData1] = useState([]);
  useEffect(() => {
    getChartData();
    getChartData1();
  }, []);
  const normalizeData = (data) => {
    return data.map((city) => {
      // before I return.. I need to find average
      // city.prices is a string of the prices seperated by a comma..
      const costArray = city.prices.split(", ");
      // find sum, what method? reduce, for/forEach
      const total = costArray.reduce((sum, num) => {
        // what this function returns will be the 'sum' in the next call
        // cast string to a number.. ? GOOGLE
        return sum + parseInt(num);
      }, 0);

      // AVERAGE MATH total/ costArray.length

      console.log(total);
      return { name: city.city, average: Math.ceil(total / costArray.length) };
    });
  };
  const getChartData = async () => {
    try {
      let res = await axios.get("/api/properties/city_cost");
      setChartData(normalizeData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const normalizeData1 = (data) => {
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

  const getChartData1 = async () => {
    try {
      let res = await axios.get("/api/properties");

      setChartData1(normalizeData1(res.data.properties));
    } catch (err) {}
  };
  return (
    <div>
      <h1>Chart HERE!!!!!!</h1>
      <div style={{ border: "1px solid" }}>
        <BarChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="average" fill="#8884d8" />
        </BarChart>
      </div>
      <div style={{ border: "1px solid" }}>
        <BarChart
          width={500}
          height={400}
          data={chartData1}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="average" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default CityCost;
