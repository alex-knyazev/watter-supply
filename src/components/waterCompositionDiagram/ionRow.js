import React from 'react';

import { IonBlock } from './ionBlock';

export function IonRow(props) {
  const { ions, maxIonsTypeMass, verticalPartNumber } = props;

  let verticalOffsetPercents;
  switch (verticalPartNumber) {
    case 1:
      verticalOffsetPercents = 25;
      break;
    case 2:
      verticalOffsetPercents = 50;
      break;
    default:
      break;
  }

  let summOfPreviousOffsets = 0;

  const IonsBlocks = ions.map((ion) => {
    const percentFromAllIonsOfType = parseFloat(
      ((ion.equivalentMass / maxIonsTypeMass) * 100).toFixed(3),
    );

    const block = (
      <IonBlock
        key={ion.name}
        ion={ion}
        widthInPercents={percentFromAllIonsOfType * 0.8}
        verticalOffsetPercents={verticalOffsetPercents}
        verticalPartNumber={verticalPartNumber}
        horizontalOffsetPercents={summOfPreviousOffsets * 0.8}
        horizontalPartNumber={summOfPreviousOffsets >= 50 ? 1 : 2}
      />
    );
    summOfPreviousOffsets += percentFromAllIonsOfType;

    return block;
  });

  return (
    <g
      style={{
        transform: `translate(10%, ${verticalOffsetPercents}%)`,
      }}
    >
      {IonsBlocks}
    </g>
  );
}

// const [isIonOutsideOfRectangle, setisIonOutsideOfRectangle] = useState(false);
// const [ionLabelsMovingInfo, setIonLabelsMovingInfo] = useState({
//   isMoving: false,
//   // center of ion rectangle after component first render
//   defaultPoint: {
//     x: 0,
//     y: 0,
//   },
//   // center of rectangle at last moving starting
//   startPoint: {
//     x: 0,
//     y: 0,
//   },
//   // diff between start point and current point in process of moving
//   offset: {
//     x: 0,
//     y: 0,
//   },
// });

// const rectangleElRef = useRef(null);
// const ionNameElRef = useRef(null);

// // effect on first mount
// useEffect(() => {
//   setDefaultPoint();
// }, []);

// // effect of rerender when important props are changed
// useEffect(() => {
//   const rectangleEl = rectangleElRef.current;
//   const ionNameEl = ionNameElRef.current;
//   const { width: rectangleWidth } = rectangleEl.getBoundingClientRect();
//   const { width: ionNameWidth } = ionNameEl.getBoundingClientRect();
//   const diff = rectangleWidth - ionNameWidth;
//   if (diff < 30) {
//     setisIonOutsideOfRectangle(true);
//   } else {
//     setisIonOutsideOfRectangle(false);
//   }
// }, [ion.equivalentMass, percentFromAllIonsOfType]);

// const setDefaultPoint = () => {
//   const ionNameEl = ionNameElRef.current;
//   const rect = ionNameEl.getBoundingClientRect();
//   setIonLabelsMovingInfo({
//     ...ionLabelsMovingInfo,
//     defaultPoint: {
//       x: rect.x + rect.width / 2,
//       y: rect.y + rect.height / 2,
//     },
//   });
// };

// const ionElementsText = ion.compound.elementsList.join('');
// const lastElementName = ion.compound.elementsList[ion.compound.elementsList.length - 1];
// const amountOfLastElement = ion.compound.elements[lastElementName];

// const ionNameStyle = {
//   cursor: isIonOutsideOfRectangle ? 'pointer' : 'default',
// };
