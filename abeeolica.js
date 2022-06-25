const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://abeeolica.org.br/nossos-associados/';

fetchData(url).then((res) => {
    const html = res.data

    const $ = cheerio.load(html)

    const associados = [];

    $('.associados > li').each(function(item){
        associados.push({
            category: getCategoryForClass($(item).attr('data-filtro')),
            url: $(item).find('a').attr('href'),
            image: $(item).find('a').find('img').attr('data-src'),
        })
    })

    associados.forEach((item) => console.log(item))
})

async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}

function getCategoryForClass(item) {
    let category = '';

    switch (item) {
        case(item = 'f1'):
            category = 'Comercializadores de Energia';
        case(item = 'f2'):
            category = 'Construção Civil';
        case(item = 'f3'):
            category = 'Empreendedores - Desenvolvedores e Geradores de Energia';  
        case(item = 'f4'):
            category = 'Engenharia, Consultoria e Construção';
        case(item = 'f5'):
            category = 'Fabricantes de Aerogeradores de Grande Porte';
        case(item = 'f6'):
            category = 'Fabricantes de Pás Eólicas';        
        case(item = 'f7'):
            category = 'Fabricantes de Peças e Componentes';
        case(item = 'f8'):
            category = 'Federações';
        case(item = 'f9'):
            category = 'Institutos de Pesquisa, Universidades e/ou Centro de Estudos';
        case(item = 'f10'):
            category = 'Logística, Montagem e Transportes';                          
    }

    return category;
}