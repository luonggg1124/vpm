import React from "react";
import ReactApexChart from "react-apexcharts";

const TaskQuantity: React.FC = () => {
 
  const options = {
    series: [
      {
        name: "Tổng số công việc",
        data: [10, 50, 75, 50, 25, 60],
      },
      {
        name: "Hoàn thành",
        data: [5, 25, 25, 15, 10, 15],
      },
    ],
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ["#CCEAFF", "#A7DADD"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      title: {
        text: "",
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: {
        width: 12,
        height: 12,
        radius: 0,
      },
    },
    grid: {
      borderColor: "#e7e7e7",
    },
    tooltip: {
      y: {
        formatter: function (val: string | number) {
          return val + " công việc";
        },
      },
    },
  };

  return (
    <div>
     
      <ReactApexChart
        options={options as any}
        series={options.series}
        type="area"
        height={470}
      />
    </div>
  );
};
export default TaskQuantity;
