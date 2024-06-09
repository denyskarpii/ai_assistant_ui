"use client";

import type { UseAssistantHelpers, UseChatHelpers } from "ai/react";
import type { FC, PropsWithChildren } from "react";
import { AssistantRuntimeProvider } from "../core/AssistantRuntimeProvider";
import { useVercelUseChatRuntime } from "../vercel-ai/ui/use-chat/useVercelUseChatRuntime";

// /**
//  * @deprecated Will be removed in 0.1.0.
//  */
export type VercelAIAssistantProviderProps = PropsWithChildren<
  | {
      chat: UseChatHelpers;
    }
  | {
      assistant: UseAssistantHelpers;
    }
>;

// TODO mark as deprecated
// /**
//  * @deprecated Replaced with `<AssistantRuntimeProvider runtime={...} />` in conjuction with `useVercelUseChatRuntime()`. Will be removed in 0.1.0.
//  */
export const VercelAIAssistantProvider: FC<VercelAIAssistantProviderProps> = ({
  children,
  ...rest
}) => {
  const vercel = "chat" in rest ? rest.chat : rest.assistant;
  const runtime = useVercelUseChatRuntime(vercel);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
};
