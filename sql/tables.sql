CREATE TABLE IF NOT EXISTS `Bank` (
  `bank_id`     INT(11)     NOT NULL    AUTO_INCREMENT,
  `manager_id`  INT(11)     NOT NULL,
  `bank_name`   <type>      NOT NULL,
  `created`     <type>      NOT NULL,
  PRIMARY KEY (`bank_id`)
);

CREATE TABLE IF NOT EXISTS `Branch` (
  `branch_id`       INT(11)     NOT NULL    AUTO_INCREMENT,
  `bank_id`         INT(11)     NOT NULL,
  `branch_name`     <type>      NOT NULL,
  `branch_address`  <type>      NOT NULL,
  `created`         <type>      NOT NULL,
  PRIMARY KEY (`branch_id`),
  FOREIGN KEY (`bank_id`) REFERENCES `Bank`(`bank_id`)
);

CREATE TABLE IF NOT EXISTS `Customer` (
  `customer_id`     INT(11)     NOT NULL    AUTO_INCREMENT,
  `user_id`         INT(11)     NOT NULL,
  PRIMARY KEY (`customer_id`)
);

CREATE TABLE IF NOT EXISTS `Membership` (
  `membership_id`           INT(11)     NOT NULL    AUTO_INCREMENT,
  `membership_name`         <type>      NOT NULL,
  `loan_amount`             <type>      NOT NULL,
  `loan_interest_rate`      <type>      NOT NULL,
  `deposit_interest_rate`   <type>      NOT NULL,
  PRIMARY KEY (`membership_id`)
);

CREATE TABLE IF NOT EXISTS `Account` (
  `account_id`      INT(11)     NOT NULL    AUTO_INCREMENT,
  `customer_id`     INT(11)     NOT NULL,
  `branch_id`       INT(11)     NOT NULL,
  `membership_id`   INT(11)     NOT NULL,
  `balance`         <type>      NOT NULL,
  `created`         <type>      NOT NULL,
  PRIMARY KEY (`account_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`branch_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`),
  FOREIGN KEY (`membership_id`) REFERENCES `Membership`(`membership_id`)
);

CREATE TABLE IF NOT EXISTS `ATM` (
  `atm_id`          INT(11)     NOT NULL    AUTO_INCREMENT,
  `branch_id`       INT(11)     NOT NULL,
  PRIMARY KEY (`atm_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`branch_id`)
);

CREATE TABLE IF NOT EXISTS `Employee` (
  `employee_id`     INT(11)     NOT NULL    AUTO_INCREMENT,
  `branch_id`       INT(11)     NOT NULL,
  `user_id`         INT(11)     NOT NULL,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`branch_id`)
);

CREATE TABLE IF NOT EXISTS `TransactionStatus` (
  `transaction_status_id`       INT(11)     NOT NULL    AUTO_INCREMENT,
  `transaction_status_name`     <type>      NOT NULL,
  PRIMARY KEY (`transaction_status_id`)
);

CREATE TABLE IF NOT EXISTS `ATMTransaction` (
  `atm_transaction_id`      INT(11)     NOT NULL    AUTO_INCREMENT,
  `from_account_id`         INT(11)     NOT NULL,
  `atm_id`                  INT(11)     NOT NULL,
  `amount`                  <type>      NOT NULL,
  `transaction_status_id`   INT(11)     NOT NULL,
  `payment_approved_by`     INT(11)     NOT NULL,
  `created`                 <type>      NOT NULL,
  PRIMARY KEY (`atm_transaction_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`),
  FOREIGN KEY (`atm_id`) REFERENCES `ATM`(`atm_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`)
);

CREATE TABLE IF NOT EXISTS `TransferTransaction` (
  `transfer_transaction_id`     INT(11)     NOT NULL    AUTO_INCREMENT,
  `from_account_id`             INT(11)     NOT NULL,
  `to_account_id`               INT(11)     NOT NULL,
  `amount`                      <type>      NOT NULL,
  `transaction_status_id`       INT(11)     NOT NULL,
  `payment_approved_by`         INT(11)     NOT NULL,
  `created`                     <type>      NOT NULL,
  PRIMARY KEY (`transfer_transaction_id`),
  FOREIGN KEY (`to_account_id`) REFERENCES `Account`(`account_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`)
);

