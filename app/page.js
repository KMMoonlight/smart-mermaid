"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Header } from "@/components/header";
import { SettingsDialog } from "@/components/settings-dialog";
import { TextInput } from "@/components/text-input";
import { FileUpload } from "@/components/file-upload";
import { DiagramTypeSelector } from "@/components/diagram-type-selector";
import { MermaidEditor } from "@/components/mermaid-editor";
// import { ExcalidrawRenderer } from "@/components/excalidraw-renderer";
import { generateMermaidFromText } from "@/lib/ai-service";
import { isWithinCharLimit } from "@/lib/utils";
import { isPasswordVerified, hasCustomAIConfig, hasUnlimitedAccess } from "@/lib/config-service";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const ExcalidrawRenderer = dynamic(() => import("@/components/excalidraw-renderer"), { ssr: false });

const usageLimit = parseInt(process.env.NEXT_PUBLIC_DAILY_USAGE_LIMIT || "5");

// Usage tracking functions
const checkUsageLimit = () => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const usageData = JSON.parse(localStorage.getItem('usageData') || '{}');
  const todayUsage = usageData[today] || 0;
  return todayUsage < usageLimit; // Return true if within limit
};

const incrementUsage = () => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const usageData = JSON.parse(localStorage.getItem('usageData') || '{}');
  
  if (!usageData[today]) {
    usageData[today] = 0;
  }
  
  usageData[today] += 1;
  localStorage.setItem('usageData', JSON.stringify(usageData));
};

const checkAndIncrementUsage = () => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const usageData = JSON.parse(localStorage.getItem('usageData') || '{}');
  
  if (!usageData[today]) {
    usageData[today] = 0;
  }
  
  if (usageData[today] >= usageLimit) {
    return false; // Limit exceeded
  }
  
  usageData[today] += 1;
  localStorage.setItem('usageData', JSON.stringify(usageData));
  return true; // Within limit
};

const getRemainingUsage = () => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const usageData = JSON.parse(localStorage.getItem('usageData') || '{}');
  const todayUsage = usageData[today] || 0;
  return Math.max(0, usageLimit - todayUsage);
};

