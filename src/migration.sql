CREATE TABLE tkb90_p2p_provider (
  id SERIAL PRIMARY KEY,
  api_name VARCHAR NOT NULL,
  api_description VARCHAR,
  api_full_path VARCHAR NOT NULL,
  api_http_method VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tkb90_monitoring_log (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  provider_id INTEGER REFERENCES tkb90_p2p_provider(id),
  tkb90_percentage INTEGER
);
