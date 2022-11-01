import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { ApplicationRoutes } from "../../../../shared/enum/applicationRoutes";
import { PageFilterType, Props } from "./types";
import { SearchInputContent } from "./styles";

const { USER_NEW } = ApplicationRoutes;
const { ID, NAME } = PageFilterType;

export const PageFilter = (props: Props) => {
  const { pageFilter, handleChangePageFilter } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <SearchInputContent>
        <DebounceInput
          debounceTimeout={500}
          placeholder={t("pages.user_list.input_search_id")}
          type="number"
          marginEnd={3}
          maxWidth={40}
          value={pageFilter[ID]}
          onChange={(e) => handleChangePageFilter(ID, e.target.value)}
          element={(field: any) => <Input {...field} />}
        />

        <DebounceInput
          debounceTimeout={500}
          placeholder={t("pages.user_list.input_search_name")}
          marginEnd={3}
          value={pageFilter[NAME]}
          onChange={(e) => handleChangePageFilter(NAME, e.target.value)}
          element={(field: any) => <Input {...field} />}
        />
        <Button
          minWidth={32}
          colorScheme="blue"
          onClick={() => navigate(USER_NEW)}
        >
          {t("pages.user_list.button_new_user")}
        </Button>
      </SearchInputContent>
    </>
  );
};
