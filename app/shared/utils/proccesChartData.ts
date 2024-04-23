import { HarDataRow } from "../types/HarData";
import { convertBytesToKilobytes, convertMillisecondsToSeconds, formatBytes } from "./formatData";

export const processDataForPieChart = (harData: HarDataRow[]) => {
    const resourceTypeCount: Record<string, number> = {};
    harData.forEach((data) => {
        const resourceType = data._resourceType;

        resourceTypeCount[resourceType] = (resourceTypeCount[resourceType] || 0) + 1;
    });

    const chartData = Object.entries(resourceTypeCount).map(([name, value]) => ({
        name,
        value,
    }));

    return chartData;
};

export const processDataForBarChart = (harData: HarDataRow[]) => {
    const resourceTypeTotalSize: Record<string, number> = {};

    harData.forEach((data) => {
        const resourceType = data._resourceType;
        const size = convertBytesToKilobytes(data.response._transferSize); // Updated property accessor

        resourceTypeTotalSize[resourceType] = (resourceTypeTotalSize[resourceType] || 0) + size;
    });

    const chartData = Object.entries(resourceTypeTotalSize).map(([name, value]) => ({
        name,
        value,
        formattedValue: formatBytes(value, 2),
    }));

    return chartData;
};

export const processDataForScatterChart = (harData: HarDataRow[]) => {
    const chartData = harData.map((data) => ({
        x: convertMillisecondsToSeconds(data.time),
        y: convertBytesToKilobytes(data.response._transferSize), // Updated property accessor
    }));
    return chartData;
};

export const processDataForBarChartResourceTypeTime = (harData: HarDataRow[]) => {
    const resourceTypeTotalTime: Record<string, number> = {};

    harData.forEach((data) => {
        const resourceType = data._resourceType;
        const timeInSeconds = convertMillisecondsToSeconds(data.time);

        resourceTypeTotalTime[resourceType] = (resourceTypeTotalTime[resourceType] || 0) + timeInSeconds;
    });

    const chartData = Object.entries(resourceTypeTotalTime).map(([name, value]) => ({
        name,
        value,
        formattedValue: `${value.toFixed(2)}s`, // Format time as seconds with two decimal places
    }));

    return chartData;
};
