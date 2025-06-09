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
select * from users;

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

INSERT INTO producer_contracts (
    org_id,
    version,
    status,
    content,
    created_by
) VALUES
(1, 'v1.0', 'draft', 'Sample contract content v1.0 from Org 1', 'admin@datavizz.in'),
(2, 'v2.1', 'in_approval', 'Sample contract content v2.1 from Org 2', 'lead@orgtwo.com'),
(1, 'v1.1', 'approved', 'Updated approved contract v1.1 from Org 1', 'admin@datavizz.in');
select * from producer_contracts;

INSERT INTO consumer_contracts (
    org_id,
    producer_contract_id,
    constraints,
    created_by
) VALUES
(3, 1, 'Field A must be non-null; Field B must be numeric', 'consumer1@thirdparty.com'),
(4, 2, 'Must include delivery schedule and SLA in metadata', 'consumer@fourthorg.com'),
(3, 3, 'Field C max length 255; Field D allowed values: A, B, C', 'consumer2@thirdparty.com');
select * from producer_contracts;

INSERT INTO organization (id, name) VALUES
(1, 'Datavizz'),
(2, 'OrgTwo'),
(3, 'ThirdPartyConsumers'),
(4, 'FourthOrg');

select * from consumer_contracts;
show tables;

INSERT INTO users (
    name,
    email,
    org_name,
    org_id,
    is_producer,
    is_consumer,
    is_admin
) VALUES
-- Admin of Datavizz
('Alice Admin', 'admin@datavizz.in', 'Datavizz', 1, FALSE, FALSE, TRUE),

-- Producer from Datavizz
('Bob Producer', 'bob@datavizz.in', 'Datavizz', 1, TRUE, FALSE, FALSE),

-- Producer and Consumer from OrgTwo
('Carol Both', 'carol@orgtwo.com', 'OrgTwo', 2, TRUE, TRUE, FALSE),

-- Consumer from ThirdPartyConsumers
('Dave Consumer', 'dave@thirdparty.com', 'ThirdPartyConsumers', 3, FALSE, TRUE, FALSE),

-- Admin of FourthOrg
('Eve Admin', 'eve@fourthorg.com', 'FourthOrg', 4, FALSE, FALSE, TRUE),

-- Consumer from FourthOrg
('Frank Consumer', 'frank@fourthorg.com', 'FourthOrg', 4, FALSE, TRUE, FALSE);
select * from users ;

ALTER TABLE producer_contracts
 add column producer_hash_id VARCHAR(255);
select * from producer_contracts;
ALTER TABLE producer_contracts
	drop column consumer_hash_id;
    
ALTER TABLE producer_contracts
MODIFY COLUMN status ENUM('draft', 'published', 'rejected','depreciated') DEFAULT 'draft';

UPDATE producer_contracts
SET status = 'published'
WHERE status = 'approved';

UPDATE producer_contracts
SET status = 'published'
WHERE status = 'approved' AND id IS NOT NULL;


UPDATE producer_contracts
SET status = 'draft'
WHERE status = 'in_approval';


select * from consumer_contracts;

-- Now run your update
UPDATE producer_contracts
SET status = 'published'
WHERE status = 'approved';
SET SQL_SAFE_UPDATES = 0;

ALTER TABLE consumer_contracts
ADD COLUMN status ENUM('draft', 'published', 'rejected', 'depreciated') DEFAULT 'draft';

show tables;
select * from consumer_contracts;
select * from producer_contracts;
drop table producer_contracts;
show tables;
SELECT 
    CONSTRAINT_NAME, 
    TABLE_NAME, 
    COLUMN_NAME, 
    REFERENCED_TABLE_NAME, 
    REFERENCED_COLUMN_NAME
FROM 
    information_schema.KEY_COLUMN_USAGE
WHERE 
    TABLE_NAME = 'approval_requests' 
    AND CONSTRAINT_SCHEMA = DATABASE()
    AND REFERENCED_TABLE_NAME IS NOT NULL;


ALTER TABLE approval_requests DROP FOREIGN KEY fk_target_contract;
