export interface mappingOutput {
  tkb90_percentage: number,
  disbursement_total?: number,
  disbursement_ytd?: number,
  loan_outstanding?: number,
  borrower_total?: number,
  borrower_active?: number,
  lender_total?: number,
  lender_active?: number,
}
/**
 * Handle the various formats of web or API response from P2P company 
 * and return a standard output format.
 * @param companyAlias : identifier of P2P company
 * @param responseData : Returned response from P2P company API or web 
 * @returns mappingOutput
 */
export function mappingHandler(companyAlias: string, responseData: any): mappingOutput {
  switch (companyAlias.toLowerCase()) {
    case "pinjammodal":
      const pinjammodalTKB90DataArray = responseData.data.filter((item: any) => item.name === 'tkb_90');
      return { 
        tkb90_percentage: Number(pinjammodalTKB90DataArray[0].value),
        
      }
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