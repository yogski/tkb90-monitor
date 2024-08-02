import * as cron from 'cron';
import { fetchDataAndSaveToDatabase } from './monitorService';
import moment = require('moment');
import * as dotenv from 'dotenv';

dotenv.config();

export function tkb90cronJob() {
  const cronExecution = process.env.MONITORING_TKB90_CRON || '0 0 1 * * *';
  const job = new cron.CronJob(cronExecution , () => {
    console.log(`Monitoring at ${moment().toLocaleString()}...`)
    fetchDataAndSaveToDatabase();
  });

  job.start();
}
