const tf = require('@tensorflow/tfjs-node')
const books = require("./data/data.json")

async function loadModel() {
    console.log('Loading Model...')
    model = await tf.loadLayersModel("file:///Users/admin/Desktop/charity3/express-server/model/model.json", false);
    console.log('Model Loaded Successfull')
    // model.summary()
}

const book_arr = tf.range(0, books.length)
const book_len = books.length

exports.recommend = async function recommend(userId) {
    let user = tf.fill([book_len], Number(userId))
    let book_in_js_array = book_arr.arraySync()
    await loadModel()
    console.log(`Recommending for User: ${userId}`)
    pred_tensor = await model.predict([book_arr, user]).reshape([17])
    pred = pred_tensor.arraySync()
    console.log(pred_tensor.print());
    
    let recommendations = []
    for (let i = 0; i < 17; i++) {
        max = pred_tensor.argMax().arraySync()
        recommendations.push(books[max]) //Push book with highest prediction probability
        console.log(books[max]);
        //pred.splice(max, 1)    //drop from array
        pred[max] = 0
        pred_tensor = tf.tensor(pred) //create a new tensor
    }
    return recommendations
}