# TKB90 Monitor

This is a simple repository to monitor TKB90 values from legal & registered Peer-to-peer lending companies in Indonesia.
This tool only record publicly available Peer-to-peer data such as:
- TKB90
- Outstanding loan
- Total disburse
- Disburse in last 12 months
- Total & active borrowers
- Total & Active lenders

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

## Next Step
I am working on the API and front-end for this TKB90 data project.
Please let me know if anyone is willing to help :)

## Live Version
Coming soon...

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
| 10  | 2024-08-05  | [Esta Kapital](https://estakapital.co.id)       | ✅      | ✅       |
| 11  | 2024-08-06  | [Ammana](https://ammana.id)       | ✅      | ✅       |
| 12  | 2024-08-06  | [Akseleran](https://akseleran.co.id)       | ✅      | ✅       |
| 13  | 2024-08-06  | [Pinjaman Go](https://pinjamango.co.id)       | ✅      | ✅       |
| 14  | 2024-08-06  | [Danamas](https://danamas.co.id)       | ✅      | ✅       |
| 15  | 2024-08-08  | [Kredit Pintar](https://kreditpintar.com)       | ✅      | ✅       |
| 16  | 2024-08-08  | [Awan Tunai](https://awantunai.co.id)       | ✅      | ✅       |
| 17  | 2024-08-08  | [Adakami](https://adakami.id)       | ✅      | ✅       |
| 18  | 2024-08-08  | [Investree](https://investree.id)       | ✅      | ❌       |
| 19  | 2024-08-08  | [Amartha](https://amartha.com)       | ✅      | ❌      |
| 20  | 2024-08-08  | [Maucash](https://maucash.id)       | ✅      | ❌      |
| 21  | 2024-08-08  | [Finmas](https://finmas.co.id)       | ✅      | ❌      |
| 22  | 2024-08-08  | [KlikA2C](https://klika2c.co.id)       | ✅      | ✅      |
| 23  | 2024-08-08  | [Koin P2P](https://koinp2p.com)       | ✅      | ❌      |
| 24  | 2024-08-08  | [Mekar](https://mekar.id)       | ✅      | ❌      |
| 25  | 2024-08-08  | [Pohon Dana](https://pohondana.id)       | ✅      | ❌      |
| 26  | 2024-08-08  | [Kreditpro](https://kreditpro.id)       | ✅      | ❌      |
| 27  | 2024-08-08  | [Fintag](https://fintag.id)       | ✅      | ❌      |
| 28  | 2024-08-08  | [Crowdo](https://crowdo.co.id)       | ✅      | ❌      |
| 29  | 2024-08-08  | [Indodana](https://indodana.id)       | ✅      | ❌      |
| 30  | 2024-08-08  | [Danarupiah](https://danarupiah.id)       | ✅      | ❌      |
| 31  | 2024-08-08  | [Pinjamwinwin](https://Pinjamwinwin.com)       | ✅      | ✅      |
| 32  | 2024-08-08  | [Julo](https://julo.co.id)       | ✅      | ❌      |
| 33  | 2024-08-08  | [OVO Finansial](https://ovofiansial.com)       | ✅      | ❌      |
| 34  | 2024-08-08  | [Alami](https://p2p.alamisharia.co.id)       | ✅      | ❌      |
| 35  | 2024-08-08  | [DanaKini](https://danakini.co.id)       | ✅      | ❌      |
| 36  | 2024-08-08  | [Singa](https://singa.id)       | ✅      | ❌      |
| 37  | 2024-08-08  | [Pinjam yuk](https://pinjamyuk.co.id)       | ✅      | ❌      |
| 38  | 2024-08-08  | [Finplus](https://finplus.co.id)       | ✅      | ❌      |
| 39  | 2024-08-08  | [PinjamDuit](https://pinjamduit.co.id)       | ✅      | ❌      |
| 40  | 2024-08-08  | [EasyCash](https://easycash.id)       | ✅      | ❌      |
| 41  | 2024-08-08  | [DanaMerdeka](https://danamerdeka.co.id)       | ✅      | ❌      |
| 42  | 2024-08-08  | [Dana Syariah](https://danasyariah.id)       | ✅      | ❌      |
| 43  | 2024-08-08  | [Batumbu](https://batumbu.id)       | ✅      | ❌      |
| 44  | 2024-08-08  | [Cashcepat](https://cashcepat.id)       | ✅      | ❌      |
| 45  | 2024-08-08  | [KlikUMKM](https://klikUMKM.co.id)       | ✅      | ❌      |
| 46  | 2024-08-08  | [Pinjam Gampang](https://kreditplusteknologi.id)       | ✅      | ❌      |
| 47  | 2024-08-08  | [Cicil](https://cicil.co.id)       | ✅      | ❌      |
| 48  | 2024-08-08  | [Lumbungdana](https://lumbungdana.co.id)       | ✅      | ❌      |
| 49  | 2024-08-08  | [360 Kredi](https://360kredi.id.id)       | ✅      | ❌      |
| 50  | 2024-08-08  | [Kredinesia](https://www.kredinesia.id.id)       | ✅      | ❌      |
