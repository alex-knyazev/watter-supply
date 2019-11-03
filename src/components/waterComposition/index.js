import React, { useState } from "react";

import { waterComposition } from "../../ionsData";
import WaterCompositionDiagram from "../waterCompositionDiagram";
import WaterCompositionInputs from "../waterCompositionInputs";

import "./index.css";

export function WaterComposition() {
  const { kations, anions } = waterComposition;

  const [waterCompositionData, setWaterCompositionData] = useState({
    kations,
    anions
  });

  function onConcentrationChange(ion, concentration) {
    const { kations, anions } = waterCompositionData;

    const newWaterCompositionData = {
      kations,
      anions
    };

    if (ion.type === "kation") {
      const kation = newWaterCompositionData.kations.find(
        kation => kation.name === ion.name
      );
      kation.setConcentration(concentration);
    }
    if (ion.type === "anion") {
      const anion = newWaterCompositionData.anions.find(
        anion => anion.name === ion.name
      );
      anion.setConcentration(concentration);
    }

    setWaterCompositionData(newWaterCompositionData);
  }

  return (
    <div className="waterComposition">
      <WaterCompositionInputs
        onConcentrationChange={onConcentrationChange}
        waterCompositionData={waterCompositionData}
      />
      <WaterCompositionDiagram waterCompositionData={waterCompositionData} />
    </div>
  );
}
