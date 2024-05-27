import api from ".";

export type UserProps = {
   mensagem: string;
   api_token: string;
   codigoretorno: number;
   erro: boolean;
   path_avatar: string;
   name: string;
   userName: string;
   email: string;
   user_id: string;
   customizacao_ui: string;
   grupos_usuario: "comissario" | "comissao-organizadora" | "validador-ingresso";
   possui_endereco_cadastrado: boolean;
   possui_imagem_cadastrada: boolean;
   cadastro_incompleto: boolean;
   nome_atletica?: string;
   atletica_id?: string;
   universidade_id?: string
}

export async function login(): Promise<UserProps> {
   return await api
      .post('/login')
      .then(success => success.data)
      .catch((err) => console.error(err));
}
