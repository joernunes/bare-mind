import { useState, useEffect, useRef } from "react";
import { Editor, EditorRef } from "@/components/Editor";
import { Toolbar } from "@/components/Toolbar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMarkdownEditor } from "@/hooks/useMarkdownEditor";
import { toast } from "sonner";

interface NotesState {
  ideas: string;
  tasks: string;
  projects: string;
  references: string;
}

const Index = () => {
  const editorRef = useRef<EditorRef>(null);
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

  const textareaRef = editorRef.current?.textareaRef || { current: null };
  const markdown = useMarkdownEditor(textareaRef);

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
    markdown.formatBold(handleContentChange);
  };

  const handleFormatItalic = () => {
    markdown.formatItalic(handleContentChange);
  };

  const handleFormatHeading = (level: number) => {
    markdown.formatHeading(level, handleContentChange);
  };

  const handleFormatList = () => {
    markdown.formatList(handleContentChange);
  };

  const handleFormatOrderedList = () => {
    markdown.formatOrderedList(handleContentChange);
  };

  const handleFormatQuote = () => {
    markdown.formatQuote(handleContentChange);
  };

  const handleFormatCode = () => {
    markdown.formatCode(handleContentChange);
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
        onFormatHeading={handleFormatHeading}
        onFormatList={handleFormatList}
        onFormatOrderedList={handleFormatOrderedList}
        onFormatQuote={handleFormatQuote}
        onFormatCode={handleFormatCode}
      />
      <div className="pt-14 md:pt-16">
        <Editor
          ref={editorRef}
          content={notes[activeTab as keyof NotesState]}
          onChange={handleContentChange}
          zoom={zoom}
          fontFamily={fontFamily}
        />
      </div>
    </div>
  );
};

export default Index;
