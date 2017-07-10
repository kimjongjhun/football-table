module.exports = function(app){

    app.get('/api/teams/get', function(req, res){
        res.json({dummy:'data'});
    });

    app.get('/api/teams/somethingelse', function(req, res){
        res.json({dummy:'data'});
    });

    app.post('/api/teams/somethingelse', function(req, res){
        res.json({dummy:'data'});
    });

};