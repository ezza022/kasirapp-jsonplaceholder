import React, { Component } from "react";
import { API_URL, numberWithCommas } from "../utils/constant";
import Modal from "./Modal";
import axios from "axios";
import swal from "sweetalert";
import "./index.css";
export default class Bill extends Component {
  state = {
    isModalOpen: false,
    keranjangDetail: false,
    jumlah: 0,
    keterangan: "",
    totalHarga: 0,
  };

  openModal = (menuKeranjang) => {
    this.setState({
      isModalOpen: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handlePlus = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };
  handleMinus = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.closeModal();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      keterangan: this.state.keterangan,
      product: this.state.keranjangDetail.product,
    };

    axios
      .put(`${API_URL}keranjangs/${this.state.keranjangDetail.id}`, data)
      .then(() => {
        this.props.getListKeranjang();
        swal({
          title: "Update Keranjang",
          text: "berhasil diUpdate",
          icon: "success",
          button: false,
          timer: 1300,
        });
      });
  };

  handleDelete = (id) => {
    this.closeModal();
    axios.delete(`${API_URL}keranjangs/${id}`).then(() => {
      this.props.getListKeranjang();
      swal({
        title: "Hapus Keranjang",
        text: "berhasil diHapus",
        icon: "success",
        button: false,
        timer: 1300,
      });
    });
  };

  render() {
    const { keranjangs, handleSubmitBayar } = this.props;
    const totalBayar = keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="bill">
        <div className="title">
          <h3>Tagihan</h3>
        </div>
        <div className="content">
          <div className="body">
            <div className="body-wrap">
              {keranjangs.map((keranjang) => (
                <div className="bill-container">
                  <div className="jumlah">
                    <p>{keranjang.jumlah}</p>
                  </div>
                  <div className="keterangan">
                    <p onClick={() => this.openModal(keranjang)}>
                      {keranjang.product.nama}
                    </p>
                    <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                  </div>
                  <div className="harga">
                    <p>
                      <strong>
                        Rp. {numberWithCommas(keranjang.total_harga)}
                      </strong>
                    </p>
                  </div>
                </div>
              ))}
              <Modal
                handleDelete={this.handleDelete}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handlePlus={this.handlePlus}
                handleMinus={this.handleMinus}
                isOpen={this.state.isModalOpen}
                onClose={() => this.closeModal()}
                {...this.state}
              />
            </div>
          </div>
          <div className="checkout-container">
            <div className="checkout-info">
              <p>Total Harga : </p>
              <strong>
                <p>Rp. {numberWithCommas(totalBayar)}</p>
              </strong>
            </div>
            <div className="checkout-button">
              <a onClick={() => handleSubmitBayar(totalBayar)}>Bayar</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
