class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach((item) => {
      balance += item.value;
    })
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
/**********************************/
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  
  commit() {
    if (!this.isAllowed()) {
      console.log('You do not have sufficient funds! Please try again.')
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
  }
}
/**********************************/
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}
/**********************************/
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log('Deposit amount: ', t1.amount)
console.log('Balance: ', myAccount.balance);

const t2 = new Withdrawal(121.00, myAccount);
console.log('Withdraw amount: ', t2.amount)
t2.commit();
console.log('Balance: ', myAccount.balance);

console.log('Ending Balance:', myAccount.balance);
console.log('Account: ', myAccount);