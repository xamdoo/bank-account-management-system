import Account from "./account";

class Customer{
    static customerCounter = 0;

    constructor(name, address){
        this.customerID = ++Customer.customerCounter;
        this.name = name;
        this.address = address;
        this.accounts = [];
    }

    linkAccount(account){
        if (!(account instanceof Account) || this.accounts.includes(account)) {
            return 'Account is already linked or is not a valid account.';
        }

        this.accounts.push(account);
        return 'Account linked successfully.';
    }

    displayCustomerDetails() {
        let details = `Customer ID: ${this.customerID}\n`;
        details += `Name: ${this.name}\n`;
        details += `Address: ${this.address}\n\n`;
        details += 'Associated Accounts:\n';
    
        this.accounts.forEach((account, index) => {
            details += `${index + 1}. Account Number: ${account.accountNumber}\n`;
            details += `   Account Type: ${account.accountType}\n`;
            details += `   Balance: $${account.balance.toFixed(2)}\n`;
        });
    
        return details;
    }
    
    
}

export default Customer;