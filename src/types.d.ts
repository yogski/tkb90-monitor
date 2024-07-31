export interface monitoringLogData {
  tkb90_percentage?: number,
  disbursement_total?: number,
  disbursement_ytd?: number,
  loan_outstanding?: number,
  borrower_total?: number,
  borrower_active?: number,
  lender_total?: number,
  lender_active?: number,
}

export interface P2PSourceData {
  id: number,
  source_name: string,
  description: string,
  source_type: 'web' | 'api',
  full_path: string,
  http_method: 'GET' | 'POST' | 'HEAD' | 'OPTIONS',
  http_params?: any, 
  http_header?: any,
  http_body?: any,
}