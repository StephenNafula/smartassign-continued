export class HuggingFaceAPI {
  private apiKey: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_HUGGING_FACE_API_KEY || '';
  }

  async generateSuggestions(text: string): Promise<string[]> {
    if (!this.apiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: text,
            parameters: { max_length: 150, min_length: 30 }
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate AI suggestions');
      }

      const result = await response.json();
      return result.map((item: any) => item.summary_text || item.generated_text);
    } catch (error) {
      console.error('AI suggestion error:', error);
      return [];
    }
  }

  async improveGrammar(text: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/grammarly/coedit-large',
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to improve grammar');
      }

      const result = await response.json();
      return result[0]?.generated_text || text;
    } catch (error) {
      console.error('Grammar improvement error:', error);
      return text;
    }
  }
}

export const aiService = new HuggingFaceAPI();