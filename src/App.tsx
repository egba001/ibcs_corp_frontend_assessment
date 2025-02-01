import Table from "./components/Table"

function App() {


  return (
      <div className="flex w-full items-center justify-center">
          <div className="pt-6 w-full container px-10 mx-auto">
              <div className="flex justify-between items-center mb-5 w-full">
                  <h1 className="font-bold text-2xl mb-3">List of users</h1>
                  
              </div>

              <Table />
          </div>
      </div>
  );
}

export default App
