import Account from "./account";
import Customer from "./customer";

class Bank{
    constructor(){
        this.customers = [];
        this.accountCounter = 0;
    }

    generateAccountNumber(){
        const prefix = 'ACC';
        const accountNumber = `${prefix}${this.accountCounter}`
        this.accountCounter++;
        return accountNumber
    }

    createAccount(name, address, accountType, initialBalance){        
        const customer = this.customers.find((c) => c.name === name) || new Customer(name, address);
        this.customers.push(customer)

        const accountNumber = this.generateAccountNumber()
        const account = new Account(accountNumber, accountType);
        
        if(initialBalance > 0){
            account.depositMoney(initialBalance)
        }

        const result = customer.linkAccount(account)

        if(result !== 'Account linked successfully.'){
            return 'Error Linking Account/Invalid Account'
        }

        return customer
    }

    performTransaction(customerID, accountNumber, transactionType, amount){
        //find the customer by their name
        const customer = this.customers.find((c)=> c.customerID == customerID);
        if (!customer) {
            throw new Error('Customer not found.');
        }
        
        //validate the existence of their account
        const account = customer.accounts.find((a)=> a.accountNumber == accountNumber);
        if(!account){
            throw new Error ('Account does not exist.')
        }

        if(transactionType == 'Deposit'){
            account.depositMoney(amount);
        }else if(transactionType == 'Withdraw'){
            account.withdrawMoney(amount);
        }

        return account.balance
    
    }

    getAccountDetails(customerID, accountNumber){
        const customer = this.customers.find((c)=> c.customerID == customerID);
        if(!customer){
            throw new Error('Customer not found.');
        }

        const account = customer.accounts.find((a)=> a.accountNumber == accountNumber);
        if(!account){
            throw new Error ('Account does not exist.');
        }

        return account
    }
}


export default Bank;