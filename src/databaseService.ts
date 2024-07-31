import { simpleErrorHandler } from './simpleErrorHandler';
import * as pgPromise from 'pg-promise';
import * as dotenv from 'dotenv';
import { monitoringLogData, P2PSourceData } from './types';

// Load environment variables from the .env file
dotenv.config();

const pgp = pgPromise();

const dbConfig = {
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432', 10),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

const db = pgp(dbConfig);

export async function saveToMonitoringLog(providerId: number, responseData: monitoringLogData) {
  try {
    // Save the data to tkb90_monitoring_log table
    await db.none(
      `INSERT INTO tkb90_monitoring_log 
      (provider_id, tkb90_percentage, disbursement_total, disbursement_ytd, loan_outstanding, borrower_total, borrower_active, lender_total, lender_active) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
    , [
      providerId,
      responseData.tkb90_percentage,
      responseData.disbursement_total,
      responseData.disbursement_ytd,
      responseData.loan_outstanding,
      responseData.borrower_total,
      responseData.borrower_active,
      responseData.lender_total,
      responseData.lender_active,
    ]);
  } catch (error) {
    simpleErrorHandler(error);
  }
}

export async function fetchP2PSourceList() {
  return await db.any('SELECT * FROM tkb90_p2p_provider WHERE is_active = true') as P2PSourceData[];
}
