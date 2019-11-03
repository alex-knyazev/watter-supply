import React from "react";
import { Decimal } from "decimal.js";

import { IonRow } from "./ionRow";

function findCumulativeEquivalentMassOfIons(ions) {
  return ions.reduce((current, ion) => {
    return current.plus(ion.equivalentMass);
  }, new Decimal(0));
}

function WaterCompositionDiagram(props) {
  const { waterCompositionData } = props;

  const { kations, anions } = waterCompositionData;

  const notNullKations = kations.filter(kation => kation.equivalentMass > 0);
  const notNullAnions = anions.filter(anions => anions.equivalentMass > 0);

  const kationsEquivalentMass = findCumulativeEquivalentMassOfIons(
    notNullKations
  );
  const anionsEquivalentMass = findCumulativeEquivalentMassOfIons(
    notNullAnions
  );
  const maxIonsTypeMass = Math.max(kationsEquivalentMass, anionsEquivalentMass);

  return (
    <div
      style={{
        display: "block",
        fontFamily: "monospace"
      }}
      className="WaterCompositionDiagram"
    >
      <svg
        style={{
          display: "block"
        }}
        width="900px"
        height="400px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          style={{
            transform: "translate(0%, 0%)"
          }}
        ></g>
        <IonRow
          half={1}
          labelsPosition="top"
          type="kations"
          maxIonsTypeMass={maxIonsTypeMass}
          ions={notNullKations}
        />
        <IonRow
          half={2}
          labelsPosition="bottom"
          type="anions"
          maxIonsTypeMass={maxIonsTypeMass}
          ions={notNullAnions}
        />
      </svg>
    </div>
  );
}

export default WaterCompositionDiagram;
