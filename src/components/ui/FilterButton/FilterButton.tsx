import { ReactNode } from 'react';
import { ChevronDownIcon } from '../Icons';
import './FilterButton.css';

interface FilterButtonProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

export const FilterButton = ({ icon, children, onClick }: FilterButtonProps) => {
  return (
    <button className="filter-btn" onClick={onClick}>
      {icon}
      {children}
      <span className="filter-btn__arrow">
        <ChevronDownIcon />
      </span>
    </button>
  );
};
