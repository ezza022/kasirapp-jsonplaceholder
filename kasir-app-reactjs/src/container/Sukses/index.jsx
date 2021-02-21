import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {API_URL} from "../utils/constant"
import "./index.css";

export default class Sukses extends Component {
  componentDidMount() {
    axios.get(`${API_URL}keranjangs`).then((res) => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
      keranjangs.map(function (item) {
        return axios
          .delete(`${API_URL}keranjangs/${item.id}`)
          .then((res) => console.log(res));
      });
    });
  }
  render() {
    return (
      <div className="sukses">
        <img src="./assets/images/sukses/sukses.png" alt="" />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih sudah Memesan !</p>
        <Link to="/">kembali</Link>
      </div>
    );
  }
}
