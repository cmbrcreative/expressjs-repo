APP ?= 'server'

.PHONY: up restart down build logs shell yarn

up:
	docker-compose up -d --force-recreate

restart:
	docker-compose restart $(APP)

down:
	docker-compose down

build:
	docker-compose build

logs:
	@docker-compose logs -f $(filter-out $@,$(MAKECMDGOALS))

shell:
	@docker-compose exec $(APP) bash

yarn:
	@docker-compose exec $(APP) yarn $(filter-out $@,$(MAKECMDGOALS))

# https://stackoverflow.com/a/6273809/1826109
%:
	@: