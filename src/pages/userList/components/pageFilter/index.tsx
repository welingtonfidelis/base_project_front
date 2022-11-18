import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { ApplicationRoutes } from "../../../../shared/enum/applicationRoutes";
import { SearchInputContent } from "./styles";
import { userListPageStore } from "../../../../store/userListPage";

const { USER_NEW } = ApplicationRoutes;

export const PageFilter = () => {
  const { filters, updateFilterById, updateFilterByName } = userListPageStore();
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
          value={filters.filter_by_id}
          onChange={(e) => updateFilterById(e.target.value)}
          element={(field: any) => <Input {...field} />}
        />

        <DebounceInput
          debounceTimeout={500}
          placeholder={t("pages.user_list.input_search_name")}
          marginEnd={3}
          value={filters.filter_by_name}
          onChange={(e) => updateFilterByName(e.target.value)}
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
