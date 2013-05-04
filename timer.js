function Timer() {
    var start_time = 0;
    var interval_runner = 0;
    var running_time = 0;
    var listeners = [];

    this.start = function() {
        if (!interval_runner) {
            start_time = (new Date()).getTime();
            interval_runner = setInterval(do_update, 100);
        }
    };

    this.stop = function() {
        clear_runner();
        do_update();
        return running_time;
    };

    this.reset = function() {
        start_time = running_time = 0;
        clear_runner();
        run_listeners();
    }

    this.update = function(listener) {
        listeners.push(listener);
    };

    function clear_runner() {
        if (interval_runner) {
            clearInterval(interval_runner);
            interval_runner = 0;
        }
    }
    function do_update() {
        var current_time = (new Date()).getTime();
        var new_running_time = Math.floor((current_time - start_time)/1000);
        if (new_running_time != running_time) {
            running_time = new_running_time;
            run_listeners();
        }
    }
    function run_listeners() {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](running_time);
        }
    }
}
