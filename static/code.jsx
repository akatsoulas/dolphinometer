var Loader = React.createClass({
  getInitialState: function() {
    return {
      status: 'idle'
    }
  },
  setLoading: function() {
      this.setState({'status': 'loading'});
  },
  setIdle: function() {
      this.setState({'status': 'idle'});
  },
  render: function() {
    return (<h2 ref="status">Status: { this.state.status }</h2>);
  }
});

var Counter = React.createClass({
    getInitialState: function () {
        return {
            counterValue: 0
        };
    },
    componentDidMount: function() {
      this.interval = setInterval(this.updateServer, document.body.dataset.interval);
    },
    componentWillUnmount: function() {
      clearInterval(this.interval);
    },
    updateServer: function() {
        var self = this;
        var request = new XMLHttpRequest();
        request.open('POST', this.props.url);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.addEventListener(
          'load',
          function(evt) {
            var data = JSON.parse(evt.target.response);
            self.setState({counterValue: data.counter});
          }, false);
        request.addEventListener(
          'loadend',
          function(evt) {

          }, false);
        request.send('counter=' + this.state.counterValue);
    },
    doIncrease: function() {
        this.addItUp(1);
    },
    doDecrease: function() {
        this.addItUp(-1);
    },
    addItUp: function(value) {
        var counterValue = this.state.counterValue + value;
        if (counterValue >= 0) {
            this.setState({counterValue: counterValue});
        }
    },
    render: function () {
		return (
			<div className="counter">
                          <h1>{ this.state.counterValue }</h1>

                          <a onClick={ this.doIncrease }>
                            <i className="fa fa-plus-square fa-5x"></i>
                          </a>
                          <a onClick={ this.doDecrease }>
                            <i className="fa fa-minus-square fa-5x"></i>
                          </a>
                          <Loader />
			</div>
			);
   }
});

var url = '/update';
React.render(<Counter url={ url }/>, document.getElementById("count"));
