import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  zoom: number;
  fontFamily: string;
}

export interface EditorRef {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const Editor = forwardRef<EditorRef, EditorProps>(
  ({ content, onChange, zoom, fontFamily }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      textareaRef,
    }));

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

    return (
      <div
        className="editor-content max-w-5xl mx-auto px-4 md:px-8 lg:px-16"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
        }}
      >
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full min-h-screen bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground text-base md:text-lg leading-relaxed py-8 md:py-12 ${fontFamily}`}
          placeholder="Comece a escrever suas ideias..."
          spellCheck={false}
        />
      </div>
    );
  }
);

Editor.displayName = "Editor";
