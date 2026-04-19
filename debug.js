const http = require('http');

http.get('http://localhost:8080/api/hotels?location=Colombo&rating=5', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const hotels = JSON.parse(data);
      console.log('Parsed array length:', hotels.length);
      console.log('Sample properties of first item:', Object.keys(hotels[0]));
      console.log('pricePerNight is:', hotels[0].pricePerNight, ' Type:', typeof hotels[0].pricePerNight);
      
      const filtered = hotels.filter(h => h.pricePerNight >= 200);
      console.log('Filtered length:', filtered.length);
    } catch(e) {
      console.log('Error parsing:', e.message);
      console.log('Raw data received:\n' + data);
    }
  });
}).on('error', err => console.log('HTTP Error:', err.message));
