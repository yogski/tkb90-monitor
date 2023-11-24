import axios from 'axios';
import { fetchProviders, saveToMonitoringLog } from './databaseService';
import { simpleErrorHandler } from './simpleErrorHandler';
import { mappingHandler } from './mappingHandler';

export async function fetchDataAndSaveToDatabase() {
  try {
    const providers = await fetchProviders();
    for (const provider of providers) {
      const { id, source_name: apiName, api_full_path: apiPath, api_http_method: apiHttpMethod } = provider;

      // Craft axios request
      const axiosConfig = {
        method: apiHttpMethod,
        url: apiPath,
        // Add other axios configuration options as needed
      };

      try {
        const response = await axios(axiosConfig);

        // Process the response data or save it to the database as needed
        const responseData = response.data;
        const mappedData = mappingHandler(apiName, responseData)
        // Example: Save responseData to tkb90_monitoring_log table
        await saveToMonitoringLog(id, mappedData);
      } catch (error) {
        simpleErrorHandler(error);
      }
    }
  } catch (error) {
    simpleErrorHandler(error)
  }
}

