import { BrowserRouter, Routes, Route, renderMatches } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
// import HatsList from "./components/HatsList";
// import HatDetail from "./components/HatDetail";
import ShoesList from "./components/ShoesList";
import ShoeDetail from "./components/ShoeDetail";
import CreateShoe from "./components/CreateShoe";
// import HatForm from "./components/HatForm";
import React, { useCallback } from "react";
// import React from "react";

class App extends React.Component {
  state = {
    hats: [],
    shoes: [],
  };

  async componentDidMount() {
    const response1 = await fetch("http://localhost:8090/api/hats/");
    if (response1.ok) {
      const data = await response1.json();
      this.setState({ hats: data.hats });
    } else {
      console.error(response1);
    }

    const response2 = await fetch("http://localhost:8080/api/shoes/");
    if (response2.ok) {
      const data = await response2.json();
      this.setState({ shoes: data.shoes });
    } else {
      console.error(response2);
    }
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="shoes"
                element={<ShoesList shoes={this.state.shoes} />}
              >
                <Route path=":shoeId" element={<ShoeDetail />} />
              </Route>

              {/* <Route path="hats" element={<HatsList hats={this.state.hats} />}> */}
                {/* <Route path="new" element={<HatForm />}></Route> */}
                {/* <Route path=":hatId" element={<HatDetail />} /> */}
              {/* </Route> */}
              <Route path="newShoe" element={<CreateShoe />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
