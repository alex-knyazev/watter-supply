import React from 'react';

export function IonName(props) {
  const { ion } = props;

  const elementsTextSize = '15px';
  const chargeTextSize = '10px';

  const ionElementsText = ion.compound.elementsList.map((elementName) => {
    const amount = ion.compound.elements[elementName];
    return (
      <tspan key={ion.name + elementName} dominantBaseline="middle" textAnchor="middle">
        <tspan
          style={{
            fontSize: elementsTextSize,
          }}
        >
          {elementName}
        </tspan>
        {amount > 1 && (
          <tspan
            style={{
              fontSize: chargeTextSize,
              textAnchor: 'middle',
              dominantBaseline: 'hanging',
            }}
          >
            {amount}
          </tspan>
        )}
      </tspan>
    );
  });

  const group = (
    <svg height="35px" width="100px">
      <text
        style={{
          transform: `translate(20%, 50%)`,
        }}
      >
        {ionElementsText}
      </text>
      <text
        style={{
          display: 'inline-block',
          fontSize: chargeTextSize,
          transform: `translate(32%, 35%)`,
        }}
      >
        {ion.charge.number > 1 ? ion.charge.number : ''}
        {ion.charge.sign}
      </text>
    </svg>
  );

  return group;
}
