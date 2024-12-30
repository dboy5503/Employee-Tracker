import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

