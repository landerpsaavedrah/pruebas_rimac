 
// src/utils/dbClient.ts
import { DynamoDB } from 'aws-sdk';

const dbClient = new DynamoDB.DocumentClient();

export default dbClient;
