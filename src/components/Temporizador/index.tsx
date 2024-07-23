import React, { useEffect, useState } from 'react';

import Text from '../Text';

type Temporizador = {
   tempo?: number;
}

const Temporizador = ({ tempo = 20 }: Temporizador) => {
   const [remainingTime, setRemainingTime] = useState(tempo * 60);

   useEffect(() => {

      const timer = setInterval(() => {
         setRemainingTime((prevTime) => {
            if (prevTime < 1) return 0;

            return prevTime - 1
         });
      }, 1000);

      return () => {
         clearInterval(timer);
      };
   }, []);

   const minutes = Math.floor(remainingTime / 60);
   const seconds = remainingTime % 60;

   return <Text fontWeight="bold">{minutes}:{seconds}</Text>
}

export default Temporizador;