import React, { useRef, useEffect, useState } from 'react';

const IonBlockOutsideOfRectangle = (props) => {
  const {
    ion,
    widthInPercents,
    verticalOffsetPercents,
    verticalPartNumber,
    horizontalOffsetPercents,
    handleNameInRectangle,
  } = props;

  const [ionLabelsMovingInfo, setIonLabelsMovingInfo] = useState({
    isMoving: false,
    // center of ion rectangle after component first render
    defaultPoint: {
      x: 0,
      y: 0,
    },
    // center of rectangle at last moving starting
    startPoint: {
      x: 0,
      y: 0,
    },
    // diff between start point and current point in process of moving
    offset: {
      x: horizontalOffsetPercents > 50 ? -40 : 40,
      y: 0,
    },
  });

  const [lineToLabelCoordinates, setlineToLabelCoordinates] = useState({
    vertical: {
      startPoint: null,
      endPoint: null,
    },
    horizontal: {
      startPoint: null,
      endPoint: null,
    },
  });

  const rectangleElRef = useRef(null);
  const ionNameElRef = useRef(null);

  useEffect(() => {
    const rectangleEl = rectangleElRef.current;
    const rectangleBiundingClientRect = rectangleEl.getBoundingClientRect();
    const ionNameEl = ionNameElRef.current;
    const ionNameBoundingClientRect = ionNameEl.getBoundingClientRect();

    const centerOfRectangle = {
      x: parseFloat((rectangleBiundingClientRect.width / 2).toFixed(2)),
      y: parseFloat((rectangleBiundingClientRect.height / 2).toFixed(2)),
    };

    let endPoint;
    if (verticalPartNumber === 1) {
      endPoint = {
        x: centerOfRectangle.x,
        y: centerOfRectangle.y - 140,
      };
    } else {
      endPoint = {
        x: centerOfRectangle.x,
        y: centerOfRectangle.y + 140,
      };
    }

    setlineToLabelCoordinates({
      vertical: {
        startPoint: centerOfRectangle,
        endPoint,
      },
      horizontal: {
        startPoint: {
          x: centerOfRectangle.x,
          y: endPoint.y,
        },
        endPoint: {
          x: centerOfRectangle.x - ionNameBoundingClientRect.width,
          y: endPoint.y,
        },
      },
    });
  }, []);

  useEffect(() => {
    const rectangleEl = rectangleElRef.current;
    const ionNameEl = ionNameElRef.current;
    const { width: rectangleWidth } = rectangleEl.getBoundingClientRect();
    const { width: ionNameWidth } = ionNameEl.getBoundingClientRect();
    const diff = rectangleWidth - ionNameWidth;
    if (diff >= 30) {
      handleNameInRectangle();
    }
  }, [ion.equivalentMass, widthInPercents]);

  //     console.log(ionLabelsMovingInfo.defaultPoint);
  //     console.log(e.clientX, e.clientY);

  //     setIonLabelsMovingInfo({
  //       ...ionLabelsMovingInfo,
  //       isMoving: true,
  //       startPoint: {
  //         x: e.clientX,
  //         y: e.clientY
  //       }
  //     });
  //   }
  // };

  // const handleIonNameMove = e => {
  //   if (ionLabelsMovingInfo.isMoving === true) {
  //     console.log(ionLabelsMovingInfo.defaultPoint);
  //     console.log(e.clientX, e.clientY);

  //     setIonLabelsMovingInfo({
  //       ...ionLabelsMovingInfo,
  //       offset: {
  //         x: e.clientX - ionLabelsMovingInfo.defaultPoint.x,
  //         y: e.clientY - ionLabelsMovingInfo.defaultPoint.y
  //       }
  //     });
  //   }
  // };

  // const handleIonNameEndMove = e => {
  //   if (ionLabelsMovingInfo.isMoving === true) {
  //     setIonLabelsMovingInfo({
  //       ...ionLabelsMovingInfo,
  //       isMoving: false
  //     });
  //   }
  // };

  const ionNameStyle = {
    cursor: 'pointer',
  };

  console.log(lineToLabelCoordinates);

  return (
    <g
      key={ion.name}
      style={{
        fontSize: '20px',
        transform: `translate(${horizontalOffsetPercents}%, 0%)`,
      }}
    >
      <g width={`${widthInPercents}%`} style={ionNameStyle}>
        <rect
          width={`${widthInPercents}%`}
          height="25%"
          stroke="black"
          strokeWidth="1px"
          fill="white"
          ref={rectangleElRef}
        />
        <g className="aasd" ref={ionNameElRef}>
          <text
            style={{
              fontSize: '25px',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              transform: `translate(calc(${widthInPercents / 2}% + ${
                ionLabelsMovingInfo.offset.x
              }px), -15%)`,
            }}
          >
            <tspan
              style={{
                whiteSpace: 'pre',
              }}
            >
              {' '}
            </tspan>
            {ion.ionElementsText}
            {ion.amountOfLastElement > 1 && (
              <tspan
                dx="-1px"
                style={{
                  fontSize: '17px',
                  dominantBaseline: 'mathematical',
                }}
              >
                {ion.amountOfLastElement}
              </tspan>
            )}

            <tspan
              dy="-5%"
              style={{
                fontSize: '17px',
              }}
            >
              {ion.charge.number > 1 ? ion.charge.number : ''}
              {ion.charge.sign}
            </tspan>

            <tspan
              style={{
                whiteSpace: 'pre',
              }}
            >
              {' '}
            </tspan>
          </text>
          <text
            style={{
              fontSize: '20px',
              transform: `translate(calc(${widthInPercents / 2}% + ${
                ionLabelsMovingInfo.offset.x
              }px), ${verticalPartNumber === 1 ? -7 : verticalOffsetPercents / 2 + 4}%)`,
            }}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {ion.equivalentMass}
          </text>
        </g>
        {lineToLabelCoordinates.horizontal.startPoint !== null && (
          <g>
            <line
              x1={lineToLabelCoordinates.vertical.startPoint.x}
              y1={lineToLabelCoordinates.vertical.startPoint.y}
              x2={lineToLabelCoordinates.vertical.endPoint.x}
              y2={lineToLabelCoordinates.vertical.endPoint.y}
              stroke="black"
            />
            <line
              x1={lineToLabelCoordinates.horizontal.startPoint.x}
              y1={lineToLabelCoordinates.horizontal.startPoint.y}
              x2={lineToLabelCoordinates.horizontal.endPoint.x}
              y2={lineToLabelCoordinates.horizontal.endPoint.y}
              stroke="black"
            />
          </g>
        )}
      </g>
    </g>
  );
};

export default IonBlockOutsideOfRectangle;
