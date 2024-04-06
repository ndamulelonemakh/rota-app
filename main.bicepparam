using 'main.bicep'

param name = 'rota-app-beta02'
param location = 'westeurope'
param repositoryUrl = 'https://github.com/ndamulelonemakh/rota-app.git'
param repositoryToken = readEnvironmentVariable('GITHUB_PAT')
param branch = 'main'
param appLocation = '/site/public'
param apiLocation = '/api'
param outputLocation = '/site/public'
