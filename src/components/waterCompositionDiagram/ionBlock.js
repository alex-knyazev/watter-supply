import React, { useState } from 'react';
import IonBlockInRectangle from './ionBlockInRectangle';
import IonBlockOutsideOfRectangle from './ionBlockOutsideOfRectangle';

export function IonBlock(props) {
  const {
    ion,
    widthInPercents,
    verticalOffsetPercents,
    verticalPartNumber,
    horizontalOffsetPercents,
    horizontalPartNumber,
  } = props;

  const [isIonOutsideOfRectangle, setIsIonOutsideOfRectangle] = useState(false);

  const handleNameOutOfRectangle = () => {
    setIsIonOutsideOfRectangle(true);
  };

  const handleNameInRectangle = () => {
    setIsIonOutsideOfRectangle(false);
  };

  if (isIonOutsideOfRectangle === false) {
    return (
      <IonBlockInRectangle
        ion={ion}
        widthInPercents={widthInPercents}
        handleNameOutOfRectangle={handleNameOutOfRectangle}
        verticalOffsetPercents={verticalOffsetPercents}
        verticalPartNumber={verticalPartNumber}
        horizontalOffsetPercents={horizontalOffsetPercents}
        horizontalPartNumber={horizontalPartNumber}
      />
    );
  } else {
    return (
      <IonBlockOutsideOfRectangle
        ion={ion}
        widthInPercents={widthInPercents}
        handleNameInRectangle={handleNameInRectangle}
        verticalOffsetPercents={verticalOffsetPercents}
        verticalPartNumber={verticalPartNumber}
        horizontalOffsetPercents={horizontalOffsetPercents}
        horizontalPartNumber={horizontalPartNumber}
      />
    );
  }
}
