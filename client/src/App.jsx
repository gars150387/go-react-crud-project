import axios from 'axios';

function App() {
  const handleButtonClick = () => {
    axios.get('http://localhost:3000/users').then((response) => {
      console.log(response.data);
    });
  };
  return (
    <>
      <h1>Hello Vite!</h1>
      <button onClick={() => handleButtonClick()}>Click me</button>
    </>
  );
}

export default App;
