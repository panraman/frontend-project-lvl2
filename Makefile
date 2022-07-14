lint: # проверка линтёром
		npx eslint .
test: # запуск тестирования
		NODE_OPTIONS=--experimental-vm-modules npx jest
install: # установка npm ci
		npm ci
test-coverage: # запуск теста на покрытие
	npm test -- --coverage --coverageProvider=v8