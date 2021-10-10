
## help:    Prints this makefile's help messages.
##
.PHONY: help
help :
	@sed -n 's/^##//p' Makefile


## install: Provision docker container for local development.
##          Internally this executes `npm run dev` to watch your
##          filesystem for changes and auto-reload the browser.
##
.PHONY: install
install:
	docker-compose stop next_dev
	docker-compose up --build -d next_dev
	docker-compose exec -T next_dev npm install
	docker-compose exec -d -T next_dev npm run dev
	@echo "\n\n\n---> Development: http://localhost:3000 <---"
	@echo "\n---> NOTE: Please allow several seconds on initial page load for Next.js to finish dev compilation. <---"


## build:   Provision docker contanier and create a production build.
##          NOTE: Unlike the dev container, the production build is not
##          automatically updated when code is changed; you must run this
##          command again to update it.
##
.PHONY: build
build:
	docker-compose up --build -d next_prod
	docker-compose exec -T next_prod npm install
	docker-compose exec -T next_prod npm run build
	@echo "\n\n\n---> Production: http://localhost:8080 <---"
	@echo "\n---> Code is generated on ./out folder <---"
	@echo "\n---> WARNING: This command breaks the development build, run 'make install' to have it running properly again. <---"


# ## release: Bumps the package version and creates a release.
# ##
# .PHONY: release
# release:
#   git

## stop:    Stop running containers.
##
.PHONY: stop
stop:
	docker-compose stop
