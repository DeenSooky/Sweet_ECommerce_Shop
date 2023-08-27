import dbConnect from "@/util/mongo";
import Order from "@/models/Order";

const handler = async (req, res) => {
    
    const {method, query: {id} } = req;

    await dbConnect();

    if(method === "GET"){
        try{
            const order = await Order.findbyId(id)
            res.status(200).json(order);

        }catch(err){
            res.status(500).json(err);
        }
    }
    
    if(method === "POST")
    if(method === "DELETE")

}

export default handler;