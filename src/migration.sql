CREATE TABLE tkb90_p2p_provider (
  id SERIAL PRIMARY KEY,
  source_name VARCHAR NOT NULL,
  description VARCHAR,
  source_type VARCHAR NOT NULL, -- expected: API or WEB
  full_path VARCHAR NOT NULL,
  http_method VARCHAR NOT NULL,
  http_params JSON,
  http_header JSON,
  http_body JSON,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tkb90_monitoring_log (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  provider_id INTEGER REFERENCES tkb90_p2p_provider(id),
  tkb90_percentage NUMERIC DEFAULT NULL,
  disbursement_total BIGINT DEFAULT NULL,
  disbursement_ytd BIGINT DEFAULT NULL,
  loan_outstanding BIGINT DEFAULT NULL,
  borrower_total INTEGER DEFAULT NULL,
  borrower_active INTEGER DEFAULT NULL,
  lender_total INTEGER DEFAULT NULL,
  lender_active INTEGER DEFAULT NULL,
  source_timestamp TIMESTAMP DEFAULT NULL
);

INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('pinjammodal.id', 'https://api.pinjammodal.io:8443/landing/overview', NULL, NULL, 'POST', 'pinjammodal', 'api', '2024-07-31 07:56:45.498548');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('dompetkilat.co.id', 'https://agartha-cosm.dompetkilat.co.id/v1/public/company-profile', NULL, NULL, 'GET', 'dompetkilat', 'api', '2024-07-31 11:04:30.399886');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('modalku.co.id', 'https://api.modalku.co.id/api/v2/statistics/ojk', NULL, NULL, 'GET', 'modalku', 'api', '2024-08-01 09:29:46.490708');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('myboost.co.id', 'https://myboost.co.id', NULL, NULL, 'GET', 'boost', 'web', '2024-08-02 03:35:13.949387');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('tokomodal.co.id', 'https://corereginaam.tokomodal.co.id/lookup/widget-statistic', NULL, NULL, 'GET', 'tokomodal', 'api', '2024-08-02 06:38:53.836498');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('KTA Kilat , pendanaan.com', 'https://gateway.pendanaan.com/kta/api/v1/ojk/listOjkRecord', NULL, '{"tenant":"KTAID"}', 'POST', 'pendanaan', 'api', '2024-08-02 08:32:07.738357');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('danabagus.id', 'https://danabagus.id/statistics/', NULL, NULL, 'GET', 'danabagus', 'web', '2024-08-02 09:56:45.323446');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type", "updated_at") values ('uangme.id', 'https://api.uangme.com/api', NULL, NULL, 'GET', 'uangme', 'api-uangme', '2024-08-02 10:25:04.155007');
