import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updateTransationList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updateTransationList,
    })
  }

  onAddTransactionItems = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getexpensesAmout = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getbalanceAmout = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    let incomeAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  getincomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const balanceAmout = this.getbalanceAmout()
    const expenceAmount = this.getexpensesAmount()
    const incomeAmount = this.getincomeAmount()

    return (
      <div className="app-container">
        <div className="money-manager-container">
          <div className="top-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="desciption">
              Welcome back to your <span className="text">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmout={balanceAmout}
            expenceAmount={expenceAmount}
            incomeAmount={incomeAmount}
          />
          <div className="transaction-details">
            <form className="form" onSubmit={this.onAddTransactionItems}>
              <h1 className="form-heading">Add transation</h1>
              <label className="text" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label className="text" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <label className="text" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOptoin => (
                  <option key={eachOptoin.optionId} value={eachOptoin.optionId}>
                    {eachOptoin.displayText}
                  </option>
                ))}
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
