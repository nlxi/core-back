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

### loki

- open [http://localhost:8093/](http://localhost:8093/)
- `admin/admin` are credentials. Change the password on next stage or keep the same
- open [Data sources](http://localhost:8093/datasources/new?utm_source=grafana_gettingstarted)
- choose `Loki`
- set URL `http://loki:3100`
- click `Save & test`
- make a query e.g. `{level="info"} | json | context="GraphQLModule"`
