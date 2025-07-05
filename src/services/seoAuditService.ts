export interface SEOAuditResult {
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  checks: {
    titleLength: { passed: boolean; message: string; score: number };
    metaDescription: { passed: boolean; message: string; score: number };
    contentLength: { passed: boolean; message: string; score: number };
    headingStructure: { passed: boolean; message: string; score: number };
    keywordOptimization: { passed: boolean; message: string; score: number };
    readability: { passed: boolean; message: string; score: number };
    imageOptimization: { passed: boolean; message: string; score: number };
  };
  recommendations: string[];
  criticalIssues: string[];
}

export class SEOAuditService {
  static auditBlogPost(data: {
    title: string;
    titleKa: string;
    content: string;
    contentKa: string;
    excerpt: string;
    excerptKa: string;
    metaDescription: string;
    metaDescriptionKa: string;
    seoTags: string;
    seoTagsKa: string;
    featuredImageUrl: string;
    images?: File[];
    selectedH1En?: string;
    selectedH1Ka?: string;
  }): SEOAuditResult {
    const checks = {
      titleLength: this.checkTitleLength(data.title, data.titleKa),
      metaDescription: this.checkMetaDescription(data.metaDescription, data.metaDescriptionKa),
      contentLength: this.checkContentLength(data.content, data.contentKa),
      headingStructure: this.checkHeadingStructure(data.content, data.contentKa),
      keywordOptimization: this.checkKeywordOptimization(data),
      readability: this.checkReadability(data.content, data.contentKa),
      imageOptimization: this.checkImageOptimization(data.featuredImageUrl, data.content, data.images)
    };

    const totalScore = this.calculateTotalScore(checks);
    const status = this.getStatus(totalScore);
    const recommendations = this.generateRecommendations(checks);
    const criticalIssues = this.getCriticalIssues(checks);

    return {
      score: totalScore,
      status,
      checks,
      recommendations,
      criticalIssues
    };
  }

  private static checkTitleLength(title: string, titleKa: string) {
    const enLength = title.length;
    const kaLength = titleKa.length;
    
    const isEnGood = enLength >= 30 && enLength <= 60;
    const isKaGood = kaLength >= 20 && kaLength <= 50;
    
    if (isEnGood && isKaGood) {
      return { passed: true, message: '✅ Title lengths are optimal', score: 100 };
    }
    
    if (!title || !titleKa) {
      return { passed: false, message: '❌ Missing title in one or both languages', score: 0 };
    }
    
    const issues = [];
    if (!isEnGood) issues.push(`English title: ${enLength} chars (recommended: 30-60)`);
    if (!isKaGood) issues.push(`Georgian title: ${kaLength} chars (recommended: 20-50)`);
    
    return { 
      passed: false, 
      message: `⚠️ Title length issues: ${issues.join(', ')}`, 
      score: 50 
    };
  }

  private static checkMetaDescription(metaDesc: string, metaDescKa: string) {
    const enLength = metaDesc.length;
    const kaLength = metaDescKa.length;
    
    const isEnGood = enLength >= 120 && enLength <= 160;
    const isKaGood = kaLength >= 100 && kaLength <= 140;
    
    if (isEnGood && isKaGood) {
      return { passed: true, message: '✅ Meta descriptions are optimal', score: 100 };
    }
    
    if (!metaDesc || !metaDescKa) {
      return { passed: false, message: '❌ Missing meta description in one or both languages', score: 0 };
    }
    
    const issues = [];
    if (!isEnGood) issues.push(`English: ${enLength} chars (recommended: 120-160)`);
    if (!isKaGood) issues.push(`Georgian: ${kaLength} chars (recommended: 100-140)`);
    
    return { 
      passed: false, 
      message: `⚠️ Meta description issues: ${issues.join(', ')}`, 
      score: 50 
    };
  }

  private static checkContentLength(content: string, contentKa: string) {
    const enWords = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
    const kaWords = contentKa.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
    
    const isEnGood = enWords >= 300;
    const isKaGood = kaWords >= 250;
    
    if (isEnGood && isKaGood) {
      return { passed: true, message: `✅ Content length is good (EN: ${enWords}, KA: ${kaWords} words)`, score: 100 };
    }
    
    const issues = [];
    if (!isEnGood) issues.push(`English: ${enWords} words (minimum: 300)`);
    if (!isKaGood) issues.push(`Georgian: ${kaWords} words (minimum: 250)`);
    
    return { 
      passed: false, 
      message: `⚠️ Content too short: ${issues.join(', ')}`, 
      score: enWords > 100 || kaWords > 100 ? 60 : 20 
    };
  }

  private static checkHeadingStructure(content: string, contentKa: string) {
    const enHeadings = this.extractHeadings(content);
    const kaHeadings = this.extractHeadings(contentKa);
    
    const hasEnH1 = enHeadings.h1 > 0;
    const hasKaH1 = kaHeadings.h1 > 0;
    const hasEnH2 = enHeadings.h2 > 0;
    const hasKaH2 = kaHeadings.h2 > 0;
    
    if (hasEnH1 && hasKaH1 && hasEnH2 && hasKaH2) {
      return { passed: true, message: '✅ Good heading structure in both languages', score: 100 };
    }
    
    const issues = [];
    if (!hasEnH1) issues.push('Missing H1 in English');
    if (!hasKaH1) issues.push('Missing H1 in Georgian');
    if (!hasEnH2) issues.push('No H2 headings in English');
    if (!hasKaH2) issues.push('No H2 headings in Georgian');
    
    return { 
      passed: false, 
      message: `⚠️ Heading issues: ${issues.join(', ')}`, 
      score: 50 
    };
  }