// Preprocessing function for mermaidCode
const preprocessMermaidCode = (code) => {
  if (!code) return code;
  // Remove <br> tags
  return code.replace(/<br\s*\/?>/gi, '');
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [diagramType, setDiagramType] = useState("auto");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [remainingUsage, setRemainingUsage] = useState(5);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [hasCustomConfig, setHasCustomConfig] = useState(false);
  const maxChars = parseInt(process.env.NEXT_PUBLIC_MAX_CHARS || "20000");

  useEffect(() => {
    // Update remaining usage count on component mount
    setRemainingUsage(getRemainingUsage());
    // Check password verification status
    setPasswordVerified(isPasswordVerified());
    // Check custom AI config status
    setHasCustomConfig(hasCustomAIConfig());
  }, []);

  const handleTextChange = (text) => {
    setInputText(text);
  };

  const handleFileTextExtracted = (text) => {
    setInputText(text);
  };

  const handleDiagramTypeChange = (type) => {
    setDiagramType(type);
  };

  const handleMermaidCodeChange = (code) => {
    setMermaidCode(code);
  };

  const handleStreamChunk = (chunk) => {
    setStreamingContent(prev => prev + chunk);
  };

  const handleSettingsClick = () => {
    setShowSettingsDialog(true);
  };

  const handleContactClick = () => {
    setShowContactDialog(true);
  };

  const handlePasswordVerified = (verified) => {
    setPasswordVerified(verified);
  };

  const handleConfigUpdated = () => {
    // 重新检查自定义配置状态
    setHasCustomConfig(hasCustomAIConfig());
  };

  const handleGenerateClick = async () => {
    if (!inputText.trim()) {
      toast.error("请输入文本内容");
      return;
    }

    if (!isWithinCharLimit(inputText, maxChars)) {
      toast.error(`文本超过${maxChars}字符限制`);
      return;
    }

    // 检查是否有无限量权限（密码验证通过或有自定义AI配置）
    const hasUnlimited = hasUnlimitedAccess();
    
    // 如果没有无限量权限，则检查使用限制（但不增加使用量）
    if (!hasUnlimited) {
      if (!checkUsageLimit()) {
        setShowLimitDialog(true);
        return;
      }
    }

    setIsGenerating(true);
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const { mermaidCode: generatedCode, error } = await generateMermaidFromText(
        inputText,
        diagramType,
        handleStreamChunk
      );

      if (error) {
        toast.error(error);
        return;
      }

      if (!generatedCode) {
        toast.error("生成图表失败，请重试");
        return;
      }

      // 只有在API调用成功后才增加使用量
      if (!hasUnlimited) {
        incrementUsage();
        setRemainingUsage(getRemainingUsage());
      }

      // 预处理生成的mermaidCode
      const processedCode = preprocessMermaidCode(generatedCode);
      setMermaidCode(processedCode);
      toast.success("图表生成成功");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("生成图表时发生错误");
    } finally {
      setIsGenerating(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        remainingUsage={remainingUsage}
        usageLimit={usageLimit}
        onSettingsClick={handleSettingsClick}
        onContactClick={handleContactClick}
        isPasswordVerified={passwordVerified}
        hasCustomConfig={hasCustomConfig}
      />
      
      <main className="flex-1  py-6 px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1 flex flex-col">
            {/* <h2 className="text-2xl font-bold">文本输入</h2> */}
            
            <Tabs defaultValue="manual">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="manual">手动输入</TabsTrigger>
                  <TabsTrigger value="file">文件上传</TabsTrigger>
                </TabsList>
                <div className="w-40">
                  <DiagramTypeSelector 
                    value={diagramType} 
                    onChange={handleDiagramTypeChange} 
                  />
                </div>
              </div>
              <TabsContent value="manual" className="mt-4">
                <TextInput 
                  value={inputText} 
                  onChange={handleTextChange} 
                  maxChars={maxChars}
                />
              </TabsContent>
              <TabsContent value="file" className="mt-4">
                <FileUpload onTextExtracted={handleFileTextExtracted} />
              </TabsContent>
            </Tabs>

            <div className="space-y-4 flex-1">
              <Button 
                onClick={handleGenerateClick} 
                disabled={isGenerating || !inputText.trim() || !isWithinCharLimit(inputText, maxChars)}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    生成图表
                  </>
                )}
              </Button>
            </div>
            
            {/* <Card className=" p-0"> */}
              {/* <CardContent className="p-4"> */}
                <MermaidEditor 
                  code={mermaidCode} 
                  onChange={handleMermaidCodeChange}
                  streamingContent={streamingContent}
                  isStreaming={isStreaming}
                />
              {/* </CardContent> */}
            {/* </Card> */}
          </div>
          
          <div className="space-y-6 md:col-span-2">
            
            {/* <Card className="h-full p-0"> */}
              {/* <CardContent className="p-4 h-full"> */}
                <ExcalidrawRenderer mermaidCode={mermaidCode} />
              {/* </CardContent> */}
            {/* </Card> */}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4 px-6">
        <div className=" text-center text-sm text-muted-foreground">
          AI 驱动的文本转 Mermaid 图表 Web 应用 &copy; {new Date().getFullYear()}
        </div>
      </footer>

      {/* Settings Dialog */}
      <SettingsDialog 
        open={showSettingsDialog} 
        onOpenChange={setShowSettingsDialog}
        onPasswordVerified={handlePasswordVerified}
        onConfigUpdated={handleConfigUpdated}
      />

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>联系作者</DialogTitle>
            <DialogDescription>
              <div className="py-4">
                <p className="mb-2">如需更多使用次数或技术支持，请扫描下方二维码联系作者</p>
                <div className="flex justify-center my-4">
                  <img src="/qrcode.png" alt="联系二维码" className="w-48" />
                </div>
                <p className="text-sm text-muted-foreground">
                  提示：您也可以在设置中配置自己的AI服务密钥，即可享有无限使用权限
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button variant="secondary" onClick={() => setShowContactDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Usage Limit Dialog */}
      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>使用次数已达上限</DialogTitle>
            <DialogDescription>
              <div className="py-4">
                <p className="mb-2">您今日的使用次数已达上限 ({usageLimit}次/天)</p>
                <p className="mb-4">如需更多使用次数，您可以：</p>
                <ul className="list-disc list-inside space-y-2 text-sm mb-4">
                  <li>扫描下方二维码联系作者</li>
                  <li>在设置中配置您自己的AI服务密钥</li>
                </ul>
                <div className="flex justify-center my-4">
                  <img src="/qrcode.png" alt="联系二维码" className="w-48" />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button variant="secondary" onClick={() => setShowLimitDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
