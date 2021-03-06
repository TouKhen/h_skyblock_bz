// ALl variables
const blaze_rods_label = document.querySelector("#blaze_rods_label");
const ender_pearls_label = document.querySelector("#ender_pearls_label");
const eyes_price = document.querySelector("#eyes_price");
const eyes_buy = document.querySelector("#eyes_buy");
const eyes_profit = document.querySelector("#eyes_profit");

// Update button
document.querySelector("form").addEventListener('submit', async function (event){
    event.preventDefault()

    const btn = document.querySelector('button[type=submit]');
    btn.style.display = 'none';
    try {
        // Items list
        const json = await( await fetch("https://api.hypixel.net/skyblock/bazaar")).json();

        const blaze_rods_price = json["products"]["BLAZE_ROD"]["quick_status"]["buyPrice"];
        const ender_pearls_price = json["products"]["ENCHANTED_ENDER_PEARL"]["quick_status"]["buyPrice"];
        const eye_price = json["products"]["ENCHANTED_EYE_OF_ENDER"]["quick_status"]["sellPrice"];
        console.log(ender_pearls_price + " " + blaze_rods_price);

        console.log(eye_price);

        let eye_bz_price = (Math.round(blaze_rods_price) * 8) + (Math.round(ender_pearls_price) * 16);

        let eye_profit_val = Math.round(eye_price) - eye_bz_price;

        // Eyes profit
        let eye_profit_perc = (eye_bz_price / Math.round(eye_price)) * 100;
        eye_profit_perc = 100 - eye_profit_perc;
        eye_profit_perc = Math.round(eye_profit_perc);
        
        // Change values in html
        blaze_rods_label.innerHTML = Math.round(blaze_rods_price) + " coins";
        ender_pearls_label.innerHTML = Math.round(ender_pearls_price) + " coins";
        eyes_price.innerHTML = "Craft price per eyes = <span>" + eye_bz_price + " coins</span>";
        eyes_buy.innerHTML = "Bazaar eyes buy = <span>" + Math.round(eye_price) + " coins</span>";
        eyes_profit.innerHTML = "Eyes profit = <span>" + eye_profit_val + " coins (+" + eye_profit_perc + "%) </span>";

        // Add to graph
        data.datasets[0].data.push(blaze_rods_price);
        data.datasets[1].data.push(ender_pearls_price);
        data.datasets[2].data.push(eye_profit_perc);

        console.log(data.datasets[0])

        myChart.update();

    } catch (e){console.warn(e)}
    finally{btn.style.display = 'inline-block'}
});

// Graph

const labels = [
  0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Blaze Rods Price',
    backgroundColor: 'rgb(255, 166, 0, 0.600)',
    borderColor: 'rgb(255, 166, 0, 0.600)',
    data: [0],
  },
  {
    label: 'Enchanted Ender Pearls Price',
    backgroundColor: 'rgb(145, 40, 243, 0.600)',
    borderColor: 'rgb(145, 40, 243, 0.600)',
    data: [0],
  },
  {
    label: 'Profit',
    backgroundColor: 'rgba(119, 248, 59, 0.600)',
    borderColor: 'rgba(119, 248, 59, 0.600)',
    data: [0],
  }
  ]
};

const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      y: {
        min: 0,
        max: 200,
      }
    }
  }
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);