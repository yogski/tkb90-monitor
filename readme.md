# TKB90 Monitor

This is a simple repository to monitor TKB90 values from Peer-to-peer lending companies in Indonesia.
This tool only record publicly available Peer-to-peer data such as:
- TKB90
- Outstanding loan
- Total disburse
- Disburse in last 12 months
- Total & active borrowers
- Total & Active lenders

## Available Peer-to-peer Companies
Mapping different companies API and websites is tedious task. To manage expectation, I put dates on each mapping of company data source.
- [Pinjam Modal](https://pinjammodal.id) --> Last updated 31 July 2024
- 

## Prerequisites
- Node version `16` or later
- PostgreSQL `9.0` or later

## Setting Up

### Repository
- Clone this repository
- Run `npm install`
- For development, run `npm run dev`
- Build the project: run `npm run build`
- Running in production: run `npm run start`

### Database
- This repository uses PostgreSQL
- Run query in `./src/migration.sql`
- Fill the `tkb90_p2p_provider` table with relevant data. I recommend using official data from https://ojk.go.id/id/kanal/iknb/financial-technology/Default.aspx. The list is updated periodically.

## Next Step
I am working on the API and front-end for this TKB90 data project.
Please let me know if anyone is willing to help :)

## Live Version
Coming soon...