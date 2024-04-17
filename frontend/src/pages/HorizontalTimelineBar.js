

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HorizontalTimelineBar.css";

export default function HorizontalTimelineBar() {
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9090/times");
      setSampleData(response.data.data);
      console.log("Fetched data:", response.data.data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
    }
  };

  
  let labels = [];
  if (sampleData.length > 0) {
    // extracted first and last timestamps as it is
    labels.push(sampleData[0].ts.slice(11, 19)); // first timestamp

    // middle labels
    const startHour = parseInt(sampleData[0].ts.slice(11, 13));
    const endHour = parseInt(
      sampleData[sampleData.length - 1].ts.slice(11, 13)
    );
    const startMinute = parseInt(sampleData[0].ts.slice(14, 16));
    const endMinute = parseInt(
      sampleData[sampleData.length - 1].ts.slice(14, 16)
    );

    
    for (
      let hour = startHour + 1;
      hour <= endHour && startMinute < endMinute;
      hour++
    ) {
      labels.push(`${hour}:00:00`);
    }

    labels.push(sampleData[sampleData.length - 1].ts.slice(11, 19)); // last timestamp
  }

  return (
    <div>
      <h5>Cycle Status</h5>
      <div className="horizontal-timeline-outerlayer">
        <div className="horizontal-timeline-bar">
          {sampleData.map((data, index) => {
            const timestamp = new Date(data.ts); 
            const previousTimestamp =
              index > 0 ? new Date(sampleData[index - 1].ts) : null; // Get previous timestamp
            const timeDifference = previousTimestamp
              ? timestamp.getTime() - previousTimestamp.getTime()
              : null; 
            const isContinuous =
              timeDifference !== null &&
              timeDifference >= 950 &&
              timeDifference <= 1050;
            // determine color based on machine status
            let colorClass = "";
            if (index === 0 || !isContinuous) {
              colorClass = "red"; 
            } else {
              colorClass = data.machine_status === 1 ? "green" : "yellow"; // green for 1, yellow for 0 amd red for missing
            }
            return (
              <div
                key={index}
                className={`timeline-bar ${colorClass}`}
                style={{ width: `${100 / sampleData.length}%` }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="labels-outerlayer">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`label ${
              index === 0
                ? "first-label"
                : index === labels.length - 1
                ? "last-label"
                : ""
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
