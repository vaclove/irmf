# Stage 1: Install dependencies and build the Next.js application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install bun
RUN apk add --no-cache bash curl && curl -fsSL https://bun.sh/install | bash

ENV BUN_INSTALL="/root/.bun"
ENV PATH="/root/.bun/bin:$PATH"

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN bun run build

# Stage 2: Serve the Next.js application
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables for Next.js production
ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the Next.js application
CMD ["node", "node_modules/.bin/next", "start"]
