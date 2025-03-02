import axios from 'axios';

function App() {
  const handleButtonClick = () => {
    axios.get('https://go-react-crud-app-29a97a0eb165.herokuapp.com/users').then((response) => {
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
