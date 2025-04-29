import React from "react";
import ReactApexChart from "react-apexcharts";

const ProjectQuantity: React.FC = () => {
  const [state, setState] = React.useState({
    series: [
      {
        data: [21, 22, 10, 28, 16],
      },
    ],
    options: {
      chart: {
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
            // console.log(chart, w, e)
          },
        },
      },

      plotOptions: {
        bar: {
          columnWidth: "20%",
          distributed: true,
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          "Nguyễn Văn A",
          "Nguyễn Văn A",
          "Nguyễn Văn A",
          "Nguyễn Văn A",
          "Nguyễn Văn A",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
    },
  });
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options as any}
          series={state.series}
          type="bar"
          height={470}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
export default ProjectQuantity;
