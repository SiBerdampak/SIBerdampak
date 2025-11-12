# Use the official Node.js 20 image
FROM node:20-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only the lockfile and package file first (for caching)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN pnpm build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy node_modules and built files from the builder
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

# Coolify will automatically inject your environment variables
# (You do NOT need to copy .env.local)
# You can still define defaults here if you want:
# ENV NEXT_PUBLIC_SUPABASE_URL=""
# ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=""

EXPOSE 3000

# Start Next.js
CMD ["pnpm", "start"]
