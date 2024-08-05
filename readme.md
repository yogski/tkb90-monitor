# TKB90 Monitor

This is a simple repository to monitor TKB90 values from legal & registered Peer-to-peer lending companies in Indonesia.
This tool only record publicly available Peer-to-peer data such as:
- TKB90
- Outstanding loan
- Total disburse
- Disburse in last 12 months
- Total & active borrowers
- Total & Active lenders

## Available Peer-to-peer Companies


Below is the list of P2P lending companies that has successfully monitored so far. Mapping different companies API and websites is tedious task. To manage expectation, I put dates on each mapping of company data source.

Document reference: [OJK Data 12 July 2024](https://ojk.go.id/id/kanal/iknb/financial-technology/Documents/Penyelenggara%20Fintech%20Lending%20Berizin%20OJK%20per%2012%20Juli%202024.pdf)

| No | Last Update (YYYY-MM-DD) | Company | Registered in OJK | Integration Status |
|----|----|-----|-------------------|--------------------|
| 1  | 2024-07-28 | [Dompet Kilat](https://dompetkilat.co.id)  | ✅      | ✅       |
| 2  | 2024-08-02  | [Boost](https://myboost.co.id)       | ✅      | ✅       |
| 3  | 2024-08-03  | [KTA Kilat / Pendanaan](https://pendanaan.com)       | ✅      | ✅       |
| 4  | 2024-07-30  | [Pinjam Modal](https://pinjammodal.id)       | ✅      | ✅       |
| 5  | 2024-08-02  | [Danabagus](https://danabagus.id)       | ✅      | ✅       |
| 6  | 2024-08-02  | [Uangme](https://uangme.id)       | ✅      | ✅       |
| 7  | 2024-08-02  | [Tokomodal](https://tokomodal.co.id)       | ✅      | ✅       |
| 8  | 2024-08-01  | [Modalku](https://modalku.co.id)       | ✅      | ✅       |
| 9  | 2024-08-05  | [Rupiah Cepat](https://rupiahcepat.co.id)       | ✅      | ✅       |
| 10  | 2024-08-05  | [Esta Kapital](https://estakapital.co.id)       | ✅      | ❌ (Issue in website certificate)       |

## Prerequisites
- Node version `16` or later
- PostgreSQL `9.0` or later

## Setting Up

### Repository
- Clone this repository
- Run `npm install`
- For development, run `npm run dev`
- Build the project: run `npm run build`
- Test the project: run `npm run test`
- Running in production: run `npm run start`

### Environment
- copy `.env.example` and rename it to `.env`
- Fill the required environment variable to ensure the program running smoothly
    ```bash
    PG_HOST=
    PG_PORT=
    PG_DATABASE=
    PG_USER=
    PG_PASSWORD=
    MONITORING_TKB90_CRON=
    ```

### Database
- This repository uses PostgreSQL
- Run query in `./src/migration.sql`
- Fill the `tkb90_p2p_provider` table with relevant data. I recommend using official data from https://ojk.go.id/id/kanal/iknb/financial-technology/Default.aspx. The list is updated periodically.

## P2P List


## Next Step
I am working on the API and front-end for this TKB90 data project.
Please let me know if anyone is willing to help :)

## Live Version
Coming soon...