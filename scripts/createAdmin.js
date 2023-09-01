import * as readline from 'readline';
import express from 'express';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { start } from '../server.js';
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Users from '../models/User.js';
import connectDB from '../db/connect.js'
async function ask(question) {
    return new Promise((resolve) => {
        const reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        reader.question(question, (answer) => {
            reader.close();
            resolve(answer);
        });
    });
}


async function createSuperAdmin() {
    const app = express()
    dotenv.config()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    const port = process.env.PORT || 5000
    if ((process.env.NODE_ENV = !'production')) {
        app.use(morgan('dev'))
    }
    try {
        console.log(process.env.MONGO_URL)
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }

    const name = await ask('Name: ');

    const email = await ask('Email: ');
    let password = await ask('pasword: ')
    password = await bcrypt.hash(password, 10);
    const admin = new Users({
        name,
        password,
        email,
    });

    console.log(admin);

    const isSure = await ask('Are you sure, if Not (CTLR + C)');
    await admin.save();
}

createSuperAdmin();