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

INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('pinjammodal.id', 'https://api.pinjammodal.io:8443/landing/overview', NULL, NULL, 'POST', 'pinjammodal', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('dompetkilat.co.id', 'https://agartha-cosm.dompetkilat.co.id/v1/public/company-profile', NULL, NULL, 'GET', 'dompetkilat', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('modalku.co.id', 'https://api.modalku.co.id/api/v2/statistics/ojk', NULL, NULL, 'GET', 'modalku', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('myboost.co.id', 'https://myboost.co.id', NULL, NULL, 'GET', 'boost', 'web');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('tokomodal.co.id', 'https://corereginaam.tokomodal.co.id/lookup/widget-statistic', NULL, NULL, 'GET', 'tokomodal', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('KTA Kilat , pendanaan.com', 'https://gateway.pendanaan.com/kta/api/v1/ojk/listOjkRecord', NULL, '{"tenant":"KTAID"}', 'POST', 'pendanaan', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('danabagus.id', 'https://danabagus.id/statistics/', NULL, NULL, 'GET', 'danabagus', 'web');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('uangme.id', 'https://api.uangme.com/api', NULL, NULL, 'GET', 'uangme', 'api-uangme');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('rupiahcepat.co.id', 'https://webapi-microloan-id.rupiahcepatweb.com/public/repay/statistic/info', NULL, NULL, 'POST', 'rupiahcepat', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('estakapital.co.id', 'https://www.estakapital.co.id', NULL, NULL, 'GET', 'estakapital', 'web');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('ammana.id', 'https://api.ammana.id/v3/dashboards/statistics', NULL, NULL, 'GET', 'ammana', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('akseleran.co.id', 'https://core.akseleran.com/api/v1/dashboards/statistic', NULL, NULL, 'GET', 'akseleran', 'api');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('pinjamango.co.id', 'https://www.pinjamango.com:9022', NULL, NULL, 'POST', 'pinjamango', 'api-pinjamango');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('danamas.co.id', 'https://danamas.co.id/web/HomeAction_home.action', NULL, NULL, 'GET', 'danamas', 'web');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('kreditpintar.com', 'https://www.kreditpintar.com/about-us', NULL, NULL, 'GET', 'kreditpintar', 'web');
INSERT INTO "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('awantunai.co.id', 'https://metabi.awantunai.co.id/api/public/card/7c6ce076-0f57-4276-a188-d38a216312d9/query?parameters=%5B%5D', NULL, NULL, 'GET', 'awantunai', 'api');
insert into "tkb90_p2p_provider" ("description", "full_path", "http_body", "http_header", "http_method", "source_name", "source_type") values ('adakami.id', 'https://api.adakami.id/adaKredit/stats', NULL, NULL, 'POST', 'adakami', 'api-adakami');
