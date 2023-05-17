const { body } = require("express-validator");
const fs  = require("fs");
const path = require("path");

function getAllProducts() {
    const filePath = path.join(__dirname,'..', 'db/products.json');
    const data = fs.readFileSync(filePath, "utf8");
    const dataParseada = JSON.parse(data, null, 2);
    return dataParseada.data;
}

function createProduct(newProduct) {
    try {
        const filePath = path.join(__dirname, "..", "db/products.json")
        const data = getAllProducts();
        data.push(newProduct);
        console.log(body)
        fs.writeFileSync(filePath, JSON.stringify({data}, null, 2));
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

function writeFile(data) {
    const filePath = path.join(__dirname, "..", "db/products.json");
    const dataConvertida = JSON.stringify({ data }, null, 2);
    console.log(data)
    fs.writeFileSync(filePath, dataConvertida);
}

function updateProduct(id2find, newName, newDesc) {
    const data = getAllProducts();
    // console.log(id2find)
    try {
        for (i = 0; i < data.length; i++) {
            console.log(i)
            if (id2find == data[i].id) {
              data[i].name = newName;
              data[i].desc = newDesc;
            //   console.log(i)
            }
        }
        
        writeFile(data);
        return true
    } catch (error) {
        return false
    }

}

  

module.exports = {
    getAllProducts,
    createProduct, 
    writeFile,
    updateProduct
};