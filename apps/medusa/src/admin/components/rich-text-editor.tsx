import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { IconButton } from '@medusajs/ui';

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

function ToolbarButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <IconButton
      type='button'
      size='small'
      aria-label={label}
      variant={active ? 'primary' : 'transparent'}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const lastExternalValue = useRef(value);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-32 px-3 py-2 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== lastExternalValue.current && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    lastExternalValue.current = value;
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className='border-ui-border-base overflow-hidden rounded-md border'>
      <div className='border-ui-border-base flex items-center gap-x-1 border-b px-2 py-1'>
        <ToolbarButton
          label='Bold'
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <span className='font-bold'>B</span>
        </ToolbarButton>
        <ToolbarButton
          label='Italic'
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className='italic'>I</span>
        </ToolbarButton>
        <ToolbarButton
          label='Line break'
          active={false}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <span>↵</span>
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
