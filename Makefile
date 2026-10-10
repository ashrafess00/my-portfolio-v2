COMPOSE := docker compose

.DEFAULT_GOAL := help
.PHONY: help env build up down restart logs ps deploy shell prune

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

env: ## Create .env from .env.example if it doesn't exist
	@test -f .env || (cp .env.example .env && echo "Created .env - fill in the values")

build: env ## Build the image
	$(COMPOSE) build

up: env ## Build (if needed) and start in the background
	$(COMPOSE) up -d --build

down: ## Stop and remove the container
	$(COMPOSE) down

restart: ## Restart the container without rebuilding
	$(COMPOSE) restart

logs: ## Follow the app logs
	$(COMPOSE) logs -f --tail=100

ps: ## Show container status / health
	$(COMPOSE) ps

deploy: env ## Pull latest code, rebuild and restart, clean old images
	git pull --ff-only
	$(COMPOSE) up -d --build
	docker image prune -f

shell: ## Open a shell inside the running container
	$(COMPOSE) exec portfolio sh

prune: ## Remove dangling images and build cache
	docker image prune -f
	docker builder prune -f
