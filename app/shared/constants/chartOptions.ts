import { AgChartOptions } from "ag-charts-community";

export const pieChartOptions = (pieChartData: any[]): AgChartOptions => {
  return {
    theme: 'ag-default-dark',
    data: pieChartData,
    title: {
      text: "Resource Type Composition",
    },
    background: {
      fill: '#0a1120',
    },
    series: [
      {
        type: "pie",
        angleKey: "value",
        legendItemKey: "name",
      },
    ],
  };
};

export const barChartOptions = (barCharData: any[]): AgChartOptions => {
  return {
    theme: 'ag-default-dark',
    data: barCharData,
    title: {
      text: "Total Size by Resource Type",
    },
    background: {
      fill: '#0a1120',
    },
    overlays: {
      loading: {
        text: 'Some custom loading message',
      },
      noData: {
        text: 'Some custom noData message',
      },
      noVisibleSeries: {
        text: 'Some custom noVisibleSeries message',
      },
    },
    series: [
      {
        type: "bar",
        xKey: "name",
        yKey: "value",
        yName: "Total Size (Kb)"
      }
    ]
  }
};

export const scatterChartOptions = (scatterCharData: any[]): AgChartOptions => {
  return {
    theme: 'ag-default-dark',
    data: scatterCharData,
    title: {
      text: "Loading Time vs Size",
    },
    background: {
      fill: '#0a1120',
    },
    series: [
      {
        type: "scatter",
        xKey: "x",
        yKey: "y",
        xName: "Loading Time (sec)",
        yName: "Size (Kb)",
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: {
          text: "Loading Time (sec)",
        },
        label: {
          formatter: (params) => {
            return params.value.toFixed(2);
          },
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Size (Kb)",
        },
        label: {
          formatter: (params) => {
            return params.value.toFixed(2); // Assuming 'y' represents size in kilobytes
          },
        },
      },
    ],
  }
};

export const resourceTypeTimeBarChartOptions = (barCharData: any[]): AgChartOptions => {
  return {
    theme: 'ag-default-dark',
    data: barCharData,
    title: {
      text: "Total Time by Resource Type",
    },
    background: {
      fill: '#0a1120',
    },
    overlays: {
      loading: {
        text: 'Some custom loading message',
      },
      noData: {
        text: 'Some custom noData message',
      },
      noVisibleSeries: {
        text: 'Some custom noVisibleSeries message',
      },
    },
    series: [
      {
        type: "bar",
        xKey: "name",
        yKey: "value",
        yName: "Total Time (s)"
      }
    ]
  }
};