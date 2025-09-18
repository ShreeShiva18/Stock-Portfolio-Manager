CREATE DATABASE stock;
use stock;
CREATE TABLE investor(Name char(20)NOT NULL,
user_ID int(5) PRIMARY KEY AUTO_INCREMENT ,
Demat_acc_no varchar(18)NOT NULL,
DOB date NOT NULL,
Phone_no varchar(15) NOT NULL,
address varchar(100)NOT NULL);
DESCRIBE investor;
INSERT INTO investor (Name,Demat_acc_no,DOB,Phone_no,address)VALUES
('Shree Shiva M N','12345678924680456','2004/02/18','9740395152', 'saraswathipuram,mysuru');
ALTER TABLE investor ADD COLUMN gender ENUM ('male','female','other')NOT NULL;
UPDATE investor SET gender='female' WHERE user_ID IN (2,4);
SELECT * FROM investor;
SELECT Name,DOB FROM stock.investor;
SELECT* FROM stock.investor;
UPDATE stock.investor set Name ='sagar' where user_ID ='5';
SELECT* FROM investor where DOB<='1995-07-18';
SELECT Name from stock.investor where user_ID<='4';
CREATE TABLE stock.Nominee_Details(user_ID int(5),
Nominee_name char(20),
relationship char (15),
nominee_user_ID int(5)PRIMARY KEY,
address char(100),
phone_no varchar(15),
FOREIGN KEY (user_ID)REFERENCES stock.investor(user_id));
DESCRIBE stock.nominee_details;
SELECT*FROM stock.Nominee_Details;
CREATE TABLE stock.Bank_Details(user_ID int(5),
name char(20) NOT NULL,
account_no varchar(12)PRIMARY KEY,
IFSC_Code varchar(8) NOT Null,
bank_branch char(50),
UNIQUE(account_no),
fOREIGN KEY (user_ID)REFERENCES stock.investor(user_id));
INSERT INTO stock.Bank_Details (user_ID,name,account_no,IFSC_Code,bank_branch) VALUES 
('1','Shree Shiva M N','530045611131','PUNB1234','SARASWATHIPURAMN MYSURU');
DESCRIBE stock.bank_details;
SELECT*FROM stock.Bank_Details;
CREATE TABLE stock.portfolio( user_ID int(5) PRIMARY KEY,
portfolio_id int(5)AUTO_INCREMENT,
 Demat_acc_no VARCHAR(18) NOT NULL,
 current_holdings double (12,4),
 total_investment double (12,4),
 total_returns double(12,4),
 PnL_in_percentage varchar(8),
 fOREIGN KEY (user_ID)REFERENCES stock.investor(user_id),
 UNIQUE(portfolio_id),
 UNIQUE(Demat_acc_no ));
INSERT INTO stock.portfolio(user_ID,Demat_acc_no,current_holdings,total_investment, total_returns,PnL_in_percentage) VALUES 
('1','12345678924680456','12000000.65','10000000.55','+2000000.15','+20%');
DESCRIBE stock.portfolio;
SELECT*FROM stock.portfolio;
CREATE TABLE stock.stocks_info (
    portfolio_id INT(5),
    stock CHAR(20),
    stock_id VARCHAR(10),
    current_market_price DOUBLE(6,2),
    invested_amount DOUBLE(10,2),
    current_value DOUBLE(10,2),
    no_of_shares INT(5),
    returns DOUBLE(10,2),
    PRIMARY KEY (portfolio_id, stock_id),
    FOREIGN KEY(portfolio_id)REFERENCES stock.portfolio(portfolio_id));
    ALTER TABLE stock.stocks_info ADD INDEX (stock_id);
INSERT INTO stock.stocks_info(portfolio_id,stock,stock_id,current_market_price,invested_amount,current_value,no_of_shares,returns)VALUES
('1','TATA MOTORS','TM456','795.16','1600.50','1590.32','2','-9.50'),
('1', 'ADANI ENTERPRISES', 'ADANI01', 2500.00, 25000.00, 27500.00, 10, 2500.00),
('1', 'INFOSYS', 'INF456', 1489.00, 15000.00, 14890.00, 10, -110.00);
DESCRIBE stock.stocks_info;
SELECT*FROM stock.stocks_info;
CREATE TABLE stock.company(stock_id varchar(10) PRIMARY KEY,
Company_name char(20),
company_id varchar(8),
established_on date,
date_of_issue date,
issue_size_in_CR double (8,2),
UNIQUE (company_id),
FOREIGN KEY(stock_id)REFERENCES stocks_info(stock_id));
INSERT INTO stock.company(stock_id,Company_name,company_id,established_on,date_of_issue,issue_size_in_CR) VALUES
('TM456','TATA ENTERPRISES','T123','1972-04-14','2008-07-12','4000'),
('INF456', 'INFOSYS LTD', 'I789', '1981-07-02', '1993-06-14', 1500.00),
('ADANI01', 'ADANI ENTERPRISES', 'A456', '1988-03-02', '2020-02-07', 7500.00);
DESCRIBE stock.company;
SELECT*FROM stock.company;
CREATE TABLE stock.transactions(portfolio_id int(5),
stock_id varchar(10),
buying_price double(10,2),
selling_price double(10,2),
quantity int(8),
amount double(10,2),
DATE date,
account_no varchar(12),
UTR varchar(12),
UNIQUE (UTR),
PRIMARY KEY (portfolio_id,stock_id,UTR),
FOREIGN KEY(account_no) REFERENCES stock.Bank_Details(account_no),
FOREIGN KEY(portfolio_id)REFERENCES stock.portfolio(portfolio_id),
FOREIGN KEY(stock_id)REFERENCES stocks_info(stock_id));
INSERT INTO stock.transactions(portfolio_id ,stock_id, buying_price, selling_price, quantity, amount,DATE,account_no,UTR) VALUES
('1','TM456','815.14','795.16','10','8151.4','2024-02-18','530045611131','ABC1234');
SELECT*FROM stock.transactions;
DROP DATABASE stock;