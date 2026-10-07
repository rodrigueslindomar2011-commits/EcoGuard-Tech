/* =========================================================
   FIREALERT
   JavaScript principal
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MAPA
    ========================== */

    const map = L.map("map", {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([-14.2350, -51.9253], 4);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(map);


    /* =========================
       ÍCONE DOS FOCOS
    ========================== */

    const fireIcon = L.divIcon({
        html: "🔥",
        className: "fire-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });


    /* =========================
       LOCALIZAÇÕES SIMULADAS
    ========================== */

    const locations = [

        {
            position: [-3.4653, -62.2159],
            name: "Amazonas",
            intensity: "Alta"
        },

        {
            position: [-10.9472, -37.0731],
            name: "Sergipe",
            intensity: "Moderada"
        },

        {
            position: [-15.7801, -47.9292],
            name: "Distrito Federal",
            intensity: "Alta"
        },

        {
            position: [-8.0476, -34.8770],
            name: "Pernambuco",
            intensity: "Moderada"
        },

        {
            position: [-12.9777, -38.5016],
            name: "Bahia",
            intensity: "Alta"
        },

        {
            position: [-16.6869, -49.2648],
            name: "Goiás",
            intensity: "Alta"
        },

        {
            position: [-20.3155, -40.3128],
            name: "Espírito Santo",
            intensity: "Moderada"
        },

        {
            position: [-23.5505, -46.6333],
            name: "São Paulo",
            intensity: "Baixa"
        }

    ];


    /* =========================
       ADICIONAR MARCADORES
    ========================== */

    locations.forEach((location) => {

        const marker = L.marker(
            location.position,
            {
                icon: fireIcon
            }
        ).addTo(map);

        marker.bindPopup(`
            <strong>🔥 Foco de Queimada</strong>
            <br><br>
            <strong>Região:</strong> ${location.name}
            <br>
            <strong>Intensidade:</strong> ${location.intensity}
        `);

    });


    /* =========================
       GRÁFICO
    ========================== */

    const chartElement = document.getElementById("fireChart");

    const fireChart = new Chart(chartElement, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out"
            ],

            datasets: [

                {
                    label: "Queimadas Detectadas",

                    data: [
                        12,
                        19,
                        25,
                        40,
                        58,
                        75,
                        82,
                        96,
                        110,
                        128
                    ],

                    borderColor: "#ff5e00",

                    backgroundColor:
                        "rgba(255, 94, 0, 0.16)",

                    borderWidth: 3,

                    pointRadius: 4,

                    pointHoverRadius: 7,

                    fill: true,

                    tension: 0.4
                }

            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {

                legend: {

                    labels: {
                        color: "#ffffff",

                        font: {
                            family: "Poppins"
                        }
                    }

                },

                tooltip: {

                    backgroundColor: "#020617",

                    borderColor:
                        "rgba(255,255,255,0.1)",

                    borderWidth: 1,

                    titleColor: "#ffffff",

                    bodyColor: "#cbd5e1"
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    grid: {
                        color:
                            "rgba(255,255,255,0.06)"
                    },

                    ticks: {
                        color: "#94a3b8"
                    }

                },

                x: {

                    grid: {
                        color:
                            "rgba(255,255,255,0.03)"
                    },

                    ticks: {
                        color: "#94a3b8"
                    }

                }

            }

        }

    });


    /* =========================
       ELEMENTOS DO DASHBOARD
    ========================== */

    const fires =
        document.getElementById("fires");

    const temperature =
        document.getElementById("temperature");

    const smoke =
        document.getElementById("smoke");

    const risk =
        document.getElementById("risk");


    /* =========================
       ATUALIZAÇÃO DOS DADOS
    ========================== */

    function updateData() {

        /*
         * Estes valores são simulados.
         * Posteriormente podemos conectar
         * o projeto a uma API de dados reais.
         */

        const fireNumber =
            Math.floor(
                Math.random() * 151
            ) + 50;

        const temperatureNumber =
            Math.floor(
                Math.random() * 21
            ) + 30;

        const smokeNumber =
            Math.floor(
                Math.random() * 51
            ) + 45;


        fires.textContent =
            fireNumber;

        temperature.textContent =
            `${temperatureNumber}°C`;

        smoke.textContent =
            `${smokeNumber}%`;


        /* =========================
           NÍVEL DE RISCO
        ========================== */

        const risks = [
            "BAIXO",
            "MODERADO",
            "ALTO",
            "EXTREMO"
        ];

        const randomRisk =
            risks[
                Math.floor(
                    Math.random() * risks.length
                )
            ];


        risk.textContent =
            randomRisk;


        /* =========================
           CORES DO RISCO
        ========================== */

        if (randomRisk === "EXTREMO") {

            risk.style.color = "#ff0000";

        } else if (randomRisk === "ALTO") {

            risk.style.color = "#ff5e00";

        } else if (randomRisk === "MODERADO") {

            risk.style.color = "#ffd000";

        } else {

            risk.style.color = "#00ff88";

        }

    }


    /* =========================
       PRIMEIRA ATUALIZAÇÃO
    ========================== */

    updateData();


    /* =========================
       ATUALIZA A CADA 3 SEGUNDOS
    ========================== */

    setInterval(
        updateData,
        3000
    );


    /* =========================
       LOG DO SISTEMA
    ========================== */

    console.log(
        "🔥 FireAlert iniciado com sucesso!"
    );

    console.log(
        "🛰️ Sistema de monitoramento carregado."
    );

});
