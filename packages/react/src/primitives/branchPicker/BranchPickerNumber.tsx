"use client";

import type { FC } from "react";
import { useMessageContext } from "../../utils/context/useMessageContext";

export const BranchPickerNumber: FC = () => {
  const { useMessage } = useMessageContext();
  const branchId = useMessage((s) => s.branchState.branchId);
  return <>{branchId + 1}</>;
};
