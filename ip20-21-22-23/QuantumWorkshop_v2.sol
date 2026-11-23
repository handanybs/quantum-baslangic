// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract QuantumWorkshop_v2 {

string public eventName = "Quantum Workshop";

mapping(address => string) public katilimciTakmaAdlari;

mapping(address => bool) public kayitliMi;

uint public katilimciSayisi = 0;
uint public sabitKapasite = 3;

function takmaAdKaydet(string calldata yeniTakmaAd) external {

    require(bytes(yeniTakmaAd).length > 0, "Takma ad bos olamaz!");

    require(!kayitliMi[msg.sender], "Bu adres zaten kayitli!");

    require(katilimciSayisi < sabitKapasite, "Etkinlik dolu!");

    katilimciTakmaAdlari[msg.sender] = yeniTakmaAd;

    kayitliMi[msg.sender] = true;

    katilimciSayisi++;
}



}