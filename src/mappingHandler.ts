export interface mappingOutput {
  tkb90_percentage: number,
}

export function mappingHandler(apiName: string, responseData: any): mappingOutput {
  switch (apiName.toLowerCase()) {
    case "pinjammodal":
      const pinjammodalTKB90DataArray = responseData.data.filter((item: any) => item.name === 'tkb_90');
      return { tkb90_percentage: Number(pinjammodalTKB90DataArray[0].value) }
    case "indodana":
      const indoDanaTKB90 = responseData.pageProps?.initialState?.loanMetrics?.data?.tkb;
      return { tkb90_percentage: indoDanaTKB90 };
    case "maucash":
      const maucashTKB90 =  "TKB 90 | 90,50%";
      console.log(responseData.split('|').pop().trim().replace('%',''));
    default:
      return { tkb90_percentage: 0 }
  }
}