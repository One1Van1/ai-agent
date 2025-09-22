#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';

const program = new Command();

// Configuration
const AI_AGENT_URL = 'http://localhost:3001'; // Порт из .env
const OLLAMA_URL = 'http://localhost:11434';

// Color definitions
const colors = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  highlight: chalk.cyan,
  dim: chalk.dim,
};

// ASCII Art Logo
const logo = `
${chalk.cyan('  ╔═══════════════════════════════════════╗')}
${chalk.cyan('  ║')}    ${chalk.white.bold('🤖 AI Agent CLI')}                  ${chalk.cyan('║')}
${chalk.cyan('  ║')}    ${chalk.dim('Powered by Ollama & NestJS')}      ${chalk.cyan('║')}
${chalk.cyan('  ╚═══════════════════════════════════════╝')}
`;

// Helper functions
async function checkOllamaConnection(): Promise<boolean> {
  try {
    await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

async function checkAIAgentConnection(): Promise<boolean> {
  try {
    await axios.get(`${AI_AGENT_URL}/health`, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

async function sendTaskToAI(task: string): Promise<any> {
  try {
    const response = await axios.post(`${AI_AGENT_URL}/ai-agent/ollama/chat`, {
      prompt: task,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to send task to AI: ${error.message}`);
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
      console.log(colors.dim(`   Model: ${response.data.data.model}`));
    } else {
      console.log(colors.error(`❌ Failed to connect: ${response.data.error}`));
    }
  } catch (error: any) {
    console.log(colors.error(`❌ Connection error: ${error.message}`));
  }
}

// Main CLI setup
program
  .name('ai-agent')
  .description('AI Agent CLI for automating development tasks')
  .version('1.0.0');

// Setup command
program
  .command('setup')
  .description('Setup and test AI Agent connection')
  .action(async () => {
    console.log(logo);
    console.log(colors.highlight('🚀 Setting up AI Agent...\\n'));

    // Check Ollama
    console.log(colors.info('1. Checking Ollama connection...'));
    const ollamaRunning = await checkOllamaConnection();

    if (ollamaRunning) {
      console.log(colors.success('   ✅ Ollama is running'));
    } else {
      console.log(colors.error('   ❌ Ollama is not running'));
      console.log(colors.warning('   Please start Ollama first: ollama serve'));
      return;
    }

    // Check AI Agent server
    console.log(colors.info('2. Checking AI Agent server...'));
    const agentRunning = await checkAIAgentConnection();

    if (agentRunning) {
      console.log(colors.success('   ✅ AI Agent server is running'));
    } else {
      console.log(colors.error('   ❌ AI Agent server is not running'));
      console.log(colors.warning('   Please start the server: yarn start:dev'));
      return;
    }

    // Connect to Ollama through AI Agent
    console.log(colors.info('3. Connecting AI Agent to Ollama...'));
    await connectToOllama();

    console.log(
      colors.success(
        '\\n🎉 Setup complete! You can now use AI Agent commands.',
      ),
    );
    console.log(colors.dim('   Try: ai-agent analyze "Create a user module"'));
  });

// Analyze command
program
  .command('analyze <task>')
  .description('Analyze a development task')
  .action(async (task: string) => {
    console.log(logo);
    console.log(colors.highlight(`🤖 Analyzing task: "${task}"\n`));

    try {
      const spinner = setInterval(() => {
        process.stdout.write(colors.dim('.'));
      }, 500);

      const result = await sendTaskToAI(`
        Analyze this development task and provide a structured response:
        Task: ${task}
        
        Please provide:
        1. Task type (module, endpoint, feature, etc.)
        2. Complexity estimate (1-10)
        3. Required files to create
        4. Dependencies needed
        5. Step-by-step implementation plan
        
        Format as JSON.
      `);

      clearInterval(spinner);
      console.log('\n');

      if (result.success) {
        console.log(colors.success('✅ Analysis complete!\n'));
        console.log(colors.highlight('📋 Analysis Result:'));
        console.log(colors.dim(result.data));
      } else {
        console.log(colors.error(`❌ Analysis failed: ${result.error}`));
      }
    } catch (error: any) {
      console.log(colors.error(`❌ Error: ${error.message}`));
    }
  });

// Generate command
program
  .command('generate <type> <name>')
  .description('Generate code (controller, service, module, etc.)')
  .option('-p, --path <path>', 'Target path', './src')
  .action(async (type: string, name: string, options: any) => {
    console.log(logo);
    console.log(colors.highlight(`🛠️  Generating ${type}: ${name}\n`));

    try {
      const prompt = `
        Generate a NestJS ${type} named ${name}.
        Follow the project structure with separate folders for each endpoint.
        Create all necessary files: controller, service, dto, module, interface, spec.
        Use TypeScript and follow NestJS best practices.
        Include proper validation, Swagger documentation, and error handling.
        Target path: ${options.path}
      `;

      const result = await sendTaskToAI(prompt);

      if (result.success) {
        console.log(
          colors.success(`✅ ${type} '${name}' generated successfully!`),
        );
        console.log(colors.dim('\n📁 Generated files:'));
        console.log(colors.dim(result.data));
      } else {
        console.log(colors.error(`❌ Generation failed: ${result.error}`));
      }
    } catch (error: any) {
      console.log(colors.error(`❌ Error: ${error.message}`));
    }
  });

// Implement command
program
  .command('implement <description>')
  .description('Implement a complete feature from description')
  .action(async (description: string) => {
    console.log(logo);
    console.log(colors.highlight(`🚀 Implementing: "${description}"\n`));

    const confirmPrompt = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message:
          'This will create multiple files and modify your project. Continue?',
        default: false,
      },
    ]);

    if (!confirmPrompt.proceed) {
      console.log(colors.warning('⚠️  Implementation cancelled.'));
      return;
    }

    try {
      const prompt = `
        Implement this feature completely: ${description}
        
        Please:
        1. Analyze what needs to be built
        2. Create the complete file structure
        3. Generate all necessary code
        4. Follow the project's architecture (separate folders for each endpoint)
        5. Include tests, documentation, and proper error handling
        6. Use TypeScript, NestJS, and yarn for package management
        
        Provide step-by-step implementation with file contents.
      `;

      console.log(colors.info('🤖 AI is working on your implementation...'));
      const result = await sendTaskToAI(prompt);

      if (result.success) {
        console.log(colors.success('\n✅ Implementation complete!'));
        console.log(colors.highlight('\n📋 Implementation Details:'));
        console.log(result.data);

        console.log(colors.info('\n🚀 Next steps:'));
        console.log(colors.dim('   1. Review the generated code'));
        console.log(colors.dim('   2. Run tests: yarn test'));
        console.log(colors.dim('   3. Start server: yarn start:dev'));
      } else {
        console.log(colors.error(`❌ Implementation failed: ${result.error}`));
      }
    } catch (error: any) {
      console.log(colors.error(`❌ Error: ${error.message}`));
    }
  });

// Status command
program
  .command('status')
  .description('Check AI Agent and Ollama status')
  .action(async () => {
    console.log(logo);
    console.log(colors.highlight('📊 System Status\n'));

    // Check Ollama
    const ollamaStatus = await checkOllamaConnection();
    console.log(
      `Ollama Server: ${ollamaStatus ? colors.success('✅ Running') : colors.error('❌ Not running')}`,
    );

    // Check AI Agent
    const agentStatus = await checkAIAgentConnection();
    console.log(
      `AI Agent Server: ${agentStatus ? colors.success('✅ Running') : colors.error('❌ Not running')}`,
    );

    if (agentStatus) {
      try {
        const response = await axios.get(
          `${AI_AGENT_URL}/ai-agent/ollama/status`,
        );
        console.log(
          `Connection Status: ${response.data.isConnected ? colors.success('✅ Connected') : colors.warning('⚠️  Disconnected')}`,
        );
        console.log(colors.dim(`Model: ${response.data.model}`));
        console.log(colors.dim(`Base URL: ${response.data.baseUrl}`));
      } catch {
        console.log(`Connection Status: ${colors.error('❌ Unable to check')}`);
      }
    }
  });

// Help command enhancement
program
  .command('help-examples')
  .description('Show usage examples')
  .action(() => {
    console.log(logo);
    console.log(colors.highlight('📖 Usage Examples\n'));

    console.log(colors.info('🔧 Setup and Status:'));
    console.log(
      colors.dim(
        '   ai-agent setup                    # Initial setup and testing',
      ),
    );
    console.log(
      colors.dim('   ai-agent status                   # Check system status'),
    );

    console.log(colors.info('\n🔍 Analysis:'));
    console.log(colors.dim('   ai-agent analyze "Create user auth"'));
    console.log(colors.dim('   ai-agent analyze "Add payment system"'));

    console.log(colors.info('\n⚡ Code Generation:'));
    console.log(colors.dim('   ai-agent generate controller users'));
    console.log(colors.dim('   ai-agent generate service payment'));
    console.log(colors.dim('   ai-agent generate module auth'));

    console.log(colors.info('\n🚀 Full Implementation:'));
    console.log(
      colors.dim(
        '   ai-agent implement "Create REST API for products with CRUD operations"',
      ),
    );
    console.log(
      colors.dim(
        '   ai-agent implement "Add JWT authentication with login and register"',
      ),
    );

    console.log(colors.warning('\n⚠️  Requirements:'));
    console.log(colors.dim('   • Ollama installed and running (ollama serve)'));
    console.log(
      colors.dim('   • CodeLlama model downloaded (ollama pull codellama)'),
    );
    console.log(colors.dim('   • AI Agent server running (yarn start:dev)'));
  });

// Parse CLI arguments
program.parse();
