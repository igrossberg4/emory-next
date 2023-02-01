
## help:    Prints this makefile's help messages.
##
.PHONY: help
help :
	@sed -n 's/^##//p' Makefile


## dev:     Provision docker container for local development. Internally this
##          executes `npm run dev` to watch your filesystem for changes and
##          auto-reload the browser at http://localhost:3000/.
##
.PHONY: dev
dev:
	docker-compose stop next_dev
	docker-compose up --build -d next_dev
	docker-compose exec -T next_dev npm install
	@echo "\n\n\n---> Development: http://localhost:3000 <---"
	@echo "\n---> NOTE: Please allow several seconds on initial page load for Next.js to finish dev compilation. <---"
	docker-compose exec -T next_dev npm run dev


## build:   Create a production build and serve it in static HTTP server at
##          http://localhost:8000/. NOTE: Unlike the dev endpoint, this
##          production build task does not monitor for code changes; you must
##          manually run this command after every code change to see changes
##          reflected in the browser.
##
.PHONY: build
build:
	docker-compose up --build -d next_prod
	docker-compose exec -T next_prod npm install
	docker-compose exec -T next_prod npm run build
	@echo "\n\n\n---> Production: http://localhost:8080 <---"
	@echo "\n---> Code is generated on ./out folder <---"
	@echo "\n---> WARNING: This command breaks the development build, run 'make dev' to have it running properly again. <---"


## staging:  Provision docker container for staging. Internally this
##           executes `npm run dev` to watch your filesystem for changes and
##           auto-reload the browser at http://localhost:3000/.
##
.PHONY: staging
staging:
	docker-compose stop next_staging
	docker-compose up --build -d next_staging
	docker-compose exec -T next_staging npm install
	@echo "\n\n\n---> Development: http://localhost:3000 <---"
	@echo "\n---> NOTE: Please allow several seconds on initial page load for Next.js to finish dev compilation. <---"
	docker-compose exec -T next_staging npm run dev


## release: Bumps the package version and creates a release.
##
.PHONY: release
release:
	./scripts/create-release.sh

## stop:    Stop running containers.
##
.PHONY: stop
stop:
	docker-compose stop
