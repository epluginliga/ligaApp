export type CriaUsuarioProps = {
   nome: string;
   email: string;
   sexo: string;
   data_nascimento: string;
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
   path_camera_web: boolean;
   path_avatar_camera: string;
   tipo_imagem_camera: string;
   habilitar_endereco: number;

}

export type UsuarioCadastraImagemProps = {
   path_camera_web: boolean;
   path_avatar_camera: string | ArrayBuffer;
   tipo_imagem_camera: string;
}