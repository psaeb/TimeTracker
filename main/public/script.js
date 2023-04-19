"use strict";
class TimeSpentForm extends React.Component {
    create(event) {
      event.preventDefault();
      let title = this.refs.titleNew.value;
      let spent = this.refs.spentNew.value;
      if (title && spent) {
        console.log('TimeSpentForm.Create --> this.props.createTimeSpent --> ' + title + '-' + spent);
        this.props.createTimeSpent({ title: title, spent: spent });
      }
      this.refs.titleNew.value = '';
      this.refs.spentNew.value = '';
    }

    resetTable() {
        localStorage.removeItem('timeSpentData');
      
        this.setState({
          timeSpent: []
        });
    }

    render() {
        return (
          React.createElement("form", { onSubmit: this.create.bind(this) },
            React.createElement("div", { className: "field is-horizontal is-grouped-multiline" },
              React.createElement("div", { className: "field-label is-normal" },
                React.createElement("label", { className: "label" }, "Title")),
              React.createElement("div", { className: "field-body" },
                React.createElement("div", { className: "field" },
                  React.createElement("input", { className: "input", name: "title", type: "text", ref: "titleNew", placeholder: "Title" })))),
            React.createElement("div", { className: "field is-horizontal is-grouped-multiline" },
              React.createElement("div", { className: "field-label is-normal" },
                React.createElement("label", { className: "label" }, "Time Spent (hr)")),
              React.createElement("div", { className: "field-body" },
                React.createElement("div", { className: "field" },
                  React.createElement("input", { className: "input", name: "spent", type: "number", min: "0", max: "100", ref: "spentNew", placeholder: "Time Spent" })))),
            React.createElement("div", { className: "field is-horizontal is-grouped-multiline" },
              React.createElement("div", { className: "field-label" }),
              React.createElement("div", { className: "field is-grouped" },
                React.createElement("div", { className: "control" },
                  React.createElement("input", { type: "submit", value: "Submit", className: "button is-info", style: { marginRight: '' } })),
                React.createElement("div", { className: "control" },
                  React.createElement("button", { onClick: this.resetTable.bind(this), className: "button is-danger", style: { marginRight: '99vh' } }, "Reset"))))));
      }
}

class TimeSpentList extends React.Component {
    render() {
        console.log('TimeSpentList.render()--> ' + this.props.timeSpent);
        let items = [];
        let sortedList = _.sortBy(this.props.timeSpent, function (e) { return e.spent; }, ['asc']);
        for (let index in sortedList) {
            const timeSpent = sortedList[index].spent;
            const hourText = timeSpent === 1 ? 'hour' : 'hours';
            const displayTimeSpent = `${timeSpent} ${hourText}`;
            items.push(React.createElement("tr", null,
                React.createElement("th", null, sortedList[index].title),
                React.createElement("th", null, displayTimeSpent)));
        }
        return (React.createElement("table", { className: "table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Title"),
                    React.createElement("th", null, "Time Spent"))),
            React.createElement("tbody", null, items)));
    }
}

class TimeTrackerApp extends React.Component {
    constructor() {
        super();
        this.state = {
            timeSpent: []
        };
    }
    createTimeSpent(data) {
        const hours = Number(data.spent);
        const hourText = hours === 1 ? 'hour' : 'hours';
      
        const existingTimeSpentData = JSON.parse(localStorage.getItem('timeSpentData')) || [];
      
        const updatedTimeSpentData = [
          ...existingTimeSpentData,
          {
            title: data.title,
            spent: hours
          }
        ];
      
        localStorage.setItem('timeSpentData', JSON.stringify(updatedTimeSpentData));
      
        this.setState({
          timeSpent: updatedTimeSpentData
        });
      }
    
    render() {
        return (React.createElement("div", null,
        React.createElement(TimeSpentForm, { createTimeSpent: this.createTimeSpent.bind(this) }),
        React.createElement(TimeSpentList, { timeSpent: this.state.timeSpent })));
    }
}
ReactDOM.render(React.createElement(TimeTrackerApp, null), document.getElementById('root'));