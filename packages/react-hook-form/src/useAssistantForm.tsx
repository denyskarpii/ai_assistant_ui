"use client";

import {
  useRegisterAssistantContextValue,
  useRegisterAssistantTool,
} from "@assistant-ui/react-system";
import {
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { formTools } from "./formTools";

export const useAssistantForm = <
  TFieldValues extends FieldValues = FieldValues,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props?: UseFormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext, TTransformedValues> => {
  const form = useForm<TFieldValues, TContext, TTransformedValues>(props);

  useRegisterAssistantContextValue(() => {
    return `Form State:\n${JSON.stringify(form.getValues())}`;
  });

  useRegisterAssistantTool("set_form_field", {
    ...formTools.set_form_field,
    execute: (args) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      form.setValue(args.name as any, args.value as any);

      return { success: true };
    },
  });

  useRegisterAssistantTool("submit_form", {
    ...formTools.submit_form,
    execute: () => {
      const { _names, _fields } = form.control;
      for (const name of _names.mount) {
        const field = _fields[name];
        if (field?._f) {
          const fieldReference = Array.isArray(field._f.refs)
            ? field._f.refs[0]
            : field._f.ref;

          if (fieldReference instanceof HTMLElement) {
            const form = fieldReference.closest("form");
            if (form) {
              form.requestSubmit();

              return { success: true };
            }
          }
        }
      }

      return {
        success: false,
        message: "Unable retrieve the form element. This is a coding error.",
      };
    },
  });

  return form;
};