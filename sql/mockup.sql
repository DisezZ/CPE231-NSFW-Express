INSERT INTO `Position` (`position_name`)
VALUES ('Manager'), ('Employee'), ('Customer');

INSERT INTO `Membership` (`membership_name`, `loan_amount`, `loan_interest_rate`, `deposit_interest_rate`)
VALUES  ('Classic', 1000.00, 6, 3),
        ('Silver', 10000.00, 5, 4),
        ('Gold', 100000.00, 4, 5),
        ('Platinum', 1000000.00, 3, 6);

INSERT INTO `TransactionStatus` (`transaction_status_name`)
VALUES  ('Waiting for loan approval'),
        ('Waiting for payment'),
        ('Waiting for payment approval'),
        ('Payment approved');

