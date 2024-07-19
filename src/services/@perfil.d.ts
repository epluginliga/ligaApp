export type ObtemDadosLogadoPayload = {
   path_avatar: string;
   name: string;
   email: string;
   user_id: string;
   user_name: string;
   status_aprovacao: "aguardando_aprovacao" | "aprovado" | undefined;
   data_nascimento: string;
   sexo: string;
   documento_numero: string;
   documento_tipo: string;
   telefone_ddd: string;
   telefone_numero: string;
   possui_endereco_cadastrado: boolean;
}

export type UsuarioObtemDadosEnderecoPayload = {
   id: string;
   cep: string;
   logradouro: string;
   numero: string;
   bairro: string;
   complemento: string;
   cidade: string;
   estado: string;
   padrao: boolean,
   latitude: string;
   longitude: string;
   usuario_id: string;
   deleted_at?: string,
   created_at: string;
   updated_at: string;
}

export type UsuarioAtaulizaUsuariogeralProps = {
   nome: string;
   username?: string;
   email: string;
   documento: string;
   data_nascimento: string;
   telefone: string;
   sexo: string;
}

export type UsuarioAlteraSenhaProps = {
   senhaatual: string;
   novasenha: string;
}

export type UsuarioAtualizaGeralProps = {
   endereco: {
      cep: string;
      logradouro: string;
      numero: string;
      bairro: string;
      cidade: string;
      complemento: string;
      estado: string;
   }
}