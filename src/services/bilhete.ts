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

export type UsuarioConsultaUsuarioProps = {
   id: string;
   name: string;
   username: string;
   email: string;
   sexo: string;
   data_nascimento: string;
   path_avatar_aprovado: string;
   numero: string;
   nome: string;
   slug: string;
   universidade_id: string;
   atletica_id: string;
}
export async function usuarioConsultaUsuario(cpf: string): PayloadDefault<UsuarioConsultaUsuarioProps> {
   return await api
      .get(`/v2/usuario/consulta-usuario/${cpf}`)
      .then(success => success.data);
}