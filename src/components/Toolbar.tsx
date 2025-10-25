import {
  Type,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun,
  Settings,
  Lightbulb,
  CheckSquare,
  Folder,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  onFontChange: (font: string) => void;
  currentFont: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onFormatBold: () => void;
  onFormatItalic: () => void;
  onFormatHeading: (level: number) => void;
  onFormatList: () => void;
  onFormatOrderedList: () => void;
  onFormatQuote: () => void;
  onFormatCode: () => void;
}

export const Toolbar = ({
  onZoomIn,
  onZoomOut,
  onToggleTheme,
  isDark,
  onFontChange,
  currentFont,
  activeTab,
  onTabChange,
  onFormatBold,
  onFormatItalic,
  onFormatHeading,
  onFormatList,
  onFormatOrderedList,
  onFormatQuote,
  onFormatCode,
}: ToolbarProps) => {
  const fontOptions = [
    { label: "Sans Serif", value: "font-sans-default" },
    { label: "Monospace", value: "font-mono" },
    { label: "Serif", value: "font-serif" },
  ];

  const tabs = [
    { id: "ideas", label: "Ideias Rápidas", icon: Lightbulb },
    { id: "tasks", label: "Tarefas do Dia", icon: CheckSquare },
    { id: "projects", label: "Projetos", icon: Folder },
    { id: "references", label: "Referências", icon: BookOpen },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="toolbar">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 gap-2">
                {currentTab && <currentTab.icon className="h-4 w-4" />}
                <span className="text-sm">{currentTab?.label}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <DropdownMenuItem
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={activeTab === tab.id ? "bg-accent" : ""}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-border mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9">
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {fontOptions.map((font) => (
                <DropdownMenuItem
                  key={font.value}
                  onClick={() => onFontChange(font.value)}
                  className={currentFont === font.value ? "bg-accent" : ""}
                >
                  {font.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-border mx-1" />

          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatBold} title="Negrito (Markdown: **texto**)">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatItalic} title="Itálico (Markdown: *texto*)">
            <Italic className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1 hidden md:block" />

          <Button variant="ghost" size="sm" className="h-9 hidden md:flex" onClick={() => onFormatHeading(1)} title="Título 1 (Markdown: # texto)">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 hidden md:flex" onClick={() => onFormatHeading(2)} title="Título 2 (Markdown: ## texto)">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 hidden md:flex" onClick={() => onFormatHeading(3)} title="Título 3 (Markdown: ### texto)">
            <Heading3 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1 hidden md:block" />

          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatList} title="Lista (Markdown: - texto)">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 hidden sm:flex" onClick={onFormatOrderedList} title="Lista Numerada (Markdown: 1. texto)">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 hidden sm:flex" onClick={onFormatQuote} title="Citação (Markdown: > texto)">
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatCode} title="Código (Markdown: `texto`)">
            <Code className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onZoomOut} className="h-8 md:h-9" title="Diminuir zoom">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onZoomIn} className="h-8 md:h-9" title="Aumentar zoom">
            <ZoomIn className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button variant="ghost" size="sm" onClick={onToggleTheme} className="h-8 md:h-9" title={isDark ? "Modo claro" : "Modo escuro"}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" size="sm" className="h-8 md:h-9 hidden md:flex" title="Configurações">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
