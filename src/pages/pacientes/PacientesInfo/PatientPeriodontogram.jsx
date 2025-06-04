import React, { useState } from "react";
import periodontogramImage from "../../../images/periodontograma/periodontograma.png"; // Tu imagen

const upperTeeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerTeeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

function initToothData() {
  const data = {};
  [...upperTeeth, ...lowerTeeth].forEach(n => {
    data[n] = {
      movilidad: '',
      implante: false,
      furca: '',
      sangrado: [false, false, false],
      placa: [false, false, false],
      margen: ['', '', ''],
      sondaje: ['', '', ''],
      nota: ''
    };
  });
  return data;
}

export default function PatientPeriodontogram() {
  const [teeth, setTeeth] = useState(initToothData());

  const handleChange = (tooth, field, value) => {
    setTeeth(prev => ({
      ...prev,
      [tooth]: { ...prev[tooth], [field]: value }
    }));
  };

  // Helpers para grids
  const inputGrid = (arr, onChange, color) => (
    <div className="flex gap-1 justify-center">
      {arr.map((v, i) => (
        <div
          key={i}
          onClick={() => onChange(i, !v)}
          className={`w-5 h-5 border rounded cursor-pointer transition 
            ${v ? color : "bg-gray-100 hover:bg-gray-200"}`}
        />
      ))}
    </div>
  );
  const numberGrid = (arr, onChange) => (
    <div className="flex gap-1 justify-center">
      {arr.map((v, i) => (
        <input
          key={i}
          type="number"
          value={v}
          onChange={e => onChange(i, e.target.value)}
          className="w-4 text-xs border rounded text-center px-0.5 py-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          style={{ minWidth: 20 }}
          placeholder="-"
        />
      ))}
    </div>
  );

  function TeethTable({ arcada }) {
    const teethRow = arcada === "superior" ? upperTeeth : lowerTeeth;
    
    const rowOrder = [
      { label: "Movilidad", field: "movilidad", type: "cycle-select", options: ["", "Grado 1", "Grado 2", "Grado 3"] },
      { label: "Implante", field: "implante", type: "checkbox" },
      { label: "Furcación", field: "furca", type: "cycle-select", options: ["", "1", "2", "3"] },
      { label: "Sangrado", field: "sangrado", type: "bool3", color: "bg-red-400" },
      { label: "Placa", field: "placa", type: "bool3", color: "bg-blue-400" },
      { label: "MG", field: "margen", type: "number3" },
      { label: "PS", field: "sondaje", type: "number3" },
    ];

    const displayedRows = arcada === "superior" ? rowOrder : [...rowOrder].reverse();

    const handleCycleSelect = (tooth, field, currentValue, options) => {
        const currentIndex = options.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % options.length;
        const nextValue = options[nextIndex];
        handleChange(tooth, field, nextValue);
    };

    return (
      <table className="min-w-full border-separate border-spacing-y-1 table-fixed">
        <thead>
          <tr>
            <th className="bg-transparent"></th>
            {teethRow.map(n => (
              <th key={n} className="text-xs text-blue-800 font-bold py-1">{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row) => (
            <tr key={row.label}>
              <td className="text-right pr-1 text-gray-600 text-xs">{row.label}</td>
              {teethRow.map(n => (
                <td key={n}>
                  {row.type === "select" && (
                    <select
                      value={teeth[n][row.field]}
                      onChange={e => handleChange(n, row.field, e.target.value)}
                      className="w-10 text-xs border px-1 py-0 rounded bg-white"
                    >
                      {row.options.map(opt => (
                        <option key={opt} value={opt}>
                          {row.field === "furca" && opt === "1" ? "○"
                          : row.field === "furca" && opt === "2" ? "◐"
                          : row.field === "furca" && opt === "3" ? "●"
                          : opt || "-"}
                        </option>
                      ))}
                    </select>
                  )}
                  {row.type === "checkbox" && (
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={teeth[n][row.field]}
                        onChange={e => handleChange(n, row.field, e.target.checked)}
                        className="w-4 h-4 accent-blue-500"
                      />
                    </div>
                  )}
                  {row.type === "bool3" && inputGrid(
                    teeth[n][row.field],
                    (i, val) => {
                      const arr = [...teeth[n][row.field]];
                      arr[i] = val;
                      handleChange(n, row.field, arr);
                    },
                    row.color
                  )}
                  {row.type === "number3" && numberGrid(
                    teeth[n][row.field],
                    (i, val) => {
                      const arr = [...teeth[n][row.field]];
                      arr[i] = val;
                      handleChange(n, row.field, arr);
                    }
                  )}
                  {row.type === "cycle-select" && (
                    <div
                      className="w-10 h-6 text-xs border rounded flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100"
                      onClick={() => handleCycleSelect(n, row.field, teeth[n][row.field], row.options)}
                    >
                       {/* Display logic for cycle-select */}
                      {row.field === "furca" && teeth[n][row.field] === "1" ? "○"
                       : row.field === "furca" && teeth[n][row.field] === "2" ? "◐"
                       : row.field === "furca" && teeth[n][row.field] === "3" ? "●"
                       : teeth[n][row.field] || "-"}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // Mapa aproximado para números sobre los dientes (ajusta top/left a tu imagen)
  const toothNumberPosition = {
    ...Object.fromEntries(upperTeeth.map((n, i) => [n, { top: "8%", left: `${3 + i * 6}%` }])),
    ...Object.fromEntries(lowerTeeth.map((n, i) => [n, { top: "84%", left: `${3 + i * 6}%` }]))
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4 bg-gray-50">
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
      <div className=" w-full mx-auto px-1 md:px-4">
        <div className="overflow-x-auto rounded-lg bg-white p-4 shadow border">
          <TeethTable arcada="superior" />
          <div className="relative flex justify-center my-2">
            <img
              src={periodontogramImage}
              alt="Periodontograma"
              className=" w-full bg-white rounded-xl shadow border"
              draggable={false}
            />
            {/* Overlay de números */}
            {Object.entries(toothNumberPosition).map(([n, pos]) => (
              <span
                key={n}
                style={{
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  transform: "translate(-50%, -50%)",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#2233aa",
                  textShadow: "0 1px 4px #fff"
                }}
                pointerEvents="none"
              >{n}</span>
            ))}
          </div>
          <TeethTable arcada="inferior" />
        </div>
      </div>
    </div>
  );
}
