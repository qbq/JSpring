global.Hello = function() {
    var execute = function() {
        return 'Hello world!';
    }
    return {
        execute: execute
    }
}

global.Say = function() {
    return {
        execute: function() {
            console.log(this.hello());
            //console.log(this.world());
        }
    }
}

var pool = {};
var config = {
    hello: {
        className: 'Hello'
    },
    
    say: {
        className: 'Say',
        //depends: ['hello', 'world']
        depends: ['hello']
    }
}

for (var key in config) {
    var instanse = new global[config[key]['className']]();
    var depends = config[key]['depends'];
    for ( var index in depends ) {
        var dk = depends[index];
        !pool[ dk ] && console.log('Not defined: ' + dk);
        instanse[ dk ] = pool[ dk ] && pool[ dk ].execute || function() {console.log('Not defined: ' + dk);};
    }
    pool[key] = instanse;
    //console.log(pool[key]);
}

pool.say.execute();
