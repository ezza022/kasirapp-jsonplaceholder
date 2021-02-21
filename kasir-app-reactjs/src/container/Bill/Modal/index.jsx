import React, { Component } from "react";
import { numberWithCommas } from "../../utils/constant";
import "./index.css";

export default class Modal extends Component {
  render() {
    if (this.props.isOpen === false) return null;
    const {
      keranjangDetail,
      jumlah,
      keterangan,
      totalHarga,
      handlePlus,
      handleMinus,
      handleChange,
      handleSubmit,
      handleDelete
    } = this.props;
    return (
      <div>
        <div className="modal">
          <h3>{keranjangDetail.product.nama}</h3>
          <p>Total Harga : Rp. {numberWithCommas(totalHarga)}</p>
          <p>Jumlah : {jumlah}</p>
          <div className="button">
            <a onClick={handleMinus}>-</a>
            <a onClick={handlePlus}>+</a>
          </div>
          <p>Keterangan :</p>
          <textarea
            placeholder="Cabenya banyakin donk"
            value={keterangan}
            onChange={(event) => handleChange(event)}
          ></textarea>
          <div className="save">
            <a className="save" onClick={handleSubmit}>
              Simpan
            </a>
          </div>
          <div className="delete">
            <a className="delete" onClick={()=>handleDelete(keranjangDetail.id)}>Hapus Pesanan</a>
          </div>
        </div>
        <div className="bg" onClick={(e) => this.close(e)} />
      </div>
    );
  }

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}
