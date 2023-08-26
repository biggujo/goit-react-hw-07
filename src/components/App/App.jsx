import React, { Component } from 'react';
import { Wrapper } from './App.styled';
import Contact from '../Contact/Contact';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  render() {
    return (<>
      <Wrapper>
        <ul>
          <li>
            <Contact fullName='John Jackson' />
          </li>
        </ul>
      </Wrapper>

      <GlobalStyles />
    </>);
  }
}

export default App;
