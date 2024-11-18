import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Navbar";
import Main from "./components/Layout/MainContent";

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 mt-14">

        {/* Main Content */}
        <Main title="Policies">
          <div className="w-full">

          </div>
        </Main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
