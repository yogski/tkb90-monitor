import { monitoringLogData } from "../types";

/**
 * Handle the various formats of web or API response from P2P company 
 * and return a standard output format.
 * @param companyAlias : identifier of P2P company
 * @param responseData : Returned response from P2P company API or web 
 * @returns monitoringLogData
 */
export function mappingHandler(companyAlias: string, responseData: any): monitoringLogData {
  switch (companyAlias.toLowerCase()) {
    case "pinjammodal":
      /**
       * Typical pinjammodal API response
       * {
          "status": "SUCCESS",
          "message": "SUCCESS",
          "data": [
            { "id": 1, "name": "total_loan_amount", "value": 7420103095424 },
            { "id": 2, "name": "total_loan_amount_ytd", "value": 1369940547403 },
            { "id": 3, "name": "total_outstanding", "value": 261366783099 },
            { "id": 4, "name": "total_borrower_institution", "value": 573 },
            { "id": 5, "name": "total_borrower_individual", "value": 25620 },
            { "id": 6, "name": "total_active_borrower_institution", "value": 117 },
            { "id": 7, "name": "total_active_borrower_individual", "value": 3199 },
            { "id": 8, "name": "total_product", "value": 142 },
            { "id": 9, "name": "total_application", "value": 1449399 },
            { "id": 10, "name": "total_lender_institution", "value": 4 },
            { "id": 11, "name": "total_lender_individual", "value": 100 },
            { "id": 12, "name": "total_active_lender_institution", "value": 1 },
            { "id": 13, "name": "total_active_lender_individual", "value": 5 },
            { "id": 14, "name": "tkb_0", "value": 92.46 },
            { "id": 15, "name": "tkb_30", "value": 95.12 },
            { "id": 16, "name": "tkb_60", "value": 94.65 },
            { "id": 17, "name": "tkb_90", "value": 95.14 }
          ]
        };
       */
      const pinjammodalReducedData = responseData.data?.reduce((acc: any, item: any) => {
        acc[item.name] = item.value;
        return acc;
      }, {});
      return { 
        tkb90_percentage: Number(pinjammodalReducedData['tkb_90']),
        disbursement_total: Number(pinjammodalReducedData['total_loan_amount']),
        disbursement_ytd: Number(pinjammodalReducedData['total_loan_amount_ytd']),
        loan_outstanding: Number(pinjammodalReducedData['total_outstanding']),
        borrower_total: Number(pinjammodalReducedData['total_borrower_institution']) + Number(pinjammodalReducedData['total_borrower_individual']),
        borrower_active: Number(pinjammodalReducedData['total_active_borrower_institution']) + Number(pinjammodalReducedData['total_active_borrower_individual']),
        lender_total: Number(pinjammodalReducedData['total_lender_institution']) + Number(pinjammodalReducedData['total_lender_individual']),
        lender_active: Number(pinjammodalReducedData['total_active_lender_individual']) + Number(pinjammodalReducedData['total_active_lender_institution'])
      }
    case "dompetkilat":
      /**
       * Typical Dompetkilat API Response
       * {
          "status": "00",
          "message": "Success",
          "data": {
              "id": 1,
              "pinjaman_tersalurkan": 967154800000,
              "pinjaman_lunas": 861168500000,
              "total_outstanding": 82532140000,
              "total_peminjam": 8251,
              "total_pinjamans": null,
              "tkb": 98.47,
              "peminjam_aktif": 410,
              "created_at": "2022-07-18T04:30:38+07:00",
              "updated_at": "2023-12-18T16:00:05+07:00"
          }
      */

      return {
        tkb90_percentage: responseData.data['tkb'],
        disbursement_total: responseData.data['pinjaman_tersalurkan'],
        loan_outstanding: responseData.data['total_outstanding'],
        borrower_total: responseData.data['total_peminjam'],
        borrower_active: responseData.data['peminjam_aktif'],
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