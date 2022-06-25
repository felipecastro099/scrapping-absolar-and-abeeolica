const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.absolar.org.br/nossos-associados/';

fetchData(url).then((res) => {
    const html = res.data

    const $ = cheerio.load(html)

    const associados = [];


    $('html > body > main > div.wp-block-columns > div.wp-block-column.container > div.row.associates-itens > div.col-6.col-md-3.associate-wrap-item.tt > div.bg-white.p-4.associates-item')
    .toArray().forEach((item) => {
        associados.push({
            image: $(item).find('img').attr('src'),
            title: $(item).find('p.my-3 > strong').text(),
            email: $(item).find('p.tooltip1 > span').first().text(),
            url:   $(item).find('p.tooltip1 > span').last().text(),
            phone: formatPhone($(item).find('p:nth-child(4)').text())
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

function formatPhone(phone) {
    const newPhone = phone.replace(/[^\d.-]/g, '').replace('-', '').replace('.', '');

    if (isEmpty(newPhone)) return null;

    return newPhone;
}

function isEmpty(str) {
    return (!str || str.length === 0 );
}