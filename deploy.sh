zip -r deploy.zip ./
aws lambda update-function-code --function-name lambda-secret --zip-file fileb://deploy.zip