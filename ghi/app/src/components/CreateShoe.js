import React from "react";
import Nav from "../Nav";

class AddShoe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer_name: "",
      model_name: "",
      shoe_color: "",
      picture_url: "",
      wardrobe_bin: "",
      wardrobe_bin_list: [],
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      manufacturer_name: this.state.manufacturer_name,
      model_name: this.state.model_name,
      shoe_color: this.state.shoe_color,
      picture_url: this.state.picture_url,
      wardrobe_bin: this.state.wardrobe_bin,
    };

    const ShoeListUrl = "http://localhost:8080/api/shoes/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(ShoeListUrl, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe);
      const cleared = {
        manufacturer_name: "",
        model_name: "",
        shoe_color: "",
        picture_url: "",
        wardrobe_bin: "",
      };
      this.setState(cleared);
    }
  };

  handleManufacturerNameChange = (event) => {
    const value = event.target.value;
    this.setState({ manufacturer_name: value });
  };

  handleModelNameChange = (event) => {
    const value = event.target.value;
    this.setState({ model_name: value });
  };

  handleShoeColorChange = (event) => {
    const value = event.target.value;
    this.setState({ shoe_color: value });
  };

  handlePictureUrlChange = (event) => {
    const value = event.target.value;
    this.setState({ picture_url: value });
  };

  handleBinChange = (event) => {
    const value = event.target.value;
    this.setState({ wardrobe_bin: value });
  };

  async componentDidMount() {
    const url = "http://localhost:8100/api/bins/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ wardrobe_bin_list: data.bins });
    }
  }

  render() {
    let pageTitle;
    if (this.state.id) {
      pageTitle = <h2>Edit Shoe</h2>;
    } else {
      pageTitle = <h2>Add Shoe</h2>;
    }
    return (
      <div>
        {pageTitle}
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              {/* <h1>{pageTitle}</h1> */}
              <form onSubmit={this.handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleManufacturerNameChange}
                    placeholder="manufacturer_name"
                    required
                    type="text"
                    name="manufacturer_name"
                    id="manufacturer_name"
                    value={this.state.manufacturer_name}
                    className="form-control"
                  />
                  <label htmlFor="manufacturer_name">Manufacturer Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleModelNameChange}
                    placeholder="model_name"
                    required
                    type="text"
                    name="model_name"
                    id="model_name"
                    value={this.state.model_name}
                    className="form-control"
                  />
                  <label htmlFor="model_name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleShoeColorChange}
                    placeholder="shoe_color"
                    required
                    type="text"
                    name="shoe_color"
                    id="shoe_color"
                    value={this.state.shoe_color}
                    className="form-control"
                  />
                  <label htmlFor="shoe_color">Shoe Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handlePictureUrlChange}
                    placeholder="picture_url"
                    required
                    type="url"
                    name="picture_url"
                    id="picture_url"
                    value={this.state.picture_url}
                    className="form-control"
                  />
                  <label htmlFor="picture_url">Picture Url</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={this.handleBinChange}
                    required
                    name="wardrobe_bin"
                    id="wardrobe_bin"
                    value={this.state.wardrobe_bin}
                    className="form-select"
                  >
                    <option value="">Choose a Wardrobe Bin</option>
                    {/* {console.log(this.state.locations)} */}
                    {this.state.wardrobe_bin_list.map((bin) => {
                      return (
                        <option key={bin.id} value={bin.id}>
                          {bin.bin_number}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Save</button>
                {/* <button className="btn btn-primary">Update</button>
              <button className="btn btn-primary">Delete</button>
              <button className="btn btn-primary">List Shoes</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddShoe;
