
```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Define business ideas with validation
interface BusinessIdea {
  name: string;
  description: string;
  marketPotential: "high" | "medium" | "low";
  requiredSkills: string[];
  estimatedStartupCost: string;
  validationScore: number;
}

async function generateBusinessIdea(): Promise<BusinessIdea> {
  const systemPrompt = `You are an expert business consultant specializing in startup validation and idea generation.
Generate innovative business ideas based on market analysis and current trends.
Always validate ideas based on market potential, skill requirements, and feasibility.
Respond with JSON format containing: name, description, marketPotential, requiredSkills (array), estimatedStartupCost, and validationScore (0-100).`;

  const userPrompt = `Generate a unique business idea that combines technology with sustainability.
Focus on ideas that have high market potential in 2024.
Return a JSON object with the exact structure specified.`;

  console.log("🚀 Generating business idea using Claude AI...\n");

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse JSON from Claude response");
  }

  const idea = JSON.parse(jsonMatch[0]) as BusinessIdea;
  return idea;
}

async function validateBusinessIdea(idea: BusinessIdea): Promise<{
  isValid: boolean;
  reasoning: string;
  improvements: string[];
}> {
  const systemPrompt = `You are a business validation expert.
Analyze business ideas and provide detailed validation feedback.
Consider market viability, competition, scalability, and resource requirements.
Respond with JSON containing: isValid (boolean), reasoning (string), and improvements (array of strings).`;

  const userPrompt = `Validate this business idea:
Name: ${idea.name}
Description: ${idea.description}
Market Potential: ${idea.marketPotential}
Required Skills: ${idea.requiredSkills.join(", ")}
Startup Cost: ${idea.estimatedStartupCost}
Initial Validation Score: ${idea.validationScore}

Provide thorough validation analysis and suggestions for improvement.
Return a JSON object with the exact structure specified.`;

  console.log("✅ Validating business idea with detailed analysis...\n");

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse JSON from validation response");
  }

  const validation = JSON.parse(jsonMatch[0]) as {
    isValid: boolean;
    reasoning: string;
    improvements: string[];
  };
  return validation;
}

async function generateExecutionPlan(idea: BusinessIdea): Promise<{
  phase1: string[];
  phase2: string[];
  phase3: string[];
  keyMetrics: string[];
}> {
  const systemPrompt = `You are a startup execution specialist.
Create detailed 90-day action plans for new business ideas.
Structure plans in three phases: Foundation, Growth, and Scale.
Respond with JSON containing: phase1, phase2, phase3 (arrays of strings), and keyMetrics (array of strings).`;

  const userPrompt = `Create a 90-day execution plan for this business:
Name: ${idea.name}
Description: ${idea.description}
Market Potential: ${idea.marketPotential}
Required Skills: ${idea.requiredSkills.join(", ")}

Provide actionable steps for each phase and key metrics to track.
Return a JSON object with the exact structure specified.`;

  console.log("📋 Generating execution plan for the business idea...\n");

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse JSON from execution plan response");
  }

  const plan = JSON.parse(jsonMatch[0]) as {
    phase1: string[];
    phase2: string[];
    phase3: string[];
    keyMetrics: string[];
  };
  return plan;
}

async function main() {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         BUSINESS IDEA GENERATOR & VALIDATOR                ║");
  console.log("║                Powered by Claude AI                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  // Generate business idea
  const businessIdea = await generateBusinessIdea();

  console.log("📊 Generated Business Idea:\n");
  