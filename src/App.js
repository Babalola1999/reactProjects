import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,

        balance: 500,
        isActive: true,
      };
    case "amountDeposit":
      return { ...state, deposit: action.payload };
    case "deposit":
      return {
        ...state,
        balance: state.balance + state.deposit,
        deposit: "",
      };

    case "amountToWithdraw":
      return { ...state, withdraw: action.payload };

    case "withdraw":
      if (state.withdraw > state.balance) return state;
      return {
        ...state,
        balance: state.balance - state.withdraw,
        withdraw: "",
      };
    case "loanAmountInput":
      return {
        ...state,
        loan: action.payload,
      };

    case "loanRequest":
      if (state.loanAmount > 0) return state;
      return {
        ...state,
        loan: "",
        loanAmount: state.loan,
        balance: state.balance + state.loan,
      };

    case "loanpaymentInput":
      return {
        ...state,
        loanpaymentInput: action.payload,
      };

    case "loanpayment":
      if (state.loanpaymentInput > state.loanAmount) return state;
      if (!state.loanAmount) return state;
      return {
        ...state,
        balance: state.balance - state.loanpaymentInput,
        loanAmount: state.loanAmount - state.loanpaymentInput,
        loanpaymentInput: "",
      };

    case "closeAccount":
      if (state.loanAmoun > 0 || state.balance !== 0) return state;
      return initialState;
    default:
      throw new Error("⛔");
  }
}

const initialState = {
  isActive: false,
  balance: 0,
  loanAmount: 0,
  loan: "",
  deposit: "",
  withdraw: "",
  loanpaymentInput: "",
};
export default function App() {
  const [
    {
      isActive,
      balance,
      loanAmount,
      loan,
      deposit,
      withdraw,
      loanpaymentInput,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleAmountDeposit = function (e) {
    dispatch({
      type: "amountDeposit",
      payload: Number(e.target.value),
    });
  };

  const handleDeposit = function (e) {
    dispatch({ type: "deposit" });
  };

  const handleAmountWithdraw = function (e) {
    dispatch({
      type: "amountToWithdraw",
      payload: Number(e.target.value),
    });
  };

  const handleWithdraw = function (e) {
    dispatch({ type: "withdraw" });
  };

  const handleLoanInput = function (e) {
    dispatch({
      type: "loanAmountInput",
      payload: Number(e.target.value),
    });
  };
  const handleLoanRequest = function (e) {
    dispatch({ type: "loanRequest" });
  };

  const handleLoanPaymentInput = function (e) {
    dispatch({ type: "loanpaymentInput", payload: Number(e.target.value) });
  };
  const handleLoanPayment = function (e) {
    dispatch({
      type: "loanpayment",
      payload: Number(e.target.value),
    });
  };

  return (
    <div className="app">
      <p>
        <h1>useReducer Bank Account</h1>
      </p>
      <p>
        <h3>Balance: {balance} </h3>
        <h3>Loan: {loanAmount}</h3>
      </p>
      <div>
        <button
          disabled={isActive}
          onClick={() => dispatch({ type: "openAccount" })}
        >
          Open account
        </button>
      </div>
      <div>
        <input
          placeholder="0.00"
          type="number"
          disabled={!isActive}
          onChange={handleAmountDeposit}
          value={deposit}
        />
        <button disabled={!isActive} onClick={handleDeposit}>
          Deposit
        </button>
      </div>

      <div>
        <input
          placeholder="0.00"
          type="number"
          disabled={!isActive}
          onChange={handleAmountWithdraw}
          value={withdraw}
        />
        <button disabled={!isActive} onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>

      <div>
        <input
          placeholder="0.00"
          type="number"
          disabled={!isActive}
          onChange={handleLoanInput}
          value={loan}
        />
        <button disabled={!isActive} onClick={handleLoanRequest}>
          Request a loan
        </button>
      </div>

      <div>
        <input
          placeholder="0.00"
          type="number"
          disabled={!isActive}
          onChange={handleLoanPaymentInput}
          value={loanpaymentInput}
        />
        <button disabled={!isActive} onClick={handleLoanPayment}>
          Pay-loan
        </button>
      </div>

      <button
        disabled={!isActive}
        onClick={() => dispatch({ type: "closeAccount" })}
      >
        Close account
      </button>
    </div>
  );
}
