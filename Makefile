lint: # проверка линтёром
		npx eslint .
test: # запуск тестирования
		NODE_OPTIONS=--experimental-vm-modules npx jest