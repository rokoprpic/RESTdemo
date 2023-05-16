const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuidv(),
        username: 'A',
        comment: 'aaa'
    },
    {
        id: uuidv(),
        username: 'B',
        comment: 'bbb'
    },
    {
        id: uuidv(),
        username: 'C',
        comment: 'ccc'
    }
];

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/comments',(req, res) => {
    res.render('index', {comments});
});

app.get('/comments/new', (req, res) => {
    res.render('new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({username, comment, id: uuidv()});
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('show', {comment});
});

app.patch('/comments/:id', (req,res) => {
    const {id} = req.params;
    const patchComment = req.body.comment;
    const comment = comments.find(c => c.id === id);
    comment.comment = patchComment;
    res.redirect('/comments');
});

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('edit', {comment});
});

app.delete('/comments/:id',(req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.listen(3000, () => {
    console.log("PORT 3000");
});


/*
GET /comments = list all comments
POST /comments = create new comment
GET /comments/:id = get one commnet (by ID)
PATCH /comments/:id = update comment
DELETE /comments/:id = delete comment
*/