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
  onFormatBold?: () => void;
  onFormatItalic?: () => void;
  onFormatHeading?: (level: 1 | 2 | 3) => void;
  onFormatList?: () => void;
  onFormatOrderedList?: () => void;
  onFormatQuote?: () => void;
  onFormatCode?: () => void;
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
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
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

          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatBold} title="Negrito">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatItalic} title="Itálico">
            <Italic className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button variant="ghost" size="sm" className="h-9" onClick={() => onFormatHeading?.(1)} title="Título 1">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={() => onFormatHeading?.(2)} title="Título 2">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={() => onFormatHeading?.(3)} title="Título 3">
            <Heading3 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatList} title="Lista">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatOrderedList} title="Lista Numerada">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatQuote} title="Citação">
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9" onClick={onFormatCode} title="Código">
            <Code className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onZoomOut} className="h-9">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onZoomIn} className="h-9">
            <ZoomIn className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button variant="ghost" size="sm" onClick={onToggleTheme} className="h-9">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" size="sm" className="h-9">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
