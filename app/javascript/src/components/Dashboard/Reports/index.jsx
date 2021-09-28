import React, { useEffect, useState } from "react";

import attemptsApi from "apis/attempts";

import ReportsDownload from "./ReportsDownload";
import ReportsTable from "./ReportsTable";

import Button from "../../Common/Button";
import PageLoader from "../../Common/PageLoader";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState([]);

  const [downloadId, setDownloadId] = useState("");
  const fetchAttempts = async () => {
    try {
      const res = await attemptsApi.list();
      setAttempts(res.data.attempts);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAttempts();
  }, []);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await attemptsApi.download_start();
      setDownloadId(res.data.download_id);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="w-4/5 m-auto flex justify-between">
        <h1 className="text-4xl font-bold">Reports</h1>
        <div className="w-1/5 flex justify-end items-end">
          <Button buttonText="Download" onClick={handleDownload} />
        </div>
      </div>
      {loading ? (
        <PageLoader />
      ) : downloadId ? (
        <ReportsDownload downloadId={downloadId} />
      ) : (
        <ReportsTable attempts={attempts} />
      )}
    </div>
  );
};

export default Reports;
