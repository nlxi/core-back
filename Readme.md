# Base stack from web development
[![Node.js CI](https://github.com/nlxi/core-back/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/nlxi/core-back/actions/workflows/node.js.yml)


## Usage

### Запуск
```
# install deps
npm i 
# run all workspaces
npm run start
```

### typeorm

```
./runIn.sh typeorm migration:show
```

При генерации миграции указавать путь до папки миграций `src/migration` (текущий баг typeorm)
```
./runIn.sh typeorm migration:generate src/migration/demo
```

При первом запуске модет потребоваться сборка
```
./runIn.sh build
```

