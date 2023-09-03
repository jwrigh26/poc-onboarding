import PropTypes from 'prop-types';

export default function Address() {
  return (
    <div>
      HelloAddress
      {/* <NumberTextfield
  error={hasValue(error?.amount) ? error.amount : null}
  id="amount"
  label="Amount"
  formatType="currency"
  inputRef={(el) => (inputRef.current['amount'] = el)}
  maxLength={11}
  onBlur={handleInput('amount')}
  onChange={handleInput('amount')}
/> */}
    </div>
  );
}

Address.propTypes = {};
