import { simpleErrorHandler } from './simpleErrorHandler';
import * as pgPromise from 'pg-promise';
import * as dotenv from 'dotenv';
import { mappingOutput } from './handlers/mappingHandler';

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

export async function saveToMonitoringLog(providerId: number, responseData: mappingOutput) {
  try {
    // Save the data to tkb90_monitoring_log table
    await db.none('INSERT INTO tkb90_monitoring_log (provider_id, tkb90_percentage) VALUES ($1, $2)', [
      providerId,
      responseData.tkb90_percentage, // Adjust this based on your response structure
    ]);
  } catch (error) {
    simpleErrorHandler(error);
  }
}

export async function fetchProviders() {
  return await db.any('SELECT * FROM tkb90_p2p_provider WHERE is_active = true');
}
