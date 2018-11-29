const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const schedule = require('node-schedule');


function recuperationListeVetement() {
    axios.get('https://www.jennyfer.com/fr-fr/vetements/pulls-et-gilets/')
        .then((response) => {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                let listPull = [];
                let priceDateArray = [];
                let currentDate = Date(Date.now());
                $('#search-result-items .list-tile').each(function(i, elem) {
                    listPull[i] = {
                        id: $(this).find('.product-wrapper').data('product-id'),
                        title: $(this).find('.product-name h3').text().trim(),
                        url: $(this).find('.img-link').attr('href'),
                        image : $(this).find('.img-link img').attr('src'),
                        priceD: priceDateArray[0] = [
                            [ $(this).find('.price').text().trim(), currentDate],
                            [ "30euros", "lundi"]
                        ]
                    }
                });
                console.log(listPull);
                const listPullTrimmed = listPull.filter(n => n != undefined )
                fs.writeFile('listPull.json',
                    JSON.stringify(listPullTrimmed, null, 4),
                    (err)=> console.log('File successfully written!'))
            }
        }, (error) => console.log(err) );
}

function updateListeVetement() {
    axios.get('https://www.jennyfer.com/fr-fr/vetements/pulls-et-gilets/')
        .then((response) => {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                let listPullUpdate = [];
                let priceDateArray = [];
                let currentDate = Date(Date.now());
                $('#search-result-items .list-tile').each(function(i, elem) {
                    listPullUpdate[i] = {
                        id: $(this).find('.product-wrapper').data('product-id'),
                        title: $(this).find('.product-name h3').text().trim(),
                        url: $(this).find('.img-link').attr('href'),
                        image : $(this).find('.img-link img').attr('src'),
                        priceD: priceDateArray[0] = [
                            [ $(this).find('.price').text().trim(), currentDate],
                            [ "30euros", "lundi"]
                        ]
                    }
                });

                var ListPullMain = fs.readFileSync('listPull.json','utf8');

               /* function getListPullMain() {
                    return new Promise((resolve, reject) => {
                        try {
                            let ListPullMain = fs.readFile('listPull.json', 'utf8', function(err, contents) {
                                console.log(contents);
                            });
                        } catch (error) {
                            return reject(error);
                        }
                    })
                }*/
                console.log(ListPullMain);

                listPullUpdate.forEach(function(item) {
                   
                    let idItemUpdate = item["id"];
                    ListPullMain.forEach(function(itemMain) {
                       if(idItemUpdate == itemMain["id"]) {
                           console.log(" id pareil");
                       } else {
                           console.log("id different");
                       }
                    });
                });

                /*const listPullUpdateTrimmed = listPullUpdate.filter(n => n != undefined )
                fs.writeFile('listPullUpdate.json',
                    JSON.stringify(listPullUpdateTrimmed, null, 4),
                    (err)=> console.log('File successfully written!'))*/
            }
        }, (error) => console.log(err) );
}

//recuperationListeVetement();

updateListeVetement();