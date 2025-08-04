import supabase from "../supabase-client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Form from "../components/form";

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchMetrics();

    const channel = supabase
      .channel("deal-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sales_deals",
        },
        (payload) => {
          fetchMetrics();
        }
      )
      .subscribe();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchMetrics() {
    try {
      const { data, error } = await supabase.from('sales_deals').select(
        `
        value.sum(),
        ...user_profiles!inner(
        name
        )
        `,
      )
      if (error) {
        throw error;
      }

      console.log(data);
      setMetrics(data);
    } catch (error) {
      console.error("error in fetching metrics", error);
    }
  }

  function y_max() {
    if (metrics.length > 0) {
      const maxSum = Math.max(...metrics.map((m) => m.sum || 0));
      return maxSum + 2000;
    }
    return 5000;
  }

  return (
    <div
      className="dashboard-wrapper"
      role="region"
      aria-label="Sales dashboard"
    >
      <div
        className="chart-container"
        role="region"
        aria-label="Sales chart and data"
      >
        <h3>Total Sales This Quarter ($)</h3>
        <div style={{ flex: 1, width: "100%", height: "300px" }}>
          <ResponsiveContainer>
            <BarChart
              data={metrics}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[0, y_max()]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sum" fill="#58d675" name="Total Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Form />
      </div>
    </div>
  );
}
