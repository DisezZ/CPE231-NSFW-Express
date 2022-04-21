CREATE TABLE IF NOT EXISTS `Position` (
  `position_id`                 INT(11)         NOT NULL AUTO_INCREMENT,
  `position_name`               VARCHAR(64)     NOT NULL UNIQUE,
  PRIMARY KEY (`position_id`)
);

CREATE TABLE IF NOT EXISTS `User` (
  `user_id`                     INT(11)         NOT NULL AUTO_INCREMENT,
  `position_id`                 INT(11)         NOT NULL,
  `first_name`                  VARCHAR(64)     NOT NULL,
  `last_name`                   VARCHAR(64)     NOT NULL,
  `date_of_birth`               DATE            NOT NULL,
  `email`                       VARCHAR(128)    NOT NULL UNIQUE,
  `mobile_number`               CHAR(10)        NOT NULL UNIQUE,
  `address`                     VARCHAR(256)    NOT NULL,
  `sex`                         CHAR(1)         NOT NULL,
  `username`                    VARCHAR(64)     NOT NULL UNIQUE,
  `password`                    VARCHAR(64)     NOT NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`position_id`) REFERENCES `Position`(`position_id`)
);

CREATE TABLE IF NOT EXISTS `Customer` (
  `customer_id`                 INT(11)         NOT NULL AUTO_INCREMENT,
  `user_id`                     INT(11)         NOT NULL UNIQUE,
  PRIMARY KEY (`customer_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `Manager` (
  `manager_id`                  INT(11)         NOT NULL AUTO_INCREMENT,
  `user_id`                     INT(11)         NOT NULL UNIQUE,
  PRIMARY KEY (`manager_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `Bank` (
  `bank_id`                     INT(11)         NOT NULL AUTO_INCREMENT,
  `manager_id`                  INT(11)         NOT NULL UNIQUE,
  `bank_name`                   VARCHAR(64)     NOT NULL UNIQUE,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bank_id`),
  FOREIGN KEY (`manager_id`) REFERENCES `Manager`(`manager_id`)
);

CREATE TABLE IF NOT EXISTS `Branch` (
  `branch_id`                   INT(11)         NOT NULL AUTO_INCREMENT,
  `bank_id`                     INT(11)         NOT NULL,
  `branch_name`                 VARCHAR(64)     NOT NULL,
  `branch_address`              VARCHAR(256)    NOT NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`branch_id`),
  FOREIGN KEY (`bank_id`) REFERENCES `Bank`(`bank_id`),
  CONSTRAINT `uc_bank_branch` UNIQUE (`bank_id`, `branch_id`)
);

CREATE TABLE IF NOT EXISTS `Employee` (
  `employee_id`                 INT(11)         NOT NULL AUTO_INCREMENT,
  `branch_id`                   INT(11)         NOT NULL,
  `user_id`                     INT(11)         NOT NULL UNIQUE,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`branch_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `Membership` (
  `membership_id`               INT(11)         NOT NULL AUTO_INCREMENT,
  `membership_name`             VARCHAR(64)     NOT NULL UNIQUE,
  `loan_amount`                 DECIMAL(15,2)   NOT NULL,
  `loan_interest_rate`          TINYINT         NOT NULL,
  `deposit_interest_rate`       TINYINT         NOT NULL,
  PRIMARY KEY (`membership_id`)
);

CREATE TABLE IF NOT EXISTS `Account` (
  `account_id`                  INT(11)         NOT NULL AUTO_INCREMENT,
  `customer_id`                 INT(11)         NOT NULL,
  `branch_id`                   INT(11)         NOT NULL,
  `membership_id`               INT(11)         NOT NULL,
  `balance`                     DECIMAL(15,2)   NOT NULL,
  `created`                     TIMESTAMP       NOT NULL,
  PRIMARY KEY (`account_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`branch_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`),
  FOREIGN KEY (`membership_id`) REFERENCES `Membership`(`membership_id`)
);

CREATE TABLE IF NOT EXISTS `ATM` (
  `atm_id`                      INT(11)         NOT NULL AUTO_INCREMENT,
  `branch_id`                   INT(11)         NOT NULL,
  PRIMARY KEY (`atm_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`branch_id`)
);

CREATE TABLE IF NOT EXISTS `TransactionStatus` (
  `transaction_status_id`       INT(11)         NOT NULL AUTO_INCREMENT,
  `transaction_status_name`     VARCHAR(64)     NOT NULL UNIQUE,
  PRIMARY KEY (`transaction_status_id`)
);

CREATE TABLE IF NOT EXISTS `ATMTransaction` (
  `atm_transaction_id`          INT(11)         NOT NULL AUTO_INCREMENT,
  `from_account_id`             INT(11)         NOT NULL,
  `atm_id`                      INT(11)         NOT NULL,
  `amount`                      DECIMAL(15,2)   NOT NULL,
  `transaction_status_id`       INT(11)         NOT NULL,
  `payment_approved_by`         INT(11)         NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`atm_transaction_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`),
  FOREIGN KEY (`atm_id`) REFERENCES `ATM`(`atm_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`)
);

CREATE TABLE IF NOT EXISTS `TransferTransaction` (
  `transfer_transaction_id`     INT(11)         NOT NULL AUTO_INCREMENT,
  `from_account_id`             INT(11)         NOT NULL,
  `to_account_id`               INT(11)         NOT NULL,
  `amount`                      DECIMAL(15,2)   NOT NULL,
  `transaction_status_id`       INT(11)         NOT NULL,
  `payment_approved_by`         INT(11)         NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transfer_transaction_id`),
  FOREIGN KEY (`to_account_id`) REFERENCES `Account`(`account_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`)
);

CREATE TABLE IF NOT EXISTS `Loan` (
  `loan_id`                     INT(11)         NOT NULL AUTO_INCREMENT,
  `account_id`                  INT(11)         NOT NULL,
  `initial_amount`              DECIMAL(15,2)   NOT NULL,
  `left_amount`                 DECIMAL(15,2)   NOT NULL,
  `interest_rate`               TINYINT         NOT NULL,
  `transaction_status_id`       INT(11)         NOT NULL,
  `loan_approved_by`            INT(11)         NOT NULL,
  `payment_approved_by`         INT(11)         NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`loan_id`),
  FOREIGN KEY (`loan_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`account_id`) REFERENCES `Account`(`account_id`)
);

CREATE TABLE IF NOT EXISTS `LoanPaying` (
  `loan_paying_id`              INT(11)         NOT NULL AUTO_INCREMENT,
  `loan_id`                     INT(11)         NOT NULL,
  `amount`                      DECIMAL(15,2)   NOT NULL,
  `transaction_status_id`       INT(11)         NOT NULL,
  `payment_approved_by`         INT(11)         NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`loan_paying_id`),
  FOREIGN KEY (`loan_id`) REFERENCES `Loan`(`loan_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE IF NOT EXISTS `BillingTransaction` (
  `billing_transaction_id`      INT(11)         NOT NULL AUTO_INCREMENT,
  `from_account_id`             INT(11)         NOT NULL,
  `amount`                      DECIMAL(15,2)   NOT NULL,
  `transaction_status_id`       INT(11)         NOT NULL,
  `payment_approved_by`         INT(11)         NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`billing_transaction_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE IF NOT EXISTS `TopupTransaction` (
  `topup_transaction_id`        INT(11)         NOT NULL AUTO_INCREMENT,
  `from_account_id`             INT(11)         NOT NULL,
  `mobile_number`               CHAR(10)        NOT NULL,
  `amount`                      DECIMAL(15,2)   NOT NULL,
  `transaction_status_id`       INT(11)         NOT NULL,
  `payment_approved_by`         INT(11)         NULL,
  `created`                     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`topup_transaction_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`)
);