# --------------------------
# 1️⃣ Base image: Node.js with pnpm
# --------------------------
FROM node:20-alpine AS base

# Enable corepack (for pnpm)
RUN corepack enable

WORKDIR /app

# --------------------------
# 2️⃣ Dependencies layer
# --------------------------
FROM base AS deps

# Copy only package files for caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# --------------------------
# 3️⃣ Build layer
# --------------------------
FROM base AS builder

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Copy env file into container (build-time only)
# Make sure your .env.local exists in the project root
COPY .env .env

# Build the Next.js app
RUN pnpm build

# --------------------------
# 4️⃣ Production image
# --------------------------
FROM base AS runner

WORKDIR /app

# Set NODE_ENV for runtime
ENV NODE_ENV=production

# Copy build output & necessary files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy env file into runtime environment
COPY .env .env

# Expose Next.js default port
EXPOSE 3000

# Run the app
CMD ["pnpm", "start"]
