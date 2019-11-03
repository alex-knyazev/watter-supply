import React, { useRef, useEffect, useState } from "react";

export function IonBlock(props) {
  const {
    ion,
    percentFromAllIonsOfType,
    labelsPosition,
    verticalOffset,
    summOfPreviousOffsets
  } = props;

  const [isIonOutsideOfRectangle, setisIonOutsideOfRectangle] = useState(false);
  const [ionLabelsMovingInfo, setIonLabelsMovingInfo] = useState({
    isMoving: false,
    // center of ion rectangle after component first render
    defaultPoint: {
      x: 0,
      y: 0
    },
    // center of rectangle at last moving starting
    startPoint: {
      x: 0,
      y: 0
    },
    // diff between start point and current point in process of moving
    offset: {
      x: 0,
      y: 0
    }
  });

  const rectangleElRef = useRef(null);
  const ionNameElRef = useRef(null);

  // effect on first mount
  useEffect(() => {
    setDefaultPoint();
  }, []);

  // effect of rerender when important props are changed
  useEffect(() => {
    const rectangleEl = rectangleElRef.current;
    const ionNameEl = ionNameElRef.current;
    const { width: rectangleWidth } = rectangleEl.getBoundingClientRect();
    const { width: ionNameWidth } = ionNameEl.getBoundingClientRect();
    const diff = rectangleWidth - ionNameWidth;
    if (diff < 30) {
      setisIonOutsideOfRectangle(true);
    } else {
      setisIonOutsideOfRectangle(false);
    }
  }, [ion.equivalentMass, percentFromAllIonsOfType]);

  // const handleIonNamePointerDown = e => {
  //   if (isIonOutsideOfRectangle === true) {
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

  const setDefaultPoint = () => {
    const ionNameEl = ionNameElRef.current;
    const rect = ionNameEl.getBoundingClientRect();
    setIonLabelsMovingInfo({
      ...ionLabelsMovingInfo,
      defaultPoint: {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
      }
    });
  };

  const ionElementsText = ion.compound.elementsList.join("");
  const lastElementName =
    ion.compound.elementsList[ion.compound.elementsList.length - 1];
  const amountOfLastElement = ion.compound.elements[lastElementName];

  const ionNameStyle = {
    cursor: isIonOutsideOfRectangle ? "pointer" : "default"
  };

  if (isIonOutsideOfRectangle === false) {
    return (
      <g
        key={ion.name}
        style={{
          fontSize: "20px",
          transform: `translate(${summOfPreviousOffsets}%, -4%)`
        }}
      >
        <g>
          <text
            style={{
              fontSize: "20px",
              transform: `translate(${percentFromAllIonsOfType / 2}%, ${
                labelsPosition === "top" ? -4 : verticalOffset / 2 + 4
              }%)`
            }}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {ion.equivalentMass}
          </text>
        </g>
        <g width={`${percentFromAllIonsOfType}%`} style={ionNameStyle}>
          <rect
            width={`${percentFromAllIonsOfType}%`}
            height="25%"
            stroke="black"
            strokeWidth="1px"
            fill="white"
            ref={rectangleElRef}
          />
          <g
            ref={ionNameElRef}
            // onPointerDown={handleIonNamePointerDown}
            // onPointerMove={handleIonNameMove}
            // onPointerUp={handleIonNameEndMove}
            onLostPointerCapture={() => console.log("lost")}
          >
            <text
              style={{
                fontSize: "25px",
                textAnchor: "middle",
                dominantBaseline: "middle",
                transform: `translate(calc(${percentFromAllIonsOfType / 2}% + ${
                  ionLabelsMovingInfo.offset.x
                }px), calc(15% + ${ionLabelsMovingInfo.offset.y}px))`
              }}
            >
              <tspan
                style={{
                  whiteSpace: "pre"
                }}
              >
                {" "}
              </tspan>
              {ionElementsText}
              {amountOfLastElement > 1 && (
                <tspan
                  dx="-1px"
                  style={{
                    fontSize: "17px",
                    dominantBaseline: "mathematical"
                  }}
                >
                  {amountOfLastElement}
                </tspan>
              )}

              <tspan
                dy="-5%"
                style={{
                  fontSize: "17px"
                }}
              >
                {ion.charge.number > 1 ? ion.charge.number : ""}
                {ion.charge.sign}
              </tspan>

              <tspan
                style={{
                  whiteSpace: "pre"
                }}
              >
                {" "}
              </tspan>
            </text>
          </g>
        </g>
      </g>
    );
  } else {
    return (
      <g
        key={ion.name}
        style={{
          fontSize: "20px",
          transform: `translate(${summOfPreviousOffsets}%, -4%)`
        }}
      >
        <g>
          {/* <text
            style={{
              fontSize: "20px",
              transform: `translate(${percentFromAllIonsOfType / 2}%, ${
                labelsPosition === "top" ? -4 : verticalOffset / 2 + 4
              }%)`
            }}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {ion.equivalentMass}
          </text> */}
        </g>
        <g width={`${percentFromAllIonsOfType}%`} style={ionNameStyle}>
          <rect
            width={`${percentFromAllIonsOfType}%`}
            height="25%"
            stroke="black"
            strokeWidth="1px"
            fill="white"
            ref={rectangleElRef}
          />
          <g
            ref={ionNameElRef}
            // onPointerDown={handleIonNamePointerDown}
            // onPointerMove={handleIonNameMove}
            // onPointerUp={handleIonNameEndMove}
            onLostPointerCapture={() => console.log("lost")}
          >
            <text
              style={{
                fontSize: "25px",
                textAnchor: "middle",
                dominantBaseline: "middle",
                transform: `translate(calc(${percentFromAllIonsOfType / 2}% + ${
                  ionLabelsMovingInfo.offset.x
                }px), calc(${labelsPosition === "top" ? "-11%" : "35%"} + ${
                  ionLabelsMovingInfo.offset.y
                }px))`
              }}
            >
              <tspan
                style={{
                  whiteSpace: "pre"
                }}
              >
                {" "}
              </tspan>
              {ionElementsText}
              {amountOfLastElement > 1 && (
                <tspan
                  dx="-1px"
                  style={{
                    fontSize: "17px",
                    dominantBaseline: "mathematical"
                  }}
                >
                  {amountOfLastElement}
                </tspan>
              )}

              <tspan
                dy="-5%"
                style={{
                  fontSize: "17px"
                }}
              >
                {ion.charge.number > 1 ? ion.charge.number : ""}
                {ion.charge.sign}
              </tspan>

              <tspan
                style={{
                  whiteSpace: "pre"
                }}
              >
                {" "}
              </tspan>
            </text>
          </g>
        </g>
      </g>
    );
  }
}
