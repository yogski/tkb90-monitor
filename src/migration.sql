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
  tkb90_percentage NUMERIC
);
