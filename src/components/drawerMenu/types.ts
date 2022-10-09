export interface Props {
  menuOptions: {
    label: string;
    value: string;
  }[];
  selectedMenuOption: string;
  handleSelectMenuOption: (value: string) => void;
  isMenuOpen: boolean;
  handleChangeIsMenuOpen: (state: boolean) => void;
}
