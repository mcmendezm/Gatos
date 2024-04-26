const API_URI_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=6';
const API_URI_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_SKNh4ecOmMsCiIQnnkolKGVZwYv2Aix94Ir6tAPU4fKWIVIXXL9hvYBhXDPXnUnb';
const API_URI_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_SKNh4ecOmMsCiIQnnkolKGVZwYv2Aix94Ir6tAPU4fKWIVIXXL9hvYBhXDPXnUnb`;

const spanError=document.getElementById("error")
async function loadRandomMichis() {
    const respuesta = await fetch(API_URI_RANDOM);
    const data = await respuesta.json()
    
    if (respuesta.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + respuesta.status + " " + data.message;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');
        const img5 = document.getElementById('img5');
        const img6 = document.getElementById('img6');

        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
        const btn4 = document.getElementById('btn4');
        const btn5 = document.getElementById('btn5');
        const btn6 = document.getElementById('btn6');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        img5.src = data[4].url;
        img6.src = data[5].url;

        btn1.onclick = () => saveFavouriteMichis(data[0].id);
        btn2.onclick = () => saveFavouriteMichis(data[1].id);
        btn3.onclick = () => saveFavouriteMichis(data[2].id);
        btn4.onclick = () => saveFavouriteMichis(data[3].id);
        btn5.onclick = () => saveFavouriteMichis(data[4].id);
        btn6.onclick = () => saveFavouriteMichis(data[5].id);
        }
}
async function loadFavouritesMichis() {
    const respuesta = await fetch(API_URI_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY':'live_SKNh4ecOmMsCiIQnnkolKGVZwYv2Aix94Ir6tAPU4fKWIVIXXL9hvYBhXDPXnUnb'
        }
    });
    const data = await respuesta.json()
    console.log("favorito")
    console.log(data);
    const div = document.getElementById('favoutites');
            div.innerHTML = "";
    if (respuesta.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + respuesta.status + " " + data.message;
    } else {
        data.forEach(element => {
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const btnText = document.createTextNode('Eliminar')
            
            button.appendChild(btnText);
            button.onclick = () => deleteFavouriteMichi(element.id);
            img.src = element.image.url;
            article.appendChild(img);
            article.appendChild(button);
            div.appendChild(article);

        });
    }
}
async function saveFavouriteMichis(id) {
    const respuesta = await fetch(API_URI_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await respuesta.json();

    console.log("Save")
    console.log(respuesta)
    
    if (respuesta.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + respuesta.status + " " + data.message;
    } else {
        console.log("michi guardado en favoritos")
        loadFavouritesMichis();
    }
}
async function deleteFavouriteMichi(id) {
    const respuesta = await fetch(API_URI_FAVORITES_DELETE(id), {
        method: 'DELETE',
    });
    const data = await respuesta.json();

    console.log("Eliminar")
    console.log(respuesta)
    
    if (respuesta.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + respuesta.status + " " + data.message;
    } else {
        console.log("Michi eliminado de favoritos")
        loadFavouritesMichis();
    }
}
loadRandomMichis();
loadFavouritesMichis();
