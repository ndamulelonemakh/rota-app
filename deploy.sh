#!/bin/bash
set -e
# Convenience script to manually deploy the app to Azure Static Web App from a Bicep template file
here=$(pwd)
cd site
npm run build-prod
cd $here


if [ -z "$RG" ]; then
    echo "Resource Group is invalid. Got: $RG"
    exit 1
fi

if [ -z "$LOCATION" ]; then
    echo "Location is invalid. Got: $LOCATION"
    exit 1
fi

if [ -z "$GITHUB_PAT" ]; then
    echo "GitHub PAT is invalid. Got: $GITHUB_PAT"
    exit 1
fi


az group create --name $RG --location $LOCATION --verbose -o yamlc
az deployment group create --name rot-app-release-v3 \
    --resource-group $RG \
    --template-file ./main.bicep \
    --parameters ./main.bicepparam \
    --parameters repositoryToken=$GITHUB_PAT \
    --confirm-with-what-if --output yamlc
