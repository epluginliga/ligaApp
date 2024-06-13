
export type PayloadPaginacao<T> = {
   current_page: number;
   data: Array<T>;
}

export type PayloadDefaultError = {
   codigoretorno: number,
   erro: boolean;
   id: string;
   mensagem: string;
   mensagenserro: []
}

export type PayloadPaginacaoResponse<T> = Promise<PayloadPaginacao<T>>
export type PayloadDefault<T> = Promise<T>
