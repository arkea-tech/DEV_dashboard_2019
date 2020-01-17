import React, { Component } from 'react';

// Add in styles
import '../styles/App.css';
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
// import NumberWidgetContainer from '../components/NumberWidgetContainer';
// import ListWidgetContainer from '../components/ListWidgetContainer';
// import GraphWidgetContainer from '../components/GraphWidgetContainer';
import WeekContainer from './WeekContainer';
import GridLayout from 'react-grid-layout';

class App extends Component {
    render() {
        const layout = [
            {i: 'b', x: 0, y: 0, w: 1, h: 2},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ];

        return (
        <div className="App">
          <GridLayout className="layout" layout={layout}>
            <div key="c"><WeekContainer/></div>
            <div key="b"><WeekContainer/></div>
          </GridLayout>
        </div>
        );
    }
}
// <ListWidgetContainer href="http://localhost:3001/stats/top" heading="Top Ticket Answerers" rowspan={3} />
// <NumberWidgetContainer href="http://localhost:3001/tickets/open" heading="Open Ticket Total" />
// <GraphWidgetContainer href="http://localhost:3001/tickets/progression" heading="Tickets Over Time" colspan={2} rowspan={2} />
// <NumberWidgetContainer href="http://localhost:3001/tickets/today" heading="Tickets Opened Today" />
// <NumberWidgetContainer href="http://localhost:3001/tickets/urgent" heading="Tickets Marked 'Urgent'" />
// <NumberWidgetContainer href="http://localhost:3001/stats/response" heading="4 Hour Response %" />
// <NumberWidgetContainer href="http://localhost:3001/stats/solved" heading="7 Day Solved %" />

export default App;
