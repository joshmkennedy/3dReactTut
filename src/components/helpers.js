import React, { useState } from "react";

export function useValues(numberOfControls) {
  const array = [];
  array.length = numberOfControls;
  array.fill(0);

  const [values, setValues] = useState(array);

  return [setValues, ...values];
}
export const RangeController = ({ values = [], setValues }) => {
  return (
    <div className="controls" style={{ position: "fixed", top: 0, left: 0 }}>
      {values.map((value, index) => (
        <input
          key={index}
          type="range"
          min={-50}
          max={50}
          value={value}
          onChange={(e) => {
            e.persist();
            setValues((prev) => {
              const values = [...prev];
              values[index] = e.target.value;
              return values;
            });
          }}
        />
      ))}
    </div>
  );
};
