import api from ".";
import { PayloadDefault } from "./@index";

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
   customizacao_ui: any;
   grupos_usuario: string[];
   possui_endereco_cadastrado: boolean;
   possui_imagem_cadastrada: boolean;
   cadastro_incompleto: boolean;
   nome_atletica?: string;
   atletica_id?: string;
   universidade_id?: string
}

export type LoginProps = {
   user: string;
   password: string;
}
export async function login(data: LoginProps): PayloadDefault<UserProps> {
   return await api
      .post('/login', { ...data })
      .then(success => success.data)
      .catch((err) => console.error(err));
}
