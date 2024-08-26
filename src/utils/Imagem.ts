export class ImagemApp {

   path = '';

   constructor(data: string) {
      this.path = data;
   }

   async base64File(): Promise<string | ArrayBuffer> {
      const result = await fetch(this.path)
      const blob = await result.blob();

      return new Promise(resolve => {
         const reader = new FileReader();
         reader.readAsDataURL(blob);
         reader.onloadend = () => {
            const base64data = reader.result;
            const [, newImage64] = base64data.toString().split("base64,");
            resolve(newImage64);
         };
      });
   }
}