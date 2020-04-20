import React, { useRef, useEffect } from 'react';

const IonBlockInRectangle = (props) => {
  const {
    ion,
    widthInPercents,
    verticalOffsetPercents,
    verticalPartNumber,
    horizontalOffsetPercents,
    handleNameOutOfRectangle,
  } = props;

  const rectangleElRef = useRef(null);
  const ionNameElRef = useRef(null);

  const ionNameStyle = {
    cursor: 'default',
  };

  useEffect(() => {
    const rectangleEl = rectangleElRef.current;
    const ionNameEl = ionNameElRef.current;
    const { width: rectangleWidth } = rectangleEl.getBoundingClientRect();
    const { width: ionNameWidth } = ionNameEl.getBoundingClientRect();
    const diff = rectangleWidth - ionNameWidth;
    if (diff < 30) {
      handleNameOutOfRectangle();
    }
  }, [ion.equivalentMass, widthInPercents]);

  return (
    <g
      key={ion.name}
      style={{
        fontSize: '20px',
        transform: `translate(${horizontalOffsetPercents}%,  0%)`,
      }}
    >
      <g>
        <text
          style={{
            fontSize: '20px',
            transform: `translate(${widthInPercents / 2}%, ${
              verticalPartNumber === 1 ? -3 : verticalOffsetPercents / 2 + 3
            }%)`,
          }}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {ion.equivalentMass}
        </text>
      </g>
      <g width={`${widthInPercents}%`} style={ionNameStyle}>
        <rect
          width={`${widthInPercents}%`}
          height="25%"
          stroke="black"
          strokeWidth="1px"
          fill="white"
          ref={rectangleElRef}
        />
        <g ref={ionNameElRef}>
          <text
            style={{
              fontSize: '25px',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              transform: `translate(${widthInPercents / 2}%, 15%)`,
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
        </g>
      </g>
    </g>
  );
};

export default IonBlockInRectangle;
