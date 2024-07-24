import React, { useEffect, useState } from 'react';

import Text from '../Text';
import { useMutation } from '@tanstack/react-query';
import { deletaCarrinho } from '../../services/carrinho';
import { useCarrinho } from '../../hooks/carrinho';
import { useNavigation } from '@react-navigation/native';

type Temporizador = {
   tempo?: number;
}

const Temporizador = ({ tempo = 20 }: Temporizador) => {
   const [remainingTime, setRemainingTime] = useState(tempo * 60);
   const { carrinhoId } = useCarrinho();
   const { navigate } = useNavigation();

   const cancelaCarrinho = useMutation({
      mutationFn: () => deletaCarrinho(carrinhoId),
      onSuccess() {
         navigate('CheckoutFalha', {
            codigo: "403",
            mensagem: "Tempo expirado!"
         });
      },
      onError() {
         navigate('CheckoutFalha', {
            codigo: "500",
            mensagem: "Erro no pagamento!"
         });
      },
   });

   useEffect(() => {
      if (remainingTime > 0) {
         const timer = setInterval(() => {
            setRemainingTime((prevTime) => {
               if (prevTime < 1) {
                  return 0;
               };

               return prevTime - 1
            });

         }, 1000);

         return () => {
            clearInterval(timer);
         };
      }


      return cancelaCarrinho.mutate();

   }, [remainingTime]);

   const minutes = Math.floor(remainingTime / 60);
   const seconds = remainingTime % 60;

   if (minutes === 0 && seconds == 0) {
      return <Text fontWeight="bold">{'\n'} tempo expirado {'\n'}</Text>
   }

   return (
      <Text fontWeight="bold">{'\n'}{minutes} minutos e {seconds} segundos {'\n'}</Text>
   )
}

export default Temporizador;