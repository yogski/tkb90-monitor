import * as cheerio from 'cheerio';import { monitoringLogData } from "../types";
import { parseAbbrValue, parseMonetaryValue, parsePercentageValue, removeThousandSeparators } from './valueHandler';
import moment = require('moment');

/**
 * Handle the various formats of web or API response from P2P company 
 * and return a standard output format.
 * @param companyAlias : identifier of P2P company
 * @param responseData : Returned response from P2P company API or web 
 * @returns monitoringLogData
 */
export function mappingHandler(companyAlias: string, responseData: any): monitoringLogData {
  switch (companyAlias.toLowerCase()) {
    case "akseleran": // Last updated 6 August 2024
      {
        /**
         * Typical Akseleran API response
         * {
            "tkb0": 98.68,
            "tkb30": 99.45,
            "tkb60": 99.72,
            "tkb90": 99.82,
            "tkb_total": 99.99,
            "total_disbursement": 11108128102017,
            "total_disbursement_current_year": 1746831562065,
            "total_outstanding_loan": 652279679415,
            "total_borrower": 10466,
            "total_active_borrower": 6354,
            "total_active_borrower_current_year": 2917,
            "total_lenders": 225725,
            "total_active_lenders": 46802,
            "total_active_lenders_current_year": 6656,
            "current_year": 2024,
            "total_cost": {
                "lowest_lending": {
                    "lending_cost_received": 9732030,
                    "lending_cost_returned": 11016268,
                    "total_fee": 1284238,
                    "percentage_total_fee_perday": 0.055
                },
                "highest_lending": {
                    "lending_cost_received": 1981200000,
                    "lending_cost_returned": 2125333333,
                    "total_fee": 144133333,
                    "percentage_total_fee_perday": 0.081
                }
            }
          }
         */
        const akseleranResult = {
          tkb90_percentage: Number(responseData['tkb90']),
          disbursement_total: Number(responseData['total_disbursement']),
          disbursement_ytd: Number(responseData['total_disbursement_current_year']),
          loan_outstanding: Number(responseData['total_outstanding_loan']),
          borrower_total: Number(responseData['total_borrower']),
          borrower_active: Number(responseData['total_active_borrower']),
          lender_total: Number(responseData['total_lenders']),
          lender_active: Number(responseData['total_active_lenders']),
          // source_timestamp: -,
        }
        return akseleranResult;

      }
    case "pinjamango":      
      {
        /**
         * Typical Pinjaman Go TKB Response [0]
         * {
            "status": "1",
            "error": "00000000",
            "msg": null,
            "data": {
                "remark0": "TKB0 adalah ukuran tingkat keberhasilan ... sampai dengan 0 (nol) hari kalender\nterhitung sejak jatuh tempo",
                "remark30": " TKB30 adalah ukuran tingkat keberhasilan ... sampai dengan 30 (tiga puluh) hari\nkalender terhitung sejak jatuh tempo",
                "remark60": "TKB60 adalah ukuran tingkat keberhasilan ... sampai dengan 60 (enam puluh) hari\nkalender terhitung sejak jatuh tempo",
                "remark90": " TKB90 adalah ukuran tingkat keberhasilan ... sampai dengan 90 (sembilan puluh)\nhari kalender terhitung sejak jatuh tempo",
                "tkb0": "99.40%",
                "tkb30": "98.50%",
                "tkb60": "97.54%",
                "tkb90": "95.18%"
            }
          }
        */
        
        /**
         * Typical Pinjaman GO Info [1]
         * {
            "status": "1",
            "error": "00000000",
            "msg": null,
            "data": {
                "outstandingPinjaman": "13996512",
                "totalLenderAktif": "13",
                "totalPeminjamAktif": "4315",
                "totalPeminjamSejakBerdiri": "297079",
                "totalPinjamanSepanjangTahunBerjalan": "33975300000",
                "totalPinjamanSejakBerdiri": "3201252028233"
            }
          }
        */

        const pinjamangoResult = {
          tkb90_percentage: parsePercentageValue(responseData[0]?.data['tkb90']),
          disbursement_total: Number(responseData[1]?.data['totalPinjamanSejakBerdiri']),
          disbursement_ytd: Number(responseData[1]?.data['totalPinjamanSepanjangTahunBerjalan']),
          loan_outstanding: Number(responseData[1]?.data['outstandingPinjaman']),
          borrower_total: Number(responseData[1]?.data['totalPeminjamSejakBerdiri']),
          borrower_active: Number(responseData[1]?.data['totalPeminjamAktif']),
          lender_total: Number(responseData[1]?.data['totalLenderAktif']),
          lender_active: Number(responseData[1]?.data['totalLenderAktif']),
          // source_timestamp: -,
        }
        return pinjamangoResult;

      }
    case "pinjammodal": // Last updated 28 July 2024
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
    case "dompetkilat": // Last updated 30 July 2024
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
        source_timestamp: responseData.data['updated_at'],
      }
    case "modalku": // Last updated 1 August 2024
      /**
       * Typical Modalku API response
       {
          "data": {
              "borrower_count": {
                  "all": {
                      "individual": 69853,
                      "institutional": 3850,
                      "total": 73703
                  },
                  "ongoing": {
                      "individual": 198,
                      "institutional": 14,
                      "total": 212
                  },
                  "throughout_year": {
                      "individual": 266,
                      "institutional": 15,
                      "total": 281
                  }
              },
              "investor_count": {
                  "all": {
                      "individual": 7207,
                      "institutional": 29,
                      "total": 7236
                  },
                  "ongoing": {
                      "individual": 515,
                      "institutional": 8,
                      "total": 523
                  },
                  "throughout_year": {
                      "individual": 380,
                      "institutional": 3,
                      "total": 383
                  }
              },
              "disbursal_amount": {
                  "annualized": 405117593269,
                  "cumulative": 7584764082340.57
              },
              "outstanding_amount": 137297717535.37,
              "products": {
                  "highest": {
                      "disbursal_amount": 2000000000,
                      "fees_amount": 782555557.18,
                      "fees_percentage": 20,
                      "repayment_amount": 2782555557.18
                  },
                  "lowest": {
                      "disbursal_amount": 4.5,
                      "fees_amount": 0,
                      "fees_percentage": 0,
                      "repayment_amount": 4.5
                  }
              },
              "success_rate_over_disbursement": 97.16,
              "success_rate_over_outstanding": 98.1,
              "success_rate_over_outstanding_0": 88.03,
              "success_rate_over_outstanding_30": 94.23,
              "success_rate_over_outstanding_60": 96.5
          }
        }
       */
      return {
        tkb90_percentage: responseData.data['success_rate_over_outstanding'],
        disbursement_total: Math.floor(Number(responseData.data['disbursal_amount']['cumulative'])),
        disbursement_ytd: Math.floor(Number(responseData.data['disbursal_amount']['annualized'])),
        loan_outstanding: Math.floor(Number(responseData.data['outstanding_amount'])),
        borrower_total: responseData.data['borrower_count']['all']['total'],
        borrower_active: responseData.data['borrower_count']['ongoing']['total'],
        lender_total: responseData.data['investor_count']['all']['total'],
        lender_active: responseData.data['investor_count']['ongoing']['total'],
      }
    case "boost": // Last updated 2 August 2024
      // Boost has web
      try {
        const html = responseData as string;
        const $ = cheerio.load(html);
        const boostTKB90 = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(4) > div.logo-card__header > h5').text();
        const boostDisbursementTotal = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(5) > div.logo-card__header > h5').text();
        const boostDisbursementYTD = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(6) > div.logo-card__header > h5').text();
        const boostLoanOutstanding = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(7) > div.logo-card__header > h5').text();
        const boostTotalBorrower = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(9) > div.logo-card__header > h5').text().split(' ')[0];
        const boostActiveBorrower = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(8) > div.logo-card__header > h5').text().split(' ')[0];
        const boostTotalLender = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(13) > div.logo-card__header > h5').text().split(' ')[0];
        const boostActiveLender = $('#block-boost-web-content > article > div > div > div:nth-child(4) > div > div > div:nth-child(11) > div.logo-card__header > h5').text().split(' ')[0];
        const boostSourceTimestamp = $('#block-boost-web-content > article > div > div > div:nth-child(3) > div > div > p').text().split(' ').pop();
        
        return {
          tkb90_percentage: parsePercentageValue(boostTKB90),
          disbursement_total: Math.floor(parseMonetaryValue(boostDisbursementTotal)),
          disbursement_ytd: Math.floor(parseMonetaryValue(boostDisbursementYTD)),
          loan_outstanding: Math.floor(parseMonetaryValue(boostLoanOutstanding)),
          borrower_total: Math.floor(Number(boostTotalBorrower)),
          borrower_active: Math.floor(Number(boostActiveBorrower)),
          lender_total: Math.floor(Number(boostTotalLender)),
          lender_active: Math.floor(Number(boostActiveLender)),
          source_timestamp: moment(boostSourceTimestamp, 'DD/MM/YYYY', true).toDate(),
        }
      } catch (error) {
        console.log(`[FAILED_MAPPING][${companyAlias}]${error}`)
        return {} as monitoringLogData
      }
    case "tokomodal": // Last updated 2 August 2024
      {
        /**
         * Typical Tokomodal response
         * {
            "result": {
                "BORROWER_ALLTIME": "38.653",
                "BORROWER_CURRENT": "397",
                "BORROWER_CURRENTYEAR": "5.994",
                "LAPORAN_PENANGANAN_PENGADUAN": "https://www.tokomodal.co.id/assets/files/laporan-penanganan-pengaduan-tokomodal-202311.pdf",
                "LAST_UPDATED": "31 Mei 2024",
                "LENDER_ALLTIME": "1.111",
                "LENDER_CURRENT": "0",
                "LENDER_CURRENTYEAR": "20",
                "LOAN_DISBURSE_ALLTIME": "Rp 1.285.131.851.372",
                "LOAN_DISBURSE_CURRENT": "Rp 8.800.704.586",
                "LOAN_DISBURSE_CURRENTYEAR": "Rp 45.228.414.277",
                "LOAN_OUTSTANDING": "Rp 3.746.130.436",
                "TKB0": "59.08%",
                "TKB30": "95.41%",
                "TKB60": "98.46%",
                "TKB90": "99.84%"
            }
          }
         */
        
        return {
          tkb90_percentage: parsePercentageValue(responseData.result['TKB90']),
          disbursement_total: parseMonetaryValue(responseData.result['LOAN_DISBURSE_ALLTIME']),
          disbursement_ytd: parseMonetaryValue(responseData.result['LOAN_DISBURSE_CURRENTYEAR']),
          loan_outstanding: parseMonetaryValue(responseData.result['LOAN_OUTSTANDING']),
          borrower_total: removeThousandSeparators(responseData.result['BORROWER_ALLTIME']),
          borrower_active: removeThousandSeparators(responseData.result['BORROWER_CURRENT']),
          lender_total: removeThousandSeparators(responseData.result['LENDER_ALLTIME']),
          lender_active: removeThousandSeparators(responseData.result['LENDER_CURRENT']),
          source_timestamp: moment(responseData.result['LAST_UPDATED'], 'DD MMM YYYY', true).isValid() ? moment(responseData.result['LAST_UPDATED'], 'DD MMM YYYY', true).toDate() : undefined,
        }
    
      }
    case "pendanaan": // Last updated 2 August 2024
      {
        /**
         * 
         * {
          "code": "000000",
          "msg": "success",
          "data": [
              {
                  "tkb": "96.7",
                  "totalAmount": "9964000000000",
                  "yearTotalAmount": "287000000000",
                  "reimbursementTotalAmount": "94000000000",
                  "loanAmount": "3440000",
                  "activeNumber": 89000,
                  "tkb0": "86.0",
                  "tkb30": "90.2",
                  "tkb60": "93.9",
                  "accumulatedBorrowers": 3523000,
                  "totalBorrowersCurrentYear": 151000,
                  "totalLendersCurrentYear": 3,
                  "accumulatedLenders": 3
              },
              {
                  "tkb": "95",
                  "totalAmount": "7977000000000",
                  "yearTotalAmount": "1797000000000",
                  "reimbursementTotalAmount": "445000000000",
                  "loanAmount": "2635000",
                  "activeNumber": 329000,
                  "tkb0": null,
                  "tkb30": null,
                  "tkb60": null,
                  "accumulatedBorrowers": null,
                  "totalBorrowersCurrentYear": null,
                  "totalLendersCurrentYear": null,
                  "accumulatedLenders": null
              }
          ],
          "success": true
          }
         */
          if (responseData && responseData.data && responseData.data.length <= 0) return {} as monitoringLogData;
          return {
            tkb90_percentage: responseData.data[0]['tkb'],
            disbursement_total: responseData.data[0]['totalAmount'],
            disbursement_ytd: responseData.data[0]['yearTotalAmount'],
            loan_outstanding: responseData.data[0]['reimbursementTotalAmount'],
            borrower_total: responseData.data[0]['accumulatedBorrowers'],
            borrower_active: responseData.data[0]['totalBorrowersCurrentYear'],
            lender_total: responseData.data[0]['accumulatedLenders'],
            lender_active: responseData.data[0]['totalLendersCurrentYear'],
            source_timestamp: responseData.data[0]['last_update'] || null,
          }  
      }
    case "danabagus": // Last updated 2 August 2024
      try {
        const html = responseData as string;
        const $ = cheerio.load(html);
        const danabagusTKB90 = $('body > div.content.nav > div > ul > li.tkb-nav.popover > div.popover-container > div > table > tbody > tr:nth-child(6) > td:nth-child(2)').text();
        const danabagusDisbursementTotal = $('body > div.content_wrapper > div > section:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > h3').text();
        const danabagusDisbursementYTD = $('body > div.content_wrapper > div > section:nth-child(1) > div > div:nth-child(3) > div:nth-child(4) > h3').text();
        const danabagusLoanDone = $('body > div.content_wrapper > div > section:nth-child(1) > div > div:nth-child(4) > div > h3').text();
        const danabagusTotalBorrower = $('body > div.content_wrapper > div > section:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > h3').text();
        const danabagusActiveBorrower = $('body > div.content_wrapper > div > section:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > h3').text();
        const danabagusTotalLender = $('body > div.content_wrapper > div > section:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > h3').text();
        const danabagusActiveLender = $('body > div.content_wrapper > div > section:nth-child(1) > div > div:nth-child(2) > div:nth-child(3) > h3').text();
        
        return {
          tkb90_percentage: parsePercentageValue(danabagusTKB90),
          disbursement_total: Math.floor(parseMonetaryValue(danabagusDisbursementTotal)),
          disbursement_ytd: Math.floor(parseMonetaryValue(danabagusDisbursementYTD)),
          // no loan outstanding data available, but can be inferred by getting difference of total disburse minus done.
          loan_outstanding: Math.floor(parseMonetaryValue(danabagusDisbursementTotal)) - Math.floor(parseMonetaryValue(danabagusLoanDone)),
          borrower_total: Math.floor(Number(danabagusTotalBorrower)),
          borrower_active: Math.floor(Number(danabagusActiveBorrower)),
          lender_total: Math.floor(Number(danabagusTotalLender)),
          lender_active: Math.floor(Number(danabagusActiveLender)),
        }
      } catch (error) {
        console.log(`[FAILED_MAPPING][${companyAlias}]${error}`)
        return {} as monitoringLogData
      }
    case "kreditpintar": // Last updated 8 August 2024
      // kreditpintar utilizes web
      try {
        const html = responseData as string;
        const $ = cheerio.load(html);
        const kreditpintarTKB90 = $('div.swiper-slide[data-swiper-slide-index="3"] > div.subtitle').text();
        const kreditpintarDisbursementTotal = $('#__next > [class^="rate__BannerBox"] > div.container > div > div:nth-child(1) > div.item-rate > div.rate').text();
        const kreditpintarDisbursementYTD = $('#__next > [class^="rate__BannerBox"] > div.container > div > div:nth-child(2) > div.item-rate > div.rate').text();
        const kreditpintarLoanOutstanding = $('#__next > [class^="rate__BannerBox"] > div.container > div > div:nth-child(3) > div.item-rate > div.rate').text();
        const kreditpintarTotalBorrower = $('#__next > [class^="rate__BannerBox"] > div.container > div > div:nth-child(4) > div.item-rate > div.rate').text();
        const kreditpintarActiveBorrower = $('#__next > [class^="rate__BannerBox"] > div.container > div > div:nth-child(5) > div.item-rate > div.rate').text();
        const kreditpintarSourceTimestamp = $('.last-updated').text().split(' ').pop();
       
        // adjust data
        const KREDIT_PINTAR_BASELINE = 100

        return {
          tkb90_percentage: kreditpintarTKB90.trim().length <= 0 ? KREDIT_PINTAR_BASELINE : parsePercentageValue(kreditpintarTKB90),
          disbursement_total: Math.floor(parseAbbrValue(kreditpintarDisbursementTotal, 'ID')),
          disbursement_ytd: Math.floor(parseAbbrValue(kreditpintarDisbursementYTD, 'ID')),
          loan_outstanding: Math.floor(parseAbbrValue(kreditpintarLoanOutstanding, 'ID')),
          borrower_total: Math.floor(parseAbbrValue(kreditpintarTotalBorrower, 'ID')),
          borrower_active: Math.floor(parseAbbrValue(kreditpintarActiveBorrower, 'ID')),
          // lender_total: -,
          // lender_active: -,
          source_timestamp: moment(kreditpintarSourceTimestamp, 'DD/MM/YYYY', false).toDate(),
        }
      } catch (error) {
        console.log(`[FAILED_MAPPING][${companyAlias}]${error}`)
        return {} as monitoringLogData
      }
    case "awantunai": // Last updated 8 August 2024
      {
        /**
         * Typical Awantunai API response
         * {
            "data": {
                "rows": [
                    [
                        "TKB0",
                        "99.09%"
                    ],
                    [
                        "TKB30",
                        "99.45%"
                    ],
                    [
                        "TKB60",
                        "99.55%"
                    ],
                    [
                        "TKB90",
                        "99.78%"
                    ]
                ],
                "cols": [
                    {
                        "display_name": "TKB",
                        "source": "native",
                        "field_ref": [
                            "field",
                            "TKB",
                            {
                                "base-type": "type/Text"
                            }
                        ],
                        "name": "TKB",
                        "base_type": "type/Text",
                        "effective_type": "type/Text"
                    },
                    {
                        "display_name": "RESULT",
                        "source": "native",
                        "field_ref": [
                            "field",
                            "RESULT",
                            {
                                "base-type": "type/Text"
                            }
                        ],
                        "name": "RESULT",
                        "base_type": "type/Text",
                        "effective_type": "type/Text"
                    }
                ],
                "insights": null,
                "requested_timezone": "UTC",
                "results_timezone": "UTC"
            },
            "json_query": {},
            "status": "completed"
          }
         */

        return {
          tkb90_percentage: parsePercentageValue(responseData.data?.rows?.filter((tkb: any[]) => tkb[0] === "TKB90")[0][1]),
          // disbursement_total: -,
          // disbursement_ytd: -,
          // loan_outstanding: -,
          // borrower_total: -,
          // borrower_active: -,
          // lender_total: -,
          // lender_active: -,
        }  
      }
    case "uangme": // Last updated 4 August 2024
      {
      /**
       * API response [0]
       * {
          "code": "200",
          "msg": "Berhasil masuk",
          "data": {
              "list": [
                  "TKB0=98.71%",
                  "TKB30=98.83%",
                  "TKB60=98.81%",
                  "TKB90=100%"
              ]
          },
          "trace_id": "6709f441311bdf77"
        }
       */

      /**
       * API response [1]
       * {
          "code": "200",
          "msg": "Berhasil masuk",
          "data": {
              "borrower_count": "1756917",
              "current_borrower_count": "197399",
              "current_lender_count": "1498",
              "current_total_loan_accumulation": "1683392582494",
              "lender_count": "9316",
              "total_loan_accumulation": "16043707292392"
          },
          "trace_id": "73871541c40295c2"
        }
       */
        return {
          tkb90_percentage: parsePercentageValue(responseData[0]?.data?.list?.pop().split('=').pop()),
          disbursement_total: Number(responseData[1]?.data['total_loan_accumulation']),
          disbursement_ytd: Number(responseData[1]?.data['current_total_loan_accumulation']),
          // loan_outstanding: Number(responseData[1]?.data['total_loan_accumulation']),
          borrower_total: Number(responseData[1]?.data['borrower_count']),
          borrower_active: Number(responseData[1]?.data['current_borrower_count']),
          lender_total: Number(responseData[1]?.data['lender_count']),
          lender_active: Number(responseData[1]?.data['current_lender_count']),
        }  
      }
    case "adakami": // Last updated 8 August 2024
      {
      /**
       * API response [0]
       * {
            "result": 0,
            "resultMessage": "Berhasil",
            "content": {
                "tkb60": "TKB60:99.9602%",
                "tkb": "TKB90:99.9604%",
                "tkb0": "TKB0:99.8896%",
                "tkb30": "TKB30:99.9605%"
            }
        }
       */

      /**
       * API response [1]
       * {
            "result": 0,
            "resultMessage": "Berhasil",
            "content": {
                "lowestRepaymentAmount": "130000",
                "outstandingLoanPrincipalTotal": "2860209343838",
                "lowestDailyInterestRate": "0.001290322580645161",
                "disburseAmountThisYear": "8962250199880",
                "lowestReceivedAmount": "125000",
                "borrowerCountInDebt": "2518109",
                "disburseAmountTotal": "41049297484476",
                "highestFeeTotal": "62616626",
                "highestRepaymentAmount": "139554784",
                "lowestFeeTotal": "5000",
                "borrowerCountTotal": "4497692",
                "highestReceivedAmount": "76938158",
                "highestDailyInterestRate": "0.002506410102970092"
            }
        }
       */
        // data adjustment 
        const ADAKAMI_DEFAULT_LENDER = 10 // information based on list of bank displayed on website

        return {
          tkb90_percentage: parsePercentageValue(responseData[0]?.content['tkb'].split(':')[1]),
          disbursement_total: Number(responseData[1]?.content['disburseAmountTotal']),
          disbursement_ytd: Number(responseData[1]?.content['disburseAmountThisYear']),
          loan_outstanding: Number(responseData[1]?.content['outstandingLoanPrincipalTotal']),
          borrower_total: Number(responseData[1]?.content['borrowerCountTotal']),
          borrower_active: Number(responseData[1]?.content['borrowerCountInDebt']),
          // lender_total: -,
          lender_active: ADAKAMI_DEFAULT_LENDER,
        }  
      }
    case "rupiahcepat": // Last updated 5 August 2024
      {
        /**
         * Typical rupiahcepat API response
         * {
            "audit_info": {
                "TKB90": "100%",
                "total_account": "9.0 T",
                "year_account": "4.1 T",
                "total_overdue_amount": "74.8 M",
                "total_loan_account": "5.4 jt",
                "active_loan_account": "4.4 jt",
                "TKB0": "86.06%",
                "TKB30": "93.59%",
                "TKB60": "98.47%",
                "TKB_switch": true
            },
            "audit_month_info": {
                "TKB90": "100%",
                "total_amount": "25.9 T",
                "year_amount": "3227.4 M",
                "total_outstanding_amount": "1053.1 M",
                "total_loan_account": "5.6 jt",
                "total_borrower_account": "966.1 ribu"
            },
            "server_time": 1722833952044,
            "statistic_info": "TKB90=100%"
          }
         */
        
        const rupiahcepatResult = {
          tkb90_percentage: parsePercentageValue(responseData.audit_info['TKB90']),
          disbursement_total:parseAbbrValue(responseData.audit_month_info['total_amount'], 'ID'),
          disbursement_ytd: parseAbbrValue(responseData.audit_month_info['year_amount'], 'ID'),
          loan_outstanding: parseAbbrValue(responseData.audit_month_info['total_outstanding_amount'], 'ID'),
          borrower_total: parseAbbrValue(responseData.audit_month_info['total_borrower_account'], 'ID'),
          // borrower_active: -
          // lender_total: -
          // lender_active: -
          source_timestamp: responseData.server_time ? moment(responseData.server_time).toDate() : undefined,
        }
        return rupiahcepatResult;
      }
    case "estakapital": // Last updated 5 August 2024
      // Esta Kapital has web and customized flow
      try {
        const html0 = responseData[0] as string;
        const $1 = cheerio.load(html0);
        const estaTKB90 = $1('body > div.container.counting > div > div:nth-child(3) > h1').text();
        const estaDisbursementTotal = $1('body > div.container.counting > div > div:nth-child(2) > h1').text();

        const html1 = responseData[1] as string;
        const $2 = cheerio.load(html1);
        const estaDisbursementYTDElement = $2('body > div.container > div > div:nth-child(1) > div:nth-child(1) > h3 > span');
        const estaLoanOutstandingElement = $2('body > div.container > div > div:nth-child(4) > div:nth-child(1) > h3 > span');
        const estaTotalBorrowerElement = $2('body > div.container > div > div:nth-child(1) > div:nth-child(2) > h3 > span');
        const estaActiveBorrowerElement = $2('body > div.container > div > div:nth-child(1) > div:nth-child(3) > h3 > span');
        const estaTotalLenderElement = $2('body > div.container > div > div:nth-child(4) > div:nth-child(2) > h3 > span');
        const estaActiveLenderElement = $2('body > div.container > div > div:nth-child(4) > div:nth-child(3) > h3 > span');
        
        const estaDisbursementYTD = `${estaDisbursementYTDElement.attr('data-val')}${estaDisbursementYTDElement.attr('data-prefix')}`
        const estaLoanOutstanding = `${estaLoanOutstandingElement.attr('data-val')}${estaLoanOutstandingElement.attr('data-prefix')}`
        const estaTotalBorrower = `${estaTotalBorrowerElement.attr('data-val')}`
        const estaActiveBorrower = `${estaActiveBorrowerElement.attr('data-val')}`
        const estaTotalLender = `${estaTotalLenderElement.attr('data-val')}`
        const estaActiveLender = `${estaActiveLenderElement.attr('data-val')}`
        
        // custom mapping due to source behavior
        const adjustedEstaDisbursementTotal = parseAbbrValue(estaDisbursementTotal, 'ID') <= Number(estaDisbursementTotal) ? Number(estaDisbursementTotal) * 1_000_000_000 : parseAbbrValue(estaDisbursementTotal, 'ID')
        
        const estaResult = {
          tkb90_percentage: parsePercentageValue(estaTKB90),
          disbursement_total: adjustedEstaDisbursementTotal,
          disbursement_ytd: parseAbbrValue(estaDisbursementYTD, 'ID'),
          loan_outstanding: parseAbbrValue(estaLoanOutstanding, 'ID'),
          borrower_total: (Number(estaTotalBorrower)),
          borrower_active: (Number(estaActiveBorrower)),
          lender_total: (Number(estaTotalLender)),
          lender_active: (Number(estaActiveLender)),
          source_timestamp: moment().toDate(),
        }
        return estaResult;
      } catch (error) {
        console.log(`[FAILED_MAPPING][${companyAlias}]${error}`)
        return {} as monitoringLogData
      }
    case "ammana": // Last updated 6 August 2024
      {
        /**
         * Typical Ammana API Response
         * {
            "data": {
                "disbursed_campaign": {
                    "this_year": 909270689161,
                    "last_year": 46970,
                    "only_last_year": 0,
                    "only_this_year": 115000000000
                },
                "total_customer": 255379,
                "tkb90": "97.05%",
                "npl90": "2.95%",
                "total_investor": 10397
            },
            "meta": {
                "hostname": "p2p-api-5bb49d5854-l9th5"
            }
          }
         */

        const ammanaResult = {
          tkb90_percentage: parsePercentageValue(responseData.data['tkb90']),
          disbursement_total:Number(responseData.data['disbursed_campaign']['this_year']),
          disbursement_ytd: Number(responseData.data['disbursed_campaign']['only_this_year']),
          // loan_outstanding: parseAbbrValue(responseData.data['total_outstanding_amount'], 'ID'),
          borrower_total: Number(responseData.data['total_customer']),
          // borrower_active: -
          lender_total: Number(responseData.data['total_investor']),
          // lender_active: -,
          // source_timestamp: -,
        }
        return ammanaResult;
      }  
    case "indodana":
      const indoDanaTKB90 = responseData.pageProps?.initialState?.loanMetrics?.data?.tkb;
      return { tkb90_percentage: indoDanaTKB90 };
    case "maucash":
      const maucashTKB90 =  "TKB 90 | 90,50%";
      console.log(responseData.split('|').pop().trim().replace('%',''));
    case "danamas": // Last updated 6 August 2024
      try {
        const html = responseData as string;
        const $ = cheerio.load(html);
        const danamasTKB90Element = $('#js_example').text().trim();
        const danamasHTML = $('.each-info--desc');
        const danamasDisbursementTotal = danamasHTML.filter((i, el) => $(el).text().includes('Pinjaman Terealisasi') && !$(el).text().trim().includes('Jumlah Pinjaman Terealisasi')).find('span').first().text(); // expected sample: Rp. 44,460,086,506
        const danamasDisbursementYTD = danamasHTML.filter((i, el) => $(el).text().includes('Pinjaman Tahun Berjalan')).find('span').first().text(); // expected sample: Rp. 44,460,086,506
        const danamasLoanOutstanding = danamasHTML.filter((i, el) => $(el).text().includes('Jumlah Outstanding Pinjaman')).find('span').first().text(); // expected sample: Rp. 44,460,086,506
        const danamasTotalBorrower = danamasHTML.filter((i, el) => $(el).text().includes('Jumlah Peminjam')).find('span').first().text(); // expected sample: 2,026,984
        const danamasActiveBorrower = danamasHTML.filter((i, el) => $(el).text().includes('Jumlah Peminjam Aktif')).find('span').first().text(); // expected sample: 1,578,419
        const danamasTotalLender = danamasHTML.filter((i, el) => $(el).text().includes('Pemodal Terdaftar')).find('span').first().text(); // expected sample: 595,137
        
        // additional data adjustment
        const tkb90Match = danamasTKB90Element.match(/TKB90:\s*([\d.]+%)/);
        if (!tkb90Match) return {} as monitoringLogData;
        const tkb90Data = parsePercentageValue(tkb90Match[1]);

        return {
          tkb90_percentage: tkb90Data,
          disbursement_total: Math.floor(parseMonetaryValue(danamasDisbursementTotal)),
          disbursement_ytd: Math.floor(parseMonetaryValue(danamasDisbursementYTD)),
          loan_outstanding: Math.floor(parseMonetaryValue(danamasLoanOutstanding)),
          borrower_total: Math.floor(removeThousandSeparators(danamasTotalBorrower)),
          borrower_active: Math.floor(removeThousandSeparators(danamasActiveBorrower)),
          lender_total: Math.floor(removeThousandSeparators(danamasTotalLender)),
          // lender_active: -,
          source_timestamp: moment().toDate(),
        }
      } catch (error) {
        console.log(`[FAILED_MAPPING][${companyAlias}]${error}`)
        return {} as monitoringLogData
      }
    default:
      return {} as monitoringLogData;
  }
}