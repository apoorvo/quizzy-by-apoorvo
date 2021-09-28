import React, { useEffect, useState } from "react";

import attemptsApi from "apis/attempts";

import ReportsTable from "./ReportsTable";

import Button from "../../Common/Button";
import PageLoader from "../../Common/PageLoader";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState([]);

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

  return (
    <div className="p-4 space-y-4">
      <div className="w-4/5 m-auto flex justify-between">
        <h1 className="text-4xl font-bold">Reports</h1>
        <div className="w-1/5 flex justify-end items-end">
          <Button buttonText="Download" />
        </div>
      </div>
      {loading ? <PageLoader /> : <ReportsTable attempts={attempts} />}
    </div>
  );
};

export default Reports;
