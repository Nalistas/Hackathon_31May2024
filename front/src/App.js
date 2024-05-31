import './App.css';

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyButton />
      </header>
    </div>
  );
}

export default App;
