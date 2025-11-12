# --------------------------
# 1️⃣ Base image
# --------------------------
FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /app

# --------------------------
# 2️⃣ Dependencies
# --------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# --------------------------
# 3️⃣ Build stage
# --------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Important: use NODE_ENV=development for build
# (so Next.js can access devDependencies like webpack/typescript)
ENV NODE_ENV=development

RUN pnpm build

# --------------------------
# 4️⃣ Runtime stage
# --------------------------
FROM base AS runner
WORKDIR /app

# Runtime env
ENV NODE_ENV=production

# Copy only what's needed to run
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
