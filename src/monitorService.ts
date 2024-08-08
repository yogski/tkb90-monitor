import axios, { AxiosRequestConfig } from 'axios';
import { fetchP2PSourceList, saveToMonitoringLog } from './databaseService';
import { simpleErrorHandler } from './handlers/simpleErrorHandler';
import { mappingHandler } from './handlers/mappingHandler';
import { P2PSourceData } from './types';
import { processAdakamiSource, processEstaKapitalSource, processPinjamanGoSource, processUangmeSource } from './handlers/specialServiceHandler';
import { measureExecutionTime } from './handlers/measureHandler';

export async function fetchDataAndSaveToDatabase() {
  try {
    const P2PSource = await fetchP2PSourceList();
    console.log(`Detected ${P2PSource.length} sources...`)
    for (const p2p of P2PSource) {
      console.log(`Processing ${p2p.source_name} source...`)
      const label = `${p2p.source_type} ${p2p.source_name}`;
      switch (p2p.source_type.toLowerCase()) {
        case 'api':
          await measureExecutionTime(() => processAPISource(p2p), label);
          break;
        case 'web':
          await measureExecutionTime(() => processWebSource(p2p), label);
          break;
        case 'api-uangme':
          await measureExecutionTime(() => processUangmeSource(p2p), label);
          break;
        case 'api-adakami':
          await measureExecutionTime(() => processAdakamiSource(p2p), label);
          break;  
        case 'api-pinjamango':
          await measureExecutionTime(() => processPinjamanGoSource(p2p), label);
          break;  
        case 'web-estakapital':
          await measureExecutionTime(() => processEstaKapitalSource(p2p), label);
          break;
        default:
          break;
      }
    }
    console.log(`Done.`)
  } catch (error) {
    simpleErrorHandler(error)
  }
}

async function processAPISource(source: P2PSourceData) {
  const axiosConfig: AxiosRequestConfig = {
    method: source.http_method,
    url: source.full_path,
    data: source.http_method === 'GET' ? null : source.http_body || {},
    headers: source.http_header ? source.http_header : null,
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
    const response = await axios.get(source.full_path);
    const responseData = response.data;
    const mappedData = mappingHandler(source.source_name, responseData)
    await saveToMonitoringLog(source.id, mappedData);
  } catch (error) {
    simpleErrorHandler(error);
  }
}