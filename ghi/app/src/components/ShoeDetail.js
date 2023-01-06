import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ShoeDetail(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <ShoeDetailDisplay shoeId={params.shoeId} navigate={navigate} />;
}

class ShoeDetailDisplay extends React.Component {
  state = {
    shoe: {
      shoe_color: "",
      wardrobe_bin: {},
    },
  };

  handleDelete = async (event) => {
    const url = `http://localhost:8080/api/shoes/${this.props.shoeId}/`;
    const response = await fetch(url, {
      method: "delete",
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      // window.location.reload()
      // this.setState({})
    }
    // return this.props.navigate("/shoes")
    return (window.location.href = "/shoes");
  };

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      // console.log("ShoeDetail")
      const response = await fetch(
        `http://localhost:8080/api/shoes/${this.props.shoeId}/`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        this.setState({
          shoe: data,
        });
        console.log(data);
      }
    }
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <h1 className="card-title">
          {this.state.shoe.shoe_color} {this.state.shoe.model_name}
        </h1>
        <img src={this.state.shoe.picture_url} className="card-img-top" />
        <div className="card-body">
          <h6>{this.state.shoe.manufacturer_name}</h6>
          <h6>{this.state.shoe.picture_url}</h6>
          <h6>{this.state.shoe.wardrobe_bin.bin_number}</h6>
        </div>
        <div>
          <button
            variant="danger"
            onClick={() => this.handleDelete(this.state.shoe.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default ShoeDetail;
