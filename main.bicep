@description('The name of the static site.')
@maxLength(64)
@minLength(3)
param name string

@description('The Azure region where the static site will be deployed.')
param location string = resourceGroup().location

@description('The pricing tier of the static site.')
@allowed([
  'Free'
  'Standard'
])
param tier string = 'Free'

@description('The specific SKU code for the static site.')
@allowed([
  'Free'
  'Standard'
])
param skuCode string = 'Free'

@description('The URL of the repository containing the site content.')
param repositoryUrl string

@description('The name of the Gith branch to use for deployment.')
param branch string = 'main'

@description('The token for accessing the repository. Should be secure.')
@secure()
param repositoryToken string

@description('The location within the repo where the app code exists.')
param appLocation string

@description('The location within the repo where the API code exists.')
param apiLocation string

@description('The location within the repo where the build output is located.')
param outputLocation string

@description('Tags to assign to the resource.')
param resourceTags object = {
  Environment: 'Development'
  Project: 'Rota roster generator MVP'
  ApplicationName: 'Rota App(preview)'
}

resource swa 'Microsoft.Web/staticSites@2022-09-01' = {
  name: name
  location: location
  tags: resourceTags
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    repositoryToken: repositoryToken
    buildProperties: {
      appLocation: appLocation
      apiLocation: apiLocation
      outputLocation: outputLocation
    }
  }
  sku: {
    tier: tier
    name: skuCode
  }
}

resource config 'Microsoft.Web/staticSites/config@2020-10-01' = {
  name: 'functionappsettings'
  parent: swa
  properties: {
    DEBUG: '0'
    SHIFT_SPAN_IN_HOURS: '24'
    apiRuntime: 'Python:3.10'
    FUNCTIONS_WORKER_RUNTIME: 'python'
    AzureWebJobsFeatureFlags: 'EnableWorkerIndexing'
  }
}
