#!/usr/bin/env node

const { Command } = require('commander');
const axios = require('axios');

const program = new Command();
const AI_AGENT_URL = 'http://localhost:3000';
const OLLAMA_URL = 'http://localhost:11434';

// Simple colors without chalk
const colors = {
  success: (text) => `✅ ${text}`,
  error: (text) => `❌ ${text}`,
  warning: (text) => `⚠️  ${text}`,
  info: (text) => `ℹ️  ${text}`,
  highlight: (text) => `🔹 ${text}`,
  dim: (text) => `   ${text}`,
};

const logo = `
  ╔═══════════════════════════════════════╗
  ║    🤖 AI Agent CLI                    ║
  ║    Powered by Ollama & NestJS         ║
  ╚═══════════════════════════════════════╝
`;

// Helper functions
async function checkConnection(url) {
  try {
    await axios.get(url, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

async function connectToOllama() {
  try {
    console.log(colors.info('Connecting to Ollama...'));
    const response = await axios.post(
      `${AI_AGENT_URL}/ai-agent/ollama/connect`,
      {
        baseUrl: OLLAMA_URL,
        model: 'codellama:latest',
        timeout: 30000,
      },
    );

    if (response.data.success) {
      console.log(colors.success('Successfully connected to Ollama!'));
    } else {
      console.log(colors.error(`Failed to connect: ${response.data.error}`));
    }
  } catch (error) {
    console.log(colors.error(`Connection error: ${error.message}`));
  }
}

async function testChat(prompt) {
  try {
    console.log(colors.info(`Testing AI with prompt: "${prompt}"`));
    console.log(colors.dim('AI is thinking...'));

    const response = await axios.post(`${AI_AGENT_URL}/ai-agent/ollama/chat`, {
      prompt: prompt,
      temperature: 0.1,
      maxTokens: 1000,
    });

    if (response.data.success) {
      console.log(colors.success('AI Response received!'));
      console.log('\n📝 Response:');
      console.log('─'.repeat(60));
      console.log(response.data.data);
      console.log('─'.repeat(60));

      if (response.data.metadata) {
        console.log(colors.dim(`Model: ${response.data.metadata.model}`));
        console.log(
          colors.dim(`Response time: ${response.data.metadata.responseTime}ms`),
        );
      }
    } else {
      console.log(colors.error(`AI request failed: ${response.data.error}`));
    }
  } catch (error) {
    console.log(colors.error(`Test failed: ${error.message}`));
  }
}

// CLI Commands
program
  .name('ai-agent')
  .description('AI Agent CLI for automating development tasks')
  .version('1.0.0');

program
  .command('setup')
  .description('Setup and test AI Agent connection')
  .action(async () => {
    console.log(logo);
    console.log(colors.highlight('Setting up AI Agent...\n'));

    console.log(colors.info('1. Checking Ollama connection...'));
    const ollamaRunning = await checkConnection(`${OLLAMA_URL}/api/tags`);

    if (ollamaRunning) {
      console.log(colors.success('Ollama is running'));
    } else {
      console.log(colors.error('Ollama is not running'));
      console.log(colors.warning('Please start Ollama first: ollama serve'));
      return;
    }

    console.log(colors.info('2. Checking AI Agent server...'));
    const agentRunning = await checkConnection(`${AI_AGENT_URL}/health`);

    if (agentRunning) {
      console.log(colors.success('AI Agent server is running'));
    } else {
      console.log(colors.error('AI Agent server is not running'));
      console.log(colors.warning('Please start the server: yarn start:dev'));
      return;
    }

    console.log(colors.info('3. Connecting AI Agent to Ollama...'));
    await connectToOllama();

    console.log(colors.success('\n🎉 Setup complete!'));
    console.log(
      colors.dim('Try: yarn ai-agent test "Create a simple NestJS controller"'),
    );
  });

program
  .command('status')
  .description('Check AI Agent and Ollama status')
  .action(async () => {
    console.log(logo);
    console.log(colors.highlight('System Status\n'));

    const ollamaStatus = await checkConnection(`${OLLAMA_URL}/api/tags`);
    console.log(
      `Ollama Server: ${ollamaStatus ? colors.success('Running') : colors.error('Not running')}`,
    );

    const agentStatus = await checkConnection(`${AI_AGENT_URL}/health`);
    console.log(
      `AI Agent Server: ${agentStatus ? colors.success('Running') : colors.error('Not running')}`,
    );

    if (agentStatus) {
      try {
        const response = await axios.get(
          `${AI_AGENT_URL}/ai-agent/ollama/status`,
        );
        console.log(
          `Connection Status: ${response.data.isConnected ? colors.success('Connected') : colors.warning('Disconnected')}`,
        );
        console.log(colors.dim(`Model: ${response.data.model}`));
        console.log(colors.dim(`Base URL: ${response.data.baseUrl}`));
      } catch {
        console.log(`Connection Status: ${colors.error('Unable to check')}`);
      }
    }
  });

program
  .command('test [prompt]')
  .description('Test AI with a simple prompt')
  .action(async (prompt) => {
    console.log(logo);
    console.log(colors.highlight('Testing AI Agent...\n'));

    const testPrompt =
      prompt ||
      'Create a simple NestJS controller for user management with basic CRUD operations. Include proper decorators and validation.';
    await testChat(testPrompt);
  });

program
  .command('analyze <task>')
  .description('Analyze a development task')
  .action(async (task) => {
    console.log(logo);
    console.log(colors.highlight(`Analyzing task: "${task}"\n`));

    try {
      const response = await axios.post(
        `${AI_AGENT_URL}/ai-agent/ollama/analyze`,
        {
          task: task,
        },
      );

      if (response.data.success) {
        console.log(colors.success('Task analysis complete!'));
        console.log('\n📋 Analysis Result:');
        console.log('─'.repeat(60));
        console.log(response.data.data);
        console.log('─'.repeat(60));
      } else {
        console.log(colors.error(`Analysis failed: ${response.data.error}`));
      }
    } catch (error) {
      console.log(colors.error(`Error: ${error.message}`));
    }
  });

program
  .command('generate <type> <name>')
  .description('Generate code (controller, service, module, etc.)')
  .action(async (type, name) => {
    console.log(logo);
    console.log(colors.highlight(`Generating ${type}: ${name}\n`));

    try {
      const response = await axios.post(
        `${AI_AGENT_URL}/ai-agent/ollama/generate`,
        {
          type: type,
          name: name,
          specifications: `Create a complete NestJS ${type} named ${name} with all necessary files following the project structure.`,
        },
      );

      if (response.data.success) {
        console.log(
          colors.success(`${type} '${name}' generated successfully!`),
        );
        console.log('\n📁 Generated code:');
        console.log('─'.repeat(60));
        console.log(response.data.data);
        console.log('─'.repeat(60));
      } else {
        console.log(colors.error(`Generation failed: ${response.data.error}`));
      }
    } catch (error) {
      console.log(colors.error(`Error: ${error.message}`));
    }
  });

program.parse();
