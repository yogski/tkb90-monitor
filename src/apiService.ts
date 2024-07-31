import axios from 'axios';
import { fetchP2PSourceList, saveToMonitoringLog } from './databaseService';
import { simpleErrorHandler } from './simpleErrorHandler';
import { mappingHandler } from './handlers/mappingHandler';
import { P2PSourceData } from './types';

export async function fetchDataAndSaveToDatabase() {
  try {
    const P2PSource = await fetchP2PSourceList();
    for (const p2p of P2PSource) {
      switch (p2p.source_type.toLowerCase()) {
        case 'api':
          await processAPISource(p2p)
          break;
        case 'web':
          await processWebSource(p2p);
          break;
        default:
          break;
      }
    }
  } catch (error) {
    simpleErrorHandler(error)
  }
}

async function processAPISource(source: P2PSourceData) {
  const axiosConfig = {
    method: source.http_method,
    url: source.full_path,
    data: source.http_body || {},
    // Add other axios configuration options as needed
  };

  try {
    const response = await axios(axiosConfig);
    const responseData = response.data;
    const mappedData = mappingHandler(source.source_name, responseData)
    await saveToMonitoringLog(source.id, mappedData);
  } catch (error) {
    simpleErrorHandler(error, source.source_name);
  }
}

async function processWebSource(source: P2PSourceData) {
  try {
    const responseData = {};
    const mappedData = mappingHandler(source.source_name, responseData)
    await saveToMonitoringLog(source.id, mappedData);
  } catch (error) {
    simpleErrorHandler(error);
  }
}