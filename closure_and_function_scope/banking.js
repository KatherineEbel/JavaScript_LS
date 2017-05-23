// Create an object named account that represents a bank account
// It should contain a balance property that stores the account's
// current balance
const makeBank = function() {
  const accounts = [];
  function makeAccount(number) {
    let balance = 0;
    let transactions = [];
    return {
      balance() {
        return balance;
      },
      number() {
        return number;
      },
      transactions() {
        return transactions;
      },
      deposit(amount) {
        transactions.push({type: 'deposit', amount: amount})
        balance += amount;
        return amount;
      },
      withdraw(amount) {
        if (amount > balance) {
          amount = balance;
        }
        balance -= amount;
        transactions.push({type: 'withdrawal', amount: amount})
        return amount;
      }
    };
  };
  return {
    openAccount() {
      let number = accounts.length + 101;
      let account = makeAccount(number);
      accounts.push(account);
      return account;
    },
    transfer(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    }
  };
};

const bank = makeBank();
const source = bank.openAccount();
source.deposit(10);
console.log(source.balance());
const destination = bank.openAccount();
bank.transfer(source, destination, 7);
console.log(source.balance());
console.log(destination.balance());