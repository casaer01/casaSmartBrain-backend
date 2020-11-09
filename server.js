import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';

const app = express();

app.use(bodyParser.json());

const database = {
    users:[
        {
            id: '123',
            name: 'john',
            email: 'john@email.com',
            password: 'cookies',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '143',
            name: 'Sal',
            email: 'Sal@email.com',
            password: 'Banana',
            entries: 0,
            joined: new Date(),
        }
    ],
    login:[
        {
            id: 987,
            has:'',
            email:'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {

    // Load hash from your password DB.
    bcrypt.compare("bacon", hash, function(err, res) {
        // res == true
    });
    bcrypt.compare("veggies", hash, function(err, res) {
        // res = false
    });


    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json("success");
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req,res) => {  
    const { email, name, password} = req.body;
    bcrypt.hash("bacon", null, null, function(err, hash) {
        // Store hash in your password DB.
    });

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    const found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user);
        }
    })

    if(!found) {
        res.status(400).json('user not found');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    const found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            users.entries++
            return res.json(user.entries);
        }
    })

    if(!found) {
        res.status(400).json('user not found');
    }
})




app.listen(3000, () => {
    console.log('app is running');
})