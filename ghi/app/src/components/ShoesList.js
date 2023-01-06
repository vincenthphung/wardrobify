import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function ShoesList(props) {
  console.log("shoes here!");
  if (props.shoes === undefined) {
    return null;
  }
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {props.shoes.map((shoe) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/shoes/${shoe.id}`}
            key={shoe.id}
          >
            {shoe.model_name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
