CREATE DATABASE data_contract;
use data_contract;
CREATE TABLE producer_contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    org_id INT NOT NULL,
    version VARCHAR(50) NOT NULL,
    status ENUM('draft', 'in_approval', 'approved', 'rejected') DEFAULT 'draft',
    content TEXT NOT NULL,
    created_by VARCHAR(255) NOT NULL,  -- stores email
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
show tables;
select * from producer_contracts;

CREATE TABLE consumer_contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    org_id INT NOT NULL,
    producer_contract_id INT NOT NULL,
    constraints TEXT NOT NULL,
    created_by VARCHAR(255) NOT NULL,  -- stores email
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_producer_contract FOREIGN KEY (producer_contract_id) REFERENCES producer_contracts(id) ON DELETE CASCADE
);
show tables;
select * from producer_contracts;

CREATE TABLE approval_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    target_contract_id INT NOT NULL,
    proposed_changes TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    initiator_id INT NOT NULL,
    approvers_pending TEXT,      -- comma-separated list of user IDs or emails
    approvers_approved TEXT,     -- comma-separated list of user IDs or emails
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_target_contract FOREIGN KEY (target_contract_id)
        REFERENCES producer_contracts(id)
        ON DELETE CASCADE
);
show tables;
select * from approval_requests;

CREATE TABLE users (
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

show tables;
select * from users;

CREATE TABLE organization (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Organization ID
    name VARCHAR(255) NOT NULL,                -- Organization name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Creation timestamp
);
show tables;
select * from users;
describe tables;

