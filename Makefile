
## help	:	Print commands help.
.PHONY: help
help :
	@sed -n 's/^##//p' Makefile


## setup	:	Preparees an run dev contanier for local development
.PHONY: setup
setup:
	docker-compose stop next_dev
	docker-compose up --build -d next_dev
	docker-compose exec -T next_dev npm install
	docker-compose exec -d -T next_dev npm run dev
	@echo "\n\nDevelopment: http://localhost:3000 (it may need almost several seconds until Next.js compiles and returns data the first time)\n"


## setup-prod	:	Run prod contanier with the prod release of current code. WARNING! Site is not updated when code is updated, you need to run this command again to update it.
.PHONY: setup-prod
setup-prod:
	docker-compose up --build -d next_prod
	docker-compose exec -T next_prod npm install
	docker-compose exec -T next_prod npm run build
	@echo "\n\n\n---> Production: http://localhost:8080 <---"
	@echo "\n---> Code is generated on ./out folder <---"
	@echo "\n---> WARNING: This command breaks the development build, run 'make setup' to have it running properly again <---"



## stop	:	Stop running containers
.PHONY: stop
stop:
	docker-compose stop


## artifact	:	Creates and commits an artifact from the last prod code available
.PHONY: artifact
artifact:
	docker-compose run -T next_prod npm install
	docker-compose run -T next_prod npm run build
	scripts/deliver_artifact.sh