CREATE TABLE IF NOT EXISTS `Loan` (
  `loan_id`                 INT(11)     NOT NULL    AUTO_INCREMENT,
  `account_id`              INT(11)     NOT NULL,
  `initial_amount`          <type>      NOT NULL,
  `left_amount`             <type>      NOT NULL,
  `interest_rate`           <type>      NOT NULL,
  `transaction_status_id`   INT(11)     NOT NULL,
  `loan_approved_by`        INT(11)     NOT NULL,
  `payment_approved_by`     INT(11)     NOT NULL,
  `created`                 <type>      NOT NULL,
  PRIMARY KEY (`loan_id`),
  FOREIGN KEY (`loan_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`account_id`) REFERENCES `Account`(`account_id`)
);

CREATE TABLE IF NOT EXISTS `LoanPaying` (
  `loan_paying_id`          INT(11)     NOT NULL    AUTO_INCREMENT,
  `loan_id`                 INT(11)     NOT NULL,
  `amount`                  <type>      NOT NULL,
  `transaction_status_id`   INT(11)     NOT NULL,
  `payment_approved_by`     INT(11)     NOT NULL,
  `created`                 <type>      NOT NULL,
  PRIMARY KEY (`loan_paying_id`),
  FOREIGN KEY (`loan_id`) REFERENCES `Loan`(`loan_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE IF NOT EXISTS `BillingTransaction` (
  `billing_transaction_id`  INT(11)     NOT NULL    AUTO_INCREMENT,
  `from_account_id`         INT(11)     NOT NULL,
  `amount`                  <type>      NOT NULL,
  `transaction_status_id`   INT(11)     NOT NULL,
  `payment_approved_by`     INT(11)     NOT NULL,
  `created`                 <type>      NOT NULL,
  PRIMARY KEY (`billing_transaction_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`)
);

CREATE TABLE IF NOT EXISTS `TopupTransaction` (
  `topup_transaction_id`    INT(11)     NOT NULL    AUTO_INCREMENT,
  `from_account_id`         INT(11)     NOT NULL,
  `mobile_number`           <type>      NOT NULL,
  `amount`                  <type>      NOT NULL,
  `transaction_status_id`   INT(11)     NOT NULL,
  `payment_approved_by`     INT(11)     NOT NULL,
  `created`                 <type>      NOT NULL,
  PRIMARY KEY (`topup_transaction_id`),
  FOREIGN KEY (`transaction_status_id`) REFERENCES `TransactionStatus`(`transaction_status_id`),
  FOREIGN KEY (`payment_approved_by`) REFERENCES `Employee`(`employee_id`),
  FOREIGN KEY (`from_account_id`) REFERENCES `Account`(`account_id`)
);

CREATE TABLE IF NOT EXISTS `Position` (
  `position_id`     INT(11)     NOT NULL    AUTO_INCREMENT,
  `position_name`   <type>      NOT NULL,
  PRIMARY KEY (`position_id`)
);

CREATE TABLE IF NOT EXISTS `User` (
  `user_id`         INT(11)     NOT NULL    AUTO_INCREMENT,
  `position_id`     INT(11)     NOT NULL,
  `first_name`      <type>      NOT NULL,
  `last_name`       <type>      NOT NULL,
  `date_of_birth`   <type>      NOT NULL,
  `email`           <type>      NOT NULL,
  `mobile_number`   <type>      NOT NULL,
  `address`         <type>      NOT NULL,
  `sex`             <type>      NOT NULL,
  `username`        <type>      NOT NULL,
  `password`        <type>      NOT NULL,
  `created`         <type>      NOT NULL,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`position_id`) REFERENCES `Position`(`position_id`)
);

CREATE TABLE IF NOT EXISTS `Manager` (
  `manager_id`  INT(11)     NOT NULL    AUTO_INCREMENT,
  `user_id`     INT(11)     NOT NULL,
  PRIMARY KEY (`manager_id`)
);