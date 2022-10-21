import React, { ReactElement } from "react";

export interface Props {
    columnHeader: (string | ReactElement)[];
    columnData: ((string | ReactElement)[])[];
}