import { Editor } from "@tinymce/tinymce-react";
import { forwardRef } from "react";

interface RichTextInputProps {
  name: string;
  label: string;
  initialValue?: any;
  value: string;
  onChange: (...event: any[]) => void;
}

function RichTextInput(
  { value, onChange, name, label, ...props }: RichTextInputProps,
  ref: React.LegacyRef<Editor> | undefined | undefined
) {
  const handleOnChange = (editor: string) => onChange(editor);

  return (
    <div className="text-base font-medium mb-6">
      <label htmlFor={name} className="block my-1">
        {label}
      </label>
      <Editor
        value={value}
        onEditorChange={handleOnChange}
        ref={ref}
        {...props}
        init={{
          height: 200,
          width: 358,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}

export default forwardRef(RichTextInput);
