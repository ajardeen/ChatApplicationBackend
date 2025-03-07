const User = require("../models/User");
const Message = require("../models/Message");

const saveMessage = async (req, res) => {
  // try {
  
    
  //   const { sender, receiver, message } = req.body;
  //   const newMessage = new Message({ sender, receiver, message });
  //   await newMessage.save();
  //   res.status(201).json(newMessage);
  // } catch (error) {
  //   console.log(error.message);
  //   res.status(500).json({ error: "Failed to send message" });
  // }
};

const getMessages2 = async(req,res)=>{
    try {
        const { sender, receiver } = req.params;
        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
}

module.exports = { saveMessage ,getMessages2};
