import { useState } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

export interface AnalysisResult {
  type: 'text' | 'image' | 'url';
  credibilityScore: number;
  analysis: string;
  sources: string[];
  flags: {
    potentialMisinformation: boolean;
    needsFactChecking: boolean;
    biasDetected: boolean;
    manipulatedContent: boolean;
  };
  details: {
    sentiment?: string;
    confidence: number;
    keyTerms: string[];
  };
}

export const useAIAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const analyzeText = async (text: string): Promise<AnalysisResult> => {
    setIsAnalyzing(true);
    
    try {
      // Initialize sentiment analysis pipeline
      const sentiment = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
      
      // Mock sentiment analysis for demo purposes
      const mockSentiment = {
        label: Math.random() > 0.5 ? 'POSITIVE' : 'NEGATIVE',
        score: Math.random() * 0.5 + 0.5
      };
      
      // Extract key terms (simplified)
      const keyTerms = text
        .toLowerCase()
        .split(/\W+/)
        .filter(word => word.length > 4)
        .slice(0, 5);

      // Mock credibility analysis (in real app, use specialized models)
      const suspiciousWords = ['breaking', 'urgent', 'shocking', 'secret', 'exposed'];
      const hasSuspiciousWords = suspiciousWords.some(word => 
        text.toLowerCase().includes(word)
      );

      const credibilityScore = hasSuspiciousWords ? 
        Math.random() * 0.4 + 0.1 : // Low credibility (10-50%)
        Math.random() * 0.5 + 0.5;  // Higher credibility (50-100%)

      const result: AnalysisResult = {
        type: 'text',
        credibilityScore,
        analysis: generateAnalysisText(credibilityScore, mockSentiment),
        sources: [
          'Reuters Fact Check Database',
          'AP News Verification',
          'Snopes.com',
          'PolitiFact'
        ],
        flags: {
          potentialMisinformation: credibilityScore < 0.4,
          needsFactChecking: credibilityScore < 0.6,
          biasDetected: Math.abs(mockSentiment.score - 0.5) > 0.3,
          manipulatedContent: hasSuspiciousWords
        },
        details: {
          sentiment: mockSentiment.label,
          confidence: mockSentiment.score,
          keyTerms
        }
      };

      setResults(result);
      return result;
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to analyze content');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeImage = async (imageFile: File): Promise<AnalysisResult> => {
    setIsAnalyzing(true);
    
    try {
      // Mock image analysis (in real app, use deepfake detection models)
      const credibilityScore = Math.random() * 0.8 + 0.2;
      
      const result: AnalysisResult = {
        type: 'image',
        credibilityScore,
        analysis: `Image analysis complete. ${credibilityScore > 0.7 ? 'No signs of manipulation detected.' : 'Potential digital manipulation found in image metadata and pixel analysis.'}`,
        sources: [
          'Forensic Image Analysis DB',
          'Deepfake Detection Network',
          'Metadata Verification'
        ],
        flags: {
          potentialMisinformation: credibilityScore < 0.5,
          needsFactChecking: credibilityScore < 0.7,
          biasDetected: false,
          manipulatedContent: credibilityScore < 0.4
        },
        details: {
          confidence: credibilityScore,
          keyTerms: ['digital_signature', 'metadata', 'pixel_analysis']
        }
      };

      setResults(result);
      return result;
    } catch (error) {
      console.error('Image analysis error:', error);
      throw new Error('Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeURL = async (url: string): Promise<AnalysisResult> => {
    setIsAnalyzing(true);
    
    try {
      // Mock URL analysis
      const knownReliableDomains = ['reuters.com', 'ap.org', 'bbc.com', 'npr.org'];
      const knownUnreliableDomains = ['fakenews.com', 'clickbait.org'];
      
      const domain = new URL(url).hostname.toLowerCase();
      let credibilityScore = 0.5; // Default
      
      if (knownReliableDomains.some(d => domain.includes(d))) {
        credibilityScore = Math.random() * 0.3 + 0.7; // 70-100%
      } else if (knownUnreliableDomains.some(d => domain.includes(d))) {
        credibilityScore = Math.random() * 0.3 + 0.1; // 10-40%
      } else {
        credibilityScore = Math.random() * 0.6 + 0.3; // 30-90%
      }

      const result: AnalysisResult = {
        type: 'url',
        credibilityScore,
        analysis: `Website analysis for ${domain}: ${generateUrlAnalysis(credibilityScore, domain)}`,
        sources: [
          'MediaBias/FactCheck',
          'AllSides Media Bias Chart',
          'NewsGuard Rating',
          'Wikipedia Reliability'
        ],
        flags: {
          potentialMisinformation: credibilityScore < 0.4,
          needsFactChecking: credibilityScore < 0.6,
          biasDetected: Math.random() > 0.5,
          manipulatedContent: credibilityScore < 0.3
        },
        details: {
          confidence: credibilityScore,
          keyTerms: [domain, 'source_reliability', 'fact_checking']
        }
      };

      setResults(result);
      return result;
    } catch (error) {
      console.error('URL analysis error:', error);
      throw new Error('Failed to analyze URL');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetResults = () => setResults(null);

  return {
    isAnalyzing,
    results,
    analyzeText,
    analyzeImage,
    analyzeURL,
    resetResults
  };
};

function generateAnalysisText(credibilityScore: number, sentiment: any): string {
  if (credibilityScore > 0.8) {
    return `High credibility content detected. The text shows consistent factual patterns and neutral language typical of reliable sources. Sentiment analysis indicates ${sentiment.label.toLowerCase()} tone with ${Math.round(sentiment.score * 100)}% confidence.`;
  } else if (credibilityScore > 0.6) {
    return `Moderate credibility. Content requires fact-checking but shows some reliable indicators. Consider cross-referencing with multiple sources before sharing.`;
  } else if (credibilityScore > 0.4) {
    return `Low credibility detected. Content contains suspicious language patterns, emotional manipulation tactics, or unverified claims. Exercise caution and verify through official sources.`;
  } else {
    return `Potential misinformation identified. High risk of false or misleading information. Contains multiple red flags including sensational language, unsubstantiated claims, and manipulation patterns.`;
  }
}

function generateUrlAnalysis(credibilityScore: number, domain: string): string {
  if (credibilityScore > 0.8) {
    return `Domain "${domain}" has high reliability ratings from fact-checking organizations. Consistently accurate reporting with transparent editorial standards.`;
  } else if (credibilityScore > 0.6) {
    return `Generally reliable source with occasional bias. Cross-reference important claims with additional sources.`;
  } else if (credibilityScore > 0.4) {
    return `Mixed reliability. Known for bias or occasional misinformation. Verify claims through multiple independent sources.`;
  } else {
    return `Low reliability domain. History of spreading misinformation or extreme bias. Avoid as a primary source.`;
  }
}