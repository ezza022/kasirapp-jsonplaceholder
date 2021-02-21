import "./index.css";

import React from "react";
import { numberWithCommas } from "../../utils/constant";

const pathIMG = "./assets/images/";
const Card = ({ menu, masukKeranjang }) => {
  return (
    <div className="card" onClick={() => masukKeranjang(menu)}>
      <div className="img">
        <img
          src={pathIMG + menu.category.nama.toLowerCase() + "/" + menu.gambar}
          alt=""
        />
      </div>
      <div className="body">
        <h4>{menu.nama}</h4>
        <h5>Rp.{numberWithCommas(menu.harga)}</h5>
      </div>
    </div>
  );
};

export default Card;
