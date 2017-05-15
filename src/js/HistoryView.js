import React from 'react';

function HistoryView(props) {
  const moves = props.history.map((step, id) => (
    <li key={step.text}>
      <a href="#" className="history-btn" onClick={() => props.onClick(id)}>{step.text}</a>
    </li>
  ));

  return (
    <ol className="history-list">{moves}</ol>
  );
}


export default HistoryView;
