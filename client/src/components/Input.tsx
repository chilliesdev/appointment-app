import React, { forwardRef } from "react";
import ErrorMessage from "./ErrorMessage";
import { InputProps, SuggestionsDataType } from "./types";

function Suggestions({
  data,
  onClickSuggestion,
}: {
  data: SuggestionsDataType | undefined;
  onClickSuggestion?: (selected: string) => void;
}) {
  return (
    <>
      {data && data.length > 0 && (
        <ol
          style={{
            width: "358px",
            // height: "46px",
          }}
          className="absolute z-10 border rounded border-gray-800 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-800"
        >
          {data.map((data) => (
            <li
              onClick={() => {
                if (onClickSuggestion) onClickSuggestion(data?.email || "");
              }}
              className="hover:bg-gray-300 hover:cursor-pointer p-2"
              key={data?.id}
            >
              <h5 className="text-md">{data?.email}</h5>
              <p className="text-xs font-bold">{data?.name}</p>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

function Input(
  {
    label,
    error,
    autoSuggestion,
    autoSuggestionData,
    onClickSuggestion,
    ...props
  }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined | string
) {
  return (
    <div className="text-base font-medium mb-6">
      <label htmlFor={props.name} className="block my-1">
        {label}
      </label>
      <input
        style={{
          width: "358px",
          height: "46px",
        }}
        className="px-3 py-2 border rounded-lg border-gray-200 text-gray-900"
        {...props}
        ref={ref}
      />
      {autoSuggestion && (
        <Suggestions
          data={autoSuggestionData}
          onClickSuggestion={onClickSuggestion}
        />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default forwardRef(Input);
