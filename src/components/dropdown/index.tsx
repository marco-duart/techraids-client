import { useState, useRef, useEffect } from "react";
import * as S from "./styles";

interface DropdownOption {
  value: number;
  label: string;
  selected?: boolean;
}

interface Props {
  options: DropdownOption[];
  onSelect: (value: number) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const Dropdown = ({
  options,
  onSelect,
  disabled = false,
  placeholder = "Selecione...",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    options.find((opt) => opt.selected) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownButton
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <S.DropdownArrow $isOpen={isOpen} />
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownList>
          {options.map((option) => (
            <S.DropdownItem
              key={option.value}
              onClick={() => handleSelect(option)}
              $isSelected={option.value === selectedOption?.value}
            >
              {option.label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};
