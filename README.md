# Deep Research Web UI

[English | [日本語](README_ja.md)]

## Overview

Enter research topic → AI generates queries → Web search & scraping → Mind map & markdown report

This is a web UI for [dzhng/deep-research](https://github.com/dzhng/deep-research) with multilingual support (English, Japanese, French) and Docker deployment focus.

## Features

- 🔍 **AI-Powered Research**: Automated research process with visual flow tracking
- 🌐 **Multi-language**: English, Japanese, French interface
- 🔒 **Privacy-focused**: All API requests from browser, no remote data storage
- ⚡ **Real-time**: Streaming responses with live updates
- 🌳 **Visual Research Flow**: Tree structure visualization of research process
- 📄 **Export Options**: Markdown and PDF export capabilities
- 🤖 **Multiple AI Providers**: OpenAI, SiliconFlow, DeepSeek, OpenRouter, Ollama
- 🔍 **Web Search Providers**: Tavily, Firecrawl, Google PSE

## Quick Start with Docker

### Option 1: Client Mode (Users configure their own API keys)

```bash
# Clone the repository
git clone https://github.com/tsubotan1985/deep-research-web-ui-jp
cd deep-research-web-ui-jp

# Build and run with Docker
docker build -t deep-research-web .
docker run -d --name deep-research-web -p 3000:3000 deep-research-web
```

Access at: http://localhost:3000

### Option 2: Server Mode (Pre-configured API keys)

1. **Create environment file:**
```bash
# Create .env file
cat > .env << EOF
NUXT_PUBLIC_SERVER_MODE=true
NUXT_AI_API_KEY=your-ai-api-key
NUXT_WEB_SEARCH_API_KEY=your-search-api-key
NUXT_PUBLIC_AI_PROVIDER=openai-compatible
NUXT_PUBLIC_AI_MODEL=gpt-4o-mini
NUXT_PUBLIC_WEB_SEARCH_PROVIDER=tavily
EOF
```

2. **Run with environment variables:**
```bash
# Option A: Using .env file
docker run -d --name deep-research-web -p 3000:3000 --env-file .env deep-research-web

# Option B: Using direct environment variables
docker run -d --name deep-research-web -p 3000:3000 \
  -e NUXT_PUBLIC_SERVER_MODE=true \
  -e NUXT_AI_API_KEY=your-ai-api-key \
  -e NUXT_WEB_SEARCH_API_KEY=your-search-api-key \
  -e NUXT_PUBLIC_AI_PROVIDER=openai-compatible \
  -e NUXT_PUBLIC_AI_MODEL=gpt-4o-mini \
  -e NUXT_PUBLIC_WEB_SEARCH_PROVIDER=tavily \
  deep-research-web
```

## Step-by-Step Docker Deployment Guide

### Prerequisites
- Docker installed on your system
- API keys for AI provider (OpenAI, etc.) and web search provider (Tavily, etc.)

### Step 1: Clone and Build

```bash
# 1. Clone the repository
git clone https://github.com/tsubotan1985/deep-research-web-ui-jp
cd deep-research-web-ui-jp

# 2. Build Docker image
docker build -t deep-research-web .
```

### Step 2: Choose Deployment Mode

**For personal use (Client Mode):**
```bash
# Users will configure API keys in the web interface
docker run -d --name deep-research-web -p 3000:3000 deep-research-web
```

**For team/organization use (Server Mode):**
```bash
# Create configuration file
cat > .env << EOF
# Server mode settings
NUXT_PUBLIC_SERVER_MODE=true

# AI Provider settings
NUXT_AI_API_KEY=sk-your-openai-api-key
NUXT_PUBLIC_AI_PROVIDER=openai-compatible
NUXT_PUBLIC_AI_MODEL=gpt-4o-mini
NUXT_PUBLIC_AI_CONTEXT_SIZE=128000

# Web Search settings
NUXT_WEB_SEARCH_API_KEY=your-tavily-api-key
NUXT_PUBLIC_WEB_SEARCH_PROVIDER=tavily
NUXT_PUBLIC_WEB_SEARCH_CONCURRENCY_LIMIT=2
NUXT_PUBLIC_WEB_SEARCH_SEARCH_LANGUAGE=en
EOF

# Run with configuration
docker run -d --name deep-research-web -p 3000:3000 --env-file .env deep-research-web
```

### Step 3: Access and Verify

1. Open browser and go to http://localhost:3000
2. Check language selector shows: English, 日本語, Français
3. Verify the simplified description is displayed
4. Test the research functionality

### Step 4: Container Management

```bash
# Check container status
docker ps

# View logs
docker logs deep-research-web

# Stop container
docker stop deep-research-web

# Start container
docker start deep-research-web

# Remove container
docker rm deep-research-web

# Remove image
docker rmi deep-research-web
```

## Environment Variables Reference

### Required for Server Mode
| Variable | Description | Example |
|----------|-------------|---------|
| `NUXT_PUBLIC_SERVER_MODE` | Enable server mode | `true` |
| `NUXT_AI_API_KEY` | AI provider API key | `sk-...` |
| `NUXT_WEB_SEARCH_API_KEY` | Search provider API key | `tvly-...` |

### Optional Configuration
| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `NUXT_PUBLIC_AI_PROVIDER` | AI provider | `openai-compatible` | `openai-compatible`, `siliconflow`, `deepseek` |
| `NUXT_PUBLIC_AI_MODEL` | AI model | `gpt-4o-mini` | Any supported model |
| `NUXT_PUBLIC_WEB_SEARCH_PROVIDER` | Search provider | `tavily` | `tavily`, `firecrawl`, `google-pse` |
| `NUXT_PUBLIC_WEB_SEARCH_SEARCH_LANGUAGE` | Search language | `en` | `en`, `ja`, `fr` |

## Troubleshooting

### Common Issues

**Container won't start:**
```bash
# Check Docker logs
docker logs deep-research-web

# Verify port is not in use
netstat -an | grep 3000
```

**API errors:**
- Verify API keys are correct
- Check API key permissions and quotas
- Ensure environment variables are properly set

**Language issues:**
- Clear browser cache
- Verify the rebuilt Docker image includes language fixes

### Getting Help

1. Check the container logs: `docker logs deep-research-web`
2. Verify environment variables: `docker exec deep-research-web env | grep NUXT`
3. Test API connectivity from within container

## Development

For development without Docker:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Recent Updates

25/07/24
- Added: Research history management - Export/import individual history records, delete all records

25/07/23
- Added: Server Mode - Deploy with environment variables, users don't need to configure API keys

25/02/22
- Updated: Language support changed to English, Japanese, French
- Updated: Simplified project description for better usability

## License

MIT License

