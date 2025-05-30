"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { FileCode2, Github, Settings, Plus } from "lucide-react";

export function Header({ 
  remainingUsage = 0, 
  usageLimit = parseInt(process.env.NEXT_PUBLIC_DAILY_USAGE_LIMIT || "5"), 
  onSettingsClick, 
  onContactClick,
  isPasswordVerified = false,
  hasCustomConfig = false 
}) {
  const hasUnlimitedAccess = isPasswordVerified || hasCustomConfig;

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-6 w-6" />
          <span className="text-lg font-bold">Smart Mermaid</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSettingsClick}
            title="设置"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 
