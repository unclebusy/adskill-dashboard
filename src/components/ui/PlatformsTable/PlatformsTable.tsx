import { PlatformType } from '../../../types/types';
import { PlatformIcon } from '../PlatformIcon';
import { Checkbox } from '../Checkbox';
import './PlatformsTable.css';

interface PlatformData {
  id?: string;
  type: PlatformType;
  balance: number;
  accounts: number;
  avgCpc: number;
  avgCpa: number;
}

interface PlatformsTableProps {
  platforms: PlatformData[];
  className?: string;
}

export const PlatformsTable = ({ platforms, className = '' }: PlatformsTableProps) => {
  return (
    <table className={`platforms-table ${className}`}>
      <thead>
        <tr>
          <th></th>
          <th>Площадки ⇅</th>
          <th>Баланс ⇅</th>
          <th>Аккаунтов ⇅</th>
          <th>AVG CPC ⇅</th>
          <th>AVG CPA ⇅</th>
        </tr>
      </thead>
      <tbody>
        {platforms.map((platform, index) => (
          <tr key={platform.id || `${platform.type}-${index}`}>
            <td>
              <Checkbox onChange={() => {}} />
            </td>
            <td>
              <div className="platform-cell">
                <PlatformIcon platform={platform.type} size="small" />
              </div>
            </td>
            <td>${platform.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td>{platform.accounts}</td>
            <td>${platform.avgCpc.toFixed(2)}</td>
            <td>${platform.avgCpa.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
