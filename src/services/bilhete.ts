import api from ".";

import { PayloadDefault, PayloadDefaultResponse } from "./@index";

export type BilheteTransferirBilheteProps = {
   bilhete_id: string;
   body: {
      destinatario_cpf: string;
   }
}

export async function bilheteTransferir({ bilhete_id, body }: BilheteTransferirBilheteProps):
   PayloadDefault<PayloadDefaultResponse> {
   return await api
      .post(`/bilhete/transferir-bilhete/${bilhete_id}`, { ...body })
      .then(success => success.data);
}