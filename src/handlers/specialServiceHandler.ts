/**
 * This file contains functions for specialized flow, where the process involves more than one API endpoint or web page
 * This will have specialized source_type name in tkb90_p2p_provider table
 */

import axios, { AxiosRequestConfig } from "axios";
import { P2PSourceData } from "../types";
import { mappingHandler } from "./mappingHandler";
import { saveToMonitoringLog } from "../databaseService";
import { simpleErrorHandler } from "./simpleErrorHandler";

export async function processUangmeSource(source: P2PSourceData) {
  const tkbConfig: AxiosRequestConfig = {
    method: source.http_method,
    url: `${source.full_path}/app_tkb`,
    data: source.http_method === 'GET' ? null : source.http_body || {},
    headers: source.http_header ? source.http_header : null,
    // Add other axios configuration options as needed
  };

  const summaryConfig: AxiosRequestConfig = {
    method: source.http_method,
    url: `${source.full_path}/tkb_summary`,
    data: source.http_method === 'GET' ? null : source.http_body || {},
    headers: source.http_header ? source.http_header : null,
    // Add other axios configuration options as needed
  };

  try {
    const responseData: any = [];
    const tkbResponse = await axios(tkbConfig);
    responseData.push(tkbResponse.data);
    const summaryResponse = await axios(summaryConfig);
    responseData.push(summaryResponse.data);
    const mappedData = mappingHandler(source.source_name, responseData)
    await saveToMonitoringLog(source.id, mappedData);
  } catch (error) {
    simpleErrorHandler(error, source.source_name);
  }
}
