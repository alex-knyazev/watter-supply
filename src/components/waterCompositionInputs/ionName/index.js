import React from "react";

export function IonName(props) {
  const { ion, size } = props;
  // const ionElementsText = ion.getCompaundText("");

  let elementsTextSize;
  let chargeTextSize;

  switch (size) {
    case "big":
      elementsTextSize = "25px";
      chargeTextSize = "17px";
      break;
    case "small":
      elementsTextSize = "15px";
      chargeTextSize = "10px";
      break;
    default:
      elementsTextSize = "20px";
      chargeTextSize = "14px";
      break;
  }

  const ionElementsText = ion.compound.elementsList.map(elementName => {
    const amount = ion.compound.elements[elementName];
    return (
      <g>
        <text
          style={{
            fontSize: elementsTextSize
          }}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {elementName}
        </text>
        {amount > 1 && (
          <g>
            <text
              style={{
                fontSize: chargeTextSize,
                transform: `translate(-2%, -50%)`
              }}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {amount}
            </text>
          </g>
        )}
      </g>
    );
  });

  const group = (
    <g
      style={{
        display: "inline-block"
      }}
    >
      <g>{ionElementsText}</g>
      <text
        style={{
          display: "inline-block",
          fontSize: chargeTextSize,
          transform: `translate(${ion.charge.number > 1 ? 3.5 : 2}%, -100%)`
        }}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {ion.charge.number > 1 ? ion.charge.number : ""}
        {ion.charge.sign}
      </text>
      {/* </g> */}
    </g>
  );

  return group;
}
