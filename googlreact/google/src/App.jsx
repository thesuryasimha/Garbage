import React, { useState } from 'react';
import { Search, Mic, Camera, Grid, User } from 'lucide-react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    try {
      setIsSearching(true);
      const response = await axios.get(`http://localhost:5000/search/${searchTerm}`);
      setResults(response.data.results);
      setError('');
    } catch (err) {
      setResults(null);
      setError('No results found. Try searching for: react, angular, nodejs, mongodb, express, or javascript');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-end items-center p-4 space-x-4">
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-[13px] text-[#202124] hover:underline">Gmail</a>
          <a href="#" className="text-[13px] text-[#202124] hover:underline">Images</a>
          <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Google apps">
            <Grid className="w-5 h-5 text-[#5f6368]" />
          </button>
          <button className="ml-2 px-6 py-2 bg-[#1a73e8] text-white text-[14px] font-medium rounded hover:bg-[#1557b0] hover:shadow-md transition-all">
            Sign in
          </button>
        </nav>
      </header>

      <main className={`flex-grow flex flex-col ${isSearching ? 'items-start' : 'items-center'} px-4`}>
        {!isSearching ? (
          // Home page layout
          <>
            <div className="mt-[92px] mb-8">
              <img 
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                alt="Google"
                className="h-[92px] w-[272px]"
              />
            </div>
            
            <div className="w-full max-w-[584px]">
              <form onSubmit={handleSearch}>
                <div className="mb-8 relative">
                  <div className="flex items-center w-full bg-white h-[46px] rounded-full border border-[#dfe1e5] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:border-[rgba(223,225,229,0)] focus-within:shadow-[0_1px_6px_rgba(32,33,36,0.28)] focus-within:border-[rgba(223,225,229,0)]">
                    <Search className="ml-4 w-5 h-5 text-[#9aa0a6]" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-grow mx-4 text-[#202124] text-base outline-none"
                      autoFocus
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <span className="text-[#70757a] text-xl">×</span>
                      </button>
                    )}
                    <div className="flex items-center space-x-2 mr-4">
                      <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                        <Mic className="w-5 h-5 text-[#4285f4]" />
                      </button>
                      <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                        <Camera className="w-5 h-5 text-[#4285f4]" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <button
                    type="submit"
                    className="h-9 px-4 bg-[#f8f9fa] text-[14px] text-[#3c4043] rounded hover:shadow-[0_1px_1px_rgba(0,0,0,.1)] hover:border-[#dadce0] border border-transparent"
                  >
                    Google Search
                  </button>
                  <button
                    type="button"
                    className="h-9 px-4 bg-[#f8f9fa] text-[14px] text-[#3c4043] rounded hover:shadow-[0_1px_1px_rgba(0,0,0,.1)] hover:border-[#dadce0] border border-transparent"
                  >
                    I'm Feeling Lucky
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          // Search results layout
          <div className="w-full">
            <div className="border-b border-[#ebebeb] pb-4">
              <div className="flex items-center px-4 pt-4">
                <a href="/" onClick={() => setIsSearching(false)} className="mr-8">
                  <img 
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                    alt="Google"
                    className="h-[30px] w-auto"
                  />
                </a>
                <form onSubmit={handleSearch} className="flex-grow max-w-[692px]">
                  <div className="relative">
                    <div className="flex items-center w-full bg-white h-[46px] rounded-full border border-[#dfe1e5] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:border-[rgba(223,225,229,0)] focus-within:shadow-[0_1px_6px_rgba(32,33,36,0.28)] focus-within:border-[rgba(223,225,229,0)]">
                      <Search className="ml-4 w-5 h-5 text-[#9aa0a6]" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow mx-4 text-[#202124] text-base outline-none"
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={() => setSearchTerm('')}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <span className="text-[#70757a] text-xl">×</span>
                        </button>
                      )}
                      <div className="flex items-center space-x-2 mr-4">
                        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                          <Mic className="w-5 h-5 text-[#4285f4]" />
                        </button>
                        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                          <Camera className="w-5 h-5 text-[#4285f4]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="px-4 py-4 max-w-[692px] mx-auto">
              {error && (
                <div className="mt-4 text-[#ea4335]">{error}</div>
              )}
              
              {results && (
                <div className="space-y-6">
                  {results.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="text-sm text-[#202124] truncate">{link.name}</div>
                      <div className="text-[#1a0dab] text-xl hover:underline">
                        {link.url.split('/').pop() || 'Homepage'}
                      </div>
                      <div className="text-black my-5">
                        {link.description}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#f2f2f2] text-[#70757a] text-[14px]">
        <div className="px-8 py-3 border-b border-[#dadce0]">
          <span>India</span>
        </div>
        <div className="px-8 py-3 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center sm:justify-start gap-y-2">
            <a href="#" className="px-3 hover:underline">About</a>
            <a href="#" className="px-3 hover:underline">Advertising</a>
            <a href="#" className="px-3 hover:underline">Business</a>
            <a href="#" className="px-3 hover:underline">How Search works</a>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-y-2 mt-3 sm:mt-0">
            <a href="#" className="px-3 hover:underline">Privacy</a>
            <a href="#" className="px-3 hover:underline">Terms</a>
            <a href="#" className="px-3 hover:underline">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;