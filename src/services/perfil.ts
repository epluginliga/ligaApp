import api from ".";
import { PayloadDefault, PayloadDefaultResponse } from "./@index";
import { ObtemDadosLogadoPayload, UsuarioAlteraSenhaProps, UsuarioAtaulizaUsuariogeralProps, UsuarioAtualizaGeralProps, UsuarioObtemDadosEnderecoPayload } from "./@perfil";
import { UsuarioCadastraImagemProps } from "./@usuario";

export async function obtemDadosLogado(): PayloadDefault<ObtemDadosLogadoPayload> {
   return await api
      .get(`/obtem-dados-logado`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}

export async function usuarioObtemDadosEndereco(): PayloadDefault<UsuarioObtemDadosEnderecoPayload> {
   return await api
      .get(`/usuario/obtem-dados/endereco`)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}

export async function usuarioAtualiza(usuario_id: string, body: UsuarioAtaulizaUsuariogeralProps):
   PayloadDefault<PayloadDefaultResponse> {
   return await api
      .put(`/usuario/${usuario_id}`, body)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}

export async function usuarioAtualizaEndereco(usuario_id: string, body: UsuarioAtualizaGeralProps):
   PayloadDefault<PayloadDefaultResponse> {
   return await api
      .put(`/usuario/atualiza-endereco/${usuario_id}`, body)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}

export async function usuarioExcluirConta(usuario_id: string):
   PayloadDefault<PayloadDefaultResponse> {
   return await api.delete(`/usuario/${usuario_id}`)
      .then(res => res.data)
}

export async function usuarioAlteraSenha(body: UsuarioAlteraSenhaProps):
   PayloadDefault<PayloadDefaultResponse> {
   return await api
      .post(`/usuario/altera-senha`, body)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}

export async function usuarioCadastraImagem(body: UsuarioCadastraImagemProps):
   PayloadDefault<PayloadDefaultResponse> {
   return await api
      .post(`/usuario/cadastra-imagem`, body)
      .then(success => {
         if (success.status !== 200) {
            throw new Error("Erro");
         }
         return success.data;
      });
}