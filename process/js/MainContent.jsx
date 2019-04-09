/* eslint-disable */
import React, { Component } from 'react';
import Patient from "./Patient";

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
  "#332C2C"
];

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: new Array(),
      ageRangeData: new Array(),
      procedureCount: new Array(),
      patientMonthlyData: new Array(),
      years: [],
      monthValue: "",
      yearValue: "",
      totalPatientPerMonthYear: 0
    };
    this.handleOnChangeMonth = this.handleOnChangeMonth.bind(this);
    this.handleOnChangeYear = this.handleOnChangeYear.bind(this);
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

    //get all the years that have a patient
    p.getPatientYear(function(result) {
      self.setState({
        years: result
      });
    });

    //patient by month and year
    var d = new Date();
    var currentYear = d.getFullYear();
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var currentMonth = months[d.getMonth()];
    this.setState({
      monthValue: currentMonth,
      yearValue: currentYear
    });

    p.getPatientByMonthYear(currentMonth, currentYear, function(result) {
      self.setState({
        patientMonthlyData: result
      });
    });

    //get total patient per month and per year
    p.getTotalPatientPerMonthYear(currentMonth, currentYear, function(result){
      self.setState({
        totalPatientPerMonthYear: result
      })
    });



  }
  handleOnChangeMonth(event) {
    this.setState({ monthValue: event.target.value });

    var self = this;
    var p = new Patient();
    p.getPatientByMonthYear(event.target.value, this.state.yearValue, function(
      result
    ) {
      self.setState({
        patientMonthlyData: result
      });
    });

    //update total value 
    //get total patient per month and per year
    p.getTotalPatientPerMonthYear(event.target.value, this.state.yearValue, function(result){
      self.setState({
        totalPatientPerMonthYear: result
      })
    });

  }
  handleOnChangeYear(event) {
    this.setState({ yearValue: event.target.value });

    var self = this;
    var p = new Patient();
    p.getPatientByMonthYear(this.state.monthValue, event.target.value, function(
      result
    ) {
      self.setState({
        patientMonthlyData: result
      });
    });

    //update total value
    //get total patient per month and per year
    p.getTotalPatientPerMonthYear(this.state.monthValue, event.target.value, function(result){
      self.setState({
        totalPatientPerMonthYear: result
      })
    });

  }

  render() {
    const data = this.state.data;
    const ageRangeData = this.state.ageRangeData;
    const procedureCount = this.state.procedureCount;
    const patientMonthlyData = this.state.patientMonthlyData;
    const years = this.state.years;
    const totalPatientPerMonthYear = this.state.totalPatientPerMonthYear;

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
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
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
                <div className="row pb-3">
                  <div className="col-sm-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          Select Month
                        </span>
                      </div>
                      <select
                        className="custom-select"
                        id="patientByMonthID"
                        aria-label="Example select with button addon"
                        onChange={this.handleOnChangeMonth}
                        value={this.state.monthValue}
                      >
                        <option value="Jan">January</option>
                        <option value="Feb">February</option>
                        <option value="Mar">March</option>
                        <option value="Apr">April</option>
                        <option value="May">May</option>
                        <option value="Jun">June</option>
                        <option value="Jul">July</option>
                        <option value="Aug">August</option>
                        <option value="Sep">September</option>
                        <option value="Oct">October</option>
                        <option value="Nov">November</option>
                        <option value="Dec">December</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          Select Year
                        </span>
                      </div>
                      <select
                        className="custom-select"
                        id="patientByYearID"
                        aria-label="Example select with button addon"
                        onChange={this.handleOnChangeYear}
                        value={this.state.yearValue}
                      >
                        {years.map(function(x, index) {
                          return (
                            <option key={index} value={x.year}>
                              {x.year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">{totalPatientPerMonthYear} patient(s) in {this.state.monthValue} {this.state.yearValue}</h5>
                <ResponsiveContainer className="container" height={400}>
                  <BarChart
                    width={500}
                    height={300}
                    data={patientMonthlyData}
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
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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

export default MainContent;
