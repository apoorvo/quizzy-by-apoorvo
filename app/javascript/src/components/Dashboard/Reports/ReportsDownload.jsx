import { BASE_URL } from "constants";

import React, { useEffect, useState } from "react";

import FadeLoader from "react-spinners/FadeLoader";

import attemptsApi from "apis/attempts";

import Button from "../../Common/Button";

const ReportsDownload = ({ downloadId }) => {
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const fetchDownloadStatus = async () => {
    try {
      const res = await attemptsApi.download_status(downloadId);
      setDownloadCompleted(res.data.status);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    const downloadInterval = setInterval(fetchDownloadStatus, 5000);
    if (downloadCompleted) {
      clearInterval(downloadInterval);
    }
    return () => {
      clearInterval(downloadInterval);
    };
  }, [downloadCompleted]);

  return (
    <div className="flex flex-col h-40 justify-center items-center">
      {downloadCompleted ? (
        <div className="mt-10">
          <h1>Report is now ready for download.</h1>
          <div>
            <a
              href={`${BASE_URL}/attempts/download/${downloadId}.csv`}
              target="_blank"
              rel="noreferrer"
            >
              <Button buttonText="Download report" />
            </a>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <FadeLoader color="#2086c7" />
          <h1 className="text-xl">
            Your report is being prepared for downloading
          </h1>
        </div>
      )}
    </div>
  );
};

export default ReportsDownload;
