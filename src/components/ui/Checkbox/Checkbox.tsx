import { InputHTMLAttributes } from 'react';
import './Checkbox.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = ({ label, indeterminate, className = '', ...props }: CheckboxProps) => {
  return (
    <label className={`checkbox-wrapper ${className}`}>
      <input
        type="checkbox"
        className={`checkbox ${indeterminate ? 'checkbox--indeterminate' : ''}`}
        ref={(el) => {
          if (el) {
            el.indeterminate = indeterminate ?? false;
          }
        }}
        {...props}
      />
      <span className="checkbox-custom">
        <svg className="checkbox-icon" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5L4.5 8.5L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg className="checkbox-icon-indeterminate" viewBox="0 0 12 2" fill="none">
          <path
            d="M1 1H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};
