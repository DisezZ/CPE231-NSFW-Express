INSERT INTO account (customer_id,branch_id,membership_id,balance) VALUES (1,1,1,100);


INSERT INTO user (position_id,first_name,last_name,date_of_birth,email,mobile_number,address,sex,username,password) 
    VALUES (3,replace_firstname,'test_lastname','1995-01-1','testuser@email.com','0000000001','street 22 ass.2','M','testuser','test1234');	


SELECT * FROM user WHERE user_id = 1;

INSERT INTO user (position_id,first_name,last_name,date_of_birth,email,mobile_number,address,sex,username,password) 
    VALUES (3,'arima','test_lastname','1995-01-1','testuser@email.com','0000000001','street 22 ass.2','M','testuser','test1234');

--add manager
INSERT INTO manager (user_id) VALUES (3);

--add manager
INSERT INTO customer (user_id) VALUES (3);

--add bank
INSERT INTO bank (manager_id,bank_name) VALUES (1,'SunTidlor');
--add branch
INSERT INTO branch (bank_id,branch_name,branch_address) VALUES (1,'SunTidlorBranch','prachauthit');

--add atm
INSERT INTO atm (branch_id) VALUES (1);

--transferTransaction
INSERT INTO transfertransaction (from_account_id,to_account_id,amount,transaction_status_id)
    VALUES (2,4,50,3)

-- Money api

START TRANSACTION; 
UPDATE account SET balance = balance + 50 WHERE account_id = 2;
UPDATE account SET balance = balance + 50 WHERE account_i = 3;
COMMIT;


START TRANSACTION;
UPDATE account SET balance = balance + 50 WHERE account_id = 2;
INSERT INTO atmtransaction (from_account_id,atm_id,amount,transaction_status_id)
    VALUES (2,1,50,3);
COMMIT;

ROLLBACK;
COMMIT;

ROLLBACK;4

-- insert bill transaction 
INSERT INTO billingtransaction (from_account_id,amount,transaction_status_id) VALUES (2,50,3)

-- select user bill with condition
SELECT * FROM billingtransaction WHERE from_account_id = 2 AND transaction_status_id = 3 
    OR from_account_id = 2 AND transaction_status_id = 2 OR from_account_id = 2 AND transaction_status_id = 1;


-- check loan amout by membership
SELECT a.account_id, a.membership_id, m.loan_amount FROM account a, membership m WHERE a.membership_id = m.membership_id AND a.membership_id = 2 GROUP BY a.membership_id;

-- insert loan
INSERT INTO loan (account_id,initial_amount,left_amount,interest_rate,transaction_status_id,loan_approved_by) 
	VALUES (2,100,100,0.03,1,1)
    
INSERT INTO loan (account_id,initial_amount,left_amount,interest_rate,transaction_status_id,loan_approved_by) 
	SELECT (2,100,100,0.03,1,1) 
    
    WHERE initial_amount = initial_amount + 100 AND initial_amount <= 200 


-- topup 
INSERT INTO topuptransaction (from_account_id,mobile_number,amount,transaction_status_id) VALUES (2,1234567890,50,3);

-- select and sum money in all user account
SELECT branch_id, balance, SUM(balance) AS SumBalance FROM account WHERE branch_id = 1;

-- select loan amount with the same id in membership and account table
SELECT m.loan_amount FROM account a, membership m WHERE a.membership_id = m.membership_id AND account_id = 2;

-- loan created
INSERT INTO loan (account_id,initial_amount,left_amount,interest_rate,transaction_status_id,loan_approved_by) 
    VALUES (2,200,200,3,1,1)

-- sum loan left before loan contract
SELECT account_id, SUM(left_amount) AS accLeftAmount FROM loan WHERE account_id = 2;

-- find customer and account id 
SELECT u.user_id, u.username, u.password, a.account_id FROM account a, customer c, user u WHERE 
SELECT u.user_id, u.username, u.password, a.account_id FROM account a, customer c, user u WHERE 
u.user_id = c.user_id, c.user_id = a.user_id AND username = 'testuser'
-- this work above didn't work
SELECT u.user_id, u.username, u.password, a.account_id FROM account a, customer c, user u WHERE 
u.user_id = c.user_id AND c.customer_id = a.customer_id AND u.username = 'testuser'

-- Insert loan paying 
INSERT INTO loanpaying (loan_id,amount,transaction_status_id) VALUES (10,20,3)
UPDATE account SET balance = balance - 50 WHERE account_i = 3;

