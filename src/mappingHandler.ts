export interface mappingOutput {
  tkb90_percentage: number,
}

export function mappingHandler(apiName: string, responseData: any): mappingOutput {
  switch (apiName) {
    case "pinjammodal":
      const tkb90DataArray = responseData.data.filter((item: any) => item.name === 'tkb_90');
      return { tkb90_percentage: Number(tkb90DataArray[0].value) }
  
    default:
      return { tkb90_percentage: 0 }
  }
}