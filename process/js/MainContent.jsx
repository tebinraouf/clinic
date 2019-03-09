/* eslint-disable */
const React = require("react");
var PieChart = require("recharts").PieChart;
var Pie = require("recharts").Pie;
var Sector = require("recharts").Sector;
var Cell = require("recharts").Cell;
var Legend = require("recharts").Legend;
var Tooltip = require("recharts").Tooltip;

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

class MainContent extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <PieChart width={800} height={400}>
        <Pie isAnimationActive={true} dataKey="value" data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
          {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        </Pie>
        <Tooltip/>
       </PieChart>
      </main>
    );
  }
}

module.exports = MainContent;
