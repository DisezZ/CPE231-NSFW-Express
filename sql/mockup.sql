//--------------------position table-------------------------------//
INSERT INTO `Position` (`position_id`,`position_name`)
VALUES (1,'Manager'), (2,'Employee'), (3,'Customer');

//--------------------membership table-------------------------------//
INSERT INTO `Membership` (`membership_id`,`membership_name`, `loan_amount`, `loan_interest_rate`, `deposit_interest_rate`)
VALUES  (1, 'Classic', 1000.00, 6, 3),
        (2, 'Silver', 10000.00, 5, 4),
        (3, 'Gold', 100000.00, 4, 5),
        (4, 'Platinum', 1000000.00, 3, 6);

//--------------------transactionStatus table-------------------------------//
INSERT INTO `TransactionStatus` (`transaction_status_id`,`transaction_status_name`)
VALUES  (1, 'Waiting for loan approval'),
        (2, 'Waiting for payment'),
        (3, 'Waiting for payment approval'),
        (4, 'Payment approved');

//--------------------user table-------------------------------//
INSERT INTO `User` (`user_id`, `position_id`, `first_name`, `last_name`, `date_of_birth`, `email`, `mobile_number`, `address`, `sex`, `username`, `password`, `created`) 
VALUES ('1', '1', 'Alan', 'Yager', '1971-10-10', 'alanyager@gmail.com', '0555555555', '55/5 moo5 ChiangDao,ChiangDao,Chiangmai', 'M', 'yageralan', 'alan55555', '2022-01-07 10:50:30'),
       ('2', '2', 'Merlinda', 'Varatin', '1985-05-09', 'merlinda.va@gmail.com', '0579878966', '22/7 moo2 Bangyai,Bangkrui,Nonthaburi', 'F', 'MerlindaVa', 'Merlinda5675', '2022-02-10 09:44:28'),
       ('3', '3', 'Puri', 'Pattera', '1986-06-06', 'puri5666@gmail.com', '0888989898', '99/5 moo1 Sarathi,Sarathi,Chiangmai', 'M', 'PuriPat', 'Puri456896', '2022-02-24 10:45:30'),
       ('4', '1', 'Mikasa', 'Akaman', '1971-11-24', 'mikasaaka@gmail.com', '0111111111', '11/11 moo1 NongYai,Mueang,Chonburi', 'F', 'mikaman', 'mimi56568', '2022-02-25 10:32:30'),
       ('5', '2', 'Krisa', 'kaware', '1995-10-24', 'krisaaaa@gmail.com', '0111598756', '71/5 moo6 Lamung,Mueang,Chonburi', 'F', 'krisasa', 'krisja8799', '2022-02-26 11:05:22'),
       ('6', '3', 'Lalili', 'Kriasea', '2000-02-02', 'lalili@gmail.com', '0215463266', '48/78 moo78 Ban,Bueng,Chonburi', 'F', 'lalilali', 'lalila2222', '2022-02-26 12:22:22');

//--------------------customer table-------------------------------//
INSERT INTO `Customer` (`customer_id`, `user_id`)
VALUES  (1, 3),
        (2, 6);

//--------------------employee table-------------------------------//
INSERT INTO `Employee` (`employee_id`, `branch_id`, `user_id`)
VALUES  (1, 2, 2),
        (2, 1, 5);

//--------------------manager table-------------------------------//
INSERT INTO `Manager` (`manager_id`, `user_id`)
VALUES  (1, 1),
        (2, 4);
        
//--------------------bank table-------------------------------//
INSERT INTO `Bank` (`bank_id`, `manager_id`, `bank_name`, `created`)
VALUES  (1, 1, 'Alpha Bank','2021-10-10 10:11:21'),
        (2, 2, 'Beta Bank','2021-11-02 09:50:13');

//--------------------branch table-------------------------------//
INSERT INTO `Branch` (`branch_id`, `bank_id`, `branch_name`, `branch_address`, `created`)
VALUES  (1, 1, 'Alpha A', '1/1 moo1 Dusit,Dusit,Bangkok', '2021-10-11 11:11:11'),
        (2, 1, 'Alpha B', '2/2 moo2 Dindaeng,Dindaeng,Bangkok', '2021-11-22 09:22:22'),
        (3, 2, 'Beta A', '54/6 moo24 Nongyai,Nongyai,Chonburi', '2021-11-20 14:14:14');

//--------------------account table-------------------------------//
INSERT INTO `Account` (`account_id`, `customer_id`, `branch_id`, `membership_id`, `balance`, `created`)
VALUES  (1, 1, 1, 2, 245678, '2022-03-21 10:10:10'),
        (2, 2, 2, 3, 34565, '2022-03-22 11:11:11');

//--------------------atm table-------------------------------//
INSERT INTO `ATM` (`atm_id`, `branch_id`)
VALUES  (1, 1),
        (2, 2),
        (3, 3);

//--------------------atmtransaction table-------------------------------//
INSERT INTO `ATMTransaction` (`atm_transaction_id`, `from_account_id`, `atm_id`, `amount`, `transaction_status_id`, `payment_approved_by`, `created`)
VALUES  (1, 1, 1, 1000, 4, 2, '2022-03-26 18:18:10'),
        (2, 1, 2, 500, 4, 1, '2022-03-28 13:11:11');

//--------------------billingtransaction table-------------------------------//
INSERT INTO `BillingTransaction` (`billing_transaction_id`, `from_account_id`, `amount`, `transaction_status_id`, `payment_approved_by`, `created`)
VALUES  (1, 2, 2000, 4, 1, '2022-03-27 09:09:09'),
        (2, 2, 1000, 4, 1, '2022-03-27 16:16:16');

//--------------------topuptransaction table-------------------------------//
INSERT INTO `TopupTransaction` (`topup_transaction_id`, `from_account_id`, `mobile_number`, `amount`, `transaction_status_id`, `payment_approved_by`, `created`)
VALUES  (1, 2, 0215463266, 500, 4, 1, '2022-03-29 08:12:13'),
        (2, 2, 0215463266, 400, 4, 1, '2022-03-29 15:16:16');

//--------------------transfertransaction table-------------------------------//
INSERT INTO `TransferTransaction` (`transfer_transaction_id`, `from_account_id`, `to_account_id`, `amount`, `transaction_status_id`, `payment_approved_by`, `created`)
VALUES  (1, 2, 1, 2000, 4, 1, '2022-04-05 09:19:09'), 
        (2, 2, 1, 1000, 4, 1, '2022-04-26 16:14:16');


//--------------------loan table-------------------------------//
INSERT INTO `Loan` (`loan_id`, `account_id`, `initial_amount`, `left_amount`, `interest_rate`, `transaction_status_id`, `loan_approved_by`, `payment_approved_by`, `created`)
VALUES  (1, 2, 100000, 2000, 4, 4, 1, 1, '2022-04-05 10:19:09');

//--------------------loanpaying table-------------------------------//
INSERT INTO `LoanPaying` (`loan_paying_id`, `loan_id`, `amount`, `transaction_status_id`, `payment_approved_by`, `created`)
VALUES  (1, 1, 90000, 4, 1, '2022-05-05 16:18:19');
