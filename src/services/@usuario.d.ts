export type CriaUsuarioProps = {
   nome: string;
   email: string;
   sexo: string;
   nascimento: string;
   password: string;
   numero:string;
   documento: string;
   username: string;
   telefone: string;
   confirmar_senha?: string;
   cadastro_app: boolean;
   cep: string;
   bairro: string;
   cidade: string;
   complemento: string;
   estado: string;
   logradouro: string;

}

export type UsuarioCadastraImagemProps = {
   path_camera_web: boolean;
   path_avatar_camera: string | ArrayBuffer;
   tipo_imagem_camera: string;
}