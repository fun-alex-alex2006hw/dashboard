import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Card list</h1>
        <h2>
          Total:
          { this.props.cards.total }
        </h2>
        <h2>
          Uncompleted:
          { this.props.cards.edges.filter(edge => edge.node.status == 'backlog').length }
        </h2>

        <ul>
          {this.props.cards.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.title} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

const cardFragment = Relay.QL`
  fragment on Card {
    id,
    title,
    description,
    status,
  }
`

export default Relay.createContainer(App, {
  fragments: {
    cards: () => Relay.QL`
      fragment on CardConnection {
        edges {
          node {
            ${cardFragment}
          }
        },
        total,
      }
    `,
  },
});
