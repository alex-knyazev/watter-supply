import React, { useRef } from "react";
import { IonBlock } from "./ionBlock";

export function IonRow(props) {
  const { ions, maxIonsTypeMass, half, labelsPosition } = props;

  let verticalOffset;
  switch (half) {
    case 1:
      verticalOffset = 25;
      break;
    case 2:
      verticalOffset = 50;
      break;
    default:
      break;
  }

  let summOfPreviousOffsets = 0;

  const IonsBlocks = ions.map(ion => {
    const percentFromAllIonsOfType = parseFloat(
      ((ion.equivalentMass / maxIonsTypeMass) * 100).toFixed(3)
    );
    const block = (
      <IonBlock
        ion={ion}
        percentFromAllIonsOfType={percentFromAllIonsOfType}
        labelsPosition={labelsPosition}
        verticalOffset={verticalOffset}
        summOfPreviousOffsets={summOfPreviousOffsets}
      />
    );
    summOfPreviousOffsets += percentFromAllIonsOfType;
    return block;
  });

  return (
    <g
      style={{
        transform: `translate(0%, ${verticalOffset}%)`
      }}
    >
      {IonsBlocks}
    </g>
  );
}
