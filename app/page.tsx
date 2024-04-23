'use client'

import { AgChartsReact } from 'ag-charts-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { motion } from 'framer-motion';
import React, { useCallback, useRef, useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { FaFileExcel, FaRegTrashAlt } from "react-icons/fa";
import Glossary from './components/Glossary';
import LoadingComponent from "./components/Loading";
import SeparatorLine from './components/SeparatorLine';
import { columnDefs } from './shared/constants/agGridDefs';
import { barChartOptions, pieChartOptions, resourceTypeTimeBarChartOptions, scatterChartOptions } from "./shared/constants/chartOptions";
import useExcelExport from './shared/hooks/useExcelExport';
import { HarDataRow } from './shared/types/HarData';
import { processDataForBarChart, processDataForBarChartResourceTypeTime, processDataForPieChart, processDataForScatterChart } from "./shared/utils/proccesChartData";
import LoadingProgressComponent from './components/LoadingProgress';

export default function Home() {
  const [data, setData] = useState<HarDataRow[]>([]);
  const [harFile, setHarFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeChart, setActiveChart] = useState('pie');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(true);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const gridRef = useRef<AgGridReact | null>(null);

  const harData: HarDataRow[] = data;
  const pieCharData = processDataForPieChart(harData);
  const barCharData = processDataForBarChart(harData).filter(entry => entry.value > 0);
  const barCharTimeResourceTypeData = processDataForBarChartResourceTypeTime(harData).filter(entry => entry.value > 0);
  const scatterCharData = processDataForScatterChart(harData);
  const { exportToExcel } = useExcelExport();

  const { edgestore } = useEdgeStore();

  const handleExportClick = () => {
    exportToExcel(data, harFile);
  };

  const onGridReady = useCallback(() => {
    if (gridRef.current && data.length === 0) {
      const fakeEvent: any = {
        target: {
          files: [new File([''], 'fakefile')],
        },
      };
      handleFileChange(fakeEvent);
    }
  }, [data, gridRef]);


  const chartOptions: { [key: string]: any | any } = {
    pie: pieChartOptions(pieCharData),
    bar: barChartOptions(barCharData),
    barTime: resourceTypeTimeBarChartOptions(barCharTimeResourceTypeData),
    scatter: scatterChartOptions(scatterCharData),
  }

  const switchToChart = (chartType: any) => {
    setActiveChart(chartType);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!file.name.endsWith('.har')) {
        const errorMessage = 'Invalid file format. Please upload a .har file.';
        console.error(errorMessage);
        setErrorMessage(errorMessage);
        return;
      }

      setHarFile(file);
      setLoading(true);

      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress)
          },
          options: {
            temporary: true,
          },
        });

        setFileUrl(res.url)
        const response = await fetch(res.url);
        const harDataResponse = await response.json();

        const entries = harDataResponse.log.entries;

        setData(entries);
      } catch (error) {
        console.error('Error uploading .har file:', error);
        setErrorMessage('Error uploading .har file');
      } finally {
        setIsGlossaryOpen(false);
        setLoading(false);
      }
    }
  };

  const handleClearFile = async () => {
    setHarFile(null);
    setData([]);
    setErrorMessage(null);
    setIsGlossaryOpen(true);

    const res = await edgestore.publicFiles.delete({
      url: fileUrl,
    });

    setFileInputKey((prevKey) => prevKey + 1);
  };

  const handleFileChangeFromDrop = async (file: File | null) => {
    if (file === null) {
      console.error('No file dropped.');
      return;
    }

    setErrorMessage(null);

    if (!file.name.endsWith('.har')) {
      const errorMessage = 'Invalid file format. Please upload a .har file.';
      console.error(errorMessage);
      setErrorMessage(errorMessage);
      return;
    }

    setHarFile(file);
    setLoading(true);

    const formData = new FormData();
    formData.append('harFile', file);

    try {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
        options: {
          temporary: true,
        },
      });

      setFileUrl(res.url);
      const response = await fetch(res.url);
      const harDataResponse = await response.json();

      const entries = harDataResponse.log.entries;

      setData(entries);
    } catch (error) {
      console.error('Error uploading .har file:', error);
      setErrorMessage('Error uploading .har file');
    } finally {
      setIsGlossaryOpen(false);
      setLoading(false);
    }
  };

  const handleFileDragEnter = () => {
    const uploadContainer = document.getElementById('file-upload-container');
    if (uploadContainer) {
      uploadContainer.classList.add('bg-gray-700');
    }
  };

  const handleFileDragLeave = () => {
    const uploadContainer = document.getElementById('file-upload-container');
    if (uploadContainer) {
      uploadContainer.classList.remove('bg-gray-700');
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileDragLeave();

    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      handleFileChangeFromDrop(file);
    }
  };

  return (
    <motion.div
      className="bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="container mx-auto p-10"
        id="file-upload-container"
        onDragEnter={handleFileDragEnter}
        onDragLeave={handleFileDragLeave}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleFileDrop}
      >
        <div className="border-dashed border-2 border-gray-700 rounded p-4 mb-5">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Supercharge Your Performance</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-4">
              Upload your .har file and analyze performance metrics.
            </p>
            <div className="flex md:flex-row gap-4 items-center">
              <input
                key={fileInputKey}
                type="file"
                accept=".har"
                onChange={handleFileChange}
                className="p-2 border rounded bg-gray-800 text-white"
              />
              {(harFile || errorMessage) && (
                <motion.button
                  onClick={handleClearFile}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white p-2 rounded shadow-md mt-2 md:mt-0"
                >
                  <FaRegTrashAlt />
                </motion.button>
              )}
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
            )}
            <p className="text-xs md:text-sm lg:text-base text-gray-500 mt-2">
              <strong>Drag and drop</strong> your .har file here
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingProgressComponent progress={progress} />
        ) : harFile ? (
          <>
            <>
              <div className="ag-theme-alpine-dark" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={data}
                  pagination={true}
                  paginationPageSize={20}
                  onGridReady={onGridReady}
                />
              </div>
            </>

            {Object.keys(chartOptions).map((chartType) => (
              <div key={chartType} className={`mt-4 ${activeChart === chartType ? '' : 'hidden'}`}>
                <AgChartsReact options={chartOptions[chartType]} />
              </div>
            ))}
            <div className="mt-4 flex items-center justify-center space-x-4">
              {Object.keys(chartOptions).map((chartType) => (
                <motion.button
                  key={chartType}
                  onClick={() => switchToChart(chartType)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  className={`w-6 h-6 rounded-full focus:outline-none transition-all ${activeChart === chartType ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center">
                  <motion.button
                    onClick={handleExportClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white p-2 rounded shadow-md flex items-center"
                  >
                    <span className="text-sm md:text-base lg:text-base xl:text-base">Export to Excel</span>
                    <FaFileExcel className="ml-2 text-xl md:text-2xl lg:text-3xl" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
        <SeparatorLine />
        <Glossary isOpen={isGlossaryOpen} />
      </div>
    </motion.div>
  );
}
