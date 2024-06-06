// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, expenceAmount, incomeAmount} = props

  return (
    <div className="details-list-container">
      <div className="details-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="details-image"
        />
        <div className="money-details">
          <p className="text">Your Balance</p>
          <p className="money">RS {balanceAmount}</p>
        </div>
      </div>
      <div className="details-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="money-details">
          <p className="text">Your Income</p>
          <p className="money">RS {incomeAmount}</p>
        </div>
      </div>
      <div className="details-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="money-details">
          <p className="text">Your Expenses</p>
          <p className="money">RS {expenceAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
