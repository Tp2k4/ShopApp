import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartData {
  name: string;
  value: number;
}

interface ColumnChartProps {
  data: ChartData[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: data.map((item) => item.name),
      crosshair: true,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
      lineColor: "var(--line-color)",
      lineWidth: 0.5,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
      gridLineColor: "var(--line-color)",
      gridLineWidth: 0.5,
    },
    series: [
      {
        name: "",
        type: "column",
        color: "var(--primary-color)",
        data: data.map((item) => item.value),
        showInLegend: false,
        pointWidth: 16,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ColumnChart;
