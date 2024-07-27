import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const BarChart = ({
  data1,
  nameData1,
  data2,
  nameData2,
  title,
  categories,
  total,
}) => {
  const series = [
    {
      name: nameData1,
      color: "#1A56DB",
      data: data1,
    },
  ];

  if (nameData2 && data2) {
    series.push({
      name: nameData2,
      color: "#FDBA8C",
      data: data2,
    });
  }

  const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: series,
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
      formatter: function (value) {
        return "$" + value;
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#020617",
          fontSize: "8px",
          fontFamily: "inherit",
          fontWeight: 800,
        },
      },
      categories: categories,
    },
    yaxis: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(
      document.getElementById("column-chart"),
      options
    );
    chart.render();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [total]);

  return (
    <>
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 19"
            >
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm sm:text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h5>
          </div>
        </div>
        <div>
          <span className="bg-green-100 text-green-800 text-xs sm:text-xl font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            {total}
          </span>
        </div>
      </div>
      <div id="column-chart"></div>
    </>
  );
};

export default BarChart;
