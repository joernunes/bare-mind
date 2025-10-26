import { useState, useEffect } from "react";
import { Editor } from "@/components/Editor";
import { Toolbar } from "@/components/Toolbar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { Editor as TiptapEditor } from "@tiptap/react";

interface NotesState {
  ideas: string;
  tasks: string;
  projects: string;
  references: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useLocalStorage<string>("activeTab", "ideas");
  const [notes, setNotes] = useLocalStorage<NotesState>("notes", {
    ideas: "",
    tasks: "",
    projects: "",
    references: "",
  });
  const [zoom, setZoom] = useLocalStorage<number>("zoom", 1);
  const [isDark, setIsDark] = useLocalStorage<boolean>("theme", false);
  const [fontFamily, setFontFamily] = useLocalStorage<string>("fontFamily", "font-sans-default");
  const [editor, setEditor] = useState<TiptapEditor | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleContentChange = (content: string) => {
    setNotes((prev) => ({
      ...prev,
      [activeTab]: content,
    }));
  };

  const handleZoomIn = () => {
    if (zoom < 1.5) {
      setZoom((prev) => Math.min(prev + 0.1, 1.5));
      toast.success("Zoom aumentado");
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.7) {
      setZoom((prev) => Math.max(prev - 0.1, 0.7));
      toast.success("Zoom diminuído");
    }
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
    toast.success(isDark ? "Modo claro ativado" : "Modo escuro ativado");
  };

  const handleFontChange = (font: string) => {
    setFontFamily(font);
    toast.success("Fonte alterada");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFormatBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const handleFormatItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const handleFormatHeading = (level: 1 | 2 | 3) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  const handleFormatList = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  const handleFormatOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  const handleFormatQuote = () => {
    editor?.chain().focus().toggleBlockquote().run();
  };

  const handleFormatCode = () => {
    editor?.chain().focus().toggleCodeBlock().run();
  };

  const handleFormatUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  const handleFormatStrike = () => {
    editor?.chain().focus().toggleStrike().run();
  };

  const handleFormatHighlight = () => {
    editor?.chain().focus().toggleHighlight().run();
  };

  const handleFormatLink = () => {
    const url = window.prompt('URL do link:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleFormatAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    editor?.chain().focus().setTextAlign(align).run();
  };

  const handleFormatHorizontalRule = () => {
    editor?.chain().focus().setHorizontalRule().run();
  };

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "+") {
          e.preventDefault();
          handleZoomIn();
        } else if (e.key === "-") {
          e.preventDefault();
          handleZoomOut();
        } else if (e.key === "d") {
          e.preventDefault();
          handleToggleTheme();
        }
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [zoom, isDark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toolbar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onToggleTheme={handleToggleTheme}
        isDark={isDark}
        onFontChange={handleFontChange}
        currentFont={fontFamily}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onFormatBold={handleFormatBold}
        onFormatItalic={handleFormatItalic}
        onFormatUnderline={handleFormatUnderline}
        onFormatStrike={handleFormatStrike}
        onFormatHighlight={handleFormatHighlight}
        onFormatLink={handleFormatLink}
        onFormatHeading={handleFormatHeading}
        onFormatList={handleFormatList}
        onFormatOrderedList={handleFormatOrderedList}
        onFormatQuote={handleFormatQuote}
        onFormatCode={handleFormatCode}
        onFormatAlign={handleFormatAlign}
        onFormatHorizontalRule={handleFormatHorizontalRule}
      />
      <div className="pt-16">
        <Editor
          content={notes[activeTab as keyof NotesState]}
          onChange={handleContentChange}
          zoom={zoom}
          fontFamily={fontFamily}
          onEditorReady={setEditor}
        />
      </div>
    </div>
  );
};

export default Index;
