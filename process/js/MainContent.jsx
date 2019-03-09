/* eslint-disable */
const React = require("react");

var PieChart = require("recharts").PieChart;
var Pie = require("recharts").Pie;
var Sector = require("recharts").Sector;
var Cell = require("recharts").Cell;
var Legend = require("recharts").Legend;
var Tooltip = require("recharts").Tooltip;
var ResponsiveContainer = require("recharts").ResponsiveContainer;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: new Array()
    };
  }

  componentDidMount() {
    const data = [{ name: "Male", value: 400 }, { name: "Female", value: 300 }];

    this.setState({
      data: data
    });
  }

  render() {
    const data = this.state.data;

    return (
      <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="row p-4">
          <div className="col-sm-4">
            <div className="card mx-auto">
              <div className="card-body">
                <h5 className="card-title">Graph 1</h5>
                <ResponsiveContainer className="container" height={400}>
                  <PieChart>
                    <Pie
                      isAnimationActive={true}
                      dataKey="value"
                      data={data}
                      cy={200}
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

module.exports = MainContent;
