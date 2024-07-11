
export type PayloadPaginacao<T> = {
   current_page: number;
   data: Array<T>;
}

export type PayloadDefaultError = {
   codigoretorno: number,
   errors: {
      [key: string]: string[],
      message: string;
   }
   erro: boolean;
   id: string;
   mensagem: string;
   mensagenserro: [],
   message?: string;
}

export type PayloadPaginacaoResponse<T> = Promise<PayloadPaginacao<T>>
export type PayloadDefault<T> = Promise<T>
