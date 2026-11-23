
import { hexlify } from "ethers";
import { entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { mnemonicToSeedSync } from "@scure/bip39";
import { HDNodeWallet } from "ethers";
import { validateMnemonic } from "@scure/bip39";


// HTML elemanlarını seçiyoruz.
const createButton = document.getElementById("createWallet");
const walletInfo = document.getElementById("walletInfo");

// Butona tıklandığında çalışacak fonksiyon.
createButton.addEventListener("click", () => {

    // 16 byte = 128 bit güvenli rastgele veri oluşturuyoruz.
    const entropy = crypto.getRandomValues(new Uint8Array(16));

    // Uint8Array verisini okunabilir hexadecimal biçime çeviriyoruz.
    const entropyHex = hexlify(entropy);
// 128-bit entropy'yi BIP39 kullanarak 12 kelimeye dönüştürüyoruz.
const mnemonic = entropyToMnemonic(entropy, wordlist);
    // Üretilen entropy'yi ekranda gizli olarak gösteriyoruz.
    // 12 kelimelik mnemonic'ten 512-bit seed oluşturuyoruz.
const seed = mnemonicToSeedSync(mnemonic);
// Seed kullanarak Ethereum cüzdanını BIP44 yoluyla türetiyoruz.
const derivationPath = "m/44'/60'/0'/0/0";

const wallet = HDNodeWallet.fromSeed(seed).derivePath(derivationPath);
// Cüzdanın özel anahtarını alıyoruz.
const privateKey = wallet.privateKey;

// Cüzdanın açık anahtarını alıyoruz.
const publicKey = wallet.publicKey;

// Ethereum cüzdan adresini alıyoruz.
const address = wallet.address;

   walletInfo.innerHTML = `
    <h2>Entropy (128-bit)</h2>
    <details>
        <summary>Entropy değerini görüntüle</summary>
        <p>${entropyHex}</p>
    </details>

    <h2>Mnemonic (12 kelime)</h2>
    <details>
        <summary>Mnemonic değerini görüntüle</summary>
        <p>${mnemonic}</p>
    </details>

    <h2>Seed (512-bit)</h2>
    <details>
        <summary>Seed değerini görüntüle</summary>
        <p>${hexlify(seed)}</p>
    </details>

    <h2>Derivation Path</h2>
    <p>${derivationPath}</p>

        <h2>Private Key</h2>
    <details>
        <summary>Private Key değerini görüntüle</summary>
        <p>${privateKey}</p>
    </details>

    <h2>Public Key</h2>
    <details>
        <summary>Public Key değerini görüntüle</summary>
        <p>${publicKey}</p>
    </details>

    <h2>Ethereum Address</h2>
    <p>${address}</p>
`;
    console.log("128-bit entropy başarıyla oluşturuldu.");
});
// BIP39 Checksum Deneyi

const testMnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

console.log(
    "Orijinal mnemonic geçerli mi?",
    validateMnemonic(testMnemonic, wordlist)
);

// Son kelimeyi zoo olarak değiştirdik.
const changedMnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon zoo";

console.log(
    "Değiştirilmiş mnemonic geçerli mi?",
    validateMnemonic(changedMnemonic, wordlist)
);