// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract QuantumWorkshop_v4 {

string public eventName = "Quantum Workshop";

mapping(address => string) public katilimciTakmaAdlari;

mapping(address => bool) public kayitliMi;

uint public katilimciSayisi = 0;
uint public sabitKapasite = 3;

address public gorevli;

mapping(address => bool) public girisYapti;

constructor() {
    gorevli = msg.sender;
}

event KatilimciKaydedildi(address indexed katilimci);
event KatilimciGirisYapti(address indexed katilimci);

modifier sadeceGorevli() {
    require(msg.sender == gorevli, "Yetkisiz islem!");
    _;
}



function takmaAdKaydet(string calldata yeniTakmaAd) external {

    require(bytes(yeniTakmaAd).length > 0, "Takma ad bos olamaz!");

    require(!kayitliMi[msg.sender], "Bu adres zaten kayitli!");

    require(katilimciSayisi < sabitKapasite, "Etkinlik dolu!");

    katilimciTakmaAdlari[msg.sender] = yeniTakmaAd;

    kayitliMi[msg.sender] = true;

    katilimciSayisi++;

    emit KatilimciKaydedildi(msg.sender);
}

function katilimciGirisi(address katilimci) external sadeceGorevli {

    require(kayitliMi[katilimci], "Katilimci kayitli degil!");

    require(!girisYapti[katilimci], "Katilimci zaten giris yapti!");

    girisYapti[katilimci] = true;

    emit KatilimciGirisYapti(katilimci);
}

}