import React, { Component } from "react";
import Bill from "../Bill";
import Menu from "../Menu";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";
import "./index.css";

export default class index extends Component {
  state = {
    menus: [],
    choosedCategory: "Makanan",
    keranjangs: [],
  };

  handleChangeCategory = (value) => {
    this.setState({
      menus: [],
      choosedCategory: value,
    });
    axios.get(`${API_URL}products?category.nama=${value}`).then((res) => {
      const menus = res.data;
      this.setState({ menus });
    });
  };

  handleSubmitBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.state.keranjangs,
    };

    axios.post(`${API_URL}pesanans`, pesanan).then(() => {
      this.props.history.push("/sukses");
    });
  };

  masukKeranjang = (value) => {
    axios.get(`${API_URL}keranjangs?product.id=${value.id}`).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios.post(`${API_URL}keranjangs`, keranjang).then(() => {
          this.getListKeranjang();
          swal({
            title: "Sukses",
            text: `${keranjang.product.nama} Berhasil Masuk Ke Keranjang`,
            icon: "success",
            button: false,
            timer: 1300,
          });
        });
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };

        axios
          .put(`${API_URL}keranjangs/${res.data[0].id}`, keranjang)
          .then(() => {
            swal({
              title: "Sukses",
              text: `${keranjang.product.nama} Berhasil Masuk Ke Keranjang`,
              icon: "success",
              button: false,
              timer: 1300,
            });
          });
      }
    });
  };
  componentDidMount() {
    axios
      .get(`${API_URL}products?category.nama=${this.state.choosedCategory}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios.get(`${API_URL}keranjangs`).then((res) => {
  //       const keranjangs = res.data;
  //       this.setState({ keranjangs });
  //     });
  //   }
  // }

  getListKeranjang = () => {
    axios.get(`${API_URL}keranjangs`).then((res) => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
    });
  };

  render() {
    const { menus, choosedCategory, keranjangs } = this.state;
    return (
      <div className="kasirApp">
        <Menu
          handleChangeCategory={this.handleChangeCategory}
          masukKeranjang={this.masukKeranjang}
          menus={menus}
          choosedCategory={choosedCategory}
        />
        <Bill
          keranjangs={keranjangs}
          handleSubmitBayar={this.handleSubmitBayar}
          getListKeranjang={this.getListKeranjang}
        />
      </div>
    );
  }
}
