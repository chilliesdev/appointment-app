import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect, useState } from 'react';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

interface RichTextInputProps {
  name: string;
  label: string;
  initialValue?: any;
  value: any | undefined;
  onChange: (...event: any[]) => void;
}

export default function RichTextInput({
  value,
  onChange,
  name,
  label,
  initialValue,
}: RichTextInputProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : initialValue;
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap,
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (editorState: EditorState) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div className="text-base font-medium mb-6">
      <label htmlFor={name} className="block my-1">
        {label}
      </label>
      <Editor
        wrapperStyle={{
          width: '358px',
        }}
        spellCheck
        wrapperClassName="rounded-lg border-gray-200 text-gray-900"
        editorClassName="bg-white h-40"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
