import { forwardRef, useEffect, useState } from "react";
import { UseFormReset, UseFormWatch } from "react-hook-form";
import { useMutation } from "react-query";
import { useFilterUsers } from "../hooks";
import useComponentVisible from "../hooks/useComponentVisible";
import Input from "./Input";
import { CreateInputForm, InputProps, SuggestionsDataType } from "./types";

interface AutoCompleteInputProps extends InputProps {
  changeFunc: UseFormWatch<CreateInputForm>;
  resetField: UseFormReset<CreateInputForm>;
}

interface Input {
  email: string;
  name: string;
}

function AutoCompleteInput(
  { changeFunc, resetField, ...props }: AutoCompleteInputProps,
  ref: React.Ref<HTMLInputElement> | undefined
) {
  const [users, setUsers] = useState<SuggestionsDataType | undefined>();

  const mutation = useMutation(useFilterUsers, {
    onSuccess: (data) => setUsers(data),
  });

  function handleClickSuggestion(selected: string, selectedId: number) {
    resetField({
      guest: selected,
      guestId: selectedId,
    });

    setUsers([]);
  }

  function handleBlur() {
    setTimeout(() => {
      setUsers([]);
    }, 100);
  }

  useEffect(() => {
    const subscription = changeFunc((value, { name, type }) => {
      const { guest } = value;

      if (name === "guest" && type === "change") {
        mutation.mutate({
          email: guest,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [changeFunc]);

  return (
    <div>
      <Input
        ref={ref}
        {...props}
        autoSuggestion
        autoSuggestionData={users}
        onClickSuggestion={handleClickSuggestion}
        // onBlur={handleBlur}
      />
    </div>
  );
}

export default forwardRef(AutoCompleteInput);
