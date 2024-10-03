document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa centrado en las coordenadas de la primera diapositiva
    var map = L.map('map').setView([4.640020,-74.092604], 10);

    // Agregar capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    // Integrar servicios WMS de GeoServer
    var wmsLayer1 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Investigacion_Cultured_Maps/wms', {
        layers: 'Investigacion_Cultured_Maps:Localidad_storymap_FichasLocales',
        format: 'image/png',
        transparent: true,
        maxZoom: 19, // Configurar el nivel de zoom máximo
        minZoom: 0
    }).addTo(map);

    // Función para cambiar la vista del mapa
    function changeMapView(lat, lng, zoom) {
        map.setView([lat, lng], zoom);
    }

    // Manejar las diapositivas
    var slides = document.querySelectorAll('.slide');

    // Crear el índice
    var indexContainer = document.getElementById('index');
    slides.forEach(function(slide, index) {
        if (index > 0) { // Evitar agregar un botón para la diapositiva del índice
            var button = document.createElement('button');
            button.textContent = 'Localidad ' + index;
            button.className = 'index-button';
            button.addEventListener('click', function() {
                var lat = parseFloat(slide.getAttribute('data-lat'));
                var lng = parseFloat(slide.getAttribute('data-lng'));
                var zoom = parseInt(slide.getAttribute('data-zoom'));
                changeMapView(lat, lng, zoom);
                slide.scrollIntoView({behavior: 'smooth'});
            });
            indexContainer.appendChild(button);
        }
    });

    // Manejar el clic en cada diapositiva
    slides.forEach(function(slide) {
        slide.addEventListener('click', function() {
            var lat = parseFloat(slide.getAttribute('data-lat'));
            var lng = parseFloat(slide.getAttribute('data-lng'));
            var zoom = parseInt(slide.getAttribute('data-zoom'));
            changeMapView(lat, lng, zoom);
        });
    });

    // Manejar el scroll para cambiar la vista del mapa
    var content = document.getElementById('content');
    content.addEventListener('scroll', function() {
        slides.forEach(function(slide) {
            var slideRect = slide.getBoundingClientRect();
            var contentRect = content.getBoundingClientRect();
            if (slideRect.top >= contentRect.top && slideRect.bottom <= contentRect.bottom) {
                var lat = parseFloat(slide.getAttribute('data-lat'));
                var lng = parseFloat(slide.getAttribute('data-lng'));
                var zoom = parseInt(slide.getAttribute('data-zoom'));
                changeMapView(lat, lng, zoom);
            }
        });
    });

    // Manejar el botón para volver al índice
    var backToIndexButton = document.getElementById('backToIndexButton');
    backToIndexButton.addEventListener('click', function() {
        var indexSlide = slides[0]; // Diapositiva del índice
        var lat = parseFloat(indexSlide.getAttribute('data-lat'));
        var lng = parseFloat(indexSlide.getAttribute('data-lng'));
        var zoom = parseInt(indexSlide.getAttribute('data-zoom'));
        changeMapView(lat, lng, zoom);
        indexSlide.scrollIntoView({behavior: 'smooth'});
    });
});