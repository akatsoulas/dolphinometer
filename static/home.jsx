var Counter = React.createClass({
    getInitialState: function () {
        return {
            counterValue: -1
        };
    },
    componentDidMount: function() {
        this.update();
        this.interval = setInterval(this.update, 5000);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    update: function() {
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', this.props.url);
        request.addEventListener(
            'load',
            function(evt) {
                try {
                    var data = JSON.parse(evt.target.response);
                    self.setState({counterValue: data.counter});
                }
                catch(e) {
                    // It's OK, we will try again soon.
                }
            }, false);
        request.send();
    },
    render: function() {
        if (this.state.counterValue === -1) {
            return (<h1><i className="fa fa-spinner fa-pulse"></i></h1>);
        }
        else {
            return (<h1>{ this.state.counterValue }</h1>);
        }
    }
});
var url = '/update';
React.render(<Counter url={ url } />, document.getElementById("counter"))
