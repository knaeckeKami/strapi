import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

function MultiSelect({ name, value, options, onChange, isDisabled, isLoading, placeholder }) {
  const formattedOptions = options.map(opt => ({ label: opt, value: opt }));
  const formattedValue = (value || []).map(val => ({ label: val, value: val }));

  return (
    <Select
      inputId={name}
      isMulti
      isDisabled={isDisabled}
      isLoading={isLoading}
      options={formattedOptions}
      value={formattedValue}
      onChange={vals => onChange({ target: { name, value: vals.map(v => v.value) } })}
      placeholder={placeholder}
    />
  );
}

MultiSelect.defaultProps = {
  value: [],
  isDisabled: false,
  isLoading: false,
  placeholder: '',
};

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.array,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  placeholder: PropTypes.node,
};

export default MultiSelect;
