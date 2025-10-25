import { useEffect, useRef } from "react";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  zoom: number;
  fontFamily: string;
}

export const Editor = ({ content, onChange, zoom, fontFamily }: EditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  return (
    <div
      className="editor-content"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top center",
      }}
    >
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full min-h-screen bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground text-lg leading-relaxed ${fontFamily}`}
        placeholder="Comece a escrever suas ideias..."
        spellCheck={false}
      />
    </div>
  );
};
