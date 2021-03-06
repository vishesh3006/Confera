const exp = require("express");
const app = exp();
const Paper = require('./paper').Paper;
const Event = require('./event').Event;
const Attends = require('./attends').Attends;
const session = require('express-session')
const passport = require('./passport').passport
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extend:true}));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', __dirname);

app.use(exp.json())
app.use(exp.urlencoded({extended:true}))


app.use(session({
    secret : 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())
const reviewer = require('./routes/reviewer').route
const attendee = require('./routes/attendee').route
const reviewee = require('./routes/reviewee').route  
const event = require('./routes/event').route 

app.use('/reviewer',reviewer)
app.use('/attendee',attendee)
app.use('/reviewee',reviewee)  
app.use('/event',event)

app.use('/',exp.static(__dirname + '/public'));

app.use('/addEvent',exp.static(__dirname + '/public/addEvent.html'));
app.use('/submitPaper',exp.static(__dirname + '/public/submitPaper.html'));
app.use('/paperStatus',exp.static(__dirname + '/public/paperStatus.html'));
app.use('/papersAssigned',exp.static(__dirname + '/public/papersAssigned.html'));


// --------------------Login Logout handler ---------------------------------------------//
app.use('/login',exp.static(__dirname + '/public/login.html'));
app.use('/signupReviewer',exp.static(__dirname + '/public/signupReviewer.html'));
app.use('/signupReviewee',exp.static(__dirname + '/public/signupReviewee.html'));
app.use('/signupAttendee',exp.static(__dirname + '/public/signupAttendee.html'));
app.use('/revieweePage',exp.static(__dirname + '/public/revieweePage.html'));
app.use('/reviewerPage',exp.static(__dirname + '/public/reviewerPage.html'));
app.use('/attendeePage',exp.static(__dirname + '/public/attendeePage.html'));

// app.use('/')

app.post('/login',
    passport.authenticate('local',{failureRedirect:'/login'}),
    function(req,res){
        var userType = req.user.part
        var redirectTo = "/" + userType + "/" + userType + "Page"
        console.log(redirectTo)
        res.redirect(redirectTo)
    }
);

app.use('/logoutPrevSession',exp.static(__dirname + '/public/logout.html'));
app.get('/logout', function(req, res){
    req.logout();
    console.log("LOGOUT")
    res.redirect('/');   
});

// -------------------Creating localhost --------------------------------------------------//
app.listen(7891,()=>{
    console.log('Server Started!!');
});