  private static extractHeadings(content: string) {
    return {
      h1: (content.match(/<h1[^>]*>/gi) || []).length,
      h2: (content.match(/<h2[^>]*>/gi) || []).length,
      h3: (content.match(/<h3[^>]*>/gi) || []).length,
      h4: (content.match(/<h4[^>]*>/gi) || []).length
    };
  }

  private static checkKeywordOptimization(data: any) {
    const keywords = [...data.seoTags.split(','), ...data.seoTagsKa.split(',')]
      .map((tag: string) => tag.trim().toLowerCase())
      .filter((tag: string) => tag.length > 0);
    
    if (keywords.length === 0) {
      return { passed: false, message: '❌ No SEO keywords/tags defined', score: 0 };
    }
    
    if (keywords.length < 2) {
      return { passed: false, message: `⚠️ Only ${keywords.length} keyword (recommended: 2-4)`, score: 40 };
    }
    
    if (keywords.length > 4) {
      return { passed: false, message: `⚠️ Too many keywords (${keywords.length}). Focus on 2-4 main terms`, score: 60 };
    }
    
    const titleText = (data.title + ' ' + data.titleKa).toLowerCase();
    const contentText = (data.content + ' ' + data.contentKa).toLowerCase();
    
    const keywordsInTitle = keywords.filter(keyword => titleText.includes(keyword)).length;
    const keywordsInContent = keywords.filter(keyword => contentText.includes(keyword)).length;
    
    if (keywordsInTitle > 0 && keywordsInContent >= keywords.length * 0.7) {
      return { passed: true, message: '✅ Good keyword optimization', score: 100 };
    }
    
    return { 
      passed: false, 
      message: `⚠️ Keywords not well integrated (${keywordsInTitle} in title, ${keywordsInContent} in content)`, 
      score: 60 
    };
  }

  private static checkReadability(content: string, contentKa: string) {
    const enText = content.replace(/<[^>]*>/g, '');
    const kaText = contentKa.replace(/<[^>]*>/g, '');
    
    const avgEnSentenceLength = this.getAverageSentenceLength(enText);
    const avgKaSentenceLength = this.getAverageSentenceLength(kaText);
    
    const isEnReadable = avgEnSentenceLength <= 20;
    const isKaReadable = avgKaSentenceLength <= 25;
    
    if (isEnReadable && isKaReadable) {
      return { passed: true, message: '✅ Good readability in both languages', score: 100 };
    }
    
    const issues = [];
    if (!isEnReadable) issues.push(`English sentences too long (avg: ${avgEnSentenceLength} words)`);
    if (!isKaReadable) issues.push(`Georgian sentences too long (avg: ${avgKaSentenceLength} words)`);
    
    return { 
      passed: false, 
      message: `⚠️ Readability issues: ${issues.join(', ')}`, 
      score: 70 
    };
  }

  private static getAverageSentenceLength(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length === 0) return 0;
    
    const totalWords = sentences.reduce((acc, sentence) => {
      return acc + sentence.split(/\s+/).filter(word => word.length > 0).length;
    }, 0);
    
    return Math.round(totalWords / sentences.length);
  }

  private static checkImageOptimization(featuredImageUrl: string, content: string, _images?: File[]) {
    const hasFeatureImage = !!featuredImageUrl;
    const imagesInContent = (content.match(/<img[^>]*>/gi) || []).length;
    const totalImages = imagesInContent + (hasFeatureImage ? 1 : 0);
    
    if (!hasFeatureImage) {
      return { passed: false, message: '❌ No featured image set', score: 30 };
    }
    
    if (totalImages === 0) {
      return { passed: false, message: '❌ No images in the post', score: 20 };
    }
    
    if (totalImages >= 2) {
      return { passed: true, message: `✅ Good image usage (${totalImages} images)`, score: 100 };
    }
    
    return { 
      passed: false, 
      message: `⚠️ Consider adding more images (currently: ${totalImages})`, 
      score: 70 
    };
  }

  private static calculateTotalScore(checks: SEOAuditResult['checks']): number {
    const scores = Object.values(checks).map(check => check.score);
    return Math.round(scores.reduce((acc, score) => acc + score, 0) / scores.length);
  }

  private static getStatus(score: number): SEOAuditResult['status'] {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 50) return 'needs-improvement';
    return 'poor';
  }

  private static generateRecommendations(checks: SEOAuditResult['checks']): string[] {
    const recommendations: string[] = [];
    
    Object.entries(checks).forEach(([key, check]) => {
      if (!check.passed && check.score < 80) {
        switch (key) {
          case 'titleLength':
            recommendations.push('Optimize title length: 30-60 characters for English, 20-50 for Georgian');
            break;
          case 'metaDescription':
            recommendations.push('Write compelling meta descriptions: 120-160 characters for English, 100-140 for Georgian');
            break;
          case 'contentLength':
            recommendations.push('Increase content length: aim for 300+ words in English, 250+ in Georgian');
            break;
          case 'headingStructure':
            recommendations.push('Improve heading structure: use H1 for main title, H2 for sections');
            break;
          case 'keywordOptimization':
            recommendations.push('Better keyword integration: include 2-4 relevant keywords in title and content');
            break;
          case 'readability':
            recommendations.push('Improve readability: use shorter sentences and paragraphs');
            break;
          case 'imageOptimization':
            recommendations.push('Add more images: include featured image and 2-3 content images with alt text');
            break;
        }
      }
    });
    
    return recommendations;
  }

  private static getCriticalIssues(checks: SEOAuditResult['checks']): string[] {
    return Object.values(checks)
      .filter(check => !check.passed && check.score < 50)
      .map(check => check.message);
  }
}
