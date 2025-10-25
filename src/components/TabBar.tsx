import { Lightbulb, CheckSquare, Folder, BookOpen } from "lucide-react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const tabs = [
    { id: "ideas", label: "Ideias Rápidas", icon: Lightbulb },
    { id: "tasks", label: "Tarefas do Dia", icon: CheckSquare },
    { id: "projects", label: "Projetos", icon: Folder },
    { id: "references", label: "Referências", icon: BookOpen },
  ];

  return (
    <div className="fixed top-16 left-0 right-0 bg-background border-b border-border z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-smooth border-b-2 ${
                  isActive
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
