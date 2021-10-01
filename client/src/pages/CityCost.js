import React from "react";
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

const data = [
  {
    name: "SLC",
    cost: 4000,
  },
  {
    name: "DRAPER",
    cost: 3000,
  },
];

const CityCost = () => {
  return (
    <div>
      <h1>Chart HERE!!!!!!</h1>
      <div style={{ border: "1px solid" }}>
        <BarChart
          width={500}
          height={400}
          data={data}
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
          <Bar dataKey="cost" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default CityCost;
