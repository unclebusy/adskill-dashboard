import { FilterButton } from '../ui/FilterButton';
import { CalendarIcon, OffersIcon, FinanceIcon, SocialMediaIcon, ExportIcon, ChevronLeftIcon } from '../ui/Icons';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="header__left">
          <button className="header__back-btn">
            <ChevronLeftIcon />
          </button>
          <h1 className="header__title">Офферы</h1>
        </div>
      </div>

      <div className="header__filters">
        <FilterButton icon={<CalendarIcon />}>Выберите дату</FilterButton>
        <FilterButton icon={<OffersIcon />}>Все оферы</FilterButton>
        <FilterButton icon={<FinanceIcon />}>USD</FilterButton>
        <FilterButton icon={<SocialMediaIcon />}>Все площадки</FilterButton>

        <div className="header__right">
          <FilterButton icon={<ExportIcon />}>Экспорт</FilterButton>
        </div>
      </div>
    </header>
  );
};
