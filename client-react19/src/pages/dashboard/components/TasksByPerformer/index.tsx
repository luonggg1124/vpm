import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import { cn } from "../../../../lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {  CalendarIcon } from "lucide-react";
const TasksByPerformer: React.FC = () => {
  const [date, setDate] = React.useState();
  const completedJobs = [3, 3, 3, 3, 3];

  // Calculate the average of completed jobs
  const averageCompleted =
    completedJobs.reduce((sum, value) => sum + value, 0) / completedJobs.length;
  const [state, setState] = React.useState({
    series: [
      {
        name: "Hoàn thành",
        data: [3, 3, 3, 3, 3],
      },
      {
        name: "Chưa hoàn thành",
        data: [7, 7, 7, 7, 7],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
      },
    },
    colors: ["#039855", "#D3D3D3"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val > 0 ? val : "";
      },
      style: {
        colors: ["#000"],
        fontSize: "12px",
      },
    },
    xaxis: {
      categories: [
        "Nguyen Viet V",
        "Nguyen Viet V",
        "Nguyen Viet V",
        "Nguyen Viet V",
        "Nguyen Viet V",
      ],
      title: {
        text: "Số lượng công việc",
        style: {
          colors: ["#344054"],
          fontSize: "10px",
          font: "Inter",
        },
      },
      max: 10,
      tickAmount: 10,
    },
    yaxis: {
      title: {
        text: "",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        const seriesIndex = opts.seriesIndex;

        if (seriesIndex === 0) {
          return `${val} Trung bình Hoàn thành (${averageCompleted})`;
        }

        return val > 0 ? val : "";
      },
      style: {
        colors: ["#344054"],
        fontSize: "10px",
        font: "Inter",
      },
      offsetX: -10,
      textAnchor: "start",
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + " công việc";
        },
      },
    },
  });

  return (
    <div>
      <div className="flex justify-end px-4">
        <div className="w-[35%]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date
                  ? format(date, "d 'ngày' 'gần đây'", { locale: vi })
                  : "7 ngày gần đây"}
                <CalendarIcon className="size-4 text-black" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={(date) => setDate(date as any)} className="border-0" />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          options={state as any}
          series={state.series as any}
          type="bar"
          height={440}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
export default TasksByPerformer;
