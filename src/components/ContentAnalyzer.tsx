import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, Video, Link, Upload, Search } from "lucide-react";

const ContentAnalyzer = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [content, setContent] = useState("");

  return (
    <section id="analyzer" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Content Analyzer</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Verify text, images, or URLs instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-morphism border-cyber-glow/20 shadow-card-glass">
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 glass-morphism border border-cyber-glow/20">
                  <TabsTrigger 
                    value="text" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Text Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="image"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Image Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="video"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="url"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    URL Analysis
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="mt-8">
                  <div className="space-y-6">
                    <Textarea
                      placeholder="Enter the content you'd like us to analyze for potential misinformation..."
                      className="min-h-[200px] glass-morphism border-cyber-glow/20 text-foreground placeholder:text-foreground/50 resize-none"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <Button variant="cyber" size="lg" className="w-full">
                      <Search className="w-4 h-4 mr-2" />
                      Analyze Content
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="mt-8">
                  <div className="space-y-6">
                    <div className="glass-morphism border-2 border-dashed border-cyber-glow/30 rounded-lg p-12 text-center">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
                      <p className="text-foreground/60 mb-4">Supported formats: JPG, PNG, WEBP</p>
                      <Button variant="glass" size="lg">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="mt-8">
                  <div className="space-y-6">
                    <div className="glass-morphism border-2 border-dashed border-cyber-glow/30 rounded-lg p-12 text-center">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload Video</h3>
                      <p className="text-foreground/60 mb-4">Supported formats: MP4, MOV</p>
                      <Button variant="glass" size="lg">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="url" className="mt-8">
                  <div className="space-y-6">
                    <input
                      type="url"
                      placeholder="https://example.com/article-to-verify"
                      className="w-full p-4 glass-morphism border border-cyber-glow/20 rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button variant="cyber" size="lg" className="w-full">
                      <Search className="w-4 h-4 mr-2" />
                      Analyze URL
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentAnalyzer;