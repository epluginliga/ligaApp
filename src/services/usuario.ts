import api from ".";
import { CriaUsuarioProps } from "./@usuario";

type PayloadCriaConta = {
   mensagem: string;
   erro: boolean;
   mensagenserro: string[];
   id: string;
   codigoretorno: number;
}

export async function criaUsuario(body: CriaUsuarioProps): Promise<PayloadCriaConta> {
   delete api.defaults.headers.common.Authorization;

   return await api
      .post(`/app/usuario`, body)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}
