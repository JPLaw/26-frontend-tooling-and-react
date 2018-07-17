import React from 'react';
import ReactDom from 'react-dom';
import cowsay from 'cowsay-browser';
import Header from './components/header/header';
import './style/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      message: 'This is my default message on page load',
      first: '',
      second: '',
      firstItems: [],
      secondItems: [],
    };

    this.handleCounterDecrement = this.handleCounterDecrement.bind(this);
  }

  handleCounterIncrement = () => {
    this.setState((previousState) => {
      if (typeof previousState.counter === 'string') {
        previousState.counter = parseInt(previousState.counter, 10);
      }
      return {
        counter: previousState.counter + 1,
      };
    });
  }

  
  handleCounterDecrement() {
    this.setState((previousState) => {
      return {
        counter: previousState.counter - 1,
      };
    });
  }

  setCounter = (event) => {
    const { value } = event.target;

    this.setState({ counter: value });
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((previousState) => {
      const firstItems = previousState.firstItems.concat(this.state.first);
      const secondItems = previousState.secondItems.concat(this.state.second);
      return {
        firstItems,
        secondItems,
        first: '',
        second: '',
        message: this.getIntersection(firstItems, secondItems),
      };
    });
  }

  getIntersection = (firstItems, secondItems) => {
    const sameWords = [];
  
    for (let i = 0; i < firstItems.length; i++) {
      for (let j = 0; j < secondItems.length; j++) {
        if (firstItems[i] === secondItems[j]) sameWords.push(firstItems[i]);
      }
    }
    return sameWords.join(', ');
  };

  render() {
    return (
      <div className="cowsay">
        <Header></Header>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="first">Type something here.</label>
          <input 
            type="text"
            name="first"
            onChange={ this.handleInputChange }
            value={ this.state.first }
          />
          <label htmlFor="second">Type something here.</label>
          <input 
            type="text"
            name="second"
            onChange={ this.handleInputChange }
            value={ this.state.second }
          />
          <button type="submit">Submit Form</button>
        </form>
        <ul className="first-list">
            <h2>My First List</h2>
              {
                this.state.firstItems.map((item, index) => <li key={index}>{item}</li>)
              }
          </ul>
          <ul className="second-list">
            <h2>My Second List</h2>
            { 
              this.state.secondItems.map((item, index) => <li key={index}>{item}</li>)
            }
          </ul>
          <pre>
            {
              cowsay.say({
                text: this.state.message,
              })
            }
          </pre>
          <div className="counter">
            <h2>The current value of the counter is: { this.state.counter} </h2>
            <button onClick={ this.handleCounterIncrement}>Increment Counter!</button>
            <button onClick={ this.handleCounterDecrement}>Decrement Counter!</button>
            <input 
              type="number" onChange={ this.setCounter }
              value={ this.state.counter }
            />
        </div>
      </div>
    );
  }
}

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
ReactDom.render(<App />, rootNode);
