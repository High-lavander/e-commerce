import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ISortOption, sortOptions } from '../../constants/sortOptions';

interface ISortSelectProps {
  sortOption: ISortOption;
  setSortOption: Dispatch<SetStateAction<ISortOption>>;
}

const SortSelect: FC<ISortSelectProps> = ({ sortOption, setSortOption }) => {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  const onOptionClick = (option: (typeof sortOptions)[number]) => () => {
    setSortOption(option);
    setIsDropDownOpened(false);
  };

  return (
    <>
      <div onClick={() => setIsDropDownOpened(!isDropDownOpened)} style={{ cursor: 'pointer', color: '#7EB693' }}>
        {'Sort: '}
        {sortOption.name}
      </div>
      {isDropDownOpened
        ? sortOptions.map((option, i) => (
            <div onClick={onOptionClick(option)} key={i} style={{ cursor: 'pointer', color: '#274C5B' }}>
              {option.name}
            </div>
          ))
        : null}
    </>
  );
};

export default SortSelect;
