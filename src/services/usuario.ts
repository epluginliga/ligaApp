import api from ".";
import { PayloadPaginacaoResponse } from "./@index";
import { CriaUsuarioProps } from "./@usuario";


export async function criaUsuario(body: CriaUsuarioProps): PayloadPaginacaoResponse<any> {
   delete api.defaults.headers.common.Authorization;

   return await api
      .post(`/app/usuario`, body)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      })
}
