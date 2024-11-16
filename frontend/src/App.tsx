function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Header</h1>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-100 w-64 p-4 hidden sm:block">
          <nav>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Link 1</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Link 2</a></li>
              <li><a href="#" className="text-gray-800 hover:text-blue-500">Link 3</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Main Content</h2>
          <p>
            Main content
          </p>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-4 px-6">
        <p className="text-center">© 2024 Made with love - Marwane Bidamou</p>
      </footer>
    </div>
  );
}

export default App;
