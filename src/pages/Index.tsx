import { useState, useEffect } from "react";
import { Editor } from "@/components/Editor";
import { Toolbar } from "@/components/Toolbar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

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
      />
      <div className="pt-16">
        <Editor
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
