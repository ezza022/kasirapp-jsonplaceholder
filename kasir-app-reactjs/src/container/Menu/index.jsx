import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import Card from "./Card";

const categories = ["Makanan", "Minuman", "Cemilan"];
const Icon = ({ nama }) => {
  if (nama === categories[0]) return <FontAwesomeIcon icon={faUtensils} />;
  if (nama === categories[1]) return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === categories[2]) return <FontAwesomeIcon icon={faCheese} />;
};

const Menu = ({
  handleChangeCategory,
  masukKeranjang,
  menus,
  choosedCategory,
}) => {
  return (
    <div className="menu">
      <div className="title">
        <div className="add">
          <h2>Mabes Coffee</h2>
        </div>
        <div className="text"></div>
        <nav>
          <ul>
            {categories.map((category) => (
              <li
                className={choosedCategory === category && "category-active"}
                onClick={() => handleChangeCategory(category)}
              >
                <i>{<Icon nama={category} />}</i>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="content">
        <div className="card-container">
          {menus.map((menu) => (
            <Card key={menu.id} menu={menu} masukKeranjang={masukKeranjang} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;