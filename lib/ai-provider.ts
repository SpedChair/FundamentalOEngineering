import { Question } from "./types";

export interface AIProvider {
  generateQuestions(params: {
    sections: string[];
    difficulty: string;
    count: number;
    typeDistribution: { mcq: number; numeric: number };
  }): Promise<Question[]>;
}

export class OpenAIProvider implements AIProvider {
  constructor(_apiKey: string) {
    // API key managed server-side only
  }

  async generateQuestions(_params: {
    sections: string[];
    difficulty: string;
    count: number;
    typeDistribution: { mcq: number; numeric: number };
  }): Promise<Question[]> {
    // This will be implemented on the server-side API route
    // Client should never call this directly
    throw new Error("Use API route /api/generate instead");
  }
}

export class LocalLLMProvider implements AIProvider {
  constructor(_baseUrl: string) {
    // Base URL for local LLM
  }

  async generateQuestions(_params: {
    sections: string[];
    difficulty: string;
    count: number;
    typeDistribution: { mcq: number; numeric: number };
  }): Promise<Question[]> {
    // Placeholder for local LLM integration
    throw new Error("Local LLM provider not yet implemented");
  }
}
