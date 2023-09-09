const _balance = new WeakMap();
const _transactionHistory = new WeakMap();

class NegativeAmountError extends Error{
    constructor(){
        super("Input amount should be positive");
        this.name = 'NegativeAmountError';
    }
}

class InsufficientFundsError extends Error{
    constructor(){
        super('Insufficient funds');
        this.name = 'InsufficientFundsError';
    }
}

class Account {
    static accountCounter = 0;

    constructor(accountNumber, accountType){
        if (typeof accountNumber !== 'string' || accountNumber.trim() === '') {
            throw new Error('Invalid account number');
        }

        this.accountNumber = accountNumber;
        this.accountType = accountType || 'Default'
        _transactionHistory.set(this, []);
        _balance.set(this, 0);
    }


    depositMoney(amount){
        const balance = _balance.get(this)
        if(amount <= 0) throw new NegativeAmountError();
        const accountBalance = balance + amount
        _balance.set(this, accountBalance)

        this.logTransaction('Deposit', amount)
        return accountBalance;
    }

    withdrawMoney(amount){
        const balance = _balance.get(this)
        if (amount <= 0) throw new NegativeAmountError();
        if(balance < amount) throw new InsufficientFundsError();
        const accountBalance = balance - amount
        _balance.set(this, accountBalance)

        this.logTransaction('Withdraw', amount)
        return accountBalance;
    }

    logTransaction(transactionType, amount){
        const timestamp = new Date().toISOString();
        const runningBalance = _balance.get(this)

        const transaction = {
            transactionType,
            amount,
            timestamp,
            runningBalance,
        }

        const history = _transactionHistory.get(this)
        history.push(transaction)
    }

    get balance(){
        const balance = _balance.get(this)
        return balance
    }

    get transactionHistory(){
        return _transactionHistory.get(this)
    }

}


export default Account