// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract QuantumWorkshop {

string public etkinlikAdi = "Quantum Workshop";

mapping(address => string) public katilimciTakmaAdlari;

function takmaAdKaydet(string calldata yeniTakmaAd) external {
    katilimciTakmaAdlari[msg.sender] = yeniTakmaAd;
}

}