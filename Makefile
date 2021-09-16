setup:
	docker-compose up --build -d next_dev
	docker-compose exec -T next_dev npm install
	@echo -e "\n\nDevelopment: http://localhost:3000 (wait some seconds)\n"

build:
	docker-compose up --build -d next_prod
	docker-compose exec -T next_prod npm install
	docker-compose exec -T next_prod npm run build
	@echo -e "\n\nProduction: http://localhost:8080\n"
	@echo -e "\nArtifact is generated on ./out folder:\n"

artifact:
