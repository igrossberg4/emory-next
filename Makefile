
## help	:	Print commands help.
.PHONY: help
help :
	@sed -n 's/^##//p' Makefile


## dev	:	Run dev contanier for local development
.PHONY: dev
dev:
	docker-compose up --build -d next_dev
	docker-compose exec -T next_dev npm install
	@echo -e "\n\nDevelopment: http://localhost:3000 (wait some seconds)\n"

## prod	:	Run prod contanier with the prod release of current code
.PHONY: prod
prod:
	docker-compose up --build -d next_prod
	docker-compose exec -T next_prod npm install
	docker-compose exec -T next_prod npm run build
	@echo -e "\n\nProduction: http://localhost:8080\n"
	@echo -e "\Code is generated on ./out folder:\n"

## artifact	:	Creates and commits an artifact from the last prod code available
.PHONY: artifact
artifact:
	docker-compose run -T next_prod npm install
	docker-compose run  -T next_prod npm run build
	scripts/deliver_artifact.sh

