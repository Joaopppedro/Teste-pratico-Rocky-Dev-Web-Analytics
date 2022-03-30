const fs = require("fs"); // permite salvar e abrir arquivos JSON, através do módulo filesystem



// função que permite ler o arquivo de maneira síncrona e retornar seu conteúdo --- https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/

function readFile() {

    const originalData = fs.readFileSync("./broken-database.json", "utf8", (err, jsonString) => {

        if (err) {

            console.log("File read failed:", err);

            return;

        }

    });

    //transforma as informações do arquivo JSON em objeto --- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

    const dataObject = JSON.parse(originalData)

    return dataObject;

}

//função que corrige os nomes que estavam corrompidos

function fixName(name) {

    return name.replace(/æ/g, "a").replace(/¢/g, "c").replace(/ø/g, "o").replace(/ß/g, "b")

}

//função que corrige os preços, transformando os valores que estavam no formato string para number

function fixPrice(price) {

    return Number(price)

}

//função que corrige as quantidades, caso a quantidade seja 0 ela retornará esse valor, ao invés de deixar vazio o componente

function fixQuantity(quantity) {

    return quantity || 0

}

//salva o arquivo com o nome saida.json

function writeFile(dataObject) {

    const jsonString = JSON.stringify(dataObject, null, 2);

    fs.writeFile('./saida.json', jsonString, err => {

        if (err) {

            console.log('Error writing file', err)

        } else {

            console.log('Successfully wrote file')

        }

    })

}

// ordena as categorias por ordem alfabética e após isso por ID crescente                --- https://gomakethings.com/sorting-an-array-by-multiple-criteria-with-vanilla-javascript/

function showSorted(dataObject) {

    const sortedData = dataObject.sort((a, b) => {

        if (a.category > b.category) return 1;

        if (a.category < b.category) return -1;

        return a.id - b.id;

    })

    const sortedNames = sortedData.map(function (item) {

        return item.name

    }



    )

    console.log(sortedNames)

}

//função que calcula o valor total do estoque considerando a categoria e quantidade de cada produto

function categoryValue(dataObject) {

    const categories = []



    for (let i = 0; i < dataObject.length; i++) {

        if (!categories.includes(dataObject[i].category)) {

            categories.push(dataObject[i].category)

        }

    }



    for (let i = 0; i < categories.length; i++) {

        let value = 0;



        const filteredData = dataObject.filter(product => product.category == categories[i])

        for (let j = 0; j < filteredData.length; j++) {

            value += filteredData[j].price * filteredData[j].quantity;

        }



        console.log(categories[i] + ': R$ ' + value);

    }

}

//função que organiza as outras funções criadas  

function main() {

    const dataObject = readFile()



    for (let i = 0; i < dataObject.length; i++) {

        dataObject[i].price = fixPrice(dataObject[i].price)

        dataObject[i].quantity = fixQuantity(dataObject[i].quantity)

        dataObject[i].name = fixName(dataObject[i].name)

    }

    writeFile(dataObject);

    showSorted(dataObject);

    categoryValue(dataObject);

}



main();



