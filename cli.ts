#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';

const program = new Command();
const AI_AGENT_URL = 'http://localhost:3001';
const OLLAMA_URL = 'http://localhost:11434';

const colors = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  highlight: chalk.cyan,
  dim: chalk.dim,
};

const logo = `
${chalk.cyan('  ╔═══════════════════════════════════════╗')}
${chalk.cyan('  ║')}    ${chalk.white.bold('🤖 AI Agent CLI')}                  ${chalk.cyan('║')}
${chalk.cyan('  ║')}    ${chalk.dim('Powered by Ollama & NestJS')}      ${chalk.cyan('║')}
${chalk.cyan('  ╚═══════════════════════════════════════╝')}
`;

// Helper functions
async function checkConnection(url: string): Promise<boolean> {
  try {
    await axios.get(url, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

async function connectToOllama(): Promise<void> {
  try {
    console.log(colors.info('🔌 Connecting to Ollama...'));
    const response = await axios.post(
      `${AI_AGENT_URL}/ai-agent/ollama/connect`,
      {
        baseUrl: OLLAMA_URL,
        model: 'codellama:latest',
        timeout: 30000,
      },
    );

    if (response.data.success) {
      console.log(colors.success('✅ Successfully connected to Ollama!'));
    } else {
      console.log(colors.error(`❌ Failed to connect: ${response.data.error}`));
    }
  } catch (error: any) {
    console.log(colors.error(`❌ Connection error: ${error.message}`));
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
    console.log(colors.highlight('🚀 Setting up AI Agent...\n'));

    console.log(colors.info('1. Checking Ollama connection...'));
    const ollamaRunning = await checkConnection(`${OLLAMA_URL}/api/tags`);

    if (ollamaRunning) {
      console.log(colors.success('   ✅ Ollama is running'));
    } else {
      console.log(colors.error('   ❌ Ollama is not running'));
      console.log(colors.warning('   Please start Ollama first: ollama serve'));
      return;
    }

    console.log(colors.info('2. Checking AI Agent server...'));
    const agentRunning = await checkConnection(`${AI_AGENT_URL}/health`);

    if (agentRunning) {
      console.log(colors.success('   ✅ AI Agent server is running'));
    } else {
      console.log(colors.error('   ❌ AI Agent server is not running'));
      console.log(colors.warning('   Please start the server: yarn start:dev'));
      return;
    }

    console.log(colors.info('3. Connecting AI Agent to Ollama...'));
    await connectToOllama();

    console.log(colors.success('\n🎉 Setup complete!'));
  });

program
  .command('status')
  .description('Check AI Agent and Ollama status')
  .action(async () => {
    console.log(logo);
    console.log(colors.highlight('📊 System Status\n'));

    const ollamaStatus = await checkConnection(`${OLLAMA_URL}/api/tags`);
    console.log(
      `Ollama Server: ${ollamaStatus ? colors.success('✅ Running') : colors.error('❌ Not running')}`,
    );

    const agentStatus = await checkConnection(`${AI_AGENT_URL}/health`);
    console.log(
      `AI Agent Server: ${agentStatus ? colors.success('✅ Running') : colors.error('❌ Not running')}`,
    );
  });

program
  .command('test')
  .description('Test AI connection with a simple prompt')
  .action(async () => {
    console.log(logo);
    console.log(colors.highlight('🧪 Testing AI Agent...\n'));

    try {
      const response = await axios.post(
        `${AI_AGENT_URL}/ai-agent/ollama/connect`,
        {
          baseUrl: OLLAMA_URL,
          model: 'codellama:latest',
          timeout: 30000,
        },
      );

      if (response.data.success) {
        console.log(colors.success('✅ Connection test passed!'));
        console.log(colors.dim(`   Model: ${response.data.data.model}`));
        console.log(colors.info('\n🤖 AI Agent is ready to work!'));
      } else {
        console.log(
          colors.error(`❌ Connection test failed: ${response.data.error}`),
        );
      }
    } catch (error: any) {
      console.log(colors.error(`❌ Test failed: ${error.message}`));
    }
  });

program.parse();
