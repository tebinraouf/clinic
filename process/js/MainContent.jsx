/* eslint-disable */
const React = require("react");
const Patient = require("./Patient");

var PieChart = require("recharts").PieChart;
var Pie = require("recharts").Pie;

var Bar = require("recharts").Bar;
var BarChart = require("recharts").BarChart;
var CartesianGrid = require("recharts").CartesianGrid;
var XAxis = require("recharts").XAxis;
var YAxis = require("recharts").YAxis;

var Cell = require("recharts").Cell;
var Legend = require("recharts").Legend;
var Tooltip = require("recharts").Tooltip;
var ResponsiveContainer = require("recharts").ResponsiveContainer;

const COLORS = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#BA183D",
  "#181818",
  "#19B5AA",
  "#7A7D7D",
  "#FDB714",
  "#7ECECB",
  "#665687",
  "#DA9D9D",
  "#581908",
  "#02BBFE",
  "#FE5245",
  "#FFE319",
  "#57B598",
  "#EAEFD3",
  "#FFE221",
  "#D85168",
  "#332C2C",
];

class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: new Array(),
      ageRangeData: new Array(),
      procedureCount: new Array()
    };
  }

  componentDidMount() {
    var self = this;
    var p = new Patient();
    //gender ratio
    p.getGenderCounts(function(result) {
      self.setState({
        data: result
      });
    });
    //age range
    p.getPatientByAge(function(result) {
      self.setState({
        ageRangeData: result
      });
    });
    //procedure
    p.getProcedureByTypeCount(function(result) {
      self.setState({
        procedureCount: result
      });
    });

    // p.getPatientByMonthYear('Mar', '2018', function(result) {
    //   debugger
    //   self.setState({
    //     patientMonthlyData: result
    //   });
    // });
  }

  render() {
    const data = this.state.data;
    const ageRangeData = this.state.ageRangeData;
    const procedureCount = this.state.procedureCount;

    return (
      <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="row p-4">
          <div className="col-sm-4">
            <div className="card mx-auto">
              <div className="card-body">
                <h5 className="card-title">Gender Ratio</h5>
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

          <div className="col-sm-8">
            <div className="card mx-auto">
              <div className="card-body">
                <h5 className="card-title">Age Range</h5>
                <ResponsiveContainer className="container" height={400}>
                  <BarChart
                    width={500}
                    height={300}
                    data={ageRangeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="row pr-4 pl-4 pb-4">
          <div className="col-sm-12">
            <div className="card mx-auto">
              <div className="card-body">
                <h5 className="card-title">Procedure Range</h5>
                <ResponsiveContainer className="container" height={400}>
                  <BarChart
                    width={500}
                    height={300}
                    data={procedureCount}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {procedureCount.map((entry, index) => (
                        <Cell key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
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
