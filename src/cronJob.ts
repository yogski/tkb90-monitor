import * as cron from 'cron';
import { fetchDataAndSaveToDatabase } from './apiService';
import moment = require('moment');

export function tkb90cronJob() {
  const job = new cron.CronJob('0 0 8,16 * * *', () => {
    // Run every hour, adjust the cron expression as needed
    console.log(`Monitoring at ${moment().toLocaleString()}...`)
    fetchDataAndSaveToDatabase();
  });

  job.start();
}
