import React from "react";

import { IonName } from "./ionName";

import "./index.css";

function WaterCompositionInputs(props) {
  const { waterCompositionData, onConcentrationChange } = props;
  const { kations, anions } = waterCompositionData;

  const kationsListItems = kations.map(kation => {
    return (
      <li className="ionBlock">
        <p className="ionName">
          <IonName ion={kation} size="small" />
        </p>
        <input
          className="ionInput"
          type="number"
          onChange={e =>
            onConcentrationChange(kation, parseFloat(e.target.value))
          }
          min="0"
          step="50"
          value={kation.concentration}
        />
      </li>
    );
  });

  const anionsListItems = anions.map(anion => {
    return (
      <li className="ionBlock">
        <p className="ionName">
          <IonName ion={anion} size="small" />
        </p>
        <input
          className="ionInput"
          type="number"
          step="50"
          min="0"
          onChange={e =>
            onConcentrationChange(anion, parseFloat(e.target.value))
          }
          value={anion.concentration}
        />
      </li>
    );
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        fontFamily: "monospace"
      }}
      className="WaterCompositionInputs"
    >
      <div>
        kations:
        <ul className="inputsList">{kationsListItems}</ul>
      </div>
      <div>
        anions:
        <ul className="inputsList">{anionsListItems}</ul>
      </div>
    </div>
  );
}

export default WaterCompositionInputs;
