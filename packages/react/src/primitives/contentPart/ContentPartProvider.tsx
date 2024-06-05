"use client";

import { type FC, type PropsWithChildren, useMemo, useState } from "react";
import { create } from "zustand";
import type { ThreadMessage } from "../../utils/context/stores/AssistantTypes";
import type {
  ContentPartState,
  ContentPartStore,
} from "../../utils/context/stores/ContentPartTypes";
import { ContentPartContext } from "../../utils/context/useContentPartContext";

type ContentPartProviderProps = PropsWithChildren<{
  part: ThreadMessage["content"][number];
}>;

const useContentPartContext = () => {
  const [context] = useState<ContentPartStore>(() => {
    const useContentPart = create<ContentPartState>(() => ({
      part: null as unknown as ThreadMessage["content"][number],
    }));

    return { useContentPart };
  });
  return context;
};

export const ContentPartProvider: FC<ContentPartProviderProps> = ({
  part,
  children,
}) => {
  const context = useContentPartContext();

  // sync useContentPart
  useMemo(() => {
    context.useContentPart.setState(
      {
        part,
      },
      true,
    );
  }, [context, part]);

  return (
    <ContentPartContext.Provider value={context}>
      {children}
    </ContentPartContext.Provider>
  );
};
