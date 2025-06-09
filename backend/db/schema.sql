CREATE DATABASE IF NOT EXISTS data_contract;
USE data_contract;

-- Table: organizations (renamed from organization for consistency)
CREATE TABLE IF NOT EXISTS organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    org_name VARCHAR(255) NOT NULL,
    org_id INT NOT NULL,
    is_producer BOOLEAN DEFAULT FALSE,
    is_consumer BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: approval_requests
CREATE TABLE IF NOT EXISTS approval_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    target_contract_id VARCHAR(200) NOT NULL,  -- Assuming it references producer_hash_id or consumer_hash_id (use VARCHAR to be flexible)
    proposed_changes TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    initiator_id INT NOT NULL,
    approvers_pending TEXT,      -- comma-separated list of user IDs or emails (consider normalization later)
    approvers_approved TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: producer_contracts
CREATE TABLE IF NOT EXISTS producer_contracts (
    id INT NOT NULL,
    version VARCHAR(50) NOT NULL,
    producer_hash_id VARCHAR(200) GENERATED ALWAYS AS (CONCAT(id, '-', version)) STORED PRIMARY KEY,
    org_id INT NOT NULL,
    status ENUM('draft', 'published', 'rejected', 'depreciated') DEFAULT 'draft',
    content JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL
);

-- Table: consumer_contracts
CREATE TABLE IF NOT EXISTS consumer_contracts (
    id INT NOT NULL,
    org_id INT NOT NULL,
    version VARCHAR(50) NOT NULL,
    status ENUM('draft', 'published', 'rejected', 'depreciated') DEFAULT 'draft',
    content JSON NOT NULL,
    consumer_hash_id VARCHAR(100) NOT NULL,
    producer_hash_id VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (consumer_hash_id),
    
    FOREIGN KEY (producer_hash_id) REFERENCES producer_contracts(producer_hash_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

DELIMITER //

CREATE TRIGGER set_consumer_hash_id
BEFORE INSERT ON consumer_contracts
FOR EACH ROW
BEGIN
    SET NEW.consumer_hash_id = CONCAT(NEW.id, '-', NEW.version);
END;
//

DELIMITER ;
