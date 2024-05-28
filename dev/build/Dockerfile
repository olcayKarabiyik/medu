# ====================
# --- Build Assets ---
# ====================
FROM node:18-alpine AS assets

RUN apk add yarn g++ make cmake python3 --no-cache

RUN mkdir -p /medu

COPY client medu/client
COPY dev medu/dev
COPY patches medu/patches
COPY package.json medu/package.json
COPY .babelrc medu/.babelrc
COPY .eslintignore medu/.eslintignore
COPY .eslintrc.yml medu/.eslintrc.yml

RUN yarn cache clean
RUN yarn --frozen-lockfile --non-interactive
RUN yarn build
RUN rm -rf /medu/node_modules
RUN yarn --production --frozen-lockfile --non-interactive
RUN yarn patch-package

# ===============
# --- Release ---
# ===============
FROM node:18-alpine
LABEL maintainer="requarks.io"

RUN apk add bash curl git openssh gnupg --no-cache && \
    mkdir -p /logs && \
    mkdir -p /medu/data/content && \
    chown -R node:node /medu /logs

WORKDIR /medu

COPY --chown=node:node --from=assets /medu/assets ./assets
COPY --chown=node:node --from=assets /medu/node_modules ./node_modules
COPY --chown=node:node ./server ./server
COPY --chown=node:node --from=assets /medu/server/views ./server/views
COPY --chown=node:node ./dev/build/config.yml ./config.yml
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./LICENSE ./LICENSE

USER node

VOLUME ["/medu/data/content"]

EXPOSE 3000
EXPOSE 3443

# HEALTHCHECK --interval=30s --timeout=30s --start-period=30s --retries=3 CMD curl -f http://localhost:3000/healthz

CMD ["node", "server"]
