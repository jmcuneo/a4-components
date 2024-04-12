import {Collection, MongoClient} from "mongodb";

const uri = `${process.env.URI}`;
const client = new MongoClient(uri);
let collection: Collection;
let userInfo: Collection;

export function connectToDatabase() {
    client.connect().then(
        () => {
            collection = client.db("MonthlyCostDatabase").collection("MonthlyCost");
            userInfo = client.db("MonthlyCostDatabase").collection("Users");

            while (!collection && !userInfo) {
                setTimeout(() => {
                    console.log("Waiting for connection");
                }, 100);
            }

            console.log("Connected to database");
        }
    );
}

export function AddDocument(body: any) {

}

export function DeleteDocument(id: string) {

}

export function GetDocuments(id: string) {

}

export function UpdateDocument(id: string, body: any) {

}
